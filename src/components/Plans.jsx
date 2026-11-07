import { gym, plans } from "../data/gym";
import { ui } from "../data/ui";
import Title from "./Title";

export default function Plans({ lang, onChoose }) {
  const t = ui[lang];
  const ar = lang === "ar";
  return (
    <section id="plans" className="max-w-7xl mx-auto px-5 py-28">
      <Title number="03" title={t.plansTitle} text={t.plansText} />

      <div className="grid gap-5 md:grid-cols-3 items-stretch">
        {plans.map((p) => (
          <article
            key={p.id}
            className={`relative rounded-3xl p-8 flex flex-col border ${p.featured ? "bg-volt text-night border-volt md:-translate-y-4" : "bg-panel border-line"}`}
          >
            {p.featured && <span className="absolute top-6 end-6 text-xs font-semibold bg-night text-volt rounded-full px-3 py-1">{t.popular}</span>}
            <h3 className="font-display uppercase text-4xl">{ar ? p.nameAr : p.name}</h3>
            <p className="mt-6">
              <span className="font-display text-6xl">{p.price}</span>{" "}
              <span className={p.featured ? "text-night/70" : "text-ash"}>
                {gym[lang].currency} {t.perMonth}
              </span>
            </p>
            <ul className="mt-8 space-y-3 flex-1">
              {(ar ? p.perksAr : p.perks).map((perk) => (
                <li key={perk} className="flex gap-3">
                  <span className={p.featured ? "text-night" : "text-volt"}>✓</span>
                  {perk}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onChoose(p)}
              className={`mt-10 rounded-full py-3.5 font-semibold transition-colors ${
                p.featured ? "bg-night text-volt hover:bg-black" : "border border-bone/30 hover:border-bone"
              }`}
            >
              {t.choose} {ar ? p.nameAr : p.name}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
