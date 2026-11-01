import type { Metadata } from "next";
import Link from "next/link";
import { getPost } from "../../data/posts";
import { profile } from "../../data/profile";
import ThemeToggle from "../../components/ThemeToggle";
import {
  A,
  Callout,
  Code,
  H2,
  H3,
  LI,
  Lead,
  P,
  Pre,
  UL,
} from "../../components/Prose";

const post = getPost("which-oscillator-to-reach-for")!;
const repo = "https://github.com/prateekchachra/react-native-audio-effects";

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  openGraph: {
    type: "article",
    title: post.title,
    description: post.excerpt,
    publishedTime: post.date,
  },
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-edge bg-background/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm text-foreground hover:text-accent transition-colors"
          >
            prateek<span className="text-accent">.</span>chachra
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/writing"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              ← All writing
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 pb-20">
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-xs text-faint">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2 py-0.5 rounded border border-edge bg-surface text-faint"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Lead>
          Open any synth and the very first decision is a little row of wave shapes. Sine,
          triangle, square, saw, noise. For years I clicked through them until something
          sounded right, which works, but it is a slow way to live. There is actually a rule
          underneath, and once I had to implement all seven generators in{" "}
          <A href={repo}>react-native-audio-effects</A> I finally had to learn it properly.
        </Lead>

        <P>
          So this is what each one is, when to reach for it, and where you have already heard
          it. The last part is the fun part, because some of the most recognisable sounds ever
          recorded are one bare waveform doing almost nothing clever.
        </P>

        <H2>The only real difference between them is harmonics</H2>

        <P>
          A musical note is never one frequency. It is a fundamental, which is the pitch you
          hear, plus a stack of quieter frequencies above it at whole number multiples. Those
          are harmonics, and the recipe of which ones are present and how loud they are is
          the entire reason a violin and a flute playing the same note are not the same sound.
        </P>
        <P>
          The classic waveforms are just five different recipes. That is all they are.
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">Sine.</strong> The fundamental and nothing
            else. There is no simpler sound that exists.
          </LI>
          <LI>
            <strong className="text-foreground">Triangle.</strong> Odd harmonics only, and
            they fall away very fast, by a factor of n squared. So the third harmonic is a
            ninth as loud, the fifth a twenty fifth.
          </LI>
          <LI>
            <strong className="text-foreground">Square.</strong> Odd harmonics again, but
            falling off far more gently, by a factor of n. Much more edge than a triangle.
          </LI>
          <LI>
            <strong className="text-foreground">Sawtooth.</strong> Every harmonic, odd and
            even, falling by a factor of n. The richest of the four.
          </LI>
          <LI>
            <strong className="text-foreground">Noise.</strong> Everything at once, with no
            fundamental at all, which is why it has no pitch.
          </LI>
        </UL>
        <P>
          Notice that square and triangle have the same harmonics and sound nothing alike.
          The only difference is how quickly the upper ones give up. That one fact explains
          more about synth tone than anything else I know.
        </P>

        <H2>The rule for choosing</H2>

        <P>
          Most synthesis is subtractive, meaning you start with a rich sound and remove parts
          of it with a filter. And a filter can only ever take away. It cannot put back a
          harmonic that was never there.
        </P>
        <Callout>
          So the question is not which waveform sounds best. It is how much raw material do I
          want the filter to have. If you intend to sweep and carve, start with a saw. If you
          intend to leave it alone, start with a sine. Everything else is in between.
        </Callout>
        <P>
          That is genuinely the whole rule, and it is the thing nobody told me for about three
          years.
        </P>

        <H2>Sine</H2>

        <P>
          A sine is the only waveform with nothing to remove. Put it through a filter and very
          little happens, which sounds like a weakness and is actually the point. You use it
          when you want a pitch and no character at all.
        </P>
        <P>
          Sub bass is the obvious case. Down at the bottom of the range, harmonics stop adding
          warmth and start adding mud, and on a phone speaker or a laptop they are the only
          part you can hear, so a bass with a lot of them turns to buzz. A sine stays a clean
          weight under everything.
        </P>
        <P>
          The other case is anywhere you need honesty. Test tones, tuning references, ear
          training. There are no overtones to give an answer away.
        </P>

        <H3>Where you have heard it</H3>

        <P>
          The Yamaha DX7, which is as close to the sound of the nineteen eighties as one
          machine gets, has no sawtooth and no square. Its six operators are all sine waves,
          arranged in{" "}
          <A href="https://en.wikipedia.org/wiki/Yamaha_DX7">thirty two algorithms</A>, and
          every bell, every electric piano, every slap bass on every record from that decade
          came out of sine waves modulating each other. The richest sounds of the era were
          built from the plainest possible ingredient.
        </P>
        <P>
          The other one is in your headphones constantly. The 808 kick is built on a{" "}
          <A href="https://www.soundonsound.com/techniques/practical-snare-drum-synthesis">
            bridged T network
          </A>{" "}
          that rings and dies away on its own when you hit it, which is close enough to a
          decaying sine that you can get startlingly near it with a sine and a fast decay
          envelope. Every trap record you have ever heard is essentially that.
        </P>

        <H2>Triangle</H2>

        <P>
          A triangle is a sine that has had a little edge put on it. The odd harmonics are
          there, but falling so steeply that the fundamental still dominates completely. It
          reads as soft and slightly hollow. Flute is the usual comparison and it is a fair
          one.
        </P>
        <P>
          I reach for it when a sine is too polite to be heard but a square is too rude.
          Gentle leads, bell tones, anything that has to sit in a mix without fighting. It is
          also the safest waveform for something that will be played loudly through a small
          speaker, because there is not enough high harmonic content to turn harsh.
        </P>

        <H3>Where you have heard it</H3>

        <P>
          On the NES, the triangle channel played the bass. The chip had five channels: two
          pulse, one triangle, one noise, and one for samples. The triangle was the odd one
          out, because unlike the others{" "}
          <A href="https://nesdev.org/wiki/2A03">its volume could not be controlled</A>, so it
          was always full level. A channel you cannot turn down is a slightly awkward gift,
          and the answer every composer landed on was to give it the bass line, where a
          constant level is a feature rather than a problem.
        </P>
        <P>
          It also has a buzz on it that a mathematically perfect triangle does not, because
          the NES built it out of only sixteen steps. The limitation became part of the sound,
          which happens more often in this field than anyone likes to admit.
        </P>

        <H2>Square</H2>

        <P>
          Odd harmonics, falling gently. The thing to understand about a square is what is
          missing: the second harmonic, which is the octave above the fundamental. Our ears
          treat an octave as almost the same note, so a sound with no octave in it feels
          strangely hollow and woody. A clarinet has the same bias toward odd harmonics, which
          is why the schema in my own library describes the square as clarinet like, and why
          every synth demo reaches for a clarinet comparison eventually.
        </P>
        <P>
          Use it when you want something to cut through without being bright. Square bass
          survives a phone speaker much better than a sine, because the harmonics are up where
          the speaker actually works, and your brain fills in the fundamental it cannot
          reproduce. Chiptune leads, hollow plucks, anything that should sound slightly
          synthetic on purpose.
        </P>

        <H3>Where you have heard it</H3>

        <P>
          Those two NES pulse channels carried every melody and harmony you remember. And the
          TB-303, the little silver box that accidentally invented acid house, offers exactly
          two choices:{" "}
          <A href="https://en.wikipedia.org/wiki/Roland_TB-303">sawtooth or square</A>. The
          square setting is the harder, more hollow version of that squelch.
        </P>
        <Callout>
          One honest gap in my library. The NES pulse channels could change their duty cycle,
          which is how wide the top of the pulse is, giving 12.5%, 25%, 50% and 75%. Those
          thin nasal settings are a huge part of the chiptune vocabulary. My square is a fixed
          50%, the hollow one, with no pulse width control yet. So you can get the bass and
          the woody leads, and you cannot get the reedy ones.
        </Callout>

        <H2>Sawtooth</H2>

        <P>
          Every harmonic present, falling gently. This is the workhorse, and if you only ever
          learn one waveform properly it should be this. Strings, brass, pads, leads, acid
          bass. Anything you plan to carve with a filter wants to start here, because there is
          the most to carve.
        </P>
        <P>
          A lone saw is also a bit thin and nasal, which surprises people. The famous sounds
          are almost never one saw. They are several, slightly out of tune with each other.
        </P>

        <H3>Where you have heard it</H3>

        <P>
          The Roland JP-8000 shipped a waveform called Supersaw, which is{" "}
          <A href="https://en.wikipedia.org/wiki/Roland_JP-8000">
            seven sawtooth oscillators detuned against each other
          </A>
          . It defined trance, and it is still the sound anyone means when they say a big
          supersaw lead. Two details in how Roland did it are worth stealing. The detune
          control spread the six extra saws while leaving the primary saw exactly in tune, so
          the patch never drifts out of key. And the seven waves start at random phases, so no
          two notes are quite identical and the sound never feels static.
        </P>
        <P>
          The first of those is a correctness decision, not a taste one, and my unison code
          does the same thing for the same reason:
        </P>
        <Pre>{`const synth = await PolySynth.create({
  waveform: 'sawtooth',
  unison: 3,          // oscillators stacked per note
  unisonSpread: 14,   // total detune across the stack, in cents
});`}</Pre>
        <P>
          Offsets are spread symmetrically about the centre, and with an odd count one voice
          sits exactly on pitch. An even stack has no centre, so the whole patch reads very
          slightly out of tune and you spend an hour wondering why your lead fights the
          bassline.
        </P>
        <P>
          The spread is in cents rather than hertz, which matters more than it looks. A cent
          is a ratio, one hundredth of a semitone, so fourteen cents of detune sounds like the
          same amount of detune whether you are playing a low note or a high one. Do it in
          hertz and your bass notes are a mess while your high notes sound perfectly in tune.
        </P>
        <P>
          For deadmau5, Strobe is the example everybody reaches for, and the recipes people
          pass around for that lead{" "}
          <A href="https://www.syntorial.com/preset-recipe/deadmau5-strobe-lead/">
            start from a plain saw
          </A>{" "}
          with no filter doing anything dramatic, then build it up with layers and slow
          modulation. The character is in the restraint and the movement, not in a clever
          waveform. Which is sort of the whole lesson of the track.
        </P>
        <P>
          And the other TB-303 setting, the saw, run through that resonant low pass filter, is
          acid. An entire genre out of one waveform and one filter.
        </P>

        <H2>Noise</H2>

        <P>
          No fundamental, no pitch, every frequency at once. Noise is for anything that is a
          texture or an impact rather than a note.
        </P>
        <P>
          Percussion is the big one. A snare is a tuned body plus a burst of noise for the
          snap, and you can build a convincing one from a short noise burst and a very fast
          envelope. Risers and sweeps in dance music are noise through a filter that opens.
          Wind, rain, waves, radio static, all noise and a filter.
        </P>
        <P>
          There are three flavours and the difference is only in how the energy is spread:
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">White.</strong> Equal energy per hertz. Since
            each octave up contains twice as many hertz as the one below it, the top octave
            holds a huge share of the total energy, which is why white noise sounds like a
            hiss aimed at your face.
          </LI>
          <LI>
            <strong className="text-foreground">Pink.</strong> Equal energy per octave, which
            works out to falling 3 dB per octave. This is the one that sounds balanced, and it
            is what gets used for calibrating speakers and rooms, because it matches how we
            actually hear.
          </LI>
          <LI>
            <strong className="text-foreground">Brown.</strong> Falling 6 dB per octave. Deep
            and rumbling, almost no hiss. This is the one in every sleep and focus app, and
            the one most people find genuinely calming.
          </LI>
        </UL>

        <H3>Where you have heard it</H3>

        <P>
          The NES noise channel did every drum, every explosion, every footstep. Four
          waveforms, and an entire decade of games made music out of them.
        </P>
        <Callout>
          Something I had wrong until I went and checked. I had always assumed the metallic
          sounds on a TR-808, the hats and cymbals, were noise. They are not. The Stanford
          analysis of the circuit shows those voices are built from{" "}
          <strong className="text-foreground">square wave oscillators</strong>, stacked and
          then filtered and enveloped. Stacked squares at unrelated frequencies read as metal
          rather than as pitch. Worth knowing both because it is a better way to make a
          cymbal, and as a reminder that the obvious explanation for a sound is often not the
          one the engineer actually used.
        </Callout>

        <H2>The envelope matters more than the waveform</H2>

        <P>
          Here is where I wasted the most time as a beginner. I would hunt through waveforms
          looking for a sound when the waveform was never the problem.
        </P>
        <P>
          An oscillator on its own is a continuous tone, like a test signal. What turns it into
          a note is the envelope, which is four numbers describing the shape of its loudness
          over time. How long to get loud, how long to settle, where it settles while you hold
          it, and how long the tail is after you let go.
        </P>
        <Pre>{`osc.setEnvelopeParam('attack', 1);      // ms, instant
osc.setEnvelopeParam('decay', 180);
osc.setEnvelopeParam('sustain', 0.0);   // level, not a time
osc.setEnvelopeParam('release', 120);`}</Pre>
        <P>
          That is a pluck. Now change one number, attack from 1 to 2000, and the same
          oscillator playing the same note becomes a pad that swells in like someone leaning
          on an organ. Nothing else moved.
        </P>
        <P>
          Attack and release go up to four and eight seconds in my library, which sounds
          absurd until you try a note that takes six seconds to arrive. If a sound is not
          working, change the envelope before you change the waveform. It is the right answer
          far more often.
        </P>
        <P>
          The same five shapes come back as modulation shapes too, and there you feel them
          rather than hear them. A sine sweeping a filter is a gentle breathing motion. A
          square jumps between two states, which is the trance gate sound. A saw ramps up and
          snaps back. And random, which holds a new value at each step rather than gliding,
          gives you that bubbling computer sound from every film about a laboratory.
        </P>

        <H2>Why a perfect sawtooth is impossible</H2>

        <P>
          This is the part that cost me real time, and it is the honest reason there is more
          than one way to generate these.
        </P>
        <P>
          A mathematically perfect saw has infinite harmonics. Digital audio cannot hold
          infinite anything: at a 48 kHz sample rate the highest frequency representable is
          24 kHz, and any harmonic above that does not get politely discarded. It folds back
          down into the audible range at a frequency that has nothing to do with the note you
          played.
        </P>
        <P>
          That is aliasing, and it is nasty in a specific way. It is not distortion that
          sounds like distortion. It is a quiet cloud of mistuned junk that gets worse the
          higher up the keyboard you go, so a patch that is lovely at the bottom turns
          metallic and sour at the top. In a phone app, where people absolutely will drag a
          finger up two octaves to see what happens, you cannot ship that.
        </P>
        <P>
          So the two platforms solve it differently. On iOS, AudioKit provides band limited
          wavetables, which simply do not contain the harmonics that would fold. On Android,
          the DSP library I use ships no oscillators at all, so saw and square are synthesised
          directly in the audio callback using PolyBLEP, which rounds off the sharp
          discontinuity just enough to suppress the folding while leaving the shape intact.
        </P>
        <P>
          Triangle and sine get generated naively, with no protection at all, and that is a
          deliberate decision rather than laziness. Remember that a triangle&apos;s harmonics
          fall off by n squared. By the time they fold back they are so far below everything
          else that you cannot hear them, so the cheaper path is also the correct one. A sine
          has no harmonics to fold in the first place.
        </P>
        <P>
          Two consequences I document rather than hide. The two platforms are perceptually
          equivalent but not sample identical at high fundamentals, because band limited
          wavetables and PolyBLEP are different approximations of the same impossible thing.
          And Android gets an <Code>antialias</Code> switch, because aliasing is a usable
          sound. Early samplers aliased, and that grit is half of why old records sound like
          old records. Turning it off is a tone control, so it belongs to the user rather than
          hidden in my code.
        </P>

        <H2>So, where to start</H2>

        <P>
          If you want the short version to keep somewhere:
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">Bass under everything:</strong> sine. Add a
            square layer if it vanishes on phone speakers.
          </LI>
          <LI>
            <strong className="text-foreground">Soft lead or bell:</strong> triangle, short
            attack, long release.
          </LI>
          <LI>
            <strong className="text-foreground">Retro or video game:</strong> square, and keep
            the envelope snappy.
          </LI>
          <LI>
            <strong className="text-foreground">Big lead, pad, strings, acid:</strong> saw.
            Three of them, detuned by about fourteen cents, through a filter.
          </LI>
          <LI>
            <strong className="text-foreground">Drums, texture, weather:</strong> noise and a
            filter. Brown to calm somebody down, white to wake them up.
          </LI>
        </UL>

        <H2>The bit I actually find interesting</H2>

        <P>
          Nearly every sound in this article is a limitation that somebody stopped fighting.
          The NES triangle channel had no volume control, so it became the bass. Its triangle
          was coarse, so the buzz became the texture. The DX7 had no saw and no square, so an
          entire decade learned to build its sounds out of sine waves. The TB-303 was a failed
          bass accompaniment machine with a weird filter, and the weird filter became a genre.
        </P>
        <P>
          Which is a pretty good argument for learning what the simple parts actually do. You
          are not going to beat a modern synth on features. But five
          shapes and four numbers, properly understood, is most of the territory, and it is
          small enough to fit in your head.
        </P>

        <div className="mt-14 pt-8 border-t border-edge">
          <p className="text-sm text-muted mb-4">
            The generator definitions, harmonic notes and the PolyBLEP reasoning all live in{" "}
            <Code>src/schema/generators.ts</Code> if you want the actual numbers.
          </p>
          <div className="flex flex-wrap gap-3">
            <A href={repo}>react-native-audio-effects on GitHub</A>
            <span className="text-faint">·</span>
            <A href={profile.links.github}>More of my work</A>
          </div>
        </div>
      </article>
    </div>
  );
}
