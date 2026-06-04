import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Brain, Camera, Clock, AlertTriangle } from "lucide-react";

const STATS = [
  { icon: Brain, value: "90%", label: "מהרגעים הכי קטנים נשכחים תוך שנה" },
  { icon: Camera, value: "2,400", label: "תמונות ממוצעות לנסיעה — ורוב הסיפור הולך לאיבוד" },
  { icon: Clock, value: "3 שנים", label: "ולא תזכור את שם הכפר שבו שינת בגוואטמלה" },
];

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="problem"
      ref={ref}
      dir="rtl"
      className="relative py-24 px-6"
      style={{
        background: "linear-gradient(180deg, #06091a 0%, #080d22 50%, #06091a 100%)",
      }}
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #d4a017, transparent)" }} />

      <div className="max-w-5xl mx-auto">
        {/* Section label */}
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
            הבעיה שאף אחד לא מדבר עליה
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-6"
          style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#f0e6d3",
            lineHeight: 1.3,
          }}
        >
          אתה מתכנן נסיעה של חיים.
          <br />
          <span style={{ color: "#d4a017" }}>מה יישאר ממנה בעוד 10 שנים?</span>
        </motion.h2>

        {/* Story text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <p
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(240,230,211,0.72)",
              lineHeight: 1.9,
              textAlign: "center",
            }}
          >
            תחשוב על זה — כבר עכשיו, לפני שיצאת, אתה כבר מאבד חלק מהנסיעה.
            כי הזיכרון שלנו לא עובד כמו מצלמה. הוא עובד כמו ערפל.
            חם ועוצמתי ברגע — ומתפוגג לאט לאט עד שנשאר רק הרגשה כללית של "היה נחמד".
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              style={{
                background: "rgba(14,24,48,0.7)",
                border: "1px solid rgba(212,160,23,0.2)",
                borderRadius: "12px",
                padding: "28px 24px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              <stat.icon
                size={32}
                style={{ color: "#d4a017", margin: "0 auto 16px" }}
              />
              <div
                style={{
                  fontFamily: "'Frank Ruhl Libre', serif",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#d4a017",
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(240,230,211,0.65)",
                  lineHeight: 1.6,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scenario cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            background: "rgba(14,24,48,0.5)",
            border: "1px solid rgba(212,160,23,0.15)",
            borderRadius: "16px",
            padding: "36px",
          }}
        >
          <div className="flex items-start gap-4">
            <AlertTriangle size={28} style={{ color: "#d4a017", flexShrink: 0, marginTop: 4 }} />
            <div>
              <h3
                style={{
                  fontFamily: "'Frank Ruhl Libre', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#f0e6d3",
                  marginBottom: "12px",
                }}
              >
                הסצנריו שקורה לכל מטייל
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  '10:00 בבוקר: "לעולם לא אשכח את הזריחה הזו בג\'ונגל."',
                  '6 חודשים אחרי: "איפה בדיוק זה היה? אנגקור ואט? לאוס?"',
                  '5 שנים אחרי: מסתכל בתמונות ולא זוכר איך הגעת לשם בכלל.',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#d4a017",
                        marginTop: 9,
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'Heebo', sans-serif",
                        fontSize: "0.95rem",
                        color: "rgba(240,230,211,0.72)",
                        lineHeight: 1.7,
                      }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #d4a017, transparent)" }} />
    </section>
  );
}
