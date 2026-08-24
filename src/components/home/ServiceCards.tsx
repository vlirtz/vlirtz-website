import Link from "next/link";
import { services } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const icons = {
  "ai-agent-development": (
    <path d="M12 2 3 7v6c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V7l-9-5zm0 4.2 5.5 3V13c0 3.4-2.3 6.5-5.5 7.2C8.8 19.5 6.5 16.4 6.5 13V9.2L12 6.2zM11 11h2v6h-2zm0-3h2v2h-2z" />
  ),
  "ai-consulting": (
    <path d="M4 4h16v12H7l-3 3V4zm2 2v8.2L7.2 14H18V6H6zm2 2h8v2H8V8zm0 3h5v2H8v-2z" />
  ),
  "ai-lead-generation": (
    <path d="M12 2a7 7 0 0 1 7 7c0 3.3-2.3 6-5.4 6.8L14 22h-4l.4-6.2A7 7 0 0 1 5 9a7 7 0 0 1 7-7zm0 2a5 5 0 1 0 .01 10.01A5 5 0 0 0 12 4z" />
  ),
};

/**
 * Three service pillars shown directly under the homepage hero.
 */
export function ServiceCards() {
  return (
    <section className="bg-fog py-16">
      <Container className="grid gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <div key={service.slug} data-reveal data-delay={String(index)}>
          <Link
            href="/services"
            className="block rounded-3xl bg-white p-8 shadow-sm ring-1 ring-line transition-transform hover:-translate-y-0.5"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ice text-indigo">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                {icons[service.slug]}
              </svg>
            </span>
            <h2 className="mt-6 text-xl font-semibold text-navy">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{service.short}</p>
          </Link>
          </div>
        ))}
      </Container>
    </section>
  );
}
