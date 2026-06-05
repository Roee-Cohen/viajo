import { useEffect, useRef } from "react";

const TILT_DEG = 18;

const CONTINENTS: { color: string; points: [number, number][] }[] = [
  {
    color: "#2e6b1f",
    points: [
      [-168, 70], [-95, 72], [-60, 47], [-67, 45], [-75, 38],
      [-77, 35], [-82, 29], [-82, 25], [-80, 25], [-77, 22],
      [-87, 16], [-90, 16], [-96, 26], [-105, 20], [-118, 32],
      [-124, 36], [-124, 48], [-130, 54], [-140, 58], [-168, 58], [-168, 70],
    ],
  },
  {
    color: "#2e6b1f",
    points: [
      [-80, 11], [-75, 12], [-62, 10], [-50, 5], [-38, -5],
      [-38, -22], [-42, -23], [-40, -35], [-50, -55], [-65, -55],
      [-70, -48], [-75, -40], [-78, -10], [-80, 11],
    ],
  },
  {
    color: "#3a8a28",
    points: [
      [-10, 35], [30, 35], [32, 42], [28, 50], [25, 58],
      [10, 62], [-2, 55], [-10, 44], [-10, 35],
    ],
  },
  {
    color: "#2e6b1f",
    points: [
      [-18, 35], [38, 35], [50, 12], [52, 10], [44, -12],
      [40, -28], [28, -36], [18, -34], [12, -22], [-18, 12], [-18, 35],
    ],
  },
  {
    color: "#2e6b1f",
    points: [
      [28, 62], [55, 70], [80, 75], [140, 68], [148, 45],
      [142, 35], [130, 32], [122, 22], [100, 5], [78, 8],
      [65, 22], [58, 22], [45, 36], [38, 35], [28, 46], [28, 62],
    ],
  },
  {
    color: "#2e6b1f",
    points: [
      [115, -22], [128, -14], [142, -17], [152, -24],
      [153, -30], [152, -37], [140, -40], [128, -36],
      [118, -32], [115, -26], [115, -22],
    ],
  },
  {
    color: "#3a8a28",
    points: [
      [-55, 60], [-18, 60], [-14, 68], [-18, 76],
      [-35, 82], [-55, 83], [-70, 76], [-72, 65], [-55, 60],
    ],
  },
];

const CITIES: { lon: number; lat: number; name: string }[] = [
  { lon: 35.2, lat: 31.8, name: "ירושלים" },
  { lon: -43.2, lat: -22.9, name: "ריו" },
  { lon: 139.7, lat: 35.7, name: "טוקיו" },
  { lon: -74, lat: 40.7, name: "ניו יורק" },
  { lon: 2.3, lat: 48.9, name: "פריז" },
  { lon: 18.4, lat: -33.9, name: "קייפטאון" },
  { lon: -58.4, lat: -34.6, name: "בואנוס אירס" },
  { lon: 77.2, lat: 28.6, name: "דלהי" },
  { lon: 144.9, lat: -37.8, name: "מלבורן" },
];

