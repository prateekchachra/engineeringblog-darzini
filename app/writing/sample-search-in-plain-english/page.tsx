import type { Metadata } from "next";
import Link from "next/link";
import { getPost } from "../../data/posts";
import { profile } from "../../data/profile";
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

const post = getPost("sample-search-in-plain-english")!;
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
          <Link
            href="/writing"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← All writing
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-5 sm:px-8 pt-14 pb-20">
        {/* Title block */}
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
          In October 2026 Splice shipped an MCP server, so you can ask Claude for
          &ldquo;a dark lo-fi guitar loop around 80 BPM&rdquo; and have it search their
          catalog without opening the app. I had been building the same idea into{" "}
          <A href={repo}>react-native-audio-effects</A> on roughly the same timeline. We
          arrived at similar interfaces from opposite directions — and the language model
          turned out to be the least interesting part of either.
        </Lead>

        <H2>The problem both of us are solving</H2>

        <P>
          Producers do not think in filenames. They think &ldquo;something gritty for a
          90bpm lo-fi beat&rdquo; — a texture, a tempo, a genre, and a vague sense of what
          the sound has to do in the track. Sample libraries index the other thing: titles,
          tags, folders, whatever the uploader happened to type.
        </P>
        <P>
          Closing that gap used to mean scrolling. You auditioned forty kicks to find the
          one with the right amount of air on it. The pitch of an agent is that you describe
          the sound once and something else does the scrolling.
        </P>

        <H2>What Splice shipped</H2>

        <P>
          Splice&apos;s{" "}
          <A href="https://support.splice.com/en/articles/14442749-getting-started-with-the-splice-mcp-server-beta">
            MCP server
          </A>{" "}
          exposes their catalog as tools an AI client can call — <Code>describe_a_sound</Code>,{" "}
          <Code>create_stack</Code>, <Code>prompt_to_stack</Code>, <Code>share_stack</Code>,{" "}
          <Code>download_asset</Code>. You point Claude, Cursor or VS Code at{" "}
          <Code>mcp.splice.com/mcp</Code> and the assistant can search, assemble
          complementary sounds into a stack, and pull assets down.
        </P>
        <P>
          The design is clean and the division of labour is explicit: the model lives
          outside, in whatever client you already use, and the catalog lives inside, behind
          an account, a subscription and credits. The MCP server is the seam between them.
        </P>

        <H2>What I built, and the constraint that shaped it</H2>

        <P>
          My version is a library API rather than a server, because it runs inside a React
          Native app and the sound has to end up loaded in an audio engine on the device,
          not downloaded to a folder. It is three steps: interpret the request, search for
          it, load the result.
        </P>

        <Pre>{`const agent = new SampleAgent();

// Search, and see what it understood.
const { query, results } = await agent.find(
  'gritty drum loop, 90bpm, under 5 seconds'
);

// Or go straight to a loaded, playable source.
const { source, attribution } = await agent.fetch('warm vinyl crackle');
await source.play({ loop: true });`}</Pre>

        <P>
          The constraint that shaped everything: <strong className="text-foreground">
          it had to work with no API key</strong>. A library you cannot try until you
          register for a token is a library most people never try. Splice has no public API.
          Freesound&apos;s needs a registered key. Openverse indexes Freesound among other
          providers, serves direct CDN audio URLs, and takes no authentication at all — so
          search works the moment you install the package.
        </P>

        <H2>So the model is optional</H2>

        <P>
          This is where the two designs genuinely diverge. Splice assumes a model, because
          an MCP server without a client is nothing. I could not assume one, because every
          free model also needs a key — and I had just decided a key was the thing standing
          between the feature and the people who would use it.
        </P>
        <P>
          So the default interpreter is a vocabulary parser. A list of words that actually
          appear in sample metadata, plus regexes for the things that are unambiguous in
          text: tempo, musical key, duration, loop versus one-shot. It is not clever. It is
          instant, free, offline, and right about the parts of a request that matter most
          for retrieval.
        </P>
        <P>
          A model goes in front of it as a hook, not a dependency:
        </P>

        <Pre>{`const agent = new SampleAgent({
  interpret: async (prompt) => {
    const reply = await myModel(prompt);
    return { terms: reply.terms, bpm: reply.bpm, understood: {} };
  },
});`}</Pre>

        <P>
          What a model actually buys you here is handling for phrasing the vocabulary has no
          entry for — &ldquo;that sound from early Burial records&rdquo;. That is worth
          having. It is not worth blocking the feature on.
        </P>

        <H2>The hard part was never the language</H2>

        <P>
          Here is the thing I did not expect. Turning English into search terms is the easy
          half. The hard half is that the search engine underneath has opinions, and most of
          them are hostile to a detailed request.
        </P>

        <H3>Every extra word is a filter</H3>

        <P>
          Openverse ANDs its search terms. So the more faithfully you render what the user
          said, the more likely you return nothing. Measured against the live API:
        </P>

        <Callout>
          <Code>gritty drum loop</Code> → 29 results.
          <br />
          <Code>gritty drum loop 90bpm</Code> → 0 results.
        </Callout>

        <P>
          Uploaders do sometimes put a tempo in the title. Far too rarely to require it. The
          most accurate query is the one that matches nothing, which is a spectacularly
          unhelpful way to answer someone who asked for a sound.
        </P>
        <P>
          Rather than choose once between precision and recall, the search walks a ladder of
          query variants, most specific first, and stops at the first one that returns
          anything. Detailed requests still get <em>something</em> back.
        </P>

        <H3>The order you give up words matters</H3>

        <P>
          Which raises the question of what to drop first. My first version lumped every
          descriptive word together and dropped them as fluff. That is how{" "}
          <Code>snare one shot for an ambient song</Code> ended up searching for{" "}
          <Code>snare one shot</Code> and returning jazz loops.
        </P>

        <Callout>
          To a producer the genre <em>is</em> the request. It carries more intent than the
          instrument half the time.
        </Callout>

        <P>
          So texture adjectives and genre words are now tracked separately. Texture goes
          first — &ldquo;gritty&rdquo;, &ldquo;dusty&rdquo;, &ldquo;warm&rdquo; narrow hard
          and rarely appear in an uploader&apos;s title. Genre goes last, and only if
          something is still left. &ldquo;Ambient&rdquo; is most of the intent in that
          request; it should be the final thing surrendered, not the first.
        </P>

        <H3>Words that were doing two jobs</H3>

        <P>
          A related bug, same shape. Words like &ldquo;one shot&rdquo; and
          &ldquo;loop&rdquo; are signals — they set a structured field. But they were also
          being left in the text query, so Openverse was AND-ing on &ldquo;one&rdquo; and
          &ldquo;shot&rdquo; and matching any title containing the word shot. Same for a
          parsed musical key: it became both a filter and a repeated search term. Anything
          captured as structure has to be stripped from the terms.
        </P>

        <H3>The filter that looked obvious and was wrong</H3>

        <P>
          Openverse has a <Code>category</Code> parameter. For a loop request,{" "}
          <Code>category=music</Code> looks like exactly the right filter. Applying it takes{" "}
          <Code>gritty drum loop</Code> from 29 results to 0 — plenty of real loops are filed
          under sound effects.
        </P>
        <P>
          Duration turned out to be the honest separator. Asking for a one-shot and being
          handed a four-minute loop is the clearest way the search can be wrong, and length
          is the one signal that reliably distinguishes them. Three seconds covers a long
          reverbed cymbal and excludes anything looping. Results with no reported duration
          are kept rather than dropped — excluding them would silently lose valid samples for
          missing metadata.
        </P>

        <H2>And then the network</H2>

        <P>
          Openverse does not degrade gracefully. It either answers fast or hangs until you
          give up. Three consecutive probes during development:
        </P>

        <Callout>63ms · 30s (timeout) · 30s (timeout)</Callout>

        <P>
          There is no middle ground to wait for, which changes what a timeout is for. A long
          timeout buys nothing against a hung connection and costs the user the entire wait.
          So the per-request timeout is 2.5 seconds — already thirty times a healthy
          response — and the budget goes on retrying instead of waiting.
        </P>
        <P>
          Better still: the hang is a property of the individual connection, not the service.
          A request that stalls stays stalled while a fresh one alongside it returns
          normally. So requests are <strong className="text-foreground">hedged</strong>. If
          the first has not answered in 400ms, a second goes out, and whichever answers first
          wins. 400ms sits comfortably above a healthy 63ms response, so a working request is
          never duplicated, and far below the 2.5s timeout, so a stalled one is overtaken
          early instead of eating the budget.
        </P>
        <P>
          The whole search is bounded too. Without a ceiling the relaxation ladder multiplies
          out — four variants times three attempts times the request timeout — and the UI
          sits on &ldquo;Searching…&rdquo; for minutes. Bounding the operation matters more
          than bounding any single request.
        </P>

        <H2>Attribution is a feature, not an afterthought</H2>

        <P>
          Everything Openverse returns is openly licensed. Openly is not the same as without
          obligation — most results are CC-BY, which obliges anyone shipping the sample to
          name the creator and the licence.
        </P>
        <P>
          So licence and creator come back on every result, and loading a sample hands you a
          formatted credit line next to the audio. The point is to make crediting the easy
          path rather than the thing you remember after release. There is also a{" "}
          <Code>publicDomainOnly</Code> option, because a producer dropping a sample into a
          track they intend to publish has a materially different obligation under CC0 than
          under CC-BY.
        </P>

        <H2>How the two compare</H2>

        <div className="mb-8 rounded-xl border border-edge overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2 text-left">
                  <th className="px-4 py-3 font-medium text-foreground font-mono text-xs">
                    &nbsp;
                  </th>
                  <th className="px-4 py-3 font-medium text-foreground">Splice MCP</th>
                  <th className="px-4 py-3 font-medium text-foreground">SampleAgent</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {[
                  ["Shape", "MCP server", "Library API"],
                  ["Model", "Required (the host client)", "Optional hook"],
                  ["Auth", "Account, subscription, credits", "None"],
                  ["Catalog", "Splice's licensed library", "Openverse (Freesound et al.)"],
                  ["Licensing", "Covered by your Splice plan", "CC — attribution returned"],
                  ["Runs in", "Claude, Cursor, VS Code", "Your app, on device"],
                  ["Ends with", "A downloaded file", "A playing audio source"],
                ].map(([label, splice, mine]) => (
                  <tr key={label} className="border-t border-edge">
                    <td className="px-4 py-3 font-mono text-xs text-faint whitespace-nowrap">
                      {label}
                    </td>
                    <td className="px-4 py-3">{splice}</td>
                    <td className="px-4 py-3">{mine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <P>
          These are not really competitors. Splice is the better answer when you are at a
          desk, in a DAW, with a subscription, and you want a professionally produced loop
          that is cleared for use. Mine is the answer when the sound has to arrive inside an
          app you are shipping, from a catalog with no gate in front of it, on a phone.
        </P>

        <H2>Why this matters for producers</H2>

        <P>
          The shared idea is worth more than either implementation. For years the interface
          to a sample library has been a search box that only rewards you for guessing the
          uploader&apos;s vocabulary. Describing a sound the way you would describe it to
          another person in the room is a better interface, and it is finally tractable.
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">Less auditioning, more arranging.</strong>{" "}
            The forty-kicks problem is a tooling failure, not a creative act.
          </LI>
          <LI>
            <strong className="text-foreground">Intent survives the search.</strong> A
            relaxation ladder that gives up texture before genre keeps the part of the
            request you actually cared about.
          </LI>
          <LI>
            <strong className="text-foreground">Sampling on a phone becomes real.</strong>{" "}
            Describe a sound, get it loaded into an effect chain, and tweak it — without a
            desk, a DAW or a login.
          </LI>
          <LI>
            <strong className="text-foreground">Credit gets easier.</strong> If the tool
            hands you the attribution line with the audio, there is no excuse left.
          </LI>
        </UL>

        <H2>What I took away</H2>

        <P>
          I set out to build an agent and spent most of the time on retrieval. The parser is
          a word list and five regexes. The interesting code is all downstream of it:
          deciding which part of a request to abandon first, noticing that a plausible filter
          halves your recall to zero, discovering that the right response to a hanging
          service is a second request rather than a longer wait.
        </P>
        <P>
          &ldquo;Add an LLM&rdquo; is the easy half of a feature like this. The half that
          decides whether it is any good is the unglamorous retrieval work underneath — and
          that part you have to measure, not guess.
        </P>

        <div className="mt-14 pt-8 border-t border-edge">
          <p className="text-sm text-muted mb-4">
            The sample agent lives in <Code>src/samples</Code>, and the whole library is
            open source.
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
