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

const post = getPost("an-agent-for-sound-design")!;
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
          &ldquo;Can you make it warmer?&rdquo; is probably the most common sentence said in a
          studio, and nobody who says it can tell you what it means. Ask three engineers and you
          get three different knobs. They are all right. That is the problem, and it is a much
          worse problem once you decide a computer should understand the word.
        </Lead>

        <P>
          I have been building a React Native audio library, and part of it lets you describe a
          sound in words instead of dragging sliders. You type &ldquo;warm huge supersaw&rdquo;
          and you get a patch. It works, which was the easy part. Making it work the way a person
          expects when they say the same word twice is where I spent the real time, and that
          turned into something I eventually wrote down as a skill file so I would stop solving it
          from scratch every few weeks.
        </P>
        <P>
          This is that file, explained. Partly because the step by step is genuinely useful if you
          are doing anything similar, and partly because writing it forced me to admit what sound
          design actually is, which is not what I assumed when I started.
        </P>

        <H2>The word that broke it</H2>

        <P>
          I had a trait called <Code>airy</Code>. It was supposed to add sheen, the expensive
          shimmer at the very top of a mix. What it actually was, in the code, was an alias of{" "}
          <Code>bright</Code>. Same moves, different name. I had written it in a hurry and thought
          of them as the same idea.
        </P>
        <P>
          So when I asked for sheen, the library opened the filter. Which does make a sound
          brighter in one sense, in the way that turning up the lights makes a room brighter. It
          is not sheen. Sheen is a specific thing happening in a specific narrow band near the
          ceiling, and opening a filter gets you none of it. The word was pointing at the wrong
          mechanism, confidently, and because it did something that was sort of in the right
          direction I did not notice for a while.
        </P>
        <P>
          That bug is the whole reason the rest of this exists. English sound words are not
          imprecise. They are overloaded, which is different and much worse, because an overloaded
          word feels like it works right up until you need it to be exact.
        </P>

        <H2>Every sound word is at least three words</H2>

        <P>
          Here is the table I keep at the top of the file now. Left column is a word a person
          might say. Right column is the list of completely different things they might mean by
          it.
        </P>

        <Pre>{`brighter   a higher ceiling, or resonance near the top,
           or a lift around 3 to 5 kHz
fatter     low shelf up, or more unison, or saturation
wider      stereo spread of the stack, or chorus and delay
harder     drive, or compression ratio, or attack time
thinner    high pass up, or low shelf down
warmer     ceiling down, or air down, or second harmonic
           saturation`}</Pre>

        <P>
          Read &ldquo;thinner&rdquo; again, because it is the clearest one. Taking the bottom away
          with a high pass and pulling a low shelf down are not the same operation and do not
          sound the same. One removes the bottom entirely and leaves a telephone. The other keeps
          the bottom and makes it quieter. Both are &ldquo;thinner&rdquo;. If you pick wrong, your
          app does something defensible and wrong.
        </P>
        <P>
          So the rule the file opens with is: before you add a word, decide which mechanism it is,
          implement only that one, and name its siblings in the description so the next person does
          not quietly collapse them back together. The description field is not documentation. It
          is a fence.
        </P>

        <Callout>
          The real reason to keep them separate is not tidiness. A trait that does all of a
          word&apos;s mechanisms at once cannot be said twice usefully, and cannot be opposed by
          anything. It has no opposite and no second application. It is a button, not a word.
        </Callout>

        <P>
          Which gives a useful test for whether you have carved a word correctly. If a trait has
          no natural opposite, it is probably one word doing three jobs. <Code>bright</Code> is
          opposed by <Code>warm</Code> and <Code>dark</Code>. <Code>airy</Code> is opposed by{" "}
          <Code>warm</Code> too, but up in a different place, and there is a test that asserts
          exactly that: warm and airy have to fight each other at the top without being the same
          argument.
        </P>

        <H2>How sound design is actually done</H2>

        <P>
          This is the part I would want if I were coming at this from outside. Sound design looks,
          from a distance, like a wall of knobs and some arcane knowledge about which one to turn.
          It is not that. It is two moves repeated, and once you see the shape of it the wall of
          knobs stops being intimidating.
        </P>

        <H3>You start from something recognisable</H3>

        <P>
          Nobody builds a sound from nothing. You start from a thing that is already clearly a
          kind of instrument and you push it around. In the library those starting points are
          called base patches, and there are six of them, which is roughly the vocabulary a pop
          record uses.
        </P>

        <Pre>{`supersaw   7 saws, 30 cents apart, hard across the stereo field
pad        triangle, 5 voices, 500 ms in and 1200 ms out
pluck      square, 2 voices, 2 ms attack, nothing held
bass       one saw, mono, filter at 1800 Hz, compressed
lead       3 saws, filter wide open at 11 kHz, delay behind it
bell       sine, struck once, 900 ms decay, never comes back`}</Pre>

        <P>
          The thing worth noticing is how boring those are. That is deliberate and it took me a
          couple of attempts to accept. My first bases were good sounds, the kind you would
          actually use, and they were useless as bases, because a sound that is already at one
          extreme has nowhere left to go. If a patch arrives with the filter already wide open,
          &ldquo;brighter&rdquo; does nothing and the word looks broken. A base needs headroom in
          every direction, which means it has to be slightly disappointing on its own.
        </P>
        <P>
          The envelope numbers are the whole personality, incidentally. The pluck and the pad have
          the same job description and sound nothing alike because one of them reaches full volume
          in two milliseconds and holds nothing, and the other takes half a second to arrive and
          then refuses to leave. Attack and release do more for the identity of a sound than most
          of the filter choices do.
        </P>

        <H3>Then you move it, and the map is frequency</H3>

        <P>
          The second move is pushing bands of frequency up or down, and this is where the arcane
          knowledge turns out to be a single table that everyone in the field has memorised and
          nobody writes down for beginners. So here it is, with the names people actually use.
        </P>

        <Pre>{`under 60 Hz    sub         weight on a kick or bass
60 to 120      bottom      power, the note under the note
120 to 250     body        warmth, fullness
250 to 500     mud         nothing, usually
300 to 600     boxy        the honk of a guitar pickup
800 to 1500    nasal       growl on a bass, honk on everything else
2 to 4 kHz     harsh       attack and aggression, and fatigue
3 to 5 kHz     presence    closeness, consonants, pick attack
6 to 8 kHz     sibilance   ess sounds, fizz on distortion
8 to 12 kHz    air         sheen, sparkle, expensiveness`}</Pre>

        <P>
          Two columns of that table are doing most of the work in practice. The band around 250 to
          500 Hz is, as far as I can tell, the most cut band in all of recorded music. It is where
          every instrument has some energy and none of them need it, so when a mix sounds like a
          duvet is over it, that is usually the answer. And 8 to 12 kHz is why expensive recordings
          sound expensive. It is almost entirely nothing but the perception of air up there is
          worth a disproportionate amount.
        </P>
        <P>
          The other thing the table does not say, and which matters as much as the numbers, is that
          how wide you make the move changes what it is. A broad lift reads as tone. A narrow lift
          at the same gain reads as a thing ringing. Same band, same decibels, completely different
          impression.
        </P>

        <Callout>
          Resonance is half of the perception. Up in the air band, a Q past about 4 stops being air
          and becomes a sine tone riding on top of your signal. There is a test asserting that
          saying <Code>airy</Code> repeatedly stays under it, because the easiest way to ruin that
          word is to let it converge somewhere that whistles.
        </Callout>

        <P>
          That test exists because I found the whistle by accident. Saying a word three times in a
          row is something a person will absolutely do, and a move that is correct once can be
          wrong by the third application. Convergence is a feature you have to design, not
          something arithmetic gives you for free.
        </P>

        <H2>A trait is a move, not a value</H2>

        <P>
          Here is the design decision the whole thing rests on, and it is one line: a word sets a
          direction, never a destination.
        </P>
        <P>
          The obvious implementation of &ldquo;warm&rdquo; is to assign the cutoff to 2500 Hz. It
          is one line, it is easy to test, and it is wrong, because &ldquo;warmer&rdquo; has to mean
          warmer than this. If you assign, then saying it twice does nothing the second time, and
          the result is identical no matter what was playing when you said it. You have built a
          preset and called it a word.
        </P>
        <P>
          So every move closes a fraction of the distance to a target instead. Here is{" "}
          <Code>warm</Code> as it actually is in the file.
        </P>

        <Pre>{`{
  name: 'warm',
  aliases: ['warmer', 'mellow', 'round', 'soft-top', 'smooth'],
  description: 'Top end rolled off and the air shelf pulled down.',
  requires: [
    { type: 'lowPassFilter', params: { cutoff: 12000 } },
    { type: 'parametricEq', params: {} },
  ],
  moves: [
    { effect: 'lowPassFilter', key: 'cutoff', toward: 2500, by: 0.5 },
    { effect: 'parametricEq', key: 'band3Gain', add: -2 },
  ],
}`}</Pre>

        <P>
          <Code>toward: 2500, by: 0.5</Code> means go halfway there from wherever you are. Start at
          12000 Hz and one &ldquo;warmer&rdquo; puts you at 7250. Another puts you at 4875. Then
          3687.5, then 3093.75. It converges on 2500 and never crosses it, which gives you three
          properties you want and would not get from assignment:
        </P>

        <UL>
          <LI>
            Saying it twice is warmer than saying it once, which is the entire reason the word is
            worth typing instead of a number.
          </LI>
          <LI>
            It converges instead of oscillating or running off the end, so a person hammering the
            word gets diminishing returns rather than a broken sound.
          </LI>
          <LI>
            The result depends on where the parameter already was, which is what makes the
            instruction relative rather than absolute. That is the whole difference between a word
            and a preset.
          </LI>
        </UL>

        <P>
          The fraction matters more than you would think. The file says keep <Code>by</Code>{" "}
          between 0.5 and 0.8. Below about 0.4 the word feels broken, because a person says it,
          hears almost nothing, and concludes the feature does not work. At 1.0 you have reinvented
          assignment with extra steps. There is no clever reason for that range, it is just where
          it stopped feeling wrong.
        </P>
        <P>
          Decibels are the exception and use <Code>add</Code> instead, because when somebody says a
          band should come down a bit they do mean a fixed step rather than a fraction of the way
          to somewhere. Two dB is two dB regardless of where you started.
        </P>

        <H3>The rule I keep having to remember</H3>

        <P>
          <Code>requires</Code> lists effects the moves need, and they get added with sensible
          values if the chain does not have them. A trait that lowers a cutoff is useless on a
          patch with no filter, so <Code>warm</Code> brings a filter with it.
        </P>
        <P>
          The mistake, which I made, is to treat that as symmetric. <Code>clean</Code> backs drive
          out of a distortion. So does it require a distortion? No. On a patch with nothing
          distorted, &ldquo;clean&rdquo; is nothing to do, not an instruction to insert a
          distortion so there is something to turn down. Adding an effect in order to reduce it is
          a change that is audible, pointless, and surprising, and it took a confusing listen to
          spot. There is a test for it now, and the file states it in bold, which tells you how I
          felt about the hour I lost.
        </P>
        <P>
          Order matters too, which falls out of the arithmetic rather than being designed in. Bright
          then warm does not land where warm then bright does, for exactly the same reason it would
          not on a real instrument. I decided to keep that rather than normalise it, because it is
          the honest behaviour and because a person saying two words in a sentence does mean them in
          that order.
        </P>

        <H2>Why this is a table and not a prompt</H2>

        <P>
          The temptation, obviously, is to hand the whole problem to a language model. Describe the
          sound, ask for the parameters, done.
        </P>
        <P>
          I tried that and it is half right. A model is genuinely good at the shape of the
          question: which effects, in what order, roughly where. It is mediocre at exact numbers,
          in a way that is hard to see because the numbers always look plausible. Ask for warm and
          you get a cutoff that is a reasonable cutoff and bears no particular relationship to the
          one you got last time or to what was already playing.
        </P>
        <P>
          The table is the exact opposite. It knows nothing at all about intent and is completely
          exact about what warmer does to a cutoff. So they divide cleanly: the model picks a base
          and some words, and the table does the arithmetic. Which has a side effect I like more
          than I expected, which is that the feature works with no model and no API key at all,
          because a plain vocabulary parser can pick the words out of a sentence for most of the
          phrasings people actually type.
        </P>
        <P>
          I wrote about the same split{" "}
          <A href="/writing/sample-search-in-plain-english">when I built sample search</A>, and I
          have come round to thinking it is the general shape rather than a coincidence. Let the
          model do ambiguity. Do not let it do arithmetic.
        </P>

        <H3>The parser mistakes are funnier than the DSP ones</H3>

        <P>
          Names and aliases share one namespace, and a collision there is silent, which is a
          combination that produces excellent bugs.
        </P>
        <P>
          I had <Code>o</Code> as an alias for a diminished chord, because that is how it is
          written. So &ldquo;do the thing&rdquo; parsed as a D diminished chord. So did
          &ldquo;go&rdquo;. The parser was not wrong exactly, it was reading a perfectly valid
          chord symbol that happened to be sitting inside an English word, and the result was that
          casual phrasing started playing music at me.
        </P>
        <P>
          The other one is subtler. <Code>pad</Code> is the name of a base patch, and it was also
          an alias of the <Code>lush</Code> trait, which is what a pad sounds like. The parser
          takes bases before traits, so the trait alias could never fire. Not an error, not a
          warning, just a word that silently did a different thing than the one I wrote. Both of
          those are now a test asserting every name and alias is globally unique, which is the kind
          of test that looks like bureaucracy until it catches something.
        </P>

        <H2>The skill, step by step</H2>

        <P>
          This is the actual workflow at the bottom of the file, which is what the agent follows
          when I ask it to add or fix a word. Six steps, and the ordering of them is the opinion.
        </P>

        <Pre>{`1. Read the relevant table before editing it.
2. Make the change. One mechanism per trait.
3. Add the test that pins the mechanism, not the value.
4. npx jest src/schema src/sound  &&  npx tsc --noEmit
5. Hand over the diff with what to listen for.
6. Prateek listens. His correction edits the table.`}</Pre>

        <H3>1. Read the table first</H3>

        <P>
          Sounds like filler. It is the step that stops the most damage, because the schema is the
          only source of truth for parameter ranges and it moves. Writing a move against a
          remembered range is how you end up with a trait that targets a value the parameter cannot
          hold, which does not fail loudly, it just quietly clamps and underdelivers forever.
        </P>
        <P>
          The structural version of that rule is: never hard code a range anywhere.{" "}
          <Code>getParam(type, key)</Code> has it, and the quantiser clamps to it, which is why a
          trait physically cannot write an illegal value even when its target is nonsense. Getting
          a move wrong should produce a disappointing sound, never a broken engine.
        </P>

        <H3>2. One mechanism per trait</H3>

        <P>
          The <Code>airy</Code> lesson, encoded. If you are about to write a word that does three
          things, you are about to write a word that cannot be said twice and has no opposite. Pick
          one, name the other two in the description, and let somebody add them later as their own
          words.
        </P>

        <H3>3. Pin the mechanism, not the value</H3>

        <P>
          This is the step I would most want to argue for, because it is where most people write the
          test wrong, me included.
        </P>
        <P>
          The tempting test is that warm puts the cutoff at exactly 2812 Hz. It is easy to write and
          it will break the first time I tune the number, which is to say the first time the thing
          improves. A test that fails when the code gets better is worse than no test.
        </P>
        <P>
          So the tests assert relationships instead. Warm lowers the cutoff and bright raises it.
          Twice lowers it further than once. Ten times converges rather than overshooting. Airy puts
          a peak in the air band and does not touch the ceiling, while bright moves the ceiling and
          broadens the top. No trait can produce a patch the engine would reject, and that one is a
          property test running every trait against every base patch, which is the cheapest
          confidence in the whole repo.
        </P>

        <Pre>{`it('says it twice and means it more', ...)
it('converges on the target instead of overshooting', ...)
it('is relative to what is already there', ...)
it('does not add an effect just to back it off', ...)
it('bright raises the ceiling; airy does not touch it', ...)
it('warm and airy oppose each other up top', ...)`}</Pre>

        <P>
          Read those test names again as a list. They are not describing numbers, they are
          describing what it means for a word to behave like a word. That is the specification, and
          it happens to be executable.
        </P>

        <H3>4. The two commands</H3>

        <P>
          Everything in this layer is pure data and pure functions. No engine, no native code, no
          device. Which means the entire vocabulary can be changed and verified in about four
          seconds, and only the sound itself needs a human.
        </P>
        <P>
          That split was not an accident and it is the thing I would steal for other projects. If
          the part that needs taste is separated from the part that needs correctness, the
          correctness part gets a fast loop and the taste part gets a short queue. Mix them and
          every judgement call needs a build and a device.
        </P>

        <H3>5. Hand over what to listen for</H3>

        <P>
          The last step is the one that makes the whole arrangement work, and it is a writing
          instruction rather than a technical one.
        </P>

        <Callout>
          &ldquo;Try <Code>airy</Code> on the bell patch, the tail should sparkle without the body
          getting louder&rdquo; is a question somebody can answer. &ldquo;Does this sound
          good?&rdquo; is not.
        </Callout>

        <P>
          The first one names the word, the patch to try it on, and what should be different. I can
          do that in fifteen seconds and come back with either yes or a specific no. The second one
          is a request to go and do an open ended evaluation, and the honest answer is almost
          always that I do not know yet, which means the diff sits there.
        </P>
        <P>
          I think this is the most transferable thing in the file. If part of your work needs a
          human judgement, the quality of the question you hand over determines whether you get an
          answer the same day or next week.
        </P>

        <H2>What tests settle, and what they cannot</H2>

        <P>
          Tests settle wiring. Every item in that list above is a question with a correct answer
          that does not depend on anybody&apos;s ears, and all of them are worth pinning down hard,
          because wiring is where the embarrassing bugs live. The airy alias was a wiring bug. The
          chord parsing &ldquo;do the thing&rdquo; was a wiring bug.
        </P>
        <P>
          Tests cannot settle taste. Whether <Code>warm</Code> sounds warm is not a question code
          can answer, and in this project it is my question, because it is my library and my ears
          are the instrument. The frequency table in the skill says so explicitly: it was drafted
          from standard engineering ranges, and where it disagrees with how I hear something, my
          numbers win and the table gets edited rather than worked around.
        </P>
        <P>
          I put that line in for a specific reason. Earlier in this project I had automated audio
          checks, things that rendered a buffer and made assertions about it, and they were wrong
          repeatedly. Not subtly wrong. Confidently green while the sound was obviously broken, and
          confidently red when it was fine. The cost of that is not the failing test, it is that for
          a while I trusted the harness over the listening, and the harness was the thing that was
          lying. So the file now says plainly: do not add any.
        </P>
        <P>
          Chord parsing is the one exception, and it is instructive about where the line is. A sharp
          seven has exactly one right answer. There is no taste in it, there is no hearing it
          differently, it is four pitch classes and anybody who disagrees is simply wrong. So that
          is the one place worth asserting exact values densely, and the chord tests read completely
          differently as a result. They check that a sequence realises as the chords a player would
          actually read off a chart, that every quality in the table round trips, that a slash bass
          lands below the chord, that b keeps meaning flat while case is ignored everywhere else.
          Exact outputs, every time. The sound tests next door barely assert a value at all. Where
          they do mention a number it is a bound rather than an equality, a Q that has to stay under
          4 or a peak that has to land above 9 kHz, which is a statement about the mechanism wearing
          a number as a disguise.
        </P>

        <H2>The thing I actually learned writing it</H2>

        <P>
          I thought I was writing instructions for an agent. What I was really doing was being
          forced to say out loud why each number in the thing is the number it is, and about a third
          of the time I did not have an answer. Some of those got fixed. Some of them are still
          arbitrary and are now at least labelled arbitrary, which is a meaningful improvement over
          looking deliberate.
        </P>
        <P>
          Sound design, done honestly, is a small amount of physics and a large amount of
          vocabulary. The physics is a frequency table and some arithmetic about harmonics and you
          can learn it in an afternoon. The vocabulary is a set of agreements between people about
          which word points at which mechanism, and that part is not technical at all, it is closer
          to editing. Most of the work in making a machine do it is not DSP. It is deciding what the
          words mean and then refusing to let them drift.
        </P>
        <P>
          The arithmetic I can hand over now. The ears are still mine, and I am relieved about
          that.
        </P>

        <div className="mt-14 pt-8 border-t border-edge">
          <p className="text-sm text-muted mb-4">
            The vocabulary is in <Code>src/schema/sound.ts</Code>, the parser in{" "}
            <Code>src/sound/query.ts</Code>, and the skill itself in{" "}
            <Code>.claude/skills/sound-design/</Code> if you want to see how short it actually is.
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
