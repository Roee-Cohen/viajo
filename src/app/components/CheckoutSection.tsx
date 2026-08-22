import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Check, ShoppingCart, Package, Star, Zap, Shield, Truck } from "lucide-react";
import { FloatingBook } from "./FloatingBook";

const PLANS = [
  {
    id: "basic",
    name: "VIAJO בסיסי",
    price: 129,
    badge: null,
    features: [
      "ספר VIAJO קלאסי (A5, 200 עמוד)",
      "כריכה קשה באיכות פרמיום",
      "עמודי יומן + זיכרון + תמונות",
      "מפות מדינות ויבשות",
      "שאלות מנחות לכל יום",
      "משלוח חינם לישראל",
    ],
  },
  {
    id: "premium",
    name: "VIAJO פרמיום",
    price: 209,
    badge: "הפופולרי ביותר",
    features: [
      "כל מה שב-VIAJO בסיסי",
      "התאמה אישית מלאה (שם, יעדים, תאריכים)",
      "ערכת עטים פרמיום (3 עטים)",
      "50 מדבקות מיקום עולמיות",
      "מדריך המטייל הנינג'ה (PDF+PDF)",
      "עדיפות בייצור ומשלוח מהיר",
    ],
  },
  {
    id: "ultimate",
    name: "VIAJO אולטימייט",
    price: 349,
    badge: null,
    features: [
      "כל מה שב-VIAJO פרמיום",
      "2 ספרי VIAJO (לך ולחבר/ה!)",
      "ערכת גרב טיול מיוחדת",
      "כרטיס ייחודי + אריזת מתנה",
      "קהילת מטיילי VIAJO בוואטסאפ",
      "תמיכה אישית לפני ואחרי הנסיעה",
    ],
  },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  customization: string;
  plan: string;
};

