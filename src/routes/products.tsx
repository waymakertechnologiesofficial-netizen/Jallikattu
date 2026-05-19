import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import bottleClassic from "@/assets/bottle-classic.jpeg";
import bottleStrawberry from "@/assets/bottle-strawberry.jpeg";
import bottleMango from "@/assets/bottle-mango.jpeg";
import nanari from "@/assets/nanari.png";
import badam from "@/assets/badam.png";
import rosemilk from "@/assets/rosemilk.png";
import logo from "@/assets/logo.jpg";
import logo1 from "@/assets/logo1.jpg";
import roseberry from "@/assets/roseberry.png";
import orange from "@/assets/orange.png";
import classic from "@/assets/classic.png";
import lemon from "@/assets/lemon.png";
import blueberry from "@/assets/bluberry.png";
import lychee from "@/assets/lychee.png";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Jallikattu Soda" },
      { name: "description", content: "Explore the full Jallikattu Soda lineup: six bold flavors crafted in Tamil Nadu since 1946." },
      { property: "og:title", content: "Products — Jallikattu Soda" },
      { property: "og:description", content: "Six bold flavors. One legendary fizz. Since 1946." },
    ],
  }),
  component: ProductsPage,
});

const PRODUCTS = [
  { name: "Classic Soda", tag: "Crystal Crisp", note: "Original since 1946", desc: "The fizz that started it all — clean, sharp, unapologetic.", size: "300 ml", img: classic, color: "oklch(0.92 0.05 220)", text: "oklch(0.3 0.1 230)" },
  { name: "StrawBerry", tag: "Sweet & Floral", note: "Bestseller", desc: "Rose petals meet wild berry — a romance in every sip.", size: "300 ml", img: roseberry, color: "oklch(0.78 0.18 18)", text: "oklch(0.99 0 0)" },
  { name: "Orange Fizz", tag: "Citrus Spark", note: "Crowd favorite", desc: "Juicy orange burst with that signature Jallikattu pop.", size: "300 ml", img: orange, color: "oklch(0.82 0.17 75)", text: "oklch(0.25 0.1 40)" },
  { name: "Pineapple", tag: "Zesty Punch", note: "Bold zing", desc: "Hand-squeezed lemon, a pinch of salt, all the thunder.", size: "300 ml", img: lemon, color: "oklch(0.88 0.16 110)", text: "oklch(0.25 0.1 100)" },
  { name: "Blueberry", tag: "Tangy Twist", note: "Street legend", desc: "That nostalgic gola flavor — now in a bold bottle.", size: "300 ml", img: blueberry, color: "oklch(0.32 0.08 320)", text: "oklch(0.95 0.05 90)" },
  { name: "Nanari", tag: "Herbal Cool", note: "Tamil classic", desc: "Ancient sarsaparilla roots, chilled and bottled — a remedy that tastes like a reward.", size: "300 ml", img: nanari, color: "oklch(0.75 0.12 145)", text: "oklch(0.2 0.08 145)" },
  { name: "Badam", tag: "Rich & Nutty", note: "Winter special", desc: "Roasted almonds, a whisper of cardamom — luxury in every sip.", size: "300 ml", img: badam, color: "oklch(0.72 0.1 55)", text: "oklch(0.2 0.08 50)" },
  { name: "Rose Milk", tag: "Silky Floral", note: "South India's sweetheart", desc: "Velvety rose syrup swirled into cold milk — the taste of every Tamil summer.", size: "300 ml", img: rosemilk, color: "oklch(0.82 0.12 10)", text: "oklch(0.99 0 0)" },
  { name: "Lychee Bliss", tag: "Tropical Delight", note: "Summer special", desc: "Sun-ripened lychee, light and floral — like biting into a cloud from the tropics.", size: "300 ml", img: lychee, color: "oklch(0.88 0.08 10)", text: "oklch(0.25 0.06 10)" },
];

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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ProductsPage() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/" }).then(() => {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  };

  return (
    <main className="min-h-screen bg-cream">

      {/* ── Nav — clean white bar (matches index.tsx) ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-300"
        style={{ boxShadow: y > 10 ? "0 2px 16px rgba(0,0,0,0.10)" : "0 1px 0 rgba(0,0,0,0.07)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[72px]">

          {/* Logo — clicking goes home */}
          <Link to="/">
            <img
              src={logo1}
              alt="Jallikattu Soda — Since 1946"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link
              to="/"
              className="relative text-primary/70 hover:text-primary transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-saffron after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
            {/* Active state for Products */}
            <Link
              to="/products"
              className="relative text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-saffron"
            >
              Products
            </Link>
            <a
              href="#story"
              onClick={(e) => handleHomeAnchor(e, "story")}
              className="relative text-primary/70 hover:text-primary transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-saffron after:transition-all after:duration-300 hover:after:w-full"
            >
              Heritage
            </a>
            <a
              href="#contact"
              onClick={(e) => handleHomeAnchor(e, "contact")}
              className="relative text-primary/70 hover:text-primary transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-saffron after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => handleHomeAnchor(e, "contact")}
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
              className="text-primary font-bold py-1"
            >
              Products
            </Link>
            <a
              href="#story"
              onClick={(e) => handleHomeAnchor(e, "story")}
              className="text-primary/70 hover:text-primary transition-colors py-1"
            >
              Heritage
            </a>
            <a
              href="#contact"
              onClick={(e) => handleHomeAnchor(e, "contact")}
              className="text-primary/70 hover:text-primary transition-colors py-1"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={(e) => handleHomeAnchor(e, "contact")}
              className="mt-1 flex items-center gap-2 rounded-full bg-saffron text-primary px-6 py-2 text-sm font-bold shadow-md"
            >
              Taste Now ★
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-60 animate-spin-slow"
          style={{ background: "var(--gradient-sun)", transform: `translateY(${y * 0.3}px)` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-cream text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-1.5 text-xs font-bold text-primary tracking-widest mb-6">
            ★ THE LINEUP ★
          </div>
          <h1 className="font-display text-6xl md:text-8xl drop-shadow-lg">
            SIX BOTTLES.<br /><span className="text-saffron">ONE LEGEND.</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-cream/90 text-lg">
            Every flavor brewed with the same untamed spirit since 1946.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.name}
              className="group relative rounded-3xl overflow-hidden p-8 h-[460px] flex flex-col justify-between shadow-xl hover:scale-[1.03] transition-transform duration-500"
              style={{
                backgroundColor: p.color,
                color: p.text,
                transform: `translateY(${Math.max(0, (800 - y) * 0.05 + (i % 3) * 8)}px)`,
              }}
            >
              <div className="relative">
                <div className="text-[10px] tracking-[0.3em] opacity-80">{p.note.toUpperCase()}</div>
                <h2 className="font-display text-4xl mt-2">{p.name}</h2>
                <p className="opacity-80 mt-1 text-sm">{p.tag}</p>
                <p className="opacity-90 mt-4 text-sm leading-relaxed max-w-[60%]">{p.desc}</p>
              </div>
              <img
                src={p.img}
                alt={p.name}
                className="absolute -right-8 -bottom-4 h-80 object-contain group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
              />
              <div className="relative flex items-center justify-between font-bold text-sm">
                <span className="rounded-full bg-cream/20 backdrop-blur px-3 py-1 text-xs tracking-widest">{p.size}</span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-current animate-ping" />
                  In stock →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-primary text-cream text-center overflow-hidden border-y-4 border-saffron">
        <h2 className="font-display text-4xl md:text-6xl">FIND A STOCKIST NEAR YOU</h2>
        <p className="mt-4 text-cream/80">Or partner with us to carry the legend.</p>
        <a
          href="#contact"
          onClick={(e) => handleHomeAnchor(e, "contact")}
          className="inline-block mt-8 rounded-full bg-cream text-primary px-8 py-3 font-bold hover:scale-105 transition-transform shadow-xl"
        >
          Get in Touch →
        </a>
      </section>

      {/* ── Footer — matches index.tsx ── */}
      <footer className="bg-primary text-cream">
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
                    onClick={(e) => handleHomeAnchor(e, id)}
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

    </main>
  );
}