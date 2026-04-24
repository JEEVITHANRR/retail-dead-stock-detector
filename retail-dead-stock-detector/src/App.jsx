import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=IBM+Plex+Mono:wght@300;400;500&family=Manrope:wght@300;400;500;600;700&display=swap');

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px) rotateX(8deg); }
  to { opacity: 1; transform: translateY(0) rotateX(0deg); }
}
@keyframes goldShimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes tagBounce {
  0% { transform: scale(0) rotate(-10deg); }
  60% { transform: scale(1.1) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); }
}
@keyframes ticker {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes alertPop {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes progressFill {
  from { width: 0; }
  to { width: var(--w); }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

const products = [
  { id: "SKU-0041", name: "Merino Wool Coat", category: "Outerwear", stock: 84, sold: 3, days: 78, cost: 12400, risk: 96, reason: "Winter clearance missed", trend: "declining" },
  { id: "SKU-0087", name: "Abstract Art Print", category: "Home Décor", stock: 230, sold: 12, days: 65, cost: 6900, risk: 88, reason: "Niche appeal, low foot traffic", trend: "flat" },
  { id: "SKU-0112", name: "Bamboo Desk Organizer", category: "Office", stock: 156, sold: 22, days: 61, cost: 4680, risk: 79, reason: "Priced 30% above market avg", trend: "declining" },
  { id: "SKU-0199", name: "Leather Card Holder", category: "Accessories", stock: 67, sold: 18, days: 55, cost: 2010, risk: 62, reason: "Strong in online, weak in-store", trend: "mixed" },
  { id: "SKU-0244", name: "Linen Table Runner", category: "Home Décor", stock: 120, sold: 34, days: 48, cost: 1800, risk: 47, reason: "Seasonal dip, pre-summer period", trend: "recovering" },
];

function RiskBadge({ risk }) {
  const config =
    risk >= 85 ? { label: "DEAD STOCK", color: "#ef4444", bg: "rgba(239,68,68,0.12)" } :
    risk >= 65 ? { label: "HIGH RISK", color: "#f97316", bg: "rgba(249,115,22,0.12)" } :
    risk >= 45 ? { label: "WATCH", color: "#eab308", bg: "rgba(234,179,8,0.12)" } :
    { label: "LOW RISK", color: "#22c55e", bg: "rgba(34,197,94,0.12)" };

  return (
    <span style={{
      fontFamily: "IBM Plex Mono", fontSize: 9, fontWeight: 500, letterSpacing: "0.15em",
      color: config.color, background: config.bg, border: `1px solid ${config.color}40`,
      padding: "4px 10px", borderRadius: 4, textTransform: "uppercase",
      animation: "tagBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
    }}>{config.label}</span>
  );
}

function ProductRow({ p, i, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onClick(i)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid", gridTemplateColumns: "1fr auto auto auto",
        alignItems: "center", gap: 16,
        padding: "18px 22px",
        background: active ? "rgba(212,175,55,0.06)" : hov ? "rgba(255,255,255,0.02)" : "transparent",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderLeft: active ? "3px solid #d4af37" : "3px solid transparent",
        animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
      }}
    >
      <div>
        <div style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 14, color: "#f5f0e8", marginBottom: 3 }}>{p.name}</div>
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, color: "#8a7d6b" }}>{p.id} · {p.category}</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: 18, fontWeight: 500, color: "#d4af37" }}>{p.days}d</div>
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: 9, color: "#8a7d6b" }}>UNSOLD</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: 14, color: "#c0a882" }}>{p.stock}</div>
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: 9, color: "#8a7d6b" }}>UNITS</div>
      </div>
      <RiskBadge risk={p.risk} />
    </div>
  );
}

