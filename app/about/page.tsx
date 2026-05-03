"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Compass,
  PenTool,
  Rocket,
  Sparkles,
} from "lucide-react";

import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";
import {
  revealVariants,
  staggerChild,
  staggerContainer,
} from "@/src/hooks/useScrollReveal";

const galleryCovers = [
  { src: "/images/projects/coverkiosco.webp", label: "El Kiosco" },
  { src: "/images/projects/coverpadelcafe.webp", label: "Padel Café" },
  { src: "/images/projects/covernapo.webp", label: "Naponino" },
  { src: "/images/projects/coverdtf.webp", label: "DTF Lechería" },
  { src: "/images/projects/coverfreelancer.webp", label: "Freelance" },
  { src: "/images/projects/covermtb.webp", label: "MTB Caracas" },
];

const stats = [
  { value: "5", suffix: "+", label: "Años construyendo marcas" },
  { value: "30", suffix: "+", label: "Identidades elevadas" },
  { value: "120", suffix: "+", label: "Proyectos creativos" },
  { value: "100", suffix: "%", label: "Dirección con criterio" },
];

const principles = [
  "Estrategia clara antes de cualquier pixel",
  "Diseño con intención, no decoración",
  "Cultura, calle y estética en cada decisión",
  "Resultados que escalan, no piezas sueltas",
  "Soluciones a la medida del proyecto",
];

const milestones = [
  {
    year: "2026",
    title: "DTF Lechería",
    role: "Branding · Dirección visual",
  },
  {
    year: "2025",
    title: "Padel Café · Naponino",
    role: "Identidad · Sistema visual",
  },
  {
    year: "2024",
    title: "El Kiosco",
    role: "Marca cultural · Dirección de arte",
  },
  {
    year: "2024",
    title: "MTB Caracas",
    role: "Edición · Dirección audiovisual",
  },
  {
    year: "2023",
    title: "Trabajos freelance",
    role: "Branding, video y dirección creativa",
  },
];

const processSteps = [
  {
    number: "01",
    icon: Compass,
    title: "Discovery",
    description:
      "Entendemos tu marca, mercado, audiencia y el problema real que estás resolviendo.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Strategy",
    description:
      "Definimos tono, narrativa, posicionamiento y el sistema visual que va a sostenerlo.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design",
    description:
      "Bajamos la estrategia a piezas concretas: logo, identidad, web, contenido y campaña.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "Entregamos un sistema completo, listo para escalar en redes, web y todos los canales.",
  },
];

const faqs = [
  {
    question: "¿Qué servicios ofrecen?",
    answer:
      "Branding, diseño web, edición de video y diseño gráfico. Cada proyecto se arma a medida, mezclando estrategia, dirección visual y ejecución para marcas que quieren verse reales y memorables.",
  },
  {
    question: "¿Trabajan con startups o solo con marcas establecidas?",
    answer:
      "Con ambas. Nos meten igual de duro un proyecto que arranca de cero que un rebrand de una marca que ya factura. Lo que pesa es la intención, no el tamaño.",
  },
  {
    question: "¿Cuánto dura un proyecto típico?",
    answer:
      "Branding completo: 2 semanas. Diseño web: 2–3 semanas. Identidad gráfica: 1–2 semanas. Video y contenido: 1 semana. Cada arranque se cierra con un roadmap claro de fechas y entregables.",
  },
  {
    question: "¿Cuál es su modelo de precios?",
    answer:
      "Trabajamos con cotización por proyecto y retainers mensuales para clientes recurrentes. Todo se pone sobre la mesa antes de empezar: alcance, entregables, tiempos y presupuesto.",
  },
  {
    question: "¿Trabajan con clientes fuera de Venezuela?",
    answer:
      "Sí. Operamos desde Lechería pero entregamos en remoto a marcas en LATAM, USA y Europa. Todo el proceso se maneja en línea con reuniones, presentaciones y entrega por carpetas digitales.",
  },
];

