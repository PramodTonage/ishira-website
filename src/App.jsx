// ─── ROOT APP COMPONENT ───

import { useEffect } from "react";
import { AppProvider } from "./AppContext";
import {
  GlobalStyles, DemoBanner, Navbar, HeroSection, MarqueeStrip,
  CategorySection, ProductGrid, ProductModal, CartDrawer,
  CheckoutModal, AboutSection, TestimonialsSection,
  ContactSection, Footer, AuthModal, AccountDrawer,
  AdminGate, AdminPanel, ToastContainer
} from "./Components";

function AppInner() {
  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('navbar');
      if (nav) nav.classList.toggle('navbar-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width:'100%', overflowX:'hidden' }}>
      <GlobalStyles />
      <DemoBanner />
      <Navbar />

      <main>
        <section id="home"><HeroSection /></section>
        <MarqueeStrip />
        <section id="categories" style={{padding: '16px 24px'}}>
          <CategorySection />
        </section>
        <section id="product-display" style={{padding: '20px 24px', background: 'var(--bg)'}}>
          <ProductGrid />
        </section>
        <section id="about" style={{padding: '40px 24px', background: 'var(--surface)'}}>
          <AboutSection />
        </section>
        <section id="testimonials" style={{padding: '40px 24px', background: 'var(--primary)'}}>
          <TestimonialsSection />
        </section>
        <section id="contact" style={{padding:'80px 40px', background:'var(--bg)'}}>
          <ContactSection />
        </section>
      </main>

      <Footer />

      {/* Modals and drawers — rendered outside main flow */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <AccountDrawer />
      <AdminGate />
      <AdminPanel />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

/*
╔══════════════════════════════════════════════════════════════╗
║           ISHIRA WEBSITE — HANDOFF CHECKLIST                 ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  BEFORE GIVING TO CLIENT:                                    ║
║  □ Replace VITE_WHATSAPP_NUMBER in .env with real number     ║
║  □ Replace VITE_ADMIN_PASSWORD in .env with strong password  ║
║  □ Fill all Firebase config values in .env                   ║
║  □ Test admin panel (5 logo clicks → password)               ║
║  □ Test WhatsApp order flow end to end                       ║
║  □ Test on mobile (Chrome DevTools → iPhone view)            ║
║                                                              ║
║  AFTER DEPLOYMENT:                                           ║
║  □ Add live domain to Firebase → Auth → Authorized Domains   ║
║  □ Test login/signup on live domain                          ║
║  □ Test image upload in admin panel                          ║
║  □ Place a test order and verify WhatsApp message            ║
║  □ Verify orders appear in admin panel                       ║
║                                                              ║
║  NEVER COMMIT .env TO GITHUB                                 ║
║  Add .env to .gitignore before pushing                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/
