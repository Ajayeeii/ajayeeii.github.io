import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SKILLS = {
  "Languages": ["Python", "JavaScript", "TypeScript", "PHP", "HTML", "CSS"],
  "Frontend": ["React.js", "TypeScript", "Responsive UI"],
  "Backend & APIs": ["FastAPI", "Flask", "Django", "REST APIs"],
  "ML & NLP": ["Scikit-Learn", "spaCy", "XGBoost", "TF-IDF", "Linear SVM", "Feature Engineering"],
  "CV & AI": [
    "OpenCV",
    "CNNs",
    "LLM Integration (Ollama)",
    "LangChain",
    "RAG",
    "ChromaDB",
    "Embeddings"
  ],
  "Databases": ["MongoDB", "MySQL", "SQL"],
  "Tools": ["Git", "GitHub", "AWS", "Postman", "Agile"],
};

const PROJECTS = [
  {
    title: "Enterprise Knowledge Hub",
    tech: ["React", "TypeScript", "FastAPI", "LangChain", "Ollama", "ChromaDB", "RAG"],
    desc: "Built a full-stack Retrieval-Augmented Generation (RAG) platform for uploading enterprise documents and answering questions grounded in their content. Developed document ingestion with validation, processing, chunking, embeddings, ChromaDB vector storage, and semantic retrieval. Implemented RAG services using LangChain, Ollama, qwen2.5:3b, and nomic-embed-text with source attribution. Built FastAPI APIs and a React + TypeScript frontend with reusable UI components and document upload validation.",
    icon: "⬡",
  },
  {
    title: "ML Lead Scoring System",
    tech: ["Python", "XGBoost", "FastAPI", "Scikit-Learn"],
    desc: "End-to-end ML pipeline predicting lead conversion probability with Hot/Warm/Cold classifications. Deployed as a real-time FastAPI REST API for CRM integration.",
    icon: "◈",
  },
  {
    title: "NLP Support Ticket Classifier",
    tech: ["Python", "spaCy", "TF-IDF", "Linear SVM", "FastAPI"],
    desc: "Automated ticket classification system using NLP to categorize support requests and assign priority levels. Trained on 1,500 tickets with Precision, Recall, and F1-Score evaluation.",
    icon: "◉",
  },
  {
    title: "Human Emotion Detection",
    tech: ["Python", "OpenCV", "Flask", "CNNs"],
    desc: "Real-time webcam-based emotion detection using CNNs and OpenCV for face detection. Full-stack AI integration from model training to live inference via Flask API.",
    icon: "◎",
  },
  {
    title: "Customer Churn Prediction",
    tech: ["Python", "Scikit-Learn", "Flask"],
    desc: "Predictive analytics solution identifying at-risk customers using ML on large structured datasets, delivered through a user-facing web interface.",
    icon: "◆",
  },
];

const CERTS = [
  "Artificial Intelligence & Machine Learning – IBM",
  "Data Visualization using Python – IBM",
  "Data Analytics – ExcelR Bengaluru",
  "Python Full Stack – Inmakes Infotech",
];

// Wakandan geometric SVG pattern
const WakandanPattern = () => (
  <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wakanda" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <polygon points="30,2 58,17 58,43 30,58 2,43 2,17" fill="none" stroke="#a855f7" strokeWidth="0.8" />
        <polygon points="30,12 48,22 48,42 30,52 12,42 12,22" fill="none" stroke="#c0c0c0" strokeWidth="0.4" />
        <circle cx="30" cy="30" r="3" fill="none" stroke="#a855f7" strokeWidth="0.6" />
        <line x1="30" y1="2" x2="30" y2="12" stroke="#a855f7" strokeWidth="0.4" />
        <line x1="58" y1="17" x2="48" y2="22" stroke="#a855f7" strokeWidth="0.4" />
        <line x1="58" y1="43" x2="48" y2="42" stroke="#a855f7" strokeWidth="0.4" />
        <line x1="30" y1="58" x2="30" y2="52" stroke="#a855f7" strokeWidth="0.4" />
        <line x1="2" y1="43" x2="12" y2="42" stroke="#a855f7" strokeWidth="0.4" />
        <line x1="2" y1="17" x2="12" y2="22" stroke="#a855f7" strokeWidth="0.4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wakanda)" />
  </svg>
);

