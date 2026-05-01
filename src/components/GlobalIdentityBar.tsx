"use client";

import Image from "next/image";
import Link from "next/link";

export default function GlobalIdentityBar() {
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-8 z-40 px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50">Venezuela</p>
        <Image
          src="/iconfooter.png"
          alt="Gherard"
          width={35}
          height={40}
          className="h-[40px] w-[35px] object-contain"
          priority={false}
        />
        <Link
          href="https://instagram.com/gheranillos"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto text-[0.65rem] tracking-[0.02em] text-white/50 transition-colors hover:text-white"
        >
          @gheranillos
        </Link>
      </div>
    </div>
  );
}
