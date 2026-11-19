/**
 * The chords on the home page synth, and what each one unlocks.
 *
 * `notes` are pitch classes with 0 = C, so a chord is recognised in any
 * octave and any inversion. The order here is only the order the guide
 * teaches them in; playing them in any order still counts.
 *
 * To add one: pick the pitch classes, write the fact, done. The synth
 * reads the length of this array for its counter and builds the guide
 * from `noteNames`, so nothing else needs touching.
 */
export type ChordFact = {
  /** Shown on the chip and in the popup heading. */
  symbol: string;
  /** Pitch classes, 0 = C. Order is the teaching order. */
  notes: number[];
  /** Labels for the guide, parallel to `notes`. */
  noteNames: string[];
  /** One line under the chord symbol, before the fact lands. */
  colour: string;
  /** The popup. */
  fact: string;
  link?: { href: string; label: string };
};

export const chordFacts: ChordFact[] = [
  {
    symbol: "Cmaj7",
    notes: [0, 4, 7, 11],
    noteNames: ["C", "E", "G", "B"],
    colour: "The sound of something being fine, actually.",
    fact:
      "I interviewed Novak Djokovic. I write about tennis for Indian Tennis Daily when I am not writing TypeScript, which is the kind of sentence that makes sense only if you have met me.",
    // TODO(prateek): swap this for the Djokovic piece itself. I could not
    // find it from the outside, so this points at the author page for now.
    link: {
      href: "https://indiantennisdaily.com/author/prateekchachra8/",
      label: "My tennis writing",
    },
  },
  {
    symbol: "Fm7",
    notes: [5, 8, 0, 3],
    noteNames: ["F", "A♭", "C", "E♭"],
    colour: "Sad, but composed about it.",
    fact:
      "One of my music videos has passed 200,000 views. I release music as Darzini, which started as the thing I did instead of sleeping and is now the reason I know what a formant is.",
    // TODO(prateek): the video link goes here.
    link: {
      href: "https://www.darzini.com/",
      label: "Darzini",
    },
  },
  {
    symbol: "Am7",
    notes: [9, 0, 4, 7],
    noteNames: ["A", "C", "E", "G"],
    colour: "Four notes that have never once been in a hurry.",
    fact:
      "Darzini is at around 20,000 monthly listeners, grown with Spotify and Meta marketing I ran myself. Learning to market the music turned out to be a performance marketing job, which is now also my day job.",
    link: {
      href: "https://www.darzini.com/",
      label: "Have a listen",
    },
  },
];

// MARK: - The keyboard, and matching

/** One octave, C4 to C5 inclusive, which covers every pitch class. */
export const LOW_MIDI = 60;
export const HIGH_MIDI = 72;

export const NOTE_NAMES = [
  "C",
  "C♯",
  "D",
  "E♭",
  "E",
  "F",
  "F♯",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
];

/** Computer keyboard row, lowest note first. */
const TYPED_KEYS = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j", "k"];

export type Key = {
  midi: number;
  name: string;
  black: boolean;
  /** The key on a computer keyboard that plays it. */
  typed: string;
};

export const KEYS: Key[] = Array.from(
  { length: HIGH_MIDI - LOW_MIDI + 1 },
  (_, i) => {
    const midi = LOW_MIDI + i;
    const pc = midi % 12;
    return {
      midi,
      name: NOTE_NAMES[pc]!,
      black: [1, 3, 6, 8, 10].includes(pc),
      typed: TYPED_KEYS[i]!,
    };
  }
);

export const WHITE_KEYS = KEYS.filter((key) => !key.black);

/**
 * Where a black key sits, as a fraction across the white key row. The
 * white keys are equal width, so a black key belongs on the seam before
 * the white key it follows.
 */
export function blackOffset(midi: number): number {
  const whitesBefore = KEYS.filter((key) => !key.black && key.midi < midi).length;
  return whitesBefore / WHITE_KEYS.length;
}

/** The lowest key on the board playing this pitch class. */
export function keyForPitchClass(pc: number): Key | undefined {
  return KEYS.find((key) => key.midi % 12 === pc);
}

/**
 * The chord these pitch classes are, if they are one.
 *
 * Exact set equality, so C E G is not a Cmaj7 with a note missing and
 * not an Am7 either. Octave and order are already gone by this point,
 * which is what makes an inversion and an arpeggio both count.
 */
export function matchChord(pitchClasses: Iterable<number>): ChordFact | undefined {
  const live = new Set(pitchClasses);
  return chordFacts.find(
    (chord) =>
      live.size === new Set(chord.notes).size &&
      chord.notes.every((pc) => live.has(pc))
  );
}
