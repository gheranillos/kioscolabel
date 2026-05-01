"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  CircularGallery,
  type GalleryItem,
} from "../components/CircularGallery";
import { projects } from "@/src/data/projects";
import { splitWords, wordVariants } from "../hooks/useTextReveal";
import { revealVariants } from "../hooks/useScrollReveal";

const portfolioItems: GalleryItem[] = projects.map((project) => ({
  image: project.coverImage,
  name: project.title,
  category: project.category,
  href: `/work/${project.slug}`,
}));

export function SelectedWork() {
  const router = useRouter();
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReduced(reduced);
  }, []);

  return (
    <section id="proyectos" className="py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div
              className="text-sm uppercase tracking-[0.25em] text-cyan-700"
              variants={revealVariants.fadeIn}
              initial={prefersReduced ? false : "hidden"}
              whileInView={prefersReduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
            >
              Portfolio
            </motion.div>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-neutral-900 md:text-5xl">
              {splitWords("Selected work / visual worlds").map((word, index) => (
                <span
                  key={`portfolio-head-${word}-${index}`}
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  <motion.span
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                    variants={wordVariants}
                    custom={index}
                    initial={prefersReduced ? false : "hidden"}
                    whileInView={prefersReduced ? undefined : "visible"}
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
          <motion.p
            className="max-w-xl leading-7 text-neutral-600"
            variants={revealVariants.fadeUp}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
          >
            Te dejé esta sección más visual para que metas covers, frames,
            thumbnails, logos, renders o links reales a proyectos que quieras
            enseñar.
          </motion.p>
        </div>
      </div>

      <div
        className="mt-10 w-full bg-white"
        style={{ height: "min(70vh, 600px)", minHeight: 420, position: "relative" }}
      >
        <CircularGallery
          items={portfolioItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.06}
          scrollSpeed={1.1}
          scrollEase={0.04}
          onItemNavigate={(href) => router.push(href)}
        />
      </div>
      <div className="mx-auto mt-12 flex justify-center px-6 md:px-10">
        <Link
          href="/work"
          className="inline-flex items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-transparent px-10 py-[0.85rem] font-semibold text-[#0a0a0a] transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white"
        >
          Ver todos los proyectos &rarr;
        </Link>
      </div>
    </section>
  );
}
