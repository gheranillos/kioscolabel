"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

import Footer from "@/components/Footer";
import { EditorialWorkGrid } from "@/src/components/EditorialWorkGrid";
import { ReviewsSection } from "@/src/sections/Reviews";
import { ServicesAccordion } from "@/src/sections/ServicesAccordion";
import { ClientsSection } from "@/src/sections/Clients";
import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";
import { revealVariants, staggerChild, staggerContainer } from "@/src/hooks/useScrollReveal";

const GLSLHills = dynamic(
  () => import("@/components/ui/glsl-hills").then((m) => m.GLSLHills),
  { ssr: false, loading: () => null },
);

export default function HomePage() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReduced(reduced);
  }, []);

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#d9ff3f] selection:text-black">
      <section className="relative min-h-[100dvh] overflow-hidden bg-[#f3f3f3]">
        <div className="pointer-events-none absolute inset-0 z-0">
          {!prefersReduced && (
            <div className="absolute inset-0 opacity-[0.22] saturate-50 contrast-95 [mix-blend-mode:multiply]">
              <GLSLHills width="100%" height="100%" speed={0.45} />
            </div>
          )}
          {/* Capa dominante blanca para contraste alto; deja apenas textura */}
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_45%,#ffffff_100%)]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/92 backdrop-blur-[2px]" aria-hidden />
          {prefersReduced && <div className="absolute inset-0 bg-neutral-50" aria-hidden />}
        </div>

        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-14 pt-28 text-center text-[#f3f3f3] md:px-10 md:pt-32 md:pb-20">
          <p className="font-sans text-xs font-semibold uppercase tracking-[2px] text-black">
            {splitWords("Kiosco Label - Lecheria, Venezuela").map((word, index) => (
              <span
                key={`hero-eyebrow-${word}-${index}`}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <motion.span
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  variants={wordVariants}
                  custom={index}
                  initial={prefersReduced ? false : "hidden"}
                  animate={prefersReduced ? undefined : "visible"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>

          <h1 className="mt-8 max-w-4xl text-4xl leading-[1.06] tracking-[-0.03em] text-[#f3f3f3] sm:text-5xl md:text-6xl lg:text-[clamp(3rem,5vw,4.75rem)]">
            <span className="font-sans text-4xl font-extrabold uppercase tracking-[0.2px] text-black sm:text-5xl md:text-6xl lg:text-[clamp(3rem,5vw,4.75rem)]">
              {["BECAUSE", "WE", "THINK"].map((word, i) => (
                <span
                  key={`hero-line1-${word}-${i}`}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                >
                  <motion.span
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                    variants={wordVariants}
                    custom={i + 5}
                    initial={prefersReduced ? false : "hidden"}
                    animate={prefersReduced ? undefined : "visible"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <br />
              {["BEFORE", "WE", "DESIGN"].map((word, i) => (
                <span
                  key={`hero-line2-${word}-${i}`}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                >
                  <motion.span
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                    variants={wordVariants}
                    custom={i + 8}
                    initial={prefersReduced ? false : "hidden"}
                    animate={prefersReduced ? undefined : "visible"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-black md:text-lg">
            {splitWords(
              "El logo es el 5%. El otro 95% es estrategia, estetica y narrativa. Si tu imagen no refleja tu valor, la reconstruimos completa.",
            ).map((word, index) => (
              <span
                key={`hero-lede-${word}-${index}`}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <motion.span
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  variants={wordVariants}
                  custom={index + 12}
                  initial={prefersReduced ? false : "hidden"}
                  animate={prefersReduced ? undefined : "visible"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.a
            href="#proyectos"
            onClick={(e) => {
              if (typeof document === "undefined") return;
              const target = document.getElementById("proyectos");
              if (!target) return;
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mt-14 inline-flex flex-col items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-neutral-700 transition-colors hover:text-neutral-950 md:mt-20"
            aria-label="Scroll a la sección de proyectos"
          >
            <span>Scroll</span>
            <motion.span
              aria-hidden
              animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              className="text-base"
            >
              ↓
            </motion.span>
          </motion.a>
        </div>
      </section>

      <section
        id="proyectos"
        className="scroll-mt-16 bg-[#f3f3f3] px-6 py-20 text-white md:px-10 md:py-28"
      >
        <EditorialWorkGrid heading="WORKS" />
      </section>

      <ServicesAccordion />

      <ClientsSection />

      <ReviewsSection />

      <section id="contacto" className="scroll-mt-16 border-t border-neutral-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <motion.div
            className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]"
            variants={revealVariants.fadeIn}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
          >
            Contact
          </motion.div>
          <h2 className="font-display mt-5 max-w-5xl text-4xl font-semibold uppercase leading-[0.94] tracking-[-0.03em] md:text-7xl">
            {splitWords("Si tu marca no se siente real, la rehacemos desde cero.").map((word, index) => (
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
            ))}
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
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Contacto directo</p>
              <div className="mt-7 space-y-5">
                <div className="border-b border-white/15 pb-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">Email</p>
                  <a
                    href="mailto:hello@kioscolabel.com"
                    className="mt-2 inline-block text-lg tracking-wide text-white transition hover:text-[#d9ff3f]"
                  >
                    hello@kioscolabel.com
                  </a>
                </div>
                <div className="border-b border-white/15 pb-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">Instagram</p>
                  <a
                    href="https://instagram.com/kioscolabel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-lg tracking-wide text-white transition hover:text-[#f7b7ff]"
                  >
                    <Instagram className="h-4 w-4" />
                    @kioscolabel
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">WhatsApp</p>
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

            <motion.form variants={staggerChild} className="rounded-[30px] border border-white/15 bg-white/[0.03] p-7 md:p-9">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Tienes talento, pero no identidad?
              </p>
              <div className="mt-7 grid gap-5">
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Nombre
                  <input
                    type="text"
                    placeholder="Como te llamas?"
                    className="h-12 rounded-xl border border-white/15 bg-black/20 px-4 text-sm tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Email
                  <input
                    type="email"
                    placeholder="Donde te escribo?"
                    className="h-12 rounded-xl border border-white/15 bg-black/20 px-4 text-sm tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Tipo de proyecto
                  <input
                    type="text"
                    placeholder="Branding, web o video?"
                    className="h-12 rounded-xl border border-white/15 bg-black/20 px-4 text-sm tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Mensaje
                  <textarea
                    rows={5}
                    placeholder="Que vendes, a quien le hablas y que te esta frenando?"
                    className="min-h-[136px] rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm leading-relaxed tracking-wide text-white placeholder:text-white/35 outline-none transition focus:border-[#d9ff3f]"
                  />
                </label>
              </div>
              <button
                type="button"
                className="font-mozaic mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#f7b7ff] px-8 text-xs font-bold uppercase tracking-[1.2px] text-black transition hover:translate-y-[-1px] hover:bg-white"
              >
                Construyamos tu marca
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
