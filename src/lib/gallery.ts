export type GalleryImage = {
  src: string;
  alt: string;
  wide?: boolean;
};

/**
 * About-page gallery: campaign assets plus photographs from the previous site.
 */
export const aboutGallery: GalleryImage[] = [
  {
    src: "/images/reach-map.jpg",
    alt: "Map of VLIRTZ work across Europe and the Middle East",
    wide: true,
  },
  {
    src: "/images/workspace-macbook.jpg",
    alt: "Development workspace with a MacBook and an external display",
  },
  {
    src: "/images/consulting-meeting.jpg",
    alt: "Consulting conversation around a shared desk",
  },
  {
    src: "/images/books-workspace.jpg",
    alt: "Software craft books in front of a multi-screen workstation",
  },
  {
    src: "/images/scrabble-team-lead.jpg",
    alt: "Scrabble tiles spelling team, lead, and succeed",
  },
  {
    src: "/images/developer-ai-desk.jpg",
    alt: "Engineer working at a dual-screen desk",
  },
  {
    src: "/images/code-closeup.jpg",
    alt: "Close-up of a code editor on a monitor",
  },
  {
    src: "/images/ad-1.jpg",
    alt: "VLIRTZ street campaign about reasoning on multi-step tasks",
  },
  {
    src: "/images/ad-2.jpg",
    alt: "VLIRTZ campaign asking if a business is ready for AI agents",
  },
  {
    src: "/images/ad-3.jpg",
    alt: "VLIRTZ campaign creative for AI consulting and lead generation",
  },
];
