import { agentLimits } from "@/lib/agent-development";
import { Container } from "@/components/ui/Container";

/**
 * Honest limits on what an AI agent is good for.
 *
 * The fastest way to lose a client in month two is to have oversold in month
 * one, and buyers in these markets have almost all sat through a demo that
 * did not survive their own data. Stating the limits up front is both more
 * useful and, in practice, more persuasive than another capability claim.
 */
export function AgentLimits() {
  return (
    <section className="bg-navy py-20 text-white">
      <Container className="max-w-3xl">
        <div data-reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
            Straight answers
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            What an AI agent will not do for you
          </h2>
          <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">
            Every one of these has ended a project somewhere. We would rather
            raise them before you sign than explain them in month two.
          </p>
        </div>
        <dl className="mt-10 space-y-4">
          {agentLimits.map((item, index) => (
            <div
              key={item.limit}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <dt className="text-base font-semibold">{item.limit}</dt>
              <dd className="mt-2 text-sm leading-6 text-white/75">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
