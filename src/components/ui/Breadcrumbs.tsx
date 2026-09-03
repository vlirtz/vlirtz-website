import Link from "next/link";
import type { Breadcrumb } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

type BreadcrumbsProps = {
  /** Ordered trail. The last entry is the current page and is not linked. */
  crumbs: Breadcrumb[];
};

/**
 * Visible breadcrumb trail for deep pages.
 *
 * Pairs with `getBreadcrumbJsonLd`. Google will render a breadcrumb path in
 * place of the raw URL in search results, but only when the markup and a
 * visible trail agree, so this component and the JSON-LD should always be
 * given the same crumbs.
 */
export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line/70 bg-white">
      <Container className="py-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;

            return (
              <li key={crumb.name} className="flex items-center gap-x-2">
                {crumb.path && !isLast ? (
                  <Link href={crumb.path} className="hover:text-indigo">
                    {crumb.name}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="text-navy">
                    {crumb.name}
                  </span>
                )}
                {isLast ? null : <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
