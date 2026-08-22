import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "נועה ב.",
    country: "🇮🇱 ישראל → דרום אמריקה",
    avatar: "נ",
    color: "linear-gradient(135deg, #6b46c1, #4c1d95)",
    rating: 5,
    text: "חזרתי מ-7 חודשים בדרום אמריקה עם מלא תמונות ובלי סיפור. ה-VIAJO היה הגשר בין התמונות לזיכרונות האמיתיים. כל פעם שאני פותחת אותו אני חוזרת לאותם ערבים בקוסקו.",
    trip: "דרום אמריקה, 7 חודשים",
  },
  {
    name: "יוני מ.",
    country: "🌏 ישראל → דרום מזרח אסיה",
    avatar: "י",
    color: "linear-gradient(135deg, #059669, #064e3b)",
    rating: 5,
    text: "קניתי את הספר יום לפני שנסעתי לאסיה. לא ידעתי שזה יהפוך לחלק הכי חשוב מהנסיעה. כל ערב כתבתי 10 דקות — ועכשיו יש לי ספר שאגיד לנכדים שלי לקרוא.",
    trip: "תאילנד, וייטנאם, לאוס, 4 חודשים",
  },
  {
    name: "מיכל ר.",
    country: "🌍 ישראל → אפריקה",
    avatar: "מ",
    color: "linear-gradient(135deg, #d97706, #92400e)",
    rating: 5,
    text: "מה שאהבתי הכי הרבה הוא שהספר שואל אותך שאלות. לא רק 'מה עשית?' אלא 'מה הריח של המקום הזה?', 'מה הרגשת כשראית את זה בפעם הראשונה?' — זה שינה לי את כל הנסיעה.",
    trip: "טנזניה, קניה, 3 חודשים",
  },
  {
    name: "רון ק.",
    country: "🗻 ישראל → אסיה הדרומית",
    avatar: "ר",
    color: "linear-gradient(135deg, #dc2626, #7f1d1d)",
    rating: 5,
    text: "קנינו שני ספרים — לי ולאשתי. בסוף הנסיעה גילינו שכתבנו דברים שונים לגמרי על אותם מקומות. יצרנו ערב שלם שבו השווינו. ספר VIAJO הפך לפעילות משפחתית.",
    trip: "הודו, נפאל, 5 חודשים",
  },
  {
    name: "שיר ל.",
    country: "🇦🇺 ישראל → אוסטרליה",
    avatar: "ש",
    color: "linear-gradient(135deg, #2563eb, #1e3a8a)",
    rating: 5,
    text: "הייתי סקפטית בהתחלה — 'עוד מחברת?'. אבל העיצוב שלו, האיכות, העמודים המיוחדים... זה לא סתם מחברת. זה ארטיפקט. מלא 3 שנים אחרי הנסיעה הוא עדיין עומד על המדף הכי בולט שלי.",
    trip: "אוסטרליה וניו זילנד, 8 חודשים",
  },
  {
    name: "עידו ח.",
    country: "🌎 ישראל → מרכז אמריקה",
    avatar: "ע",
    color: "linear-gradient(135deg, #7c3aed, #4c1d95)",
    rating: 5,
    text: "ה-VIAJO עשה לי משהו שלא ציפיתי — גרם לי לאטות את הקצב בנסיעה. כשאתה יודע שתצטרך לתאר את היום הזה בכתב, אתה מתחיל לשים לב לדברים שבדרך כלל מחמיץ.",
    trip: "מקסיקו, גואטמלה, קוסטה ריקה, 6 חודשים",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0, scale: 0.95 }),
  };

  const t = TESTIMONIALS[current];

  return (
    <section
      ref={ref}
      dir="rtl"
      className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, rgba(var(--card-rgb),0.4) 0%, var(--background) 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span style={{ color: "var(--primary)", letterSpacing: "3px", fontSize: "11px", fontFamily: "'Heebo', sans-serif", fontWeight: 600 }}>
            מה אומרים המטיילים
          </span>
          <h2
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 900,
              color: "var(--foreground)",
              marginTop: 8,
            }}
          >
            מ-7 יבשות, סיפור אחד
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            style={{
              position: "relative",
              minHeight: 280,
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  background: "rgba(var(--card-rgb),0.8)",
                  border: "1px solid rgba(var(--primary-rgb),0.2)",
                  borderRadius: "16px",
                  padding: "36px 40px",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Quote mark */}
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "80px",
                    lineHeight: 1,
                    color: "rgba(var(--primary-rgb),0.2)",
                    marginBottom: -20,
                    direction: "ltr",
                  }}
                >
                  "
                </div>

                <p
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: "1.08rem",
                    color: "rgba(var(--fg-rgb),0.85)",
                    lineHeight: 1.85,
                    marginBottom: 28,
                  }}
                >
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Frank Ruhl Libre', serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 700, color: "var(--foreground)", fontSize: "1rem" }}>
                      {t.name}
                    </div>
                    <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.82rem", color: "rgba(var(--fg-rgb),0.55)", marginTop: 2 }}>
                      {t.country}
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <StarRating count={t.rating} />
                    </div>
                  </div>
                  <div
                    style={{
                      marginRight: "auto",
                      padding: "4px 12px",
                      background: "rgba(var(--primary-rgb),0.12)",
                      border: "1px solid rgba(var(--primary-rgb),0.25)",
                      borderRadius: "20px",
                      fontFamily: "'Heebo', sans-serif",
                      fontSize: "0.78rem",
                      color: "var(--primary)",
                    }}
                  >
                    ✈ {t.trip}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => go(-1)}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(var(--card-rgb),0.8)",
                border: "1px solid rgba(var(--primary-rgb),0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={18} color="var(--primary)" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? "var(--primary)" : "rgba(var(--primary-rgb),0.3)",
                    border: "none",
                    cursor: "pointer",
                    transition: "width 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(var(--card-rgb),0.8)",
                border: "1px solid rgba(var(--primary-rgb),0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={18} color="var(--primary)" />
            </button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {[
            { emoji: "⭐", label: "דירוג ממוצע 4.9", sub: "מ-300+ ביקורות" },
            { emoji: "🌍", label: "נשלח ל-40+ מדינות", sub: "ברחבי העולם" },
            { emoji: "✈", label: "1000+ מטיילים", sub: "בחרו VIAJO" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3" style={{ color: "rgba(var(--fg-rgb),0.65)" }}>
              <span style={{ fontSize: "1.5rem" }}>{b.emoji}</span>
              <div>
                <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 700, color: "var(--foreground)", fontSize: "0.95rem" }}>{b.label}</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.8rem" }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />
    </section>
  );
}
