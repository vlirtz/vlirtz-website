import Image from "next/image";
import Link from "next/link";
import { formatAddressBlock, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialLinks } from "@/components/layout/SocialLinks";

/**
 * Site footer with contact details, newsletter, and legal links.
 */
export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Image
            src="/images/logo-horizontal-white.png"
            alt="VLIRTZ"
            width={220}
            height={70}
            className="h-12 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
            Delivering AI agent development, consulting and lead generation
            across Europe and the Middle East.
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            {formatAddressBlock().map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
            Newsletter
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/75">
            Occasional notes on AI agents, implementation, and outbound.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Operated by {site.legalName}{" "}
            ({site.legalForm}), org.nr {site.orgNumber}.
          </p>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
