import { classes } from "../data/gym";

export default function Marquee({ lang }) {
  const words = classes.map((c) => (lang === "ar" ? c.nameAr : c.name));
  const row = [...words, ...words]; // shown twice so the loop has no gap

  return (
    // The outer box cuts off the tilted strip, so it never makes the page wider
    <div className="overflow-hidden py-3">
      <div className="bg-volt text-night overflow-hidden py-4 -rotate-1 scale-[1.02]">
        <div className="marquee flex w-max gap-10 font-display text-3xl uppercase">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              {w} <span>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
