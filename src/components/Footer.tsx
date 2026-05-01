"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

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
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/about" },
  { label: "Portfolio", href: "/work" },
  { label: "Contacto", href: "/#contacto" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/kioscolabel", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#2b2b2b] bg-[#191919] px-6 py-16 md:px-[5vw] md:py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <Container delay={0.1} className="h-auto">
            <Image
              src="/iconfooter.png"
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

        <Container delay={0.25} className="h-auto">
          <div className="mt-8 flex flex-col items-center justify-center gap-6 border-y border-[#2a2a2a] py-12 text-center md:mt-10 md:flex-row md:justify-end md:text-left">
            <div className="flex items-center gap-6">
              {socialLinks.map((item) => {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="text-[#9a9a9a] transition-all duration-200 hover:scale-110 hover:text-white"
                  >
                    <item.icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>

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
