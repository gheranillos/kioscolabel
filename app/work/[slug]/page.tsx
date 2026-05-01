import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import ProjectImage from "@/src/components/ProjectImage";
import { projects } from "@/src/data/projects";

const PROJECT_TITLE_CLASS =
  "max-w-[min(377px,100%)] text-[80px] font-black uppercase leading-[78px] tracking-[1.2px] text-white";
const PROJECT_INTRO_CLASS =
  "mt-[30px] max-w-[620px] text-[1.02rem] leading-[23px] text-white/75";
const PROJECT_CTA_CLASS =
  "mt-6 inline-flex w-fit items-center rounded-full bg-[#f7b7ff] px-8 py-3.5 font-bold text-[#161616] transition-colors duration-200 hover:bg-[#161616] hover:text-[#f7b7ff]";
const PROJECT_INFO_LABEL_CLASS =
  "text-[14px] font-thin leading-[1.3] text-white/80 [font-family:coolvetica]";
const PROJECT_INFO_VALUE_CLASS =
  "w-[111px] text-[15px] leading-[1.3] text-white";
const PROJECT_SECTION_LABEL_CLASS =
  "text-[0.7rem] font-light uppercase tracking-[0.8px] leading-[26px] text-[#f7b7ff]";
const PROJECT_LONG_DESCRIPTION_CLASS =
  "mt-6 max-w-[620px] text-[clamp(1rem,1.5vw,1.15rem)] leading-[21px] tracking-[0px] text-white/80";
const PROJECT_SUPPORTING_DESCRIPTION_CLASS =
  "mt-[27px] max-w-[620px] text-[0.98rem] leading-[19px] text-white/65";
const PROJECT_MEDIA_LABEL_CLASS =
  "w-[531px] text-[13px] font-light uppercase tracking-[0.8px] leading-[26px] text-[#f7b7ff]";
const PROJECT_LABEL_FONT_STYLE = { fontFamily: "coolveticaBook" } as const;

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");
    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      if (parsed.pathname.startsWith("/shorts/")) {
        const shortId = parsed.pathname.split("/")[2];
        if (shortId) return `https://www.youtube.com/embed/${shortId}`;
      }
      if (parsed.pathname.startsWith("/embed/")) return url;
    }
    if (hostname === "youtu.be") {
      const videoId = parsed.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {
    return null;
  }
  return null;
}

function getEditorialTileClass(slug: string, index: number) {
  const layouts: Record<string, readonly string[]> = {
    freelance: [
      "md:col-span-4 md:row-span-2",
      "md:col-span-2 md:row-span-1 md:-translate-y-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-3 md:row-span-2",
      "md:col-span-3 md:row-span-1 md:translate-y-2",
      "md:col-span-3 md:row-span-1",
      "md:col-span-2 md:row-span-1",
      "md:col-span-4 md:row-span-2 md:-translate-y-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-3 md:row-span-1",
      "md:col-span-3 md:row-span-2 md:translate-y-2",
      "md:col-span-6 md:row-span-1",
    ],
    "el-kiosco": [
      "md:col-span-3 md:row-span-2",
      "md:col-span-3 md:row-span-1 md:translate-y-2",
      "md:col-span-3 md:row-span-2",
      "md:col-span-3 md:row-span-1 md:-translate-y-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-4 md:row-span-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-2 md:row-span-2 md:translate-y-2",
      "md:col-span-4 md:row-span-1",
      "md:col-span-2 md:row-span-2 md:-translate-y-2",
      "md:col-span-4 md:row-span-1",
    ],
  };

  return layouts[slug]?.[index] ?? "md:col-span-3 md:row-span-1";
}

