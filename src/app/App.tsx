import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { FounderSection } from "./components/FounderSection";
import { SolutionSection } from "./components/SolutionSection";
import { ImageCarousel } from "./components/ImageCarousel";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { CheckoutSection } from "./components/CheckoutSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        fontFamily: "'Heebo', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FounderSection />
      <SolutionSection />
      <ImageCarousel />
      <TestimonialsSection />
      <FAQSection />
      <CheckoutSection />
      <Footer />
    </div>
  );
}
