// ─── ALL UI COMPONENTS FOR ISHIRA HOUSE OF FASHION ───

import { useState, useCallback, useEffect } from 'react';
import { useApp } from './AppContext';
import { submitMessage, saveMeasurements } from './firebase';

// ═══════════════════════════════════════════════════════════
// GLOBAL STYLES
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: GlobalStyles ───
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

      :root {
        --primary: #1A0A00;
        --gold: #C8922A;
        --gold-light: #e8b84b;
        --accent: #8B1A1A;
        --bg: #FAF6F0;
        --surface: #FFFFFF;
        --muted: #6B5744;
        --border: #E8DDD0;
        --font-display: 'Cormorant Garamond', serif;
        --font-body: 'DM Sans', sans-serif;
      }

      * { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior: smooth; scroll-padding-top: 80px; }
      body { background: var(--bg); color: var(--primary); font-family: var(--font-body); overflow-x: hidden; }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

      @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes slideRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
      @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
      @keyframes marqueeScroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
      @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
      @keyframes toastIn { from{transform:translateX(120%);opacity:0} to{transform:translateX(0);opacity:1} }
      @keyframes spin { to { transform:rotate(360deg); } }

      .fade-up { animation: fadeUp 0.8s ease both; }
      .delay-1 { animation-delay: 0.2s; }
      .delay-2 { animation-delay: 0.4s; }
      .delay-3 { animation-delay: 0.6s; }

      .btn-primary {
        background: var(--gold); color: white; border: none;
        padding: 14px 36px; font-family: var(--font-body);
        font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
        cursor: pointer; transition: all 0.3s;
      }
      .btn-primary:hover { background: var(--primary); transform: translateY(-2px); }
      .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

      .btn-outline {
        background: transparent; color: var(--primary);
        border: 1px solid var(--primary); padding: 14px 36px;
        font-family: var(--font-body); font-size: 12px;
        letter-spacing: 2px; text-transform: uppercase;
        cursor: pointer; transition: all 0.3s;
      }
      .btn-outline:hover { background: var(--primary); color: white; transform: translateY(-2px); }

      .section-label { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
      .section-title { font-family: var(--font-display); font-size: clamp(32px,5vw,52px); font-weight: 300; color: var(--primary); line-height: 1.2; }
      .section-title em { font-style: italic; }

      input, textarea, select {
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--primary);
        outline: none;
        transition: border-color 0.2s;
      }
      input:focus, textarea:focus, select:focus { border-color: var(--gold) !important; }

      /* Mobile CSS fixes */
      @media (max-width: 768px) {
        html, body {
          overflow-x: hidden;
          width: 100%;
        }
        
        #navbar {
          padding: 12px 16px !important;
        }
        
        #hero {
          padding: 80px 16px 40px !important;
          min-height: 100svh;
        }
        
        .hero-title {
          font-size: 36px !important;
        }
        
        section {
          padding: 24px 16px !important;
        }
        
        .product-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 10px !important;
        }
        
        .product-img {
          height: 160px !important;
        }
        
        .hero-btns {
          flex-direction: column !important;
          align-items: center !important;
        }
        
        .cat-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .about-visual {
          display: none !important;
        }
        
        .testi-grid {
          grid-template-columns: 1fr !important;
        }
        
        .contact-grid {
          grid-template-columns: 1fr !important;
        }
        
        .footer-top {
          flex-direction: column !important;
          gap: 24px !important;
        }
        
        .modal-box {
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          top: auto !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          max-height: 90vh !important;
          overflow-y: auto !important;
          grid-template-columns: 1fr !important;
          animation: slideUp 0.3s ease !important;
        }
        
        .modal-img {
          display: none !important;
        }
        
        .cart-drawer {
          width: 100% !important;
        }
        
        .account-drawer {
          width: 100% !important;
        }
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .admin-table-wrapper {
          overflow-x: auto !important;
        }
        
        .cat-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .hero-btns {
          flex-direction: column !important;
          align-items: center !important;
          width: 100% !important;
        }
        
        .hero-btns button {
          width: 100% !important;
          max-width: 280px !important;
        }

        .about-grid {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
          text-align: center;
        }

        .about-grid > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 90vw;
          box-sizing: border-box;
        }

        .contact-grid {
          grid-template-columns: 1fr !important;
          gap: 32px !important;
          align-items: center !important;
        }

        .contact-grid > * {
          width: 100%;
          max-width: 90vw;
          box-sizing: border-box;
        }

        .admin-form-grid {
          grid-template-columns: 1fr !important;
        }

        section *, .contact-grid *, .about-grid * {
          box-sizing: border-box;
        }
      }
    `}</style>
  );
}

// ═══════════════════════════════════════════════════════════
// DEMO BANNER
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: DemoBanner ───
function DemoBanner() {
  const { isDemoMode } = useApp();

  if (!isDemoMode) return null;

  return (
    <div style={{
      background: '#FEF3CD',
      color: '#856404',
      borderBottom: '1px solid #FECA57',
      padding: '12px 20px',
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      letterSpacing: '1px',
      width: '100%'
    }}>
      ⚠ Demo Mode — Firebase not configured. Connect Firebase to go live.
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: Navbar ───
function Navbar() {
  const { currentUser, wishlist, products, getCartCount, handleLogoClick, setActiveModal, setAccountOpen, setActiveAccountTab, cartOpen, setCartOpen, authLoading, showToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive valid wishlist count to handle deleted products
  const validWishlistCount = wishlist.filter(id => products.some(p => p.id === id)).length;

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Collections', onClick: () => document.getElementById('product-display')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.onClick) {
      link.onClick();
    }
  };

  const handleAccountClick = () => {
    if (!authLoading) {
      if (currentUser) {
        setActiveAccountTab('profile');
        setAccountOpen(true);
      } else {
        setActiveModal('auth');
      }
    }
  };

  return (
    <>
      <nav id="navbar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: '#FAF6F0',
        borderBottom: '1px solid transparent',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px'
      }}>
        {/* Logo */}
        <div onClick={handleLogoClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--gold)', letterSpacing: '4px', fontWeight: 600 }}>ISHIRA</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>House of Fashion</div>
        </div>

        {/* Center Nav Links - Desktop Only */}
        <div style={{
          display: 'none',
          gap: '40px',
          '@media (min-width: 769px)': { display: 'flex' }
        }}>
          {navLinks.map(link => (
            link.onClick ? (
              <button key={link.label} onClick={handleNavClick.bind(null, link)} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0
              }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--primary)'}>
                {link.label}
              </button>
            ) : (
              <a key={link.href} href={link.href} onClick={handleNavClick} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                cursor: 'pointer'
              }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--primary)'}>
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* Right Icons */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {/* Account */}
          <button onClick={handleAccountClick} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            fontSize: '18px',
            ...(currentUser && { background: 'var(--gold)', color: 'white', fontFamily: 'var(--font-display)' })
          }}>
            {currentUser ? currentUser.email?.[0].toUpperCase() : '👤'}
          </button>

          {/* Wishlist */}
          <button onClick={() => {
            if (!currentUser) {
              setActiveModal('auth');
              showToast('Sign in to view your wishlist', 'info');
            } else {
              setActiveAccountTab('wishlist');
              setAccountOpen(true);
            }
          }} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            position: 'relative'
          }}>
            ♡
            {validWishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--gold)',
                color: 'white',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {validWishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button onClick={() => setCartOpen(!cartOpen)} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            position: 'relative'
          }}>
            🛍️
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--gold)',
                color: 'white',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Hamburger - Mobile Only */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            '@media (max-width: 768px)': { display: 'block' }
          }}>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100vh',
          background: 'white',
          zIndex: 99,
          paddingTop: '80px',
          paddingLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {navLinks.map(link => (
            link.onClick ? (
              <button key={link.label} onClick={() => {
                handleNavClick(link);
                setMobileMenuOpen(false);
              }} style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                color: 'var(--primary)',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0
              }}>
                {link.label}
              </button>
            ) : (
              <a key={link.href} href={link.href} onClick={() => {
                handleNavClick(link);
                setMobileMenuOpen(false);
              }} style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                color: 'var(--primary)',
                textDecoration: 'none'
              }}>
                {link.label}
              </a>
            )
          ))}
        </div>
      )}

      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(0,0,0,0.3)',
          zIndex: 98
        }} />
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: HeroSection ───
function HeroSection() {
  const { WHATSAPP_NUMBER } = useApp();

  return (
    <section style={{
      height: '70vh',
      minHeight: '520px',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '40px'
    }}>
      {/* Hero Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.2,
        background: 'url(https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80) center/cover no-repeat'
      }} />

      {/* Decorative borders */}
      <div style={{
        position: 'absolute',
        inset: '20px',
        border: '1px solid var(--border)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        inset: '28px',
        border: '1px solid rgba(200,146,42,0.2)',
        pointerEvents: 'none'
      }} />

      {/* Corner brackets */}
      {[
        { top: '20px', left: '20px' },
        { top: '20px', right: '20px' },
        { bottom: '20px', left: '20px' },
        { bottom: '20px', right: '20px' }
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          border: '2px solid var(--gold)',
          ...pos,
          borderTop: pos.top !== undefined && pos.top === '20px' ? '2px solid var(--gold)' : 'none',
          borderLeft: pos.left !== undefined && pos.left === '20px' ? '2px solid var(--gold)' : 'none',
          borderBottom: pos.bottom !== undefined && pos.bottom === '20px' ? '2px solid var(--gold)' : 'none',
          borderRight: pos.right !== undefined && pos.right === '20px' ? '2px solid var(--gold)' : 'none'
        }} />
      ))}

      {/* Watermark */}
      <div style={{
        position: 'absolute',
        fontFamily: 'var(--font-display)',
        fontSize: '200px',
        fontStyle: 'italic',
        color: 'rgba(200,146,42,0.04)',
        pointerEvents: 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        whiteSpace: 'nowrap'
      }}>
        Ishira
      </div>

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '600px', padding: '40px' }}>
        {/* Badge */}
        <div className="fade-up" style={{
          display: 'inline-block',
          border: '1px solid var(--border)',
          borderRadius: '50px',
          padding: '8px 16px',
          marginBottom: '16px',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          Est. 2024 · Hassan, Karnataka
        </div>

        {/* H1 */}
        <h1 className="fade-up delay-1" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 8vw, 60px)',
          fontWeight: 300,
          lineHeight: 1.2,
          marginBottom: '12px',
          color: 'var(--primary)'
        }}>
          Dressed in Stories,<br />Woven in <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Gold</em>
        </h1>

        {/* Subtitle */}
        <p className="fade-up delay-2" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          letterSpacing: '1px',
          color: 'var(--muted)',
          marginBottom: '24px'
        }}>
          Handcrafted Sarees & Blouses · Custom Stitching · Hassan
        </p>

        {/* Buttons */}
        <div className="fade-up delay-3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#product-display" className="btn-primary" style={{ textDecoration: 'none' }}>Explore Collections</a>
          <button onClick={() => {
            const msg = encodeURIComponent(
              "Hi Ishira House of Fashion! 🌸\n\nI'd like to enquire about *custom stitching*.\nCould you please share the details and pricing?"
            );
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
          }} className="btn-outline" style={{ textDecoration: 'none', cursor: 'pointer' }}>Custom Order via WhatsApp</button>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// MARQUEE STRIP
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: MarqueeStrip ───
function MarqueeStrip() {
  const marqueeText = "Sarees ◆ Blouse Designs ◆ Saree Kuchu ◆ Kids Wear ◆ Custom Stitching ◆ Hassan · Karnataka ◆ ";

  return (
    <div style={{
      background: 'var(--primary)',
      color: 'var(--gold)',
      padding: '16px 0',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    }}>
      <div style={{ animation: 'marqueeScroll 20s linear infinite', display: 'inline-block' }}>
        {marqueeText}{marqueeText}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CATEGORY SECTION
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: CategorySection ───
function CategorySection() {
  const { activeFilter, setActiveFilter } = useApp();

  const categories = [
    { name: 'All Items', value: 'All', letter: 'A', bg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80' },
    { name: 'Sarees', value: 'Saree', letter: 'S', bg: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80' },
    { name: 'Blouse Designs', value: 'Blouse', letter: 'B', bg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80' },
    { name: 'Saree Kuchu', value: 'Kuchu', letter: 'K', bg: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80' },
    { name: 'Kids Wear', value: 'Kids', letter: 'L', bg: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80' }
  ];

  return (
    <>
      <style>
        {`
          .cat-card-base { min-height: 180px; }
          @media (max-width: 768px) {
            .cat-card-base { min-height: 140px; }
            .cat-kids { grid-column: 1 / -1 !important; }
            .cat-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 15px !important;
            }
          }
        `}
      </style>
      <div className="cat-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', padding: '12px 0' }}>
        {categories.map(cat => (
          <div
            key={cat.value}
            className={`cat-card-base ${cat.value === 'Kids' ? 'cat-kids' : ''}`}
            onClick={() => {
              setActiveFilter(cat.value);
              // Smooth scroll to product section after filter updates
              setTimeout(() => {
                const el = document.getElementById('product-display');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
            style={{
              backgroundImage: `url(${cat.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              padding: '24px',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden',
              transition: 'all 0.3s',
              transform: activeFilter === cat.value ? 'translateY(-6px)' : 'none',
              borderColor: activeFilter === cat.value ? 'var(--gold)' : 'var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,10,0,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = activeFilter === cat.value ? 'var(--gold)' : 'var(--border)';
              e.currentTarget.style.transform = activeFilter === cat.value ? 'translateY(-6px)' : 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Dark overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: activeFilter === cat.value ? 'rgba(200,146,42,0.7)' : 'rgba(26,10,0,0.45)',
              transition: 'background 0.3s',
              zIndex: 0
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center' }}>
              <div style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif', fontSize: '48px', fontStyle: 'italic', marginBottom: '8px', opacity: 0.8 }}>{cat.letter}</div>
              <div style={{ fontFamily: '"DM Sans", "Inter", sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>{cat.name}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// SPINNER
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: Spinner ───
function Spinner() {
  return (
    <div style={{
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  );
}

// ═══════════════════════════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: ProductCard ───
function ProductCard({ product }) {
  const { setActiveModal, setSelectedProduct, addToCart, handleWishlistToggle, wishlist, WHATSAPP_NUMBER } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickOrder = () => {
    const msg = `Hi Ishira House of Fashion! 🌸\n\nI'd like to order:\n*${product.name}*\nCategory: ${product.category}\nPrice: ₹${product.price.toLocaleString('en-IN')}\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getInitial = () => {
    const map = { 'S': 'S', 'B': 'B', 'K': 'K', 'L': 'L' };
    return map[product.category?.[0]] || 'I';
  };

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      transition: 'all 0.3s',
      cursor: 'pointer'
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--gold)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,10,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image Area */}
      <div style={{
        height: '280px',
        background: product.imageUrl
          ? `url(${product.imageUrl}) center / cover`
          : 'url(https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=60) center / cover',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {!product.imageUrl && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(26,10,0,0.35)',
            zIndex: 1
          }} />
        )}
        {!product.imageUrl && (
          <div style={{
            position: 'relative',
            zIndex: 2,
            fontFamily: 'var(--font-display)',
            fontSize: '80px',
            color: 'rgba(255,255,255,0.8)',
            fontStyle: 'italic'
          }}>
            {getInitial()}
          </div>
        )}

        {/* Wishlist Button */}
        <button onClick={() => handleWishlistToggle(product.id)} style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          color: isWishlisted ? 'var(--accent)' : 'inherit'
        }} onMouseEnter={e => e.target.style.background = 'white'} onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.9)'}>
          {/* FIX: Bug 5 - Show filled heart when wishlisted */}
          {isWishlisted ? '♥' : '♡'}
        </button>

        {/* View Details Overlay */}
        <button onClick={() => {
          setSelectedProduct(product);
          setActiveModal('product');
        }} style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--gold)',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'bottom 0.3s'
        }}>
          View Details
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>
          {product.category}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', marginBottom: '8px', color: 'var(--primary)' }}>
          {product.name}
        </div>
        <div style={{ fontSize: '12px', marginBottom: '12px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 500 }}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span style={{ marginLeft: '8px', color: 'var(--muted)', textDecoration: 'line-through', fontSize: '11px' }}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => addToCart(product)} className="btn-outline" style={{
            flex: 1,
            padding: '10px',
            borderRadius: '2px',
            fontSize: '11px',
            background: 'transparent',
            color: 'var(--primary)',
            border: '1px solid var(--border)'
          }}>
            + Add
          </button>
          <button onClick={handleQuickOrder} style={{
            flex: 1,
            padding: '10px',
            borderRadius: '2px',
            fontSize: '11px',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} onMouseEnter={e => e.target.style.background = 'var(--accent)'} onMouseLeave={e => e.target.style.background = 'var(--primary)'}>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PRODUCT GRID
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: ProductGrid ───
function ProductGrid() {
  const { products, productsLoading, activeFilter, setActiveFilter } = useApp();
  const [sortBy, setSortBy] = useState('newest');

  // Products are already filtered by Firestore query via activeFilter
  // Only apply client-side sorting
  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <style>{`
        .filter-scroll-container {
          scrollbar-width: none; /* Firefox */
        }
        .filter-scroll-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
      `}</style>
      {/* Filter Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="filter-scroll-container" style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          whiteSpace: 'nowrap', 
          paddingRight: '20px',
          maxWidth: '100%' 
        }}>
          {/* FIX: Bug 2 - Filter pills must use exact category strings */}
          {[
            { label: 'ALL', value: 'All' },
            { label: 'SAREES', value: 'Saree' },
            { label: 'BLOUSES', value: 'Blouse' },
            { label: 'KUCHU', value: 'Kuchu' },
            { label: 'KIDS WEAR', value: 'Kids' }
          ].map(f => (
            <button key={f.value} onClick={() => setActiveFilter(f.value)} style={{
              flexShrink: 0,
              background: activeFilter === f.value ? 'var(--gold)' : 'transparent',
              color: activeFilter === f.value ? 'white' : 'var(--primary)',
              border: `1px solid ${activeFilter === f.value ? 'var(--gold)' : 'var(--border)'}`,
              padding: '6px 12px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.2s'
            }}>
              {f.label}
            </button>
          ))}
        </div>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          padding: '6px 12px',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          cursor: 'pointer'
        }}>
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {productsLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              background: 'linear-gradient(90deg, #f0e8dc 25%, #e8ddd0 50%, #f0e8dc 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              height: 380,
              border: '1px solid var(--border)'
            }} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontStyle: 'italic',
          color: 'var(--muted)'
        }}>
          No pieces found in this collection
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {sorted.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: ProductModal ───
function ProductModal() {
  const { activeModal, selectedProduct, setActiveModal, addToCart, handleWishlistToggle, wishlist, WHATSAPP_NUMBER } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (activeModal !== 'product' || !selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleQuickOrder = () => {
    const msg = `Hi Ishira House of Fashion! 🌸\n\nI'd like to order:\n*${selectedProduct.name}* × ${quantity}\nCategory: ${selectedProduct.category}\nPrice: ₹${(selectedProduct.price * quantity).toLocaleString('en-IN')}\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <div onClick={() => setActiveModal(null)} style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          background: 'var(--surface)',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {/* Close Button */}
          <button onClick={() => setActiveModal(null)} style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontWeight: 'bold',
            zIndex: 1
          }}>
            ✕
          </button>

          {/* Left: Image */}
          <div style={{
            background: selectedProduct.imageUrl
              ? `url(${selectedProduct.imageUrl}) center / cover`
              : 'linear-gradient(135deg, var(--gold-light), var(--gold))',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {!selectedProduct.imageUrl && (
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '120px',
                color: 'rgba(255,255,255,0.1)',
                fontStyle: 'italic'
              }}>
                {selectedProduct.category[0]}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
                {selectedProduct.category}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '12px', color: 'var(--primary)' }}>
                {selectedProduct.name}
              </h2>
              <div style={{ fontSize: '18px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                {selectedProduct.originalPrice && (
                  <span style={{ marginLeft: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '24px', fontSize: '14px' }}>
                {selectedProduct.description}
              </p>

              {/* Quantity Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                  width: '32px',
                  height: '32px',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>−</button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 500 }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} style={{
                  width: '32px',
                  height: '32px',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => { addToCart(selectedProduct, quantity); setActiveModal(null); }} className="btn-primary" style={{ width: '100%' }}>
                Add to Cart
              </button>
              <button onClick={() => handleWishlistToggle(selectedProduct.id)} className="btn-outline" style={{
                width: '100%',
                color: isWishlisted ? 'var(--accent)' : 'var(--primary)',
                borderColor: isWishlisted ? 'var(--accent)' : 'var(--primary)'
              }}>
                {isWishlisted ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}
              </button>
              <button onClick={handleQuickOrder} style={{
                width: '100%',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '14px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }} onMouseEnter={e => e.target.style.background = 'var(--accent)'} onMouseLeave={e => e.target.style.background = 'var(--primary)'}>
                🌐 Quick Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// CART DRAWER
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: CartDrawer ───
function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateCartQty, getCartTotal, setActiveModal, clearCart } = useApp();

  return (
    <>
      {cartOpen && (
        <div onClick={() => setCartOpen(false)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 199
        }} />
      )}

      <div style={{
        position: 'fixed',
        right: cartOpen ? 0 : '-420px',
        top: 0,
        width: 'min(420px, 100%)',
        height: '100vh',
        background: 'var(--surface)',
        boxShadow: '-4px 0 16px rgba(0,0,0,0.15)',
        zIndex: 200,
        transition: 'right 0.3s',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--primary)' }}>
            Your Cart
            {cart.length > 0 && (
              <span style={{
                marginLeft: '8px',
                background: 'var(--gold)',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}>
                {cart.length}
              </span>
            )}
          </h2>
          <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Items or Empty State */}
        {cart.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 20px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
            <div style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '20px' }}>Your cart is empty</div>
            <button onClick={() => {
              setCartOpen(false);
              setTimeout(() => {
                document.getElementById('product-display')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }} className="btn-primary">
              Browse Collections
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--border)'
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: item.imageUrl
                      ? `url(${item.imageUrl}) center / cover`
                      : 'var(--gold-light)',
                    borderRadius: '4px',
                    flexShrink: 0
                  }} />

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '4px', fontSize: '13px' }}>
                      {item.name}
                      <button onClick={() => removeFromCart(item.id)} style={{
                        marginLeft: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        ✕
                      </button>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
                      {item.category}
                    </div>

                    {/* Qty and Price */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button onClick={() => updateCartQty(item.id, -1)} style={{
                          width: '20px',
                          height: '20px',
                          border: '1px solid var(--border)',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: '10px'
                        }}>−</button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '12px' }}>{item.quantity}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} style={{
                          width: '20px',
                          height: '20px',
                          border: '1px solid var(--border)',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: '10px'
                        }}>+</button>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 500 }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--muted)' }}>Subtotal:</span>
                <span style={{ fontWeight: 500, color: 'var(--primary)' }}>₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <button onClick={() => {
                setCartOpen(false);
                setActiveModal('checkout');
              }} className="btn-primary" style={{ width: '100%' }}>
                Proceed to Checkout
              </button>
              <button onClick={() => setCartOpen(false)} style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--gold)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// CHECKOUT MODAL
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: CheckoutModal ───
function CheckoutModal() {
  const { activeModal, setActiveModal, cart, getCartTotal, handlePlaceOrder, userProfile } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    address: '',
    city: '',
    pincode: '',
    email: userProfile?.email || ''
  });
  const [formErrors, setFormErrors] = useState({});

  if (activeModal !== 'checkout') return null;

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Required';
    if (!formData.phone.trim()) errors.phone = 'Required';
    if (formData.phone.replaceAll(/\D/g, '').length !== 10) errors.phone = '10 digits required';
    if (!formData.address.trim()) errors.address = 'Required';
    if (!formData.city.trim()) errors.city = 'Required';
    if (!formData.pincode.trim()) errors.pincode = 'Required';
    if (formData.pincode.replaceAll(/\D/g, '').length !== 6) errors.pincode = '6 digits required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleStep2Submit = async () => {
    setLoading(true);
    await handlePlaceOrder(formData);
    setLoading(false);
    setStep(1);
    setFormData({
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      address: '',
      city: '',
      pincode: '',
      email: userProfile?.email || ''
    });
  };

  return (
    <>
      <div onClick={() => setActiveModal(null)} style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          background: 'var(--surface)',
          borderRadius: '8px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '40px'
        }}>
          {/* Step Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', gap: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 1 ? 'var(--gold)' : 'var(--border)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontFamily: 'var(--font-body)'
            }}>
              1
            </div>
            <div style={{ width: '40px', height: '1px', background: step >= 2 ? 'var(--gold)' : 'var(--border)' }} />
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 2 ? 'var(--gold)' : 'var(--border)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontFamily: 'var(--font-body)'
            }}>
              2
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px', color: 'var(--primary)', textAlign: 'center' }}>
            {step === 1 ? 'Delivery Details' : 'Review & Confirm'}
          </h2>

          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { key: 'name', label: 'Full Name', required: true },
                { key: 'phone', label: 'Phone Number', required: true },
                { key: 'city', label: 'City', required: true },
                { key: 'pincode', label: 'Pincode', required: true },
                { key: 'email', label: 'Email', required: false }
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--primary)' }}>
                    {field.label} {field.required && '*'}
                  </label>
                  <input
                    type={field.key === 'email' ? 'email' : 'text'}
                    value={formData[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: `1px solid ${formErrors[field.key] ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: '4px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--primary)',
                      boxSizing: 'border-box'
                    }}
                  />
                  {formErrors[field.key] && (
                    <div style={{ color: 'var(--accent)', fontSize: '11px', marginTop: '4px' }}>
                      {formErrors[field.key]}
                    </div>
                  )}
                </div>
              ))}

              {/* Address Textarea */}
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: 'var(--primary)' }}>
                  Delivery Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${formErrors.address ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '4px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--primary)',
                    boxSizing: 'border-box',
                    resize: 'none'
                  }}
                />
                {formErrors.address && (
                  <div style={{ color: 'var(--accent)', fontSize: '11px', marginTop: '4px' }}>
                    {formErrors.address}
                  </div>
                )}
              </div>

              <button onClick={handleStep1Submit} className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Next →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Order Summary */}
              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '4px' }}>
                <h3 style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
                  Order Summary
                </h3>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
                  <span>Total</span>
                  <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '4px' }}>
                <h3 style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
                  Delivery To
                </h3>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--primary)' }}>
                  <div style={{ fontWeight: 500 }}>{formData.name}</div>
                  <div>{formData.phone}</div>
                  <div>{formData.address}, {formData.city} - {formData.pincode}</div>
                  {formData.email && <div>{formData.email}</div>}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                <button onClick={() => setStep(1)} className="btn-outline" style={{ width: '100%' }}>
                  ← Back
                </button>
                <button onClick={handleStep2Submit} disabled={loading} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {loading ? <Spinner /> : '✓'} Confirm & Send to WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button onClick={() => setActiveModal(null)} style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}>
            ✕
          </button>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: AboutSection ───
