import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Fallback page for unknown routes.
 */
export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-navy">Page not found</h1>
        <p className="mt-4 text-muted">
          That URL is not on this site. Try the homepage or the blog.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Home</Button>
          <Button href="/blog" variant="secondary">
            Blog
          </Button>
        </div>
      </Container>
    </section>
  );
}
