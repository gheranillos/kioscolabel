"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { projects, projectsInWorkGridOrder } from "@/src/data/projects";
import { staggerChild, staggerContainer } from "@/src/hooks/useScrollReveal";

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const remap = (v: number, i0: number, i1: number, o0: number, o1: number) => {
  if (i1 - i0 === 0) return o0;
  const mapped = o0 + ((v - i0) / (i1 - i0)) * (o1 - o0);
  return clamp(mapped, Math.min(o0, o1), Math.max(o0, o1));
};

type TileConfig = {
  topVh: number;
  leftVw: number;
  widthVw: number;
  heightVh: number;
  rotateDeg: number;
};

const TILE_INIT: TileConfig[] = [
  { topVh: -5, leftVw: -2, widthVw: 38, heightVh: 34, rotateDeg: -6 },
  { topVh: -8, leftVw: 34, widthVw: 42, heightVh: 36, rotateDeg: 3 },
  { topVh: -6, leftVw: 68, widthVw: 36, heightVh: 33, rotateDeg: 5 },
  { topVh: 42, leftVw: -3, widthVw: 35, heightVh: 32, rotateDeg: -4 },
  { topVh: 38, leftVw: 32, widthVw: 44, heightVh: 37, rotateDeg: -2 },
  { topVh: 44, leftVw: 68, widthVw: 37, heightVh: 34, rotateDeg: 6 },
];

const TILE_GRID: TileConfig[] = [
  { topVh: 0, leftVw: 0, widthVw: 33.34, heightVh: 50, rotateDeg: 0 },
  { topVh: 0, leftVw: 33.33, widthVw: 33.34, heightVh: 50, rotateDeg: 0 },
  { topVh: 0, leftVw: 66.66, widthVw: 33.34, heightVh: 50, rotateDeg: 0 },
  { topVh: 50, leftVw: 0, widthVw: 33.34, heightVh: 50, rotateDeg: 0 },
  { topVh: 50, leftVw: 33.33, widthVw: 33.34, heightVh: 50, rotateDeg: 0 },
  { topVh: 50, leftVw: 66.66, widthVw: 33.34, heightVh: 50, rotateDeg: 0 },
];

/** Ritmo editorial en `/work` (filas claras + freelance visible). */
const WORK_GRID_ARTICLE_CLASSES: string[] = [
  "aspect-[5/4] md:col-span-5 md:col-start-1 md:row-start-1 md:self-start",
  "aspect-[16/11] md:col-span-7 md:col-start-6 md:row-start-1 md:translate-y-10 md:self-start",
  "aspect-[16/11] md:col-span-8 md:col-start-1 md:row-start-2 md:-translate-y-1 md:self-start",
  "aspect-[4/5] md:col-span-4 md:col-start-9 md:row-start-2 md:translate-y-6 md:self-end",
  "aspect-[16/10] md:col-span-6 md:col-start-1 md:row-start-3 md:self-start",
  "aspect-[16/10] md:col-span-6 md:col-start-7 md:row-start-3 md:self-start",
];

function WorkHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  const isMobile = viewport.width < 768;
  const mobilePhase4Height = 40;
  const tileProjects = useMemo(
    () =>
      projectsInWorkGridOrder(projects)
        .slice(0, TILE_INIT.length)
        .map((p) => projects.indexOf(p)),
    [],
  );
  const activeTileIndex = tileProjects.findIndex((projectIndex) => projectIndex === activeIndex);

  const finalTiles: TileConfig[] = isMobile
    ? [
        { topVh: 0, leftVw: 0, widthVw: 100, heightVh: mobilePhase4Height, rotateDeg: 0 },
        { topVh: 40, leftVw: 0, widthVw: 100, heightVh: mobilePhase4Height, rotateDeg: 0 },
        { topVh: 80, leftVw: 0, widthVw: 100, heightVh: mobilePhase4Height, rotateDeg: 0 },
        { topVh: 120, leftVw: 0, widthVw: 100, heightVh: mobilePhase4Height, rotateDeg: 0 },
      ]
    : [
        { topVh: 0, leftVw: 0, widthVw: 50, heightVh: 50, rotateDeg: 0 },
        { topVh: 0, leftVw: 50, widthVw: 50, heightVh: 50, rotateDeg: 0 },
        { topVh: 50, leftVw: 0, widthVw: 50, heightVh: 50, rotateDeg: 0 },
        { topVh: 50, leftVw: 50, widthVw: 50, heightVh: 50, rotateDeg: 0 },
      ];

  useEffect(() => {
    const onResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const scrolled = window.scrollY - section.offsetTop;
        const total = section.offsetHeight - window.innerHeight;
        const p = clamp(scrolled / Math.max(total, 1), 0, 1);
        setProgress(p);

        if (p < 0.15) setPhase(1);
        else if (p < 0.5) setPhase(2);
        else if (p < 0.75) setPhase(3);
        else setPhase(4);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const phase2P = remap(progress, 0.15, 0.5, 0, 1);
  const phase3P = remap(progress, 0.5, 0.75, 0, 1);
  const phase4P = remap(progress, 0.75, 1, 0, 1);
  const overlayOpacity = remap(progress, 0.12, 0.22, 1, 0);

  const indicatorOpacity = Math.min(
    remap(progress, 0.52, 0.58, 0, 1),
    remap(progress, 0.72, 0.75, 1, 0),
  );

  useEffect(() => {
    if (phase !== 3 || phase3P <= 0.1 || phase3P >= 0.95) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 1500);
    return () => window.clearInterval(interval);
  }, [phase, phase3P]);

  const tiles = useMemo(
    () =>
      tileProjects.map((projectIndex, i) => {
        const init = TILE_INIT[i]!;
        const grid = TILE_GRID[i]!;

        const mobileScale = isMobile ? 0.82 : 1;
        const initTop = init.topVh * mobileScale;
        const initLeft = init.leftVw * mobileScale;
        const initWidth = init.widthVw * mobileScale;
        const initHeight = init.heightVh * mobileScale;

        let top = initTop;
        let left = initLeft;
        let width = initWidth;
        let height = initHeight;
        let rotate = init.rotateDeg;
        let opacity = 0.35;
        let brightness = 0.5;
        let borderRadius = 12;
        let zIndex = 1;

        if (progress >= 0.15 && progress < 0.5) {
          top = lerp(initTop, grid.topVh, phase2P);
          left = lerp(initLeft, grid.leftVw, phase2P);
          width = lerp(initWidth, grid.widthVw, phase2P);
          height = lerp(initHeight, grid.heightVh, phase2P);
          rotate = lerp(init.rotateDeg, 0, phase2P);
          opacity = lerp(0.35, 1, phase2P);
          brightness = lerp(0.5, 1, phase2P);
          borderRadius = lerp(12, 0, phase2P);
        }

        if (progress >= 0.5 && progress < 0.75) {
          const isActive = i === activeTileIndex;
          if (isActive) {
            top = lerp(grid.topVh, 0, phase3P);
            left = lerp(grid.leftVw, 0, phase3P);
            width = lerp(grid.widthVw, 100, phase3P);
            height = lerp(grid.heightVh, 100, phase3P);
            opacity = 1;
            zIndex = 5;
          } else {
            top = grid.topVh;
            left = grid.leftVw;
            width = grid.widthVw;
            height = grid.heightVh;
            opacity = lerp(1, 0, phase3P);
            zIndex = 1;
          }
          rotate = 0;
          brightness = 1;
          borderRadius = 0;
        }

        if (progress >= 0.75) {
          const isActive = i === activeTileIndex;
          const startTop = isActive ? 0 : grid.topVh;
          const startLeft = isActive ? 0 : grid.leftVw;
          const startWidth = isActive ? 100 : grid.widthVw;
          const startHeight = isActive ? 100 : grid.heightVh;
          const startOpacity = isActive ? 1 : 0;

          if (i < 4) {
            const fin = finalTiles[i]!;
            top = lerp(startTop, fin.topVh, phase4P);
            left = lerp(startLeft, fin.leftVw, phase4P);
            width = lerp(startWidth, fin.widthVw, phase4P);
            height = lerp(startHeight, fin.heightVh, phase4P);
            opacity = lerp(startOpacity, 1, phase4P);
          } else {
            top = lerp(startTop, startTop, phase4P);
            left = lerp(startLeft, startLeft, phase4P);
            width = lerp(startWidth, startWidth, phase4P);
            height = lerp(startHeight, startHeight, phase4P);
            opacity = lerp(startOpacity, 0, phase4P);
          }

          rotate = 0;
          brightness = 1;
          borderRadius = lerp(0, 12, phase4P);
          zIndex = i < 4 ? 4 : 1;
        }

        return {
          id: i,
          projectIndex,
          top,
          left,
          width,
          height,
          rotate,
          opacity,
          brightness,
          borderRadius,
          zIndex,
        };
      }),
    [activeTileIndex, finalTiles, isMobile, phase2P, phase3P, phase4P, progress],
  );

  return (
    <section ref={sectionRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#161616]">
        <div className="absolute inset-0">
          {tiles.map((tile) => {
            const project = projects[tile.projectIndex]!;
            return (
              <div
                key={tile.id}
                className="absolute overflow-hidden"
                style={{
                  top: `${tile.top}vh`,
                  left: `${tile.left}vw`,
                  width: `${tile.width}vw`,
                  height: `${tile.height}vh`,
                  transform: `rotate(${tile.rotate}deg)`,
                  opacity: tile.opacity,
                  borderRadius: `${tile.borderRadius}px`,
                  zIndex: tile.zIndex,
                  filter: `brightness(${tile.brightness})`,
                  transition:
                    progress >= 0.5 && progress < 0.75
                      ? "all 0.6s cubic-bezier(0.16,1,0.3,1)"
                      : "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.dataset.fallbackApplied === "1") return;
                    img.dataset.fallbackApplied = "1";
                    img.src = `https://picsum.photos/seed/${project.slug}/1200/800`;
                  }}
                />
              </div>
            );
          })}

          <div className="absolute inset-0 z-20" style={{ opacity: overlayOpacity }}>
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center">
                <h2
                  className="work-hero-book text-[90px] font-black uppercase leading-[0.9] tracking-[3.3px] text-[rgba(245,240,232,1)] mix-blend-difference"
                >
                  EDITOR
                </h2>
                <h2
                  className="work-hero-book text-[90px] font-black uppercase leading-[0.9] tracking-[3.3px] text-[rgba(245,240,232,1)] mix-blend-difference"
                >
                  y DIRECTOR
                </h2>
              </div>
            </div>

          </div>

          <div
            className="pointer-events-none absolute bottom-8 left-6 z-30 md:left-12"
            style={{ opacity: indicatorOpacity }}
          >
            <p className="text-base font-bold uppercase tracking-[0.12em] text-white">
              {projects[activeIndex]?.title}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
          </div>
        </div>
        <style jsx global>{`
          @font-face {
            font-family: "CoolveticaBook";
            src: url("/fonts/coolvetica/Coolvetica-Book-Regular.otf")
              format("opentype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          .work-hero-book {
            font-family: "CoolveticaBook", sans-serif;
          }
        `}</style>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[#f7b7ff] selection:text-black">
      <main className="pb-14">
        <WorkHero />

        <motion.section
          className="mx-auto w-full max-w-[1680px] bg-[#0b0f14] px-6 py-10 md:px-10 md:py-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-7 md:gap-y-12">
            {projectsInWorkGridOrder(projects).map((project, index) => (
            <motion.article
              key={project.slug}
              className={`group relative overflow-hidden bg-[#161616] ${
                WORK_GRID_ARTICLE_CLASSES[index] ??
                "aspect-[5/4] md:col-span-12 md:row-auto"
              }`}
              variants={staggerChild}
            >
              <Link href={`/work/${project.slug}`} className="block h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.dataset.fallbackApplied === "1") return;
                    img.dataset.fallbackApplied = "1";
                    img.src = `https://picsum.photos/seed/${project.slug}/1200/800`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.85] via-black/10 to-transparent transition-colors duration-300 group-hover:from-black/90 group-hover:via-black/20" />
                <ArrowUpRight
                  className="absolute right-5 top-5 size-7 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ color: project.accentColor }}
                />
                <div className="absolute bottom-0 p-5 md:p-6">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                  <h2 className="mt-3 text-[17px] font-extrabold uppercase tracking-[0.8px] text-white [font-family:CoolveticaBook]">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">
                    {project.year}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
