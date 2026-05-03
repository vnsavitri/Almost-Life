import { useLocation } from "wouter";
import { clearSession } from "@/lib/session";

export default function About() {
  const [, navigate] = useLocation();

  return (
    <main className="grain" style={{ backgroundColor: "#BCD2EE", color: "#52050A", minHeight: "100vh" }}>

      {/* Top nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(82,5,10,0.06)" }}>
        <button
          onClick={() => navigate("/")}
          style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "1.125rem", color: "#52050A", opacity: 0.7, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          Almost
        </button>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#52050A", opacity: 0.25 }}>
          Editor's Note
        </span>
        <button
          onClick={() => { clearSession(); navigate("/upload"); }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#52050A", opacity: 0.4, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          Begin →
        </button>
      </div>

      {/* Hero text block */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 2rem 4rem" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#832161", opacity: 0.7, marginBottom: "2rem" }}>
          On the nature of forks
        </p>
        <h1 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 200,
          fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          color: "#52050A",
          marginBottom: "3rem",
          maxWidth: "22ch",
        }}>
          Every career is a series of doors you didn't open.
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", lineHeight: 1.55, color: "#52050A", opacity: 0.75 }}>
            You chose the startup over the sabbatical. The promotion over the pivot. The sensible thing, the brave thing, the thing that seemed obvious at the time.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.75, color: "#52050A", opacity: 0.55 }}>
            Almost doesn't ask whether you made the right choice. It asks: what would the other version of you look like right now? Not as a regret — as a curiosity. A parallel edition. A thought experiment with your name on the cover.
          </p>
        </div>
      </div>

      {/* Full-width ruled break */}
      <div style={{ borderTop: "1px solid rgba(82,5,10,0.08)", margin: "0 2rem" }} />

      {/* How it works — editorial grid */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52050A", opacity: 0.25, marginBottom: "3rem" }}>
          How it works
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderTop: "1px solid rgba(82,5,10,0.1)", borderLeft: "1px solid rgba(82,5,10,0.1)" }}>
          {[
            { n: "01", label: "Upload", body: "Your LinkedIn PDF. We parse the contours — titles, transitions, moments where the road branched." },
            { n: "02", label: "Fork", body: "The AI surfaces three or four genuine choice-points in your career. You pick the one that's stayed with you." },
            { n: "03", label: "Format", body: "Choose how your alternate life gets told. A LinkedIn profile. A Wikipedia stub. A museum plaque. A tarot card." },
            { n: "04", label: "Result", body: "The other version of you, fully rendered. Download it. Share it. Leave it open in a tab for a while." },
          ].map(step => (
            <div key={step.n} style={{ borderRight: "1px solid rgba(82,5,10,0.1)", borderBottom: "1px solid rgba(82,5,10,0.1)", padding: "1.75rem 1.25rem 2rem" }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 200, fontSize: "2.5rem", color: "#832161", opacity: 0.4, lineHeight: 1, marginBottom: "1.25rem" }}>
                {step.n}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#52050A", opacity: 0.4, marginBottom: "0.75rem" }}>
                {step.label}
              </div>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.6, color: "#52050A", opacity: 0.65 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pull quote */}
      <div style={{ backgroundColor: "#52050A", padding: "5rem 2rem", margin: "0" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 200, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.3, color: "#BCD2EE", opacity: 0.9, marginBottom: "2rem" }}>
            "The unlived life is not a mistake. It's the other book on the shelf — same author, different ending."
          </p>
          <div style={{ width: "2rem", height: "1px", backgroundColor: "#832161", opacity: 0.6 }} />
        </div>
      </div>

      {/* Privacy + data section */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52050A", opacity: 0.25, marginBottom: "1rem" }}>On your data</p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.875rem", color: "#52050A", opacity: 0.4, lineHeight: 1.6 }}>
            Privacy, simply.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            { t: "Nothing is stored.", b: "Your PDF is read once, in memory, then discarded. We don't keep it, log it, or look at it." },
            { t: "No account needed.", b: "No login. No tracking. No newsletter you didn't sign up for. Just the thought experiment." },
            { t: "Powered by OpenRouter.", b: "Generation runs through OpenRouter's API. Your data is subject to their standard usage policy, which is to say, not used for training without consent." },
          ].map(item => (
            <div key={item.t} style={{ borderTop: "1px solid rgba(82,5,10,0.08)", paddingTop: "1.25rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.04em", color: "#52050A", opacity: 0.6, marginBottom: "0.4rem" }}>{item.t}</p>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.6, color: "#52050A", opacity: 0.5 }}>{item.b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ruled break */}
      <div style={{ borderTop: "1px solid rgba(82,5,10,0.08)", margin: "0 2rem" }} />

      {/* Built by Vivid */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52050A", opacity: 0.25, marginBottom: "1rem" }}>Built by</p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, fontSize: "1.5rem", letterSpacing: "-0.01em", color: "#52050A", marginBottom: "1.25rem" }}>Vivid</p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <a href="https://www.linkedin.com/in/vnsavitri" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: "#52050A", opacity: 0.45, display: "flex", transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.45")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/vnsavitri" target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: "#52050A", opacity: 0.45, display: "flex", transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.45")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            "I'm an AI product builder with 15+ years working across design, technology, and data science. My career has taken me across four continents and a wide range of domains, from games and immersive media to AI-driven consumer products and biotech.",
            "To date, I've lived in 12 countries on four continents, growing up with UN-career parents, which shaped how I think about systems, uncertainty, and people. I started trading stocks as a teenager, and that early exposure still influences how I approach product work today. I care about clear thinking, fast learning loops, and being honest about what actually works.",
            "I'm currently based in Sydney, leading AI/ML product work at Breville. My focus is on taking AI from idea to production, building practical LLM-powered tools, agents, and platforms that ship and get used by real people across global teams.",
            "More recently, I've been spending time on a personal project, an open research repo exploring how AI can support cancer understanding, sense-making, and patient-facing knowledge. It's a learning-first project, grounded in curiosity and care, and a way for me to apply AI to something deeply human (and personal) rather than purely commercial.",
          ].map((para, i) => (
            <p key={i} style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.7, color: "#52050A", opacity: 0.6, borderTop: i === 0 ? "1px solid rgba(82,5,10,0.08)" : "none", paddingTop: i === 0 ? "1.25rem" : 0 }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Ruled break */}
      <div style={{ borderTop: "1px solid rgba(82,5,10,0.08)", margin: "0 2rem" }} />

      {/* CTA footer */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem 5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
        <div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 200, fontStyle: "italic", fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em", color: "#52050A", lineHeight: 1.1, marginBottom: "1rem" }}>
            Ready to meet<br />the other you?
          </h2>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <button
              onClick={() => { clearSession(); navigate("/upload"); }}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#BCD2EE", backgroundColor: "#52050A", border: "none", padding: "0.75rem 1.5rem", cursor: "pointer" }}
            >
              Begin →
            </button>
            <button
              onClick={() => { sessionStorage.setItem("almost_demo", "true"); sessionStorage.removeItem("almost_pdf_b64"); navigate("/branches"); }}
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.875rem", color: "#52050A", opacity: 0.4, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(82,5,10,0.2)", textUnderlineOffset: "3px", padding: 0 }}
            >
              or try Zelda's what-if
            </button>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#52050A", opacity: 0.2, lineHeight: 2 }}>
            Built for the Replit 10 Buildathon<br />
            Vol. I
          </p>
        </div>
      </div>

    </main>
  );
}
