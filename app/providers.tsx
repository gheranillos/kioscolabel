"use client";

import type { ReactNode } from "react";

import { CartProvider } from "@/lib/cart-context";
import { CartSheet } from "@/components/cart-sheet";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSheet />
    </CartProvider>
  );
}
