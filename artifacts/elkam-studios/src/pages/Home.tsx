import React, { useRef, useState, useCallback } from "react";
import { EnquiryModal } from "@/components/EnquiryModal";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Lightbulb, 
  Palette, 
  Megaphone, 
  MousePointer2, 
  PenTool, 
  TrendingUp,
  CheckCircle2,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLandscape from "@assets/Landscape_logo@4x_1780690543512.png";
import logoWhite from "@assets/White trs logo.png";
import aboutImage from "@assets/Logo_with_purple_bg_1780697928210.jpg";
import logoMark from "@assets/Logo_mark@4x_1780698740718.png";
import logoRathi from "@assets/WhatsApp_Image_2025-10-18_at_11.47.01_33ddd215_(1).jpg_1780699473843.jpeg";
import logoBelong from "@assets/2025_01-27_Belong-Identity-Guide_Page_01_1780699473898.jpg";
import logoWindsouls from "@assets/project-logo-img-new_1780699473899.jpg";
import logoClinzor from "@assets/608873301_17890694064396612_4668588208485950245_n_1780699599411.jpg";
import logoThunify from "@assets/587754951_17904953091343190_7820266270881939461_n_1780699599412.jpg";
import logoWellfed from "@assets/Wellfed_Primary_Logo_Dark_Coral_1780699599412.png";

const wallOfLoveCards = [
  { initials: "AK", handle: "@aarav.k",      color: "#6B2CA3", text: "This is the most logical partnership we've ever made. Hands down." },
  { initials: "RS", handle: "@rathisilks",   color: "#B23D4C", text: "We came in with 0 followers and zero clue. ELKAM made us look like we'd been doing this for years. The content felt alive — not staged. Real." },
  { initials: "DM", handle: "@dev.m",        color: "#1E40AF", text: "Won't stop seeing an ad from one of my favourite studios. In fact, I'm gonna watch a few more." },
  { initials: "MR", handle: "@megha.r",      color: "#FF9A00", text: "I'm influenced. Let me go see how much this costs because I want in." },
  { initials: "WF", handle: "@wellfed.in",   color: "#C2410C", text: "I didn't want scripted, polished nonsense. ELKAM got it immediately. They showed up, understood the vibe, and made reels that made people hungry. Orders went up. No joke." },
  { initials: "TK", handle: "@tanya.k",      color: "#92400E", text: "Better than most corporate branding firms, right here — and a fraction of the cost." },
  { initials: "PV", handle: "@priya.v",      color: "#4C1D95", text: "This was the most flawless, relevant, and direct-to-consumer campaign I've ever seen. Period." },
  { initials: "BL", handle: "@belong.fit",   color: "#3D6B1A", text: "We went from 576 followers to being recognized across the city. Every reel felt made for our community, not just the algorithm." },
  { initials: "VJ", handle: "@vikram.j",     color: "#6B2CA3", text: "Wow. This is the most brilliant work I've seen come out of an agency this size." },
  { initials: "SK", handle: "@siddharth.k",  color: "#7C3AED", text: "When you know from the very beginning that a brand truly gets you — that's ELKAM." },
  { initials: "AS", handle: "@ananya.s",     color: "#FF9A00", text: "The campaign concept is incredible — stopped me mid-scroll instantly. That's rare." },
  { initials: "NB", handle: "@naina.b",      color: "#9D174D", text: "Better than most corporate branding firms I've worked with. No comparison." },
  { initials: "KP", handle: "@kartik.p",     color: "#0F766E", text: "I must already have been their client in another life. They've gotten so good at what they do." },
  { initials: "RT", handle: "@rishi.t",      color: "#065F46", text: "I must already be there. They've gotten so good at marketing — every post just lands." },
  { initials: "LP", handle: "@leena.p",      color: "#7C3AED", text: "Whoever runs ELKAM's strategy team deserves a raise. Every single post lands perfectly." },
];

const wolvColA = wallOfLoveCards.filter((_, i) => i % 3 === 0);
const wolvColB = wallOfLoveCards.filter((_, i) => i % 3 === 1);
const wolvColC = wallOfLoveCards.filter((_, i) => i % 3 === 2);

type HeroCardData = {
  xPct: number; yPct: number; rotation: number; delay: number;
  gradient: string; label: string; sublabel: string; width: number; height: number;
  floatAnim: 1 | 2 | 3;
};

