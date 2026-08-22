import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote } from "lucide-react";

const FOUNDER_PHOTO = "https://images.unsplash.com/photo-1760716052952-f8218adde8ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const JOURNAL_PHOTO = "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

export function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="story"
      ref={ref}
      dir="rtl"
      className="relative py-24 px-6"
      style={{
        background: "linear-gradient(180deg, var(--background) 0%, rgba(var(--card-rgb),0.5) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <span
            style={{
              color: "var(--primary)",
              letterSpacing: "3px",
              fontSize: "11px",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            הסיפור שלי
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-14"
          style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "var(--foreground)",
          }}
        >
          מה שגרם לי ליצור את VIAJO
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "110%",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src={FOUNDER_PHOTO}
                alt="מטייל בהרים"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.8) saturate(1.1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(var(--bg-rgb),0.7), transparent 60%)",
                }}
              />
            </div>

            {/* Floating journal image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: -30,
                left: -20,
                width: "50%",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                border: "2px solid rgba(var(--primary-rgb),0.4)",
              }}
            >
              <img
                src={JOURNAL_PHOTO}
                alt="יומן מסע"
                style={{ width: "100%", display: "block", objectFit: "cover", height: 160 }}
              />
            </motion.div>
          </motion.div>

          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <Quote size={36} style={{ color: "var(--primary)", marginBottom: "0px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                " כמעט שנה וחצי נסעתי בעולם  ממדבריות ארצות הברית, דרך ג’ונגלים של דרום אמריקה ורחובות מרכז אמריקה, ועד לפינות הכי מרוחקות של המזרח הרחוק.",
                "נסעתי עם אנשים מדהימים. חוויתי רגעים שחשבתי שלא אשכח לעולם. וכתבתי  כל יום, בלי לפספס.",
                " אבל כמעט כל מי שנסע איתי לא כתב אפילו שורה אחת. ניסיתי לשכנע, הסברתי, הפצרתי  לא עזר. הם הסתפקו בתמונות.",
                " שנים אחרי, כשאני מדבר עם אותם אנשים על אותם רגעים  אני מופתע כל פעם מחדש. הפערים עצומים. הם זוכרים שהיה כיף, שהיה יפה, ש’היה נחמד’. אני זוכר את הריח, את השמות, את מה שהרגשנו בדיוק באותו רגע.",
                " הבדל אחד: היומן.",
                " VIAJO נולד מתוך הרצון לתת לכל מטייל את מה שהייתי רוצה שיהיה לי  ואת מה שהייתי רוצה לתת לכם. ספר מסע שלא רק מתעד, אלא בונה מזכרת שתישאר איתכם לכל החיים",
                <Quote size={36} style={{ color: "var(--primary)", marginBottom: "0px" }} />
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(var(--fg-rgb),0.78)",
                    lineHeight: 1.75,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Founder signature */}
            <div
              style={{
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(var(--primary-rgb),0.2)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                ✈
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Frank Ruhl Libre', serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--foreground)",
                  }}
                >
                  אמיר לוי
                </div>
                <div
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(var(--fg-rgb),0.5)",
                    marginTop: 2,
                  }}
                >
                  מייסד VIAJO — לשעבר מטייל ל-2+ שנים
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
