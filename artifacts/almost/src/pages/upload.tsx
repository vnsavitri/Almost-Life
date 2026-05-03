import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { clearSession } from "@/lib/session";
import StepProgress from "@/components/StepProgress";

const STEPS = [
  "Open LinkedIn on desktop → go to your profile",
  "Click \"More\" under your profile photo",
  "Choose \"Save to PDF\"",
  "Your browser downloads the file",
  "Come back here and drop it below",
];

export default function Upload() {
  const [, navigate] = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/generations-remaining")
      .then(r => r.json())
      .then((d: { remaining: number }) => setRemaining(d.remaining))
      .catch(() => {});
  }, []);

  const processFile = useCallback((file: File) => {
    setError(null);
    if (file.type !== "application/pdf") { setError("Not a PDF — export your LinkedIn profile and try again."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("Over 10 MB. LinkedIn PDFs are usually under 1 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem("almost_pdf_b64", (reader.result as string).split(",")[1]);
      sessionStorage.setItem("almost_demo", "false");
      navigate("/branches");
    };
    reader.readAsDataURL(file);
  }, [navigate]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0]; if (file) processFile(file);
  }, [processFile]);

  return (
    <main className="grain" style={{ backgroundColor: "#BCD2EE", color: "#52050A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <StepProgress current={1} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(82,5,10,0.06)" }}>
        <button onClick={() => { clearSession(); navigate("/"); }} style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "1rem", color: "#52050A", opacity: 0.4, background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}>
          Almost
        </button>
        <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "5rem", fontWeight: 200, color: "#52050A", opacity: 0.06, lineHeight: 1, userSelect: "none" }}>01</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, minHeight: 0 }}>

        {/* Left: heading */}
        <div style={{ padding: "4rem 2rem 4rem", borderRight: "1px solid rgba(82,5,10,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#832161", opacity: 0.7, marginBottom: "1.5rem" }}>
              Step one
            </p>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
              Drop your<br />LinkedIn PDF
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#52050A", opacity: 0.5, maxWidth: "30ch" }}>
              We'll read the contours of the life you've been building — and find where it could have gone another way.
            </p>
          </div>

          <div>
            {/* Collapsible instructions */}
            <button
              onClick={() => setInstructionsOpen(v => !v)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#52050A", opacity: 0.4, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}
            >
              <span style={{ display: "inline-block", transform: instructionsOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", fontSize: "0.6rem" }}>▶</span>
              How to export from LinkedIn
            </button>
            {instructionsOpen && (
              <ol style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", lineHeight: 1.8, color: "#52050A", opacity: 0.5, paddingLeft: "1rem", borderLeft: "1px solid rgba(82,5,10,0.15)" }}>
                {STEPS.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            )}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", color: "#52050A", opacity: 0.2, letterSpacing: "0.04em", marginTop: instructionsOpen ? "1rem" : 0 }}>
              Your file is never stored. Processed once, then gone.
            </p>
            {remaining !== null && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: remaining === 0 ? "#832161" : "#52050A", opacity: remaining === 0 ? 0.6 : 0.25, marginTop: "0.5rem" }}>
                {remaining === 0
                  ? "No generations remaining today"
                  : `${remaining} of 3 generation${remaining === 1 ? "" : "s"} remaining today`}
              </p>
            )}
          </div>
        </div>

        {/* Right: drop zone */}
        <div style={{ padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", gap: "1.5rem" }}>
          <div
            onDrop={onDrop}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => inputRef.current?.click()}
            style={{
              flex: 1,
              border: `1px solid ${isDragging ? "#832161" : "rgba(82,5,10,0.15)"}`,
              backgroundColor: isDragging ? "rgba(224,120,86,0.04)" : "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              minHeight: "280px",
              transition: "border-color 0.2s, background-color 0.2s",
              position: "relative",
            }}
          >
            <input ref={inputRef} type="file" accept="application/pdf" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
            {/* Corner accents */}
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
              <span key={`${v}${h}`} style={{ position: "absolute", [v]: "12px", [h]: "12px", width: "12px", height: "12px", borderTop: v === "top" ? `1px solid ${isDragging ? "#832161" : "rgba(82,5,10,0.25)"}` : "none", borderBottom: v === "bottom" ? `1px solid ${isDragging ? "#832161" : "rgba(82,5,10,0.25)"}` : "none", borderLeft: h === "left" ? `1px solid ${isDragging ? "#832161" : "rgba(82,5,10,0.25)"}` : "none", borderRight: h === "right" ? `1px solid ${isDragging ? "#832161" : "rgba(82,5,10,0.25)"}` : "none", transition: "border-color 0.2s" }} />
            ))}
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", color: "#52050A", opacity: isDragging ? 0.7 : 0.3, transition: "opacity 0.2s" }}>
              {isDragging ? "Release to upload" : "Drop PDF here"}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#52050A", opacity: 0.45, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              or click to browse
            </p>
          </div>

          {error && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#832161", letterSpacing: "0.01em" }}>{error}</p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(82,5,10,0.1)" }} />
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.8125rem", color: "#52050A", opacity: 0.3 }}>or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(82,5,10,0.1)" }} />
          </div>

          <button
            onClick={() => { sessionStorage.setItem("almost_demo", "true"); sessionStorage.removeItem("almost_pdf_b64"); navigate("/branches"); }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#52050A", opacity: 0.4, background: "none", border: "none", cursor: "pointer", padding: "0.5rem 0" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
          >
            or see if Zelda didn't fight Ganon? →
          </button>
        </div>
      </div>
    </main>
  );
}
