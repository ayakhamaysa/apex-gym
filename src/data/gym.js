// ======================================================
// The only file you edit for a new gym
// Every text has an English and an Arabic version
// ======================================================

export const gym = {
  name: "APEX",
  whatsapp: "971500000000", // change to the gym number
  instagram: "https://www.instagram.com/oneclick.ps",
  en: { city: "Dubai", address: "Bay Square, Business Bay, Dubai", hours: "Mon–Sat 5:30–23:00 · Sun 7:00–21:00", currency: "AED" },
  ar: { city: "دبي", address: "باي سكوير، الخليج التجاري، دبي", hours: "الإثنين–السبت 5:30–23:00 · الأحد 7:00–21:00", currency: "د.إ" },
};

// Days of the timetable
export const days = {
  mon: { en: "Mon", ar: "الإثنين" },
  tue: { en: "Tue", ar: "الثلاثاء" },
  wed: { en: "Wed", ar: "الأربعاء" },
  thu: { en: "Thu", ar: "الخميس" },
  fri: { en: "Fri", ar: "الجمعة" },
  sat: { en: "Sat", ar: "السبت" },
  sun: { en: "Sun", ar: "الأحد" },
};

export const coaches = {
  layla: { name: "Layla Haddad", nameAr: "ليلى حداد", role: "Strength & HIIT", roleAr: "قوة وتمارين HIIT", image: "/gym/coach-layla.webp" },
  omar: { name: "Omar Khalil", nameAr: "عمر خليل", role: "Boxing & Conditioning", roleAr: "ملاكمة ولياقة", image: "/gym/coach-omar.webp" },
  sara: { name: "Sara Nasser", nameAr: "سارة ناصر", role: "Yoga & Pilates", roleAr: "يوغا وبيلاتس", image: "/gym/coach-sara.webp" },
};

// Every class: level "all" | "beginner" | "advanced", intensity 1–3, minutes
export const classes = [
  {
    id: "hiit", name: "HIIT Burn", nameAr: "HIIT حرق", coach: "layla", level: "all", intensity: 3, minutes: 45,
    image: "/gym/class-hiit.webp",
    about: "Short, hard intervals that raise your heart rate and burn energy fast.",
    aboutAr: "تمارين قصيرة وقوية بترفع نبضك وبتحرق طاقة بسرعة.",
  },
  {
    id: "strength", name: "Strength Lab", nameAr: "مختبر القوة", coach: "layla", level: "all", intensity: 2, minutes: 60,
    image: "/gym/class-strength.webp",
    about: "Coached lifting with free weights. Build muscle and learn the right form.",
    aboutAr: "رفع أوزان مع مدرّب. بتبني عضل وبتتعلم الطريقة الصح.",
  },
  {
    id: "boxing", name: "Box & Burn", nameAr: "ملاكمة وحرق", coach: "omar", level: "all", intensity: 3, minutes: 50,
    image: "/gym/class-boxing.webp",
    about: "Pad work and bag rounds. Great cardio and a great way to let off stress.",
    aboutAr: "ضرب على الكيس والقفازات. كارديو قوي وطريقة حلوة تفرّغ فيها الضغط.",
  },
  {
    id: "spin", name: "Rhythm Ride", nameAr: "دراجات على الإيقاع", coach: "omar", level: "all", intensity: 2, minutes: 45,
    image: "/gym/class-spin.webp",
    about: "Indoor cycling to the beat in a dark, lit-up studio. Easy on the joints.",
    aboutAr: "دراجات ثابتة على إيقاع الموسيقى بستوديو مضوّي. خفيف على المفاصل.",
  },
  {
    id: "yoga", name: "Flow Yoga", nameAr: "يوغا فلو", coach: "sara", level: "beginner", intensity: 1, minutes: 60,
    image: "/gym/class-yoga.webp",
    about: "Slow, flowing yoga for flexibility, balance and a calm mind.",
    aboutAr: "يوغا هادية بتحسّن المرونة والتوازن وبتريّح الأعصاب.",
  },
  {
    id: "pilates", name: "Reformer Pilates", nameAr: "بيلاتس ريفورمر", coach: "sara", level: "beginner", intensity: 2, minutes: 50,
    image: "/gym/class-pilates.webp",
    about: "Pilates on reformer machines. Strong core, better posture, small groups of 8.",
    aboutAr: "بيلاتس على أجهزة الريفورمر. بطن أقوى ووقفة أحسن، بمجموعات من 8 بس.",
  },
];

// The weekly timetable: which class, which day, what time
export const schedule = [
  { classId: "hiit", day: "mon", time: "07:00" },
  { classId: "yoga", day: "mon", time: "09:30" },
  { classId: "strength", day: "mon", time: "18:30" },
  { classId: "boxing", day: "mon", time: "20:00" },
  { classId: "spin", day: "tue", time: "06:30" },
  { classId: "pilates", day: "tue", time: "10:00" },
  { classId: "hiit", day: "tue", time: "19:00" },
  { classId: "strength", day: "wed", time: "07:00" },
  { classId: "pilates", day: "wed", time: "12:30" },
  { classId: "boxing", day: "wed", time: "19:00" },
  { classId: "yoga", day: "wed", time: "20:30" },
  { classId: "hiit", day: "thu", time: "07:00" },
  { classId: "spin", day: "thu", time: "18:30" },
  { classId: "strength", day: "thu", time: "20:00" },
  { classId: "yoga", day: "fri", time: "09:00" },
  { classId: "boxing", day: "fri", time: "17:00" },
  { classId: "pilates", day: "sat", time: "10:00" },
  { classId: "hiit", day: "sat", time: "11:30" },
  { classId: "spin", day: "sat", time: "17:30" },
  { classId: "yoga", day: "sun", time: "10:00" },
  { classId: "strength", day: "sun", time: "17:00" },
];

// Memberships (price per month)
export const plans = [
  {
    id: "core", name: "Core", nameAr: "كور", price: 450, featured: false,
    perks: ["Gym floor, 7 days", "2 classes a week", "Locker & towels"],
    perksAr: ["الصالة الرياضية 7 أيام", "حصتين بالأسبوع", "خزانة ومناشف"],
  },
  {
    id: "plus", name: "Plus", nameAr: "بلس", price: 750, featured: true,
    perks: ["Gym floor, 7 days", "Unlimited classes", "Body scan every month", "Locker & towels"],
    perksAr: ["الصالة الرياضية 7 أيام", "حصص بلا حدود", "فحص تكوين الجسم كل شهر", "خزانة ومناشف"],
  },
  {
    id: "elite", name: "Elite", nameAr: "إيليت", price: 1200, featured: false,
    perks: ["Everything in Plus", "4 personal training sessions", "Recovery zone: sauna & ice bath", "Guest pass every month"],
    perksAr: ["كل اللي بـ بلس", "4 جلسات تدريب شخصي", "منطقة استشفاء: ساونا وحمام ثلج", "دعوة لضيف كل شهر"],
  },
];

// Helpers
export const findClass = (id) => classes.find((c) => c.id === id);
