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

const post = getPost("about-formants")!;
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
          You can recognise a friend from one word on a terrible phone line. Not from the
          pitch, because they could say it high or low and you would still know. Not from the
          volume, not from the word itself. Something else in there carries identity, and it
          survives being squashed down to a few kilohertz of bad codec.
        </Lead>

        <P>
          That something is formants, and once I understood them a lot of unrelated things
          clicked into place at the same time. Why helium does what it does. Why speeding up a
          recording makes a chipmunk instead of a higher version of you. Why your own voice on
          a recording sounds like a stranger. Why a vocoder can replace your pitch entirely
          and your words still come out the other side.
        </P>

        <H2>Your voice is two machines, not one</H2>

        <P>
          The thing to get straight first is that making a vowel involves two completely
          separate pieces of equipment, and they do not know about each other.
        </P>
        <P>
          The first is your vocal folds. Air from your lungs pushes through them and they slap
          together, hundreds of times a second, making a buzz. It is not a pure tone. It is a
          harsh, harmonically rich rasp, much closer to a sawtooth than to anything musical.
          How fast they slap is your pitch, and that is almost all they decide.
        </P>
        <P>
          The second is everything above them. Your throat, your mouth, your tongue, your
          nose, your lips. That is a tube of air with a particular shape, and like any tube of
          air it resonates at particular frequencies. It takes the buzz and boosts some
          frequencies while killing others.
        </P>
        <Callout>
          If you read the piece on oscillators, this should feel familiar. A harmonically rich
          source, then a filter carving it into something with character. Your throat is doing
          subtractive synthesis. The textbooks call it the source and filter model, and it is
          the same architecture as every synth ever built, invented a few hundred million years
          earlier.
        </Callout>
        <P>
          Those boosted bands are the formants. They are properties of the tube, not of the
          buzz, which is the single most important thing about them. Change your pitch and the
          formants stay put. Change the shape of your mouth and they move, even if you hold
          the pitch dead still.
        </P>

        <H2>The proof is a party balloon</H2>

        <P>
          Everyone knows helium makes you sound funny. Almost everyone, me included until I
          looked it up, describes it wrongly as making your voice higher.
        </P>
        <P>
          It does not raise your pitch. Your vocal folds do not care what gas is around them,
          so they keep vibrating at roughly the same rate, and{" "}
          <A href="https://newt.phys.unsw.edu.au/jw/speechmodel.html">
            the pitch stays about where it was
          </A>
          . What changes is the speed of sound, which is far higher in helium than in air. The
          resonant frequencies of a tube depend on how fast sound travels through it, so all
          your formants jump upward while your pitch sits still.
        </P>
        <P>
          You are hearing a timbre change, not a pitch change. And if pitch and formants were
          the same thing, that effect could not exist at all. One balloon disproves it.
        </P>

        <H2>What a formant actually is, with numbers</H2>

        <P>
          Here is the part I like, because you can work it out on the back of an envelope.
        </P>
        <P>
          Treat the vocal tract as a straight tube, closed at the vocal fold end and open at
          the lips, about 17 cm long in an adult man. A tube closed at one end resonates when
          its length is a quarter of the wavelength, and then again at odd multiples of that.
          Sound travels at roughly 343 metres per second. So the lowest resonance sits at:
        </P>
        <Pre>{`f = c / 4L
  = 343 / (4 x 0.17)
  = 343 / 0.68
  ≈ 500 Hz

then odd multiples:  500, 1500, 2500 Hz`}</Pre>
        <P>
          That is the neutral vowel, the lazy &ldquo;uh&rdquo; you make when your mouth is
          doing nothing in particular. Three resonances, roughly evenly spaced, and they come
          out of one length measurement and the speed of sound. No biology required.
        </P>
        <P>
          Now move your tongue. You are no longer a straight tube, you are a tube with a
          narrow bit somewhere, and narrowing a tube in different places pulls its resonances
          apart in different directions. That is all a vowel is.
        </P>

        <H2>Every vowel is two numbers</H2>

        <P>
          The first two formants do almost all the work of telling vowels apart. They are
          called F1 and F2, and they map onto two things you can feel yourself doing.
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">F1 follows how high your tongue is</strong>,
            upside down. High tongue gives a low F1. Open your jaw and drop your tongue and F1
            climbs.
          </LI>
          <LI>
            <strong className="text-foreground">F2 follows how far forward your tongue is.</strong>{" "}
            Push it toward your teeth and F2 goes up. Pull it back toward your throat and F2
            drops.
          </LI>
        </UL>
        <P>
          Roughly, for an adult male voice, from the{" "}
          <A href="https://www.fon.hum.uva.nl/praat/manual/Create_formant_table__Peterson___Barney_1952_.html">
            classic 1952 survey
          </A>{" "}
          that every textbook still quotes:
        </P>
        <Pre>{`vowel        F1      F2       tongue
"ee" (heed)  270    2300     high and forward
"ah" (hod)   730    1100     low and back
"oo" (who'd) 300     870     high and back`}</Pre>
        <P>
          Say those three out loud, slowly, and pay attention to your tongue rather than the
          sound. Then say &ldquo;ee&rdquo; and &ldquo;oo&rdquo; one after the other on exactly
          the same note. Your pitch does not move. The whole difference you hear is two
          resonances sliding around, and your brain is doing the measurement effortlessly and
          has been since before you could talk.
        </P>
        <P>
          This is also why vowels are the hard part of an accent. Languages do not disagree
          much about consonants. They disagree about where in this two dimensional space a
          vowel is allowed to sit, and how many places there are. Spanish has five tidy
          positions. English has about eleven depending on who you ask, and several of them
          are crammed close enough together that if you grew up without the distinction your
          ear genuinely does not separate them.
        </P>

        <H2>So where does the signature live</H2>

        <P>
          F1 and F2 tell you which vowel. They do not tell you who. Identity sits in two other
          places.
        </P>

        <H3>The absolute scale of everything</H3>

        <P>
          Formants depend on tube length, and tube length varies. An adult man runs around
          17 cm, an adult woman more like 14 or 15, a child shorter still. Shorter tube, higher
          resonances, and roughly in proportion. That is why a woman saying &ldquo;ee&rdquo;
          and a man saying &ldquo;ee&rdquo; have clearly different formant values while both
          obviously being &ldquo;ee&rdquo;.
        </P>
        <P>
          Which means your ear is not reading absolute frequencies at all. It is reading the
          pattern, the relationships between the peaks, and normalising out the size of the
          person. You work out roughly how big the speaker is and then interpret the vowel
          relative to that, in the first fraction of a second, without being told. It is a
          genuinely impressive piece of signal processing to get for free.
        </P>

        <H3>The higher formants, which are pure anatomy</H3>

        <P>
          F1 and F2 you control deliberately, because they are what you move your tongue for.
          F3 and above you mostly do not. They come out of the bits of you that are just
          shaped the way they are shaped: the length of your pharynx, how your nasal cavity
          connects, the geometry behind your tongue, whether you round your lips a little more
          than average.
        </P>
        <P>
          So the upper formants, and the fixed little dips and bumps alongside them, are the
          part that says this specific person rather than this kind of person. That is the
          signature. It is why one word is enough, and why it survives a phone line that has
          thrown away everything below 300 Hz and above 3400.
        </P>
        <P>
          Trained singers exploit this on purpose. Opera singers learn to cluster their upper
          formants together into one strong peak around 3 kHz, which happens to be a region
          where an orchestra is relatively quiet and the ear is relatively sensitive. That peak
          is how an unamplified voice gets over an orchestra without shouting. It has a name,
          the singer&apos;s formant, and it is a trick of resonance rather than of volume.
        </P>
        <Callout>
          A small thing I noticed while writing this. The default voice chain in my own library
          boosts 3 dB at 3000 Hz and cuts 2.5 dB at 320 Hz. I set those by ear months ago.
          They are the singer&apos;s formant region and the boxy region respectively, so I had
          independently reinvented a standard vocal EQ by fiddling, which is either reassuring
          or embarrassing.
        </Callout>

        <H3>And why you hate your own voice</H3>

        <P>
          Because you have never heard it. When you talk, a good part of what reaches your
          cochlea comes through the bone of your skull rather than through the air, and bone
          carries the low frequencies much better than the high ones. So the voice you have
          listened to your whole life is bass heavy in a way nobody else&apos;s copy of it is.
        </P>
        <P>
          A recording gives you the air path only, which is the real one. It is not that the
          recording is unflattering. It is that you have been hearing a private version with a
          low shelf on it, and the first time you hear the public version you quite reasonably
          think it belongs to someone else.
        </P>

        <H2>Taking it apart with the library</H2>

        <P>
          This is where I have to be careful, because there are two different things people
          mean by deciphering a voice and{" "}
          <A href={repo}>react-native-audio-effects</A> is good at one of them and cannot do
          the other at all.
        </P>
        <P>
          It cannot measure. There is no FFT, no spectrum, no formant readout, nothing that
          hands you a number for F1. The only real measurement coming back out of the audio is
          one broadband level per source, peak and RMS, and a set of waveform peaks computed
          once when a file loads. Even the oscilloscope is not what it looks like: it draws the
          oscillator&apos;s own shape, computed from the waveform and frequency, because a real
          scope needs a tap streaming frames up to JavaScript, and taps installed on a live
          audio graph have silenced playback more than once in this project. I would rather
          draw something honest than ship a tap that kills the output.
        </P>
        <P>
          What it is good at is the other kind of deciphering. Pulling the source and the
          filter apart so you can hear which one is carrying what, by taking one of them away
          and replacing it.
        </P>

        <H3>The vocoder is the whole idea, made operational</H3>

        <P>
          A vocoder takes the filtering your vocal tract is doing and applies it to something
          that is not your voice. You sing into the microphone, a synth supplies the actual
          sound, and your formants ride on top of it.
        </P>
        <Pre>{`const mic = await LiveInput.open({ instrument: 'voice' });

const vox = await mic.source.addEffect('vocoder');
vox.set('carrier', 1);        // 'Choir': five saws, 28 cents apart
vox.set('pitchSource', 1);    // take pitch from MIDI, not from me
vox.set('bandwidth', 0.5);

if (mic.canMonitor()) mic.monitor(true);`}</Pre>
        <P>
          Set the pitch source to MIDI and the thing becomes a demonstration rather than an
          effect. You speak, and the notes come from the keyboard under your left hand. Your
          pitch has been thrown away completely and replaced by someone else&apos;s decision.
          Your words still come out perfectly intelligible.
        </P>
        <P>
          That is the proof, and you can feel it in a way no diagram gets across. Words live in
          the filter. Pitch lives in the source. They were never the same channel.
        </P>
        <P>
          The carrier choices are a nice side lesson too. There is a reason they are named
          voices rather than a waveform knob: a sine barely speaks at all, because it has
          almost no harmonics for your formants to carve, so there is nothing for the filter to
          work with. A saw stack is most of what anyone means by a vocoder. One saw is a robot.
          Five of them, spread twenty eight cents apart, is a choir.
        </P>

        <H3>Pitch shift, and the chipmunk problem</H3>

        <P>
          Speed up a tape and everything scales together. The harmonics go up, which raises the
          pitch, but the formants go up with them, which tells your ear the tube got shorter.
          You do not hear the same person singing higher. You hear a smaller creature. That is
          the chipmunk, and it is a formant artefact rather than a pitch one.
        </P>
        <P>
          A real pitch shifter moves the harmonics and leaves the resonances where they were,
          so the speaker stays the same size.
        </P>
        <Pre>{`const shift = await mic.source.addEffect('pitchShift');
shift.set('shift', 5);          // semitones, -24 to +24
shift.set('windowSize', 1024);  // 256 to 8192`}</Pre>
        <P>
          The window size is the interesting control and it is a genuine tradeoff rather than a
          quality setting. The algorithm works on chunks, and a chunk has to be long enough to
          contain a few cycles of the lowest note present. Too short and low voices turn
          watery. Too long and transients smear, so consonants go soft and the timing feels
          late. 1024 samples is the default because it is the least bad compromise for a voice,
          and you will want it longer for a bass and shorter for speech you want to stay crisp.
        </P>

        <H3>The formant filter, and faking a voice entirely</H3>

        <P>
          Going the other way is more fun. Take something that has no vocal tract at all and
          give it one.
        </P>
        <Pre>{`const saw = await AudioEngine.createOscillator('sawtooth', {
  frequency: 110,
});

const vowel = await saw.addEffect('formantFilter');
vowel.set('centerFrequency', 730);   // somewhere near "ah"
vowel.set('attackDuration', 8);
vowel.set('decayDuration', 8);`}</Pre>
        <P>
          A sawtooth is the right input for the same reason the vocal folds make a rasp and not
          a whistle: you cannot filter harmonics that are not there. Put resonant vowel shaped
          peaks on a buzzy enough source and it starts to sound like something is trying to
          talk. Sweep the centre frequency slowly with an LFO and you get the classic talking
          synth, which is genuinely just F1 wandering about.
        </P>
        <P>
          And this is what a wah pedal has always been, incidentally. A resonant peak that
          sweeps when you rock your foot. The reason it sounds vocal rather than merely bright
          is that you are moving a formant, and your ear has spent its whole life watching
          formants move.
        </P>

        <H3>The one honest way to measure something</H3>

        <P>
          If you really do want numbers out of it, there is a way to build a crude analyser
          from parts that ship today, and I want to describe it accurately rather than
          promise it works.
        </P>
        <P>
          Levels are reported per source. So load the same file into several sources, put a
          band pass filter on each at a different centre frequency with the resonance up, and
          read the RMS of each from the levels event. Eight sources gives you an eight band
          spectrum at thirty readings a second, which is enough to see F1 and F2 move as
          somebody slides from &ldquo;ee&rdquo; to &ldquo;ah&rdquo;.
        </P>
        <Pre>{`AudioEngine.setMetering(true, 33);   // ~30 Hz

const stop = AudioEngine.onLevels(({ sourceId, rmsLeft }) => {
  bands[sourceId] = rmsLeft;         // one band per source
});`}</Pre>
        <P>
          The honest caveats. That is several decoders running on the same audio, and keeping
          them lined up is your problem, not the library&apos;s. Eight band passes is a coarse
          picture next to an actual FFT. And it works on a file rather than on live input,
          because there is one microphone and I have not tried opening it eight times over and
          would not assume it works. It is a toy, but it is a toy that would genuinely show a
          singer their vowel moving, and that is most of what a training app needs.
        </P>

        <H2>What I would build</H2>

        <P>
          A vowel trainer, and I am surprised it is not already everywhere. Show the two
          dimensional space, put a dot where the singer currently is, draw a target where the
          vowel should be, and ask them to move the dot. That is the entire interface.
        </P>
        <P>
          It works for singing, where holding a consistent vowel through a phrase is a real
          skill people pay teachers to drill. It works harder for language learning, because a
          vowel you cannot hear is a vowel you cannot copy, and a visual target sidesteps the
          part of the problem where your ear is the thing that is broken. Someone struggling
          with a distinction their first language does not have is not failing to try. They are
          being asked to aim at something they cannot see, which is exactly the problem a dot
          on a chart solves.
        </P>
        <P>
          All of the voice effects are iOS only at the moment, since they come from AudioKit
          and the Android DSP library has no equivalents. I would rather say that plainly than
          have someone discover it after a weekend.
        </P>

        <H2>The bit I keep thinking about</H2>

        <P>
          You are a tube with a buzzer at one end. Pitch is the buzzer, words are the shape of
          the tube, and identity is the handful of resonances you were born with and cannot
          move. That is a slightly deflating description of something as personal as a voice,
          and I find it has the opposite effect on me.
        </P>
        <P>
          Because the useful consequence is that all three can be separated. Replace the buzzer
          and the words survive. Fill the tube with helium and the words survive. Change the
          tube and the same buzzer says something completely different. Every voice effect worth
          anything, from a vocoder to autotune to the thing that makes your words come out of a
          guitar, is just a different answer to the question of which of those three you are
          going to swap out.
        </P>

        <div className="mt-14 pt-8 border-t border-edge">
          <p className="text-sm text-muted mb-4">
            The voice effects and the input profiles live in <Code>src/schema</Code>, and the
            vocoder carrier voices are at the bottom of <Code>effects.ts</Code> if you want to
            see what each one is made of.
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
