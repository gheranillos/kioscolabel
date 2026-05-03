"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contacto" },
];

export default function GlobalIdentityBar() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-40 border-b border-neutral-200 bg-neutral-50/95 px-6 backdrop-blur-sm md:px-10">
      <div className="pointer-events-auto mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between">
        <nav className="flex items-center gap-8 md:gap-11">
          {links.map((link) => {
            const active =
              link.href === "/#contacto"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-semibold tracking-wide text-neutral-900 transition-colors hover:text-neutral-600 ${
                  active ? "text-neutral-950" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/" className="shrink-0" aria-label="Kiosco Label — Inicio">
          <Image
            src="/kscolabel logo negro.webp"
            alt=""
            width={35}
            height={40}
            className="h-9 w-8 object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
