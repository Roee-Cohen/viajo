import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GlobeCanvas } from "./GlobeCanvas";
import { FloatingBook } from "./FloatingBook";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const globeY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, rgba(var(--card-rgb),0.5) 50%, var(--background) 100%)" }}
    >
      {/* Stars */}
      <Stars />

      {/* Globe + Book animation */}
      <motion.div
        style={{ y: globeY, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="relative flex items-center justify-center">
          <GlobeCanvas className="w-[380px] h-[380px] md:w-[540px] md:h-[540px] opacity-85" />

          {/* Orbiting book */}
          <motion.div
            className="absolute"
            style={{ top: "12%", right: "8%" }}
            animate={{
              x: [0, 40, 80, 60, 20, 0],
              y: [0, -50, -30, 20, 30, 0],
              rotate: [-5, 8, 15, 5, -8, -5],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <FloatingBook size="md" />
          </motion.div>

          {/* Flight path trail */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <svg viewBox="0 0 540 540" className="w-full h-full">
              <motion.path
                d="M 380 120 Q 450 80 420 200 Q 390 300 300 340"
                fill="none"
                stroke="rgba(var(--primary-rgb),0.25)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M 150 200 Q 80 280 160 360 Q 240 440 340 400"
                fill="none"
                stroke="rgba(var(--primary-rgb),0.18)"
                strokeWidth="1"
                strokeDasharray="4 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 3 }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Content overlay */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        {/* Primary label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "linear-gradient(to left, var(--primary), transparent)" }} />
          <span
            style={{
              color: "var(--primary)",
              letterSpacing: "3px",
              fontSize: "12px",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
            }}
          >
            VIAJO — המתנה המושלמת לטיול שלך
          </span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(to right, var(--primary), transparent)" }} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.2,
            color: "var(--foreground)",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            marginBottom: "1.2rem",
          }}
        >
          הרגעים הכי יפים שלך
          <br />
          <span style={{ color: "var(--primary)" }}>שווים מזכרת שתישאר לנצח</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(var(--fg-rgb),0.75)",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
          }}
        >כל מטייל יודע , אתה חוזר עם צליון תמונות לארץ אבל הסיפור האמיתי? הוא כבר מתחיל להישכח... 
        VIAJO יעזור לך לשמור אותו לנצח
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#checkout"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              color: "var(--primary-foreground)",
              padding: "14px 36px",
              borderRadius: "6px",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.5px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(var(--primary-rgb),0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
              (e.target as HTMLElement).style.boxShadow = "0 8px 30px rgba(var(--primary-rgb),0.5)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "";
              (e.target as HTMLElement).style.boxShadow = "0 4px 20px rgba(var(--primary-rgb),0.35)";
            }}
          >
            קנה את הספר שלך עכשיו
          </a>
          <a
            href="#problem"
            style={{
              color: "var(--foreground)",
              padding: "14px 30px",
              borderRadius: "6px",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
              textDecoration: "none",
              border: "1px solid rgba(var(--fg-rgb),0.25)",
              transition: "border-color 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--primary)";
              (e.target as HTMLElement).style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(var(--fg-rgb),0.25)";
              (e.target as HTMLElement).style.color = "var(--foreground)";
            }}
          >
            קרא את הסיפור שלנו
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: 0.5 }}
      >
        <ChevronDown size={28} color="var(--primary)" />
      </motion.div>
    </section>
  );
}

function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.1,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
