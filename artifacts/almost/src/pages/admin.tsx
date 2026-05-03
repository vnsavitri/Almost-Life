import { useState, useEffect } from "react";

interface Stats {
  total: number;
  real: number;
  demo: number;
  by_template: Record<string, number>;
  by_day: { date: string; count: number }[];
}

const TEMPLATE_LABELS: Record<string, string> = {
  linkedin_ghost: "LinkedIn Ghost",
  wiki_stub: "The Wiki Stub",
  museum_plaque: "Museum Plaque",
  tarot_card: "The Tarot Card",
};

const SESSION_KEY = "almost_admin_auth";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchStats(pw: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${pw}` },
      });
      if (res.status === 401) { setError("Wrong password."); sessionStorage.removeItem(SESSION_KEY); setLoading(false); return; }
      if (!res.ok) { setError("Something went wrong."); setLoading(false); return; }
      const data = await res.json() as Stats;
      sessionStorage.setItem(SESSION_KEY, pw);
      setStats(data);
      setAuthed(true);
    } catch {
      setError("Could not reach the server.");
    }
    setLoading(false);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) fetchStats(saved);
  }, []);

  if (!authed) {
    return (
      <main style={{ backgroundColor: "#52050A", color: "#BCD2EE", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.75rem", color: "#BCD2EE", opacity: 0.3, marginBottom: "2rem", letterSpacing: "0.04em" }}>Almost · Admin</p>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, fontSize: "2rem", marginBottom: "2rem", lineHeight: 1.15 }}>
            Enter password
          </h1>
          <form onSubmit={e => { e.preventDefault(); fetchStats(password); }} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem",
                backgroundColor: "rgba(188,210,238,0.08)", border: "1px solid rgba(188,210,238,0.2)",
                color: "#BCD2EE", padding: "0.75rem 1rem", outline: "none", width: "100%",
              }}
            />
            {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#832161" }}>{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em",
                textTransform: "uppercase", backgroundColor: "#BCD2EE", color: "#52050A",
                border: "none", padding: "0.75rem", cursor: loading ? "wait" : "pointer",
                opacity: !password ? 0.4 : 1,
              }}
            >
              {loading ? "Checking..." : "Enter →"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (!stats) return null;

  const maxDay = Math.max(...(stats.by_day.map(d => d.count)), 1);

  return (
    <main style={{ backgroundColor: "#52050A", color: "#BCD2EE", minHeight: "100vh", padding: "3rem 2rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#BCD2EE", opacity: 0.3, marginBottom: "0.5rem" }}>
              Almost · Admin
            </p>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "2rem" }}>
              Stats
            </h1>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); setStats(null); }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "none", border: "none", color: "#BCD2EE", opacity: 0.2, cursor: "pointer" }}
          >
            Sign out
          </button>
        </div>

        {/* Big numbers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", backgroundColor: "rgba(188,210,238,0.1)", marginBottom: "3rem" }}>
          {[
            { label: "Total lives", value: stats.total },
            { label: "Real profiles", value: stats.real },
            { label: "Demo (Zelda)", value: stats.demo },
          ].map(({ label, value }) => (
            <div key={label} style={{ backgroundColor: "#52050A", padding: "1.5rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BCD2EE", opacity: 0.3, marginBottom: "0.5rem" }}>{label}</p>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 200, fontSize: "3rem", color: "#BCD2EE", lineHeight: 1 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* By template */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BCD2EE", opacity: 0.3, marginBottom: "1.25rem" }}>
            By template
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {["linkedin_ghost", "wiki_stub", "museum_plaque", "tarot_card"].map(key => {
              const n = stats.by_template[key] ?? 0;
              const pct = stats.total > 0 ? (n / stats.total) * 100 : 0;
              return (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(188,210,238,0.06)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#BCD2EE", opacity: 0.5, minWidth: "140px" }}>
                    {TEMPLATE_LABELS[key]}
                  </span>
                  <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(188,210,238,0.08)", position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, backgroundColor: "#832161", transition: "width 0.6s ease" }} />
                  </div>
                  <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "1rem", color: "#BCD2EE", minWidth: "2rem", textAlign: "right" }}>{n}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* By day (last 14 days) */}
        {stats.by_day.length > 0 && (
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#BCD2EE", opacity: 0.3, marginBottom: "1.25rem" }}>
              Last 14 days
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "80px" }}>
              {stats.by_day.map(({ date, count }) => (
                <div key={date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                  <div style={{ width: "100%", marginTop: "auto", backgroundColor: "#832161", height: `${(count / maxDay) * 100}%`, minHeight: "2px", transition: "height 0.5s ease" }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.375rem", color: "#BCD2EE", opacity: 0.25, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
                    {date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {stats.by_day.length === 0 && (
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: "0.875rem", color: "#BCD2EE", opacity: 0.25 }}>
            No generations yet — share the link and come back.
          </p>
        )}

      </div>
    </main>
  );
}
