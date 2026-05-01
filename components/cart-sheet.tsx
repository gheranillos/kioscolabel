"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart, type CartLine } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function waCheckoutUrl(lines: Pick<CartLine, "name" | "qty" | "price">[]) {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const text = lines
    .map((l) => `• ${l.name} x${l.qty} — ${l.price * l.qty}€`)
    .join("\n");
  const body = encodeURIComponent(
    `Hola Gherard, quiero cerrar pedido desde la web:\n\n${text}\n\nTotal aprox: ${total}€`,
  );
  return `https://wa.me/584147613621?text=${body}`;
}

export function CartSheet() {
  const { lines, open, setOpen, setQty, removeLine, subtotal } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Carrito</SheetTitle>
          <SheetDescription>
            Revisa tu pedido y finaliza por WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4">
          {lines.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              Tu carrito está vacío. Visita la tienda y añade productos.
            </p>
          ) : (
            lines.map((line) => (
              <div
                key={line.id}
                className="flex gap-3 rounded-lg border border-border p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={line.image}
                  alt=""
                  className="size-16 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{line.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {line.price}€ / u.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      className="size-8"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      aria-label="Menos"
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-6 text-center text-sm tabular-nums">
                      {line.qty}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      className="size-8"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      aria-label="Más"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="ml-auto size-8 text-destructive"
                      onClick={() => removeLine(line.id)}
                      aria-label="Quitar"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <SheetFooter className="gap-2 border-t pt-4">
            <div className="flex w-full justify-between text-sm font-semibold">
              <span>Subtotal</span>
              <span className="tabular-nums">{subtotal.toFixed(2)}€</span>
            </div>
            <Button className="w-full" asChild>
              <Link
                href={waCheckoutUrl(lines)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Finalizar por WhatsApp
              </Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