const HERO_CARDS: HeroCardData[] = [
  { xPct: 3,  yPct: 10, rotation: -13, delay: 0,   gradient: 'linear-gradient(145deg,#1A0A30 0%,#6B2CA3 100%)', label: 'Brand ID',   sublabel: 'Belong Co',  width: 158, height: 210, floatAnim: 1 },
  { xPct: 82, yPct: 7,  rotation: 9,   delay: 1.4, gradient: 'linear-gradient(145deg,#3A1400 0%,#FF9A00 100%)', label: 'Campaign',   sublabel: 'Thunify',    width: 148, height: 198, floatAnim: 2 },
  { xPct: 0,  yPct: 50, rotation: -6,  delay: 0.7, gradient: 'linear-gradient(145deg,#08082E 0%,#3730A3 100%)', label: 'Digital UX', sublabel: 'Clinzor',    width: 178, height: 238, floatAnim: 3 },
  { xPct: 82, yPct: 48, rotation: 12,  delay: 1.9, gradient: 'linear-gradient(145deg,#1A0A2E 0%,#7C3AED 100%)', label: 'Identity',   sublabel: 'The Wind',   width: 152, height: 202, floatAnim: 1 },
  { xPct: 14, yPct: 76, rotation: 5,   delay: 1.0, gradient: 'linear-gradient(145deg,#2A0E00 0%,#D97706 100%)', label: 'Strategy',   sublabel: 'Wellfound',  width: 142, height: 188, floatAnim: 2 },
  { xPct: 74, yPct: 74, rotation: -9,  delay: 2.2, gradient: 'linear-gradient(145deg,#1E0830 0%,#9333EA 100%)', label: 'Growth',     sublabel: 'Rathi',      width: 162, height: 214, floatAnim: 3 },
  { xPct: 36, yPct: 2,  rotation: 7,   delay: 0.5, gradient: 'linear-gradient(145deg,#0F2027 0%,#203A43 50%,#2C5364 100%)', label: 'Content',    sublabel: 'Clinzor',    width: 134, height: 178, floatAnim: 2 },
  { xPct: 60, yPct: 6,  rotation: -8,  delay: 1.1, gradient: 'linear-gradient(145deg,#200122 0%,#6B2CA3 100%)', label: 'Social',     sublabel: 'Wellfed',    width: 128, height: 170, floatAnim: 1 },
  { xPct: 38, yPct: 80, rotation: -4,  delay: 1.7, gradient: 'linear-gradient(145deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)', label: 'Launch',     sublabel: 'Rathi',      width: 138, height: 182, floatAnim: 3 },
  { xPct: 56, yPct: 78, rotation: 10,  delay: 2.5, gradient: 'linear-gradient(145deg,#3A0E00 0%,#FF6B00 100%)', label: 'Reels',      sublabel: 'Belong',     width: 124, height: 165, floatAnim: 2 },
];

const FLOAT_ANIMS = ['cardFloat1', 'cardFloat2', 'cardFloat3'];

