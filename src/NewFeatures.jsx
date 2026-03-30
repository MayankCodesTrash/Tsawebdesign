import { useState, useEffect, useRef, useCallback } from "react";

// ─── SPLASH SCREEN ────────────────────────────────────────────────────────────
export function SplashScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(onDone, 600);
    }, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDone, 600);
  };

  return (
    <div
      onClick={dismiss}
      role="dialog"
      aria-label="Welcome to Echoes of the Fort"
      aria-modal="true"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#1E2328",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      {/* grain overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />
      {/* concentric rings */}
      <div style={{
        position: "absolute", width: 680, height: 680, borderRadius: "50%",
        border: "1px solid rgba(255,191,163,0.08)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        animation: "scaleIn 1.4s ease",
      }} />
      <div style={{
        position: "absolute", width: 440, height: 440, borderRadius: "50%",
        border: "1px solid rgba(255,191,163,0.05)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        animation: "scaleIn 1.2s ease 0.2s both",
      }} />
      <div style={{
        position: "absolute", width: 240, height: 240, borderRadius: "50%",
        border: "1px solid rgba(255,191,163,0.04)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        animation: "scaleIn 1s ease 0.35s both",
      }} />

      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontSize: "3.8rem", marginBottom: 28, animation: "fadeUp 0.9s ease 0.3s both" }}>🏛️</div>

        <div style={{
          fontSize: "0.62rem", letterSpacing: "0.28em", color: "var(--peach)",
          fontWeight: 700, textTransform: "uppercase", marginBottom: 22,
          animation: "fadeUp 0.9s ease 0.45s both",
          fontFamily: "'DM Sans', sans-serif",
        }}>Des Moines, Iowa · Est. 1843</div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 9vw, 5.8rem)",
          color: "#fff", fontWeight: 800, letterSpacing: "-0.03em",
          lineHeight: 1.03, animation: "fadeUp 0.9s ease 0.55s both",
          margin: 0,
        }}>
          Echoes of<br />
          <span style={{ color: "var(--peach)", textShadow: "0 0 70px rgba(255,191,163,0.35)" }}>
            the Fort
          </span>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.3)", fontSize: "0.82rem",
          marginTop: 32, letterSpacing: "0.07em",
          animation: "fadeUp 0.9s ease 0.9s both",
          fontFamily: "'DM Sans', sans-serif",
        }}>Click anywhere to enter</p>

        {/* loading bar */}
        <div style={{
          width: 130, height: 2, background: "rgba(255,255,255,0.08)",
          margin: "14px auto 0", borderRadius: 2, overflow: "hidden",
          animation: "fadeIn 0.4s ease 1s both",
        }}>
          <div style={{
            height: "100%", background: "var(--peach)", borderRadius: 2,
            animation: "splashLoad 2.4s ease forwards",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes splashLoad {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── THEN & NOW DATA ──────────────────────────────────────────────────────────
// Historical "then" images sourced from:
//   Project Des Moines (Des Moines Public Library): projectdesmoines.dmpl.org
//   Iowa Legislature Capitol history: legis.iowa.gov
//   Des Moines Local History Blog (DMPL): dmlocalhistory.wordpress.com
// Modern "now" images from the project's existing verified photo collection.
const THEN_NOW_PAIRS = [
  {
    id: 1,
    location: "Iowa State Capitol",
    then: {
      year: "1880",
      url: "https://www.iowapbs.org/sites/default/files/iowapathways/artifact/2021-12/a_000350_large.jpg",
      caption: "The Iowa State Capitol under construction in September 1880 — 13 years into a 20-year project that would cost $2.8 million and crown Des Moines with a gilded dome.",
    },
    now: {
      year: "2007",
      url: "https://upload.wikimedia.org/wikipedia/commons/2/24/IowaStateCapNorthView.jpg",
      caption: "The same Capitol today — its 23-karat gold dome still the most recognized landmark in Iowa, unchanged in silhouette for over 140 years.",
    },
    fact: "The Capitol has five domes — one large and four small — the only such arrangement of any state capitol in the U.S. The main dome rises 275 feet above the ground floor.",
  },
  {
    id: 2,
    location: "Des Moines Skyline",
    then: {
      year: "1868",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bird%27s_eye_view_of_the_city_of_Des_Moines%2C_the_capital_of_Iowa_1868._LOC_73693394.jpg/1280px-Bird%27s_eye_view_of_the_city_of_Des_Moines%2C_the_capital_of_Iowa_1868._LOC_73693394.jpg",
      caption: "Bird's eye view of Des Moines in 1868 — just 25 years after Fort Des Moines was established, the city had grown to nearly 10,000 residents and was booming with railroads and trade.",
    },
    now: {
      year: "2016",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Morning_Skyline_-_Des_Moines%2C_Iowa_-_Winter_on_the_Des_Moines_River_%2824805016620%29_%28cropped2%29.jpg/1280px-Morning_Skyline_-_Des_Moines%2C_Iowa_-_Winter_on_the_Des_Moines_River_%2824805016620%29_%28cropped2%29.jpg",
      caption: "The modern Des Moines skyline reflected in the Des Moines River — a metro of 700,000 anchored by insurance giants, financial firms, and a thriving arts district.",
    },
    fact: "Des Moines grew from 165 people at the 1843 garrison to a metro of over 700,000 today — a 4,000× increase in under 200 years.",
  },
  {
    id: 3,
    location: "Fort Des Moines",
    then: {
      year: "1917",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/5th_Provisional_Company_officers_reserve_training_Camp_Ft._Des_Moines_Ia._LCCN2016652396.jpg/1280px-5th_Provisional_Company_officers_reserve_training_Camp_Ft._Des_Moines_Ia._LCCN2016652396.jpg",
      caption: "Officers of the 5th Provisional Company at Fort Des Moines, 1917 — graduates of the first officer training camp for African Americans in U.S. history, producing 639 commissioned Black officers.",
    },
    now: {
      year: "1987",
      url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Fort_Des_Moines_Historic_Complex%2C_Building_No._46%2C_Des_Moines_%28Polk_County%2C_Iowa%29.jpg",
      caption: "Fort Des Moines Historic Complex today — now a museum and memorial honoring the two civil rights milestones that happened here: Black officer training (1917) and the first Women's Army Corps (1942).",
    },
    fact: "Fort Des Moines is the only U.S. site to have been the first training location for both African American officers (1917) and women in the U.S. Army (1942) — two civil rights milestones at one address.",
  },
  {
    id: 4,
    location: "Drake University Old Main",
    then: {
      year: "c. 1882",
      url: "https://drakeapedia.library.drake.edu/w/images/7/78/OLDOLDMAIN.jpg",
      caption: "Drake University's original Old Main building circa 1882 — the very first structure on campus, founded just a year earlier with 43 students. This building was later demolished and replaced.",
    },
    now: {
      year: "2025",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Old_Main_Front.png/1280px-Old_Main_Front.png",
      caption: "Old Main at Drake University today, with Griff the Bulldog statue in the foreground. Drake now enrolls over 5,000 students and is nationally ranked in law and pharmacy.",
    },
    fact: "Drake University's law school has produced more Iowa governors and federal judges than any other institution in the state. It hosted the first-ever Drake Relays in 1910.",
  },
  {
    id: 5,
    location: "Iowa State Fair",
    then: {
      year: "1910",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Maytag-Mason_Motor_Co._at_Iowas_State_Fair_%28Postcard%2C_1910%29.jpg",
      caption: "Maytag-Mason Motor Co. demonstrating a car climbing a 50% grade at the Iowa State Fair, 1910 — the fair was a showcase for the latest technology, from farm machinery to automobiles.",
    },
    now: {
      year: "2019",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Iowa_State_Fair_Sunrise_-_2019_%2848659752946%29.jpg/1280px-Iowa_State_Fair_Sunrise_-_2019_%2848659752946%29.jpg",
      caption: "Iowa State Fair sunrise, 2019 — carnival rides await the crowds at one of the largest state fairs in the U.S., drawing over 1 million visitors every August.",
    },
    fact: "The Iowa State Fair has been held every August since 1854 — except during WWII. It inspired the 1945 Rodgers & Hammerstein musical 'State Fair,' set in Des Moines.",
  },
];
// ─── THEN & NOW PAGE ─────────────────────────────────────────────────────────
export function ThenNowPage() {
  const [active, setActive] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [thenError, setThenError] = useState(false);
  const [nowError, setNowError] = useState(false);
  const pair = THEN_NOW_PAIRS[active];

  const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='500'%3E%3Crect fill='%23232830' width='900' height='500'/%3E%3Ctext x='450' y='240' text-anchor='middle' fill='%23556070' font-size='18' font-family='sans-serif'%3EHistorical Photo%3C/text%3E%3Ctext x='450' y='268' text-anchor='middle' fill='%23556070' font-size='13' font-family='sans-serif'%3E(Image unavailable)%3C/text%3E%3C/svg%3E";

  const updateSlider = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onMouseDown = (e) => { setDragging(true); updateSlider(e.clientX); e.preventDefault(); };
  const onMouseMove = useCallback((e) => { if (dragging) updateSlider(e.clientX); }, [dragging, updateSlider]);
  const onMouseUp = useCallback(() => setDragging(false), []);
  const onTouchMove = useCallback((e) => { updateSlider(e.touches[0].clientX); e.preventDefault(); }, [updateSlider]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => { window.removeEventListener("mousemove", onMouseMove); window.removeEventListener("mouseup", onMouseUp); };
  }, [onMouseMove, onMouseUp]);

  useEffect(() => { setSliderPos(50); setThenError(false); setNowError(false); }, [active]);

  return (
    <div style={{ background: "var(--warm)", minHeight: "100vh" }}>
      {/* Page hero */}
      <div style={{
        padding: "140px 32px 80px", textAlign: "center",
        background: "linear-gradient(170deg, var(--charcoal) 0%, var(--slate) 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div style={{ width: 48, height: 3, background: "var(--peach)", margin: "0 auto 24px", borderRadius: 2, animation: "scaleIn 0.6s ease" }} />
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#fff", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 14, animation: "fadeUp 0.7s ease" }}>
          Then &amp; Now
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7, animation: "fadeUp 0.7s ease 0.1s both" }}>
          Drag the divider to reveal how Des Moines transformed across generations — same places, different worlds.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px 80px" }}>
        {/* Location selector */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }} role="tablist" aria-label="Choose a location">
          {THEN_NOW_PAIRS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === i}
              aria-controls="then-now-panel"
              onClick={() => setActive(i)}
              style={{
                padding: "10px 20px", borderRadius: 10, border: "1px solid",
                borderColor: active === i ? "var(--peach)" : "rgba(0,0,0,0.1)",
                background: active === i ? "var(--peach)" : "var(--cream)",
                color: active === i ? "var(--charcoal)" : "var(--slate)",
                fontWeight: active === i ? 700 : 500, fontSize: "0.88rem",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.25s ease",
                transform: active === i ? "translateY(-2px)" : "",
                boxShadow: active === i ? "0 6px 20px rgba(255,191,163,0.3)" : "none",
              }}
            >{p.location}</button>
          ))}
        </div>

        {/* Slider */}
        <div
          id="then-now-panel"
          role="tabpanel"
          aria-label={`Before and after: ${pair.location}`}
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={(e) => { updateSlider(e.touches[0].clientX); }}
          onTouchMove={onTouchMove}
          style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            cursor: dragging ? "ew-resize" : "col-resize",
            boxShadow: "0 24px 72px rgba(0,0,0,0.18)",
            userSelect: "none", aspectRatio: "16/9",
            background: "#1E2328",
          }}
        >
          {/* NOW image (right side / background) */}
          <img
            src={nowError ? FALLBACK : pair.now.url}
            onError={() => setNowError(true)}
            alt={`${pair.location} in ${pair.now.year}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            draggable={false}
          />

          {/* THEN image (clipped left side) */}
          <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
            <img
              src={thenError ? FALLBACK : pair.then.url}
              onError={() => setThenError(true)}
              alt={`${pair.location} in ${pair.then.year}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              draggable={false}
            />
            {/* sepia tint on historical side */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(160, 110, 60, 0.2)",
              mixBlendMode: "multiply",
            }} />
          </div>

          {/* Divider */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: `${sliderPos}%`,
            width: 3, background: "#fff", transform: "translateX(-50%)",
            boxShadow: "0 0 16px rgba(0,0,0,0.5)",
            pointerEvents: "none",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 48, height: 48, borderRadius: "50%",
              background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", color: "var(--charcoal)", fontWeight: 700,
            }} aria-hidden="true">⟺</div>
          </div>

          {/* Year badges */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(20,24,28,0.88)", backdropFilter: "blur(8px)",
            color: "#fff", padding: "6px 14px", borderRadius: 8,
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
            fontFamily: "'JetBrains Mono', monospace",
            opacity: sliderPos > 12 ? 1 : 0, transition: "opacity 0.2s",
            pointerEvents: "none",
          }}>THEN · {pair.then.year}</div>

          <div style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(255,191,163,0.92)", backdropFilter: "blur(8px)",
            color: "var(--charcoal)", padding: "6px 14px", borderRadius: 8,
            fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
            fontFamily: "'JetBrains Mono', monospace",
            opacity: sliderPos < 88 ? 1 : 0, transition: "opacity 0.2s",
            pointerEvents: "none",
          }}>NOW · {pair.now.year}</div>

          {/* Instruction hint */}
          <div style={{
            position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.7)",
            padding: "5px 14px", borderRadius: 20, fontSize: "0.72rem",
            fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap",
            pointerEvents: "none",
          }}>← Drag to reveal →</div>
        </div>

        {/* Captions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }} className="then-now-captions">
          <div style={{ background: "var(--cream)", padding: "20px 24px", borderRadius: 14, borderLeft: "3px solid rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--mist)", textTransform: "uppercase", marginBottom: 8 }}>Then · {pair.then.year}</div>
            <p style={{ fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.65, margin: 0 }}>{pair.then.caption}</p>
          </div>
          <div style={{ background: "var(--cream)", padding: "20px 24px", borderRadius: 14, borderLeft: "3px solid var(--peach)" }}>
            <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 8 }}>Now · {pair.now.year}</div>
            <p style={{ fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.65, margin: 0 }}>{pair.now.caption}</p>
          </div>
        </div>

        {/* Fact pill */}
        <div style={{
          marginTop: 16, marginBottom: 0,
          background: "var(--charcoal)", borderRadius: 14, padding: "18px 24px",
          display: "flex", alignItems: "flex-start", gap: 14,
        }}>
          <span style={{ fontSize: "1.3rem", flexShrink: 0 }} aria-hidden="true">💡</span>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>
            <strong style={{ color: "var(--peach)" }}>Did you know? </strong>
            {pair.fact}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .then-now-captions { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── POPULATION DATA ──────────────────────────────────────────────────────────
const POP_DATA = [
  { year: 1850, pop: 502,    event: "Fort Des Moines settled" },
  { year: 1860, pop: 3965,   event: "City charter granted" },
  { year: 1870, pop: 12035,  event: "Railroads arrive" },
  { year: 1880, pop: 22408,  event: "Capital city growth" },
  { year: 1890, pop: 50093,  event: "Industrial expansion" },
  { year: 1900, pop: 62139,  event: "Insurance boom begins" },
  { year: 1910, pop: 86368,  event: "Streetcar suburbs expand" },
  { year: 1920, pop: 126468, event: "WWI era growth" },
  { year: 1930, pop: 142559, event: "Great Depression plateau" },
  { year: 1940, pop: 159819, event: "WWII defense industry" },
  { year: 1950, pop: 177965, event: "Postwar suburban boom" },
  { year: 1960, pop: 208982, event: "Peak city population" },
  { year: 1970, pop: 200587, event: "Suburban migration" },
  { year: 1980, pop: 191003, event: "Rust Belt effects" },
  { year: 1990, pop: 193187, event: "Urban revitalization starts" },
  { year: 2000, pop: 198682, event: "Tech & arts growth" },
  { year: 2010, pop: 203433, event: "Post-recession recovery" },
  { year: 2020, pop: 214133, event: "Modern metropolis" },
];

// ─── POPULATION CHART ─────────────────────────────────────────────────────────
export function PopulationChart() {
  const [hovered, setHovered] = useState(null);
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const maxPop = Math.max(...POP_DATA.map(d => d.pop));
  const W = 800, H = 300;
  const PAD = { top: 24, right: 24, bottom: 56, left: 58 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const x = (i) => PAD.left + (i / (POP_DATA.length - 1)) * chartW;
  const y = (pop) => PAD.top + (1 - pop / (maxPop * 1.08)) * chartH;

  const linePath = POP_DATA.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d.pop).toFixed(1)}`).join(" ");
  const areaPath = linePath
    + ` L ${x(POP_DATA.length - 1).toFixed(1)} ${(H - PAD.bottom).toFixed(1)}`
    + ` L ${x(0).toFixed(1)} ${(H - PAD.bottom).toFixed(1)} Z`;

  const ERA_BANDS = [
    { year: 1866, label: "Railroad Era" },
    { year: 1900, label: "Insurance Boom" },
    { year: 1960, label: "Population Peak" },
    { year: 2000, label: "Revitalization" },
  ];

  return (
    <div ref={ref} style={{
      background: "var(--cream)", borderRadius: 20, padding: "32px 28px",
      border: "1px solid rgba(0,0,0,0.05)", overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--copper)", marginBottom: 8 }}>
          Census Data · 1850 – 2020
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.55rem", color: "var(--charcoal)", fontWeight: 700, margin: 0 }}>
          Population Growth of Des Moines
        </h3>
      </div>

      {/* Hover tooltip */}
      <div style={{ minHeight: 36, marginBottom: 12 }}>
        {hovered && (
          <div style={{
            display: "inline-flex", gap: 20, background: "var(--charcoal)", color: "#fff",
            padding: "9px 18px", borderRadius: 10, fontSize: "0.88rem",
            animation: "fadeIn 0.15s ease",
          }}>
            <span style={{ color: "var(--peach)", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{hovered.year}</span>
            <span style={{ fontWeight: 600 }}>{hovered.pop.toLocaleString()}</span>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}>{hovered.event}</span>
          </div>
        )}
      </div>

      <div style={{ overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", minWidth: 480, display: "block" }}
          role="img"
          aria-label={`Line chart showing Des Moines population growth from ${POP_DATA[0].pop.toLocaleString()} in 1850 to ${POP_DATA[POP_DATA.length-1].pop.toLocaleString()} in 2020`}
        >
          <defs>
            <linearGradient id="popAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--peach)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--peach)" stopOpacity="0.01" />
            </linearGradient>
            <clipPath id="popClip">
              <rect
                x={PAD.left} y={PAD.top}
                width={animated ? chartW : 0}
                height={chartH}
                style={{ transition: "width 1.8s cubic-bezier(0.16,1,0.3,1)" }}
              />
            </clipPath>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(p => {
            const yy = PAD.top + p * chartH;
            const pop = Math.round(maxPop * 1.08 * (1 - p));
            return (
              <g key={p}>
                <line x1={PAD.left} y1={yy} x2={W - PAD.right} y2={yy} stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
                <text x={PAD.left - 8} y={yy + 4} textAnchor="end" fontSize={10} fill="var(--mist)" fontFamily="'JetBrains Mono', monospace">
                  {pop >= 1000 ? `${Math.round(pop / 1000)}K` : pop}
                </text>
              </g>
            );
          })}

          {/* Bottom axis line */}
          <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} stroke="rgba(0,0,0,0.1)" strokeWidth={1} />

          {/* Era marker lines */}
          {ERA_BANDS.map(m => {
            const idx = POP_DATA.findIndex(d => d.year === m.year);
            if (idx < 0) return null;
            return (
              <g key={m.year}>
                <line x1={x(idx)} y1={PAD.top} x2={x(idx)} y2={H - PAD.bottom} stroke="rgba(198,122,82,0.22)" strokeDasharray="5 4" strokeWidth={1.2} />
                <text x={x(idx)} y={H - PAD.bottom + 38} textAnchor="middle" fontSize={8.5} fill="var(--copper)" fontFamily="'DM Sans', sans-serif" fontWeight="600">{m.label}</text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#popAreaGrad)" clipPath="url(#popClip)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="var(--peach-dark)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" clipPath="url(#popClip)" />

          {/* X-axis labels (every other) */}
          {POP_DATA.map((d, i) => {
            if (i % 2 !== 0) return null;
            return (
              <text key={d.year} x={x(i)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={9.5} fill="var(--mist)" fontFamily="'JetBrains Mono', monospace">{d.year}</text>
            );
          })}

          {/* Interactive data points */}
          {POP_DATA.map((d, i) => (
            <circle
              key={d.year}
              cx={x(i)} cy={y(d.pop)} r={hovered?.year === d.year ? 7 : 4}
              fill={hovered?.year === d.year ? "var(--peach)" : "var(--peach-dark)"}
              stroke="#fff" strokeWidth={2}
              style={{ cursor: "pointer", transition: "r 0.15s ease" }}
              onMouseEnter={() => setHovered(d)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(d)}
              onBlur={() => setHovered(null)}
              role="button"
              tabIndex={0}
              aria-label={`${d.year}: ${d.pop.toLocaleString()} residents — ${d.event}`}
            />
          ))}
        </svg>
      </div>

      <p style={{ fontSize: "0.75rem", color: "var(--mist)", marginTop: 12, margin: "12px 0 0" }}>
        Source: U.S. Census Bureau · Hover or tap a point to see details
      </p>
    </div>
  );
}

// ─── NEIGHBORHOODS DATA ───────────────────────────────────────────────────────
const NEIGHBORHOODS = [
  {
    id: "downtown",
    name: "Downtown",
    icon: "🏙️",
    founded: "1851",
    color: "#C67A52",
    region: "Des Moines Core",
    tagline: "The beating heart of Iowa",
    desc: "Downtown Des Moines is the civic and financial center of Iowa. Home to the Wells Fargo Arena, the Civic Center, the Skywalk system, and hundreds of restaurants — it has undergone a stunning revival since the 1990s driven by over $4 billion in investment.",
    facts: [
      "Home to 60+ insurance company headquarters, earning the nickname 'Hartford of the West'",
      "Iowa Events Center hosts 200+ ticketed events per year",
      "The indoor Skywalk connects 50+ city blocks for year-round walkability",
    ],
    highlights: ["East Village Arts District", "Principal Financial Group HQ", "Wells Fargo Arena"],
  },
  {
    id: "eastvillage",
    name: "East Village",
    icon: "🎨",
    founded: "c. 1900",
    color: "#4A8FBA",
    region: "Des Moines Core",
    tagline: "Art, culture & community",
    desc: "Once an industrial neighborhood in the shadow of the State Capitol, East Village transformed in the 2000s into Des Moines' vibrant cultural hub. Independent boutiques, galleries, coffee shops, and acclaimed restaurants now line E Grand Avenue.",
    facts: [
      "Revitalization added 800+ housing units and 50+ new businesses",
      "Home to the Des Moines Social Club and numerous galleries",
      "Site of the annual Hinterland Music Festival",
    ],
    highlights: ["Iowa State Capitol views", "550 Gallery", "Fong's Pizza (iconic local landmark)"],
  },
  {
    id: "drake",
    name: "Drake Neighborhood",
    icon: "🎓",
    founded: "1881",
    color: "#5CB87A",
    region: "Des Moines Core",
    tagline: "Where education meets community",
    desc: "Built around Drake University — founded in 1881 — this neighborhood blends collegiate energy with tree-lined family streets. It is home to the Drake Relays, one of the oldest and most prestigious college track meets in the world, drawing Olympic athletes.",
    facts: [
      "Drake Relays draws 50,000+ spectators each April since 1910",
      "Drake's law school is ranked among the top in the Midwest",
      "The neighborhood hosts Des Moines' longest-running farmers' market",
    ],
    highlights: ["Drake University", "Varsity Cinema (1930s)", "Beaverdale Books"],
  },
  {
    id: "southside",
    name: "South Side",
    icon: "🌮",
    founded: "1940s",
    color: "#D9534F",
    region: "Des Moines Core",
    tagline: "Latino culture & working heritage",
    desc: "The South Side is one of Des Moines' most culturally rich neighborhoods, home to a thriving Latino community since the 1940s when Mexican American workers were recruited for the city's packinghouses. Fleur Drive is a corridor of taquerias, mercados, and quinceañera shops.",
    facts: [
      "Latino population in Des Moines grew over 300% since 1990",
      "Home to the Mexican Consulate of Iowa",
      "Annual Cinco de Mayo festival draws 15,000+ attendees",
    ],
    highlights: ["Fleur Drive Mercado District", "Latinos in Iowa Heritage Museum", "La Tapatia Market"],
  },
  {
    id: "ingersoll",
    name: "Ingersoll Avenue",
    icon: "☕",
    founded: "1910s",
    color: "#C67A52",
    region: "Des Moines Core",
    tagline: "The quintessential local strip",
    desc: "Ingersoll Avenue is Des Moines' most beloved urban street — a two-mile, tree-canopied corridor packed with independent coffee shops, bookstores, boutiques, and restaurants. It is considered the cultural soul of the city's near-northside.",
    facts: [
      "Over 100 locally-owned businesses line this two-mile stretch",
      "Home to the legendary Zombie Burger + Drink Lab",
      "Annual Art on Ingersoll event showcases local artists each summer",
    ],
    highlights: ["Ritual Café", "Beaverdale Books", "Zombie Burger + Drink Lab"],
  },
  {
    id: "highland",
    name: "Highland Park",
    icon: "🌳",
    founded: "1890s",
    color: "#5CB87A",
    region: "Des Moines Core",
    tagline: "History at every corner",
    desc: "Highland Park is one of Des Moines' oldest residential neighborhoods, developed in the 1890s as a streetcar suburb. It has the highest concentration of Victorian-era homes in the city, and an active community association has led its revitalization since the 2010s.",
    facts: [
      "Home to historic streetcar infrastructure from the 1889 expansion",
      "The neighborhood's high school dates to the 1890s and is architecturally landmarked",
      "One of Iowa's largest intact Victorian residential districts",
    ],
    highlights: ["Highland Park Historic District", "Victorian architecture walking tour", "Blair Park"],
  },
  {
    id: "westdesmoines",
    name: "West Des Moines",
    icon: "🌾",
    founded: "1893",
    color: "#7B68EE",
    region: "Metro Suburbs",
    tagline: "From Valley Junction to valley city",
    desc: "West Des Moines grew from the historic Valley Junction railroad community into one of Iowa's most prosperous cities. Its preserved brick downtown, the Jordan House Underground Railroad station, and the sprawling Jordan Creek Town Center make it a city of contrasts — history and modernity side by side.",
    facts: [
      "Valley Junction's historic downtown has been preserved as a shopping and dining district since 1895",
      "The Jordan House (c. 1850) was a documented stop on the Underground Railroad",
      "West Des Moines is home to several Fortune 500 company headquarters",
    ],
    highlights: ["Valley Junction Historic District", "Jordan House Underground Railroad site", "Jordan Creek Town Center"],
  },
  {
    id: "ankeny",
    name: "Ankeny",
    icon: "🚀",
    founded: "1875",
    color: "#FF6B6B",
    region: "Metro Suburbs",
    tagline: "Iowa's fastest-growing city",
    desc: "Ankeny has transformed from a small farming town of 2,964 people in 1960 into Iowa's fourth-largest city with nearly 80,000 residents. It is one of the fastest-growing cities in the entire Midwest, driven by top-ranked schools, major employers like Casey's General Stores, and a booming housing market.",
    facts: [
      "Ankeny's population grew from 2,964 (1960) to ~80,000 (2025) — a 2,600% increase",
      "Consistently ranked among the best places to live in Iowa by national publications",
      "Home to DMACC (Des Moines Area Community College), Iowa's largest community college",
    ],
    highlights: ["Rock 'N Roll Marathon stop", "DMACC Campus", "Prairie Ridge Sports Complex"],
  },
  {
    id: "waukee",
    name: "Waukee",
    icon: "⚡",
    founded: "1869",
    color: "#4ECDC4",
    region: "Metro Suburbs",
    tagline: "Iowa's boomtown",
    desc: "Waukee has exploded in growth, making it one of the top 10 fastest-growing cities in the United States. Originally a quiet stop along the Chicago and North Western Railway, Waukee now boasts award-winning schools, massive residential developments, and Apple's massive data center campus.",
    facts: [
      "Waukee grew by 110%+ between 2010 and 2020 — one of the fastest in the nation",
      "Home to Apple's Iowa data center, a $1 billion investment announced in 2017",
      "Waukee school district is one of Iowa's most sought-after for young families",
    ],
    highlights: ["Apple Data Center", "Triumph Park", "Waukee Historic Depot"],
  },
  {
    id: "johnston",
    name: "Johnston",
    icon: "🏢",
    founded: "1870s",
    color: "#F7B731",
    region: "Metro Suburbs",
    tagline: "Corporate campus country",
    desc: "Johnston is home to some of Iowa's most significant corporate campuses, including DuPont Pioneer (now Corteva Agriscience) and the Iowa National Guard headquarters. Its history is tied to agriculture — Pioneer's hybrid corn research, conducted just miles from downtown Des Moines, helped double global crop yields in the 20th century.",
    facts: [
      "Corteva Agriscience (formerly Pioneer Hi-Bred) HQ employs thousands in Johnston",
      "Iowa National Guard headquarters and Camp Dodge are located in Johnston",
      "Johnston is one of Iowa's wealthiest cities by median household income",
    ],
    highlights: ["Camp Dodge (WWII & Korean War history)", "Corteva/Pioneer HQ", "Johnston Community Trail system"],
  },
  {
    id: "urbandale",
    name: "Urbandale",
    icon: "🌽",
    founded: "1917",
    color: "#A29BFE",
    region: "Metro Suburbs",
    tagline: "Where Iowa's history is kept alive",
    desc: "Urbandale is home to Living History Farms, one of the most unique outdoor history museums in North America, where visitors can step into Iowa farm life from 1700 to the 1900s. The city is also home to the Iowa Hall of Pride and the state's largest municipal park system per capita.",
    facts: [
      "Living History Farms covers 500 acres and recreates Iowa farm life across 3 centuries",
      "Urbandale's park system has over 1,000 acres of parkland and trails",
      "Home to the Iowa Hall of Pride, celebrating the state's greatest athletes and achievements",
    ],
    highlights: ["Living History Farms", "Iowa Hall of Pride", "Walnut Creek trail system"],
  },
  {
    id: "clive",
    name: "Clive",
    icon: "🏃",
    founded: "1941",
    color: "#FD79A8",
    region: "Metro Suburbs",
    tagline: "Trails, parks & community",
    desc: "Clive is a small, prosperous suburb known for its exceptional quality of life, extensive greenway trail system, and community events. The Clive Greenbelt Trail connects to Des Moines' regional trail network, making it a haven for cyclists and runners. It consistently ranks among the safest and most livable cities in Iowa.",
    facts: [
      "Clive Greenbelt Trail is a key link in the regional trail network with 80+ miles of connected paths",
      "Clive's median household income is among the top in the state",
      "The city hosts the annual Clive Triathlon, one of Iowa's premier amateur endurance events",
    ],
    highlights: ["Clive Greenbelt Trail", "Colby Park", "Clive Aquatic Center"],
  },
  {
    id: "altoona",
    name: "Altoona",
    icon: "🎢",
    founded: "1876",
    color: "#E17055",
    region: "Metro Suburbs",
    tagline: "Fun capital of Iowa",
    desc: "Altoona is home to Adventureland Park, one of the Midwest's premier amusement parks, and the Prairie Meadows Racetrack and Casino. The city has grown significantly with the Iowa Cubs moving nearby and the development of Bass Pro Shops and other major retailers along I-80.",
    facts: [
      "Adventureland Park has operated since 1974 and draws hundreds of thousands of visitors annually",
      "Prairie Meadows Racetrack and Casino contributes over $100M annually to Polk County education",
      "The city's economic growth has made Altoona one of the fastest-growing eastern suburbs",
    ],
    highlights: ["Adventureland Park", "Prairie Meadows Racetrack", "Bass Pro Shops"],
  },
];
// ─── NEIGHBORHOODS PAGE ──────────────────────────────────────────────────────
export function NeighborhoodPage() {
  const [selected, setSelected] = useState(NEIGHBORHOODS[0]);

  return (
    <div style={{ background: "var(--warm)", minHeight: "100vh" }}>
      {/* Page hero */}
      <div style={{
        padding: "140px 32px 80px", textAlign: "center",
        background: "linear-gradient(170deg, var(--charcoal) 0%, var(--slate) 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div style={{ width: 48, height: 3, background: "var(--peach)", margin: "0 auto 24px", borderRadius: 2, animation: "scaleIn 0.6s ease" }} />
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#fff", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 14, animation: "fadeUp 0.7s ease" }}>
          Neighborhoods
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto", lineHeight: 1.7, animation: "fadeUp 0.7s ease 0.1s both" }}>
          Each corner of Des Moines holds its own story — from Victorian bungalows to vibrant Latino cultural corridors and collegiate energy.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px 80px" }}>
        {/* Region groups */}
        {["Des Moines Core", "Metro Suburbs"].map(region => (
          <div key={region} style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 2, background: "var(--peach)", borderRadius: 1 }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--copper)" }}>
                {region === "Des Moines Core" ? "🏙️ Des Moines Core" : "🌆 Metro Suburbs"}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }} role="list" aria-label={region}>
            {NEIGHBORHOODS.filter(n => n.region === region).map(n => (
            <button
              key={n.id}
              role="listitem"
              onClick={() => setSelected(n)}
              aria-pressed={selected.id === n.id}
              aria-label={`Explore ${n.name} neighborhood`}
              style={{
                padding: "20px 14px", borderRadius: 14, cursor: "pointer",
                border: `2px solid ${selected.id === n.id ? n.color : "rgba(0,0,0,0.07)"}`,
                background: selected.id === n.id ? `${n.color}1A` : "var(--cream)",
                textAlign: "center", transition: "all 0.25s ease",
                transform: selected.id === n.id ? "translateY(-4px)" : "",
                boxShadow: selected.id === n.id ? `0 10px 32px ${n.color}28` : "0 2px 8px rgba(0,0,0,0.04)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>{n.icon}</div>
              <div style={{
                fontWeight: 700, fontSize: "0.85rem",
                color: selected.id === n.id ? n.color : "var(--charcoal)",
              }}>{n.name}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--mist)", marginTop: 3 }}>Est. {n.founded}</div>
              </button>
            ))}
            </div>
          </div>
        ))}

        {/* Detail panel */}
        <div
          key={selected.id}
          style={{
            background: "var(--cream)", borderRadius: 20,
            border: `1px solid ${selected.color}28`,
            overflow: "hidden",
            animation: "fadeUp 0.35s ease",
            boxShadow: `0 16px 56px ${selected.color}18`,
          }}
          role="region"
          aria-label={`Details for ${selected.name}`}
        >
          {/* Header */}
          <div style={{
            padding: "32px 40px 28px",
            background: `linear-gradient(135deg, ${selected.color}1E, ${selected.color}08)`,
            borderBottom: `1px solid ${selected.color}18`,
            display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
          }}>
            <div style={{ fontSize: "3rem" }} aria-hidden="true">{selected.icon}</div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "2rem",
                fontWeight: 700, color: "var(--charcoal)", marginBottom: 4,
              }}>{selected.name}</h2>
              <p style={{ color: selected.color, fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.04em", margin: 0 }}>
                {selected.tagline}
              </p>
            </div>
            <span style={{
              background: `${selected.color}1A`, color: selected.color,
              padding: "7px 16px", borderRadius: 8, fontSize: "0.78rem",
              fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
              flexShrink: 0,
            }}>Est. {selected.founded}</span>
          </div>

          {/* Content */}
          <div style={{ padding: "32px 40px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40 }} className="neighborhood-body">
            <div>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--copper)", marginBottom: 12 }}>
                About
              </div>
              <p style={{ color: "var(--slate)", lineHeight: 1.8, fontSize: "0.95rem", margin: 0 }}>{selected.desc}</p>
            </div>

            <div>
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--copper)", marginBottom: 14 }}>Key Facts</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {selected.facts.map((f, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.55 }}>
                      <span style={{ color: selected.color, flexShrink: 0, marginTop: 2 }} aria-hidden="true">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--copper)", marginBottom: 14 }}>Must-See</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selected.highlights.map((h, i) => (
                    <span key={i} style={{
                      background: `${selected.color}14`, color: selected.color,
                      padding: "7px 14px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600,
                    }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .neighborhood-body { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}

// ─── SEARCH MODAL ─────────────────────────────────────────────────────────────
export function SearchModal({ isOpen, onClose, timelineData, heroesData, mapLocations, setPage }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const results = q.length < 2 ? [] : [
    ...(timelineData || [])
      .filter(d => d.title?.toLowerCase().includes(q) || d.desc?.toLowerCase().includes(q) || String(d.year).includes(q))
      .slice(0, 4)
      .map(d => ({ type: "History", icon: "📜", label: d.title, sub: String(d.year), page: "history" })),
    ...(heroesData || [])
      .filter(h => h.name?.toLowerCase().includes(q) || h.role?.toLowerCase().includes(q) || h.longDesc?.toLowerCase().includes(q))
      .slice(0, 3)
      .map(h => ({ type: "Heroes", icon: "🏅", label: h.name, sub: h.title || h.role, page: "heroes" })),
    ...(mapLocations || [])
      .filter(l => l.name?.toLowerCase().includes(q) || l.desc?.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q))
      .slice(0, 3)
      .map(l => ({ type: "Map", icon: "📍", label: l.name, sub: l.year ? String(l.year) : l.category, page: "map" })),
  ];

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(30,35,40,0.72)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "11vh", animation: "fadeIn 0.15s ease",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
    >
      <div style={{
        background: "var(--cream)", borderRadius: 18, width: "100%", maxWidth: 620,
        margin: "0 20px", overflow: "hidden",
        boxShadow: "0 36px 90px rgba(0,0,0,0.38)",
        animation: "fadeUp 0.2s ease",
      }}>
        {/* Input row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}>
          <span style={{ fontSize: "1.1rem", color: "var(--mist)", flexShrink: 0 }} aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search history, heroes, places…"
            aria-label="Search all site content"
            style={{
              flex: 1, border: "none", background: "transparent",
              fontSize: "1rem", color: "var(--charcoal)", outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <kbd style={{
            background: "rgba(0,0,0,0.06)", padding: "3px 9px", borderRadius: 5,
            fontSize: "0.72rem", color: "var(--mist)", fontFamily: "'JetBrains Mono', monospace",
            flexShrink: 0,
          }}>ESC</kbd>
        </div>

        {/* Results list */}
        <div style={{ maxHeight: 400, overflowY: "auto" }} role="listbox" aria-label="Search results">
          {q.length < 2 ? (
            <div style={{ padding: "36px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>🏛️</div>
              <p style={{ color: "var(--mist)", fontSize: "0.9rem", margin: 0 }}>
                Type at least 2 characters to search across all content
              </p>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: "36px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>🔎</div>
              <p style={{ color: "var(--mist)", fontSize: "0.9rem", margin: 0 }}>
                No results for <strong>"{query}"</strong>
              </p>
            </div>
          ) : (
            results.map((r, i) => (
              <button
                key={i}
                role="option"
                aria-label={`Go to ${r.type}: ${r.label}`}
                onClick={() => { setPage(r.page); onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 14, width: "100%",
                  padding: "14px 20px", border: "none", background: "transparent",
                  textAlign: "left", cursor: "pointer",
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                  transition: "background 0.15s ease", fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,191,163,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ fontSize: "1.2rem", flexShrink: 0 }} aria-hidden="true">{r.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--charcoal)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.label}</div>
                  {r.sub && <div style={{ fontSize: "0.78rem", color: "var(--mist)", marginTop: 2 }}>{r.sub}</div>}
                </div>
                <span style={{
                  background: "rgba(0,0,0,0.05)", padding: "3px 10px", borderRadius: 6,
                  fontSize: "0.72rem", color: "var(--mist)", flexShrink: 0, fontWeight: 500,
                }}>{r.type}</span>
              </button>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div style={{
          padding: "10px 20px", borderTop: "1px solid rgba(0,0,0,0.05)",
          display: "flex", gap: 18, fontSize: "0.72rem", color: "var(--mist)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <span>↵ navigate</span>
          <span>ESC close</span>
          <span>⌘K open</span>
        </div>
      </div>
    </div>
  );
}

// ─── NEWSPAPER SECTION ────────────────────────────────────────────────────────
const NEWSPAPER_STORIES = [
  {
    paper: "The Des Moines Gazette",
    date: "June 1, 1843",
    headline: "FORT DES MOINES ESTABLISHED AT RIVER CONFLUENCE",
    subheadline: "Captain Allen's Dragoons Erect Garrison; Settlement Begins at Raccoon Fork",
    body: "Captain James Allen of the U.S. Army Dragoons has established a military garrison at the point where the Raccoon River flows into the Des Moines River. The post, designated Fort Des Moines, marks the official beginning of American settlement in this territory. Early observers note the land is fertile and the river crossing strategic for westward trade.",
    byline: "By Our Western Correspondent",
    col2: "The Meskwaki people, who have lived along these waters for generations, observe the construction with measured concern. Their treaty of 1842, signed under considerable federal pressure, ceded this territory — but leaders say their spirit remains bound to the rivers.",
  },
  {
    paper: "The Iowa Capitol Reporter",
    date: "July 14, 1866",
    headline: "IRON HORSE ARRIVES — RAILROADS TRANSFORM DES MOINES FOREVER",
    subheadline: "First Locomotive Reaches City; Business Leaders Hail New Era of Commerce",
    body: "The thunderous arrival of the first railroad locomotive into Des Moines has set the city ablaze with optimism. Mayor Johnson declared the day a civic holiday. Within hours of the first train's arrival, property values along the proposed rail corridor had doubled. Boosters predict Des Moines will rival Chicago within a decade.",
    byline: "By Edward J. Harrington, Staff Writer",
    col2: "Coal mined from the region's extensive deposits will now move efficiently to markets East. The rail connection, say manufacturers, opens a new chapter: 'We are no longer isolated. Des Moines is now tied to the nation.'",
  },
  {
    paper: "The Iowa Bystander",
    date: "October 15, 1917",
    headline: "1,200 BLACK OFFICERS COMMISSIONED AT FORT DES MOINES",
    subheadline: "Historic Training Camp Produces Nation's First African American Military Officers of Senior Rank",
    body: "After a national campaign by civil rights organizations, the War Department established a segregated officer training camp at Fort Des Moines. Over 1,200 African American men have now been commissioned as officers — the first in United States military history to reach such rank. The Iowa Bystander, which fought for this camp since 1916, calls it 'a victory paid for with years of dignified demand.'",
    byline: "By James B. Morris, Publisher",
    col2: "Many of the new officers hail from Des Moines itself, and their families line the streets of the Near North Side to cheer them. 'We proved our worth in the field of discipline,' said one graduate. 'Now we must prove it in the field of battle.'",
  },
  {
    paper: "The Des Moines Register",
    date: "September 2, 1948",
    headline: "COURT RULES: KATZ DRUG STORE REFUSED SERVICE ILLEGALLY",
    subheadline: "Iowa Supreme Court Backs Edna Griffin; Sets Precedent for Civil Rights Across the State",
    body: "In a landmark ruling, the Iowa Supreme Court has sided with Edna Griffin and three other plaintiffs who were refused ice cream service at the Katz Drug Store on 6th Avenue. Mrs. Griffin, who organized boycotts and pickets after being turned away, called the decision 'a victory for every Iowa resident, regardless of color.' The ruling is expected to accelerate integration of public accommodations across the state.",
    byline: "By Margaret Owens, Courthouse Reporter",
    col2: "The Katz Drug Store sit-in, inspired by earlier national CORE actions, took two years of organized community pressure to reach this moment. Civil rights leaders across the Midwest are calling Des Moines 'a model city' for the peaceful but persistent methods employed by Mrs. Griffin and her supporters.",
  },
];

export function NewspaperSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ background: "var(--warm)", padding: "0 0 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 32, height: 2, background: "var(--peach)", borderRadius: 1 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--copper)" }}>
            From the Archives
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {NEWSPAPER_STORIES.map((story, i) => (
            <div
              key={i}
              style={{
                background: "#FFF8EE",
                border: "1px solid rgba(100,80,50,0.2)",
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(100,80,50,0.1)",
                fontFamily: "'Playfair Display', serif",
                position: "relative",
              }}
            >
              {/* Paper texture overlay */}
              <div style={{
                position: "absolute", inset: 0, opacity: 0.035,
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(100,80,50,0.5) 24px, rgba(100,80,50,0.5) 25px)",
                pointerEvents: "none",
              }} />

              {/* Masthead */}
              <div style={{
                borderBottom: "3px double rgba(100,80,50,0.3)",
                padding: "14px 16px 10px",
                textAlign: "center",
                position: "relative",
              }}>
                <div style={{
                  fontSize: "0.55rem", letterSpacing: "0.25em",
                  textTransform: "uppercase", color: "rgba(100,70,30,0.55)",
                  fontFamily: "'DM Sans', sans-serif", marginBottom: 4,
                }}>Est. 1843 · Des Moines, Iowa</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.05rem", fontWeight: 800,
                  color: "rgba(60,40,20,0.9)", letterSpacing: "0.02em",
                }}>{story.paper}</div>
                <div style={{
                  fontSize: "0.6rem", color: "rgba(100,70,30,0.5)",
                  fontFamily: "'DM Sans', sans-serif", marginTop: 4,
                  letterSpacing: "0.12em",
                }}>{story.date}</div>
              </div>

              {/* Content */}
              <div style={{ padding: "16px 18px 20px", position: "relative" }}>
                <h4 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.05rem", fontWeight: 800,
                  color: "rgba(40,25,10,0.95)", lineHeight: 1.25,
                  marginBottom: 6, textTransform: "uppercase",
                  letterSpacing: "0.01em",
                }}>{story.headline}</h4>

                <p style={{
                  fontSize: "0.75rem", fontWeight: 400,
                  color: "rgba(60,40,20,0.65)", lineHeight: 1.45,
                  marginBottom: 12, fontStyle: "italic",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{story.subheadline}</p>

                {/* Column rule */}
                <div style={{ borderTop: "1px solid rgba(100,80,50,0.2)", marginBottom: 12 }} />

                <p style={{
                  fontSize: "0.82rem", lineHeight: 1.65,
                  color: "rgba(40,25,10,0.8)", marginBottom: 0,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{story.body.slice(0, expanded === i ? undefined : 140)}{expanded !== i && story.body.length > 140 ? "…" : ""}</p>

                {expanded === i && (
                  <p style={{
                    fontSize: "0.82rem", lineHeight: 1.65,
                    color: "rgba(40,25,10,0.7)", marginTop: 12,
                    borderLeft: "2px solid rgba(100,80,50,0.2)", paddingLeft: 12,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{story.col2}</p>
                )}

                {/* Byline + expand */}
                <div style={{ borderTop: "1px solid rgba(100,80,50,0.15)", marginTop: 14, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    fontSize: "0.68rem", color: "rgba(100,70,30,0.55)",
                    fontFamily: "'DM Sans', sans-serif", fontStyle: "italic",
                  }}>{story.byline}</span>
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    aria-expanded={expanded === i}
                    aria-label={expanded === i ? "Collapse article" : "Continue reading"}
                    style={{
                      background: "none", border: "1px solid rgba(100,80,50,0.3)",
                      padding: "4px 10px", borderRadius: 4, cursor: "pointer",
                      fontSize: "0.65rem", color: "rgba(80,50,20,0.7)",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}
                  >{expanded === i ? "LESS ↑" : "CONT'D ↓"}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
