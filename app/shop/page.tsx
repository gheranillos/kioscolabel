import Link from "next/link";

const products = [
  {
    id: "shop-001",
    name: "Sudadera Studio",
    description: "Sudadera unisex de algodón pesado con estampado frontal.",
    price: "$49",
    category: "Ropa",
    colorClass: "from-[#8b5cf6] to-[#312e81]",
  },
  {
    id: "shop-002",
    name: "Tote Gherard",
    description: "Bolsa de lona premium para uso diario, resistente y ligera.",
    price: "$28",
    category: "Accesorios",
    colorClass: "from-[#14b8a6] to-[#0f766e]",
  },
  {
    id: "shop-003",
    name: "Print Edición Limitada",
    description: "Lámina artística numerada, impresión giclée en papel fine art.",
    price: "$65",
    category: "Arte",
    colorClass: "from-[#f97316] to-[#9a3412]",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-neutral-900">
      <main>
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-14 pt-16 md:px-10 md:pt-20">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-black/70">
            SHOP PROXIMAMENTE
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-full border border-black/15 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-black/75 transition hover:bg-black hover:text-white"
          >
            Volver al inicio
          </Link>

          <div className="mt-8 grid gap-10 rounded-[2rem] bg-[#0f0f10] px-6 py-10 text-white md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-12">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/65">
                Nueva colección
              </p>
              <h1 className="mt-4 text-[clamp(2.4rem,7vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em]">
                Shop
              </h1>
              <p className="mt-5 max-w-[620px] text-[1rem] leading-[1.75] text-white/75">
                Productos seleccionados para elevar tu estilo visual: piezas con
                identidad, edición limitada y estética contemporánea.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#productos"
                  className="rounded-full bg-[#d9ff3f] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0a0a0a] transition hover:opacity-80"
                >
                  Ver productos
                </Link>
                <Link
                  href="/#contacto"
                  className="rounded-full border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
                >
                  Consultar pedido
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/60">
                Destacado
              </p>
              <p className="mt-3 text-2xl font-black uppercase text-[#d9ff3f]">
                Envío gratis
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                En compras desde $80. Entregas nacionales en 48-72 horas hábiles.
              </p>
              <div className="mt-7 border-t border-white/20 pt-5">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/60">
                  Métodos de pago
                </p>
                <p className="mt-2 text-sm text-white/85">
                  Tarjeta, transferencia y efectivo contra entrega.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="productos" className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Productos
            </h2>
            <p className="text-sm text-black/60">Mostrando 3 productos</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
              >
                <div className={`h-48 w-full bg-gradient-to-br ${product.colorClass}`} />
                <div className="p-6">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-black/45">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-black">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/65">
                    {product.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-black text-black">{product.price}</span>
                    <button
                      type="button"
                      className="rounded-full bg-black px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#d9ff3f] hover:text-black"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
