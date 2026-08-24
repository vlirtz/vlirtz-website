import { formatAddressLine, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms and Conditions",
  description: `Terms and conditions for using the ${site.name} website.`,
  path: "/terms",
});

/**
 * Terms and Conditions, restored from the operator's original text and
 * lightly adapted where the current site's features differ.
 */
export default function TermsPage() {
  return (
    <section className="bg-white py-16">
      <Container className="prose-blog max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy">
          Terms and Conditions
        </h1>
        <p className="text-muted">Last updated 24 August 2026.</p>

        <p>Welcome to {site.name}!</p>
        <p>
          These terms and conditions outline the rules and regulations for
          the use of {site.relatedCompany}&apos;s website (operating now in
          Sweden as an enskild firma, i.e. enskild näringsidkare or sole
          proprietorship, under the name of {site.legalName}, registered at{" "}
          {formatAddressLine()}), located at {site.url}.
        </p>
        <p>
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use {site.name} if you do not agree
          to take all of the terms and conditions stated on this page.
        </p>

        <h2>Cookies</h2>
        <p>
          The website uses cookies to help personalize your online
          experience. When you first visit {site.name}, a banner lets you
          accept optional cookies or continue with required cookies only.
        </p>
        <p>
          A cookie is a text file that is placed on your device by a web
          page server. Cookies cannot be used to run programs or deliver
          viruses to your computer. Cookies are uniquely assigned to you and
          can only be read by a web server in the domain that issued the
          cookie to you.
        </p>
        <p>
          We use cookies to operate our website and, if you accept, to
          collect statistical information about how the site is used. Some
          required cookies are necessary for the operation of our website;
          these do not require your consent, as they always work. If you
          accept optional cookies, you also accept third-party cookies that
          might be used via third-party services embedded on our website,
          for example, the Google Maps view on our Contact page and, when
          enabled, Google Analytics. If you continue with required cookies
          only, embedded content that would set optional cookies, such as
          the map, stays collapsed until you choose to load it directly.
        </p>

        <h2>License</h2>
        <p>
          Unless otherwise stated, {site.relatedCompany} (operating now in
          Sweden as an enskild firma, i.e. enskild näringsidkare or sole
          proprietorship, under the name of {site.legalName}) and/or its
          licensors own the intellectual property rights for all material on
          {" "}{site.name}. All intellectual property rights are reserved. You
          may access this from {site.name} for your own personal use,
          subject to the restrictions set in these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul>
          <li>Copy or republish material from {site.name}</li>
          <li>Sell, rent, or sub-license material from {site.name}</li>
          <li>Reproduce, duplicate, or copy material from {site.name}</li>
          <li>Redistribute content from {site.name}</li>
        </ul>
        <p>This agreement shall begin on the date hereof.</p>

        <p>
          Parts of this website may offer users an opportunity to post and
          exchange opinions and information in certain areas of the website.
          {" "}{site.relatedCompany} does not filter, edit, publish, or review
          such comments before their presence on the website. Comments do
          not reflect the views and opinions of {site.relatedCompany}, its
          agents, and/or affiliates. Comments reflect the views and opinions
          of the person who posts them. To the extent permitted by
          applicable laws, {site.relatedCompany} shall not be liable for the
          comments or any liability, damages, or expenses caused and/or
          suffered as a result of any use of and/or posting of and/or
          appearance of comments on this website.
        </p>
        <p>
          {site.relatedCompany} reserves the right to monitor all comments
          and remove any comments that can be considered inappropriate,
          offensive, or in breach of these terms and conditions.
        </p>
        <p>You warrant and represent that:</p>
        <ul>
          <li>
            You are entitled to post the comments on our website and have
            all necessary licenses and consents to do so;
          </li>
          <li>
            The comments do not invade any intellectual property right,
            including without limitation copyright, patent, or trademark, of
            any third party;
          </li>
          <li>
            The comments do not contain any defamatory, libelous, offensive,
            indecent, or otherwise unlawful material which is an invasion of
            privacy;
          </li>
          <li>
            The comments will not be used to solicit or promote business or
            custom, or to present commercial activities or unlawful
            activity.
          </li>
        </ul>
        <p>
          You hereby grant {site.relatedCompany} a non-exclusive license to
          use, reproduce, edit, and authorize others to use, reproduce, and
          edit any of your comments in any and all forms, formats, or media.
        </p>

        <h2>Hyperlinking to our content</h2>
        <p>
          The following organizations may link to our website without prior
          written approval:
        </p>
        <ul>
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>
            Online directory distributors may link to our website in the
            same manner as they hyperlink to the websites of other listed
            businesses; and
          </li>
          <li>
            System-wide accredited businesses, except soliciting non-profit
            organizations, charity shopping malls, and charity fundraising
            groups, which may not hyperlink to our website.
          </li>
        </ul>
        <p>
          These organizations may link to our home page, to publications, or
          to other website information so long as the link: (a) is not in
          any way deceptive; (b) does not falsely imply sponsorship,
          endorsement, or approval of the linking party and its products
          and/or services; and (c) fits within the context of the linking
          party&apos;s site.
        </p>
        <p>
          We may consider and approve other link requests from the following
          types of organizations:
        </p>
        <ul>
          <li>Commonly-known consumer and/or business information sources;</li>
          <li>Dot.com community sites;</li>
          <li>Associations or other groups representing charities;</li>
          <li>Online directory distributors;</li>
          <li>Internet portals;</li>
          <li>Accounting, law, and consulting firms; and</li>
          <li>Educational institutions and trade associations.</li>
        </ul>
        <p>
          We will approve link requests from these organizations if we
          decide that: (a) the link would not make us look unfavorably to
          ourselves or to our accredited businesses; (b) the organization
          does not have any negative records with us; (c) the benefit to us
          from the visibility of the hyperlink compensates the absence of
          {" "}{site.relatedCompany}; and (d) the link is in the context of
          general resource information.
        </p>
        <p>
          These organizations may link to our home page so long as the link:
          (a) is not in any way deceptive; (b) does not falsely imply
          sponsorship, endorsement, or approval of the linking party and its
          products or services; and (c) fits within the context of the
          linking party&apos;s site.
        </p>
        <p>
          If you are one of the organizations listed above and are
          interested in linking to our website, you must inform us by
          sending an email to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Please include
          your name, your organization name, contact information, the URL of
          your site, a list of any URLs from which you intend to link to our
          website, and a list of the URLs on our site to which you would
          like to link. Please allow 2-3 weeks for a response.
        </p>
        <p>Approved organizations may hyperlink to our website as follows:</p>
        <ul>
          <li>By use of our corporate name; or</li>
          <li>By use of the uniform resource locator being linked to; or</li>
          <li>
            Using any other description of our website being linked to that
            makes sense within the context and format of content on the
            linking party&apos;s site.
          </li>
        </ul>
        <p>
          No use of {site.relatedCompany}&apos;s logo or other artwork will
          be allowed for linking absent a trademark license agreement.
        </p>

        <h2>Content liability</h2>
        <p>
          We shall not be held responsible for any content that appears on
          your website. You agree to protect and defend us against all
          claims that are raised on your website. No link(s) should appear
          on any website that may be interpreted as libelous, obscene, or
          criminal, or which infringes, otherwise violates, or advocates the
          infringement or other violation of, any third-party rights.
        </p>

        <h2>Reservation of rights</h2>
        <p>
          We reserve the right to request that you remove all links, or any
          particular link, to our website. You agree to immediately remove
          all links to our website upon request. We also reserve the right
          to amend these terms and conditions and our linking policy at any
          time. By continuing to link to our website, you agree to be bound
          to and follow these linking terms and conditions.
        </p>

        <h2>Removal of links from our website</h2>
        <p>
          If you find any link on our website that is offensive for any
          reason, you are free to contact and inform us at any time. We will
          consider requests to remove links, but we are not obligated to do
          so or to respond to you directly.
        </p>
        <p>
          We do not ensure that the information on this website is correct.
          We do not warrant its completeness or accuracy, nor do we promise
          to ensure that the website remains available or that the material
          on the website is kept up to date.
        </p>

        <h2>Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties, and conditions relating to our
          website and the use of this website. Nothing in this disclaimer
          will:
        </p>
        <ul>
          <li>
            Limit or exclude our or your liability for death or personal
            injury;
          </li>
          <li>
            Limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            Limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            Exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>
        <p>
          The limitations and prohibitions of liability set out in this
          section and elsewhere in this disclaimer: (a) are subject to the
          preceding paragraph; and (b) govern all liabilities arising under
          the disclaimer, including liabilities arising in contract, in
          tort, and for breach of statutory duty.
        </p>
        <p>
          As long as the website and the information and services on the
          website are provided free of charge, we will not be liable for any
          loss or damage of any nature.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms and conditions are governed by Swedish law. Courts of
          Sweden have jurisdiction, with Stockholm as the first venue where
          applicable.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Container>
    </section>
  );
}