function isYouTubeShortUrl(url: string) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");
    return (
      (hostname === "youtube.com" || hostname === "m.youtube.com") &&
      parsed.pathname.startsWith("/shorts/")
    );
  } catch {
    return false;
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const serviceItems =
    project.tags.length > 0
      ? project.tags
      : project.role
          .split(/[|,/]/)
          .map((item) => item.trim())
          .filter(Boolean);

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length]!;
  const projectHeading =
    project.slug === "padelcafe" ? "Padel Café Club" : project.title;
  const isEditorialGallery =
    project.slug === "freelance" || project.slug === "el-kiosco";

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-[#f7b7ff] selection:text-black">
      <main className="bg-black pt-[108px]">
        <section className="mx-auto w-full max-w-[1200px] px-[5vw] pb-10 pt-8">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45">
            Work / Project
          </p>
          <div className="mt-5 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div className="min-w-0">
              <h1 className={PROJECT_TITLE_CLASS}>
                {projectHeading}
              </h1>
              <p className={PROJECT_INTRO_CLASS}>
                {project.longDescription}
              </p>
              <Link href="/#contacto" className={PROJECT_CTA_CLASS}>
                Trabajemos juntos &rarr;
              </Link>
            </div>
            <div className="flex flex-col md:items-end md:justify-self-end">
              <div className="w-full max-w-[329px] border-y-0 border-solid bg-black px-0 py-2 md:w-[329px]">
                <div className="grid grid-cols-[1fr_1fr] border-b border-white/15 py-1.5">
                  <p className={PROJECT_INFO_LABEL_CLASS}>Categories</p>
                  <p className={PROJECT_INFO_VALUE_CLASS}>{project.category}</p>
                </div>
                <div className="grid grid-cols-[1fr_1fr] border-b border-white/15 py-1.5">
                  <p className={PROJECT_INFO_LABEL_CLASS}>Client</p>
                  <p className={PROJECT_INFO_VALUE_CLASS}>{project.client}</p>
                </div>
                <div className="grid grid-cols-[1fr_1fr] border-b border-white/15 py-1.5">
                  <p className={PROJECT_INFO_LABEL_CLASS}>Services</p>
                  <div className="flex flex-col">
                    {serviceItems.map((item) => (
                      <p key={`${project.slug}-service-${item}`} className={PROJECT_INFO_VALUE_CLASS}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_1fr] py-1.5">
                  <p className={PROJECT_INFO_LABEL_CLASS}>Year</p>
                  <p className={PROJECT_INFO_VALUE_CLASS}>{project.year}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative h-[70vh] w-full overflow-hidden bg-[#111]">
          <ProjectImage
            src={project.coverImage}
            alt={project.title}
            slug={project.slug}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 z-10 px-[5vw] pb-12">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-[5vw] pb-24 pt-6">
          <p className={PROJECT_MEDIA_LABEL_CLASS} style={PROJECT_LABEL_FONT_STYLE}>
            Imágenes y videos del proyecto
          </p>
          <div
            className={`mt-8 grid grid-cols-1 gap-4 ${
              isEditorialGallery ? "md:auto-rows-[200px] md:grid-cols-6" : "md:grid-cols-2"
            }`}
          >
            {project.images.map((media, index) => {
              const youtubeEmbed = getYouTubeEmbedUrl(media);
              const isShortVideo = Boolean(youtubeEmbed && isYouTubeShortUrl(media));

              return (
                <div
                  key={`${project.slug}-media-${index}`}
                  className={`group overflow-hidden rounded-none bg-[#161616] ${
                    isEditorialGallery
                      ? isShortVideo
                        ? "md:col-span-2 md:row-span-2 md:translate-y-1"
                        : getEditorialTileClass(project.slug, index)
                      : index === 0
                        ? "md:col-span-2"
                        : ""
                  }`}
                >
                  {youtubeEmbed ? (
                    <iframe
                      src={youtubeEmbed}
                      title={`${project.title} video ${index + 1}`}
                      className={isEditorialGallery ? "h-full w-full" : "aspect-[16/9] w-full"}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <ProjectImage
                      src={media}
                      alt={`${project.title} ${index + 1}`}
                      slug={project.slug}
                      className={
                        isEditorialGallery
                          ? "h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                          : "aspect-[4/3] w-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Link
          href={`/work/${nextProject.slug}`}
          className="group block w-full bg-[#161616] px-[5vw] py-20 transition-colors duration-200"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40">
            Siguiente proyecto
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase text-white transition-colors duration-200 group-hover:text-[#f7b7ff]">
              {nextProject.title}
            </h2>
            <ArrowUpRight className="size-8 text-[#f7b7ff]" />
          </div>
        </Link>
      </main>
    </div>
  );
}
