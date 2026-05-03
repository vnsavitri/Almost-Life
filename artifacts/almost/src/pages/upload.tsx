import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { clearSession } from "@/lib/session";
import StepProgress from "@/components/StepProgress";

const STEPS = [
  "Open LinkedIn on desktop and go to your profile",
  "Click the \"More\" button under your profile photo",
  "Choose \"Save to PDF\"",
  "Wait a moment — your browser will download the file",
  "Come back here and drop it below",
];

export default function Upload() {
  const [, navigate] = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      if (file.type !== "application/pdf") {
        setError("That's not a PDF. Export your LinkedIn profile as PDF and try again.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File is over 10 MB. LinkedIn PDFs are usually under 1 MB — something's off.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        sessionStorage.setItem("almost_pdf_b64", base64);
        sessionStorage.setItem("almost_demo", "false");
        navigate("/branches");
      };
      reader.readAsDataURL(file);
    },
    [navigate]
  );

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDemo = () => {
    sessionStorage.setItem("almost_demo", "true");
    sessionStorage.removeItem("almost_pdf_b64");
    navigate("/branches");
  };

  return (
    <main style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A" }} className="min-h-screen flex flex-col">
      <StepProgress current={1} />

      <div className="flex flex-col items-center justify-center flex-1 px-6">
        <div className="w-full max-w-lg" style={{ paddingTop: "8vh", paddingBottom: "12vh" }}>

          {/* Back */}
          <button
            onClick={() => { clearSession(); navigate("/"); }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#1A1A1A", opacity: 0.4, letterSpacing: "0.04em", cursor: "pointer", background: "none", border: "none", padding: 0, display: "inline-block", marginBottom: "3rem" }}
          >
            ← Almost
          </button>

          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
            Upload your LinkedIn
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.6, color: "#1A1A1A", opacity: 0.6, marginBottom: "2.5rem", maxWidth: "38ch" }}>
            We'll find the moments where your life forked. You pick one. We show you the other version.
          </p>

          {/* Collapsible instructions */}
          <div style={{ marginBottom: "2rem" }}>
            <button
              onClick={() => setInstructionsOpen((v) => !v)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#1A1A1A", opacity: 0.5, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", letterSpacing: "0.02em" }}
            >
              <span style={{ display: "inline-block", transform: instructionsOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease", fontSize: "0.7rem" }}>▶</span>
              How to export your LinkedIn PDF
            </button>
            {instructionsOpen && (
              <ol style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.7, color: "#1A1A1A", opacity: 0.6, marginTop: "0.875rem", paddingLeft: "1.25rem" }}>
                {STEPS.map((step, i) => <li key={i} style={{ marginBottom: "0.25rem" }}>{step}</li>)}
              </ol>
            )}
          </div>

          {/* Drop zone */}
          <div
            onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
            onClick={() => inputRef.current?.click()}
            style={{ border: `1.5px dashed ${isDragging ? "#E07856" : "rgba(26,26,26,0.25)"}`, backgroundColor: isDragging ? "rgba(224,120,86,0.05)" : "rgba(26,26,26,0.03)", borderRadius: "2px", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s ease, background-color 0.2s ease", marginBottom: "1rem" }}
          >
            <input ref={inputRef} type="file" accept="application/pdf" onChange={onInputChange} style={{ display: "none" }} />
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "1.125rem", fontWeight: 300, color: "#1A1A1A", opacity: 0.4, marginBottom: "0.5rem" }}>Drop your PDF here</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#1A1A1A", opacity: 0.35, letterSpacing: "0.03em" }}>or click to browse</p>
          </div>

          {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#E07856", marginBottom: "0.75rem" }}>{error}</p>}

          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <button
              onClick={handleDemo}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#1A1A1A", opacity: 0.4, background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(26,26,26,0.2)", textUnderlineOffset: "3px" }}
            >
              Try with a demo profile instead
            </button>
          </div>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#1A1A1A", opacity: 0.3, textAlign: "center", letterSpacing: "0.03em" }}>
            We don't store your file. It's processed once and discarded.
          </p>
        </div>
      </div>
    </main>
  );
}