export function GlobeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read city-dot color from CSS palette variable so it updates with the theme
    const cssVars = getComputedStyle(document.documentElement);
    const primaryColor = cssVars.getPropertyValue("--palette-primary").trim() || "#995f2f";
    const primaryRgb = cssVars.getPropertyValue("--primary-rgb").trim() || "153, 95, 47";

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;
    const tiltRad = (TILT_DEG * Math.PI) / 180;

    let rotation = 0;
    let animId: number;

    function project(lon: number, lat: number) {
      const lonRad = ((lon - rotation) * Math.PI) / 180;
      const latRad = (lat * Math.PI) / 180;
      const x = Math.cos(latRad) * Math.sin(lonRad);
      const y = Math.sin(latRad);
      const z = Math.cos(latRad) * Math.cos(lonRad);
      const yT = y * Math.cos(tiltRad) + z * Math.sin(tiltRad);
      const zT = -y * Math.sin(tiltRad) + z * Math.cos(tiltRad);
      return { sx: cx + x * R, sy: cy - yT * R, vis: zT > 0 };
    }

    function drawLines(isLat: boolean, values: number[], step: number, range: [number, number]) {
      ctx!.strokeStyle = "rgba(80, 140, 210, 0.1)";
      ctx!.lineWidth = 0.5;
      for (const v of values) {
        ctx!.beginPath();
        let mv = true;
        let prev = false;
        for (let w = range[0]; w <= range[1]; w += step) {
          const p = isLat ? project(w, v) : project(v, w);
          if (p.vis) {
            if (mv || !prev) { ctx!.moveTo(p.sx, p.sy); mv = false; }
            else ctx!.lineTo(p.sx, p.sy);
          }
          prev = p.vis;
        }
        ctx!.stroke();
      }
    }

    function drawContinent(pts: [number, number][], color: string) {
      const projected = pts.map(([lon, lat]) => project(lon, lat));
      ctx!.beginPath();
      let started = false;
      let prevVis = false;
      for (const p of projected) {
        if (p.vis) {
          if (!started || !prevVis) { ctx!.moveTo(p.sx, p.sy); started = true; }
          else ctx!.lineTo(p.sx, p.sy);
        }
        prevVis = p.vis;
      }
      ctx!.closePath();
      ctx!.fillStyle = color;
      ctx!.fill();
      ctx!.strokeStyle = "rgba(100, 200, 80, 0.25)";
      ctx!.lineWidth = 0.6;
      ctx!.stroke();
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const outerGlow = ctx!.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.3);
      outerGlow.addColorStop(0, "rgba(20, 80, 200, 0.25)");
      outerGlow.addColorStop(1, "rgba(10, 30, 80, 0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx!.fillStyle = outerGlow;
      ctx!.fill();

      const ocean = ctx!.createRadialGradient(cx - R * 0.25, cy - R * 0.2, 0, cx, cy, R);
      ocean.addColorStop(0, "#1e7ab5");
      ocean.addColorStop(0.55, "#0d4a80");
      ocean.addColorStop(1, "#041528");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = ocean;
      ctx!.fill();

      ctx!.save();
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.clip();

      drawLines(true, [-60, -30, 0, 30, 60], 2, [-180, 180]);
      drawLines(false, [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150], 2, [-80, 80]);

      for (const c of CONTINENTS) drawContinent(c.points, c.color);

      for (const city of CITIES) {
        const p = project(city.lon, city.lat);
        if (p.vis) {
          ctx!.beginPath();
          ctx!.arc(p.sx, p.sy, 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = primaryColor;
          ctx!.fill();
          ctx!.beginPath();
          ctx!.arc(p.sx, p.sy, 4.5, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${primaryRgb}, 0.4)`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }

      const spec = ctx!.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx - R * 0.18, cy - R * 0.18, R * 0.7);
      spec.addColorStop(0, "rgba(255,255,255,0.13)");
      spec.addColorStop(0.6, "rgba(255,255,255,0.02)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = spec;
      ctx!.fill();

      const limb = ctx!.createRadialGradient(cx, cy, R * 0.65, cx, cy, R);
      limb.addColorStop(0, "rgba(0,0,0,0)");
      limb.addColorStop(1, "rgba(0,0,30,0.45)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = limb;
      ctx!.fill();

      ctx!.restore();

      const atmFront = ctx!.createRadialGradient(cx, cy, R * 0.97, cx, cy, R * 1.12);
      atmFront.addColorStop(0, "rgba(60, 140, 255, 0.18)");
      atmFront.addColorStop(1, "rgba(60, 140, 255, 0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
      ctx!.fillStyle = atmFront;
      ctx!.fill();

      rotation += 0.08;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={600} height={600} className={className} />;
}
