"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";

const stats = [
  { value: "5+", label: "Anos construyendo marcas" },
  { value: "120+", label: "Proyectos creativos ejecutados" },
  { value: "30+", label: "Identidades elevadas" },
];

const testimonials = [
  {
    title: "Direccion real",
    quote:
      "Teniamos talento, pero nuestra marca se veia perdida. Ahora todo comunica el mismo nivel.",
    name: "Fundadora, marca de skincare",
  },
  {
    title: "Estrategia con forma",
    quote:
      "No fue solo diseno bonito. Hubo estructura, narrativa y decisiones claras desde el inicio.",
    name: "Director, estudio audiovisual",
  },
  {
    title: "Presencia que pesa",
    quote:
      "La marca dejo de verse amateur. Ahora tiene identidad y se siente premium en todo.",
    name: "Co-founder, e-commerce de moda",
  },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

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
        <section className="mx-auto w-full max-w-[1200px] px-[5vw] pb-20 pt-12 md:pt-16">
          <div className="border-b border-black/15 pb-10 md:pb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              About
            </p>
            <h1 className="font-display mt-5 text-[clamp(2.8rem,8vw,6.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-[#0a0a0a]">
              {splitWords("Sobre Kiosco Label").map((word, index) => (
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
            <p className="mt-7 max-w-3xl text-[1rem] leading-[1.85] text-neutral-700 md:text-[1.08rem]">
              No somos una agencia generica. Somos un estudio creativo que construye marcas
              completas para negocios y artistas que valen mas de lo que su
              imagen esta diciendo hoy.
            </p>
          </div>

          <motion.div
            className="mt-8 grid border-t border-black/15 md:mt-10 md:grid-cols-12"
            variants={sectionReveal}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="border-b border-black/15 py-8 md:col-span-4 md:border-b-0 md:border-r md:py-10">
              <p className="font-display text-[clamp(4.2rem,8vw,7rem)] font-semibold leading-[0.85] tracking-[-0.03em] text-black">
                01
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Creative direction
              </p>
            </div>
            <div className="py-8 md:col-span-8 md:px-10 md:py-10">
              <h2 className="font-display text-[clamp(1.7rem,4vw,3.1rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-black">
                De idea suelta a identidad con presencia.
              </h2>
              <p className="mt-6 max-w-[56ch] text-[1rem] leading-[1.85] text-neutral-700">
                Trabajamos con marcas locales y emergentes cuya imagen no refleja
                su valor real. Ordenamos estrategia, discurso y sistema visual para
                que todo hable el mismo idioma.
              </p>
              <p className="mt-5 max-w-[56ch] text-[1rem] leading-[1.85] text-neutral-700">
                El logo es el 5%. El otro 95% es estrategia, estetica y
                narrativa. Si falta eso, no hay marca: solo decoracion.
              </p>
            </div>
          </motion.div>

          <motion.section
            className="grid border-t border-black/15 md:grid-cols-12"
            variants={sectionReveal}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="border-b border-black/15 py-8 md:col-span-4 md:border-b-0 md:border-r md:py-10">
              <p className="font-display text-[clamp(4.2rem,8vw,7rem)] font-semibold leading-[0.85] tracking-[-0.03em] text-black">
                02
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Mision
              </p>
            </div>
            <div className="py-8 md:col-span-8 md:px-10 md:py-10">
              <h3 className="font-display max-w-4xl text-[clamp(1.8rem,4vw,3.3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-neutral-900">
                Disenar marcas que la gente recuerde.
              </h3>
              <p className="mt-6 max-w-3xl text-[1rem] leading-[1.85] text-neutral-700 md:text-[1.06rem]">
                Nuestro enfoque mezcla cultura, calle, estrategia y estetica.
                Disenamos para vender mejor, verse mejor y posicionarte mejor.
                Cada decision visual tiene una razon de negocio.
              </p>
            </div>
          </motion.section>

          <motion.section
            className="grid border-y border-black/15 md:grid-cols-3"
            variants={sectionReveal}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            {stats.map((item, index) => (
              <article
                key={item.label}
                className="border-b border-black/15 px-0 py-8 md:border-b-0 md:px-8 md:py-10 [&:not(:last-child)]:md:border-r [&:not(:last-child)]:md:border-black/15"
              >
                <motion.p
                  custom={index}
                  variants={itemReveal}
                  initial={prefersReduced ? false : "hidden"}
                  whileInView={prefersReduced ? undefined : "visible"}
                  viewport={{ once: true, margin: "-40px" }}
                  className="font-display text-[clamp(3.4rem,7vw,6.5rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-neutral-900"
                >
                  {item.value}
                </motion.p>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-neutral-500">
                  {item.label}
                </p>
              </article>
            ))}
          </motion.section>

          <motion.section
            className="mt-8 border-b border-black/15 pb-10 md:mt-10 md:pb-12"
            variants={sectionReveal}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Testimonios
            </p>
            <div className="mt-6 grid md:grid-cols-3 md:gap-8">
              {testimonials.map((item, index) => (
                <article
                  key={item.title}
                  className="border-b border-black/15 py-7 md:border-b-0 md:py-0 [&:not(:last-child)]:md:border-r [&:not(:last-child)]:md:border-black/15 [&:not(:last-child)]:md:pr-8"
                >
                  <p className="font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-none tracking-[-0.03em] text-black">
                    0{index + 1}
                  </p>
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
            className="mt-8 border-t border-black/15 pt-8 md:mt-10 md:pt-10"
            variants={sectionReveal}
            initial={prefersReduced ? false : "hidden"}
            whileInView={prefersReduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Let&apos;s build something meaningful
            </p>
            <h3 className="font-display mt-4 max-w-4xl text-[clamp(2rem,5vw,4.4rem)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-black">
              Tienes talento. Falta identidad.
            </h3>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-[1.85] text-neutral-700">
              Si quieres una marca con presencia real, te ayudamos a construirla
              desde estrategia hasta ejecucion visual.
            </p>
          </motion.section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
