"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "Inicio", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Tienda", href: "/shop" },
  { label: "Contacto", href: "/#contacto" },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const onResize = () => {
      setCanHover(window.matchMedia("(hover: hover)").matches);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        className="pointer-events-auto flex h-12 items-center overflow-hidden border border-white/20 bg-white/12 px-3 backdrop-blur-md"
        initial={{ width: 48, borderRadius: 50 }}
        animate={{
          width: menuOpen ? (canHover ? 420 : "90vw") : 48,
          borderRadius: menuOpen ? 999 : 50,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setMenuOpen((v) => !v)}
        onMouseEnter={() => {
          if (canHover) setMenuOpen(true);
        }}
        onMouseLeave={() => {
          if (canHover) setMenuOpen(false);
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: menuOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Menu size={18} className="text-white" />
        </motion.div>

        <motion.div
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.2, delay: menuOpen ? 0.12 : 0 }}
        >
          {links.map((link, index) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href === "/#contacto"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

            return (
              <div key={link.label} className="flex items-center gap-2">
                <Link
                  href={link.href}
                  className={`text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
                    isActive ? "text-[#f7b7ff]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
                {index < links.length - 1 && <span className="h-3 w-px bg-white/20" />}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
