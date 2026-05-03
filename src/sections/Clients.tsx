"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { splitWords, wordVariants } from "@/src/hooks/useTextReveal";

const TOTAL_LOGOS = 11;

const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (typeof document === "undefined") return;
  const target = document.getElementById("contacto");
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

function ClientLogoCard({ index }: { index: number }) {
  const num = String(index).padStart(2, "0");
  const [errored, setErrored] = useState(false);

  return (
    <div className="client-card group relative flex aspect-[3/2] items-center justify-center rounded-xl border border-white/[0.06] bg-[#1a1a1a] p-7 transition-colors duration-300 hover:border-white/15">
      {errored ? (
        <span
          aria-hidden
          className="flex h-8 w-[120px] items-center justify-center rounded-md bg-white/10 text-[10px] uppercase tracking-[0.18em] text-white/45"
        >
          Logo
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/clients/client-${num}.png`}
          alt="Cliente"
          loading="lazy"
          className="client-logo h-8 w-auto max-w-[120px] object-contain"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

export function ClientsSection() {
  return (
    <section
      id="clientes"
      className="scroll-mt-16 border-t border-white/5 bg-[#111111] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-end md:gap-12 lg:gap-16">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
            ✦ Quienes han confiado en nosotros
          </p>

          <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-right md:text-5xl lg:text-[3.5rem]">
            {splitWords("Juntos, construimos marcas que la gente recuerda.").map(
              (word, index) => (
                <span
                  key={`clients-head-${word}-${index}`}
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
              ),
            )}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
          {Array.from({ length: TOTAL_LOGOS }).map((_, idx) => (
            <ClientLogoCard key={idx} index={idx + 1} />
          ))}

          <a
            href="#contacto"
            onClick={scrollToContact}
            className="group flex aspect-[3/2] items-center justify-center gap-2 rounded-xl bg-white px-4 text-center text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-black transition hover:-translate-y-[1px] hover:bg-[#d9ff3f]"
          >
            <span>Trabaja con nosotros</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .client-logo {
          filter: brightness(0) invert(1) opacity(0.6);
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
        .client-card:hover .client-logo {
          filter: brightness(0) invert(1) opacity(0.9);
        }
      `}</style>
    </section>
  );
}
