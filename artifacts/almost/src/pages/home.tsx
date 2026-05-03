import { Link } from "wouter";

export default function Home() {
  return (
    <main
      style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A" }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-xl w-full text-center" style={{ paddingTop: "20vh", paddingBottom: "20vh" }}>
        <p
          className="uppercase tracking-[0.3em] text-xs mb-10"
          style={{ color: "#E07856", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
        >
          a thought experiment
        </p>

        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(4rem, 12vw, 7rem)",
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
          }}
        >
          Almost
        </h1>

        <p
          className="mt-7 mb-16"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
            fontWeight: 300,
            color: "#1A1A1A",
            opacity: 0.65,
            letterSpacing: "0.01em",
          }}
        >
          the life you didn't quite live
        </p>

        <Link href="/upload">
          <button
            style={{
              backgroundColor: "#1A1A1A",
              color: "#F5EFE6",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              padding: "0.875rem 2.5rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E07856")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
          >
            Begin →
          </button>
        </Link>
      </div>

      <footer
        className="fixed bottom-8 left-0 right-0 text-center"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.7rem",
          color: "#1A1A1A",
          opacity: 0.3,
          letterSpacing: "0.05em",
        }}
      >
        Upload your LinkedIn. Pick a fork. See the other version.
      </footer>
    </main>
  );
}
