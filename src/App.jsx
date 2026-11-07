import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { days, findClass } from "./data/gym";
import { useLanguage } from "./useLanguage";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Classes from "./components/Classes";
import Timetable from "./components/Timetable";
import Plans from "./components/Plans";
import Coaches from "./components/Coaches";
import Footer from "./components/Footer";
import Coach from "./components/Coach";

export default function App() {
  const { lang, toggle } = useLanguage();
  const ar = lang === "ar";
  const [chatOpen, setChatOpen] = useState(false);
  const [queued, setQueued] = useState(""); // message to send when the chat opens

  // Open the coach, optionally with a ready message
  const askCoach = (message = "") => {
    setQueued(message);
    setChatOpen(true);
  };

  // "Book" in the timetable: ask the coach for that exact class
  const bookSlot = (slot) => {
    const c = findClass(slot.classId);
    const name = ar ? c.nameAr : c.name;
    const day = days[slot.day][lang];
    askCoach(ar ? `بدي أحجز ${name} يوم ${day} الساعة ${slot.time}` : `I'd like to book ${name} on ${day} at ${slot.time}`);
  };

  const choosePlan = (plan) =>
    askCoach(ar ? `مهتم باشتراك ${plan.nameAr}. شو بتنصحني أبلّش فيه؟` : `I'm interested in the ${plan.name} membership. Where should I start?`);

  return (
    // reducedMotion="user": no animations for visitors who turned motion off
    <MotionConfig reducedMotion="user">
      <Header lang={lang} onToggle={toggle} onTrial={() => askCoach()} />
      <main>
        <Hero lang={lang} onTrial={() => askCoach()} />
        <Marquee lang={lang} />
        <Classes lang={lang} />
        <Timetable lang={lang} onBook={bookSlot} />
        <Plans lang={lang} onChoose={choosePlan} />
        <Coaches lang={lang} />
      </main>
      <Footer lang={lang} />
      {/* key={lang}: switching the language starts a fresh chat in that language */}
      <Coach key={lang} lang={lang} open={chatOpen} setOpen={setChatOpen} queued={queued} clearQueued={() => setQueued("")} />
    </MotionConfig>
  );
}
