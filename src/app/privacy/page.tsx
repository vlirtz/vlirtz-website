import { formatAddressLine, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy policy",
  description: `How ${site.name} handles personal data from the website, contact form, and newsletter.`,
  path: "/privacy",
});

/**
 * Privacy policy for the Swedish enskild firma operating VLIRTZ.
 * Restored from the operator's original policy text, adapted only where
 * the current site's features differ (no payments, no comments, new hosting).
 */
export default function PrivacyPage() {
  return (
    <section className="bg-white py-16">
      <Container className="prose-blog max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy">Privacy Policy</h1>
        <p className="text-muted">Last updated 24 August 2026.</p>

        <p>
          {site.name} website is owned by {site.relatedCompany} (operating now
          in Sweden as an enskild firma, i.e. enskild näringsidkare or sole
          proprietorship, under the name of {site.legalName}), registered at{" "}
          {formatAddressLine()}, which is a data controller of your personal
          data.
        </p>
        <p>
          We have adopted this Privacy Policy, which determines how we are
          processing the information collected by {site.name}, and which also
          provides the reasons why we must collect certain personal data about
          you. Therefore, you must read this Privacy Policy before using the{" "}
          {site.name} website.
        </p>
        <p>
          We take care of your personal data and undertake to guarantee its
          confidentiality and security.
        </p>

        <h2>Personal information we collect</h2>
        <p>
          When you visit {site.name}, we automatically collect certain
          information about your device, including information about your web
          browser, IP address, time zone, and some of the cookies installed on
          your device. Additionally, as you browse the site, we collect
          information about the individual web pages you view, what websites
          or search terms referred you to the site, and how you interact with
          the site. We refer to this automatically-collected information as
          &quot;Device Information.&quot; Moreover, we may collect the
          personal data you provide to us directly (such as name, last name,
          and email address) when you use the contact form or sign up to our
          newsletter.
        </p>
        <p>
          The contact form on this site currently asks only for your name,
          last name, email address, and message. We do not process payments
          or take orders on this site, and we do not currently host a comment
          or discussion feature.
        </p>

        <h2>Why do we process your data?</h2>
        <p>
          Our top priority is customer data security, and, as such, we
          process only minimal user data, only as much as is absolutely
          necessary to maintain the website. Information collected
          automatically is used only to identify potential cases of abuse and
          to establish statistical information regarding website usage. This
          statistical information is not otherwise aggregated in such a way
          that it would identify any particular user of the system.
        </p>
        <p>
          You can visit the website without telling us who you are or
          revealing any information by which someone could identify you as a
          specific, identifiable individual. If, however, you wish to contact
          us or receive our newsletter, you may provide personal data to us,
          such as your email, first name, and last name. You can choose not
          to provide us with your personal data, but then you may not be able
          to take advantage of some of the website&apos;s features, such as
          contacting us directly or receiving our newsletter. Users who are
          uncertain about what information is mandatory are welcome to
          contact us via <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>Your rights</h2>
        <p>
          If you are a European resident, you have the following rights
          related to your personal data:
        </p>
        <ul>
          <li>The right to be informed.</li>
          <li>The right of access.</li>
          <li>The right to rectification.</li>
          <li>The right to erasure.</li>
          <li>The right to restrict processing.</li>
          <li>The right to data portability.</li>
          <li>The right to object.</li>
          <li>Rights in relation to automated decision-making and profiling.</li>
        </ul>
        <p>
          If you would like to exercise any of these rights, please contact us
          through the contact information below.
        </p>
        <p>
          Additionally, if you are a European resident, we note that we are
          processing your information in order to respond to your inquiries,
          or otherwise to pursue our legitimate business interests listed
          above. Please note that your information may be transferred outside
          of Europe, including to the United States, where our hosting
          provider (Vercel) and, when enabled, our email delivery provider
          (Resend) operate infrastructure.
        </p>

        <h2>Cookies</h2>
        <p>
          When you first visit the site, you can choose to accept optional
          cookies or continue with only the cookies required for the site to
          function. If you accept, the Google Maps view on our Contact page
          may load and set cookies from Google, and, if enabled, Google
          Analytics will collect usage data according to Google&apos;s own
          terms. If you continue with required cookies only, the map stays
          collapsed until you choose to load it yourself, and Analytics does
          not run. We do not use cookies for advertising. You can change your
          choice at any time by clearing your browser&apos;s local storage
          for this site.
        </p>

        <h2>Links to other websites</h2>
        <p>
          Our website may contain links to other websites that are not owned
          or controlled by us. Please be aware that we are not responsible
          for such other websites or third parties&apos; privacy practices.
          We encourage you to be aware when you leave our website and to read
          the privacy statements of each website that may collect personal
          information.
        </p>

        <h2>Information security</h2>
        <p>
          We secure information you provide on servers operated by our
          hosting provider, Vercel, in a controlled, secure environment
          protected from unauthorized access, use, or disclosure. We keep
          reasonable administrative, technical, and physical safeguards to
          protect against unauthorized access, use, modification, and
          disclosure of personal data in our control and custody. However, no
          data transmission over the internet or a wireless network can be
          guaranteed.
        </p>

        <h2>Legal disclosure</h2>
        <p>
          We will disclose any information we collect, use, or receive if
          required or permitted by law, such as to comply with a subpoena or
          similar legal process, and when we believe in good faith that
          disclosure is necessary to protect our rights, protect your safety
          or the safety of others, investigate fraud, or respond to a
          government request.
        </p>

        <h2>Contact information</h2>
        <p>
          If you would like to contact us to understand more about this
          policy, or wish to contact us concerning any matter relating to
          your individual rights and your personal information, you may send
          an email to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Container>
    </section>
  );
}
