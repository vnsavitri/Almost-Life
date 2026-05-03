import { Link } from "wouter";

export default function NotFound() {
  return (
    <main
      style={{ backgroundColor: "#F5EFE6", color: "#1A1A1A" }}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h1
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: "5rem",
          fontWeight: 300,
          opacity: 0.15,
        }}
      >
        404
      </h1>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", opacity: 0.5, marginTop: "1rem" }}>
        This life doesn't exist either.
      </p>
      <Link href="/">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "#E07856",
            marginTop: "2rem",
            display: "block",
            cursor: "pointer",
          }}
        >
          ← Back
        </span>
      </Link>
    </main>
  );
}
