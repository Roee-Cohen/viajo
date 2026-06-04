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
        background: "linear-gradient(180deg, #06091a 0%, #0a102a 100%)",
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
              color: "#d4a017",
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
            color: "#f0e6d3",
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
                  background: "linear-gradient(to top, rgba(6,9,26,0.7), transparent 60%)",
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
                border: "2px solid rgba(212,160,23,0.4)",
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
            <Quote size={36} style={{ color: "#d4a017", marginBottom: "20px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "חזרתי מ-8 חודשים בדרום אמריקה ב-2019. הייתי שם — ממש שם — בג'ונגל האמזוני, על שפת הנהר, בחוות מאצ'ו פיצ'ו. רגעים שאמרתי לעצמי: 'את זה לא אשכח לעולם'.",
                "3 שנים אחרי, ישבתי עם חבר שביקש שאספר לו על הנסיעה. ופתאום הבנתי שמה שנשאר לי הם רסיסים. שמות של מקומות בלי תמונה. תמונות בלי סיפור. רגשות בלי הקשר.",
                "חיפשתי משהו שיכול לעזור לי לשחזר את הזיכרונות — ולא מצאתי. אז החלטתי לבנות את זה בעצמי. כך נולד VIAJO — ספר המסע שהלוואי והיה לי בנסיעה.",
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(240,230,211,0.78)",
                    lineHeight: 1.85,
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
                borderTop: "1px solid rgba(212,160,23,0.2)",
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
                  background: "linear-gradient(135deg, #d4a017, #8a6010)",
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
                    color: "#f0e6d3",
                  }}
                >
                  אמיר לוי
                </div>
                <div
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(240,230,211,0.5)",
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
