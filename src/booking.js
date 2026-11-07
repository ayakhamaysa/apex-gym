import { schedule } from "./data/gym";

// The coach ends a booking reply with a line like [[BOOK:yoga|mon|09:30]].
// This finds it, checks it is a real class in the timetable, and removes it from the text.
const BOOK = /\[\[BOOK:([a-z]+)\|([a-z]{3})\|(\d{2}:\d{2})\]\]/;

export function readBooking(text) {
  // While the answer is still arriving, hide a half-written "[[BOOK..." too
  const clean = text.replace(BOOK, "").replace(/\[\[[^\]]*$/, "").trim();
  const match = text.match(BOOK);
  if (!match) return { clean, booking: null };

  const [, classId, day, time] = match;
  const exists = schedule.some((s) => s.classId === classId && s.day === day && s.time === time);
  return { clean, booking: exists ? { classId, day, time } : null };
}
