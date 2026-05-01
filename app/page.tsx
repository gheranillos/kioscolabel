"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

import { renderCanvas } from "@/components/ui/canvas";
import Footer from "@/components/Footer";
import { projects } from "@/src/data/projects";
import { ReviewsSection } from "@/src/sections/Reviews";
import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";
import { revealVariants, staggerChild, staggerContainer } from "@/src/hooks/useScrollReveal";

/** Imagen en `public/hero.jpg` */
const HERO_IMAGE = "/hero.jpg";

const services = [
  {
    number: "01",
    title: "Branding",
    description:
      "Desarrollo de identidad visual completa: naming, paleta, tipografía, logotipo y sistema gráfico. Marcas que se ven sólidas, actuales y con personalidad propia.",
    tags: ["Identidad", "Logotipo", "Sistema Visual", "Estrategia"],
    image: "/picbranding.png",
    fallback: "https://picsum.photos/seed/branding/800/520",
  },
  {
    number: "02",
    title: "Edición de Video",
    description:
      "Piezas para redes, campañas y contenido audiovisual. Edición con criterio narrativo, ritmo y estética cuidada para que cada video comunique algo real.",
    tags: ["Redes", "Narrativa", "Ritmo", "Contenido"],
    image: "/picvideos.png",
    fallback: "https://picsum.photos/seed/videoediting/800/520",
  },
  {
    number: "03",
    title: "Diseño Web",
    description:
      "Sitios y portfolios con diseño limpio, buena estructura y atención al detalle. Enfocado en que la experiencia visual refleje la identidad de la marca.",
    tags: ["Responsive", "UI", "Portfolio", "Webflow"],
    image: "/picweb.png",
    fallback: "https://picsum.photos/seed/webdesign/800/520",
  },
  {
    number: "04",
    title: "Diseño Gráfico",
    description:
      "Piezas gráficas para redes, print y campañas. Flyers, presentaciones, contenido visual y todo lo que necesite verse bien y tener coherencia.",
    tags: ["Gráfica", "Print", "Redes", "Campaña"],
    image: "/picdesign.png",
    fallback: "https://picsum.photos/seed/graphic/800/520",
  },
];

function ScrollCategories() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  const items = projects.map((project, index) => ({
    number: String(index + 1),
    label: project.title,
    href: `/work/${project.slug}`,
    image: project.coverImage,
  }));

  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrolled = window.scrollY - section.offsetTop;
      const total = section.offsetHeight - window.innerHeight;
      const progress = clamp(scrolled / Math.max(total, 1), 0, 1);
      const segmentSize = 1 / items.length;
      const idx = Math.min(Math.floor(progress / segmentSize), items.length - 1);
      setGlobalProgress(progress);
      setActiveIndex(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="bg-neutral-950"
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {items.map((item, i) => {
          const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
          const segmentSize = 1 / items.length;
          const segmentProgress = clamp(
            (globalProgress - activeIndex * segmentSize) / segmentSize,
            0,
            1,
          );
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          const isNext = i === activeIndex + 1;

          if (!isPast && !isActive && !isNext) return null;

          let scale = 0;
          let translateYVh = 100;
          let borderRadius = "0px";
          let darkOverlay = 0.2;

          if (isActive) {
            const hasNext = activeIndex < items.length - 1;
            scale = hasNext ? 1 - segmentProgress * 0.24 : 1;
            translateYVh = hasNext ? -segmentProgress * 10 : 0;
            borderRadius = hasNext && segmentProgress > 0.05 ? "16px" : "0px";
          } else if (isNext) {
            scale = 1;
            translateYVh = (1 - segmentProgress) * 100;
            borderRadius = "0px";
          } else if (isPast) {
            const depth = activeIndex - i;
            scale = Math.max(0.68, 0.76 - (depth - 1) * 0.08);
            translateYVh = -(depth * 2);
            borderRadius = "16px";
            darkOverlay = 0.3;
          }

          return (
            <div
              key={item.label}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateY(${translateYVh}vh) scale(${scale})`,
                transformOrigin: "top center",
                borderRadius,
                zIndex: i + 1,
                transition: "border-radius 0.3s ease",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.dataset.fallbackApplied === "1") return;
                  img.dataset.fallbackApplied = "1";
                  img.src = `https://picsum.photos/seed/${item.label}/1600/900`;
                }}
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: `rgba(0,0,0,${darkOverlay})` }}
              />
              <div style={{ position: "absolute", bottom: 40, left: 24, right: 24 }}>
                <div className="mb-4 h-px w-full bg-white/40" />
                <div className="flex items-end justify-between">
                  <span
                    style={{ fontFamily: "CoolveticaBook, sans-serif" }}
                    className="text-2xl font-light text-white"
                  >
                    {item.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "CoolveticaBook, sans-serif",
                      fontSize: "clamp(3rem,8vw,7rem)",
                      lineHeight: 0.9,
                    }}
                    className="font-black uppercase text-white"
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <Link
          href={items[Math.max(activeIndex, 0)]?.href ?? "/work"}
          className="absolute inset-0 z-10 block"
          aria-label="Ir al proyecto activo"
        />
      </div>
    </section>
  );
}