export function CheckoutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [step, setStep] = useState<"plans" | "form" | "success">("plans");
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", address: "", city: "", customization: "", plan: "premium",
  });
  const [submitting, setSubmitting] = useState(false);

  const plan = PLANS.find((p) => p.id === selectedPlan)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setStep("success");
  };

  return (
    <section
      id="checkout"
      ref={ref}
      dir="rtl"
      className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, rgba(var(--card-rgb),0.4) 0%, var(--background) 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span style={{ color: "var(--primary)", letterSpacing: "3px", fontSize: "11px", fontFamily: "'Heebo', sans-serif", fontWeight: 600 }}>
            הזמן עכשיו
          </span>
          <h2
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "var(--foreground)",
              marginTop: 8,
            }}
          >
            בחר את ה-VIAJO שלך
          </h2>
          <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: "1rem", color: "rgba(var(--fg-rgb),0.6)", marginTop: 8 }}>
            משלוח חינם לכל ישראל בקנייה מעל 200 ש"ח • אחריות 30 יום • תשלום מאובטח
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "plans" && (
            <motion.div
              key="plans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Plans grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {PLANS.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    onClick={() => setSelectedPlan(p.id)}
                    style={{
                      position: "relative",
                      background: selectedPlan === p.id
                        ? "rgba(var(--card-rgb),0.95)"
                        : "rgba(var(--card-rgb),0.55)",
                      border: `2px solid ${selectedPlan === p.id ? "var(--primary)" : "rgba(var(--primary-rgb),0.18)"}`,
                      borderRadius: "14px",
                      padding: "28px 24px",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      transform: selectedPlan === p.id && p.id === "premium" ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    {p.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                          color: "var(--primary-foreground)",
                          fontFamily: "'Heebo', sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "4px 16px",
                          borderRadius: "20px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ⭐ {p.badge}
                      </div>
                    )}

                    {/* Plan icon */}
                    <div className="flex justify-center items-end gap-2 mb-4">
                      {p.id === "ultimate" ? (
                        <>
                          <FloatingBook size="sm" delay={0} />
                          <FloatingBook size="sm" delay={9} />
                        </>
                      ) : (
                        <FloatingBook size="sm" />
                      )}
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Frank Ruhl Libre', serif",
                        fontWeight: 800,
                        color: "var(--foreground)",
                        fontSize: "1.1rem",
                        textAlign: "center",
                        marginBottom: 6,
                      }}
                    >
                      {p.name}
                    </h3>

                    <div className="text-center mb-6">
                      <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "2.4rem", fontWeight: 900, color: "var(--primary)" }}>
                        ₪{p.price}
                      </span>
                    </div>

                    <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {p.features.map((f, fi) => (
                        <li key={fi} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <Check size={14} style={{ color: "var(--primary)", marginTop: 4, flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.85rem", color: "rgba(var(--fg-rgb),0.72)", lineHeight: 1.5 }}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {selectedPlan === p.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={12} color="var(--primary-foreground)" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  onClick={() => setStep("form")}
                  style={{
                    background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                    color: "var(--primary-foreground)",
                    padding: "16px 48px",
                    borderRadius: "8px",
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 25px rgba(var(--primary-rgb),0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 35px rgba(var(--primary-rgb),0.55)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 25px rgba(var(--primary-rgb),0.4)";
                  }}
                >
                  <ShoppingCart size={18} />
                  הזמן {plan.name} — ₪{plan.price}
                </button>

                {/* Trust */}
                <div className="flex justify-center gap-8 mt-8">
                  {[
                    { Icon: Shield, text: "תשלום מאובטח SSL" },
                    { Icon: Truck, text: "משלוח עד 10 ימים" },
                    { Icon: Zap, text: "אחריות 30 יום" },
                  ].map(({ Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-2" style={{ color: "rgba(var(--fg-rgb),0.45)", fontFamily: "'Heebo', sans-serif", fontSize: "0.8rem" }}>
                      <Icon size={14} color="var(--primary)" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: 600, margin: "0 auto" }}
            >
              {/* Order summary */}
              <div
                style={{
                  background: "rgba(var(--primary-rgb),0.1)",
                  border: "1px solid rgba(var(--primary-rgb),0.3)",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  marginBottom: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 700, color: "var(--foreground)", fontSize: "1rem" }}>
                    {plan.name}
                  </div>
                  <button
                    onClick={() => setStep("plans")}
                    style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.82rem", color: "var(--primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    שנה תכנית
                  </button>
                </div>
                <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "1.5rem", fontWeight: 900, color: "var(--primary)" }}>
                  ₪{plan.price}
                </span>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "שם מלא *", key: "name", type: "text", placeholder: "ישראל ישראלי" },
                  { label: "אימייל *", key: "email", type: "email", placeholder: "you@email.com" },
                  { label: "טלפון", key: "phone", type: "tel", placeholder: "050-0000000" },
                  { label: "כתובת למשלוח *", key: "address", type: "text", placeholder: "רחוב ומספר" },
                  { label: "עיר *", key: "city", type: "text", placeholder: "תל אביב" },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.88rem", color: "rgba(var(--fg-rgb),0.7)", display: "block", marginBottom: 6 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.label.includes("*")}
                      value={formData[field.key as keyof FormData]}
                      onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                      style={{
                        width: "100%",
                        background: "rgba(var(--card-rgb),0.8)",
                        border: "1px solid rgba(var(--primary-rgb),0.25)",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        color: "var(--foreground)",
                        fontFamily: "'Heebo', sans-serif",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(var(--primary-rgb),0.25)")}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.88rem", color: "rgba(var(--fg-rgb),0.7)", display: "block", marginBottom: 6 }}>
                    התאמה אישית (אופציונלי)
                  </label>
                  <textarea
                    placeholder="שם לכריכה, יעדי הנסיעה, תאריכים, הקדשה אישית..."
                    value={formData.customization}
                    onChange={(e) => setFormData((p) => ({ ...p, customization: e.target.value }))}
                    rows={3}
                    style={{
                      width: "100%",
                      background: "rgba(var(--card-rgb),0.8)",
                      border: "1px solid rgba(var(--primary-rgb),0.25)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      color: "var(--foreground)",
                      fontFamily: "'Heebo', sans-serif",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(var(--primary-rgb),0.25)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: submitting
                      ? "rgba(var(--primary-rgb),0.5)"
                      : "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                    color: "var(--primary-foreground)",
                    padding: "16px",
                    borderRadius: "8px",
                    fontFamily: "'Heebo', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(var(--primary-rgb),0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  {submitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ width: 20, height: 20, border: "2px solid var(--primary-foreground)", borderTopColor: "transparent", borderRadius: "50%" }}
                    />
                  ) : (
                    <>
                      <Package size={18} /> אשר הזמנה — ₪{plan.price}
                    </>
                  )}
                </button>

                <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.78rem", color: "rgba(var(--fg-rgb),0.4)", textAlign: "center" }}>
                  🔒 תשלום מאובטח. פרטי הכרטיס שלך מוצפנים ומאובטחים.
                </p>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
              style={{ maxWidth: 500, margin: "0 auto", padding: "40px 0" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(var(--primary-rgb),0.15)",
                  border: "2px solid var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  fontSize: "2rem",
                }}
              >
                ✈️
              </motion.div>

              <h2
                style={{
                  fontFamily: "'Frank Ruhl Libre', serif",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "var(--foreground)",
                  marginBottom: 12,
                }}
              >
                ההזמנה אושרה! 🎉
              </h2>

              <p style={{ fontFamily: "'Heebo', sans-serif", fontSize: "1rem", color: "rgba(var(--fg-rgb),0.65)", lineHeight: 1.7, marginBottom: 24 }}>
                תודה {formData.name}! ה-VIAJO שלך בדרך אליך.
                שלחנו לך אישור למייל <strong style={{ color: "var(--primary)" }}>{formData.email}</strong>.
                <br />
                תיהנה מהנסיעה. אנחנו נדאג לשמור אותה לנצח. ✨
              </p>

              <div style={{ display: "inline-flex", gap: 6, padding: "8px 20px", background: "rgba(var(--primary-rgb),0.1)", borderRadius: 20, border: "1px solid rgba(var(--primary-rgb),0.3)" }}>
                <Star size={14} fill="var(--primary)" color="var(--primary)" />
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: "0.85rem", color: "var(--primary)" }}>
                  {plan.name} — ₪{plan.price}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
