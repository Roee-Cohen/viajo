import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FloatingBook } from "./FloatingBook";
import { BookOpen, MapPin, Image, Pencil, Package, Star } from "lucide-react";

const FEATURES = [
  { icon: BookOpen, title: "ספר מותאם אישית", text: "כל ספר VIAJO מעוצב סביב הנסיעה שלך — המסלול, התאריכים, המקומות." },
  { icon: MapPin, title: "מפות ומסלולים", text: "מפות מדינות ויבשות שעברת בהן, עם שטח לסמן ולצייר את הדרך שלך." },
  { icon: Image, title: "עמודי זיכרון", text: "עמודים מיוחדים לתמונות, כרטיסים, מנות, אנשים — כל מה שרצית לזכור." },
  { icon: Pencil, title: "רשומות יומניות", text: "שטח כתיבה מובנה לכל יום בנסיעה — עם שאלות מנחות שיוציאו ממך את הסיפור." },
  { icon: Package, title: "חבילת מוצרים", text: "ניתן להוסיף מדבקות מיקום, עטים מיוחדים, ומדריך למטייל הנינג'ה." },
  { icon: Star, title: "איכות פרמיום", text: "כריכה קשה, נייר 120 גרם, הדפסה מקצועית — ספר שיחזיק 100 שנה." },
];

export function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="solution"
      ref={ref}
      dir="rtl"
      className="relative py-24 px-6"
      style={{
        background: "linear-gradient(180deg, rgba(var(--card-rgb),0.5) 0%, var(--background) 40%, rgba(var(--card-rgb),0.3) 100%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <span style={{ color: "var(--primary)", letterSpacing: "3px", fontSize: "11px", fontFamily: "'Heebo', sans-serif", fontWeight: 600 }}>
            הפתרון
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-4"
          style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "var(--foreground)" }}
        >
          הכירו את <span style={{ color: "var(--primary)" }}>VIAJO</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 max-w-xl mx-auto"
          style={{ fontFamily: "'Heebo', sans-serif", fontSize: "1.05rem", color: "rgba(var(--fg-rgb),0.68)", lineHeight: 1.8 }}
        >
          ספר המסע שמלווה אותך בנסיעה — ושומר את כל הרגעים האמיתיים שלך לנצח
        </motion.p>

        {/* Book showcase */}
        <div className="flex flex-col lg:flex-row items-center gap-14 mb-20">
          {/* Book 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex-shrink-0 flex justify-center"
          >
            <div className="relative">
              <FloatingBook size="lg" />
              {/* Glow under book */}
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 200,
                  height: 40,
                  background: "radial-gradient(ellipse, rgba(var(--primary-rgb),0.3), transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
            </div>
          </motion.div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                style={{
                  background: "rgba(var(--card-rgb),0.6)",
                  border: "1px solid rgba(var(--primary-rgb),0.15)",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    background: "rgba(var(--primary-rgb),0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <f.icon size={20} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 700, color: "var(--foreground)", fontSize: "1rem", marginBottom: 4 }}>
                    {f.title}
                  </div>
                  <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.88rem", color: "rgba(var(--fg-rgb),0.6)", lineHeight: 1.65 }}>
                    {f.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            {
              src: "https://images.unsplash.com/photo-1748016276313-7f9b25de7376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
              label: "עמודי הרשומות"
            },
            {
              src: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
              label: "ערכת המטייל"
            },
            {
              src: "https://images.unsplash.com/photo-1501868984184-76121ed6a6e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
              label: "מפות מסלול"
            },
          ].map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(var(--primary-rgb),0.2)",
                aspectRatio: "4/3",
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75) saturate(1.1)" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(var(--bg-rgb),0.9), transparent)",
                  padding: "16px 12px 10px",
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  textAlign: "center",
                }}
              >
                {img.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />
    </section>
  );
}
