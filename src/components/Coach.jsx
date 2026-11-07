import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { readBooking } from "../booking";
import BookingCard from "./BookingCard";

// All the chat texts in both languages
const texts = {
  en: {
    welcome: "Hi, I'm Coach 👋 I'll help you pick a class and book your free trial. What's your main goal?",
    suggestions: ["Lose weight", "Build strength", "I'm a total beginner", "I have back pain"],
    button: "AI Coach",
    title: "APEX Coach",
    subtitle: "AI assistant · books your free trial",
    thinking: "Coach is typing…",
    placeholder: "Message the coach…",
    send: "Send",
    close: "Close",
    error: "Something went wrong. Please try again in a moment.",
  },
  ar: {
    welcome: "أهلاً، أنا المدرّب 👋 بساعدك تختار حصة وبحجزلك حصتك المجانية. شو هدفك الأساسي؟",
    suggestions: ["بدي أنزّل وزن", "بدي أقوّي عضلاتي", "أنا مبتدئ كلياً", "عندي وجع بظهري"],
    button: "المدرّب الذكي",
    title: "مدرّب APEX",
    subtitle: "مساعد ذكي · بيحجزلك حصة مجانية",
    thinking: "المدرّب عم يكتب…",
    placeholder: "اكتب للمدرّب…",
    send: "إرسال",
    close: "إغلاق",
    error: "صار في مشكلة. جرّب كمان مرة بعد شوي.",
  },
};

// queued: a message to send as soon as the chat opens (from the timetable or plans)
export default function Coach({ lang, open, setOpen, queued, clearQueued }) {
  const t = texts[lang];
  const [messages, setMessages] = useState([{ role: "assistant", text: t.welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text) {
    const question = text.trim();
    if (!question || loading) return;
    const next = [...messages, { role: "user", text: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The model needs the booking lines too, so it remembers what was booked
        body: JSON.stringify({ messages: next.slice(1), lang }),
      });
      if (res.status === 404) throw new Error("API not found: run the site with npx vercel dev");
      if (!res.ok) throw new Error((await res.json()).error);

      // The answer arrives in pieces: show each piece as soon as it comes
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setLoading(false);
        setMessages([...next, { role: "assistant", text: answer }]);
      }
      if (!answer) throw new Error("Empty answer");
    } catch (error) {
      console.error("Coach:", error.message);
      const details = import.meta.env.DEV ? `\n(${error.message})` : "";
      setMessages([...next, { role: "assistant", text: t.error + details }]);
    } finally {
      setLoading(false);
    }
  }

  // A message waiting from the timetable / plans: send it once the chat is open
  useEffect(() => {
    if (open && queued && !loading) {
      send(queued);
      clearQueued();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, queued]);

  return (
    <>
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-5 end-5 z-50 flex items-center gap-2 bg-volt text-night font-semibold rounded-full ps-3 pe-5 py-3 shadow-[0_0_40px_rgba(212,255,58,0.35)]"
        >
          <span className="relative flex w-3 h-3">
            <span className="absolute inset-0 rounded-full bg-night/40 animate-ping" />
            <span className="relative w-3 h-3 rounded-full bg-night" />
          </span>
          {t.button}
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:end-5 sm:bottom-5 sm:w-[24rem] z-50 bg-panel border border-line rounded-3xl shadow-2xl flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
              <span className="w-10 h-10 rounded-full bg-volt text-night grid place-items-center font-display text-lg">A</span>
              <div className="flex-1">
                <p className="font-semibold">{t.title}</p>
                <p className="text-xs text-ash">{t.subtitle}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t.close} className="text-2xl leading-none text-ash hover:text-bone">
                ×
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => {
                if (m.role === "user") {
                  return (
                    <p key={i} className="max-w-[85%] ms-auto whitespace-pre-line rounded-2xl rounded-ee-sm bg-bone text-night px-4 py-2.5 text-sm">
                      {m.text}
                    </p>
                  );
                }
                // Coach messages may hold a booking: show the text, then the ticket
                const { clean, booking } = readBooking(m.text);
                return (
                  <div key={i} className="space-y-2">
                    {clean && <p className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-es-sm bg-night px-4 py-2.5 text-sm leading-relaxed">{clean}</p>}
                    {booking && <BookingCard booking={booking} lang={lang} />}
                  </div>
                );
              })}
              {loading && <p className="bg-night rounded-2xl px-4 py-2.5 text-sm w-fit animate-pulse">{t.thinking}</p>}
            </div>

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {t.suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-xs border border-line rounded-full px-3 py-1.5 hover:border-volt hover:text-volt">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 p-3 border-t border-line"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                maxLength={400}
                className="flex-1 bg-night rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-ash focus:ring-2 focus:ring-volt/50"
              />
              <button disabled={loading} className="bg-volt text-night rounded-full px-5 text-sm font-semibold disabled:opacity-50">
                {t.send}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
