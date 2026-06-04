import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#problem", label: "הבעיה" },
  { href: "#story", label: "הסיפור שלנו" },
  { href: "#solution", label: "המוצר" },
  { href: "#faq", label: "שאלות" },
  { href: "#checkout", label: "הזמן עכשיו" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(6,9,26,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,160,23,0.15)" : "none",
        transition: "background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s",
      }}
    >
      <div
        dir="rtl"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontSize: "1.3rem" }}>🌍</span>
          <span
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "#d4a017",
              letterSpacing: "2px",
            }}
          >
            VIAJO
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(240,230,211,0.7)",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#f0e6d3";
                (e.target as HTMLElement).style.background = "rgba(212,160,23,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(240,230,211,0.7)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#checkout"
            style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#06091a",
              textDecoration: "none",
              padding: "9px 22px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #d4a017, #b88010)",
              marginRight: 8,
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
          >
            הזמן עכשיו
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#f0e6d3" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(6,9,26,0.98)",
              borderTop: "1px solid rgba(212,160,23,0.15)",
              overflow: "hidden",
            }}
            dir="rtl"
          >
            <div style={{ padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Heebo', sans-serif",
                    fontSize: "1rem",
                    color: link.href === "#checkout" ? "#d4a017" : "rgba(240,230,211,0.8)",
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(212,160,23,0.08)",
                    fontWeight: link.href === "#checkout" ? 700 : 400,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
