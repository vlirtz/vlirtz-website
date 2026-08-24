import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Homepage contact block, matching the current site's in-page form.
 */
export function ContactSection() {
  return (
    <section className="bg-ice py-20">
      <Container className="flex flex-col items-center">
        <div data-reveal className="w-full">
          <SectionHeading
            title="Get in touch"
            description="Are you a business or a company? Let's talk."
            align="center"
          />
        </div>
        <div
          data-reveal
          data-delay="1"
          className="mt-10 w-full max-w-xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-8"
        >
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
