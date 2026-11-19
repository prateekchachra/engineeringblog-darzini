"use client";

/**
 * A small synth on the home page that hides a fact behind each chord.
 *
 * Two deliberate decisions:
 *
 * 1. Chords are matched on pitch classes, not on exact notes, so an
 *    inversion counts and so does an arpeggio. Notes stay in the buffer
 *    for {@link CHORD_WINDOW} after release, which is what lets someone
 *    with one mouse pointer play a four note chord at all.
 *
 * 2. The guide is a hint layer and nothing more. It highlights the next
 *    note and advances when you play it, but the popup is fired by the
 *    matcher underneath, so playing the chord your own way still works
 *    and the tour can be skipped without breaking anything.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  blackOffset,
  chordFacts,
  KEYS,
  keyForPitchClass,
  matchChord,
  NOTE_NAMES,
  WHITE_KEYS,
  type ChordFact,
  type Key,
} from "../data/chords";

/** How long a played note keeps counting toward a chord, in ms. */
const CHORD_WINDOW = 2400;

// MARK: - Audio

type Voice = { stop: (at: number) => void };

type Bus = {
  ctx: AudioContext;
  input: GainNode;
};

function createBus(): Bus | null {
  const Ctor =
    typeof window === "undefined"
      ? undefined
      : window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
  if (!Ctor) return null;

  const ctx = new Ctor();
  const input = ctx.createGain();
  input.gain.value = 0.9;

  const master = ctx.createGain();
  master.gain.value = 0.5;

  // A short delay, low in the mix. It is the difference between a demo
  // and something you want to keep pressing.
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.19;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.26;
  const wet = ctx.createGain();
  wet.gain.value = 0.2;
  const damp = ctx.createBiquadFilter();
  damp.type = "lowpass";
  damp.frequency.value = 2200;

  input.connect(master);
  input.connect(delay);
  delay.connect(damp);
  damp.connect(feedback);
  feedback.connect(delay);
  damp.connect(wet);
  wet.connect(master);
  master.connect(ctx.destination);

  return { ctx, input };
}

function startVoice(bus: Bus, midi: number): Voice {
  const { ctx, input } = bus;
  const now = ctx.currentTime;
  const freq = 440 * Math.pow(2, (midi - 69) / 12);

  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.linearRampToValueAtTime(0.2, now + 0.014);
  amp.gain.setTargetAtTime(0.11, now + 0.02, 0.4);

  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(5200, now);
  tone.frequency.setTargetAtTime(2300, now + 0.01, 0.5);
  tone.Q.value = 0.9;

  const oscs = [
    { type: "sawtooth" as OscillatorType, detune: -7, gain: 0.5 },
    { type: "triangle" as OscillatorType, detune: 7, gain: 0.7 },
  ].map(({ type, detune, gain }) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    const level = ctx.createGain();
    level.gain.value = gain;
    osc.connect(level);
    level.connect(tone);
    osc.start(now);
    return osc;
  });

  tone.connect(amp);
  amp.connect(input);

  return {
    stop(at: number) {
      amp.gain.cancelScheduledValues(at);
      amp.gain.setValueAtTime(Math.max(amp.gain.value, 0.0001), at);
      amp.gain.exponentialRampToValueAtTime(0.0001, at + 0.45);
      oscs.forEach((osc) => osc.stop(at + 0.5));
    },
  };
}

// MARK: - Component

type Nudge = { text: string; at: number } | null;

