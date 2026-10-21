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
          Splice shipped an MCP server recently, so you can ask Claude for &ldquo;a dark
          lo-fi guitar loop around 80 BPM&rdquo; and it goes and searches their catalog
          without you opening the app. I&apos;ll be honest, I was building almost the same
          thing into <A href={repo}>react-native-audio-effects</A> at the same time. We
          got to similar places from opposite directions. And in both cases the language
          model turned out to be the least interesting part of it.
        </Lead>

        <H2>The problem both of us are solving</H2>

        <P>
          Producers don&apos;t think in filenames. They think &ldquo;something gritty for
          a 90bpm lo-fi beat&rdquo;. A texture, a tempo, a genre, and a rough sense of what
          the sound has to do in the track.
        </P>
        <P>
          Sample libraries index the other thing entirely. Titles, tags, folders, whatever
          the uploader happened to type that day.
        </P>
        <P>
          Closing that gap used to mean scrolling. You&apos;d audition forty kicks to find
          the one with the right amount of air on it. The whole pitch of an agent is that
          you describe the sound once and something else does the scrolling for you.
        </P>

        <H2>What Splice shipped</H2>

        <P>
          Splice&apos;s{" "}
          <A href="https://support.splice.com/en/articles/14442749-getting-started-with-the-splice-mcp-server-beta">
            MCP server
          </A>{" "}
          exposes their catalog as tools an AI client can call. <Code>describe_a_sound</Code>,{" "}
          <Code>create_stack</Code>, <Code>prompt_to_stack</Code>, <Code>share_stack</Code>,{" "}
          <Code>download_asset</Code>. You point Claude or Cursor or VS Code at{" "}
          <Code>mcp.splice.com/mcp</Code> and your assistant can search, build a stack of
          complementary sounds, and pull the assets down.
        </P>
        <P>
          It&apos;s a clean design, and the split is obvious once you see it. The model
          lives outside, in whatever client you already use. The catalog lives inside,
          behind an account, a subscription and credits. The MCP server is just the seam
          between the two.
        </P>

        <H2>What I built, and the one constraint that shaped everything</H2>

        <P>
          Mine is a library API instead of a server, because it runs inside a React Native
          app and the sound has to end up loaded in an audio engine on the device, not
          sitting in a downloads folder. Three steps. Interpret the request, search for it,
          load the result.
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
          Now the constraint that shaped all of it. It had to work with no API key. A
          library you can&apos;t try until you register for a token is a library most
          people never try at all. Splice has no public API. Freesound&apos;s needs a
          registered key. Openverse indexes Freesound (among other providers), serves
          direct CDN audio URLs, and takes no authentication whatsoever, so search works
          the second you install the package.
        </P>

        <H2>So the model is optional</H2>

        <P>
          This is where the two designs really split. Splice assumes a model, because an
          MCP server without a client isn&apos;t anything. I couldn&apos;t assume one,
          because every free model also needs a key, and I&apos;d just decided that a key
          was the thing standing between this feature and the people who would actually
          use it.
        </P>
        <P>
          So the default interpreter is a vocabulary parser. A list of words that genuinely
          show up in sample metadata, plus a few regexes for the things that are
          unambiguous in text. Tempo, musical key, duration, loop vs one shot. It
          isn&apos;t clever. It is instant, free, offline, and right about the parts of a
          request that matter most for actually finding something.
        </P>
        <P>A model goes in front of it as a hook, not a dependency:</P>

        <Pre>{`const agent = new SampleAgent({
  interpret: async (prompt) => {
    const reply = await myModel(prompt);
    return { terms: reply.terms, bpm: reply.bpm, understood: {} };
  },
});`}</Pre>

        <P>
          What a model actually buys you here is handling for phrasing the vocabulary has
          no entry for. &ldquo;That sound from early Burial records&rdquo;, that kind of
          thing. Worth having. Just not worth blocking the whole feature on.
        </P>

        <H2>The hard part was never the language</H2>

        <P>
          Here&apos;s the bit I didn&apos;t see coming. Turning English into search terms
          is the easy half. The hard half is that the search engine underneath has
          opinions, and most of them are actively hostile to a detailed request.
        </P>

        <H3>Every extra word is a filter</H3>

        <P>
          Openverse ANDs its search terms. So the more faithfully you render what the user
          said, the more likely you come back with nothing at all. Measured against the
          live API:
        </P>

        <Callout>
          <Code>gritty drum loop</Code> gives you 29 results.
          <br />
          <Code>gritty drum loop 90bpm</Code> gives you 0.
        </Callout>

        <P>
          Uploaders do sometimes put a tempo in the title. Just nowhere near often enough
          to require it. So the most accurate version of the query is the one that matches
          nothing, which is a pretty useless way to answer someone who asked you for a
          sound.
        </P>
        <P>
          Instead of picking once between precision and recall, the search walks a ladder
          of query variants, most specific first, and stops at the first one that returns
          anything. That way a detailed request still gets something back.
        </P>

        <H3>The order you give up words matters</H3>

        <P>
          Which raises the question of what to drop first. My first version lumped every
          descriptive word together and dropped them all as fluff. That&apos;s how{" "}
          <Code>snare one shot for an ambient song</Code> ended up searching for{" "}
          <Code>snare one shot</Code> and returning jazz loops.
        </P>

        <Callout>
          To a producer the genre <em>is</em> the request. It carries more intent than the
          instrument does, half the time.
        </Callout>

        <P>
          So texture adjectives and genre words get tracked separately now. Texture goes
          first (&ldquo;gritty&rdquo;, &ldquo;dusty&rdquo;, &ldquo;warm&rdquo; narrow hard
          and rarely show up in an uploader&apos;s title). Genre goes last, and only if
          there&apos;s still something left. &ldquo;Ambient&rdquo; is most of the intent in
          that request, so it should be the last thing you give up, not the first.
        </P>

        <H3>Words that were doing two jobs</H3>

        <P>
          Same shape of bug, different place. Words like &ldquo;one shot&rdquo; and
          &ldquo;loop&rdquo; are signals, they set a structured field. But they were also
          being left in the text query, so Openverse was AND-ing on &ldquo;one&rdquo; and
          &ldquo;shot&rdquo; and matching any title with the word shot in it. Same with a
          parsed musical key, it became a filter and a repeated search term at the same
          time. Anything you capture as structure has to come back out of the terms.
        </P>

        <H3>The filter that looked obvious and was completely wrong</H3>

        <P>
          Openverse has a <Code>category</Code> parameter. For a loop request,{" "}
          <Code>category=music</Code> looks like exactly the filter you want. Applying it
          takes <Code>gritty drum loop</Code> from 29 results to 0, because plenty of real
          loops get filed under sound effects.
        </P>
        <P>
          Duration turned out to be the honest separator. Asking for a one shot and getting
          handed a four minute loop is the clearest way this search can be wrong, and
          length is the one signal that reliably tells them apart. Three seconds covers a
          long reverbed cymbal and excludes anything that loops. Results with no reported
          duration get kept rather than dropped, because excluding them would quietly lose
          valid samples over missing metadata.
        </P>

        <H2>And then there&apos;s the network</H2>

        <P>
          Openverse doesn&apos;t degrade gracefully. It either answers fast or it hangs
          until you give up. Three probes in a row during development:
        </P>

        <Callout>63ms. Then 30s (timeout). Then 30s (timeout).</Callout>

        <P>
          There&apos;s no middle ground to wait for, which changes what a timeout is even
          for. A long timeout buys you nothing against a hung connection and costs the user
          the entire wait. So the per request timeout is 2.5 seconds (already thirty times
          a healthy response) and the budget goes on retrying instead of waiting.
        </P>
        <P>
          Better than that, the hang is a property of the individual connection, not the
          service. A request that stalls stays stalled while a fresh one next to it comes
          back completely fine. So requests get hedged. If the first one hasn&apos;t
          answered within 400ms, a second goes out, and whichever comes back first wins.
          400ms sits comfortably above a healthy 63ms response so a working request never
          gets duplicated, and well below the 2.5s timeout so a stalled one gets overtaken
          early instead of eating the whole budget.
        </P>
        <P>
          The search as a whole is bounded too. Without a ceiling the relaxation ladder
          just multiplies out (four variants times three attempts times the request
          timeout) and the UI sits there on &ldquo;Searching…&rdquo; for minutes. Bounding
          the whole operation matters more than bounding any single request.
        </P>

        <H2>Attribution isn&apos;t an afterthought</H2>

        <P>
          Everything Openverse returns is openly licensed. Openly licensed isn&apos;t the
          same as free of obligation though. Most results are CC-BY, which means anyone
          shipping that sample has to name the creator and the licence.
        </P>
        <P>
          So licence and creator come back on every single result, and loading a sample
          hands you a formatted credit line right next to the audio. The point is to make
          crediting the easy path instead of the thing you remember three weeks after
          release. There&apos;s a <Code>publicDomainOnly</Code> option too, because a
          producer dropping a sample into a track they&apos;re going to publish has a very
          different obligation under CC0 than under CC-BY.
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
                  ["Licensing", "Covered by your Splice plan", "CC, attribution returned"],
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
          These aren&apos;t really competitors. Splice is the better answer when you&apos;re
          at a desk, in a DAW, with a subscription, and you want a professionally produced
          loop that&apos;s already cleared. Mine is the answer when the sound has to arrive
          inside an app you&apos;re shipping, from a catalog with no gate in front of it, on
          a phone.
        </P>

        <H2>Why this matters if you make music</H2>

        <P>
          Honestly, the shared idea is worth more than either implementation. For years the
          interface to a sample library has been a search box that only rewards you for
          correctly guessing the uploader&apos;s vocabulary. Describing a sound the way
          you&apos;d describe it to someone sitting in the room with you is a better
          interface, and it&apos;s finally doable.
        </P>
        <UL>
          <LI>
            <strong className="text-foreground">Less auditioning, more arranging.</strong>{" "}
            The forty kicks problem is a tooling failure, not a creative act.
          </LI>
          <LI>
            <strong className="text-foreground">Your intent survives the search.</strong> A
            ladder that gives up texture before genre keeps the part of the request you
            actually cared about.
          </LI>
          <LI>
            <strong className="text-foreground">Sampling on a phone becomes real.</strong>{" "}
            Describe a sound, get it loaded into an effect chain, tweak it. No desk, no DAW,
            no login.
          </LI>
          <LI>
            <strong className="text-foreground">Crediting gets easier.</strong> If the tool
            hands you the attribution line along with the audio, there&apos;s no excuse
            left.
          </LI>
        </UL>

        <H2>What I took away from it</H2>

        <P>
          I set out to build an agent and ended up spending most of the time on retrieval.
          The parser is a word list and five regexes. All the interesting code sits
          downstream of it. Deciding which part of a request to abandon first. Noticing
          that a perfectly plausible filter just took your recall to zero. Working out that
          the right response to a hanging service is a second request, not a longer wait.
        </P>
        <P>
          &ldquo;Add an LLM&rdquo; is the easy half of a feature like this. The half that
          decides whether it&apos;s any good is the unglamorous retrieval work underneath,
          and that part you have to measure. You can&apos;t guess it.
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
