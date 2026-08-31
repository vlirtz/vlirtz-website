/**
 * General homepage FAQ content, distinct from the per-market FAQs in
 * locations.ts. These answer the questions that come up before someone
 * has picked a specific service or location.
 */
export type FaqItem = {
  question: string;
  answer: string;
};

export const homeFaq: FaqItem[] = [
  {
    question: "Do we need an AI strategy before we talk to you?",
    answer:
      "No. Most clients start with a problem, not a strategy: too many manual tickets, a sales team that cannot keep up with leads, a workflow nobody enjoys doing by hand. We help you figure out whether AI is even the right tool before we scope anything.",
  },
  {
    question: "What if we only need one specific AI agent, not a full platform?",
    answer:
      "That is most of our work. We scope a single agent or workflow, ship it, and prove it earns its keep before talking about anything bigger. No platform you have to buy into upfront.",
  },
  {
    question: "How is this different from hiring a freelancer or an in-house engineer?",
    answer:
      "We bring the full loop: strategy, build, and the lead-generation side that most engineers never touch. You get a small team that has shipped this before, not one person learning on your project.",
  },
  {
    question: "Do you only work with companies already based in Stockholm?",
    answer:
      "We are headquartered in Stockholm and meet in person with local clients, but most of our work is delivered remotely across Europe and the Middle East on the same timelines.",
  },
  {
    question: "How long does a typical AI agent project take?",
    answer:
      "A focused first agent usually ships in a few weeks, not months. We scope something narrow enough to be useful fast, then expand once it is proven in your workflow.",
  },
  {
    question: "What happens after the system is delivered?",
    answer:
      "We do not disappear at handover. Every build includes documentation your team can act on, and we stay available for the fixes and iterations that show up once real usage starts.",
  },
  {
    question: "Do you sign NDAs and handle our data securely?",
    answer:
      "Yes. We sign NDAs as standard, keep data in the EU by default under GDPR, and scope access so we only see what a project actually needs.",
  },
  {
    question: "¿Trabajáis en español?",
    answer:
      "Sí, atendemos a clientes en español además de inglés y sueco. Escríbenos en el idioma con el que te sientas más cómodo y seguimos la conversación así, desde la primera llamada hasta la documentación final.",
  },
  {
    question: "Pratar ni svenska?",
    answer:
      "Ja, vi jobbar på svenska, engelska och spanska. Hör av dig på det språk du känner dig mest bekväm med, så håller vi hela samtalet, mötena och dokumentationen på det språket.",
  },
];
