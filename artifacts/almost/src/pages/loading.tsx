import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const ONE_LINERS = [
  "Considering the lives you didn't live...",
  "Calculating the apartment you didn't rent...",
  "Reviewing the breakup you didn't have...",
  "Auditing your unwritten LinkedIn posts...",
  "Cross-referencing your parallel divorces...",
];

const TOP_MARKERS = [
  { year: "2006", label: "the academy", pct: 12 },
  { year: "2010", label: "Kakariko", pct: 35 },
  { year: "2014", label: "the castle", pct: 58 },
  { year: "2017", label: "Link, awake", pct: 80 },
];

const BOTTOM_MARKERS = [
  { year: "2006", label: "Gerudo Town", pct: 12 },
  { year: "2010", label: "pottery studio", pct: 35 },
  { year: "2014", label: "just declined", pct: 58 },
  { year: "2017", label: "five more years", pct: 80 },
];

export default function Loading() {
  const [, navigate] = useLocation();
  const [oneLinerIndex, setOneLinerIndex] = useState(0);
  const [oneLinerVisible, setOneLinerVisible] = useState(true);
  const [visibleTopMarkers, setVisibleTopMarkers] = useState<number[]>([]);
  const [visibleBottomMarkers, setVisibleBottomMarkers] = useState<number[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem("almost_branch")) {
      navigate("/branches");
      return;
    }

    // Simulate the generate-life API call — replaced in Phase 5
    const done = setTimeout(() => navigate("/result"), 10000);

    // Rotate one-liners every 3s with a fade
    const liner = setInterval(() => {
      setOneLinerVisible(false);
      setTimeout(() => {
        setOneLinerIndex((i) => (i + 1) % ONE_LINERS.length);
        setOneLinerVisible(true);
      }, 400);
    }, 3000);

    // Reveal markers staggered every 2s
    const markerTimers: ReturnType<typeof setTimeout>[] = [];
    TOP_MARKERS.forEach((_, i) => {
      markerTimers.push(
        setTimeout(() => setVisibleTopMarkers((prev) => [...prev, i]), 1500 + i * 2000)
      );
    });
    BOTTOM_MARKERS.forEach((_, i) => {
      markerTimers.push(
        setTimeout(() => setVisibleBottomMarkers((prev) => [...prev, i]), 2200 + i * 2000)
      );
    });

    return () => {
      clearTimeout(done);
      clearInterval(liner);
      markerTimers.forEach(clearTimeout);
    };
  }, [navigate]);

  return (
    <main
      style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A" }}
      className="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <style>{`
        @keyframes dot-travel {
          0%   { left: -12px; }
          100% { left: calc(100% + 12px); }
        }
        @keyframes marker-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes liner-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .top-dot {
          animation: dot-travel 9s linear infinite;
        }
        .bottom-dot {
          animation: dot-travel 9s linear infinite;
          animation-delay: -0.4s;
        }
        .marker-appear {
          animation: marker-in 0.5s ease forwards;
        }
        .one-liner-visible {
          animation: liner-fade 0.4s ease forwards;
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: "680px" }}>

        {/* Timeline section */}
        <div style={{ position: "relative", marginBottom: "5rem" }}>

          {/* Top line — this life */}
          <div style={{ marginBottom: "4rem" }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.35,
                marginBottom: "0.6rem",
              }}
            >
              this life
            </div>
            <div style={{ position: "relative", height: "24px" }}>
              {/* The line */}
              <div
                style={{
                  position: "absolute",
                  top: "11px",
                  left: 0,
                  right: 0,
                  height: "1.5px",
                  backgroundColor: "#1A1A1A",
                }}
              />
              {/* Traveling dot */}
              <div
                className="top-dot"
                style={{
                  position: "absolute",
                  top: "5px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#1A1A1A",
                }}
              />
              {/* Markers */}
              {TOP_MARKERS.map((m, i) =>
                visibleTopMarkers.includes(i) ? (
                  <div
                    key={i}
                    className="marker-appear"
                    style={{
                      position: "absolute",
                      left: `${m.pct}%`,
                      top: "-28px",
                      transform: "translateX(-50%)",
                      textAlign: "center",
                      opacity: 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: "0.625rem",
                        fontStyle: "italic",
                        color: "#1A1A1A",
                        opacity: 0.55,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.year}: {m.label}
                    </div>
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#1A1A1A",
                        opacity: 0.4,
                        margin: "3px auto 0",
                      }}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Bottom line — the other one */}
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E07856",
                opacity: 0.6,
                marginBottom: "0.6rem",
              }}
            >
              the other one
            </div>
            <div style={{ position: "relative", height: "24px" }}>
              {/* Dashed line */}
              <div
                style={{
                  position: "absolute",
                  top: "11px",
                  left: 0,
                  right: 0,
                  height: "1.5px",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #E07856 0px, #E07856 8px, transparent 8px, transparent 16px)",
                  opacity: 0.5,
                }}
              />
              {/* Traveling dot */}
              <div
                className="bottom-dot"
                style={{
                  position: "absolute",
                  top: "5px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#E07856",
                  opacity: 0.7,
                }}
              />
              {/* Markers */}
              {BOTTOM_MARKERS.map((m, i) =>
                visibleBottomMarkers.includes(i) ? (
                  <div
                    key={i}
                    className="marker-appear"
                    style={{
                      position: "absolute",
                      left: `${m.pct}%`,
                      bottom: "-28px",
                      transform: "translateX(-50%)",
                      textAlign: "center",
                      opacity: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#E07856",
                        opacity: 0.5,
                        margin: "0 auto 3px",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: "0.625rem",
                        fontStyle: "italic",
                        color: "#E07856",
                        opacity: 0.7,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.year}: {m.label}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* One-liner */}
        <div style={{ textAlign: "center", minHeight: "2rem" }}>
          <p
            className={oneLinerVisible ? "one-liner-visible" : ""}
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
              color: "#1A1A1A",
              opacity: oneLinerVisible ? undefined : 0,
              transition: "opacity 0.4s ease",
              letterSpacing: "0.01em",
            }}
          >
            {ONE_LINERS[oneLinerIndex]}
          </p>
        </div>
      </div>
    </main>
  );
}
