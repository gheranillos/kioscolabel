"use client";

import Link from "next/link";

import { projectsInWorkGridOrder, type Project } from "@/src/data/projects";

function ProjectCard({ project }: { project: Project }) {
  const tags = (project.tags.length ? project.tags : [project.category]).slice(0, 2);

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="aspect-[16/11] overflow-hidden bg-neutral-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallbackApplied === "1") return;
            img.dataset.fallbackApplied = "1";
            img.src = `https://picsum.photos/seed/${project.slug}/1200/800`;
          }}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-6">
        <h3 className="font-mozaic text-base font-semibold tracking-tight text-neutral-950 md:text-lg">
          {project.title}
        </h3>
        <div className="max-w-[40%] shrink-0 text-right text-[11px] font-normal leading-snug tracking-wide text-neutral-400 md:text-xs">
          {tags.map((t) => (
            <div key={t}>{t}</div>
          ))}
        </div>
      </div>
    </Link>
  );
}

type EditorialWorkGridProps = {
  allProjects?: Project[];
  heading?: string;
  className?: string;
};

export function EditorialWorkGrid({
  allProjects,
  heading = "WORKS",
  className = "",
}: EditorialWorkGridProps) {
  const ordered = projectsInWorkGridOrder(allProjects);
  const left = ordered.filter((_, i) => i % 2 === 0);
  const right = ordered.filter((_, i) => i % 2 === 1);

  return (
    <div className={className}>
      <h2 className="font-display mb-16 text-center text-4xl font-semibold uppercase tracking-tight text-neutral-950 md:mb-20 md:text-5xl lg:text-6xl">
        {heading}
      </h2>
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-x-14 gap-y-16 md:grid-cols-2 md:gap-x-20 lg:gap-x-28">
        <div className="flex flex-col gap-16 md:gap-24">
          {left.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="flex flex-col gap-16 pt-0 md:gap-24 md:pt-28">
          {right.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
