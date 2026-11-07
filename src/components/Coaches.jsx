import { coaches, gym } from "../data/gym";
import { ui } from "../data/ui";
import Photo from "./Photo";
import Title from "./Title";

export default function Coaches({ lang }) {
  const t = ui[lang];
  const ar = lang === "ar";
  return (
    <section id="coaches" className="max-w-7xl mx-auto px-5 pb-28">
      <Title number="04" title={t.coachesTitle} />
      <div className="grid gap-5 sm:grid-cols-3">
        {Object.entries(coaches).map(([id, c]) => (
          <article key={id} className="group">
            <div className="overflow-hidden rounded-3xl border border-line">
              <Photo src={c.image} alt={c.name} loading="lazy" className="w-full aspect-[3/4] grayscale group-hover:grayscale-0 transition duration-700" />
            </div>
            <h3 className="font-display uppercase text-3xl mt-4">{ar ? c.nameAr : c.name}</h3>
            <p className="text-volt text-sm">{ar ? c.roleAr : c.role}</p>
          </article>
        ))}
      </div>

      {/* Visit */}
      <div className="mt-28 rounded-3xl border border-line bg-panel p-8 md:p-12 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <p className="font-display uppercase text-5xl">{t.visit}</p>
          <p className="text-ash mt-4">{gym[lang].address}</p>
          <p className="text-ash" dir="ltr" style={{ textAlign: ar ? "right" : "left" }}>
            {gym[lang].hours}
          </p>
        </div>
        <a
          href={`https://wa.me/${gym.whatsapp}`}
          target="_blank"
          className="justify-self-start md:justify-self-end font-display text-4xl md:text-5xl hover:text-volt transition-colors"
          dir="ltr"
        >
          +{gym.whatsapp.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, "$1 $2 $3 $4")}
        </a>
      </div>
    </section>
  );
}