// Claws scratch SVG
const ClawMarks = ({ style }) => (
  <svg viewBox="0 0 120 40" style={{ ...style, opacity: 0.18 }} xmlns="http://www.w3.org/2000/svg">
    <path d="M10,5 Q20,20 8,38" stroke="#a855f7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M30,2 Q42,20 28,40" stroke="#a855f7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M50,4 Q62,22 48,38" stroke="#c0c0c0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M70,2 Q80,20 68,40" stroke="#c0c0c0" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M88,5 Q96,20 86,38" stroke="#a855f7" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Vibranium particle bg
const Particles = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? "#a855f7" : "#c0c0c0",
      alpha: Math.random() * 0.6 + 0.2,
    }));
    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

// Animated section wrapper
const Section = ({ id, children, style }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      ...style,
    }}>
      {children}
    </section>
  );
};

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("Ajaygireesh2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: "#050508",
      minHeight: "100vh",
      fontFamily: "'Georgia', serif",
      color: "#e8e8f0",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Raleway:wght@300;400;500;600&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --purple: #9333ea;
          --purple-light: #c084fc;
          --purple-dark: #581c87;
          --silver: #c0c0c0;
          --silver-light: #e8e8e8;
          --silver-dark: #808080;
          --black: #050508;
          --black-2: #0d0d12;
          --black-3: #12121a;
          --black-4: #1a1a24;
          --glow-purple: 0 0 20px rgba(147,51,234,0.4);
          --glow-silver: 0 0 20px rgba(192,192,192,0.2);
        }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--black); }
        ::-webkit-scrollbar-thumb { background: var(--purple-dark); border-radius: 4px; }

        .title-font { font-family: 'Cinzel', serif; }
        .body-font { font-family: 'Raleway', sans-serif; }

        .nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--silver);
          text-decoration: none;
          padding: 6px 14px;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--purple-light);
          border-color: var(--purple);
          box-shadow: var(--glow-purple);
          text-shadow: 0 0 8px rgba(192,132,252,0.6);
        }

        .skill-chip {
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem;
          padding: 4px 12px;
          border: 1px solid rgba(147,51,234,0.4);
          border-radius: 20px;
          color: var(--silver-light);
          background: rgba(147,51,234,0.08);
          transition: all 0.25s;
          display: inline-block;
          margin: 4px;
        }
        .skill-chip:hover {
          background: rgba(147,51,234,0.25);
          border-color: var(--purple-light);
          color: #fff;
          box-shadow: 0 0 10px rgba(147,51,234,0.3);
          transform: translateY(-2px);
        }

        .project-card {
          background: linear-gradient(135deg, rgba(18,18,26,0.95) 0%, rgba(13,13,18,0.98) 100%);
          border: 1px solid rgba(147,51,234,0.25);
          border-radius: 8px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: default;
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--purple), var(--silver), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .project-card:hover {
          border-color: rgba(147,51,234,0.6);
          box-shadow: 0 8px 32px rgba(147,51,234,0.2), 0 0 0 1px rgba(147,51,234,0.15);
          transform: translateY(-4px);
        }
        .project-card:hover::before { opacity: 1; }

        .section-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #c084fc 0%, #e2e2e8 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .section-divider {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, var(--purple), var(--silver), transparent);
          margin-bottom: 40px;
        }

        .glow-border {
          border: 1px solid rgba(147,51,234,0.3);
          box-shadow: inset 0 0 20px rgba(147,51,234,0.05);
        }

        .vibranium-btn {
          font-family: 'Cinzel', serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-size: 0.78rem;
          padding: 12px 28px;
          background: linear-gradient(135deg, rgba(147,51,234,0.2), rgba(88,28,135,0.3));
          border: 1px solid var(--purple);
          color: var(--purple-light);
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .vibranium-btn:hover {
          background: linear-gradient(135deg, rgba(147,51,234,0.4), rgba(88,28,135,0.5));
          box-shadow: var(--glow-purple);
          color: #fff;
        }

        .cert-item {
          font-family: 'Raleway', sans-serif;
          font-size: 0.88rem;
          color: var(--silver);
          padding: 12px 20px;
          border-left: 2px solid var(--purple);
          margin-bottom: 12px;
          background: rgba(147,51,234,0.05);
          border-radius: 0 4px 4px 0;
          transition: all 0.3s;
        }
        .cert-item:hover {
          border-left-color: var(--silver);
          background: rgba(192,192,192,0.05);
          padding-left: 28px;
        }

        @keyframes heroGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(147,51,234,0.4); }
          50% { text-shadow: 0 0 40px rgba(192,132,252,0.7), 0 0 60px rgba(147,51,234,0.3); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147,51,234,0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 12px rgba(147,51,234,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147,51,234,0); }
        }

        .hero-name {
          animation: heroGlow 3s ease-in-out infinite;
        }

        .avatar-ring {
          animation: pulse-ring 3s ease-out infinite;
        }
      `}</style>

      <Particles />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(5,5,8,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(147,51,234,0.2)",
        padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.2em", color: "#c084fc" }}>
          AG<span style={{ color: "#808080" }}> ◆ </span>
        </div>
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <button key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div id="about" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", textAlign: "center",
        padding: "120px 24px 80px",
      }}>
        <WakandanPattern />
        <ClawMarks style={{ position: "absolute", top: "15%", right: "5%", width: 120, height: 40 }} />
        <ClawMarks style={{ position: "absolute", bottom: "20%", left: "3%", width: 90, height: 30, transform: "rotate(180deg)" }} />

        {/* Avatar placeholder with initials */}
        <div className="avatar-ring" style={{
          width: 110, height: 110,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a1a24, #0d0d12)",
          border: "2px solid rgba(147,51,234,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32,
          position: "relative",
          zIndex: 1,
        }}>
          <div style={{
            width: 98, height: 98, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(147,51,234,0.2), rgba(88,28,135,0.3))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cinzel', serif", fontSize: "1.8rem", fontWeight: 700,
            color: "#c084fc",
          }}>AG</div>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <p className="body-font" style={{ fontSize: "0.78rem", letterSpacing: "0.35em", color: "#9333ea", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
            ◈ AI/ML Engineer & Full Stack Developer ◈
          </p>
          <h1 className="title-font hero-name" style={{
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            fontWeight: 900,
            letterSpacing: "0.06em",
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #c084fc 0%, #e8e8f0 40%, #c0c0c0 70%, #9333ea 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 4s linear infinite",
            marginBottom: 24,
          }}>
            Ajay<br />Gireesh
          </h1>

          <p className="body-font" style={{
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            lineHeight: 1.8,
            color: "#a0a0b8",
            maxWidth: 600,
            margin: "0 auto 36px",
            fontWeight: 300,
          }}>
            Building intelligent systems at the intersection of AI and modern web.
            1+ year crafting LLM integrations, ML pipelines, and scalable APIs
            for clients across India, Australia & New Zealand.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="vibranium-btn" onClick={() => scrollTo("Projects")}>View Projects</button>
            <button className="vibranium-btn" onClick={() => scrollTo("Contact")} style={{ background: "transparent", borderColor: "#808080", color: "#c0c0c0" }}>
              Contact
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
            {[["1+", "Years Exp."], ["4+", "ML Projects"], ["3", "Countries"], ["10+", "Tech Stack"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div className="title-font" style={{ fontSize: "2rem", fontWeight: 700, color: "#9333ea" }}>{num}</div>
                <div className="body-font" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#808080", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, #9333ea)", margin: "0 auto" }} />
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#9333ea", fontFamily: "'Cinzel', serif", marginTop: 8 }}>SCROLL</div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <Section id="experience" style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <p className="title-font" style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#9333ea", marginBottom: 12, textTransform: "uppercase" }}>— Chronicles —</p>
        <h2 className="section-title">Experience</h2>
        <div className="section-divider" />

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #9333ea, transparent)" }} />

          <div style={{ paddingLeft: 56 }}>
            {/* Timeline dot */}
            <div style={{
              position: "absolute", left: 10, top: 8,
              width: 18, height: 18, borderRadius: "50%",
              background: "#050508",
              border: "2px solid #9333ea",
              boxShadow: "0 0 12px rgba(147,51,234,0.6)",
            }} />

            <div className="glow-border" style={{ borderRadius: 8, padding: "32px 36px", background: "rgba(13,13,18,0.9)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                <div>
                  <h3 className="title-font" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#c084fc", letterSpacing: "0.08em" }}>
                    AI/ML Engineer
                  </h3>
                  <p className="body-font" style={{ fontSize: "0.9rem", color: "#c0c0c0", marginTop: 4, letterSpacing: "0.05em" }}>CSA Engineering</p>
                </div>
                <span className="body-font" style={{
                  fontSize: "0.72rem", letterSpacing: "0.1em",
                  color: "#9333ea", padding: "4px 14px",
                  border: "1px solid rgba(147,51,234,0.4)",
                  borderRadius: 20,
                }}>June 2025 – Present</span>
              </div>

              <ul className="body-font" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Built full-stack web apps for clients across Australia and New Zealand — community platforms, payroll systems, finance dashboards, and onboarding portals.",
                  "Integrated LLMs via Ollama to create an internal AI chatbot enabling employees to query organizational knowledge through natural language.",
                  "Developed and consumed RESTful APIs using FastAPI, Flask, PHP and React — ensuring scalable, maintainable service communication.",
                  "Worked across React, TypeScript, Python, PHP, MySQL, MongoDB in Agile sprints, following SDLC best practices and version control workflows.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "#9333ea", fontSize: "0.8rem", marginTop: 3, flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#a8a8c0" }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <p className="title-font" style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#9333ea", marginBottom: 12, textTransform: "uppercase" }}>— Innovations —</p>
        <h2 className="section-title">Projects</h2>
        <div className="section-divider" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {PROJECTS.map((p) => (
            <div key={p.title} className="project-card">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: "1.8rem", color: "#9333ea", filter: "drop-shadow(0 0 6px rgba(147,51,234,0.6))" }}>{p.icon}</span>
                <h3 className="title-font" style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.06em", color: "#e2e2f0", lineHeight: 1.3 }}>{p.title}</h3>
              </div>
              <p className="body-font" style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "#8888a8", marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.68rem", padding: "3px 10px",
                    border: "1px solid rgba(192,192,192,0.2)",
                    borderRadius: 3, color: "#c0c0c0",
                    letterSpacing: "0.06em",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <p className="title-font" style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#9333ea", marginBottom: 12, textTransform: "uppercase" }}>— Arsenal —</p>
        <h2 className="section-title">Skills</h2>
        <div className="section-divider" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
          {Object.entries(SKILLS).map(([cat, skills]) => (
            <div key={cat} className="glow-border" style={{
              borderRadius: 8, padding: "24px 28px",
              background: "rgba(13,13,18,0.8)",
            }}>
              <h4 className="title-font" style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#9333ea", textTransform: "uppercase", marginBottom: 16 }}>
                ◈ {cat}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Education + Certs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28, marginTop: 28 }}>
          {/* Education */}
          <div className="glow-border" style={{ borderRadius: 8, padding: "28px", background: "rgba(13,13,18,0.8)" }}>
            <h4 className="title-font" style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#9333ea", textTransform: "uppercase", marginBottom: 20 }}>◈ Education</h4>
            <div style={{ marginBottom: 20 }}>
              <p className="body-font" style={{ fontSize: "0.92rem", color: "#e2e2f0", fontWeight: 500, marginBottom: 4 }}>B.Tech — AI & Machine Learning</p>
              <p className="body-font" style={{ fontSize: "0.8rem", color: "#808080", marginBottom: 4 }}>Hindustan College of Engineering & Technology</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="body-font" style={{ fontSize: "0.75rem", color: "#606080" }}>2020 – 2024</span>
                <span className="body-font" style={{ fontSize: "0.75rem", color: "#9333ea" }}>CGPA: 7.52 / 10</span>
              </div>
            </div>
            <div>
              <p className="body-font" style={{ fontSize: "0.92rem", color: "#e2e2f0", fontWeight: 500, marginBottom: 4 }}>Diploma — Data Analytics</p>
              <p className="body-font" style={{ fontSize: "0.8rem", color: "#808080", marginBottom: 4 }}>ExcelR, Bengaluru</p>
              <span className="body-font" style={{ fontSize: "0.75rem", color: "#606080" }}>2025</span>
            </div>
          </div>

          {/* Certifications */}
          <div className="glow-border" style={{ borderRadius: 8, padding: "28px", background: "rgba(13,13,18,0.8)" }}>
            <h4 className="title-font" style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#9333ea", textTransform: "uppercase", marginBottom: 20 }}>◈ Certifications</h4>
            {CERTS.map(c => <div key={c} className="cert-item">{c}</div>)}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ padding: "100px 24px 140px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <WakandanPattern />
        <p className="title-font" style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#9333ea", marginBottom: 12, textTransform: "uppercase", position: "relative", zIndex: 1 }}>— Initiate Contact —</p>
        <h2 className="section-title" style={{ position: "relative", zIndex: 1 }}>Get In Touch</h2>
        <div className="section-divider" style={{ margin: "0 auto 40px" }} />

        <p className="body-font" style={{ fontSize: "1rem", lineHeight: 1.8, color: "#8888a8", marginBottom: 48, position: "relative", zIndex: 1 }}>
          Open to exciting AI/ML and full-stack opportunities. Whether you have a project, a role, or just want to connect — let's talk.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* Email */}
          <div className="glow-border" style={{
            borderRadius: 6, padding: "18px 32px",
            background: "rgba(13,13,18,0.9)",
            display: "flex", alignItems: "center", gap: 16,
            cursor: "pointer", transition: "all 0.3s",
            width: "100%", maxWidth: 420,
          }} onClick={handleCopy}>
            <span style={{ color: "#9333ea", fontSize: "1.1rem" }}>✉</span>
            <span className="body-font" style={{ fontSize: "0.95rem", color: "#c0c0c0", letterSpacing: "0.04em" }}>Ajaygireesh2@gmail.com</span>
            <span className="body-font" style={{ fontSize: "0.7rem", color: copied ? "#9333ea" : "#606080", marginLeft: "auto" }}>
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>

          {/* Phone */}
          <div className="glow-border" style={{
            borderRadius: 6, padding: "18px 32px",
            background: "rgba(13,13,18,0.9)",
            display: "flex", alignItems: "center", gap: 16,
            width: "100%", maxWidth: 420,
          }}>
            <span style={{ color: "#9333ea", fontSize: "1.1rem" }}>☏</span>
            <span className="body-font" style={{ fontSize: "0.95rem", color: "#c0c0c0", letterSpacing: "0.04em" }}>+91 7591931513</span>
            <span className="body-font" style={{ fontSize: "0.7rem", color: "#606080", marginLeft: "auto" }}>Bengaluru, IN</span>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="vibranium-btn">LinkedIn ↗</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="vibranium-btn" style={{ borderColor: "#808080", color: "#c0c0c0", background: "transparent" }}>GitHub ↗</a>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(147,51,234,0.2)",
        padding: "24px",
        textAlign: "center",
        background: "rgba(5,5,8,0.9)",
      }}>
        <p className="title-font" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#404060", textTransform: "uppercase" }}>
          ◆ Ajay Gireesh · AI/ML Engineer · Bengaluru, India ◆
        </p>
      </footer>
    </div>
  );
}
