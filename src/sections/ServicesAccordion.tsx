"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";

type Service = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  duration: string;
  image: string;
  fallback: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Diseño Gráfico",
    description:
      "Piezas que comunican antes de que lean una palabra. Diseño con intención, no decoración.",
    bullets: [
      "Identidad visual",
      "Logotipos",
      "Tipografía",
      "Paleta de color",
      "Guía de marca",
    ],
    duration: "1–2 semanas",
    image: "/picdesign.png",
    fallback: "https://picsum.photos/seed/graphic/800/520",
  },
  {
    number: "02",
    title: "Diseño Web",
    description:
      "Tu presencia digital debe cerrar ventas, no solo existir. Webs que convierten.",
    bullets: [
      "Landing pages",
      "Webs de campaña",
      "UX visual",
      "Funnels básicos",
      "Optimización móvil",
    ],
    duration: "2–3 semanas",
    image: "/picweb.png",
    fallback: "https://picsum.photos/seed/web/800/520",
  },
  {
    number: "03",
    title: "Branding",
    description:
      "No es un logo. Es el sistema completo que hace que tu marca se recuerde.",
    bullets: [
      "Estrategia de marca",
      "Dirección creativa",
      "Posicionamiento visual",
      "Manual de marca",
      "Naming",
    ],
    duration: "2 semanas",
    image: "/picbranding.png",
    fallback: "https://picsum.photos/seed/branding/800/520",
  },
  {
    number: "04",
    title: "Video y Contenido",
    description:
      "Visuales que detienen el scroll. Contenido hecho para vender, no solo para verse bien.",
    bullets: [
      "Reels",
      "Videos promocionales",
      "Ads creativos",
      "Fotografía de producto",
      "Dirección audiovisual",
    ],
    duration: "1 semana",
    image: "/picvideos.png",
    fallback: "https://picsum.photos/seed/video/800/520",
  },
];

const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (typeof document === "undefined") return;
  const target = document.getElementById("contacto");
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section
      id="servicios"
      className="scroll-mt-16 border-y border-white/5 bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#f7b7ff]">
            ✦ Servicios
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold uppercase tracking-tight md:text-5xl">
            {splitWords("Lo que hacemos.").map((word, index) => (
              <span
                key={`services-head-${word}-${index}`}
                style={{ display: "inline-block", overflow: "hidden" }}
              >
                <motion.span
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  variants={wordVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[40%_60%] md:gap-12 lg:gap-16">
          {/* LEFT — accordion list */}
          <div className="flex flex-col">
            <ul className="flex flex-col">
              {services.map((service, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <li
                    key={service.number}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-expanded={isActive}
                      aria-controls={`service-panel-${service.number}`}
                      className="group flex w-full items-baseline justify-between py-5 text-left md:py-6"
                    >
                      <span className="flex items-baseline gap-4 md:gap-6">
                        <span
                          className={`font-display text-lg italic transition-colors duration-200 md:text-xl ${
                            isActive ? "text-white" : "text-white/30"
                          }`}
                        >
                          ({service.number})
                        </span>
                        <span
                          className={`font-mozaic text-2xl font-semibold uppercase tracking-tight transition-colors duration-200 md:text-3xl lg:text-[2.25rem] ${
                            isActive
                              ? "text-white"
                              : "text-white/30 group-hover:text-white/55"
                          }`}
                        >
                          {service.title}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`hidden items-center text-white transition-all duration-200 md:inline-flex ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-2 opacity-0"
                        }`}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </button>

                    {/* Mobile-only inline accordion panel */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`service-panel-${service.number}`}
                          key={`mobile-panel-${service.number}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden md:hidden"
                        >
                          <div className="pb-6">
                            <ServicePanelContent service={service} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <a
              href="#contacto"
              onClick={scrollToContact}
              className="mt-10 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-7 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:-translate-y-[1px] hover:bg-[#d9ff3f]"
            >
              Ver precios <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* RIGHT — desktop animated panel */}
          <div className="relative hidden min-h-[460px] md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServicePanelContent service={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicePanelContent({ service }: { service: Service }) {
  return (
    <div className="grid gap-6">
      <p className="text-base leading-[1.7] text-white/75 md:text-lg">
        {service.description}
      </p>

      <p className="text-sm leading-relaxed text-white/65 md:text-[0.95rem]">
        {service.bullets.join(" · ")}
      </p>

      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55">
        <Clock className="h-3.5 w-3.5" />
        <span>{service.duration}</span>
      </div>

      <div className="relative mt-2 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallbackApplied === "1") return;
            img.dataset.fallbackApplied = "1";
            img.src = service.fallback;
          }}
        />
      </div>
    </div>
  );
}
