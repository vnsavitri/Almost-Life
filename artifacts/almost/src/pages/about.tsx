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
            { n: "02", label: "Fork", body: "Claude surfaces three or four genuine choice-points in your career. You pick the one that's stayed with you." },
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
            { t: "Powered by Claude.", b: "Generation runs through Anthropic's API. Your data is subject to their standard usage policy — which is to say, not used for training without consent." },
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
            Powered by Claude · Vol. I
          </p>
        </div>
      </div>

    </main>
  );
}
