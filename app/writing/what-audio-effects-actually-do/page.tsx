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

const post = getPost("what-audio-effects-actually-do")!;
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
          You already know what every one of these sounds like. The echo when you shout in a
          tunnel. The way your voice suddenly sounds good in the shower. The robot voice in
          an old video game. The whoosh in a rock song. You&apos;ve heard all of it thousands
          of times, you just might not know that each one has a name and a handful of numbers
          behind it.
        </Lead>

        <P>
          I spent a good part of this year putting seventeen of these into{" "}
          <A href={repo}>react-native-audio-effects</A>, which is a library that lets a React
          Native app process sound while it plays. So I&apos;ve had to think quite carefully
          about what each one actually does, because I had to write the knob for it.
        </P>
        <P>
          This is the explanation I wish someone had given me when I started making music.
          No studio jargon. Then, at the end, some things you could build with it, because
          honestly most of the fun ideas here have nothing to do with making records.
        </P>

        <H2>Almost every effect is one of three tricks</H2>

        <P>
          This took me embarrassingly long to notice. The effects list looks like seventeen
          unrelated things with mysterious names. It isn&apos;t. Nearly all of them are one
          of these:
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">A copy of the sound that arrives late.</strong>{" "}
            Delay, reverb, chorus, flanger, phaser. All the same trick at different speeds.
          </LI>
          <LI>
            <strong className="text-foreground">Taking some frequencies away.</strong> Filters
            and EQ. Nothing is added, things are removed.
          </LI>
          <LI>
            <strong className="text-foreground">Moving the volume for you.</strong> Compressor,
            limiter, noise gate, tremolo. An automatic hand on the volume dial.
          </LI>
        </UL>
        <P>
          Once you see it that way the whole list collapses into something you can hold in
          your head. So let me go through them in that order.
        </P>

        <H2>Trick one: a copy that arrives late</H2>

        <H3>Delay</H3>

        <P>
          Stand at one end of a long corridor and shout. You hear yourself again, slightly
          quieter, a moment later. That&apos;s a delay. The sound went to the wall and came
          back, and it took time to do it.
        </P>
        <P>
          There are only really two numbers that matter. How long until the copy shows up,
          and how much of that copy gets sent back around to make another one. The second
          number is called feedback, and it&apos;s the one that gives you the endless
          dissolving repeats.
        </P>
        <Pre>{`const delay = await source.addEffect('delay');
delay.set('time', 300);      // ms before the copy arrives
delay.set('feedback', 0.45); // how much of it loops back
delay.set('mix', 0.3);       // how loud the copies sit`}</Pre>
        <P>
          In the library, time runs from 1 to 2000 milliseconds and feedback stops at 0.95.
          That ceiling is deliberate. At 1.0 each repeat comes back as loud as it went in,
          nothing ever decays, and you have built a machine that gets louder forever. Great
          fun once, then your ears hurt.
        </P>
        <Callout>
          A nice detail about scale. At 300 milliseconds you hear a distinct echo. Shorten it
          to about 30 and the repeat is too close for your brain to separate, so instead of
          two sounds you hear one slightly weird sound. Shorten it further and you get the
          effects in the next three sections. Same code, same parameter, completely different
          perception.
        </Callout>

        <H3>Reverb</H3>

        <P>
          Reverb is what happens when there isn&apos;t one wall but hundreds of surfaces, and
          the copies come back thousands of times from every direction, smeared into a wash
          you hear as space rather than as echoes.
        </P>
        <P>
          This is the shower thing. Hard tiles, a small box, every reflection comes straight
          back at you. Your voice gets a tail on it, the cracks get filled in, and you sound
          considerably better than you do in a carpeted living room. Nothing about your
          singing changed. The room did it.
        </P>
        <P>
          Two controls do most of the work. Size, which is how long the tail hangs around,
          and damping, which is how much of the bright, hissy top end the surfaces eat. High
          damping is a room full of curtains and sofas, warm and soft. Low damping is a tiled
          bathroom or a stairwell, bright and harsh.
        </P>
        <Pre>{`const reverb = await source.addEffect('reverb');
reverb.set('roomSize', 0.8);  // long tail
reverb.set('damping', 0.5);   // how warm the tail is
reverb.set('mix', 0.3);`}</Pre>
        <P>
          Worth knowing if you ever get into this properly: reverb is the single most common
          way beginners ruin a recording. It sounds lovely while you add it and then the whole
          thing is a puddle. The fix is nearly always less than you think.
        </P>

        <H3>Chorus</H3>

        <P>
          Get a room of people to sing happy birthday. Nobody is exactly in tune with anyone
          else, and nobody starts exactly on time. That slight mess is why a crowd sounds so
          much bigger and warmer than one person, even when the one person is a better singer.
        </P>
        <P>
          Chorus fakes that. It takes your sound, makes a copy delayed by a few milliseconds,
          and then slowly wobbles that delay so the copy drifts in and out of tune with the
          original. One voice, but a thicker, slightly unsteady one. If you&apos;ve heard
          eighties guitars or almost any dreamy synth pad, you&apos;ve heard it.
        </P>
        <P>
          Rate is how fast the wobble moves, from 0.1 Hz, which is one slow sweep every ten
          seconds, up to 10 Hz, which is fast enough to sound seasick. Depth is how far out of
          tune the copy is allowed to drift.
        </P>

        <H3>Flanger and phaser</H3>

        <P>
          These are the whoosh. The jet plane sweep in old rock records, the sound of a
          helicopter passing through a drum kit.
        </P>
        <P>
          A flanger is a chorus with the delay made much shorter and the copy fed back into
          itself. At that distance the copy and the original start cancelling each other out
          at specific frequencies, and because the delay is moving, the frequencies being
          cancelled move too. That sweeping notch is the whoosh. You are literally hearing
          sound waves deleting each other.
        </P>
        <P>
          A phaser gets to a similar place by shifting the timing of frequencies by different
          amounts rather than delaying the whole thing, which gives a rounder, more liquid
          version of the same sweep. On Android the library exposes how many stages it uses,
          from 2 to 12, which sets how many notches sweep at once. On iOS it doesn&apos;t,
          because the underlying node has a fixed shape and I would rather disable a control
          than ship one that lies.
        </P>
        <P>
          One genuinely fun thing: the flanger&apos;s feedback goes negative, down to minus
          0.95. Flipping the copy upside down before feeding it back changes which frequencies
          cancel, and the sweep goes from a thick jet whoosh to something thin and hollow. It
          costs one minus sign and sounds like a different effect.
        </P>

        <H2>Trick two: take some frequencies away</H2>

        <P>
          Your neighbour plays music through a wall and you hear the bass but not the words.
          Someone calls you and their voice is thin and boxy. A car goes past with the windows
          up and you get thump but no cymbals. All three are filters, and all three are doing
          it by throwing frequencies away.
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">Low pass</strong> keeps the low frequencies and
            removes the high ones. This is the wall, the pillow over your head, the muffled
            sound of a party from outside.
          </LI>
          <LI>
            <strong className="text-foreground">High pass</strong> is the opposite. Keeps the
            top, removes the weight. Everything sounds thin and distant, like a small cheap
            speaker.
          </LI>
          <LI>
            <strong className="text-foreground">Band pass</strong> keeps a slice in the middle
            and discards both ends. That&apos;s your phone call voice, or a megaphone.
          </LI>
        </UL>
        <P>
          Cutoff is the point where the removal starts. Resonance is the odd one. It makes a
          narrow band right at the cutoff point louder instead of quieter, which puts a sharp
          ringing emphasis there. Resonance is what makes a filter sweep sound like a sound
          rather than like someone turning the treble down, and it is the entire reason
          electronic music has a vocabulary for this.
        </P>
        <P>
          An EQ is the same thing with manners. Four bands, each one picking a frequency, how
          much to add or remove, and how wide an area around it to affect. It&apos;s the tone
          knob on a stereo, with four of them, each pointed wherever you like.
        </P>
        <Callout>
          The schema caps EQ gain at ±20 dB, which is Apple&apos;s limit, not mine. The Android
          backend would go to ±24. I use the narrower of the two everywhere, so a value that
          is legal in the library sounds the same on both phones rather than being quietly
          clamped on one of them. The noise gate floors at minus 40 dB for the same reason.
        </Callout>

        <H2>Trick three: move the volume for you</H2>

        <P>
          Ever notice that adverts feel louder than the programme, even though your TV
          volume never moved? Or that podcast voices sit at exactly the same level whether
          the person is shouting or whispering? That&apos;s a compressor, and it is probably
          the most used and least understood effect there is.
        </P>
        <P>
          Picture someone with their hand on a volume dial whose only job is to pull it down
          whenever the sound gets too loud, then let it back up. Threshold is how loud is too
          loud. Ratio is how hard they pull. Attack is how quickly they react, and release is
          how quickly they let go.
        </P>
        <Pre>{`const comp = await source.addEffect('compressor');
comp.set('threshold', -18);  // dB, where it starts working
comp.set('ratio', 4);        // 4:1, fairly firm
comp.set('attack', 10);      // ms before it reacts
comp.set('release', 120);    // ms before it lets go
comp.set('makeupGain', 6);   // put back what it took`}</Pre>
        <P>
          Here is the part that confuses everyone, me included for years. A compressor makes
          things quieter. The reason it makes things sound louder is that once the loudest
          peaks are pulled down you can turn the whole lot up, and now the quiet parts are
          much louder than they were. That last step is makeup gain. This is also why the
          loudness war happened, and why some records from the 2000s are exhausting.
        </P>
        <P>
          A limiter is the same idea taken to the extreme, a wall that absolutely nothing gets
          past. A noise gate is the mirror image: instead of taming what is too loud it mutes
          what is too quiet. It&apos;s how you get rid of the room hiss and the air
          conditioning between words in a voice recording.
        </P>
        <P>
          Tremolo is the simplest member of the family and the easiest to hear. It just turns
          the volume up and down over and over. Slow, it is a pulse. Fast, around 8 Hz, it is
          the shivering sound in surf guitar and old electric pianos.
        </P>

        <H2>Breaking it on purpose</H2>

        <P>
          Distortion is what happens when you ask something to be louder than it can be. The
          tops of the waves get flattened off because there is nowhere left to go, and that
          flattening adds a load of harmonics that were never there. It is the sound of an
          amp being pushed, a phone speaker at full volume, someone shouting into a cheap
          microphone.
        </P>
        <P>
          A bit crusher breaks it the other way, by taking away detail instead of adding it.
          Audio is stored as a long list of numbers, and you can make those numbers coarser
          or take fewer of them per second. Do that and you get the sound of early video
          games, a walkie talkie, a ringtone from 2003. The library goes down to one bit per
          sample and 1000 samples a second, which is comprehensively destroyed and quite
          satisfying.
        </P>
        <P>
          Both are iOS only at the moment. The Android DSP engine I use ships no distortion
          stage, so rather than quietly produce silence,{" "}
          <Code>addEffect(&apos;bitCrusher&apos;)</Code> rejects on Android and the control
          disappears from the UI. I would much rather a developer gets an error on their
          machine than a user gets nothing and no explanation.
        </P>

        <H2>Making this run on a phone</H2>

        <P>
          A quick word on the engineering, because this is where most of the actual work went.
        </P>
        <P>
          Audio is unforgiving in a way most app code is not. The sound card asks for the next
          few hundred samples every few milliseconds, and if you are late even once there is
          a click. You cannot be late. That means the real processing cannot live in
          JavaScript, so it doesn&apos;t. On iOS it is Swift on top of AudioKit, on Android it
          is Kotlin on top of Klarinet and Oboe, and the two are joined to React Native
          through a TurboModule.
        </P>
        <P>
          The piece I am most pleased with is boring to look at. Every parameter of every
          effect is described once, in one file: its range, its default, its unit, the curve
          it should move along, and which platforms actually support it. The native code reads
          that file. The knobs are generated from that file. So a knob cannot show a range the
          effect behind it doesn&apos;t have, because there is no second place to write it
          down. Every bug of that shape I have ever had in audio code came from the number
          being described in two places.
        </P>
        <P>
          Two more decisions that took longer than they look. Knob drags run on the UI thread
          through a gesture worklet, so the knob keeps following your finger even while
          JavaScript is busy decoding a file, which is exactly when a stutter would be most
          obvious. And the modulation oscillator that sweeps parameters for you runs on a
          plain timer rather than inside the DSP, because parameter writes are synchronous
          and a slow sweep at 60 updates a second costs effectively nothing. Not everything
          has to be clever.
        </P>

        <H2>Things you could build with it</H2>

        <P>
          This is the part I find more interesting than the music side, genuinely. Here is
          what I keep coming back to.
        </P>

        <H3>A sleep and focus sound app</H3>

        <P>
          People pay real money for apps that play rain. You can build a better one from
          parts. The library has white, pink and brown noise built in, where brown is the deep
          rumbly one that most people actually find calming. Run it through a low pass filter
          to take the hiss off, then put a very slow tremolo on top, something like 0.2 Hz,
          and the level rises and falls like waves on a beach.
        </P>
        <Pre>{`const noise = await AudioEngine.createOscillator('brownNoise', {
  amplitude: 0.4,
});
const lpf = await noise.addEffect('lowPassFilter');
lpf.set('cutoff', 900);

const waves = await noise.addEffect('tremolo');
waves.set('rate', 0.2);   // one swell every five seconds
waves.set('depth', 0.35);

await noise.play({ loop: true });`}</Pre>
        <P>
          That is a handful of lines and no audio files at all, which means no download, no
          storage, and it never loops audibly because nothing is looping. Give the user two
          sliders and they can tune it to their own ears, which is something no fixed
          recording can offer.
        </P>

        <H3>A voice note transformer</H3>

        <P>
          Record a voice note, run it through a chain, send the silly version to your friends.
          You can build characters out of what is there: a band pass filter around 1 kHz for
          the phone call voice, a bit crusher for walkie talkie, distortion for megaphone, a
          slow chorus with a low pass for underwater, a 300 millisecond delay with high
          feedback for a voice disappearing down a well.
        </P>
        <P>
          Two honest limitations. Live microphone monitoring isn&apos;t in yet, it&apos;s on
          the roadmap, so today this works as record first then transform rather than hearing
          yourself change in real time. And there is no pitch shifting, so you cannot do
          chipmunk or demon voices. Those two are the most requested things on my own list,
          and I am not going to pretend they are there.
        </P>

        <H3>A keyboard that teaches you the keyboard</H3>

        <P>
          This one I actually want to exist. The kit includes a playable keyboard component
          that does all 88 keys with scrolling, plus the note name helpers and a synth
          underneath it, so you are not starting from zero.
        </P>
        <Pre>{`const synth = await PolySynth.create({
  waveform: 'triangle',
  mode: 'poly',
  maxVoices: 8,
});

<Keyboard
  fullRange
  onNoteOn={(midi) => synth.noteOn(midi)}
  onNoteOff={(midi) => synth.noteOff(midi)}
  activeNotes={synth.activeNotes}
/>`}</Pre>
        <P>
          From there the teaching ideas write themselves. Light up the three keys of a chord
          and ask the learner to find them. Show scales as you go up. Say the note name out
          loud when a key is pressed. Nobody needs to own a piano for any of this, and the
          notes are standard MIDI numbers, so the same code works with a real controller
          plugged in later.
        </P>

        <H3>An ear training game</H3>

        <P>
          Play two sine tones and ask which is higher. Play an interval and ask what it was.
          Detune one oscillator against another by a few cents and ask the player to tune it
          back by ear, which is the actual skill every guitarist eventually has to learn.
        </P>
        <P>
          A sine wave is a pure tone with no harmonics, which makes it the honest choice for
          this, because there are no overtones to give the answer away. The library has a
          helper for cents of detune and one for turning MIDI numbers into frequencies, and
          it takes a tuning reference, so you can run the whole thing at 432 Hz instead of 440
          if you want to be that person.
        </P>

        <H3>A thing that shows people what a synth is</H3>

        <P>
          Most people have no idea that a synthesiser is just a shape of wave plus a filter
          plus an envelope, and that you can hear each piece do its job. A single screen with
          one waveform selector, one filter, and a visible envelope would teach more in two
          minutes of poking than an hour of video.
        </P>
        <P>
          The envelope is the clearest part to demonstrate. Four numbers decide whether a note
          sounds like a plucked string or a slow pad. Attack is how long it takes to get loud,
          decay and sustain are where it settles while you hold it, release is the tail after
          you let go. Set attack to 1 millisecond and it is a pluck. Set it to 2000 and the
          note swells in like someone leaning on an organ. Same oscillator, same note, and
          people get it instantly once they can hear it.
        </P>

        <H2>Where it actually is right now</H2>

        <P>
          Since I would rather you hear it from me: the library is on npm and the single
          source path works well, but chaining effects on iOS hits an unresolved bug in how I
          mutate the audio graph while it is running, which also takes out polyphony and
          unison on iOS. Android is in better shape. Microphone input and pitch shifting are
          both on the roadmap rather than in the box.
        </P>
        <P>
          I am writing that down partly because it is true and partly because audio libraries
          have a reputation for README files that describe a thing more finished than what you
          get, and I have lost enough weekends to those that I am not adding to the pile.
        </P>

        <H2>Why I think this is worth your time</H2>

        <P>
          Effects are not really a toolbox, they are a vocabulary. Once you know that a wash
          of sound is a thousand late copies, and that a muffled room is the top end being
          removed, and that the invisible hand on the volume dial has a name, you start
          hearing them everywhere. In adverts. In film sound. In the way a voice note from
          someone in a stairwell sounds different from one sent from a car.
        </P>
        <P>
          And the gap between understanding that and building something with it is much
          smaller than it used to be. The phone in your pocket has more audio processing power
          than the studios that invented most of these effects. The only thing in the way is
          that the tools for it have historically been desktop tools written in C++ by people
          who had already given their life to it.
        </P>
        <P>
          That is the whole reason I built this. Not so producers get another plugin. So that
          someone who has an idea for a sound app can have it working on a phone in an
          afternoon.
        </P>

        <div className="mt-14 pt-8 border-t border-edge">
          <p className="text-sm text-muted mb-4">
            The library is open source, and the effect definitions I kept quoting live in{" "}
            <Code>src/schema</Code> if you want to see the actual numbers.
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