function AboutSection() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        inset: '-80px -40px',
        zIndex: 0,
        opacity: 0.04,
        background: 'url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80) center/cover no-repeat'
      }} />
      <div className="about-grid" style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center'
      }}>
      {/* Left - Decorative */}
      <div style={{
        aspectRatio: '3/4',
        background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
        position: 'relative',
        display: 'none',
        '@media (min-width: 769px)': { display: 'block' }
      }}>
        <div style={{
          position: 'absolute',
          inset: '16px',
          border: '1px solid var(--gold)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.1),
              rgba(255,255,255,0.1) 1px,
              transparent 1px,
              transparent 8px
            )
          `,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          inset: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: '120px',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.1)',
          pointerEvents: 'none'
        }}>
          I
        </div>
      </div>

      {/* Right - Content */}
      <div>
        <div className="section-label">Our Story</div>
        <h2 className="section-title">Crafted with <em>Love & Tradition</em></h2>

        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '24px', marginTop: '24px' }}>
          Ishira House of Fashion celebrates the timeless elegance of Indian ethnic wear. Founded in Hassan, Karnataka, we partner with master artisans to bring you handcrafted sarees, blouses, and accessories that tell stories woven in gold thread and silk.
        </p>

        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '32px' }}>
          Every piece is a testament to traditional craftsmanship. We specialize in custom stitching, measurements, and personalized designs to ensure you feel confidence with every wear.
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          {[
            { num: '83+', label: 'Designs' },
            { num: '2+', label: 'Years' },
            { num: '∞', label: 'Crafted with Love' }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--gold)', marginBottom: '8px' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: TestimonialsSection ───
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The blouse stitching was absolutely perfect. Ishira understood exactly what I wanted.",
      author: "Priya Gowda",
      city: "Bengaluru"
    },
    {
      quote: "I ordered a Kanjivaram saree and saree kuchu set. The gold thread work is stunning.",
      author: "Kavitha Nair",
      city: "Mysuru"
    },
    {
      quote: "My daughter's lehenga for the wedding — everyone kept asking where we got it from.",
      author: "Suma Hegde",
      city: "Hassan"
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px'
    }}>
      {testimonials.map((t, i) => (
        <div key={i} style={{
          background: 'transparent',
          border: '1px solid rgba(200,146,42,0.3)',
          padding: '32px',
          borderRadius: '4px',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(200,146,42,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(200,146,42,0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
          <div style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--gold)' }}>★★★★★</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontStyle: 'italic', color: 'white', lineHeight: 1.6, marginBottom: '16px' }}>
            "{t.quote}"
          </p>
          <div style={{ fontSize: '12px' }}>
            <div style={{ color: 'white', fontWeight: 500 }}>— {t.author}</div>
            <div style={{ color: 'var(--gold)' }}>{t.city}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: ContactSection ───
function ContactSection() {
  const { WHATSAPP_NUMBER, IS_DEMO, showToast, setAllMessages } = useApp();
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [contactErrors, setContactErrors] = useState({});
  const [contactLoading, setContactLoading] = useState(false);

  // FIX: Bug 3 - Contact form submit handler with validation and message storage
  const handleContactSubmit = async () => {
    // Validate form
    const errors = {};
    if (!contactForm.name.trim()) errors.name = 'Required';
    if (!contactForm.phone.trim()) errors.phone = 'Required';
    if (!contactForm.message.trim()) errors.message = 'Required';

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactLoading(true);

    try {
      // Build message object
      const newMsg = {
        id: 'MSG' + Date.now(),
        name: contactForm.name.trim(),
        phone: contactForm.phone.trim(),
        message: contactForm.message.trim(),
        read: false,
        createdAt: { toDate: () => new Date() }
      };

      // Add to admin messages state IMMEDIATELY (works in both demo and live mode)
      setAllMessages(prev => [newMsg, ...prev]);

      // Also save to Firebase if not demo
      if (!IS_DEMO) {
        await submitMessage({ name: contactForm.name.trim(), phone: contactForm.phone.trim(), message: contactForm.message.trim() });
      }

      // Clear form and show success
      setContactForm({ name: '', phone: '', message: '' });
      setContactErrors({});
      setContactLoading(false);
      showToast("Message sent! We'll reply soon 🌸", 'success');
    } catch (error) {
      showToast('Failed to send message', 'error');
      setContactLoading(false);
    }
  };

  return (
    <div className="contact-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px'
    }}>
      {/* Left - Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {[
          { icon: '📍', title: 'Location', text: 'Hassan, Karnataka | Pin: 573201' },
          { icon: '🕐', title: 'Hours', text: 'Monday–Saturday | 10:00 AM – 6:00 PM' },
          { icon: '💬', title: 'WhatsApp', text: `+91 ${WHATSAPP_NUMBER.slice(-10)}`, link: `https://wa.me/${WHATSAPP_NUMBER}` },
          { icon: '📷', title: 'Instagram', text: '@ishira_2024', link: 'https://www.instagram.com/ishira_2024' }
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>
                {item.title}
              </div>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>
                  {item.text} ↗
                </a>
              ) : (
                <div style={{ color: 'var(--primary)', fontWeight: 500 }}>{item.text}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right - Form */}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}>
        {[
          { key: 'name', label: 'Full Name', required: true },
          { key: 'phone', label: 'Phone Number', required: true }
        ].map(field => (
          <div key={field.key}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500 }}>
              {field.label} {field.required && '*'}
            </label>
            <input
              type="text"
              value={contactForm[field.key]}
              onChange={e => setContactForm({ ...contactForm, [field.key]: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${contactErrors[field.key] ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '4px',
                fontFamily: 'var(--font-body)',
                boxSizing: 'border-box'
              }}
            />
            {contactErrors[field.key] && <div style={{ color: 'var(--accent)', fontSize: '11px', marginTop: '4px' }}>{contactErrors[field.key]}</div>}
          </div>
        ))}

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500 }}>Message *</label>
          <textarea
            value={contactForm.message}
            onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${contactErrors.message ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              boxSizing: 'border-box',
              resize: 'none'
            }}
          />
          {contactErrors.message && <div style={{ color: 'var(--accent)', fontSize: '11px', marginTop: '4px' }}>{contactErrors.message}</div>}
        </div>

        <button type="submit" disabled={contactLoading} className="btn-primary" style={{ width: '100%', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {contactLoading ? <Spinner /> : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: Footer ───
function Footer() {
  const { handleLogoClick, currentUser, setAccountOpen, setActiveModal, showToast, setActiveAccountTab, WHATSAPP_NUMBER } = useApp();

  // FIX: Bug 4 - Helper function to scroll to sections
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--primary)',
      color: 'white',
      padding: '60px 40px 20px'
    }}>
      {/* Top Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px',
        paddingBottom: '40px',
        borderBottom: '1px solid rgba(200,146,42,0.2)'
      }}>
        {/* Column 1 */}
        <div>
          <div onClick={handleLogoClick} style={{ cursor: 'pointer', marginBottom: '16px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--gold)', letterSpacing: '3px' }}>ISHIRA</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', textTransform: 'uppercase' }}>House of Fashion</div>
          </div>
          <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
            Handcrafted ethnic wear celebrating tradition, artistry, and timeless elegance from Hassan, Karnataka.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>Collections</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><span onClick={() => scrollToSection('collections')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Sarees</span></li>
            <li><span onClick={() => scrollToSection('collections')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Blouse Designs</span></li>
            <li><span onClick={() => scrollToSection('collections')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Saree Kuchu</span></li>
            <li><span onClick={() => scrollToSection('collections')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Kids Wear</span></li>
            <li><span onClick={() => scrollToSection('collections')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Custom Orders</span></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><span onClick={() => scrollToSection('about')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>About Us</span></li>
            <li><span onClick={() => scrollToSection('contact')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Contact</span></li>
            <li><span onClick={() => showToast('FAQ coming soon!', 'info')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>FAQ</span></li>
            <li><span onClick={() => { if (currentUser) { setAccountOpen(true); setActiveAccountTab('measurements'); } else { setActiveModal('auth'); showToast('Sign in to access measurements', 'info'); } }} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Measurements</span></li>
            <li><span onClick={() => { if (currentUser) { setAccountOpen(true); setActiveAccountTab('my-orders'); } else { setActiveModal('auth'); showToast('Sign in to track your orders', 'info'); } }} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>Track Order</span></li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h4 style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>Follow</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="https://www.instagram.com/ishira_2024" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
              @ishira_2024 ↗
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
              WhatsApp ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)'
      }}>
        <div>© 2024 Ishira House of Fashion. All rights reserved.</div>
        <div>Built with ♥ in India</div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// AUTH MODAL
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: AuthModal ───
function AuthModal() {
  const { activeModal, setActiveModal, handleSignUp, handleSignIn } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  if (activeModal !== 'auth') return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const result = await handleSignUp(formData.email, formData.password, formData.name, formData.phone);
        if (result.error) setError(result.error);
      } else {
        const result = await handleSignIn(formData.email, formData.password);
        if (result.error) setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setActiveModal(null)} style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 250
      }} />

      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--surface)',
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        zIndex: 251
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', marginBottom: '24px', textAlign: 'center', color: 'var(--primary)' }}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)'
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-body)'
                }}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            style={{
              padding: '10px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            style={{
              padding: '10px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)'
            }}
          />

          {error && (
            <div style={{ color: 'var(--accent)', fontSize: '12px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{
            width: '100%',
            marginTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {loading ? <Spinner /> : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
          {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
          <button onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
            setFormData({ email: '', password: '', name: '', phone: '' });
          }} style={{
            background: 'none',
            border: 'none',
            color: 'var(--gold)',
            cursor: 'pointer',
            marginLeft: '6px',
            textDecoration: 'underline'
          }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <button onClick={() => setActiveModal(null)} style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer'
        }}>
          ✕
        </button>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// ACCOUNT DRAWER
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: AccountDrawer ───
function AccountDrawer() {
  const { accountOpen, setAccountOpen, currentUser, userProfile, setUserProfile, userOrders, wishlist, products, handleSignOut, activeAccountTab, setActiveAccountTab, showToast, IS_DEMO } = useApp();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [measurements, setMeasurements] = useState({});
  const [measLoading, setMeasLoading] = useState(false);

  // FIX: Bug 5 - Load measurements when profile changes
  useEffect(() => {
    if (userProfile?.measurements) {
      setMeasurements(userProfile.measurements);
    } else {
      setMeasurements({
        bust: '', waist: '', hip: '', blouseLength: '', shoulder: '', sleeveLength: ''
      });
    }
  }, [userProfile]);

  // FIX: Bug 5 - Save measurements handler
  const handleSaveMeasurements = async () => {
    setMeasLoading(true);

    // Save to Firebase if not demo
    if (!IS_DEMO && currentUser) {
      const result = await saveMeasurements(currentUser.uid, measurements);
      if (result.error) {
        showToast('Failed to save: ' + result.error, 'error');
        setMeasLoading(false);
        return;
      }
    }

    // Update local userProfile state
    setUserProfile(prev => ({ ...prev, measurements }));

    setMeasLoading(false);
    showToast('Measurements saved! ✓', 'success');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: { bg: '#FFF3CD', text: '#856404' },
      confirmed: { bg: '#D1ECF1', text: '#0C5460' },
      dispatched: { bg: '#D4EDDA', text: '#155724' },
      delivered: { bg: '#C3E6CB', text: '#155724' }
    };
    return colors[status] || colors.pending;
  };

  return (
    <>
      {accountOpen && (
        <div onClick={() => setAccountOpen(false)} style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 199
        }} />
      )}

      <div style={{
        position: 'fixed',
        right: accountOpen ? 0 : '-380px',
        top: 0,
        width: 'min(380px, 100%)',
        height: '100vh',
        background: 'var(--surface)',
        boxShadow: '-4px 0 16px rgba(0,0,0,0.15)',
        zIndex: 200,
        transition: 'right 0.3s',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--primary)',
          color: 'white',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            {currentUser?.email?.[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>{userProfile?.name || 'Account'}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{currentUser?.email}</div>
          </div>
          <button onClick={() => setAccountOpen(false)} style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer'
          }}>
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0',
          borderBottom: '1px solid var(--border)',
          overflow: 'auto'
        }}>
          {['profile', 'my-orders', 'wishlist', 'measurements'].map(t => {
            const label = t === 'my-orders' ? 'My Orders' : t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            return (
              <button key={t} onClick={() => setActiveAccountTab(t)} style={{
                flex: 1,
                padding: '12px',
                background: activeAccountTab === t ? 'var(--bg)' : 'transparent',
                border: 'none',
                borderBottom: activeAccountTab === t ? '2px solid var(--gold)' : '1px solid var(--border)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: activeAccountTab === t ? 'var(--gold)' : 'var(--muted)',
                whiteSpace: 'nowrap'
              }}>
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {activeAccountTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>Name</div>
                <div style={{ fontSize: '14px', color: 'var(--primary)' }}>{userProfile?.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>Email</div>
                <div style={{ fontSize: '14px', color: 'var(--primary)' }}>{currentUser?.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>Phone</div>
                <div style={{ fontSize: '14px', color: 'var(--primary)' }}>{userProfile?.phone}</div>
              </div>
              <button onClick={handleSignOut} className="btn-outline" style={{ width: '100%', marginTop: '20px' }}>
                Sign Out
              </button>
            </div>
          )}

          {activeAccountTab === 'my-orders' && (
            <div>
              {!currentUser ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--muted)', marginBottom: 16 }}>
                    Create an account to track your orders
                  </div>
                  <button
                    onClick={() => setActiveModal('auth')}
                    style={{
                      background: 'var(--gold)', color: 'white', border: 'none', padding: '10px 24px',
                      cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase'
                    }}
                  >
                    Sign Up Now
                  </button>
                </div>
              ) : userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
                  No orders yet
                </div>
              ) : (
                userOrders.map(order => {
                  const statusSteps = ['pending', 'confirmed', 'dispatched', 'delivered'];
                  const currentIdx = statusSteps.indexOf(order.status);
                  const orderDate = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
                  return (
                    <div key={order.id} style={{
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      marginBottom: '16px',
                      overflow: 'hidden',
                      background: 'var(--bg)'
                    }}>
                      {/* Header */}
                      <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)' }}>Order #{order.id.slice(-6)}</div>
                          <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{orderDate}</div>
                        </div>
                        <div style={{
                          background: getStatusColor(order.status).bg,
                          color: getStatusColor(order.status).text,
                          padding: '4px 10px',
                          fontSize: '10px',
                          borderRadius: '2px',
                          textTransform: 'capitalize',
                          fontWeight: 500
                        }}>
                          {order.status}
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--primary)', marginBottom: idx < order.items.length - 1 ? '6px' : 0 }}>
                            <span>{item.name} × {item.quantity}</span>
                            <span style={{ fontWeight: 500 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold', color: 'var(--primary)', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                          <span>Total</span>
                          <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Status Timeline */}
                      <div style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {statusSteps.map((step, i) => (
                            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < statusSteps.length - 1 ? 1 : 'none' }}>
                              <div style={{
                                width: '18px', height: '18px', borderRadius: '50%',
                                background: i <= currentIdx ? 'var(--gold)' : 'transparent',
                                border: i <= currentIdx ? '2px solid var(--gold)' : '2px solid var(--border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '8px', color: i <= currentIdx ? 'white' : 'var(--muted)',
                                flexShrink: 0
                              }}>
                                {i <= currentIdx ? '✓' : ''}
                              </div>
                              {i < statusSteps.length - 1 && (
                                <div style={{ flex: 1, height: '2px', background: i < currentIdx ? 'var(--gold)' : 'var(--border)', margin: '0 4px' }} />
                              )}
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                          {statusSteps.map((step, i) => (
                            <div key={step} style={{ fontSize: '8px', textTransform: 'capitalize', color: i <= currentIdx ? 'var(--gold)' : 'var(--muted)', textAlign: 'center', width: i === 0 || i === statusSteps.length - 1 ? 'auto' : 'auto' }}>
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeAccountTab === 'wishlist' && (() => {
            const validWishlistItems = products.filter(p => wishlist.includes(p.id));
            
            return (
              <div>
                {validWishlistItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>♡</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--muted)', marginBottom: 20 }}>
                      No items found
                    </div>
                    <button onClick={() => { 
                      setAccountOpen(false); 
                      setTimeout(() => {
                        document.getElementById('product-display')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }} style={{ marginTop: 16, background: 'var(--gold)', color: 'white', border: 'none', padding: '10px 24px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>
                      Browse Collections
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {validWishlistItems.map(p => (
                      <div key={p.id} style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '80px',
                          background: p.imageUrl ? `url(${p.imageUrl}) center / cover` : 'var(--gold-light)'
                        }} />
                        <div style={{ padding: '8px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 500, marginBottom: '4px', color: 'var(--primary)' }}>
                            {p.name.substring(0, 20)}...
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--gold)', marginBottom: '6px' }}>
                            ₹{p.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {activeAccountTab === 'measurements' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { key: 'bust', label: 'Bust' },
                { key: 'waist', label: 'Waist' },
                { key: 'hip', label: 'Hip' },
                { key: 'blouseLength', label: 'Blouse Length' },
                { key: 'shoulder', label: 'Shoulder' },
                { key: 'sleeveLength', label: 'Sleeve Length' }
              ].map(m => (
                <div key={m.key}>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold)', marginBottom: '4px', display: 'block' }}>
                    {m.label}
                  </label>
                  <input
                    type="text"
                    placeholder="cm"
                    value={measurements[m.key] || ''}
                    onChange={(e) => setMeasurements({ ...measurements, [m.key]: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '6px',
                      border: '1px solid var(--border)',
                      borderRadius: '2px',
                      fontSize: '12px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
              <button onClick={handleSaveMeasurements} disabled={measLoading} className="btn-primary" style={{ gridColumn: '1 / -1', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {measLoading ? <Spinner /> : '✓'} Save Measurements
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// ADMIN GATE
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: AdminGate ───
function AdminGate() {
  const { activeModal, setActiveModal, verifyAdminPassword } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (activeModal !== 'admin-gate') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyAdminPassword(password)) {
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <>
      <div onClick={() => { setActiveModal(null); setPassword(''); setError(''); }} style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} />

      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--surface)',
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '360px',
        width: '100%',
        zIndex: 401,
        textAlign: 'center'
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--gold)', marginBottom: '8px' }}>ISHIRA</h2>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>Admin Access</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: '12px',
              border: `1px solid ${error ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              textAlign: 'center',
              letterSpacing: '4px'
            }}
          />

          {error && (
            <div style={{ color: 'var(--accent)', fontSize: '12px' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Enter
          </button>

          <button type="button" onClick={() => { setActiveModal(null); setPassword(''); setError(''); }} style={{
            background: 'none',
            border: 'none',
            color: 'var(--gold)',
            cursor: 'pointer',
            fontSize: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: AdminPanel ───
function AdminPanel() {
  const { adminMode, setAdminMode, products, allOrders, allMessages, handleAdminAddProduct, handleAdminUpdateProduct, handleAdminDeleteProduct, handleAdminUpdateOrderStatus, handleAdminMarkMessageRead, showToast } = useApp();
  const [tab, setTab] = useState('dashboard');

  // FIX: Bug 6 + Bug 2 - Admin product form state with edit mode
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addForm, setAddForm] = useState({
    name: '', category: 'Saree', price: '', originalPrice: '',
    description: '', inStock: true
  });
  const [addImageFile, setAddImageFile] = useState(null);
  const [addImagePreview, setAddImagePreview] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // FIX: Bug 6 - Handle image select with preview
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAddImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAddImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // FIX: Bug 2 - Handle edit button
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setAddForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      originalPrice: String(product.originalPrice || ''),
      description: product.description || '',
      inStock: product.inStock !== false,
    });
    setAddImagePreview(product.imageUrl || '');
    setAddImageFile(null);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FIX: Bug 2 - Handle delete button
  const handleDeleteClick = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;

    // Remove from local state immediately
    // Note: handleAdminDeleteProduct already removes from products state
    await handleAdminDeleteProduct(product.id);
    showToast(`"${product.name}" deleted`, 'info');
  };

  // FIX: Bug 6 + Bug 2 - Handle form submit (add or update)
  const handleAddSubmit = async () => {
    if (!addForm.name || !addForm.price) {
      showToast('Name and price are required', 'error');
      return;
    }
    setAddLoading(true);
    const productData = {
      name: addForm.name.trim(),
      category: addForm.category,
      price: parseInt(addForm.price),
      originalPrice: parseInt(addForm.originalPrice) || parseInt(addForm.price),
      description: addForm.description.trim(),
      inStock: addForm.inStock,
      imageUrl: addImagePreview || '',
    };

    if (editingProduct) {
      // UPDATE existing product
      await handleAdminUpdateProduct(editingProduct.id, productData, addImageFile);
      showToast('Product updated successfully! ✓', 'success');
    } else {
      // ADD new product
      await handleAdminAddProduct(productData, addImageFile);
      showToast('Product added successfully! ✓', 'success');
    }

    // Reset form
    setAddForm({ name: '', category: 'Saree', price: '', originalPrice: '', description: '', inStock: true });
    setAddImageFile(null);
    setAddImagePreview('');
    setEditingProduct(null);
    setShowAddForm(false);
    setAddLoading(false);
  };

  if (!adminMode) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--surface)',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--primary)',
        color: 'white',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 4vw, 28px)', color: 'var(--gold)' }}>
          ISHIRA Admin Panel
        </h1>
        <button onClick={() => setAdminMode(false)} className="btn-outline" style={{
          background: 'transparent',
          color: 'white',
          borderColor: 'white'
        }}>
          ✕ Exit Admin
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        paddingLeft: '16px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        {['Dashboard', 'Products', 'Orders', 'Messages'].map(t => (
          <button key={t} onClick={() => setTab(t.toLowerCase())} style={{
            padding: '16px 20px',
            background: tab === t.toLowerCase() ? 'var(--surface)' : 'transparent',
            border: 'none',
            borderBottom: tab === t.toLowerCase() ? '2px solid var(--gold)' : '1px solid var(--border)',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: tab === t.toLowerCase() ? 'var(--gold)' : 'var(--muted)',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(16px, 4vw, 40px)' }}>
        {tab === 'dashboard' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '32px', color: 'var(--primary)' }}>Dashboard</h2>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              {[
                { label: 'Total Products', value: products.length },
                { label: 'Total Orders', value: allOrders.length },
                { label: 'Pending Orders', value: allOrders.filter(o => o.status === 'pending').length },
                { label: 'Unread Messages', value: allMessages.filter(m => !m.read).length }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  padding: '24px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', color: 'var(--gold)', fontWeight: 'bold', marginBottom: '8px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', letterspacing: '1px', textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '16px', color: 'var(--primary)' }}>Recent Orders</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Order ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Customer</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Total</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.slice(0, 5).map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px' }}>{order.id.slice(-6)}</td>
                      <td style={{ padding: '12px' }}>{order.customerName}</td>
                      <td style={{ padding: '12px' }}>₹{order.totalAmount.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px', textTransform: 'capitalize' }}>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            {/* FIX: Bug 6 + Bug 2 - Add Product button and edit/delete functionality */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--primary)' }}>Products ({products.length})</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setAddForm({ name: '', category: 'Saree', price: '', originalPrice: '', description: '', inStock: true });
                  setAddImagePreview('');
                  setAddImageFile(null);
                  setShowAddForm(!showAddForm);
                }}
                style={{
                  background: 'var(--gold)', color: 'white', border: 'none', padding: '10px 24px',
                  cursor: 'pointer', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)'
                }}>
                + Add Product
              </button>
            </div>

            {/* Add/Edit Product Form */}
            {showAddForm && (
              <div style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                padding: '24px',
                marginBottom: '24px',
                borderRadius: '4px'
              }}>
                <h3 style={{ marginBottom: '20px', fontFamily: 'var(--font-display)', fontSize: '18px' }}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <input type="text" placeholder="Product Name" value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-body)' }} />
                  <select value={addForm.category} onChange={e => setAddForm({ ...addForm, category: e.target.value })} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-body)' }}>
                    <option value="Saree">Saree</option>
                    <option value="Blouse">Blouse</option>
                    <option value="Kuchu">Kuchu</option>
                    <option value="Kids">Kids</option>
                  </select>
                  <input type="number" placeholder="Price" value={addForm.price} onChange={e => setAddForm({ ...addForm, price: e.target.value })} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-body)' }} />
                  <input type="number" placeholder="Original Price (optional)" value={addForm.originalPrice} onChange={e => setAddForm({ ...addForm, originalPrice: e.target.value })} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--font-body)' }} />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>In Stock</label>
                  <input type="checkbox" checked={addForm.inStock} onChange={e => setAddForm({ ...addForm, inStock: e.target.checked })} style={{ cursor: 'pointer' }} />
                </div>
                <textarea placeholder="Description" value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} rows={3} style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '16px', boxSizing: 'border-box', fontFamily: 'var(--font-body)' }} />

                {/* Image Upload */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500' }}>Product Image</label>
                  <input type="file" accept="image/*" onChange={handleImageSelect} style={{ marginBottom: '12px' }} />
                  {addImagePreview && (
                    <div style={{ width: '100px', height: '100px', background: `url(${addImagePreview}) center / cover`, borderRadius: '4px', border: '1px solid var(--border)' }} />
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={handleAddSubmit} disabled={addLoading} className="btn-primary" style={{ flex: 1 }}>
                    {addLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="btn-outline" style={{ flex: 1 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Image</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>In Stock</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: product.imageUrl ? `url(${product.imageUrl}) center / cover` : 'var(--gold-light)',
                          borderRadius: '2px'
                        }} />
                      </td>
                      <td style={{ padding: '12px' }}>{product.name}</td>
                      <td style={{ padding: '12px' }}>{product.category}</td>
                      <td style={{ padding: '12px' }}>₹{product.price}</td>
                      <td style={{ padding: '12px' }}>{product.inStock ? '✓' : '✕'}</td>
                      <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEditClick(product)} style={{
                          background: 'var(--border)',
                          border: 'none',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          fontSize: '10px',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-body)'
                        }}>Edit</button>
                        <button onClick={() => handleDeleteClick(product)} style={{
                          background: 'var(--accent)',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          fontSize: '10px',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-body)'
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px', color: 'var(--primary)' }}>
              Orders ({allOrders.length})
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Order ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Customer</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Total</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--gold)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map(order => {
                    const statusColors = {
                      pending: { bg: '#FFF3CD', color: '#856404' },
                      confirmed: { bg: '#D1ECF1', color: '#0C5460' },
                      dispatched: { bg: '#D4EDDA', color: '#155724' },
                      delivered: { bg: '#C3E6CB', color: '#155724' },
                    };
                    const statusColor = statusColors[order.status] || statusColors.pending;

                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px' }}>{order.id.slice(-6)}</td>
                        <td style={{ padding: '12px' }}>{order.customerName}</td>
                        <td style={{ padding: '12px' }}>{order.customerPhone}</td>
                        <td style={{ padding: '12px' }}>₹{order.totalAmount.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px' }}>
                          <select
                            value={order.status}
                            onChange={(e) => {
                              handleAdminUpdateOrderStatus(order.id, e.target.value);
                            }}
                            style={{
                              border: '1px solid var(--border)',
                              padding: '6px 10px',
                              fontFamily: 'var(--font-body)',
                              fontSize: 12,
                              background: 'white',
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Order Details Expandable */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--primary)' }}>Order Details</h3>
              {allOrders.map(order => (
                <div key={order.id} style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  padding: '16px',
                  marginBottom: '16px',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '13px', marginBottom: '12px' }}>
                    <strong>Order #{order.id.slice(-6)}</strong> - {order.customerName} ({order.customerPhone})
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>
                    {order.customerAddress}
                  </div>
                  <div style={{ fontSize: '12px', marginBottom: '12px' }}>
                    Items: {order.items?.length || 0} | Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                  </div>

                  {/* FIX: Bug 5 - Show customer measurements if available */}
                  {order.measurements && (
                    <div style={{ marginTop: 12, padding: 12, background: 'white', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                        Customer Measurements
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 13 }}>
                        <div>Bust: {order.measurements.bust}"</div>
                        <div>Waist: {order.measurements.waist}"</div>
                        <div>Hip: {order.measurements.hip}"</div>
                        <div>Blouse Length: {order.measurements.blouseLength}"</div>
                        <div>Shoulder: {order.measurements.shoulder}"</div>
                        <div>Sleeve: {order.measurements.sleeveLength}"</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px', color: 'var(--primary)' }}>
              Messages ({allMessages.length})
            </h2>

            {allMessages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                No messages yet
              </div>
            ) : (
              allMessages.map(msg => (
                <div key={msg.id} style={{
                  background: 'var(--bg)',
                  border: `2px solid ${msg.read ? 'var(--border)' : 'var(--gold)'}`,
                  padding: '16px',
                  marginBottom: '12px',
                  borderRadius: '4px',
                  position: 'relative'
                }}>
                  {!msg.read && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'var(--gold)',
                      color: 'white',
                      fontSize: '9px',
                      padding: '4px 8px',
                      borderRadius: '2px',
                      fontWeight: 'bold'
                    }}>
                      NEW
                    </div>
                  )}

                  <div style={{ marginBottom: '8px' }}>
                    <strong>{msg.name}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{msg.phone}</div>
                  </div>

                  <p style={{ marginBottom: '12px', fontSize: '13px', lineHeight: 1.5 }}>
                    {msg.message}
                  </p>

                  {!msg.read && (
                    <button onClick={() => handleAdminMarkMessageRead(msg.id)} style={{
                      fontSize: '11px',
                      padding: '6px 12px',
                      background: 'var(--gold)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '2px'
                    }}>
                      Mark as Read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TOAST CONTAINER
// ═══════════════════════════════════════════════════════════

// ─── COMPONENT: ToastContainer ───
function ToastContainer() {
  const { toasts } = useApp();

  const getToastStyle = (type) => {
    const styles = {
      success: { bg: '#1A5932', icon: '✓' },
      error: { bg: '#8B1A1A', icon: '✕' },
      info: { bg: '#C8922A', icon: '◆' },
      warning: { bg: '#7B5B00', icon: '⚠' }
    };
    return styles[type] || styles.info;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {toasts.map(toast => {
        const style = getToastStyle(toast.type);
        return (
          <div key={toast.id} style={{
            background: style.bg,
            color: 'white',
            padding: '12px 16px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            animation: 'toastIn 0.3s ease-out',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '240px'
          }}>
            <span>{style.icon}</span>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════

export {
  GlobalStyles, DemoBanner, Navbar, HeroSection, MarqueeStrip,
  CategorySection, ProductGrid, ProductCard, ProductModal,
  CartDrawer, CheckoutModal, AboutSection, TestimonialsSection,
  ContactSection, Footer, AuthModal, AccountDrawer,
  AdminGate, AdminPanel, ToastContainer, Spinner
};
