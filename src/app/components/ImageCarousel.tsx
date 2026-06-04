import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1766893303652-2822021ce432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    caption: "הרים בפרו — זריחה שלא שכחתי",
    location: "מאצ'ו פיצ'ו, פרו",
  },
  {
    src: "https://images.unsplash.com/photo-1592388748465-8c4dca8dd703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    caption: "ציוד לנסיעה הגדולה",
    location: "על הדרך",
  },
  {
    src: "https://images.unsplash.com/photo-1638291792853-5ab967de3611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    caption: "ממבט על — כדור הארץ שלנו",
    location: "מהחלל",
  },
  {
    src: "https://images.unsplash.com/photo-1748016276313-7f9b25de7376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    caption: "הרגעים שכותבים את עצמם",
    location: "יומן הדרך",
  },
  {
    src: "https://images.unsplash.com/photo-1529579134665-75dfc9c5ccef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    caption: "כל מסע מתחיל בנקודה",
    location: "גלובוס",
  },
];

export function ImageCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + IMAGES.length) % IMAGES.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section
      ref={ref}
      dir="rtl"
      className="relative py-20 px-6"
      style={{ background: "linear-gradient(180deg, #06091a 0%, #080d22 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span style={{ color: "#d4a017", letterSpacing: "3px", fontSize: "11px", fontFamily: "'Heebo', sans-serif", fontWeight: 600 }}>
            גלריית הדרך
          </span>
          <h2
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 900,
              color: "#f0e6d3",
              marginTop: 8,
            }}
          >
            כל תמונה מספרת סיפור
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "16/9" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              <img
                src={IMAGES[current].src}
                alt={IMAGES[current].caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.72) saturate(1.15)" }}
              />
              {/* Caption overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "40px 28px 24px",
                  background: "linear-gradient(to top, rgba(6,9,26,0.9) 0%, transparent 100%)",
                }}
              >
                <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.8rem", color: "#d4a017", marginBottom: 4, letterSpacing: "1px" }}>
                  📍 {IMAGES[current].location}
                </div>
                <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "1.2rem", fontWeight: 700, color: "#f0e6d3" }}>
                  {IMAGES[current].caption}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          {[
            { dir: -1, Icon: ChevronRight, style: { right: 16 } },
            { dir: 1, Icon: ChevronLeft, style: { left: 16 } },
          ].map(({ dir, Icon, style }) => (
            <button
              key={dir}
              onClick={() => go(dir)}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                ...style,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(6,9,26,0.7)",
                border: "1px solid rgba(212,160,23,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(212,160,23,0.25)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(6,9,26,0.7)")}
            >
              <Icon size={20} color="#d4a017" />
            </button>
          ))}
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? "#d4a017" : "rgba(212,160,23,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "width 0.3s, background 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
