import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { days, schedule, findClass, coaches } from "../data/gym";
import { ui } from "../data/ui";
import Title from "./Title";

// onBook(slot): asks the AI coach to book this exact class
export default function Timetable({ lang, onBook }) {
  const t = ui[lang];
  const ar = lang === "ar";
  const [day, setDay] = useState("mon");
  const slots = schedule.filter((s) => s.day === day);

  return (
    <section id="timetable" className="bg-panel border-y border-line">
      <div className="max-w-7xl mx-auto px-5 py-28">
        <Title number="02" title={t.timetableTitle} />

        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] pb-2">
          {Object.entries(days).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setDay(key)}
              aria-pressed={day === key}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold border transition-colors ${
                day === key ? "bg-volt text-night border-volt" : "border-line text-ash hover:text-bone"
              }`}
            >
              {name[lang]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-8 divide-y divide-line border-y border-line"
          >
            {slots.map((slot) => {
              const c = findClass(slot.classId);
              return (
                <li key={slot.classId + slot.time} className="flex items-center gap-5 py-5">
                  <span className="font-display text-3xl w-24 shrink-0" dir="ltr">
                    {slot.time}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display uppercase text-2xl">{ar ? c.nameAr : c.name}</p>
                    <p className="text-ash text-sm">
                      {c.minutes} {t.minutes} · {ar ? coaches[c.coach].nameAr : coaches[c.coach].name}
                    </p>
                  </div>
                  <button
                    onClick={() => onBook(slot)}
                    className="shrink-0 border border-volt text-volt rounded-full px-5 py-2 text-sm font-semibold hover:bg-volt hover:text-night transition-colors"
                  >
                    {t.book}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