export default function GherardPortfolio() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const aboutBgRef = useRef<HTMLDivElement | null>(null);
  const aboutCardRef = useRef<HTMLDivElement | null>(null);
  const aboutLine1Ref = useRef<HTMLHeadingElement | null>(null);
  const aboutLeftWordRef = useRef<HTMLSpanElement | null>(null);
  const aboutRightWordRef = useRef<HTMLSpanElement | null>(null);
  const aboutBtnWrapRef = useRef<HTMLSpanElement | null>(null);
  const aboutBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    renderCanvas();
  }, []);
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReduced(reduced);
  }, []);
  useEffect(() => {
    const section = aboutSectionRef.current;
    const bg = aboutBgRef.current;
    const card = aboutCardRef.current;
    const line1 = aboutLine1Ref.current;
    const leftWord = aboutLeftWordRef.current;
    const rightWord = aboutRightWordRef.current;
    const btnWrap = aboutBtnWrapRef.current;
    const btn = aboutBtnRef.current;
    if (
      !section ||
      !bg ||
      !card ||
      !line1 ||
      !leftWord ||
      !rightWord ||
      !btnWrap ||
      !btn
    )
      return;

    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max);
    const remap = (v: number, i0: number, i1: number, o0: number, o1: number) => {
      if (i1 - i0 === 0) return o0;
      const mapped = o0 + ((v - i0) / (i1 - i0)) * (o1 - o0);
      return clamp(mapped, Math.min(o0, o1), Math.max(o0, o1));
    };

    const onScroll = () => {
      const scrolled = window.scrollY - section.offsetTop;
      const total = section.offsetHeight - window.innerHeight;
      const progress = clamp(scrolled / Math.max(total, 1), 0, 1);
      const splitP = remap(progress, 0, 0.45, 0, 1);
      const spread = remap(splitP, 0, 1, 0, 120);
      line1.style.transform = "translateY(0px)";
      leftWord.style.transform = `translateX(${-spread}px)`;
      rightWord.style.transform = `translateX(${spread}px)`;
      btnWrap.style.opacity = String(splitP);
      btnWrap.style.transform = `translate(-50%, ${14 * (1 - splitP)}px) scale(${0.88 + 0.12 * splitP})`;
      btn.style.opacity = String(splitP);
      btn.style.transform = "scale(1)";

      const zoomP = remap(progress, 0.6, 1, 0, 1);
      card.style.transform = `scale(${1 - 0.22 * zoomP})`;
      card.style.borderRadius = `${28 * zoomP}px`;
      bg.style.opacity = String(zoomP);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#d9ff3f] selection:text-black">
      {/* Hero — full viewport, reference layout */}
      <section className="relative min-h-[100dvh] overflow-hidden border-b border-neutral-900/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/25" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom-centered headline + CTA */}
        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-14 pt-32 md:px-10 md:pb-20">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h1 className="about-book max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl">
              {splitWords("Diseño").map((word, index) => (
                <span
                  key={`hero-head-1-${word}-${index}`}
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                      marginRight: "0.25em",
                      lineHeight: "80px",
                      letterSpacing: "0px",
                    }}
                    variants={wordVariants}
                    custom={index}
                    initial={prefersReduced ? false : "hidden"}
                    animate={prefersReduced ? undefined : "visible"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="text-[#f7b7ff]">
                {splitWords("con").map((word, index) => (
                  <span
                    key={`hero-head-2-${word}-${index}`}
                    style={{ display: "inline-block", overflow: "hidden" }}
                  >
                    <motion.span
                      style={{ display: "inline-block", marginRight: "0.25em" }}
                      variants={wordVariants}
                      custom={index + 1}
                      initial={prefersReduced ? false : "hidden"}
                      animate={prefersReduced ? undefined : "visible"}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
              {splitWords("autenticidad").map((word, index) => (
                <span
                  key={`hero-head-3-${word}-${index}`}
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                      marginRight: "0.25em",
                      letterSpacing: "2.8px",
                    }}
                    variants={wordVariants}
                    custom={index + 2}
                    initial={prefersReduced ? false : "hidden"}
                    animate={prefersReduced ? undefined : "visible"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </div>
        <canvas
          className="pointer-events-none absolute inset-0 mx-auto"
          id="canvas"
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="relative h-[300vh]"
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div
            ref={aboutBgRef}
            className="absolute inset-0 bg-cover bg-center opacity-0"
            style={{
              backgroundImage:
                "url('/aboutbg.png'), url('https://picsum.photos/seed/gherard-about/1600/900')",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div
            ref={aboutCardRef}
            className="relative z-10 mx-auto w-[min(98vw,930px)] bg-white px-4 py-[6vh] text-center sm:px-[5vw] md:px-[4vw] md:py-[5.5vh]"
            style={{ transformOrigin: "center center" }}
          >
            <h2
              ref={aboutLine1Ref}
              className="about-book whitespace-normal break-words font-black tracking-[-0.03em] text-[#0a0a0a] lg:whitespace-nowrap"
              style={{
                fontFamily: "CoolveticaBook, sans-serif",
                fontSize: "clamp(1.45rem, 5.8vw, 5rem)",
                lineHeight: 0.92,
                transition: "transform 0.1s",
                letterSpacing: "0px",
              }}
            >
              No soy editor,
            </h2>

            <h2
              className="about-book relative mt-1 flex items-center justify-center gap-[0.24em] whitespace-normal font-black tracking-[-0.03em] text-[#0a0a0a] md:whitespace-nowrap"
              style={{
                fontFamily: "CoolveticaBook, sans-serif",
                fontSize: "clamp(1.45rem, 5.8vw, 5rem)",
                lineHeight: 0.92,
              }}
            >
              <span
                ref={aboutLeftWordRef}
                className="inline-block transition-transform duration-75"
                style={{ position: "static", letterSpacing: "0px" }}
              >
                Construyo
              </span>
              <span
                ref={aboutBtnWrapRef}
                className="pointer-events-none absolute left-1/2 inline-flex items-center justify-center overflow-visible align-middle"
                style={{ opacity: 0, transform: "translate(-50%, 14px) scale(0.88)" }}
              >
                <button
                  ref={aboutBtnRef}
                  type="button"
                  onClick={() => {
                    const target =
                      document.querySelector("#contact") ??
                      document.querySelector("#contacto");
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="about-light pointer-events-auto rounded-full border border-[#f7b7ff] bg-[#f7b7ff] px-6 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0a0a0a] transition hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white sm:px-8 sm:py-2.5 sm:text-sm md:px-10 md:py-3"
                  style={{
                    fontFamily: "CoolveticaBook, sans-serif",
                    position: "absolute",
                    left: "-66px",
                    top: "-12px",
                    paddingLeft: 32,
                    opacity: 0,
                    transform: "scale(1)",
                    transition: "opacity 0.1s, transform 0.1s",
                    whiteSpace: "nowrap",
                  }}
                >
                  Contacto
                </button>
              </span>
              <span
                ref={aboutRightWordRef}
                className="inline-block transition-transform duration-75"
                style={{ position: "static", letterSpacing: "0px" }}
              >
                identidad.
              </span>
            </h2>
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
            @font-face {
              font-family: "CoolveticaLight";
              src: url("/fonts/coolvetica/Coolvetica-Light-Regular.otf")
                format("opentype");
              font-weight: 300;
              font-style: normal;
              font-display: swap;
            }
            .about-book {
              font-family: "CoolveticaBook", sans-serif;
            }
            .about-light {
              font-family: "CoolveticaLight", sans-serif;
            }
          `}</style>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        className="border-y border-neutral-200 bg-neutral-100/90"
      >
        <div className="mx-auto max-w-7xl overflow-visible px-6 pb-0 pt-24 md:px-10">
          <div className="max-w-2xl">
            <motion.div
              variants={revealVariants.fadeIn}
              initial={prefersReduced ? false : "hidden"}
              whileInView={prefersReduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              className="text-sm uppercase tracking-[0.25em] text-[#f7b7ff]"
            >
              Servicios
            </motion.div>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-neutral-900 md:text-5xl">
              {splitWords("Lo que hago.").map((word, index) => (
                <span
                  key={`services-head-${word}-${index}`}
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

          <motion.div
            className="mt-10 flex flex-col gap-0 overflow-visible pb-14"
            variants={staggerContainer}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
          >
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className={`group min-h-[420px] w-full rounded-2xl border border-neutral-300/90 bg-white px-6 py-8 shadow-[0_4px_28px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] md:px-14 md:py-12 sticky ${
                  index === 0
                    ? "md:top-[80px] top-[60px]"
                    : index === 1
                      ? "md:top-[98px] top-[72px]"
                      : index === 2
                        ? "md:top-[116px] top-[84px]"
                        : "md:top-[134px] top-[96px]"
                }`}
                style={{ zIndex: index + 1 }}
                variants={staggerChild}
                whileHover={
                  prefersReduced
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.015,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }
                }
              >
                <div className="grid gap-8 md:grid-cols-[1fr_380px] md:gap-10">
                  <div className="min-w-0">
                    <div className="flex items-baseline">
                      <span className="mr-4 align-super font-mono text-[0.75rem] font-bold text-fuchsia-600/90">
                        {`{${service.number}}`}
                      </span>
                      <h3 className="text-[clamp(1.6rem,8vw,2.4rem)] font-normal leading-[0.95] tracking-[-0.03em] text-neutral-950 [font-family:var(--font-coolvetica-book),ui-sans-serif,system-ui,sans-serif] md:text-[clamp(2rem,3.5vw,3rem)]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-5 max-w-[520px] text-base leading-[1.75] text-neutral-800">
                      {service.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={`${service.title}-${tag}`}
                          className="rounded-full border border-neutral-200/80 bg-neutral-200/60 px-3.5 py-1 text-[0.78rem] font-medium text-neutral-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <motion.div
                      className="relative h-[260px] overflow-hidden rounded-xl"
                      whileHover={
                        prefersReduced
                          ? undefined
                          : { scale: 1.06, transition: { duration: 0.5 } }
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.dataset.fallbackApplied === "1") return;
                          img.dataset.fallbackApplied = "1";
                          img.src = service.fallback;
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <ScrollCategories />

      <ReviewsSection />

      {/* Contact Section */}
      <section id="contacto" className="border-t border-neutral-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            className="text-xs uppercase tracking-[0.28em] text-[#f7b7ff]"
            variants={revealVariants.fadeIn}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
          >
            Contact
          </motion.div>
          <h2 className="mt-5 max-w-5xl text-4xl font-black uppercase leading-[0.94] tracking-[-0.03em] md:text-7xl">
            {splitWords("Ready para crear algo con identidad real?").map(
              (word, index) => (
                <span
                  key={`contact-refresh-head-${word}-${index}`}
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
              ),
            )}
          </h2>

          <motion.div
            className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
            variants={staggerContainer}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div
              variants={staggerChild}
              className="rounded-[30px] border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm md:p-9"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Contacto directo
              </p>
              <div className="mt-7 space-y-5">
                <div className="border-b border-white/15 pb-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Ubicacion
                  </p>
                  <p className="mt-2 text-lg tracking-wide text-white/90">
                    Venezuela
                  </p>
                </div>
                <div className="border-b border-white/15 pb-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Email
                  </p>
                  <a
                    href="mailto:hello@gherad.com"
                    className="mt-2 inline-block text-lg tracking-wide text-white transition hover:text-[#d9ff3f]"
                  >
                    hello@gherad.com
                  </a>
                </div>
                <div className="border-b border-white/15 pb-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/gheranillos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-lg tracking-wide text-white transition hover:text-[#f7b7ff]"
                  >
                    <Instagram className="h-4 w-4" /> @gheranillos
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/584147613621"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-lg tracking-wide text-white transition hover:text-[#d9ff3f]"
                  >
                    <MessageCircle className="h-4 w-4" /> +58 414 761 3621
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.form
              variants={staggerChild}
              className="rounded-[30px] border border-white/15 bg-white/[0.03] p-7 md:p-9"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Cuentame sobre tu idea
              </p>
              <div className="mt-7 grid gap-5">
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Nombre
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="h-12 rounded-xl border border-white/15 bg-black/20 px-4 text-sm tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Email
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="h-12 rounded-xl border border-white/15 bg-black/20 px-4 text-sm tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Tipo de proyecto
                  <input
                    type="text"
                    placeholder="Branding, web, video..."
                    className="h-12 rounded-xl border border-white/15 bg-black/20 px-4 text-sm tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Mensaje
                  <textarea
                    rows={5}
                    placeholder="Describe tu proyecto, objetivos y tiempos..."
                    className="min-h-[136px] rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm leading-relaxed tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
              </div>
              <button
                type="button"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#f7b7ff] px-8 text-xs font-semibold uppercase tracking-[1.2px] text-black [font-family:CoolveticaBook] transition hover:translate-y-[-1px] hover:bg-white"
              >
                Enviar solicitud
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
