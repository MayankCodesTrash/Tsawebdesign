import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── YOUTUBE VIDEO ID ────────────────────────────────────────────────────────
// Search YouTube for "Fort Des Moines civil rights Iowa PBS" or
// "Des Moines Iowa history documentary" and paste the 11-char ID here.
const YOUTUBE_VIDEO_ID = "86C1bf_YVMY"; // Iowa History 101: Des Moines — State Historical Society of Iowa

// ─── QUIZ DATA (12 questions about the Des Moines community story) ────────────
const QUIZ = [
  {
    q: "In what year was Fort Des Moines established at the river confluence?",
    opts: ["1837", "1843", "1851", "1857"],
    correct: 1,
    fact: "Captain James Allen chose the spot where the Raccoon River meets the Des Moines River — the same location that became Iowa's capital city.",
  },
  {
    q: "Who led the 1948 sit-in at Katz Drug Store, leading Iowa to ban discrimination?",
    opts: ["Mary Louise Smith", "Willie Glanton", "Edna Griffin", "Ruth Singleton"],
    correct: 2,
    fact: "Edna Griffin's legal victory made Iowa the first state to outlaw public accommodation discrimination — 16 years before the federal Civil Rights Act.",
  },
  {
    q: "Fort Des Moines was the ONLY U.S. site to host the first training programs for which two groups?",
    opts: ["Women pilots & Navy officers", "Black Army officers & Women's Army Corps", "Marine officers & Army Rangers", "Medics & Intelligence officers"],
    correct: 1,
    fact: "1917: first Black officer training. 1942: first Women's Army Auxiliary Corps training. No other site in America holds both milestones.",
  },
  {
    q: "Which Iowa Governor opened the state's doors to Southeast Asian refugees in 1975?",
    opts: ["Harold Hughes", "Robert D. Ray", "Terry Branstad", "Tom Vilsack"],
    correct: 1,
    fact: "Governor Ray created the only state-funded refugee resettlement program in the U.S., welcoming thousands of Vietnamese, Laotian, and Cambodian families.",
  },
  {
    q: "The Tinker v. Des Moines Supreme Court case (1969) established that:",
    opts: ["Schools can ban political clothing", "Students do not shed their rights at the schoolhouse gate", "Teachers cannot be fired for protest", "School prayer is unconstitutional"],
    correct: 1,
    fact: "Des Moines students wore black armbands to protest the Vietnam War and were suspended. The Supreme Court ruled 7–2 in their favor.",
  },
  {
    q: "How tall is the Iowa State Capitol's iconic gold dome?",
    opts: ["175 feet", "225 feet", "275 feet", "325 feet"],
    correct: 2,
    fact: "The dome is covered in 23-karat gold leaf and rises 275 feet — as tall as a 27-story building. Iowa's Capitol is the only one in the U.S. with five domes.",
  },
  {
    q: "The 1993 Des Moines flood left how many residents without clean water?",
    opts: ["50,000", "100,000", "250,000", "500,000"],
    correct: 2,
    fact: "The Des Moines River crested at 28.4 feet, destroying the water treatment plant. 250,000 people had no water for 12 days — but the community rebuilt faster than any expert predicted.",
  },
  {
    q: "What nickname was Des Moines given for its concentration of insurance companies?",
    opts: ["Prairie Capital", "Hartford of the West", "The Insurance City", "Midwest Finance Center"],
    correct: 1,
    fact: "So many national insurance companies headquartered here that the city earned the same nickname as Hartford, Connecticut — the original U.S. insurance capital.",
  },
  {
    q: "The Near South Side Latino community was primarily built by:",
    opts: ["German immigrants in the 1880s", "Black families from Buxton", "Mexican American packinghouse workers", "Swedish farm families"],
    correct: 2,
    fact: "Beginning in the 1940s, Mexican American workers recruited for meatpacking plants built Iowa's most vibrant Latino neighborhood, with its own newspapers, mutual aid societies, and cultural traditions.",
  },
  {
    q: "Drake University was founded in what year?",
    opts: ["1871", "1875", "1881", "1891"],
    correct: 2,
    fact: "Founded in 1881 with just 43 students, Drake University now enrolls over 5,000 and has produced more Iowa governors and federal judges than any other institution in the state.",
  },
  {
    q: "Iowa became the ___ state of the United States in 1846:",
    opts: ["27th", "29th", "31st", "33rd"],
    correct: 1,
    fact: "Iowa became the 29th state the same year Fort Des Moines was incorporated as a town — shedding 'Fort' to become simply 'Des Moines' five years later.",
  },
  {
    q: "The Lauridsen Skatepark opened in 2021 as the:",
    opts: ["First skatepark in Iowa", "Largest skatepark in the Midwest", "Largest free outdoor skatepark in the U.S.", "Most expensive skatepark ever built"],
    correct: 2,
    fact: "Located along the Des Moines River, the Lauridsen Skatepark is the largest open, free, outdoor public skatepark in the United States.",
  },
];