export default function ChordSynth() {
  const busRef = useRef<Bus | null>(null);
  const voicesRef = useRef(new Map<number, Voice>());
  /** Recently played notes: pitch class and when, for the matcher. */
  const playedRef = useRef<{ pc: number; at: number }[]>([]);

  const [held, setHeld] = useState<number[]>([]);
  const [ringing, setRinging] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [open, setOpen] = useState<ChordFact | null>(null);
  const [target, setTarget] = useState(0);
  const [step, setStep] = useState(0);
  const [touring, setTouring] = useState(true);
  const [nudge, setNudge] = useState<Nudge>(null);
  const [started, setStarted] = useState(false);

  const chord = chordFacts[target];
  const allFound = found.length === chordFacts.length;

  /** The note the guide is currently pointing at, if it is pointing. */
  const expected = useMemo(() => {
    if (!touring || !chord || open) return null;
    const pc = chord.notes[step];
    if (pc === undefined) return null;
    const key = keyForPitchClass(pc);
    return key ? { pc, midi: key.midi, name: chord.noteNames[step]! } : null;
  }, [touring, chord, step, open]);

  const noteOn = useCallback(
    (midi: number) => {
      if (voicesRef.current.has(midi)) return;

      busRef.current = busRef.current ?? createBus();
      const bus = busRef.current;
      if (bus) {
        if (bus.ctx.state === "suspended") void bus.ctx.resume();
        voicesRef.current.set(midi, startVoice(bus, midi));
      }
      setStarted(true);
      setHeld((prev) => (prev.includes(midi) ? prev : [...prev, midi]));
      setRinging((prev) => (prev.includes(midi) ? prev : [...prev, midi]));

      const now = Date.now();
      const pc = midi % 12;
      playedRef.current = [
        ...playedRef.current.filter((n) => now - n.at < CHORD_WINDOW && n.pc !== pc),
        { pc, at: now },
      ];

      // Guide first, so the highlight keeps up with the fingers. Kept out
      // of a state updater on purpose: updaters have to be pure, and this
      // one would need to fire a nudge.
      const wanted = chord?.notes[step];
      if (wanted !== undefined) {
        if (pc === wanted) {
          setStep(step + 1);
        } else if (!chord!.notes.includes(pc)) {
          setNudge({ text: `That is ${NOTE_NAMES[pc]}. The glowing one next.`, at: now });
        }
      }

      const hit = matchChord(playedRef.current.map((n) => n.pc));
      if (hit) {
        playedRef.current = [];
        setOpen(hit);
        setFound((prev) => (prev.includes(hit.symbol) ? prev : [...prev, hit.symbol]));
        setNudge(null);
      }
    },
    [chord, step]
  );

  const noteOff = useCallback((midi: number) => {
    const voice = voicesRef.current.get(midi);
    const bus = busRef.current;
    if (voice && bus) voice.stop(bus.ctx.currentTime);
    voicesRef.current.delete(midi);
    setHeld((prev) => prev.filter((m) => m !== midi));
    window.setTimeout(
      () => setRinging((prev) => prev.filter((m) => m !== midi)),
      260
    );
  }, []);

  /** Advance the tour once a fact is dismissed. */
  const closeFact = useCallback(() => {
    setOpen(null);
    setStep(0);
    setNudge(null);
    setTarget((prev) => {
      const next = chordFacts.findIndex(
        (candidate, i) => i > prev && !found.includes(candidate.symbol)
      );
      if (next !== -1) return next;
      const any = chordFacts.findIndex((c) => !found.includes(c.symbol));
      return any === -1 ? prev : any;
    });
  }, [found]);

  // Computer keyboard, so this is playable properly on a laptop.
  useEffect(() => {
    const typing = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };
    const down = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      if (typing(event.target)) return;
      const key = KEYS.find((k) => k.typed === event.key.toLowerCase());
      if (!key) return;
      event.preventDefault();
      noteOn(key.midi);
    };
    const up = (event: KeyboardEvent) => {
      const key = KEYS.find((k) => k.typed === event.key.toLowerCase());
      if (key) noteOff(key.midi);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [noteOn, noteOff]);

  // A wrong note nudge is a flash, not a state you have to clear.
  useEffect(() => {
    if (!nudge) return;
    const timer = window.setTimeout(() => setNudge(null), 2200);
    return () => window.clearTimeout(timer);
  }, [nudge]);

  // Releasing outside a key still has to lift the note.
  useEffect(() => {
    const lift = () => {
      voicesRef.current.forEach((voice, midi) => {
        const bus = busRef.current;
        if (bus) voice.stop(bus.ctx.currentTime);
        voicesRef.current.delete(midi);
      });
      setHeld([]);
      window.setTimeout(() => setRinging([]), 260);
    };
    window.addEventListener("pointerup", lift);
    window.addEventListener("pointercancel", lift);
    return () => {
      window.removeEventListener("pointerup", lift);
      window.removeEventListener("pointercancel", lift);
    };
  }, []);

  useEffect(
    () => () => {
      try {
        voicesRef.current.forEach((voice) => voice.stop(0));
        void busRef.current?.ctx.close();
      } catch {
        // Already torn down by the browser. Nothing to release.
      }
    },
    []
  );

  const coach = (() => {
    if (nudge) return nudge.text;
    if (open) return null;
    if (allFound) return "That is all of them. The keyboard is yours now.";
    if (!touring) return null;
    if (!started) return `Play ${chord?.symbol}. Start on the glowing key.`;
    if (step === 0) return `${chord?.symbol}. Start on the glowing key.`;
    if (step >= (chord?.notes.length ?? 0)) return "Hold them together.";
    return `${step} of ${chord?.notes.length}. Keep going.`;
  })();

  const keyClasses = (key: Key) => {
    const isHeld = held.includes(key.midi) || ringing.includes(key.midi);
    if (key.black) {
      return isHeld
        ? "bg-accent border-accent"
        : "bg-[#1a1a1f] border-[#2a2a32] hover:bg-[#26262e]";
    }
    return isHeld
      ? "bg-accent/85 border-accent"
      : "bg-[#f4f4f6] border-[#d8d8de] hover:bg-white";
  };

  return (
    <section className="mb-20">
      <div className="relative rounded-2xl border border-edge bg-gradient-to-br from-surface-2 to-surface p-5 sm:p-7 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, var(--accent), transparent 55%)",
          }}
        />

        <div className="relative">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-1">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
              Three chords I keep coming back to
            </h2>
            <span className="font-mono text-[11px] text-faint">
              {found.length} of {chordFacts.length} found
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-5 max-w-xl">
            Play one and it tells you something about me. Any inversion counts, and you
            can play the notes one at a time, so a single mouse pointer is enough.
          </p>

          {/* Chord chips */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {chordFacts.map((candidate, i) => {
              const done = found.includes(candidate.symbol);
              const active = touring && !allFound && i === target;
              return (
                <button
                  key={candidate.symbol}
                  type="button"
                  onClick={() => {
                    setTarget(i);
                    setStep(0);
                    setTouring(true);
                    setNudge(null);
                    if (done) setOpen(candidate);
                  }}
                  className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    done
                      ? "border-accent/60 bg-accent/10 text-accent"
                      : active
                        ? "border-accent/50 bg-surface text-foreground"
                        : "border-edge bg-surface text-faint hover:text-muted"
                  }`}
                >
                  {candidate.symbol}
                  {done ? " ✓" : ""}
                </button>
              );
            })}
            {touring && !allFound ? (
              <button
                type="button"
                onClick={() => {
                  setTouring(false);
                  setNudge(null);
                }}
                className="text-xs text-faint hover:text-muted transition-colors ml-1"
              >
                skip the tour
              </button>
            ) : null}
          </div>

          {/* Coach line */}
          <div className="h-6 mb-2">
            {coach ? (
              <p
                className={`font-mono text-[11px] ${
                  nudge ? "text-accent-2" : "text-accent"
                }`}
              >
                {coach}
              </p>
            ) : null}
          </div>

          {/* Keyboard */}
          <div className="relative select-none" style={{ touchAction: "none" }}>
            <div className="flex gap-[3px] h-32 sm:h-40">
              {WHITE_KEYS.map((key) => (
                <KeyButton
                  key={key.midi}
                  musicKey={key}
                  className={`flex-1 rounded-b-md border ${keyClasses(key)}`}
                  highlight={expected?.midi === key.midi}
                  label={expected?.midi === key.midi ? expected.name : null}
                  onDown={noteOn}
                  onUp={noteOff}
                />
              ))}
            </div>

            <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 pointer-events-none">
              {KEYS.filter((k) => k.black).map((key) => (
                <div
                  key={key.midi}
                  className="absolute top-0 pointer-events-auto"
                  style={{
                    left: `calc(${blackOffset(key.midi) * 100}% - 2.1%)`,
                    width: "4.2%",
                    height: "100%",
                  }}
                >
                  <KeyButton
                    musicKey={key}
                    className={`w-full h-full rounded-b-md border ${keyClasses(key)}`}
                    highlight={expected?.midi === key.midi}
                    label={expected?.midi === key.midi ? expected.name : null}
                    onDown={noteOn}
                    onUp={noteOff}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="font-mono text-[10px] text-faint mt-3">
            Or type on your keyboard: a w s e d f t g y h u j k
          </p>
        </div>

        {/* The fact */}
        {open ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border border-accent/40 bg-surface p-5 sm:p-6 shadow-xl">
              <div className="flex items-baseline gap-2.5 mb-3">
                <span className="font-mono text-base text-accent">{open.symbol}</span>
                <span className="text-xs text-faint">{open.colour}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-5">{open.fact}</p>
              <div className="flex flex-wrap items-center gap-3">
                {open.link ? (
                  <a
                    href={open.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline underline-offset-4"
                  >
                    {open.link.label} ↗
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={closeFact}
                  className="ml-auto px-3.5 py-1.5 rounded-lg bg-surface-2 border border-edge text-sm text-foreground hover:bg-surface transition-colors"
                >
                  {found.length === chordFacts.length ? "Nice" : "Next chord"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function KeyButton({
  musicKey,
  className,
  highlight,
  label,
  onDown,
  onUp,
}: {
  musicKey: Key;
  className: string;
  highlight: boolean;
  label: string | null;
  onDown: (midi: number) => void;
  onUp: (midi: number) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${musicKey.name}, key ${musicKey.typed}`}
      onPointerDown={(event) => {
        event.preventDefault();
        onDown(musicKey.midi);
      }}
      onPointerUp={() => onUp(musicKey.midi)}
      onPointerLeave={() => onUp(musicKey.midi)}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (!event.repeat) onDown(musicKey.midi);
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter" || event.key === " ") onUp(musicKey.midi);
      }}
      className={`relative transition-colors ${className} ${
        highlight ? "ring-2 ring-accent ring-offset-0 z-10" : ""
      }`}
    >
      {highlight ? (
        <>
          <span className="absolute inset-0 rounded-b-md bg-accent/25 motion-safe:animate-pulse" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md border border-accent/50 bg-surface px-2 py-1 font-mono text-[11px] text-accent shadow-lg">
            {label}
            <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-px border-x-4 border-t-4 border-x-transparent border-t-accent/50" />
          </span>
        </>
      ) : null}
      <span className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[9px] text-black/35">
        {musicKey.black ? "" : musicKey.name}
      </span>
    </button>
  );
}
