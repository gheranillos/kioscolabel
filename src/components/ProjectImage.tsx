"use client";

type ProjectImageProps = {
  src: string;
  alt: string;
  slug: string;
  className?: string;
};

export default function ProjectImage({ src, alt, slug, className }: ProjectImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.dataset.fallbackApplied === "1") return;
        img.dataset.fallbackApplied = "1";
        img.src = `https://picsum.photos/seed/${slug}/1200/800`;
      }}
    />
  );
}