// ─── FLASHCARD DATA ───────────────────────────────────────────────────────────
const CARDS = [
  {
    emoji: "🏛️",
    front: "Fort Des Moines · 1843",
    back: "Captain James Allen established this military post at the confluence of the Raccoon and Des Moines Rivers. It became the seed of Iowa's capital city and grew from 165 settlers to a metro of 700,000.",
  },
  {
    emoji: "✊",
    front: "Edna Griffin · Civil Rights",
    back: "Led the 1948 Katz Drug Store sit-in. Her landmark legal victory made Iowa the FIRST state to ban public accommodation discrimination — 16 years before the federal Civil Rights Act of 1964.",
  },
  {
    emoji: "🕊️",
    front: "Governor Robert D. Ray",
    back: "Served five terms (1969–1983). Opened Iowa to thousands of Southeast Asian refugees in 1975, creating the only state-run resettlement program in the U.S. Known as Iowa's most beloved governor.",
  },
  {
    emoji: "⭐",
    front: "Black Officers · 1917",
    back: "Fort Des Moines became the first training camp for African American Army officers in U.S. history. 639 Black officers were commissioned here during WWI — a landmark civil rights milestone.",
  },
  {
    emoji: "🎖️",
    front: "Women's Army Corps · 1942",
    back: "Fort Des Moines was the first national training center for the Women's Army Auxiliary Corps. No other U.S. location was 'first' for both Black officer training AND women's Army training.",
  },
  {
    emoji: "⚖️",
    front: "Tinker v. Des Moines · 1969",
    back: "Des Moines students wore black armbands to protest Vietnam and were suspended. The Supreme Court ruled 7–2: students do not shed their constitutional rights at the schoolhouse gate.",
  },
  {
    emoji: "🌊",
    front: "Great Flood of 1993",
    back: "The Des Moines River crested at 28.4 feet, cutting water to 250,000 residents for 12 days. The city's response — neighbors sharing water, volunteers running distribution — became a model of civic resilience.",
  },
  {
    emoji: "🌮",
    front: "Near South Side",
    back: "Iowa's most vibrant Latino neighborhood, built by Mexican American workers in the 1940s. Home to Iowa's largest Cinco de Mayo celebration with 20,000+ attendees, and the Mexican Consulate.",
  },
  {
    emoji: "🏛️",
    front: "Iowa State Capitol · 1884",
    back: "Took 13 years to build. Its 23-karat gold dome rises 275 feet. Iowa's Capitol is the only U.S. state capitol with FIVE domes — one large and four small — a completely unique arrangement.",
  },
  {
    emoji: "🎡",
    front: "Iowa State Fair · 1854",
    back: "Held every August since 1854, except during WWII. It inspired the 1945 Rodgers & Hammerstein musical 'State Fair.' Draws over 1 million visitors annually — one of the largest state fairs in the U.S.",
  },
];

