export function Footer() {
  return (
    <footer
      dir="rtl"
      style={{
        background: "var(--background)",
        borderTop: "1px solid rgba(var(--primary-rgb),0.12)",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: "1.4rem" }}>🌍</span>
          <span
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "1.6rem",
              fontWeight: 900,
              color: "var(--primary)",
              letterSpacing: "3px",
            }}
          >
            VIAJO
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "0.88rem",
            color: "rgba(var(--fg-rgb),0.38)",
            lineHeight: 1.7,
            marginBottom: 20,
          }}
        >
          שומרים את הנסיעות הגדולות של החיים — לנצח.
          <br />
          כי כל מסע ראוי להיזכר כפי שהוא היה.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20 }}>
          {["פרטיות", "תנאי שימוש", "צור קשר", "אינסטגרם"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(var(--fg-rgb),0.4)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(var(--fg-rgb),0.4)")}
            >
              {link}
            </a>
          ))}
        </div>

        <div
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "0.78rem",
            color: "rgba(var(--fg-rgb),0.22)",
          }}
        >
          © 2024 VIAJO. כל הזכויות שמורות. מיוצר באהבה בישראל 🇮🇱
        </div>
      </div>
    </footer>
  );
}
