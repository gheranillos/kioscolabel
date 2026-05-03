"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
  simple?: boolean;
}

const Container = ({ children, className, delay = 0.2, reverse, simple }: Props) => {
  return (
    <motion.div
      className={cn("w-full h-full", className)}
      initial={{ opacity: 0, y: reverse ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: delay,
        duration: simple ? 0.2 : 0.4,
        type: simple ? "keyframes" : "spring",
        stiffness: simple ? 100 : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contacto" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#2b2b2b] bg-[#191919] px-6 py-16 md:px-[5vw] md:py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <Container delay={0.1} className="h-auto">
            <Image
              src="/Isotipoblanco2.webp"
              alt="Kiosco Label"
              width={35}
              height={40}
              className="h-[40px] w-[35px] object-contain"
              priority={false}
            />
          </Container>

          <Container delay={0.2} className="h-auto">
            <nav className="flex flex-wrap gap-x-4 gap-y-3 md:justify-end md:gap-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[0.85rem] text-[#9a9a9a] transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>

        <Container delay={0.35} className="h-auto">
          <div className="mt-8 flex flex-col items-center justify-between gap-2 text-center md:flex-row md:gap-4 md:text-left">
            <p className="text-[0.8rem] text-[#aaaaaa]">
              © {new Date().getFullYear()} Kiosco Label. Todos los derechos reservados.
            </p>
            <p className="text-[0.8rem] text-[#aaaaaa]">
              Diseñado y desarrollado por Kiosco Label
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