// ─── TIMELINE CHALLENGE DATA ──────────────────────────────────────────────────
const TL_EVENTS = [
  { year: 1843, label: "Fort Des Moines founded" },
  { year: 1857, label: "Capital moved to Des Moines" },
  { year: 1884, label: "Iowa State Capitol dedicated" },
  { year: 1917, label: "First Black Army officers trained" },
  { year: 1942, label: "Women's Army Corps training begins" },
  { year: 1948, label: "Katz Drug Store sit-in" },
  { year: 1969, label: "Tinker v. Des Moines ruling" },
  { year: 1975, label: "Governor Ray opens Iowa to refugees" },
  { year: 1993, label: "Great Flood — 250,000 without water" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── FLASHCARD COMPONENT ──────────────────────────────────────────────────────
function Flashcard({ card, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000, cursor: "pointer", height: 200 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          background: "linear-gradient(135deg, var(--cream), #F7EDD4)",
          borderRadius: 14, border: "1.5px solid rgba(139,94,60,0.25)",
          boxShadow: "0 4px 20px rgba(28,16,8,0.1)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "20px 16px", textAlign: "center", gap: 10,
        }}>
          <span style={{ fontSize: "2rem" }}>{card.emoji}</span>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1rem",
            fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.35,
          }}>{card.front}</div>
          <div style={{
            fontSize: "0.6rem", color: "var(--copper)", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4,
          }}>Click to reveal →</div>
        </div>

        {/* Back */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: "linear-gradient(135deg, #3D1F0A, #5C3010)",
          borderRadius: 14, border: "1.5px solid rgba(201,138,42,0.3)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "18px 16px", textAlign: "center", gap: 8,
        }}>
          <span style={{ fontSize: "1.4rem" }}>{card.emoji}</span>
          <p style={{
            color: "rgba(242,232,213,0.92)", fontSize: "0.78rem",
            lineHeight: 1.65, margin: 0, fontFamily: "'DM Sans', sans-serif",
          }}>{card.back}</p>
          <div style={{ fontSize: "0.55rem", color: "var(--peach)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Click to flip back
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── TIMELINE CHALLENGE COMPONENT ────────────────────────────────────────────
function TimelineChallenge() {
  const [scrambled, setScrambled] = useState(() => shuffle(TL_EVENTS));
  const [selected, setSelected] = useState([]);
  const [shake, setShake] = useState(null);
  const [done, setDone] = useState(false);

  const correct = TL_EVENTS.slice().sort((a, b) => a.year - b.year);

  const handlePick = (ev) => {
    if (done || selected.find(s => s.year === ev.year)) return;
    const nextIdx = selected.length;
    if (ev.year === correct[nextIdx].year) {
      const next = [...selected, ev];
      setSelected(next);
      if (next.length === TL_EVENTS.length) setDone(true);
    } else {
      setShake(ev.year);
      setTimeout(() => setShake(null), 500);
    }
  };

  const reset = () => { setScrambled(shuffle(TL_EVENTS)); setSelected([]); setDone(false); };

  return (
    <div>
      <p style={{ color: "var(--mist)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 24 }}>
        Click the events <strong>in chronological order</strong> — earliest first. A green checkmark means you got it right. A red shake means try a different event first.
      </p>

      {/* Scrambled events to click */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10, marginBottom: 32 }}>
        {scrambled.map((ev) => {
          const isSelected = !!selected.find(s => s.year === ev.year);
          const isShaking = shake === ev.year;
          return (
            <motion.button
              key={ev.year}
              onClick={() => handlePick(ev)}
              animate={isShaking ? { x: [-8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              whileHover={!isSelected ? { scale: 1.03, y: -2 } : {}}
              whileTap={!isSelected ? { scale: 0.97 } : {}}
              style={{
                padding: "14px 16px", borderRadius: 10, border: "2px solid",
                borderColor: isSelected ? "var(--success)" : "rgba(139,94,60,0.2)",
                background: isSelected ? "rgba(61,122,74,0.12)" : "var(--cream)",
                cursor: isSelected ? "default" : "pointer",
                textAlign: "left", fontFamily: "'DM Sans', sans-serif",
                transition: "border-color 0.25s, background 0.25s",
                opacity: isSelected ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "1rem" }}>{isSelected ? "✅" : "📅"}</span>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: isSelected ? "var(--success)" : "var(--charcoal)" }}>{ev.label}</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Order so far */}
      {selected.length > 0 && (
        <div style={{ background: "var(--charcoal)", borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
          <div style={{ fontSize: "0.62rem", color: "var(--peach)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Your Timeline So Far
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {selected.map((ev, i) => (
              <motion.div
                key={ev.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <span style={{ color: "var(--peach)", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", minWidth: 44 }}>{ev.year}</span>
                <span style={{ color: "rgba(242,232,213,0.85)", fontSize: "0.82rem" }}>{ev.label}</span>
                <span style={{ marginLeft: "auto", color: "var(--success)" }}>✓</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            style={{
              background: "linear-gradient(135deg, rgba(61,122,74,0.15), rgba(61,122,74,0.08))",
              border: "2px solid var(--success)", borderRadius: 14,
              padding: "24px 28px", textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🎉</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: 8 }}>
              Perfect Timeline!
            </div>
            <p style={{ color: "var(--mist)", fontSize: "0.88rem", marginBottom: 16, lineHeight: 1.6 }}>
              You correctly ordered all 9 key events in Des Moines community history.
            </p>
            <button onClick={reset} style={{
              background: "var(--peach)", color: "#fff", border: "none",
              padding: "10px 28px", borderRadius: 8, fontWeight: 700,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>Try Again</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── QUIZ COMPONENT ───────────────────────────────────────────────────────────
function Quiz() {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const total = QUIZ.length;
  const score = Object.values(answers).filter(Boolean).length;
  const allDone = Object.keys(answers).length === total;

  const pick = (qi, oi) => {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi === QUIZ[qi].correct }));
    setTimeout(() => setRevealed(p => ({ ...p, [qi]: true })), 350);
  };

  const reset = () => { setAnswers({}); setRevealed({}); };

  return (
    <div>
      {/* Score strip */}
      <div style={{
        background: "var(--charcoal)", borderRadius: 12, padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 28,
      }}>
        <span style={{ color: "rgba(242,232,213,0.65)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif" }}>
          {Object.keys(answers).length} of {total} answered
        </span>
        <span style={{ color: "var(--peach)", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem" }}>
          {score} / {total} correct
        </span>
        {allDone && (
          <button onClick={reset} style={{
            background: "var(--peach)", color: "#fff", border: "none",
            padding: "8px 20px", borderRadius: 8, fontWeight: 700,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
          }}>Retake</button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {QUIZ.map((q, qi) => {
          const answered = answers[qi] !== undefined;
          const isCorrect = answers[qi] === true;
          return (
            <motion.div
              key={qi}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: qi * 0.03, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: answered
                  ? isCorrect ? "rgba(61,122,74,0.08)" : "rgba(176,48,32,0.06)"
                  : "var(--cream)",
                borderRadius: 12, padding: "22px 22px",
                border: `1.5px solid ${answered ? (isCorrect ? "rgba(61,122,74,0.4)" : "rgba(176,48,32,0.3)") : "rgba(139,94,60,0.18)"}`,
                transition: "background 0.3s, border-color 0.3s",
              }}
            >
              <div style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{
                  background: answered ? (isCorrect ? "var(--success)" : "#B03020") : "var(--charcoal)",
                  color: "#fff", borderRadius: "50%", width: 26, height: 26, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 700, transition: "background 0.3s",
                }}>{answered ? (isCorrect ? "✓" : "✗") : qi + 1}</span>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", lineHeight: 1.45 }}>{q.q}</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: answered && revealed[qi] ? 14 : 0 }} className="quiz-grid">
                {q.opts.map((opt, oi) => {
                  const isRight = oi === q.correct;
                  const wasChosen = answered && answers[qi] !== undefined && oi !== q.correct && answers[qi] === false && q.opts[oi] !== q.opts[q.correct];
                  let bg = "white", border = "2px solid #e0d8cc", color = "var(--charcoal)";
                  if (answered && isRight) { bg = "var(--success)"; border = "2px solid var(--success)"; color = "#fff"; }
                  if (answered && !isRight && answers[qi] === false) {
                    // figure out which one was chosen - track separately
                  }
                  return (
                    <button key={oi} disabled={answered} onClick={() => pick(qi, oi)} style={{
                      background: bg, border, color, borderRadius: 8,
                      padding: "10px 13px", fontSize: "0.85rem", fontWeight: 500,
                      cursor: answered ? "default" : "pointer", textAlign: "left",
                      fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s ease",
                      opacity: answered && !isRight ? 0.45 : 1,
                    }}
                    onMouseEnter={e => { if (!answered) e.currentTarget.style.borderColor = "var(--peach)"; }}
                    onMouseLeave={e => { if (!answered) e.currentTarget.style.borderColor = "#e0d8cc"; }}
                    >{opt}</button>
                  );
                })}
              </div>

              <AnimatePresence>
                {revealed[qi] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      overflow: "hidden", marginTop: 12,
                      padding: "10px 14px", borderRadius: 8,
                      background: "rgba(201,138,42,0.08)",
                      borderLeft: "3px solid var(--peach)",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--mist)", lineHeight: 1.6 }}>
                      💡 {q.fact}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 22 }}
          style={{
            marginTop: 28, padding: "24px 28px", borderRadius: 14, textAlign: "center",
            background: score === total
              ? "linear-gradient(135deg, rgba(201,138,42,0.15), rgba(232,165,53,0.08))"
              : "rgba(247,237,212,0.8)",
            border: `2px solid ${score === total ? "var(--peach)" : "rgba(139,94,60,0.2)"}`,
          }}
        >
          <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>
            {score === total ? "🏆" : score >= total * 0.75 ? "🌟" : score >= total * 0.5 ? "👍" : "📚"}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: 6 }}>
            {score === total ? "Perfect Score!" : score >= total * 0.75 ? "Excellent!" : score >= total * 0.5 ? "Good Work!" : "Keep Learning!"}
          </div>
          <div style={{ color: "var(--mist)", fontSize: "0.9rem" }}>
            You scored <strong>{score}</strong> out of <strong>{total}</strong> on the Community Story quiz.
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── EDUCATION PAGE ───────────────────────────────────────────────────────────
export function EducationPage() {
  const [tab, setTab] = useState("video");

  const TABS = [
    { id: "video",     label: "📽️ Community Film" },
    { id: "quiz",      label: "🧠 Quiz" },
    { id: "cards",     label: "🃏 Flashcards" },
    { id: "challenge", label: "⏱️ Timeline Challenge" },
  ];

  return (
    <div>
      {/* Page hero */}
      <div style={{
        padding: "130px 32px 76px", textAlign: "center",
        background: "linear-gradient(160deg, #1C0C04 0%, #3D1F0A 50%, #4A2410 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 700, height: 300,
            background: "radial-gradient(ellipse, rgba(201,138,42,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7 }}
          style={{ width: 44, height: 3, background: "linear-gradient(90deg, var(--copper), var(--peach), #FFD700)", margin: "0 auto 22px", borderRadius: 2, transformOrigin: "center", boxShadow: "0 0 12px rgba(201,138,42,0.5)" }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.1 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.6rem)", color: "#FFF8EE", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 16 }}
        >Education</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          style={{ color: "rgba(255,245,220,0.78)", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}
        >
          Explore the community story of Des Moines through film, interactive quizzes, flashcards, and a timeline challenge. History isn't just read — it's remembered.
        </motion.p>
      </div>

      {/* Sticky tab bar */}
      <div style={{
        background: "rgba(247,237,212,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "2px solid rgba(120,80,30,0.18)",
        position: "sticky", top: 60, zIndex: 90,
        boxShadow: "0 2px 10px rgba(28,16,8,0.07)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", gap: 0, overflowX: "auto" }}>
          {TABS.map(t => (
            <motion.button
              key={t.id}
              onClick={() => setTab(t.id)}
              whileHover={{ y: -1 }}
              style={{
                padding: "15px 22px", background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                fontWeight: tab === t.id ? 700 : 500, fontSize: "0.9rem",
                color: tab === t.id ? "var(--charcoal)" : "var(--mist)",
                borderBottom: tab === t.id ? "3px solid var(--peach)" : "3px solid transparent",
                marginBottom: "-2px", transition: "color 0.2s", whiteSpace: "nowrap",
              }}
            >{t.label}</motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px 80px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* ── VIDEO TAB ── */}
            {tab === "video" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                  <div style={{ height: 2, width: 40, background: "var(--peach)", borderRadius: 1 }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--copper)" }}>Community Film</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 40, alignItems: "start" }} className="edu-video-grid">
                  {/* Embed */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        borderRadius: 14, overflow: "hidden",
                        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
                        border: "3px solid rgba(201,138,42,0.3)",
                        position: "relative", paddingBottom: "56.25%", height: 0,
                        background: "#1C1008",
                      }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&color=white`}
                        title="Des Moines Community History"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: "absolute", top: 0, left: 0,
                          width: "100%", height: "100%", border: "none",
                        }}
                      />
                    </motion.div>
                    <p style={{ color: "var(--mist)", fontSize: "0.78rem", marginTop: 10, lineHeight: 1.5, fontStyle: "italic" }}>
                      A documentary exploring the civil rights milestones and community stories that shaped Des Moines, Iowa.
                    </p>
                  </div>

                  {/* Side info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      style={{ background: "var(--cream)", borderRadius: 12, padding: "22px 20px", border: "1px solid rgba(139,94,60,0.2)" }}
                    >
                      <div style={{ fontSize: "0.6rem", color: "var(--copper)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Why This Story Matters</div>
                      <p style={{ color: "var(--mist)", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
                        Des Moines is the only city in the United States to have hosted the first training programs for both Black Army officers (1917) and women soldiers (1942) — two of the 20th century's defining civil rights milestones at one address.
                      </p>
                    </motion.div>
                    {[
                      { icon: "🏛️", label: "Fort founded", val: "1843" },
                      { icon: "⭐", label: "Black officers trained", val: "1917" },
                      { icon: "🎖️", label: "Women's Army trained", val: "1942" },
                      { icon: "✊", label: "Katz sit-in victory", val: "1948" },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.28 + i * 0.07 }}
                        style={{
                          background: "var(--cream)", borderRadius: 10, padding: "14px 18px",
                          border: "1px solid rgba(139,94,60,0.15)",
                          display: "flex", alignItems: "center", gap: 14,
                        }}
                      >
                        <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                        <div>
                          <div style={{ fontSize: "0.65rem", color: "var(--mist)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--peach)", fontSize: "1.1rem" }}>{s.val}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* After-video links to other tabs */}
                <div style={{ marginTop: 40, padding: "28px 32px", background: "linear-gradient(135deg, #3D1F0A, #5C3010)", borderRadius: 14 }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--peach)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Continue Learning</div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {[
                      { id: "quiz", label: "Take the Quiz", icon: "🧠" },
                      { id: "cards", label: "Study Flashcards", icon: "🃏" },
                      { id: "challenge", label: "Timeline Challenge", icon: "⏱️" },
                    ].map(btn => (
                      <motion.button
                        key={btn.id}
                        onClick={() => setTab(btn.id)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          background: "rgba(201,138,42,0.15)", border: "1.5px solid rgba(201,138,42,0.4)",
                          color: "#FFF8EE", padding: "10px 20px", borderRadius: 8,
                          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600, fontSize: "0.85rem",
                        }}
                      >{btn.icon} {btn.label}</motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── QUIZ TAB ── */}
            {tab === "quiz" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ height: 2, width: 40, background: "var(--peach)", borderRadius: 1 }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--copper)" }}>Community Story Quiz</span>
                </div>
                <p style={{ color: "var(--mist)", fontSize: "0.9rem", marginBottom: 28, lineHeight: 1.6 }}>
                  {QUIZ.length} questions about the people, places, and events that shaped Des Moines. An explanation appears after each answer.
                </p>
                <Quiz />
              </div>
            )}

            {/* ── FLASHCARDS TAB ── */}
            {tab === "cards" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ height: 2, width: 40, background: "var(--peach)", borderRadius: 1 }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--copper)" }}>Flashcards</span>
                </div>
                <p style={{ color: "var(--mist)", fontSize: "0.9rem", marginBottom: 28, lineHeight: 1.6 }}>
                  {CARDS.length} cards covering the key people and events of the Des Moines community story. <strong>Click any card to flip it.</strong>
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                  {CARDS.map((card, i) => <Flashcard key={i} card={card} index={i} />)}
                </div>
              </div>
            )}

            {/* ── TIMELINE CHALLENGE TAB ── */}
            {tab === "challenge" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ height: 2, width: 40, background: "var(--peach)", borderRadius: 1 }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--copper)" }}>Timeline Challenge</span>
                </div>
                <TimelineChallenge />
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .edu-video-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