export default function AboutPage() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof document === "undefined") return;
    const target = document.getElementById("contacto");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#d9ff3f] selection:text-black">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-[#f3f3f3] pb-16 pt-28 md:pt-32 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[auto_1fr] md:items-end md:gap-16 md:px-10">
          <motion.p
            variants={revealVariants.fadeIn}
            initial={prefersReduced ? false : "hidden"}
            animate={prefersReduced ? undefined : "visible"}
            className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]"
          >
            ✦ About
          </motion.p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500 md:justify-self-end">
            (10.2196° N, 64.6796° W) — Lechería, Venezuela
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-6 md:px-10">
          <h1 className="font-display max-w-[16ch] text-[clamp(2.8rem,8vw,6.6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-[#0a0a0a]">
            {splitWords("Construimos marcas que cambian el juego.").map(
              (word, index) => (
                <span
                  key={`about-hero-${word}-${index}`}
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                      marginRight: "0.25em",
                    }}
                    variants={wordVariants}
                    custom={index}
                    initial={prefersReduced ? false : "hidden"}
                    animate={prefersReduced ? undefined : "visible"}
                  >
                    {word}
                  </motion.span>
                </span>
              ),
            )}
          </h1>

          <motion.div
            variants={revealVariants.fadeIn}
            initial={prefersReduced ? false : "hidden"}
            animate={prefersReduced ? undefined : "visible"}
            className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-16"
          >
            <p className="max-w-[52ch] text-base leading-[1.85] text-neutral-700 md:text-[1.08rem]">
              Somos un estudio creativo formado por diseñadores, estrategas y
              directores audiovisuales. Convertimos ideas sueltas en marcas con
              propósito, narrativa propia y ejecución impecable.
            </p>

            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <a
                href="/#contacto"
                onClick={scrollToContact}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-[1px] hover:bg-[#0a0a0a]"
              >
                Empezar proyecto
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/work"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 transition hover:bg-neutral-900/5"
              >
                Ver trabajo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── GALLERY STRIP ───────────────────────── */}
      <section className="bg-[#f3f3f3] pb-20 md:pb-24">
        <motion.div
          variants={staggerContainer}
          initial={prefersReduced ? false : "hidden"}
          whileInView={prefersReduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-6 sm:grid-cols-3 md:grid-cols-6 md:gap-4 md:px-10"
        >
          {galleryCovers.map((cover) => (
            <motion.div
              key={cover.src}
              variants={staggerChild}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover.src}
                alt={cover.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-3">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/85">
                  {cover.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───────────────────────── INTRO + MISSION (DARK) ───────────────────────── */}
      <section className="border-t border-white/5 bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]">
              ✦ No somos otra agencia
            </p>
            <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              {splitWords("Convertimos visión en realidad.").map(
                (word, index) => (
                  <span
                    key={`about-intro-${word}-${index}`}
                    style={{ display: "inline-block", overflow: "hidden" }}
                  >
                    <motion.span
                      style={{
                        display: "inline-block",
                        marginRight: "0.25em",
                      }}
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
          </div>

          <motion.div
            variants={revealVariants.fadeIn}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-16"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                ✦ Nuestra misión
              </p>
              <h3 className="font-display mt-5 text-2xl font-semibold leading-[1.15] text-white md:text-[1.85rem]">
                Diseñar marcas que la gente recuerde, no que la gente tolere.
              </h3>
              <p className="mt-5 text-[0.95rem] leading-[1.85] text-white/70">
                Mezclamos cultura, calle, estrategia y estética para construir
                identidades que vendan mejor, se vean mejor y posicionen mejor.
                El logo es el 5%. El otro 95% es estrategia, narrativa y
                criterio.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                ✦ Cómo trabajamos
              </p>
              <h3 className="font-display mt-5 text-2xl font-semibold leading-[1.15] text-white md:text-[1.85rem]">
                Direccion clara, ejecucion sin ruido.
              </h3>
              <ul className="mt-6 space-y-3">
                {principles.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#d9ff3f]"
                      aria-hidden
                    />
                    <span className="text-[0.95rem] leading-[1.65] text-white/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── STATS (LIGHT) ───────────────────────── */}
      <section className="bg-[#f3f3f3] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]">
              ✦ Resultados con criterio
            </p>
            <h2 className="font-display max-w-3xl text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-neutral-900 md:text-5xl">
              Cinco años bajando estrategia a piezas que venden.
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid grid-cols-2 gap-px border-t border-neutral-300 bg-neutral-300 md:mt-16 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.article
                key={stat.label}
                variants={staggerChild}
                className="bg-[#f3f3f3] p-7 md:p-10"
              >
                <p className="font-display flex items-baseline text-[clamp(3rem,7vw,5.6rem)] font-semibold leading-none tracking-[-0.03em] text-neutral-900">
                  {stat.value}
                  <span className="ml-1 text-[#f7b7ff]">{stat.suffix}</span>
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-neutral-600">
                  {stat.label}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── HITOS / TIMELINE (DARK) ───────────────────────── */}
      <section className="border-t border-white/5 bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
              ✦ Hitos del estudio
            </p>
            <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
              Marcas en las que dejamos huella.
            </h2>
          </div>

          <motion.ul
            variants={staggerContainer}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 flex flex-col md:mt-16"
          >
            {milestones.map((m) => (
              <motion.li
                key={`${m.year}-${m.title}`}
                variants={staggerChild}
                className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-white/10 py-6 md:grid-cols-[120px_1fr_auto] md:gap-10 md:py-8"
              >
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-white/45 md:text-base">
                  {m.year}
                </span>
                <span className="font-display text-xl font-semibold leading-tight text-white md:text-[1.7rem]">
                  {m.title}
                </span>
                <span className="col-span-2 text-xs uppercase tracking-[0.16em] text-white/55 md:col-span-1 md:text-right md:text-[0.78rem]">
                  {m.role}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ───────────────────────── PROCESS (LIGHT) ───────────────────────── */}
      <section className="bg-[#f3f3f3] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]">
              ✦ El proceso
            </p>
            <h2 className="font-display max-w-3xl text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-neutral-900 md:text-5xl">
              De idea suelta a marca con presencia.
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          >
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.number}
                  variants={staggerChild}
                  className="group relative flex flex-col rounded-2xl border border-neutral-300/80 bg-white p-7 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
                      ({step.number})
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-[#d9ff3f] group-hover:text-black">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <h3 className="font-mozaic mt-8 text-2xl font-semibold uppercase tracking-tight text-neutral-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-[1.75] text-neutral-600">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── FAQ (DARK) ───────────────────────── */}
      <section className="border-t border-white/5 bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]">
              ✦ Preguntas frecuentes
            </p>
            <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
              Lo que casi todos preguntan antes de empezar.
            </h2>
          </div>

          <motion.div
            variants={revealVariants.fadeIn}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 md:mt-16"
          >
            <Accordion
              type="single"
              collapsible
              defaultValue="faq-0"
              className="border-t border-white/10"
            >
              {faqs.map((item, idx) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${idx}`}
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="font-display py-6 text-left text-lg font-semibold uppercase tracking-tight text-white hover:no-underline md:py-8 md:text-2xl">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.95rem] leading-[1.85] text-white/70 md:max-w-[68ch] md:pb-8 md:text-[1rem]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── FINAL CTA ───────────────────────── */}
      <section className="bg-[#f3f3f3] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]">
            ✦ Empieza la conversación
          </p>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-neutral-950">
            {splitWords("Empieza tu proyecto hoy.").map((word, index) => (
              <span
                key={`about-cta-${word}-${index}`}
                style={{ display: "inline-block", overflow: "hidden" }}
              >
                <motion.span
                  style={{
                    display: "inline-block",
                    marginRight: "0.25em",
                  }}
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
          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-[1.85] text-neutral-700">
            Si tu marca no se siente real, la rehacemos desde cero. Cuéntanos
            qué estás construyendo y armamos un plan a la medida.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contacto"
              onClick={scrollToContact}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-[1px] hover:bg-[#0a0a0a]"
            >
              Construyamos tu marca
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/work"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-900 transition hover:bg-neutral-900/5"
            >
              Ver portafolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
