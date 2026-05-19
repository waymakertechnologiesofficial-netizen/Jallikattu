import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Gallery } from "@/components/Gallery";
import logo1 from "@/assets/logo1.jpg";
import heroYellow from "@/assets/bottle-yellow.jpeg";
import heroBlue from "@/assets/bottle-blue.jpeg";
import heroStrawberry from "@/assets/bottle-strawberry.jpeg";
import heroMango from "@/assets/bottle-mango.jpeg";
import heroTrio from "@/assets/bottle-trio.jpeg";
import heroBlueberry from "@/assets/bottle-blueberry.jpeg";
import herobg from "@/assets/allinone.png";
import classic from "@/assets/classic.png";
import orange from "@/assets/orange.png";
import roseberry from "@/assets/roseberry.png";
import {
  Leaf,
  BottleWine,
  Home,
  Flame,
  Droplets,
  Handshake,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function Bubbles({ count = 18 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const size = 8 + Math.random() * 30;
        const left = Math.random() * 100;
        const dur = 6 + Math.random() * 10;
        const delay = Math.random() * 8;
        return (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── smooth scroll helper ────────────────────────────────────────────────────
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── NAV — clean white bar ────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const y = useScrollY();

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-300"
      style={{ boxShadow: y > 10 ? "0 2px 16px rgba(0,0,0,0.10)" : "0 1px 0 rgba(0,0,0,0.07)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[72px]">

        {/* Logo — white bg looks natural on white bar */}
        <img
          src={logo1}
          alt="Jallikattu Soda — Since 1946"
          className="h-12 md:h-14 w-auto object-contain"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link
            to="/"
            className="relative text-primary/70 hover:text-primary transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-saffron after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="relative text-primary/70 hover:text-primary transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-saffron after:transition-all after:duration-300 hover:after:w-full"
          >
            Products
          </Link>
          {[
            { label: "Heritage", id: "story" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleAnchor(e, id)}
              className="relative text-primary/70 hover:text-primary transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-saffron after:transition-all after:duration-300 hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#flavors"
          onClick={(e) => handleAnchor(e, "flavors")}
          className="hidden md:flex items-center gap-2 rounded-full bg-saffron text-primary px-5 py-2 text-sm font-bold hover:brightness-110 hover:scale-105 transition-all shadow-md"
        >
          Taste Now ★
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-xl hover:bg-primary/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-primary transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-primary transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-primary transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${open ? "max-h-72 pb-5" : "max-h-0"}`}>
        <nav className="flex flex-col items-center gap-4 pt-3 text-sm font-semibold border-t border-primary/10">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-primary/70 hover:text-primary transition-colors py-1"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="text-primary/70 hover:text-primary transition-colors py-1"
          >
            Products
          </Link>
          {[
            { label: "Heritage", id: "story" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleAnchor(e, id)}
              className="text-primary/70 hover:text-primary transition-colors py-1"
            >
              {label}
            </a>
          ))}
          <a
            href="#flavors"
            onClick={(e) => handleAnchor(e, "flavors")}
            className="mt-1 flex items-center gap-2 rounded-full bg-saffron text-primary px-6 py-2 text-sm font-bold shadow-md"
          >
            Taste Now ★
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const y = useScrollY();
  const tiles = [
    { src: heroMango, label: "ORANGE FIZZ" },
    { src: heroBlue, label: "BLUE STORM" },
    { src: heroYellow, label: "PINEAPPLE" },
    { src: heroStrawberry, label: "STRAWBERRY" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % tiles.length), 3200);
    return () => clearInterval(id);
  }, [tiles.length]);

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-20 text-cream"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Smoke layers from product photography */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(0px) saturate(0)",
          transform: `translateY(${y * 0.25}px) scale(1.1)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url(${heroTrio})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) saturate(0)",
          transform: `translateY(${y * -0.15}px) scale(1.2)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.1 0.01 250 / 0.3) 0%, transparent 40%, oklch(0.06 0.005 250 / 0.95) 100%)",
        }}
      />

      {/* Gold glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.16 75 / 0.35), transparent 70%)",
          transform: `translate(-50%, ${y * 0.2}px)`,
        }}
      />

      <Bubbles count={18} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-12 gap-10 items-center min-h-[calc(100vh-5rem)]">
        {/* Left — headline */}
        <div
          className="lg:col-span-6"
          style={{ transform: `translateY(${y * -0.1}px)` }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-saffron/50 bg-black/40 backdrop-blur px-4 py-1.5 text-[11px] font-bold text-saffron tracking-[0.3em] mb-6">
            ★ EST · 1946 · TAMIL NADU ★
          </div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.85] drop-shadow-2xl">
            BREWED IN
            <br />
            <span className="text-saffron">SMOKE.</span>
            <br />
            BOTTLED IN
            <br />
            <span
              className="italic"
              style={{ textShadow: "0 0 40px oklch(0.82 0.16 75 / 0.6)" }}
            >
              BOLDNESS.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base md:text-lg text-cream/80 leading-relaxed">
            Jallikattu Goli Soda — eight decades of pop, fizz and fierce Tamil
            soul, frozen in time and dry-ice mist.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#flavors"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("flavors");
              }}
              className="rounded-full bg-saffron text-primary px-7 py-3 font-bold shadow-[0_10px_40px_-10px_oklch(0.82_0.16_75/0.7)] hover:scale-105 transition-transform"
            >
              Pop a Flavor →
            </a>
            <a
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("story");
              }}
              className="rounded-full border-2 border-cream/40 text-cream px-7 py-3 font-bold hover:bg-cream/10 backdrop-blur transition-colors"
            >
              The Story
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-cream/80">
            <div>
              <div className="font-display text-3xl text-saffron">80+</div>
              <div className="text-[10px] tracking-[0.3em]">YEARS</div>
            </div>
            <div className="h-10 w-px bg-cream/20" />
            <div>
              <div className="font-display text-3xl text-saffron">06</div>
              <div className="text-[10px] tracking-[0.3em]">FLAVORS</div>
            </div>
            <div className="h-10 w-px bg-cream/20" />
            <div>
              <div className="font-display text-3xl text-saffron">1M+</div>
              <div className="text-[10px] tracking-[0.3em]">FANS</div>
            </div>
          </div>
        </div>

        {/* Right — rotating photo stage */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] max-w-[520px] mx-auto">
            <div
              className="absolute inset-0 rounded-[2rem] overflow-hidden border border-saffron/40 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
              style={{ transform: `translateY(${y * 0.05}px)` }}
            >
              {tiles.map((t, i) => (
                <img
                  key={t.label}
                  src={t.src}
                  alt={t.label}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-1000"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.08)",
                  }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, oklch(0.06 0.005 250 / 0.85) 100%)",
                }}
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-saffron animate-ping" />
                <span className="text-[10px] tracking-[0.4em] text-cream/90">
                  LIVE POUR
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.4em] text-saffron">
                    NOW POPPING
                  </div>
                  <div className="font-display text-3xl mt-1">
                    {tiles[active].label}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {tiles.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Show ${tiles[i].label}`}
                      className={`h-1.5 rounded-full transition-all ${
                        active === i ? "w-8 bg-saffron" : "w-3 bg-cream/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating mini tiles */}
            <div
              className="hidden md:block absolute -left-10 top-10 w-36 h-44 rounded-2xl overflow-hidden border border-cream/20 shadow-2xl animate-float-slow"
              style={{ transform: `translateY(${y * 0.15}px) rotate(-8deg)` }}
            >
              <img src={heroMango} alt="" className="h-full w-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur px-2 py-1 text-[9px] tracking-[0.3em] text-saffron">
                ORANGE FIZZ
              </div>
            </div>
            <div
              className="hidden md:block absolute -right-8 -bottom-6 w-32 h-40 rounded-2xl overflow-hidden border border-cream/20 shadow-2xl animate-float-mid"
              style={{ transform: `translateY(${y * -0.1}px) rotate(7deg)` }}
            >
              <img
                src={heroBlueberry}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur px-2 py-1 text-[9px] tracking-[0.3em] text-saffron">
                BLUEBERRY
              </div>
            </div>

            <div className="absolute -inset-2 rounded-[2.2rem] border border-saffron/30 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/70 text-[10px] tracking-[0.5em] animate-float-mid">
        FLAVORS ↓
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "FIZZ ON",
    "SINCE 1946",
    "TASTE OF TAMIL NADU",
    "POP THE TRADITION",
    "BOLD & BUBBLY",
    "JALLIKATTU SODA",
  ];
  return (
    <div className="bg-primary text-cream py-5 overflow-hidden border-y-4 border-saffron">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-display text-3xl mx-8 flex items-center gap-8"
          >
            {t} <span className="text-saffron">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const FLAVORS = [
  {
    name: "Classic Soda",
    tag: "Crystal Crisp",
    color: "oklch(0.92 0.05 220)",
    text: "oklch(0.3 0.1 230)",
    img: classic,
    accent: "Original since '46",
  },
  {
    name: "StrawBerry",
    tag: "Sweet & Floral",
    color: "oklch(0.78 0.18 18)",
    text: "oklch(0.99 0 0)",
    img: roseberry,
    accent: "Bestseller",
  },
  {
    name: "Orange Fizz",
    tag: "Sun-ripe Burst",
    color: "oklch(0.82 0.17 75)",
    text: "oklch(0.25 0.1 40)",
    img: orange,
    accent: "Summer fave",
  },
];

function Flavors() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      const r = ref.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));

      setProgress(p);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="flavors"
      ref={ref}
      className="relative py-28 bg-cream overflow-hidden"
    >
      <div
        className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-saffron/30 blur-3xl"
        style={{ transform: `translateY(${progress * -80}px)` }}
      />

      <div
        className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-leaf/30 blur-3xl"
        style={{ transform: `translateY(${progress * 60}px)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-secondary font-bold mb-3">
            ★ OUR LINEUP ★
          </div>

          <h2 className="font-display text-5xl md:text-7xl text-primary">
            SIX FLAVORS, ONE LEGEND
          </h2>

          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From the original 1946 fizz to bold modern remixes — pick your pop.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLAVORS.map((f, i) => {
            return (
              <Link
                key={f.name}
                to="/products"
                className="block"
              >
                <article
                  className="group relative rounded-3xl overflow-hidden p-8 h-96 flex flex-col justify-between shadow-xl hover:scale-[1.03] transition-transform duration-500 cursor-pointer"
                  style={{
                    backgroundColor: f.color,
                    color: f.text,
                    transform: `translateY(${
                      (1 - progress) * (i % 2 === 0 ? 60 : 30)
                    }px)`,
                    transition:
                      "transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.1)",
                  }}
                >
                  <div className="absolute inset-0 opacity-30">
                    <Bubbles count={8} />
                  </div>

                  <div className="relative">
                    <div className="text-[10px] tracking-[0.3em] opacity-80">
                      {f.accent.toUpperCase()}
                    </div>

                    <h3 className="font-display text-4xl mt-2">
                      {f.name}
                    </h3>

                    <p className="opacity-80 mt-1 text-sm">
                      {f.tag}
                    </p>
                  </div>

                  <img
                    src={f.img}
                    alt={f.name}
                    className="absolute -right-6 -bottom-6 h-72 object-contain group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
                  />

                  <div className="relative font-bold text-sm flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-current animate-ping" />
                    Explore Flavor →
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const y = useScrollY();

  return (
    <section id="story" className="relative overflow-hidden py-28 bg-[#f5efe4]">
      {/* subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_0.6px,transparent_0.6px)] [background-size:10px_10px]" />

      <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT IMAGE CARD */}
        <div
          className="relative"
          style={{ transform: `translateY(${(y - 1200) * -0.04}px)` }}
        >
          {/* top badge */}
          <div className="absolute -top-5 right-10 z-20 bg-[#c98312] text-[#2c1208] px-6 py-2 rounded-full text-sm tracking-[0.2em] font-semibold shadow-lg">
            EST. 1946
          </div>

          {/* image container */}
          <div className="relative overflow-hidden rounded-[18px] shadow-2xl">
            <img
              src={heroTrio}
              alt="Jallikattu Soda"
              className="w-full h-[760px] object-cover scale-[1.03]"
              style={{ filter: "brightness(0.88) contrast(1.05) saturate(1.05)" }}
            />

            {/* smoke blur */}
            <div className="absolute inset-0 backdrop-blur-[1.5px]" />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/20" />

            {/* bottom text */}
            <div className="absolute bottom-10 left-8 right-8">
              <div className="text-[#d78b19] text-sm tracking-[0.18em] font-semibold mb-3">
                எங்கள் கதை
              </div>
              <h3 className="text-white font-serif italic text-4xl leading-tight drop-shadow-xl">
                From a Madras alley to every Tamil household.
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-[#2a140d]">
          <div className="text-xs tracking-[0.45em] text-[#c98312] uppercase font-semibold mb-6">
            About Us
          </div>

          <h2 className="font-serif text-[4.2rem] leading-[0.95] tracking-[-0.04em] text-[#1f0d08]">
            A LEGACY BOTTLED
            <br />
            <span className="bg-gradient-to-r from-[#ff5a1f] to-[#ffb21d] bg-clip-text text-transparent">
              IN GLASS.
            </span>
          </h2>

          {/* divider */}
          <div className="w-28 h-[2px] bg-[#d8b27d] mt-10 mb-10" />

          <div className="space-y-10 text-[1.18rem] leading-[2] text-[#625147]">
            <p>
              Jallikattu is a brand of{" "}
              <span className="text-[#e34d1f] font-semibold">Guhan Soda</span>,
              established in Madras in 1946 — crafted with the same bold spirit
              and traditional recipe that made it a household name across
              generations.
            </p>

            <p>
              Through decades of change, our family preserved the original fizz,
              flavor, and glass-bottle experience that defined authentic Tamil
              soda culture.
            </p>

            <p>
              Inspired by the pride and energy of Tamil Nadu,
              <span className="text-[#e34d1f] font-semibold">
                {" "}
                Jallikattu Soda
              </span>{" "}
              continues to celebrate heritage, nostalgia, and the joy of real
              handcrafted refreshment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Crafted() {
  const y = useScrollY();
  const steps = [
    { n: "01", t: "Pure Source", d: "Mineral-rich water, triple-filtered." },
    { n: "02", t: "Slow Brew", d: "Hand-blended syrups, real fruit & spice." },
    { n: "03", t: "Big Fizz", d: "Carbonated to that perfect Jallikattu kick." },
    { n: "04", t: "Bottled Bold", d: "Sealed for that signature satisfying pop." },
  ];
  return (
    <section id="crafted" className="relative py-28 bg-background overflow-hidden">
      <div
        className="absolute top-1/2 -left-40 h-[600px] w-[600px] rounded-full bg-leaf/20 blur-3xl"
        style={{
          transform: `translate(${y * 0.05}px, ${(y - 2500) * 0.1}px)`,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-secondary font-bold mb-3">
            ★ THE CRAFT ★
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-primary">
            FIZZ, FOUR WAYS PERFECT
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="rounded-3xl bg-card border-2 border-border p-8 hover:border-secondary hover:-translate-y-2 transition-all shadow-md"
              style={{
                transform: `translateY(${Math.max(0, (3000 - y) * 0.05 - i * 10)}px)`,
              }}
            >
              <div className="font-display text-6xl text-saffron">{s.n}</div>
              <h3 className="font-display text-2xl text-primary mt-3">{s.t}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Bubbles count={20} />
      <div className="relative max-w-4xl mx-auto px-6 text-center text-cream">
        <h2 className="font-display text-5xl md:text-7xl drop-shadow-lg">
          POP THE BOTTLE.
          <br />
          JOIN THE LEGACY.
        </h2>
        <p className="mt-6 text-cream/90 max-w-xl mx-auto text-lg">
          Find Jallikattu Soda at a store near you, or partner with us to stock
          the legend.
        </p>
        <form className="mt-10 max-w-md mx-auto flex gap-2 bg-cream/10 backdrop-blur p-2 rounded-full border border-cream/30">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-transparent px-4 py-3 text-cream placeholder:text-cream/60 outline-none"
          />
          <button
            type="button"
            className="rounded-full bg-cream text-primary px-6 py-3 font-bold hover:scale-105 transition-transform"
          >
            Notify Me
          </button>
        </form>
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
          <div>
            <div className="font-display text-2xl text-saffron">CALL</div>
            <div>+91 74484 22201</div>
          </div>
          <div>
            <div className="font-display text-2xl text-saffron">EMAIL</div>
            <div>guhanfoods@gmail.com</div>
          </div>
          <div>
            <div className="font-display text-2xl text-saffron">VISIT</div>
            <div>Madurai, Tamil Nadu</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      icon: <Leaf className="h-10 w-10 text-saffron" />,
      title: "All-Natural Ingredients",
      desc: "No artificial colors, no preservatives — just real fruit syrups, spring water, and traditional spice blends passed down through generations.",
    },
    {
      icon: <BottleWine className="h-10 w-10 text-saffron" />,
      title: "Glass-Bottled Tradition",
      desc: "Every bottle is sealed with the iconic goli marble stopper, just as it was in 1946. That satisfying pop? You can't fake it.",
    },
    {
      icon: <Home className="h-10 w-10 text-saffron" />,
      title: "Family-Crafted Since 1946",
      desc: "Three generations of the same family, the same recipe, the same commitment. Mass production never touched our fizz.",
    },
    {
      icon: <Flame className="h-10 w-10 text-saffron" />,
      title: "Bold Tamil Flavors",
      desc: "Our profiles aren't borrowed from global trends — they're rooted in the streets of Madurai, Madras, and every summer memory in between.",
    },
    {
      icon: <Droplets className="h-10 w-10 text-saffron" />,
      title: "Triple-Filtered Water",
      desc: "Sourced from mineral-rich springs and triple-filtered in-house. Because the base of every great soda is what you don't taste.",
    },
    {
      icon: <Handshake className="h-10 w-10 text-saffron" />,
      title: "Community First",
      desc: "We partner with local vendors, farmers, and distributors. When you sip Jallikattu, you support Tamil Nadu's economic fabric.",
    },
  ];

  return (
    <section className="relative py-28 bg-primary overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full border border-saffron/20 pointer-events-none" />
      <div className="absolute -top-12 -right-12 h-72 w-72 rounded-full border border-saffron/10 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full border border-saffron/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-saffron font-bold mb-3">
            ★ WHY US ★
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-cream">
            NOT JUST SODA.
            <br />
            <span className="text-saffron italic">A STATEMENT.</span>
          </h2>
          <p className="mt-4 text-cream/60 max-w-xl mx-auto">
            Six reasons why Jallikattu isn't something you choose once — it's
            something you come back to.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group rounded-3xl border border-cream/10 bg-cream/5 backdrop-blur p-8 hover:bg-cream/10 hover:border-saffron/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-5">{r.icon}</div>
              <h3 className="font-display text-2xl text-cream mb-3 group-hover:text-saffron transition-colors">
                {r.title}
              </h3>
              <p className="text-cream/60 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Where can I buy Jallikattu Soda?",
    a: "We're available across Tamil Nadu through local kirana stores, select supermarkets, and our growing network of distributors. Use the contact form to find a vendor near you.",
  },
  {
    q: "Are your sodas made with real fruit?",
    a: "Absolutely. Every flavor uses hand-blended real fruit syrups and traditional spice mixes. We never use artificial flavoring agents or synthetic colors.",
  },
  {
    q: "What makes the goli bottle special?",
    a: "The goli (marble) stopper creates a natural carbonation seal that keeps fizz locked in until the moment you pop it open — giving you that iconic burst of bubbles every time.",
  },
  {
    q: "Do you ship outside Tamil Nadu?",
    a: "We're actively expanding! Currently available across South India with pan-India shipping launching soon. Drop us your email in the Notify Me section to be first in line.",
  },
  {
    q: "Is Jallikattu Soda suitable for kids?",
    a: "Yes — all our sodas are made without alcohol, no artificial preservatives, and use natural colorings only. Great for the whole family.",
  },
  {
    q: "Can I become a distributor or retail partner?",
    a: "We'd love that. Reach out via our contact form or email hello@jallikattusoda.in with your location details and we'll get back within 48 hours.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-28 bg-[#f5efe4] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_0.6px,transparent_0.6px)] [background-size:10px_10px]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-secondary font-bold mb-3">
            ★ GOT QUESTIONS ★
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-primary">
            THINGS PEOPLE
            <br />
            ALWAYS ASK.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Everything you want to know before you pop your first bottle.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-border bg-cream overflow-hidden transition-all"
              style={{
                borderColor:
                  open === i ? "var(--color-saffron)" : undefined,
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-display text-xl text-primary">
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-cream font-bold text-lg transition-all"
                  style={{
                    background:
                      open === i
                        ? "var(--color-saffron)"
                        : "var(--color-primary)",
                  }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "200px" : "0px" }}
              >
                <p className="px-7 pb-6 text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">Still curious?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            className="inline-block mt-3 rounded-full bg-primary text-cream px-8 py-3 font-bold hover:bg-berry transition-colors shadow-md"
          >
            Ask Us Directly →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-cream border-t-4 border-saffron">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10 items-start">

        {/* Brand */}
        <div>
          <div className="bg-white inline-block rounded-xl px-3 py-2 mb-4">
            <img
              src={logo1}
              alt="Jallikattu Soda"
              className="h-20 w-auto object-contain"
              style={{ minWidth: "200px" }}
            />
          </div>
          <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
            Eight decades of authentic Tamil fizz — still crafted the old way, still tastes like the first time.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="text-[10px] tracking-[0.35em] text-saffron font-semibold mb-4">EXPLORE</div>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Flavors", id: "flavors" },
              { label: "Our Heritage", id: "story" },
              { label: "How It's Made", id: "crafted" },
              { label: "Contact Us", id: "contact" },
            ].map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollToId(id); }}
                  className="text-cream/60 hover:text-saffron transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-[10px] tracking-[0.35em] text-saffron font-semibold mb-4">GET IN TOUCH</div>
          <ul className="space-y-3 text-sm text-cream/60">
            <li>+91 74484 22201</li>
            <li>guhanfoods@gmail.com</li>
            <li>Madurai, Tamil Nadu</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] tracking-widest text-cream/40">
          <span>© 1946 — {new Date().getFullYear()} · JALLIKATTU SODA</span>
          <span>BOTTLED IN TAMIL NADU WITH PRIDE</span>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Story />
      <Flavors />
      <WhyChooseUs />
      <Crafted />
      <Gallery />
      <FAQ />
      <CTA />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}