const HeroCard: React.FC<{
  card: HeroCardData;
  mouse: { x: number; y: number };
  heroDims: { w: number; h: number };
}> = ({ card, mouse, heroDims }) => {
  const cardCX = (card.xPct / 100) * heroDims.w + card.width / 2;
  const cardCY = (card.yPct / 100) * heroDims.h + card.height / 2;
  const dist = heroDims.w > 0
    ? Math.sqrt((cardCX - mouse.x) ** 2 + (cardCY - mouse.y) ** 2)
    : 9999;
  const proximity = Math.max(0, 1 - dist / 340);
  const scale = 0.82 + proximity * 0.28;
  const opacity = 0.15 + proximity * 0.85;

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${card.xPct}%`,
        top: `${card.yPct}%`,
        zIndex: proximity > 0.45 ? 6 : 1,
        animation: `${FLOAT_ANIMS[card.floatAnim - 1]} ${6 + card.delay * 0.6}s ease-in-out infinite ${card.delay * 0.5}s`,
      }}
    >
      <div
        style={{
          width: card.width,
          height: card.height,
          borderRadius: 18,
          background: card.gradient,
          transform: `rotate(${card.rotation}deg) scale(${scale})`,
          opacity,
          transition: 'transform 0.35s ease, opacity 0.35s ease',
          overflow: 'hidden',
          boxShadow: proximity > 0.35
            ? `0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(255,154,0,${(proximity * 0.25).toFixed(2)})`
            : '0 8px 24px rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ padding: 14, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
            <div style={{ width: 54, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ width: 28, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <div style={{ width: '100%', height: '55%', borderRadius: 10, background: 'rgba(255,255,255,0.06)', marginTop: 10 }} />
          <div>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat,sans-serif', marginBottom: 2 }}>{card.label}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'Montserrat,sans-serif' }}>{card.sublabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [heroDims, setHeroDims] = useState({ w: 0, h: 0 });

  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "center center"],
  });
  const logoClipPath = useTransform(
    aboutScrollProgress,
    [0, 1],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHeroDims({ w: rect.width, h: rect.height });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: -1000, y: -1000 });
  }, []);

  return (
    <div className="min-h-screen bg-[#06040E] text-foreground flex flex-col font-sans selection:bg-primary/30 overflow-x-hidden">

      {/* 1. Pill Navigation */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <nav className="flex items-center justify-between gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5">
          <img src={logoWhite} alt="ELKAM Studios" className="h-7 w-auto shrink-0" />
          <div className="hidden md:flex items-center gap-1 text-sm">
            {['work','services','about','contact'].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className="px-3 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/8 transition-all capitalize font-medium">
                {id}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            data-testid="button-nav-cta"
            className="bg-[#FF9A00] hover:bg-[#e88a00] text-[#06040E] font-bold font-serif rounded-full px-5 py-2 text-sm transition-all hover:scale-105 shrink-0"
          >
            Let's Talk
          </button>
        </nav>
      </div>

      {/* 2. Dark Cinematic Hero */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[82dvh] md:min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: '#06040E' }}
      >
        {/* Orange spotlight from bottom-center */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 55% 60% at 50% 105%, rgba(255,154,0,0.11) 0%, rgba(107,44,163,0.05) 45%, transparent 72%)'
        }} />
        {/* Subtle top glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% -10%, rgba(107,44,163,0.08) 0%, transparent 60%)'
        }} />

        {/* Floating project cards — hidden on mobile */}
        <div className="hidden md:block">
          {HERO_CARDS.map((card, i) => (
            <HeroCard key={i} card={card} mouse={mouse} heroDims={heroDims} />
          ))}
        </div>

        {/* Floating cards — mobile only, 8 cards distributed along left/right edges */}
        <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {[
            { card: HERO_CARDS[0], style: { left: -20, top: 76 } },
            { card: HERO_CARDS[1], style: { right: -20, top: 96 } },
            { card: HERO_CARDS[6], style: { left: -24, top: 248 } },
            { card: HERO_CARDS[7], style: { right: -24, top: 232 } },
            { card: HERO_CARDS[2], style: { left: -24, bottom: 180 } },
            { card: HERO_CARDS[3], style: { right: -24, bottom: 165 } },
            { card: HERO_CARDS[4], style: { left: -22, bottom: 48 } },
            { card: HERO_CARDS[9], style: { right: -22, bottom: 40 } },
          ].map(({ card, style }, i) => (
            <div
              key={i}
              className="absolute select-none"
              style={{
                ...style,
                animation: `${FLOAT_ANIMS[card.floatAnim - 1]} ${6 + card.delay * 0.6}s ease-in-out infinite ${card.delay * 0.5}s`,
              }}
            >
              <div
                style={{
                  width: 76, height: 100, borderRadius: 12,
                  background: card.gradient,
                  transform: `rotate(${card.rotation * 0.6}deg)`,
                  opacity: 0.2,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
                }}
              >
                <div style={{ padding: 8, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ width: 22, height: 2.5, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
                    <div style={{ width: 34, height: 2.5, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
                    <div style={{ width: 16, height: 2.5, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
                  </div>
                  <div style={{ width: '100%', height: '48%', borderRadius: 6, background: 'rgba(255,255,255,0.06)', marginTop: 6 }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 8, fontWeight: 700, fontFamily: 'Poppins,sans-serif', marginBottom: 1 }}>{card.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 7, fontFamily: 'Poppins,sans-serif' }}>{card.sublabel}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center content */}
        <div className="relative z-10 w-full text-center max-w-5xl mx-auto px-4 md:px-6 pt-16 md:pt-24 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-white/35 text-[10px] md:text-xs font-medium tracking-[0.28em] uppercase mb-3 md:mb-8"
          >
            Premium Creative Agency
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1 }}
            className="font-serif font-black text-[28px] md:text-6xl lg:text-[78px] text-white leading-[1.1] tracking-tight mb-4 md:mb-6"
          >
            Unhinged ideas.<br />
            <span className="text-[#FF9A00]">Authentic storytelling.</span><br />
            Real impact.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
            className="text-white/55 text-[13px] md:text-lg mb-8 w-full max-w-xl mx-auto font-light leading-[1.65]"
          >
            ELKAM Studios crafts brands, campaigns, and digital experiences that stop the scroll and start conversations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36 }}
          >
            <button
              onClick={() => scrollTo('contact')}
              data-testid="button-hero-cta"
              className="inline-flex items-center gap-2 bg-[#FF9A00] hover:bg-[#e88a00] text-[#06040E] font-bold font-serif rounded-full px-6 py-3 text-sm md:px-10 md:py-4 md:text-lg transition-all hover:scale-105 active:scale-95"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Arc at bottom — continues into next section */}
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-[150%] pointer-events-none" style={{ lineHeight: 0 }}>
          <div style={{
            width: '100%',
            aspectRatio: '4 / 1',
            borderRadius: '50% 50% 0 0',
            background: '#0E0A1A',
            boxShadow: '0 -50px 130px rgba(255,154,0,0.06), 0 -100px 220px rgba(107,44,163,0.04)',
            marginTop: '-20%',
          }} />
        </div>
      </section>

      {/* Results Stats */}
      <section className="bg-[#0E0A1A] py-12 md:py-20 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/8"
          >
            {[
              { number: "150+", label: "Videos Produced" },
              { number: "1.1M+", label: "Views Generated" },
              { number: "96%", label: "Client Retention" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center justify-center py-3 md:py-10 px-3 md:px-8 text-center group"
              >
                <span
                  data-testid={`stat-number-${i}`}
                  className="font-serif font-black text-4xl md:text-7xl lg:text-8xl leading-none tracking-tight bg-gradient-to-br from-[#FF9A00] to-[#FFD580] bg-clip-text text-transparent mb-3"
                >
                  {stat.number}
                </span>
                <span className="text-white/50 text-sm font-medium tracking-[0.18em] uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" ref={aboutRef} className="py-8 md:py-16 bg-background relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Left — logo mark, scroll-reveal from top to bottom */}
            <motion.div variants={fadeInUp} className="relative flex items-center justify-start max-h-[180px] lg:max-h-none overflow-hidden">
              {/* Ghost base — always faintly visible so user notices something is there */}
              <img
                src={logoMark}
                alt=""
                aria-hidden
                className="w-full max-w-[600px] select-none pointer-events-none"
                style={{ mixBlendMode: 'screen', opacity: 0.07 }}
              />
              {/* Animated reveal layer — fills with orange from top as user scrolls */}
              <motion.img
                src={logoMark}
                alt="ELKAM Studios mark"
                className="absolute inset-0 w-full max-w-[600px]"
                style={{ mixBlendMode: 'screen', clipPath: logoClipPath }}
              />
            </motion.div>

            {/* Right — content */}
            <motion.div variants={fadeInUp} className="flex flex-col justify-center">
              <p className="text-[#FF9A00] text-xs font-semibold tracking-[0.25em] uppercase mb-4">About Us</p>
              <h2 className="font-serif font-black text-3xl md:text-5xl lg:text-6xl text-white leading-[1.08] mb-6">
                We don't do <span className="text-[#FF9A00]">ordinary.</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-[1.8] font-light">
                We create{" "}
                <span className="text-white font-semibold">strategy</span>,{" "}
                <span className="text-white font-semibold">design systems</span> and{" "}
                <span className="text-[#FF9A00] font-semibold">unfiltered content</span>{" "}
                that make brands{" "}
                <span className="text-white font-semibold italic">impossible to ignore</span>.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Brand Strategy", "Visual Identity", "Content Creation", "Growth Marketing"].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full border border-white/10 text-white/60 text-xs font-medium hover:border-[#FF9A00]/40 hover:text-[#FF9A00] transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Services - Dark Section */}
      <section id="services" className="py-16 md:py-32 bg-[#0E0A1A] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-10 md:mb-16"
          >
            <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              Six disciplines. <span className="text-[#FF9A00]">One studio.</span><br />
              <span className="text-white/35">All under one roof.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              {
                num: "01", title: "Brand Identity",
                desc: "Strategy, naming, visual & verbal systems engineered to compound in value.",
                tags: ["Strategy", "Identity"]
              },
              {
                num: "02", title: "Digital Product",
                desc: "Editorial interfaces and design systems that feel intuitive and quietly luxurious.",
                tags: ["UX/UI", "Design Systems"]
              },
              {
                num: "03", title: "AI Solutions",
                desc: "Applied AI products, agents and workflow tooling — engineered, not bolted on.",
                tags: ["Applied AI", "Agents"]
              },
              {
                num: "04", title: "Web Experiences",
                desc: "Cinematic, considered sites built as worlds — not pages.",
                tags: ["Editorial Sites", "Launches"]
              },
              {
                num: "05", title: "Creative Direction",
                desc: "Art direction, campaigns, photography and film with a singular point of view.",
                tags: ["Art Direction", "Campaigns"]
              },
              {
                num: "06", title: "Content & Editorial",
                desc: "Engines that earn attention, then loyalty — built to scale.",
                tags: ["Strategy", "Editorial"]
              },
            ].map((svc, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative bg-[#1A1229] p-6 md:p-10 rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-400 ease-out border border-white/5 hover:border-[#FF9A00]/20 flex flex-col"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF9A00] to-[#FFD580] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="font-serif font-black text-3xl md:text-5xl text-[#FF9A00]/80 mb-3 md:mb-5 leading-none">{svc.num}</div>
                <h3 className="font-serif font-bold text-xl md:text-2xl mb-3 text-white">{svc.title}</h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed flex-1">{svc.desc}</p>
                <div className="mt-6 flex items-center justify-between gap-2">
                  <div className="flex gap-2 min-w-0 overflow-hidden">
                    {svc.tags.map((tag, ti) => (
                      <span key={ti} className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/8 text-white/50 text-[10px] md:text-xs font-medium whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 text-[#FF9A00] text-lg font-light opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 md:mt-14 text-center text-white/35 text-sm font-medium tracking-[0.2em] uppercase"
          >
            Engaged as a long partner — never a vendor.
          </motion.p>
        </div>
      </section>

      {/* 6. Selected Work */}
      <section id="work" className="py-12 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-8 md:mb-16"
          >
            <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl text-foreground">Taste that translates<br /><span className="text-[#FF9A00]">into growth.</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {[
              { name: "belong", niche: "Fitness", logo: logoBelong, bg: "#E8F535", cover: false, padding: "p-6" },
              { name: "thunify.in", niche: "Clothing", logo: logoThunify, bg: "#0A0A0A", cover: true, padding: "" },
              { name: "wellfed", niche: "Food", logo: logoWellfed, bg: "#FFFFFF", cover: false, padding: "p-4" },
              { name: "Rathi Silks & Sarees", niche: "Clothing", logo: logoRathi, bg: "#B23D4C", cover: true, padding: "" },
              { name: "Clinzor", niche: "Healthcare", logo: logoClinzor, bg: "#2B35AD", cover: true, padding: "" },
              { name: "The Windsouls", niche: "Real Estate", logo: logoWindsouls, bg: "#111111", cover: false, padding: "p-8" },
            ].map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.04] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ backgroundColor: work.bg, boxShadow: '0 0 0 1px rgba(255,154,0,0.25), 0 0 24px 4px rgba(255,154,0,0.18)' }}
              >
                {/* Default State: Logo image */}
                <img
                  src={work.logo}
                  alt={work.name}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0 ${work.cover ? 'object-cover' : `object-contain ${work.padding}`}`}
                />

                {/* Hover State: Uniform purple gradient + Niche */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3D1773] to-[#7B35BE] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-black text-sm md:text-4xl text-white/90 tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {work.niche}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Wall of Love — 3-column infinite scroll */}
      <section className="py-12 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-8 md:mb-14"
          >
            <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl text-foreground">What <span className="text-[#FF9A00]">our clients</span> say.</h2>
          </motion.div>
        </div>

        {/* Full-bleed scroller — no container constraint so edges can bleed */}
        <div className="flex gap-3 md:gap-4 px-4 md:px-6 h-[380px] md:h-[640px]" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
          {[
            { col: wolvColA, anim: "scrollUpA", dur: 32 },
            { col: wolvColB, anim: "scrollUpB", dur: 26 },
            { col: wolvColC, anim: "scrollUpC", dur: 36 },
          ].map(({ col, anim, dur }, ci) => (
            <div key={ci} className={`${ci === 0 ? '' : 'hidden md:block '}flex-1 overflow-hidden relative`}>
              <div
                className="flex flex-col gap-4"
                style={{ animation: `${anim} ${dur}s linear infinite` }}
              >
                {[...col, ...col].map((c, i) => (
                  <div key={i} className="bg-[#100C1E] border border-white/8 rounded-2xl p-5 shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                        style={{ background: c.color }}
                      >
                        {c.initials}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold leading-none mb-0.5">{c.initials.split('').join('. ')}</div>
                        <div className="text-white/40 text-xs">{c.handle}</div>
                      </div>
                    </div>
                    <p className="text-white/75 text-sm leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — Available For Work */}
      <section id="contact" className="bg-[#06040E] relative overflow-hidden py-16 md:py-28">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(107,44,163,0.22) 0%, transparent 70%)'
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,154,0,0.06) 0%, transparent 70%)'
        }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-5 md:gap-8"
          >
            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#4ADE80]" />
              Available For Work
            </div>

            {/* Headline */}
            <h2 className="font-serif font-black text-2xl md:text-4xl lg:text-6xl text-white leading-[1.1] max-w-4xl mt-2 md:mt-6">
              Let's <span className="text-[#FF9A00]">kickstart</span> your project and bring your <span className="text-[#FF9A00]">ideas</span> to <span className="text-[#FF9A00]">life</span> together.
            </h2>

            {/* CTA button */}
            <button
              onClick={() => setModalOpen(true)}
              data-testid="button-contact-submit"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-[#FF9A00] hover:border-[#FF9A00] hover:text-[#06040E] text-white font-semibold rounded-full px-6 py-3 text-sm md:px-8 md:py-4 md:text-base transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Book a Free Call <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#06040E] border-t border-white/8">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-14">

            {/* Left — logo + tagline + socials */}
            <div className="flex flex-col gap-5 md:gap-6 max-w-full md:max-w-[220px]">
              <img src={logoWhite} alt="ELKAM Studios" className="w-auto max-h-20 object-contain object-left" />
              <p className="text-white/35 text-[11px] font-semibold tracking-[0.22em] uppercase">
                Strategy · Design · Technology · Story
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/elkamstudios/" },
                  { Icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/company/elkam-studios" },
                  { Icon: Mail,      label: "Email",     href: "mailto:support@elkamstudios.com" },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-[#FF9A00] hover:border-[#FF9A00]/40 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — two columns */}
            <div className="grid grid-cols-2 gap-8 md:gap-16">
              {/* Studio */}
              <div>
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.25em] mb-6">Studio</p>
                <ul className="space-y-4">
                  {[
                    { label: 'Work',         id: 'work'     },
                    { label: 'About',        id: 'about'    },
                    { label: 'Capabilities', id: 'services' },
                  ].map(({ label, id }) => (
                    <li key={id}>
                      <button onClick={() => scrollTo(id)}
                        className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Elsewhere */}
              <div>
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.25em] mb-6">Elsewhere</p>
                <ul className="space-y-4">
                  <li><a href="https://www.instagram.com/elkamstudios/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Instagram</a></li>
                  <li><a href="https://www.linkedin.com/company/elkam-studios" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-sm font-medium">LinkedIn</a></li>
                  <li><a href="mailto:support@elkamstudios.com" className="text-white/60 hover:text-white transition-colors text-sm font-medium break-all">support@elkamstudios.com</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="container mx-auto px-4 md:px-6 py-5 border-t border-white/8">
          <p className="text-white/25 text-xs text-center">© 2025 ELKAM Studios. All rights reserved.</p>
        </div>
      </footer>

      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Home;
