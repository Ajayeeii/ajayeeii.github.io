import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";
import Prince from "./assets/Prince.png";
import africanPattern from "./assets/Vector/vecteezy_african-seamless-pattern_48055933.jpg";
import blackPantherLogo from "./assets/blackpantherlogo.png";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SKILLS = {
    "Languages": [
        "Python",
        "JavaScript",
        "TypeScript",
        "PHP",
        "HTML",
        "CSS"
    ],

    "Frontend": [
        "React.js",
        "TypeScript",
        "Responsive UI"
    ],

    "Backend & APIs": [
        "FastAPI",
        "Flask",
        "Django",
        "REST APIs",
        "API Integration"
    ],

    "AI & LLMs": [
        "Large Language Models",
        "Ollama",
        "Hugging Face",
        "LangChain",
        "RAG",
        "Prompt Engineering",
        "AI Chatbots",
        "LLM Integration"
    ],

    "Machine Learning & NLP": [
        "Scikit-Learn",
        "XGBoost",
        "spaCy",
        "NLP",
        "TF-IDF",
        "Linear SVM",
        "Feature Engineering",
        "Model Training",
        "Model Evaluation"
    ],

    "Computer Vision": [
        "OpenCV",
        "CNNs",
        "Computer Vision",
        "CUDA",
        "GPU-Accelerated Training"
    ],

    "Databases": [
        "MongoDB",
        "MySQL",
        "SQL",
        "phpMyAdmin",
        "ChromaDB"
    ],

    "Tools & Platforms": [
        "Git",
        "GitHub",
        "AWS",
        "Cloudflare",
        "Postman",
        "Joblib",
        "Agile Development"
    ]
};

const PROJECTS = [
    {
        title: "AI Codebase Assistant",
        tech: [
            "React",
            "Vite",
            "TypeScript",
            "Tailwind CSS",
            "FastAPI",
            "Python",
            "Ollama",
            "GitPython"
        ],
        desc: "Built a full-stack AI-powered codebase assistant that analyzes GitHub repositories using local LLMs via Ollama. Implemented GitHub repository cloning and an interactive file explorer for browsing project structure and source code. Developed an AI chat interface for repository-specific questions and AI-powered Explain File, Find Bugs, and Improve Code features.",
        icon: "⬢",
    },
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



const WakandanPattern = () => (
    <div
        style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",

            backgroundImage: `
                linear-gradient(
                    rgba(147,51,234,0.25),
                    rgba(147,51,234,0.25)
                ),
                url(${africanPattern})
            `,

            backgroundRepeat: "repeat",
            backgroundSize: "1000px auto",
            backgroundPosition: "center",

            opacity: 0.12,
            filter: "brightness(0.35) contrast(1.6)",
        }}
    />
);



// Claws scratch SVG
const ClawMarks = ({ style }) => (
    <svg viewBox="0 0 120 40" style={{ ...style, opacity: 0.18 }} xmlns="http://www.w3.org/2000/svg">

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
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(60px)",
                filter: visible ? "blur(0px)" : "blur(6px)",
                transition:
                    "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.9s ease",
                willChange: "transform, opacity",
            }}
        >
            {children}
        </section>
    );
};