export default function RetailDashboard() {
  const [selected, setSelected] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [totalLoss, setTotalLoss] = useState(0);
  const p = products[selected];

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    let n = 0;
    const target = products.reduce((s, x) => s + x.cost, 0);
    const interval = setInterval(() => {
      n += 900;
      if (n >= target) { setTotalLoss(target); clearInterval(interval); }
      else setTotalLoss(n);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #1a1409 0%, #0f0c07 50%, #13100a 100%)",
        color: "#f5f0e8",
        fontFamily: "Manrope, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Gold noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)`,
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }} />

        {/* Ambient glow */}
        <div style={{
          position: "absolute", bottom: -100, right: -100, width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Ticker */}
        <div style={{
          background: "rgba(212,175,55,0.08)", borderBottom: "1px solid rgba(212,175,55,0.15)",
          padding: "8px 0", overflow: "hidden", whiteSpace: "nowrap",
        }}>
          <div style={{
            display: "inline-block",
            fontFamily: "IBM Plex Mono", fontSize: 11, color: "#d4af37", letterSpacing: "0.1em",
            animation: "ticker 20s linear infinite",
          }}>
            {Array(4).fill("⬛ DEAD STOCK ALERT  ·  SKU-0041 CRITICAL  ·  $27,790 CAPITAL LOCKED  ·  5 PRODUCTS FLAGGED  ·  ACTION REQUIRED  ·  ").join("")}
          </div>
        </div>

        <div style={{ maxWidth: 980, margin: "0 auto", padding: "36px 24px" }}>

          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "flex-end",
            marginBottom: 44,
            opacity: loaded ? 1 : 0, transition: "all 0.8s ease",
          }}>
            <div>
              <div style={{
                fontFamily: "IBM Plex Mono", fontSize: 10, color: "#8a7d6b",
                letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12,
              }}>
                Inventory Intelligence · Retail Analytics Platform
              </div>
              <h1 style={{
                fontFamily: "Playfair Display", fontSize: "clamp(30px, 6vw, 60px)",
                fontWeight: 900, margin: 0, lineHeight: 1,
                background: "linear-gradient(135deg, #f5f0e8 0%, #d4af37 50%, #a0845c 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "goldShimmer 4s linear infinite",
              }}>
                Dead Stock<br /><em>Detector</em>
              </h1>
              <p style={{ fontFamily: "Manrope", fontSize: 13, color: "#8a7d6b", marginTop: 12, fontWeight: 300, maxWidth: 400 }}>
                Identifying silently draining inventory capital for small retailers
              </p>
            </div>

            {/* Loss counter */}
            <div style={{
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 16, padding: "20px 28px", textAlign: "center",
              animation: "alertPop 0.8s ease 0.5s both",
              boxShadow: "0 0 40px rgba(239,68,68,0.08)",
            }}>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, color: "#ef4444", letterSpacing: "0.15em", marginBottom: 8 }}>
                💸 CAPITAL AT RISK
              </div>
              <div style={{
                fontFamily: "Playfair Display", fontSize: 36, fontWeight: 900, color: "#ef4444",
                textShadow: "0 0 30px rgba(239,68,68,0.4)",
              }}>
                ${totalLoss.toLocaleString()}
              </div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, color: "#8a7d6b", marginTop: 4 }}>
                across {products.length} flagged SKUs
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32,
            opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.2s",
          }}>
            {[
              { label: "Dead Stock Items", value: "2", sub: "90+ days unsold", accent: "#ef4444" },
              { label: "High Risk Items", value: "2", sub: "60-89 days", accent: "#f97316" },
              { label: "Avg Days Stagnant", value: "61", sub: "days avg", accent: "#d4af37" },
              { label: "Recovery Potential", value: "68%", sub: "with markdown", accent: "#22c55e" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.1)",
                borderRadius: 14, padding: "18px 20px",
                animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              }}>
                <div style={{ fontFamily: "IBM Plex Mono", fontSize: 9, color: "#8a7d6b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontFamily: "Playfair Display", fontSize: 30, fontWeight: 700, color: s.accent }}>{s.value}</div>
                <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, color: "#6b5e50", marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div style={{
            display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20,
            opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.3s",
          }}>

            {/* Product list */}
            <div style={{
              background: "rgba(212,175,55,0.02)",
              border: "1px solid rgba(212,175,55,0.12)",
              borderRadius: 20, overflow: "hidden",
            }}>
              <div style={{
                padding: "18px 22px", borderBottom: "1px solid rgba(212,175,55,0.1)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: "IBM Plex Mono", fontSize: 11, color: "#8a7d6b", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Flagged Products
                </span>
                <span style={{
                  fontFamily: "IBM Plex Mono", fontSize: 10,
                  color: "#d4af37", background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  padding: "3px 10px", borderRadius: 4,
                }}>
                  {products.length} items
                </span>
              </div>
              {products.map((prod, i) => (
                <ProductRow key={i} p={prod} i={i} active={selected === i} onClick={setSelected} />
              ))}
            </div>

            {/* Detail panel */}
            <div style={{
              background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: 20, padding: 26, position: "relative", overflow: "hidden",
              animation: "cardFloat 6s ease-in-out infinite",
              transition: "border-color 0.5s ease",
            }}>
              {/* Decorative corner */}
              <div style={{
                position: "absolute", top: 20, right: 20, width: 80, height: 80, opacity: 0.06,
                borderRadius: "50%", border: "2px solid #d4af37",
                animation: "rotate 20s linear infinite",
              }} />
              <div style={{
                position: "absolute", top: 28, right: 28, width: 64, height: 64, opacity: 0.04,
                borderRadius: "50%", border: "1px solid #d4af37",
              }} />

              <div style={{
                fontFamily: "IBM Plex Mono", fontSize: 9, color: "#8a7d6b",
                letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6,
              }}>
                {p.id} · {p.category}
              </div>
              <div style={{
                fontFamily: "Playfair Display", fontSize: 24, fontWeight: 900,
                color: "#f5f0e8", marginBottom: 4, lineHeight: 1.2,
              }}>
                {p.name}
              </div>
              <div style={{ marginBottom: 24 }}>
                <RiskBadge risk={p.risk} />
              </div>

              {/* Risk meter */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "IBM Plex Mono", fontSize: 10, color: "#8a7d6b" }}>DEAD STOCK RISK SCORE</span>
                  <span style={{ fontFamily: "Playfair Display", fontSize: 22, fontWeight: 700, color: "#d4af37" }}>{p.risk}</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${p.risk}%`,
                    background: p.risk >= 85 ? "linear-gradient(90deg, #f97316, #ef4444)"
                      : p.risk >= 65 ? "linear-gradient(90deg, #eab308, #f97316)"
                      : "linear-gradient(90deg, #22c55e, #eab308)",
                    borderRadius: 4, transition: "width 1.2s ease",
                    boxShadow: `0 0 12px ${p.risk >= 85 ? "#ef4444" : p.risk >= 65 ? "#f97316" : "#22c55e"}60`,
                  }} />
                </div>
              </div>

              {/* Key metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Days Unsold", value: `${p.days}d`, accent: true },
                  { label: "Units in Stock", value: p.stock, accent: false },
                  { label: "Capital Locked", value: `$${p.cost.toLocaleString()}`, accent: true },
                  { label: "Units Sold (30d)", value: p.sold, accent: false },
                ].map((m, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: "12px 14px",
                    border: `1px solid ${m.accent ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)"}`,
                  }}>
                    <div style={{ fontFamily: "IBM Plex Mono", fontSize: 9, color: "#6b5e50", marginBottom: 4 }}>{m.label}</div>
                    <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 18, color: m.accent ? "#d4af37" : "#c0a882" }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Root cause */}
              <div style={{
                background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 12, padding: "14px 16px", marginBottom: 16,
              }}>
                <div style={{ fontFamily: "IBM Plex Mono", fontSize: 9, color: "#d4af37", letterSpacing: "0.15em", marginBottom: 6 }}>
                  🔍 ROOT CAUSE
                </div>
                <div style={{ fontFamily: "Manrope", fontSize: 13, color: "#c0a882", lineHeight: 1.6 }}>{p.reason}</div>
              </div>

              {/* Action */}
              <div style={{
                background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ fontFamily: "IBM Plex Mono", fontSize: 9, color: "#22c55e", letterSpacing: "0.15em", marginBottom: 6 }}>
                  ✅ RECOMMENDED ACTION
                </div>
                <div style={{ fontFamily: "Manrope", fontSize: 13, color: "#a8e6b8", lineHeight: 1.6 }}>
                  {p.risk >= 85 ? "Apply 40–50% markdown immediately. Bundle with high-velocity SKUs."
                    : p.risk >= 65 ? "Run targeted 25% discount campaign. Feature in weekly email."
                    : "Minor promotion or seasonal restock scheduling advised."}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 40, textAlign: "center",
            fontFamily: "IBM Plex Mono", fontSize: 10, color: "#2d2519",
            letterSpacing: "0.15em",
            opacity: loaded ? 1 : 0, transition: "all 0.8s ease 0.8s",
          }}>
            BUILT FOR ATXP PORTFOLIO · RETAIL ANALYTICS · INVENTORY INTELLIGENCE
          </div>
        </div>
      </div>
    </>
  );
}
