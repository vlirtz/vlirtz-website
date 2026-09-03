/**
 * SEO helpers: page metadata, entity schema, and structured data.
 *
 * Split into modules because a single file carrying metadata, organisation
 * schema and every structured-data builder ran past the 300-line limit this
 * codebase keeps to. Import from "@/lib/seo" as before.
 */
export { createPageMetadata, getVisibleAddress } from "./metadata";

export {
  FOUNDER_ID,
  ORGANIZATION_ID,
  getFounderJsonLd,
  getLocalBusinessJsonLd,
  getWebsiteJsonLd,
} from "./organization";

export {
  type Breadcrumb,
  getAgentServiceJsonLd,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getLocationFaqJsonLd,
  getLocationServiceJsonLd,
} from "./structured-data";
