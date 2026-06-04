import { motion } from "motion/react";

interface FloatingBookProps {
  size?: "sm" | "md" | "lg";
}

export function FloatingBook({ size = "lg" }: FloatingBookProps) {
  const dims = { sm: [100, 130], md: [130, 168], lg: [160, 208] }[size];
  const w = dims[0], h = dims[1];
  const spineW = Math.round(w * 0.12);
  const pagesW = Math.round(w * 0.06);

  return (
    <div style={{ perspective: 1400, display: "inline-block" }}>
      <motion.div
        style={{ width: w, height: h, position: "relative" }}
        animate={{
          rotateY: [20, 26, 20],
          rotateX: [6, 10, 6],
          y: [0, -18, 0],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Main front cover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(145deg, #e8bc28 0%, #c8980c 30%, #8a5e08 68%, #c8980c 100%)",
            borderRadius: "2px 9px 9px 2px",
            boxShadow:
              "6px 6px 28px rgba(0,0,0,0.65), inset -5px 0 18px rgba(0,0,0,0.18), 0 0 20px rgba(212,160,23,0.18)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 14px 14px 22px",
          }}
        >
          {/* Decorative outer border */}
          <div
            style={{
              position: "absolute",
              inset: "10px 10px 10px 18px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "1px 5px 5px 1px",
            }}
          />
          {/* Corner ornaments */}
          {["top-[14px] left-[22px]", "top-[14px] right-[14px]", "bottom-[14px] left-[22px]", "bottom-[14px] right-[14px]"].map(
            (pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-2 h-2`}
                style={{
                  borderTop: i < 2 ? "1.5px solid rgba(255,255,255,0.35)" : "none",
                  borderBottom: i >= 2 ? "1.5px solid rgba(255,255,255,0.35)" : "none",
                  borderLeft: i % 2 === 0 ? "1.5px solid rgba(255,255,255,0.35)" : "none",
                  borderRight: i % 2 === 1 ? "1.5px solid rgba(255,255,255,0.35)" : "none",
                }}
              />
            )
          )}

          {/* Globe icon */}
          <div style={{ fontSize: size === "lg" ? 40 : 28, marginBottom: 8, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
            🌍
          </div>

          {/* Brand name */}
          <div
            style={{
              color: "#06091a",
              fontSize: size === "lg" ? 24 : 17,
              fontWeight: 800,
              letterSpacing: "4px",
              fontFamily: "'Frank Ruhl Libre', serif",
              textShadow: "0 1px 2px rgba(255,255,255,0.3)",
            }}
          >
            VIAJO
          </div>
          <div
            style={{
              color: "rgba(6,9,26,0.55)",
              fontSize: size === "lg" ? 9 : 7,
              letterSpacing: "2.5px",
              marginTop: 5,
              fontFamily: "'Heebo', sans-serif",
              textTransform: "uppercase",
            }}
          >
            My Journey
          </div>

          {/* Bottom decorative lines */}
          <div
            style={{
              position: "absolute",
              bottom: 22,
              left: 22,
              right: 14,
              height: 1,
              background: "rgba(6,9,26,0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 26,
              left: 28,
              right: 20,
              height: 0.5,
              background: "rgba(6,9,26,0.12)",
            }}
          />
        </div>

        {/* Spine */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -spineW,
            width: spineW + 2,
            height: "100%",
            background: "linear-gradient(to right, #4a2e06, #6a4008, #5a3508)",
            borderRadius: "4px 0 0 4px",
            boxShadow: `-3px 0 10px rgba(0,0,0,0.55)`,
          }}
        />

        {/* Pages (right edge) */}
        <div
          style={{
            position: "absolute",
            top: 3,
            right: -(pagesW + 2),
            width: pagesW + 2,
            height: "calc(100% - 6px)",
            background:
              "repeating-linear-gradient(to bottom, #f0e8d4, #f0e8d4 1.5px, #d8cdb2 1.5px, #d8cdb2 3px)",
            borderRadius: "0 3px 3px 0",
            boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
          }}
        />

        {/* Shadow on ground */}
        <motion.div
          style={{
            position: "absolute",
            bottom: -38,
            left: "5%",
            width: "90%",
            height: 22,
            background:
              "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(5px)",
          }}
          animate={{ scaleX: [1, 0.82, 1], opacity: [0.45, 0.25, 0.45] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
