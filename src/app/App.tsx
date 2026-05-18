import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Menu, X, Check, ArrowRight, ChevronRight } from "lucide-react";
import svgPaths from "@/imports/Group1/svg-5wpa1iwyht";

const HOLD_DURATION = 5500;
const EXIT_DURATION = 900;

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Reusable logo SVG ────────────────────────────────────────────────────────
function LogoMark({ size = 40 }: { size?: number }) {
  const h = Math.round(size * (368.5 / 361.5));
  return (
    <svg viewBox="0 0 361.5 368.5" width={size} height={h} fill="none">
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="lm_h" x1="158" x2="361.5" y1="281" y2="281">
          <stop offset="0.221289" stopColor="#EBC150" />
          <stop offset="1" stopColor="#CC9913" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="lm_v" x1="100.25" x2="100.25" y1="0" y2="297.5">
          <stop stopColor="#D39D13" />
          <stop offset="0.5497" stopColor="#F8D56B" />
          <stop offset="1" stopColor="#DBA82B" />
        </linearGradient>
      </defs>
      <path d={svgPaths.p399af000} fill="white" />
      <path d={svgPaths.p82e7d80} fill="url(#lm_h)" />
      <path d={svgPaths.p27e6e000} fill="url(#lm_v)" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Início", "Sobre", "Método", "Modalidades", "Contato"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,20,33,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(235,193,80,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "5rem" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <LogoMark size={34} />
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.05rem", color: "#fff", lineHeight: 1.1 }}>
              Log Academy
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.55rem", color: "#EBC150", letterSpacing: "0.22em", fontWeight: 500 }}>
              CAPACITAÇÃO CORPORATIVA
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.72)", letterSpacing: "0.04em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#EBC150")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
            >
              {l}
            </a>
          ))}
          <a
            href="#contato"
            style={{
              background: "linear-gradient(90deg, #B8860B, #EBC150)",
              color: "#0D1B2A",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              padding: "0.6rem 1.5rem",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            FALE CONOSCO
          </a>
        </div>

        <button className="md:hidden" style={{ color: "white", background: "none", border: "none", cursor: "pointer" }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "rgba(10,20,33,0.98)", borderTop: "1px solid rgba(235,193,80,0.15)", padding: "1rem 1.5rem 1.5rem" }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="block"
              style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.82)", fontSize: "0.95rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero — Dobra 1 ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="início"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(155deg, #091523 0%, #0D1B2A 45%, #0A1E35 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Geometric background decorations */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "8%", right: "-5%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(235,193,80,0.07) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(235,193,80,0.04) 0%, transparent 65%)", borderRadius: "50%" }} />
        {/* Diagonal accent line */}
        <div style={{ position: "absolute", top: 0, right: "18%", width: "1px", height: "100%", background: "linear-gradient(180deg, transparent, rgba(235,193,80,0.15) 40%, rgba(235,193,80,0.15) 60%, transparent)", transform: "skewX(-12deg)" }} />
        <div style={{ position: "absolute", top: 0, right: "22%", width: "1px", height: "100%", background: "linear-gradient(180deg, transparent, rgba(235,193,80,0.06) 40%, rgba(235,193,80,0.06) 60%, transparent)", transform: "skewX(-12deg)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full" style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #EBC150, transparent)" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#EBC150", letterSpacing: "0.25em", fontWeight: 500 }}>
                  TREINAMENTO CORPORATIVO
                </span>
              </div>

              <h1 style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}>
                Treinamentos corporativos para transformar pessoas, processos e resultados na{" "}
                <span style={{ color: "#EBC150" }}>logística</span>
              </h1>

              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                A Log Academy desenvolve líderes, gestores e equipes operacionais por meio de treinamentos práticos, workshops e experiências corporativas criadas para empresas de logística, transporte, armazenagem e distribuição.
              </p>

              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Mais do que transmitir conteúdo, capacitamos pessoas para aplicar conhecimento na rotina real da operação. Nossa metodologia conecta gestão, processos, indicadores e liderança.
              </p>

              <div style={{ borderLeft: "2px solid #EBC150", paddingLeft: "1rem", marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem", fontStyle: "italic", color: "#EBC150", lineHeight: 1.6 }}>
                  Conhecimento aplicado. Método prático. Resultado operacional.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#sobre"
                  style={{
                    background: "linear-gradient(90deg, #B8860B, #EBC150)",
                    color: "#0D1B2A",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    padding: "0.9rem 2rem",
                    borderRadius: "2px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  CONHEÇA NOSSAS SOLUÇÕES <ArrowRight size={14} />
                </a>
                <a
                  href="#contato"
                  style={{
                    border: "1px solid rgba(235,193,80,0.5)",
                    color: "#EBC150",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    padding: "0.9rem 2rem",
                    borderRadius: "2px",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  FALE CONOSCO
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — logo large + industries */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="hidden md:flex flex-col items-center"
          >
            <LogoMark size={220} />
            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "rgba(235,193,80,0.6)", letterSpacing: "0.2em", marginBottom: "1rem" }}>
                ESPECIALISTAS EM
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Transportadoras", "Operadores Logísticos", "Armazéns", "Centros de Distribuição", "Indústrias"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(235,193,80,0.2)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "2px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(transparent, #0D1B2A)" }} />
    </section>
  );
}

// ─── Pain — Dobra 2 ───────────────────────────────────────────────────────────
const problems = [
  "Equipes operacionais sem padronização na execução",
  "Líderes com dificuldade para conduzir rotinas, cobrar resultados e desenvolver pessoas",
  "Indicadores pouco utilizados na tomada de decisão",
  "Falhas recorrentes como avarias, faltas, inversões, atrasos e retrabalhos",
  "Comunicação desalinhada entre áreas",
  "Treinamentos muito teóricos, sem aplicação real no dia a dia",
  "Falta de método para transformar conhecimento em resultado",
];

function PainSection() {
  return (
    <section
      id="sobre"
      style={{ background: "#0A1627", padding: "6rem 0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #EBC150, transparent)" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#EBC150", letterSpacing: "0.25em", fontWeight: 500 }}>
              DIAGNÓSTICO
            </span>
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, maxWidth: "700px", marginBottom: "1.25rem" }}>
            Sua operação logística cresce no mesmo ritmo que sua{" "}
            <span style={{ color: "#EBC150" }}>equipe evolui?</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: "680px", marginBottom: "1rem" }}>
            Muitas empresas investem em sistemas, processos e estrutura, mas ainda enfrentam dificuldades porque suas equipes não possuem o mesmo nível de preparo, clareza e método para executar a rotina com padrão.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "680px", marginBottom: "3.5rem" }}>
            Na logística, pequenos desvios geram grandes impactos. Uma liderança sem direcionamento, uma equipe sem padrão ou uma rotina sem indicadores pode resultar em atrasos, retrabalho, baixa produtividade, falhas operacionais e perda de performance.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <FadeIn delay={0.05}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(235,193,80,0.1)", borderRadius: "4px", padding: "1.75rem" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "#EBC150", letterSpacing: "0.2em", marginBottom: "1.25rem" }}>
                SUA EMPRESA PODE ESTAR ENFRENTANDO:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {problems.map((p, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#EBC150", marginTop: "3px", flexShrink: 0 }}>
                      <ChevronRight size={14} />
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(235,193,80,0.1)", borderRadius: "4px", padding: "1.75rem", flex: 1 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
                  A Log Academy atua exatamente nesse ponto: desenvolve pessoas para que processos saiam do papel e se transformem em execução prática dentro da operação.
                </p>
              </div>
              <div style={{
                background: "linear-gradient(135deg, rgba(235,193,80,0.12), rgba(235,193,80,0.05))",
                border: "1px solid rgba(235,193,80,0.3)",
                borderRadius: "4px",
                padding: "1.75rem",
              }}>
                <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#F8D56B", lineHeight: 1.65 }}>
                  "O problema nem sempre está na falta de esforço da equipe. Muitas vezes, está na ausência de método, clareza e direcionamento prático."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── What We Do — Dobra 3 ────────────────────────────────────────────────────
const audience = [
  "Transportadoras",
  "Operadores logísticos",
  "Armazéns gerais",
  "Centros de distribuição",
  "Indústrias com operação logística própria",
  "Embarcadores com operação interna ou terceirizada",
  "Gestores, coordenadores, supervisores e líderes",
];

const topics = [
  "Liderança operacional",
  "Gestão da rotina logística",
  "Produtividade e performance",
  "Indicadores e KPIs",
  "SLA e nível de serviço",
  "Padronização de processos",
  "Comunicação entre áreas",
  "Cultura de execução",
  "Melhoria contínua",
  "Redução de falhas operacionais",
  "Gestão de pessoas na operação",
  "Tecnologia, automação e tomada de decisão",
];

function WhatWeDoSection() {
  return (
    <section
      id="modalidades"
      style={{ background: "#0D1B2A", padding: "6rem 0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #EBC150, transparent)" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#EBC150", letterSpacing: "0.25em", fontWeight: 500 }}>
              SOLUÇÕES
            </span>
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, maxWidth: "680px", marginBottom: "1rem" }}>
            Capacitação corporativa especializada para o{" "}
            <span style={{ color: "#EBC150" }}>setor logístico</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "660px", marginBottom: "1rem" }}>
            A Log Academy foi criada para empresas que precisam desenvolver pessoas, fortalecer processos e melhorar a performance operacional com treinamentos conectados à realidade da logística.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "660px", marginBottom: "3.5rem" }}>
            Cada projeto é estruturado de acordo com a necessidade do cliente, considerando o perfil da equipe, o nível de maturidade da operação, os objetivos da liderança e os resultados esperados.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={0.05}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(235,193,80,0.1)", borderRadius: "4px", padding: "2rem", height: "100%" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "#EBC150", letterSpacing: "0.22em", marginBottom: "1.5rem" }}>
                PARA QUEM É
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {audience.map((a, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
                    <Check size={13} color="#EBC150" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(235,193,80,0.1)", borderRadius: "4px", padding: "2rem", height: "100%" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "#EBC150", letterSpacing: "0.22em", marginBottom: "1.5rem" }}>
                O QUE DESENVOLVEMOS
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {topics.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
                    <Check size={13} color="#EBC150" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div style={{ marginTop: "2.5rem", borderLeft: "2px solid #EBC150", paddingLeft: "1.25rem" }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem", fontStyle: "italic", color: "rgba(248,213,107,0.85)", lineHeight: 1.65 }}>
              A Log Academy conecta conhecimento técnico, linguagem prática e aplicação real para transformar capacitação em resultado.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Method — Dobra 4 ─────────────────────────────────────────────────────────
const aplica = [
  {
    letter: "A",
    title: "Análise da realidade operacional",
    text: "Entendemos o cenário da empresa, os desafios da operação, o perfil da equipe e os objetivos esperados com o treinamento.",
  },
  {
    letter: "P",
    title: "Priorização dos temas críticos",
    text: "Selecionamos os assuntos com maior impacto para o momento da empresa, com foco em desenvolvimento prático e melhoria da rotina.",
  },
  {
    letter: "L",
    title: "Linguagem simples, prática e consultiva",
    text: "Traduzimos conceitos de gestão, liderança e operação para uma linguagem objetiva, conectada ao dia a dia da logística.",
  },
  {
    letter: "I",
    title: "Implementação de ferramentas",
    text: "Apresentamos ferramentas aplicáveis: checklists, planos de ação, indicadores, rotinas de gestão e direcionamentos práticos.",
  },
  {
    letter: "C",
    title: "Construção do plano de execução",
    text: "Ao final da capacitação, os participantes saem com direcionamentos para aplicar o aprendizado na rotina da empresa.",
  },
  {
    letter: "A",
    title: "Acompanhamento e evolução",
    text: "Quando contratado, apoiamos a continuidade por meio de checkpoints, mentorias ou direcionamentos pós-treinamento.",
  },
];

function MethodSection() {
  return (
    <section
      id="método"
      style={{ background: "#091523", padding: "6rem 0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #EBC150, transparent)" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#EBC150", letterSpacing: "0.25em", fontWeight: 500 }}>
              METODOLOGIA
            </span>
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, maxWidth: "680px", marginBottom: "1rem" }}>
            Um método prático para transformar{" "}
            <span style={{ color: "#EBC150" }}>conhecimento em execução</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "620px", marginBottom: "1rem" }}>
            Treinar por treinar não muda uma operação. Por isso, nossos conteúdos são estruturados para que o participante entenda, aplique e leve para a rotina ferramentas simples, práticas e direcionadas ao resultado.
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              letterSpacing: "0.35em",
              background: "linear-gradient(90deg, #CC9913, #F8D56B, #EBC150)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              MÉTODO A.P.L.I.C.A.
            </span>
          </div>
          <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(235,193,80,0.4), transparent)", marginBottom: "3rem" }} />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {aplica.map((step, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(235,193,80,0.1)",
                  borderRadius: "4px",
                  padding: "1.75rem",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <div style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.25rem",
                  fontFamily: "Playfair Display, serif",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "rgba(235,193,80,0.08)",
                  lineHeight: 1,
                  userSelect: "none",
                }}>
                  {step.letter}
                </div>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "2px",
                  background: "linear-gradient(135deg, #B8860B, #EBC150)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1rem", color: "#0D1B2A" }}>
                    {step.letter}
                  </span>
                </div>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#fff", lineHeight: 1.4, marginBottom: "0.6rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{ background: "linear-gradient(135deg, rgba(235,193,80,0.1), rgba(235,193,80,0.03))", border: "1px solid rgba(235,193,80,0.2)", borderRadius: "4px", padding: "2rem" }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "1.05rem", fontStyle: "italic", color: "#F8D56B", lineHeight: 1.65, textAlign: "center" }}>
              Nosso foco não é apenas ensinar. É ajudar sua equipe a aplicar melhor, executar melhor e decidir melhor.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Modalities — Dobra 5 ─────────────────────────────────────────────────────
const modalityDetails = [
  { label: "Duração", value: "2h30" },
  { label: "Participantes", value: "Até 15" },
  { label: "Formato", value: "Aula prática e objetiva" },
  { label: "Conteúdo", value: "Definido conforme necessidade" },
  { label: "Entregável", value: "Guia digital de aplicação" },
  { label: "Aplicação", value: "Plano de execução D+0" },
];

function ModalitiesSection() {
  return (
    <section
      id="sobre"
      style={{ background: "#0D1B2A", padding: "6rem 0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #EBC150, transparent)" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#EBC150", letterSpacing: "0.25em", fontWeight: 500 }}>
              FORMATOS
            </span>
          </div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, maxWidth: "700px", marginBottom: "1rem" }}>
            Soluções de treinamento para diferentes{" "}
            <span style={{ color: "#EBC150" }}>necessidades da sua empresa</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "620px", marginBottom: "3.5rem" }}>
            Cada empresa possui um momento, uma necessidade e um desafio. Por isso, a Log Academy oferece formatos flexíveis para capacitar equipes, líderes e gestores de forma objetiva, personalizada e prática.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Card principal */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(235,193,80,0.25)",
              borderRadius: "4px",
              overflow: "hidden",
            }}>
              <div style={{ background: "linear-gradient(135deg, rgba(235,193,80,0.15), rgba(235,193,80,0.05))", padding: "1.75rem 2rem", borderBottom: "1px solid rgba(235,193,80,0.15)" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "#EBC150", letterSpacing: "0.22em", marginBottom: "0.5rem" }}>
                  MODALIDADE 01
                </p>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.35rem", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
                  Treinamentos Curtos In Company
                </h3>
              </div>
              <div style={{ padding: "1.75rem 2rem" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Formato ideal para empresas que precisam desenvolver temas específicos em curto espaço de tempo, com foco em aplicação imediata na rotina operacional.
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                  Indicado para empresas que desejam corrigir lacunas pontuais, reforçar conceitos, padronizar práticas ou capacitar equipes sobre temas específicos da operação.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.75rem" }}>
                  {modalityDetails.map((d, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "3px", padding: "0.65rem 0.85rem" }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "rgba(235,193,80,0.7)", letterSpacing: "0.12em", marginBottom: "0.2rem" }}>
                        {d.label.toUpperCase()}
                      </p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(235,193,80,0.06)", border: "1px solid rgba(235,193,80,0.18)", borderRadius: "3px", padding: "0.9rem 1rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(248,213,107,0.85)", lineHeight: 1.6 }}>
                    Ideal para quem precisa de uma capacitação rápida, prática e conectada a uma necessidade específica da operação.
                  </p>
                </div>

                <a
                  href="#contato"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "linear-gradient(90deg, #B8860B, #EBC150)",
                    color: "#0D1B2A",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    padding: "0.8rem 1.75rem",
                    borderRadius: "2px",
                    textDecoration: "none",
                  }}
                >
                  SOLICITAR TREINAMENTO <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* More modalities coming */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { num: "02", title: "Workshops Intensivos", desc: "Imersões de 1 a 2 dias com equipes específicas, para aprofundamento em temas estratégicos da operação." },
                { num: "03", title: "Programas de Desenvolvimento", desc: "Trilhas de capacitação continuada, com múltiplos módulos e acompanhamento da evolução da equipe." },
                { num: "04", title: "Mentorias e Consultoria", desc: "Acompanhamento individualizado para líderes, gestores e diretores com foco em resultado operacional." },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(235,193,80,0.08)",
                    borderRadius: "4px",
                    padding: "1.35rem 1.5rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", color: "rgba(235,193,80,0.25)", fontWeight: 700, flexShrink: 0, lineHeight: 1 }}>
                    {m.num}
                  </span>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "0.35rem" }}>
                      {m.title}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>
                      {m.desc}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "#EBC150", letterSpacing: "0.12em", marginTop: "0.6rem", opacity: 0.6 }}>
                      EM BREVE
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      id="contato"
      style={{ background: "linear-gradient(135deg, #091523 0%, #0A1627 100%)", padding: "6rem 0", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(235,193,80,0.06) 0%, transparent 60%)", borderRadius: "50%" }} />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <LogoMark size={60} />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, marginTop: "1.5rem", marginBottom: "1.25rem" }}>
            Pronto para transformar sua{" "}
            <span style={{ color: "#EBC150" }}>operação logística?</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto 2.5rem" }}>
            Fale com a Log Academy e entenda como podemos estruturar um treinamento personalizado para a sua equipe e os seus resultados.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contato@logacademy.com.br"
              style={{
                background: "linear-gradient(90deg, #B8860B, #EBC150)",
                color: "#0D1B2A",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                padding: "1rem 2.25rem",
                borderRadius: "2px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ENTRAR EM CONTATO <ArrowRight size={14} />
            </a>
            <a
              href="https://wa.me/55"
              style={{
                border: "1px solid rgba(235,193,80,0.4)",
                color: "#EBC150",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                padding: "1rem 2.25rem",
                borderRadius: "2px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              WHATSAPP
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#07111C", borderTop: "1px solid rgba(235,193,80,0.1)", padding: "3rem 0 2rem" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <LogoMark size={28} />
              <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "0.95rem", color: "#fff" }}>
                Log Academy
              </span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginTop: "0.75rem" }}>
              Capacitação corporativa especializada para o setor logístico.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "#EBC150", letterSpacing: "0.2em", marginBottom: "1rem" }}>NAVEGAÇÃO</p>
            {["Início", "Sobre", "Método", "Modalidades", "Contato"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.5rem", textDecoration: "none" }}>
                {l}
              </a>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "#EBC150", letterSpacing: "0.2em", marginBottom: "1rem" }}>CONTATO</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.5rem" }}>
              contato@logacademy.com.br
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
            © {new Date().getFullYear()} Log Academy. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <HeroSection />
      <PainSection />
      <WhatWeDoSection />
      <MethodSection />
      <ModalitiesSection />
      <CTASection />
      <Footer />
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ exiting }: { exiting: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #0c0a07 0%, #080705 50%, #0d0b08 100%)" }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_DURATION / 1000, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute"
        style={{
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(235,193,80,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.4, ease: "easeOut" }}
      />

      <div style={{ position: "relative", width: 200, height: 204 }}>
        <svg viewBox="0 0 361.5 368.5" width="200" height="204" fill="none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="grad_horiz" x1="158" x2="361.5" y1="281" y2="281">
              <stop offset="0.221289" stopColor="#EBC150" />
              <stop offset="1" stopColor="#CC9913" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="grad_vert" x1="100.25" x2="100.25" y1="0" y2="297.5">
              <stop stopColor="#D39D13" />
              <stop offset="0.5497" stopColor="#F8D56B" />
              <stop offset="1" stopColor="#DBA82B" />
            </linearGradient>
            <filter id="gold_glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="gold_glow_strong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d={svgPaths.p399af000}
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d={svgPaths.p82e7d80}
            fill="url(#grad_horiz)"
            style={{ filter: "url(#gold_glow)" }}
            initial={{ x: 180, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.2, 0, 0.3, 1], delay: 0.4 }}
          />
          <motion.path
            d={svgPaths.p27e6e000}
            fill="url(#grad_vert)"
            style={{ filter: "url(#gold_glow)" }}
            initial={{ y: -180, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.2, 0, 0.3, 1], delay: 0.4 }}
          />
          <motion.circle
            cx="158" cy="281" r="28"
            fill="rgba(255,220,100,0.55)"
            style={{ filter: "url(#gold_glow_strong)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2.2, 0], opacity: [0, 1, 0] }}
            transition={{ delay: 2.58, duration: 0.85, ease: "easeOut" }}
          />
          <motion.circle
            cx="158" cy="281" r="18"
            fill="rgba(255,240,160,0.3)"
            style={{ filter: "url(#gold_glow_strong)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 3.5, 0], opacity: [0, 0.6, 0] }}
            transition={{ delay: 2.75, duration: 1.1, ease: "easeOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("exiting"), HOLD_DURATION);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = setTimeout(() => setPhase("done"), EXIT_DURATION);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className={phase === "done" ? "w-full" : "size-full"}>
      {phase !== "done" && <LoadingScreen exiting={phase === "exiting"} />}
      {phase === "done" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <LandingPage />
        </motion.div>
      )}
    </div>
  );
}
