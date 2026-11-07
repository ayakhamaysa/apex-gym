import { motion } from "framer-motion";
import { ui } from "../data/ui";
import Photo from "./Photo";

export default function Hero({ lang, onTrial }) {
  const t = ui[lang];
  return (
    <section id="top" className="relative min-h-svh flex items-end overflow-hidden pt-16">
      {/* Background photo with a dark fade so the text reads well */}
      <Photo src="/gym/hero.webp" fetchPriority="high" className="absolute inset-0 w-full h-full opacity-55" />
      <div className="absolute inset-0 bg-linear-to-t from-night via-night/60 to-night/10" />
      <div className="absolute inset-0 bg-linear-to-r rtl:bg-linear-to-l from-night/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 pb-16 md:pb-24 w-full">
        <p className="flex items-center gap-3 text-volt text-sm tracking-[0.25em] uppercase">
          <span className="w-10 h-px bg-volt" />
          {t.kicker}
        </p>

        {/* Each word slides up on its own */}
        <h1 className="font-display uppercase leading-[0.88] text-[22vw] sm:text-[16vw] lg:text-[11rem] mt-6">
          {t.heroTitle.map((word, i) => (
            <motion.span
              key={word}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: "easeOut" }}
              className={`block ${i === 1 ? "text-outline" : ""} ${i === 2 ? "text-volt" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <div className="grid gap-10 md:grid-cols-2 items-end mt-10">
          <div>
            <p className="text-ash text-lg max-w-md leading-relaxed">{t.heroText}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={onTrial} className="bg-volt text-night font-semibold rounded-full px-7 py-3.5 hover:bg-white transition-colors">
                {t.trial} <span className="inline-block rtl:rotate-180">→</span>
              </button>
              <a href="#timetable" className="border border-bone/30 rounded-full px-7 py-3.5 hover:border-bone transition-colors">
                {t.nav.timetable}
              </a>
            </div>
          </div>

          <div className="flex gap-10 md:justify-end">
            {t.stats.map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-5xl">{value}</p>
                <p className="text-ash text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
