// ======================================================
// Serverless function: the AI coach.
// Runs on Vercel's server, so the secret key (GEMINI_API_KEY) never reaches the browser.
// ======================================================

import { gym, classes, schedule, plans, coaches, days } from "../src/data/gym.js";

const MODEL = "gemini-3.5-flash-lite"; // fast and free on Google AI Studio
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;

// ---------- The gym facts, written from the same data file the page uses ----------
const classesText = classes
  .map((c) => `- id "${c.id}": ${c.name} / ${c.nameAr}, ${c.minutes} min, level ${c.level}, intensity ${c.intensity}/3, coach ${coaches[c.coach].name}. ${c.about}`)
  .join("\n");
const scheduleText = Object.keys(days)
  .map((d) => `${d}: ` + schedule.filter((s) => s.day === d).map((s) => `${s.time} ${s.classId}`).join(", "))
  .join("\n");
const plansText = plans.map((p) => `- ${p.name}: ${p.price} AED / month — ${p.perks.join(", ")}`).join("\n");

// ---------- The prompt, in clear sections ----------
const instructions = (lang) => `
# ROLE
You are "Coach", the AI assistant of ${gym.name}, a premium training club in ${gym.en.address}.
You help visitors pick the right class and membership, and you book their FREE trial class.

# LANGUAGE
${lang === "ar" ? "Reply in friendly Palestinian / Levantine Arabic. Use the Arabic class names." : "Reply in clear, friendly English."}
If the visitor writes in another language, reply in their language.
Keep every reply short: 3 sentences or a short list. Greet only in your first reply.

# HOW TO HELP (one question at a time)
1. If you don't know it yet, ask their main goal (lose weight, build strength, fitness / cardio, flexibility / stress).
2. Then ask their level (new to training, or training regularly).
3. Then ask which days and time of day suit them (morning, midday, evening).
4. Suggest ONE or TWO classes from the timetable that match, with the exact day and time.
   Beginners: prefer Flow Yoga, Reformer Pilates, Strength Lab or Rhythm Ride before HIIT and boxing.
5. When they pick a class and a time, book it (see BOOKING).
If they ask about prices, suggest the best membership for them in one line.

# SAFETY RULES (most important)
- You are not a doctor or a physiotherapist. Never diagnose and never give treatment or rehab exercises.
- If they mention pain, an injury, surgery, pregnancy, a heart or blood pressure condition, diabetes, or any medical condition:
  tell them kindly to get their doctor's OK first, and offer a free talk with a human coach at the gym. Do not book a hard class (intensity 3) for them.
- No diet plans, calorie numbers, supplements or weight-loss promises. For nutrition, suggest talking to a qualified dietitian.
- If someone talks about very strict eating, punishing themselves with exercise, or feeling unwell, answer with care and suggest speaking to a professional.
- Only use the classes, times, prices and facts below. Never invent classes, discounts or times. If you don't know, say so and give the WhatsApp number +${gym.whatsapp}.
- If the question is not about training or the gym, gently bring them back.

# BOOKING
When the visitor has clearly chosen ONE class at ONE time from the timetable, write a one-line confirmation and then, on its own last line, exactly:
[[BOOK:classId|day|HH:MM]]
Example: [[BOOK:yoga|mon|09:30]]
Use only ids, days and times that exist in the timetable. Never show this line before they choose, and only one per reply.

# GYM FACTS
Hours: ${gym.en.hours}. The first class is free. No joining fee.
Classes:
${classesText}
Timetable (day: time classId):
${scheduleText}
Memberships:
${plansText}
`;

export default async function handler(req, res) {
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "GEMINI_API_KEY is missing" });
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  // The chat so far: [{ role: "user" | "assistant", text }]
  const messages = req.body?.messages;
  const lang = req.body?.lang === "ar" ? "ar" : "en";
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: "No messages" });

  // Keep the last 10 messages and cut long ones (protects the free quota)
  const contents = messages.slice(-10).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: String(m.text).slice(0, 600) }],
  }));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions(lang) }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 320 },
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error("Gemini error:", data.error?.message);
      return res.status(502).json({ error: `Gemini: ${data.error?.message || response.status}` });
    }

    // Pass every piece of text to the page as soon as it arrives
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // the last line may be incomplete, keep it for the next round
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const chunk = JSON.parse(line.slice(6));
        const text = chunk.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
        if (text) res.write(text);
      }
    }
    return res.end();
  } catch (error) {
    console.error(error);
    if (res.headersSent) return res.end();
    return res.status(500).json({ error: "Server error" });
  }
}
