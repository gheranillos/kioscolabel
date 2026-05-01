"use client";

import { EditorialWorkGrid } from "@/src/components/EditorialWorkGrid";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#efefee] pt-16 text-neutral-900 selection:bg-[#f7b7ff] selection:text-black">
      <main className="px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Selección reciente</p>
          <h1 className="mt-3 text-balance text-3xl font-bold uppercase tracking-tight text-neutral-950 md:text-4xl">
            Diseño con criterio, pieza a pieza
          </h1>
        </div>
        <EditorialWorkGrid heading="WORKS" />
      </main>
    </div>
  );
}
