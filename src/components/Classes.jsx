import { motion } from "framer-motion";
import { classes, coaches } from "../data/gym";
import { ui } from "../data/ui";
import Photo from "./Photo";
import Title from "./Title";

// Three small bars that show how hard a class is
function Intensity({ level, label }) {
  return (
    <span className="flex items-end gap-1" role="img" aria-label={`${label} ${level}/3`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`w-1.5 rounded-full ${n <= level ? "bg-volt" : "bg-bone/20"}`} style={{ height: 6 + n * 4 }} />
      ))}
    </span>
  );
}

export default function Classes({ lang }) {
  const t = ui[lang];
  const ar = lang === "ar";
  return (
    <section id="classes" className="max-w-7xl mx-auto px-5 py-28">
      <Title number="01" title={t.classesTitle} text={t.classesText} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-panel border border-line aspect-[4/5] flex flex-col justify-end"
          >
            <Photo src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-night via-night/50 to-transparent" />

            <div className="relative p-6">
              <div className="flex items-center gap-3 text-xs text-ash">
                <span className="border border-bone/25 rounded-full px-3 py-1">{t.levels[c.level]}</span>
                <span>
                  {c.minutes} {t.minutes}
                </span>
                <span className="ms-auto">
                  <Intensity level={c.intensity} label={t.intensity} />
                </span>
              </div>
              <h3 className="font-display uppercase text-4xl mt-4">{ar ? c.nameAr : c.name}</h3>
              <p className="text-ash text-sm leading-relaxed mt-2">{ar ? c.aboutAr : c.about}</p>
              <p className="text-xs text-bone/70 mt-4">
                {t.with} {ar ? coaches[c.coach].nameAr : coaches[c.coach].name}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
