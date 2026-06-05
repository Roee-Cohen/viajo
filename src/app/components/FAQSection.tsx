import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "מה זה בעצם ספר VIAJO?",
    a: "ספר VIAJO הוא ספר מסע מוכן-לנסיעה שמשלב יומן כתיבה, עמודי תמונות, מפות מסלול, ועמודי זיכרון מיוחדים. הוא מגיע עם שאלות מנחות לכל יום בנסיעה, שיעזרו לך לתעד לא רק מה עשית — אלא גם מה הרגשת.",
  },
  {
    q: "האם הספר מתאים לנסיעות קצרות?",
    a: "VIAJO מתוכנן בעיקר לנסיעות ארוכות (מ-2 שבועות ומעלה), אבל הוא מתאים לכל מי שרוצה לשמור את זיכרונות הנסיעה בצורה מיוחדת. יש לנו גם גרסה קומפקטית לנסיעות קצרות יותר.",
  },
  {
    q: "מה הגודל והמשקל של הספר?",
    a: 'הספר הסטנדרטי הוא בגודל A5 (14.8×21 ס"מ) ומשקלו כ-350 גרם — קל מספיק לנשיאה בתיק יד, כבד מספיק כדי להרגיש משמעותי. עם כריכה קשה עמידה ונייר איכותי 120 גרם.',
  },
  {
    q: "כמה זמן לוקח להגיע הספר?",
    a: 'משלוח לישראל לוקח 5-10 ימי עסקים. יש אפשרות לשילוח מהיר תוך 2-3 ימים. אנחנו גם שולחים לחו"ל לכל מדינה — כולל ישירות אל כתובת ה-hostel שלך בדרך.',
  },
  {
    q: "האם ניתן להתאים אישית את הספר?",
    a: "כן! אפשר לציין שם, תאריכי נסיעה, יעדים, ואת שם הספר. בחבילות הפרמיום אפשר גם להוסיף תמונות מוכנות, ציטוטים אישיים, ועיצוב כריכה ייחודי.",
  },
  {
    q: "מה ההבדל בין החבילות השונות?",
    a: "החבילה הבסיסית כוללת את ספר VIAJO עם התוכן המלא. החבילה המורחבת מוסיפה ערכת עטים, מדבקות מיקום, ומדריך למטייל. החבילה האולטימייט כוללת הכל ועוד — כולל מיני-קיט סורבת שטחים לנסיעה.",
  },
  {
    q: "מה מדיניות ההחזרות?",
    a: "אנחנו מציעים 30 יום אחריות מלאה. אם הספר הגיע פגום או לא עמד בציפיות, נשלח לך ספר חדש ללא עלות נוספת. בשביל מוצרים מותאמים אישית, ההחזר הוא 100% אם יש פגם בייצור.",
  },
  {
    q: "האם אפשר לקנות כמתנה?",
    a: "בהחלט! VIAJO הוא מתנה מושלמת למטיילים. יש לנו אפשרות לאריזת מתנה יפה עם כרטיס אישי. גם אפשר להשאיר את שדה השם ריק ולתת לקבל המתנה למלא אותו בעצמו.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.5 }}
      style={{
        borderBottom: "1px solid rgba(var(--primary-rgb),0.15)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "right",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: open ? "var(--primary)" : "var(--foreground)",
            transition: "color 0.2s",
            flex: 1,
          }}
        >
          {q}
        </span>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: open ? "rgba(var(--primary-rgb),0.2)" : "rgba(var(--card-rgb),0.8)",
            border: "1px solid rgba(var(--primary-rgb),0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          {open ? <Minus size={14} color="var(--primary)" /> : <Plus size={14} color="var(--primary)" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(var(--fg-rgb),0.68)",
                lineHeight: 1.85,
                paddingBottom: 20,
                paddingRight: 4,
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      dir="rtl"
      className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, rgba(var(--card-rgb),0.4) 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span style={{ color: "var(--primary)", letterSpacing: "3px", fontSize: "11px", fontFamily: "'Heebo', sans-serif", fontWeight: 600 }}>
            שאלות ותשובות
          </span>
          <h2
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              fontWeight: 900,
              color: "var(--foreground)",
              marginTop: 8,
            }}
          >
            יש לך שאלות? יש לנו תשובות
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: "rgba(var(--card-rgb),0.5)",
            border: "1px solid rgba(var(--primary-rgb),0.15)",
            borderRadius: "16px",
            padding: "8px 32px 8px",
            backdropFilter: "blur(10px)",
          }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-10"
          style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "0.95rem",
            color: "rgba(var(--fg-rgb),0.55)",
          }}
        >
          לא מצאת תשובה?{" "}
          <a href="mailto:hello@viajo.co.il" style={{ color: "var(--primary)", textDecoration: "none" }}>
            שלח לנו הודעה
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />
    </section>
  );
}
