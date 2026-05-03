"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";
import { revealVariants } from "@/src/hooks/useScrollReveal";

const stats = [
  { value: "5+", label: "Anos de experiencia" },
  { value: "120+", label: "Proyectos creativos" },
  { value: "30+", label: "Marcas acompanadas" },
];

const testimonials = [
  {
    title: "Vision y claridad",
    quote:
      "Kiosco Label tradujo una idea confusa en una identidad visual solida y lista para crecer.",
    name: "Fundadora, marca de skincare",
  },
  {
    title: "Proceso ordenado",
    quote:
      "Cada entrega tuvo intencion. Desde estrategia hasta diseno final, todo estuvo bien guiado.",
    name: "Director, estudio audiovisual",
  },
  {
    title: "Resultado memorable",
    quote:
      "No solo mejoro nuestra estetica: ahora comunicamos mejor y con mucha mas consistencia.",
    name: "Co-founder, e-commerce de moda",
  },
];

export default function AboutPage() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-neutral-900 selection:bg-[#d9ff3f] selection:text-black">
      <main className="bg-[#f3f3f3]">
        <section className="mx-auto w-full max-w-[1200px] px-[5vw] pb-14 pt-12 md:pb-20 md:pt-16">
          <div>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              About
            </p>
            <h1 className="font-display mt-5 text-center text-[clamp(2.8rem,8vw,6.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-[#0a0a0a]">
              {splitWords("About me").map((word, index) => (
                <span
                  key={`about-head-${word}-${index}`}
                  style={{ display: "inline-block", overflow: "hidden" }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                      marginRight: "0.25em",
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
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-center text-[1rem] leading-[1.85] text-neutral-700 md:text-[1.08rem]">
              Opero entre estrategia, diseno y produccion para construir marcas
              con identidad real. Combino direccion creativa con ejecucion para
              transformar ideas en sistemas visuales claros, utiles y
              memorables.
            </p>
          </div>

          <motion.div
            className="mt-10 grid gap-6 rounded-2xl border border-black/10 bg-[#0a0a0a] p-4 sm:p-6 md:mt-12 md:grid-cols-[1fr_1fr] md:gap-8 md:p-8"
            variants={revealVariants.fadeUp}
            initial={prefersReduced ? false : "hidden"}
            animate={prefersReduced ? undefined : "visible"}
          >
            <div className="overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gherabout.jpg"
                alt="Equipo Kiosco Label"
                className="h-full min-h-[360px] w-full object-cover md:min-h-[520px]"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.dataset.fallbackApplied === "1") return;
                  img.dataset.fallbackApplied = "1";
                  img.src = "https://picsum.photos/seed/kiosco-about/900/1200";
                }}
              />
            </div>

            <div className="flex flex-col justify-center px-1 py-2 md:px-2">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#d9ff3f]">
                Creative direction
              </p>
              <h2 className="font-display mt-4 text-[31px] font-semibold uppercase leading-[0.95] tracking-[2px] text-white">
                De concepto a experiencia.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[0.98rem] leading-[1.85] text-white/68">
                Trabajo con negocios que necesitan una marca mas clara,
                coherente y lista para competir. Mi enfoque mezcla sistema
                visual, narrativa y decisiones practicas para que cada punto de
                contacto se sienta conectado.
              </p>
              <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-[1.85] text-white/60">
                Desarrollo branding, contenido audiovisual y diseno web con una
                mirada editorial: menos ruido, mas criterio y una identidad que
                se sostiene en el tiempo.
              </p>
            </div>
          </motion.div>

          <motion.section
            className="mt-10 rounded-2xl border border-black/10 bg-white p-6 md:mt-12 md:p-10"
            variants={revealVariants.fadeUp}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Mision
            </p>
            <h3 className="font-display mt-4 max-w-4xl text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-neutral-900 md:text-5xl">
              Construir marcas que conecten con personas reales.
            </h3>
            <p className="mt-6 max-w-3xl text-[1rem] leading-[1.85] text-neutral-700 md:text-[1.06rem]">
              La creatividad y la tecnologia no van separadas. Cada proyecto
              parte de una idea fuerte, se estructura con estrategia y se
              aterriza en piezas visuales que funcionan en el mundo real.
            </p>
          </motion.section>

          <motion.section
            className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3"
            variants={revealVariants.fadeUp}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-30px" }}
          >
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-black/10 bg-white px-6 py-7"
              >
                <p className="font-display text-4xl font-semibold uppercase leading-none text-neutral-900 md:text-5xl">
                  {item.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-neutral-500">
                  {item.label}
                </p>
              </article>
            ))}
          </motion.section>

          <motion.section
            className="mt-10 md:mt-12"
            variants={revealVariants.fadeUp}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-30px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Testimonios
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-black/10 bg-white p-6"
                >
                  <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-900">
                    {item.title}
                  </h4>
                  <p className="mt-4 text-[0.98rem] leading-[1.8] text-neutral-700">
                    "{item.quote}"
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.16em] text-neutral-500">
                    {item.name}
                  </p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="mt-10 rounded-2xl border border-black/10 bg-neutral-950 p-7 text-center md:mt-12 md:p-10"
            variants={revealVariants.fadeUp}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-30px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              Let&apos;s build something meaningful
            </p>
            <h3 className="font-display mt-4 text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-white md:text-5xl">
              Tu proyecto merece una identidad fuerte.
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-[0.98rem] leading-[1.85] text-white/70">
              Si quieres construir una marca clara, consistente y memorable,
              podemos trabajar juntos desde estrategia hasta ejecucion.
            </p>
          </motion.section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