export default function Portfolio() {
    const [activeNav, setActiveNav] = useState("About");
    const [menuOpen, setMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({
            behavior: "smooth"
        });

        setMenuOpen(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("ajaygireesh2@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                (window.scrollY / totalHeight) * 100;

            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll(
            "#about, #experience, #projects, #skills, #contact"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;

                        setActiveNav(
                            id.charAt(0).toUpperCase() +
                            id.slice(1)
                        );
                    }
                });
            },
            {
                rootMargin: "-30% 0px -50% 0px",
                threshold: 0,
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div style={{
            background: "#050508",
            minHeight: "100vh",
            fontFamily: "'Georgia', serif",
            color: "#e8e8f0",
            position: "relative",
            overflowX: "hidden",
        }}>

            <WakandanPattern />


            <Particles />

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "4px",
                    width: `${scrollProgress}%`,
                    background:
                        "linear-gradient(90deg,#9333ea,#c084fc,#ffffff)",
                    zIndex: 9999,
                    transition: "width 0.1s linear",
                    boxShadow: "0 0 12px #9333ea",
                }}
            />AG

            {/* NAV */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                background: "rgba(5,5,8,0.85)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(147,51,234,0.2)",
                padding: "14px 32px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div
                    style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: "#c084fc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={blackPantherLogo}
                        alt="Black Panther"
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            filter:
                                "brightness(0) invert(1) sepia(0.2) saturate(0) brightness(1.2)"
                        }}
                    />
                </div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }} className="desktop-nav">
                    {NAV_LINKS.map(l => (
                        <button key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollTo(l)}>
                            {l}
                        </button>
                    ))}
                </div>
            </nav>

            {/* HERO */}
            <div
                id="about"
                style={{
                    minHeight: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    textAlign: "center",
                    padding: "120px 40px 80px",
                }}
            >

                <ClawMarks style={{ position: "absolute", top: "15%", right: "5%", width: 120, height: 40 }} />
                <ClawMarks style={{ position: "absolute", bottom: "20%", left: "3%", width: 90, height: 30, transform: "rotate(180deg)" }} />

                {/* Avatar placeholder with initials */}
                <div className="hero-avatar-container">
                    <div className="hero-avatar-glow"></div>

                    <div className="hero-avatar-ring">
                        <img
                            src={Prince}
                            alt="Ajay Gireesh"
                            className="hero-avatar"
                        />
                    </div>


                </div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "0 40px"
                    }}
                >
                    <p
                        className="body-font"
                        style={{
                            fontSize: "0.78rem",
                            letterSpacing: "0.35em",
                            textTransform: "uppercase",
                            marginBottom: 16,
                            fontWeight: 500,

                            background:
                                "linear-gradient(90deg, #9333ea 0%, #e8e8e8 50%, #9333ea 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",

                            textShadow: `
      0 0 4px rgba(232,232,232,0.4),
      0 0 10px rgba(192,192,192,0.25)
    `,
                        }}
                    >
                        ◈ AI/ML Engineer & Full Stack Developer ◈
                    </p>
                    <h1 className="hero-name hero-reveal" style={{
                        fontSize: "clamp(4rem, 10vw, 8rem)",
                        fontWeight: 900,
                        letterSpacing: "0.06em",
                        lineHeight: 1.05,
                        textTransform: "uppercase",
                        filter: "drop-shadow(0 0 25px rgba(147,51,234,.3))",
                        background: "linear-gradient(135deg, #c084fc 0%, #e8e8f0 40%, #c0c0c0 70%, #9333ea 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "shimmer 4s linear infinite",
                        marginBottom: 24,
                    }}>
                        Ajay Gireesh
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
                        {[["1+", "Years Exp."], ["11+", "Company Projects"], ["4+", "Personal ML Projects"], ["3", "Countries"], ["10+", "Tech Stack"]].map(([num, label]) => (
                            <div key={label} style={{ textAlign: "center" }}>
                                <div className="title-font" style={{ fontSize: "2rem", fontWeight: 700, color: "#9333ea" }}>{num}</div>
                                <div className="body-font" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#808080", textTransform: "uppercase" }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

            {/* EXPERIENCE */}
            <Section id="experience">
                <div style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
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
                                    <span
                                        className="body-font"
                                        style={{
                                            fontSize: "0.72rem",
                                            letterSpacing: "0.1em",
                                            color: "#9333ea",
                                            padding: "4px 14px",
                                            border: "1px solid rgba(147,51,234,0.4)",
                                            borderRadius: 20,
                                            fontWeight: 700, // Bold
                                        }}
                                    >
                                        June 2025 – Present
                                    </span>
                                </div>

                                <ul
                                    className="body-font"
                                    style={{
                                        listStyle: "none",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    {[
                                        "Developed and maintained 11+ enterprise-grade web applications across finance, payroll, analytics, project management, onboarding, authentication, and employee management domains.",
                                        "Received the Employee Excellence Award from CSA Engineering in July 2026 for exceptional performance, dedication, and outstanding contributions to AI and software engineering projects.",

                                        "Owned full-stack development responsibilities, delivering scalable frontend and backend solutions using React, TypeScript, Python, PHP, MySQL, and MongoDB.",

                                        "Designed, developed, and consumed RESTful APIs using FastAPI, Flask, and PHP, ensuring secure and efficient system integrations.",

                                        "Built AI-powered internal tools using Ollama LLMs to enhance organizational knowledge retrieval and employee productivity.",

                                        "Worked in Agile environments following SDLC best practices, Git workflows, code reviews, testing standards, and production deployment processes.",

                                        
                                    ].map((point, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                display: "flex",
                                                gap: 14,
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "#9333ea",
                                                    fontSize: "0.8rem",
                                                    marginTop: 3,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                ◆
                                            </span>

                                            <span
                                                style={{
                                                    fontSize: "0.9rem",
                                                    lineHeight: 1.7,
                                                    color: "#a8a8c0",
                                                }}
                                            >
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* PROJECTS */}
            <Section id="projects">
                <div style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
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
                </div>
            </Section>

            {/* SKILLS */}
            <Section id="skills">
                <div style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>
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
                                <p className="body-font" style={{ fontSize: "0.92rem", color: "#e2e2f0", fontWeight: 500, marginBottom: 4 }}>B.Tech — AI & ML Engineering</p>
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
                </div>
            </Section>

            {/* CONTACT */}
            <Section id="contact">
                <div style={{ padding: "100px 24px 140px", maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>

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
                            <span className="body-font" style={{ fontSize: "0.95rem", color: "#c0c0c0", letterSpacing: "0.04em" }}>ajaygireesh2@gmail.com</span>
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
                    ◆ Ajay Gireesh · AI/ML Engineer · Bengaluru, India . Designed and Developed by Ajay Gireesh ◆
                </p>
            </footer>
        </div>
    );
}
