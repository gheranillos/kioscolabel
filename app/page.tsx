"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
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
            Kiosco Label - Lecheria, Venezuela
          </p>

          <h1 className="mt-8 max-w-4xl text-4xl leading-[1.06] tracking-[-0.03em] text-[#f3f3f3] sm:text-5xl md:text-6xl lg:text-[clamp(3rem,5vw,4.75rem)]">
            <span className="font-sans text-4xl font-extrabold uppercase tracking-[0.2px] text-black sm:text-5xl md:text-6xl lg:text-[clamp(3rem,5vw,4.75rem)]">
              BECAUSE WE THINK
              <br />
              BEFORE WE DESIGN
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-black md:text-lg">
            El logo es el 5%. El otro 95% es estrategia, estetica y narrativa. Si tu imagen no refleja tu valor, la reconstruimos completa.
          </p>

          <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              asChild
              className="h-11 rounded-none border-neutral-900/20 bg-white/70 px-8 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 shadow-sm backdrop-blur-sm hover:bg-neutral-950 hover:text-white"
            >
              <Link href="/work">Ver trabajo</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="h-11 rounded-none border border-neutral-900/15 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 hover:bg-neutral-100 hover:text-neutral-950"
            >
              <Link href="/#contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="proyectos"
        className="scroll-mt-16 border-t border-neutral-200 bg-[#efefee] px-6 py-20 text-[#f3f3f3] md:px-10 md:py-28"
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
