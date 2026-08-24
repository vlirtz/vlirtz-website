import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";

type PhotoGridProps = {
  images: GalleryImage[];
};

/**
 * Responsive photo mosaic used on the About gallery.
 */
export function PhotoGrid({ images }: PhotoGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <figure
          key={image.src}
          data-reveal="image"
          data-delay={String(index % 3)}
          className={image.wide ? "sm:col-span-2 lg:col-span-3" : ""}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.wide ? 1400 : 800}
            height={image.wide ? 700 : 800}
            className={`w-full rounded-3xl object-cover ${image.wide ? "h-64 sm:h-80" : "h-72"}`}
          />
        </figure>
      ))}
    </div>
  );
}
