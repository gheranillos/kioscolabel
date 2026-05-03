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
import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";
import { revealVariants, staggerChild, staggerContainer } from "@/src/hooks/useScrollReveal";

const GLSLHills = dynamic(
  () => import("@/components/ui/glsl-hills").then((m) => m.GLSLHills),
  { ssr: false, loading: () => null },
);

const services = [
  {
    number: "01",
    title: "Branding",
    description:
      "No te hago un logo. Te hago una marca que la gente recuerde. Defino estrategia, tono, identidad visual y narrativa para que tu negocio se vea como lo que vale.",
    tags: ["Identidad", "Logotipo", "Sistema Visual", "Estrategia"],
    image: "/picbranding.png",
    fallback: "https://picsum.photos/seed/branding/800/520",
  },
  {
    number: "02",
    title: "Edición de Video",
    description:
      "El video no es relleno. Es percepcion. Edito piezas con ritmo, criterio y direccion para que tu marca se sienta viva y coherente en cada pantalla.",
    tags: ["Redes", "Narrativa", "Ritmo", "Contenido"],
    image: "/picvideos.png",
    fallback: "https://picsum.photos/seed/videoediting/800/520",
  },
  {
    number: "03",
    title: "Diseño Web",
    description:
      "Diseno sitios que se ven duros y funcionan en serio. Cada bloque responde a una estrategia clara: posicionar tu marca, ordenar tu mensaje y convertir visitas en interes real.",
    tags: ["Responsive", "UI", "Portfolio", "Webflow"],
    image: "/picweb.png",
    fallback: "https://picsum.photos/seed/webdesign/800/520",
  },
  {
    number: "04",
    title: "Diseño Gráfico",
    description:
      "Bajo tu marca a piezas concretas: contenido, presentaciones y campañas visuales con caracter. Cultura + calle + estrategia + estetica. Sin las cuatro, es solo decoracion.",
    tags: ["Gráfica", "Print", "Redes", "Campaña"],
    image: "/picdesign.png",
    fallback: "https://picsum.photos/seed/graphic/800/520",
  },
];

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
            <span className="font-sans align-bottom bg-white font-extrabold not-italic tracking-normal text-left text-black [background-clip:unset] [-webkit-background-clip:unset]">
              DISENO QUE VENDE
            </span>
            <br />
            <span className="font-sans text-4xl font-thin uppercase tracking-[0.2px] text-black sm:text-5xl md:text-6xl lg:text-[clamp(3rem,5vw,4.75rem)]">
              PORQUE PIENSO ANTES DE DECORAR
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-black md:text-lg">
            El logo es el 5%. El otro 95% es estrategia, estetica y narrativa. Si tu imagen no refleja tu valor, yo la reconstruyo completa.
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

      <section
        id="servicios"
        className="scroll-mt-16 border-y border-neutral-200 bg-neutral-100/90"
      >
        <div className="mx-auto max-w-7xl overflow-visible px-6 pb-0 pt-24 md:px-10">
          <div className="max-w-2xl">
            <motion.div
              variants={revealVariants.fadeIn}
              initial={prefersReduced ? false : "hidden"}
              whileInView={prefersReduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[#f7b7ff]"
            >
              Servicios
            </motion.div>
            <h2 className="font-display mt-4 text-3xl font-semibold uppercase tracking-tight text-neutral-900 md:text-5xl">
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
                className={`group sticky min-h-[420px] w-full rounded-2xl border border-neutral-300/90 bg-white px-6 py-8 shadow-[0_4px_28px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] md:px-14 md:py-12 ${
                  index === 0
                    ? "top-[60px] md:top-[96px]"
                    : index === 1
                      ? "top-[72px] md:top-[114px]"
                      : index === 2
                        ? "top-[84px] md:top-[132px]"
                        : "top-[96px] md:top-[150px]"
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
                      <h3 className="font-mozaic text-[clamp(1.6rem,8vw,2.4rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-neutral-950 md:text-[clamp(2rem,3.5vw,3rem)]">
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
                        prefersReduced ? undefined : { scale: 1.06, transition: { duration: 0.5 } }
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
            {splitWords("Si tu marca no se siente real, la rehago desde cero.").map((word, index) => (
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
                Quiero construir mi marca
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
