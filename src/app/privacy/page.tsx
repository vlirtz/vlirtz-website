import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy policy",
  description: `How ${site.name} handles personal data from the website, contact form, and newsletter.`,
  path: "/privacy",
});

/**
 * Privacy policy for the Swedish enskild firma operating VLIRTZ.
 */
export default function PrivacyPage() {
  return (
    <section className="bg-white py-16">
      <Container className="prose-blog max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy">Privacy policy</h1>
        <p className="text-muted">Last updated 24 August 2026.</p>
        <p>
          This website is operated by {site.legalName} ({site.legalForm}),
          org.nr {site.orgNumber}, doing business as {site.name}. Contact:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>What we collect</h2>
        <p>
          If you use the contact form or newsletter, we receive the name, email
          address, and message you submit. We also receive standard server logs
          (IP address, browser, and requested page) from our hosting provider
          Vercel. If you later add Google Analytics, that service will collect
          usage data according to Google&apos;s terms.
        </p>
        <h2>Why we collect it</h2>
        <p>
          We use contact details to reply to your inquiry or send the newsletter
          you asked for. We do not sell personal data.
        </p>
        <h2>Legal basis</h2>
        <p>
          For inquiries, the legal basis is our legitimate interest in
          responding to business requests, or steps prior to a contract. For the
          newsletter, the basis is your consent, which you can withdraw by
          emailing us.
        </p>
        <h2>How long we keep data</h2>
        <p>
          Inquiry emails are kept as long as needed to handle the conversation
          and ordinary bookkeeping. Newsletter addresses are kept until you
          unsubscribe.
        </p>
        <h2>Processors</h2>
        <p>
          Hosting and form delivery may be handled by Vercel and, when email
          sending is enabled, Resend. Those providers process data on our
          instructions.
        </p>
        <h2>Your rights</h2>
        <p>
          You may request access, correction, deletion, or restriction of your
          personal data, and you may complain to Integritetsskyddsmyndigheten
          (IMY). Email {site.email} to exercise your rights.
        </p>
      </Container>
    </section>
  );
}
