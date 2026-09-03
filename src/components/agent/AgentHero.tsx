import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type AgentHeroProps = {
  kicker: string;
  /** Visible H1. Exact match for the page's primary query. */
  heading: string;
  description: string;
  /** One-line framing of what makes this market's builds distinctive. */
  angle?: string;
};

/**
 * Hero for the agent-development hub and its market pages.
 *
 * The heading is passed in rather than assembled from a template, so each
 * page can be an exact match for its own query ("AI agent development in
 * Amsterdam") instead of stacking several keywords into one line.
 */
export function AgentHero({ kicker, heading, description, angle }: AgentHeroProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="reveal-load mx-auto max-w-3xl text-center">
        <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
          {kicker}
        </p>
        <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
          {heading}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">{description}</p>
        {angle ? (
          <p className="mt-5 border-t border-line pt-5 text-base leading-7 text-muted">
            {angle}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact">Talk about a workflow</Button>
          <Button href="/pricing" variant="secondary">
            See pricing
          </Button>
        </div>
      </Container>
    </section>
  );
}
