import { useEffect, useRef, useState } from "react";
import bottleClassic from "@/assets/bottle-classic.jpeg";
import bottleStrawberry from "@/assets/bottle-strawberry.jpeg";
import bottleMango from "@/assets/bottle-mango.jpeg";
import bottleYellow from "@/assets/bottle-yellow.jpeg";
import bottleBlueberry from "@/assets/bottle-blueberry.jpeg";
import bottleOrange from "@/assets/bottle-orange.jpeg";
import roseberry from "@/assets/roseberry.png";
import orange from "@/assets/orange.png";
import classic from "@/assets/classic.png";
import lemon from "@/assets/lemon.png";
import blueberry from "@/assets/bluberry.png";

const ITEMS = [
  { name: "Straw Berry", tag: "Sweet & Floral", note: "Bestseller", img: roseberry, color: "oklch(0.42 0.18 18)", text: "oklch(0.99 0 0)" },
  { name: "Classic Soda", tag: "Crystal Crisp", note: "Original 1946", img: classic, color: "oklch(0.32 0.04 240)", text: "oklch(0.99 0 0)" },
  { name: "Orange Fizz", tag: "Citrus Spark", note: "Crowd favorite", img: orange, color: "oklch(0.72 0.18 60)", text: "oklch(0.2 0.05 40)" },
  { name: "Pine Apple", tag: "Zesty Punch", note: "Bold zing", img: lemon, color: "oklch(0.85 0.18 105)", text: "oklch(0.2 0.05 100)" },
  { name: "Blue Berry", tag: "Tangy Twist", note: "Street legend", img: blueberry, color: "oklch(0.4 0.15 260)", text: "oklch(0.95 0.05 90)" },
 /*  { name: "Orange Fizz", tag: "Citrus Spark", note: "Crowd favorite", img: bottleOrange, color: "oklch(0.65 0.2 50)", text: "oklch(0.99 0 0)" }, */
];

export function Gallery() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
      setParallax(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = ITEMS[active];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-28 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: item.color, color: item.text }}
    >
      <div
        className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-cream/20 blur-3xl"
        style={{ transform: `translate(${parallax * -60}px, ${parallax * 40}px)` }}
      />
      <div
        className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-cream/10 blur-3xl"
        style={{ transform: `translate(${parallax * 80}px, ${parallax * -50}px)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] font-bold mb-3 opacity-80">★ PRODUCT GALLERY ★</div>
          <h2 className="font-display text-5xl md:text-7xl drop-shadow-lg">PICK · POP · SIP</h2>
          <p className="mt-4 opacity-80 max-w-xl mx-auto">Hover or tap a bottle to spin through the lineup.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Featured bottle stage */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div
              className="absolute h-80 w-80 rounded-full bg-cream/30 blur-2xl animate-shimmer"
              style={{ transform: `scale(${1 + parallax * 0.3})` }}
            />
            <img
              key={item.name}
              src={item.img}
              alt={item.name}
              className="relative z-10 h-full object-contain animate-float-slow drop-shadow-2xl"
              style={{ transform: `translateY(${parallax * -40}px)` }}
            />
            <div
              className="absolute top-6 left-6 text-[10px] tracking-[0.4em] opacity-80"
              style={{ transform: `translateY(${parallax * -20}px)` }}
            >
              {item.note.toUpperCase()}
            </div>
            <div
              className="absolute bottom-8 right-6 text-right"
              style={{ transform: `translateY(${parallax * 20}px)` }}
            >
              <div className="font-display text-5xl drop-shadow-lg">{item.name}</div>
              <div className="opacity-80 text-sm mt-1">{item.tag}</div>
            </div>
          </div>

          {/* Rotating thumbnails */}
          <div>
            <div className="grid grid-cols-3 gap-4">
              {ITEMS.map((f, i) => (
                <button
                  key={f.name}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative rounded-2xl p-4 h-40 flex items-end justify-center overflow-hidden border-2 transition-all duration-500 ${
                    active === i ? "border-cream scale-105 shadow-2xl" : "border-cream/20 hover:border-cream/60"
                  }`}
                  style={{ backgroundColor: `color-mix(in oklab, ${f.color} 70%, white)` }}
                  aria-label={f.name}
                >
                  <img
                    src={f.img}
                    alt={f.name}
                    className={`h-32 object-contain transition-transform duration-700 ${
                      active === i ? "scale-110 -rotate-6" : "group-hover:scale-110 group-hover:rotate-6"
                    }`}
                    style={{
                      transform: active === i ? `rotate(${parallax * 360}deg)` : undefined,
                      transitionProperty: active === i ? "transform" : undefined,
                    }}
                  />
                  <div className="absolute top-2 left-2 right-2 text-[10px] font-bold tracking-widest opacity-80" style={{ color: f.text }}>
                    {f.name.toUpperCase()}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-cream/15 backdrop-blur p-6 border border-cream/30">
              <div className="text-xs tracking-[0.3em] opacity-80">NOW VIEWING</div>
              <div className="font-display text-3xl mt-1">{item.name}</div>
              <p className="opacity-90 mt-2 text-sm">A signature pour from the Jallikattu lineup — bottled with the same fierce craft since 1946.</p>
              <div className="mt-4 flex gap-2">
                {ITEMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all ${active === i ? "w-8 bg-cream" : "w-2 bg-cream/40"}`}
                    aria-label={`Show flavor ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
