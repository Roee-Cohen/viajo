import { motion, useReducedMotion } from "motion/react";
import type { Easing } from "motion/react";
import coverFront from "../../assets/book/cover-front.webp";
import coverBack from "../../assets/book/cover-back.webp";
import foreEdgeTex from "../../assets/book/fore-edge.webp";

interface FloatingBookProps {
  size?: "sm" | "md" | "lg";
  /* Seconds into the cycle to start at — lets two books shown side by side
     turn out of phase instead of as mirrored duplicates. */
  delay?: number;
}

/* Cover proportions and thickness measured off the product photos
   (assets/book/*.jpg), perspective-rectified into the textures above. */
const COVER_RATIO = 474 / 720; // width / height
const DEPTH_RATIO = 0.07;      // spine thickness / height
const HEIGHTS = { sm: 140, md: 186, lg: 232 };

/* One rotation cycle: rest on the front cover, turn to the back, rest, turn home.
   Every animated track below shares these times so the shading and the ground
   shadow stay locked to the angle of the book. */
const TIMES = [0, 0.12, 0.29, 0.46, 0.58, 0.79, 1];
const EASE: Easing[] = ["linear", "easeIn", "easeOut", "linear", "easeIn", "easeOut"];
const CYCLE = { duration: 18, times: TIMES, ease: EASE, repeat: Infinity };

const SPIN = [20, 20, 110, 200, 200, 290, 380];   // 380 lands back on 20
const TILT = [8, 8, 11, 8, 8, 11, 8];             // leans into each turn
const BOB = [0, 0, -16, 0, 0, -16, 0];            // lifts mid-turn, settles at rest
const FRONT_SHADE = [0.06, 0.06, 0.5, 0.42, 0.42, 0.5, 0.06];
const BACK_SHADE = [0.42, 0.42, 0.5, 0.06, 0.06, 0.5, 0.42];
const SHADOW_SQUASH = [1, 1, 0.42, 1, 1, 0.42, 1];
const SHADOW_FADE = [0.5, 0.5, 0.26, 0.5, 0.5, 0.26, 0.5];

const PAPER_LIGHT = "#efe7d6";
const PAPER_MID = "#ddd1b8";
const PAPER_DARK = "#b3a68d";

/* Stacked page edges seen head-on, plus the darker cover board top and bottom. */
const PAGE_STACK =
  `linear-gradient(to bottom, ${PAPER_DARK} 0 7%, rgba(0,0,0,0) 7% 93%, ${PAPER_DARK} 93% 100%),` +
  `repeating-linear-gradient(to bottom, ${PAPER_LIGHT} 0 1.1px, ${PAPER_MID} 1.1px 2.2px)`;

export function FloatingBook({ size = "lg", delay = 0 }: FloatingBookProps) {
  const reduced = useReducedMotion();
  const cycle = delay ? { ...CYCLE, delay: -delay } : CYCLE;

  const h = HEIGHTS[size];
  const w = Math.round(h * COVER_RATIO);
  const t = Math.round(h * DEPTH_RATIO);

  const face: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backfaceVisibility: "hidden",
    boxShadow: "0 14px 34px rgba(0,0,0,0.5)",
  };

  /* The edge faces are as thick as the book, and sit a half pixel inside the
     covers while overhanging them by the same amount, so the seams between
     faces never round apart and let the background show through. */
  const sideFace: React.CSSProperties = {
    position: "absolute",
    top: -0.5,
    left: (w - t) / 2 - 0.5,
    width: t + 1,
    height: h + 1,
  };

  const capFace: React.CSSProperties = {
    position: "absolute",
    left: -0.5,
    top: (h - t) / 2 - 0.5,
    width: w + 1,
    height: t + 1,
    background: PAGE_STACK,
  };

  return (
    <div
      role="img"
      aria-label="ספר המסע Viajo"
      style={{
        position: "relative",
        display: "inline-block",
        perspective: h * 6,
      }}
    >
      <motion.div
        style={{
          width: w,
          height: h,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        animate={
          reduced
            ? { rotateY: 20, rotateX: 8, y: 0 }
            : { rotateY: SPIN, rotateX: TILT, y: BOB }
        }
        transition={reduced ? { duration: 0 } : cycle}
      >
        {/* Front cover — spine edge on the right, as the book is bound right-to-left */}
        <div
          style={{
            ...face,
            backgroundImage: `url(${coverFront})`,
            borderRadius: "4px 1px 1px 4px",
            transform: `translateZ(${t / 2}px)`,
          }}
        >
          {/* Sheen off the protective wrap */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background:
                "linear-gradient(115deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.16) 44%, rgba(255,255,255,0) 62%)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background:
                "linear-gradient(105deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.62) 100%)",
              pointerEvents: "none",
            }}
            animate={reduced ? { opacity: 0.06 } : { opacity: FRONT_SHADE }}
            transition={reduced ? { duration: 0 } : cycle}
          />
        </div>

        {/* Back cover — its own spine edge sits on the left, so it lines up once flipped */}
        <div
          style={{
            ...face,
            backgroundImage: `url(${coverBack})`,
            borderRadius: "1px 4px 4px 1px",
            transform: `rotateY(180deg) translateZ(${t / 2}px)`,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background:
                "linear-gradient(105deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.62) 100%)",
              pointerEvents: "none",
            }}
            animate={reduced ? { opacity: 0.42 } : { opacity: BACK_SHADE }}
            transition={reduced ? { duration: 0 } : cycle}
          />
        </div>

        {/* Fore-edge — photographed page block */}
        <div
          style={{
            ...sideFace,
            backgroundImage: `url(${foreEdgeTex})`,
            backgroundSize: "100% 100%",
            transform: `rotateY(-90deg) translateZ(${(w - 1) / 2}px)`,
          }}
        />

        {/* Spine — the wrapped fold, shaded as a rounded surface between the covers */}
        <div
          style={{
            ...sideFace,
            background:
              `linear-gradient(to right, #94876f 0%, ${PAPER_MID} 22%, ${PAPER_LIGHT} 48%,` +
              ` ${PAPER_MID} 74%, #8d8069 100%)`,
            transform: `rotateY(90deg) translateZ(${(w - 1) / 2}px)`,
          }}
        />

        {/* Head and tail */}
        <div style={{ ...capFace, transform: `rotateX(90deg) translateZ(${(h - 1) / 2}px)` }} />
        <div style={{ ...capFace, transform: `rotateX(-90deg) translateZ(${(h - 1) / 2}px)` }} />
      </motion.div>

      {/* Contact shadow — narrows as the book turns edge-on */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          x: "-50%",
          bottom: -Math.round(h * 0.11),
          width: Math.round(w * 1.15),
          height: Math.round(h * 0.08),
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0) 72%)",
          borderRadius: "50%",
          filter: "blur(5px)",
          pointerEvents: "none",
        }}
        animate={
          reduced
            ? { scaleX: 1, opacity: 0.45 }
            : { scaleX: SHADOW_SQUASH, opacity: SHADOW_FADE }
        }
        transition={reduced ? { duration: 0 } : cycle}
      />
    </div>
  );
}
