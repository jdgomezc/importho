"use client";

import peclabLogo from "@/assets/peclab-logo.webp";
import { ArrowRight, FlaskConical, Sparkles } from "lucide-react";

interface Product {
  title: string;
  slug: string;
  img: string;
}

interface Props {
  products: Product[];
}

const floatSlots = [
  {
    className: "top-[6%] md:left-[21%] lg:left-[25%]",
    delay: "0s",
    duration: "5s",
    rotate: -6,
  },
  {
    className: "top-[10%] md:right-[21%] lg:right-[25%]",
    delay: "0.8s",
    duration: "6s",
    rotate: 5,
  },
  {
    className: "top-[42%] md:left-[17%] lg:left-[21%]",
    delay: "1.4s",
    duration: "5.5s",
    rotate: -4,
  },
  {
    className: "bottom-[14%] md:right-[19%] lg:right-[23%]",
    delay: "0.4s",
    duration: "6.5s",
    rotate: 7,
  },
  {
    className: "bottom-[20%] md:left-[19%] lg:left-[23%]",
    delay: "1.8s",
    duration: "5s",
    rotate: -5,
  },
  {
    className: "top-[38%] md:right-[17%] lg:right-[21%]",
    delay: "1.1s",
    duration: "7s",
    rotate: 3,
  },
];

export default function NewBrandPeclab({ products }: Props) {
  const floatingProducts = products.slice(0, floatSlots.length);

  return (
    <section className="relative w-full overflow-hidden py-8 md:py-20 mt-0 mb-4 md:my-8 bg-white md:pb-56 md:mb-24 pb-6">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #33b1bd14 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#33b1bd 1px, transparent 1px), linear-gradient(90deg, #33b1bd 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      {floatingProducts.map((product, i) => {
        const slot = floatSlots[i];
        return (
          <a
            key={product.slug}
            href={`/${product.slug}`}
            className={`new-brand-float absolute z-10 hidden md:block ${slot.className}`}
            style={{
              animationDelay: slot.delay,
              animationDuration: slot.duration,
              ["--float-rotate" as string]: `${slot.rotate}deg`,
            }}
            title={product.title}
          >
            <div className="group relative rounded-2xl bg-white p-2 md:p-2.5 border border-zinc-200/80 shadow-md shadow-zinc-200/60 transition-transform duration-300 hover:scale-110 hover:border-[#33b1bd]/40 hover:shadow-lg hover:shadow-[#33b1bd]/15">
              <img
                src={product.img}
                alt={product.title}
                className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-xl"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity text-[10px] md:text-xs text-[#2a9aa5] whitespace-nowrap font-medium">
                {product.title}
              </span>
            </div>
          </a>
        );
      })}

      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center gap-4 md:gap-6 px-4 md:px-6 text-center">
        <div className="relative flex items-center justify-center py-1 md:py-2">
          <Sparkles
            className="new-brand-sparkle-bg pointer-events-none absolute -left-4 -top-1 size-8 md:-left-6 md:-top-2 md:size-10 text-[#33b1bd]"
            aria-hidden
          />
          <Sparkles
            className="new-brand-sparkle-bg pointer-events-none absolute -right-3 top-2 size-5 md:-right-5 md:top-3 md:size-7 text-[#33b1bd]"
            style={{ animationDelay: "2s" }}
            aria-hidden
          />
          <Sparkles
            className="new-brand-sparkle-bg pointer-events-none absolute left-1/2 -top-4 size-10 md:-top-6 md:size-14 -translate-x-1/2 text-[#33b1bd]"
            style={{ animationDelay: "1s" }}
            aria-hidden
          />
          <span className="relative z-10 inline-flex rounded-full border border-[#33b1bd]/30 bg-white/80 px-3.5 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-semibold text-[#2a9aa5] backdrop-blur-sm">
            Nueva marca
          </span>
        </div>

        <div className="relative px-2 py-3 md:px-12 md:py-8">
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem]"
            style={{
              background:
                "radial-gradient(ellipse 85% 75% at 50% 50%, rgba(51, 177, 189, 0.14) 0%, rgba(51, 177, 189, 0.06) 40%, transparent 72%)",
            }}
            aria-hidden
          />
          <img
            src={peclabLogo.src}
            alt="Peclab"
            width={peclabLogo.width}
            height={peclabLogo.height}
            className="relative w-36 sm:w-44 md:w-64 h-auto mx-auto"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="flex flex-col items-center gap-1.5 md:flex-row md:gap-2 text-[#2a9aa5] px-2">
          <FlaskConical className="new-brand-flask size-4 md:size-5 text-[#33b1bd] shrink-0" />
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 max-w-xs md:max-w-md leading-relaxed">
            Anclaje esquelético, expansores palatinos y mini implantes de
            precisión
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[240px] sm:max-w-[280px] md:hidden px-1">
          {floatingProducts.slice(0, 4).map((product) => (
            <a
              key={product.slug}
              href={`/${product.slug}`}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-2.5 border border-zinc-200/80 shadow-sm active:scale-95 transition-transform"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] object-contain"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="text-[10px] leading-tight text-[#2a9aa5] font-medium line-clamp-2 text-center">
                {product.title}
              </span>
            </a>
          ))}
        </div>

        <a
          href="/peclab"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#33b1bd] px-5 py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-[#2a9aa5] hover:gap-3 hover:shadow-lg hover:shadow-[#33b1bd]/25 w-full max-w-[280px] sm:w-auto sm:max-w-none"
        >
          Explorar catálogo Peclab
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
