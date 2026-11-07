import { useState } from "react";
import { gym, days, findClass, coaches } from "../data/gym";

const texts = {
  en: { title: "Free trial class", confirm: "Confirm on WhatsApp", done: "Sent ✓ See you at APEX", msg: (c, d, t) => `Hi APEX, I'd like to book my free trial: ${c} on ${d} at ${t}.` },
  ar: { title: "حصة تجريبية مجانية", confirm: "أكّد عالواتساب", done: "انبعت ✓ بنشوفك بـ APEX", msg: (c, d, t) => `مرحبا APEX، بدي أحجز حصتي المجانية: ${c} يوم ${d} الساعة ${t}.` },
};

// The booking ticket that appears inside the chat
export default function BookingCard({ booking, lang }) {
  const t = texts[lang];
  const ar = lang === "ar";
  const [sent, setSent] = useState(false);
  const c = findClass(booking.classId);
  const name = ar ? c.nameAr : c.name;
  const day = days[booking.day][lang];
  const link = `https://wa.me/${gym.whatsapp}?text=${encodeURIComponent(t.msg(name, day, booking.time))}`;

  return (
    <div className="rounded-2xl bg-volt text-night p-4 w-[85%]">
      <p className="text-xs font-semibold uppercase tracking-widest">{t.title}</p>
      <p className="font-display uppercase text-2xl mt-1">{name}</p>
      <div className="flex gap-4 text-sm mt-2 font-semibold">
        <span>{day}</span>
        <span dir="ltr">{booking.time}</span>
        <span>{c.minutes} min</span>
      </div>
      <p className="text-xs mt-1 opacity-70">{ar ? coaches[c.coach].nameAr : coaches[c.coach].name}</p>
      <a
        href={link}
        target="_blank"
        onClick={() => setSent(true)}
        className="mt-3 block text-center bg-night text-volt rounded-full py-2.5 text-sm font-semibold hover:bg-black"
      >
        {sent ? t.done : t.confirm}
      </a>
    </div>
  );
}
