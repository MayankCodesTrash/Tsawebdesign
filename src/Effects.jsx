import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── WEB AUDIO NAV SOUND ─────────────────────────────────────────────────────
export function setupNavSound() {
  window.__playNavSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Crisp page-turn: filtered noise burst that decays fast
      const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.09), ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.5);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1400;
      filter.Q.value = 0.7;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch {}
  };
}

// ─── COUNT-UP HOOK ────────────────────────────────────────────────────────────
export function useCountUp(target, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, active]);

  return count;
}

// ─── CURSOR TRAIL ─────────────────────────────────────────────────────────────
export function CursorTrail() {
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);
  const throttleRef = useRef(0);

  const onMove = useCallback((e) => {
    const now = Date.now();
    if (now - throttleRef.current < 35) return;
    throttleRef.current = now;
    const id = idRef.current++;
    setParticles(p => [...p.slice(-20), { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setParticles(p => p.filter(pt => pt.id !== id)), 750);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9990 }}>
      {particles.map((pt, i) => {
        const size = 6 - i * 0.15;
        return (
          <motion.div
            key={pt.id}
            initial={{ opacity: 0.75, scale: 1 }}
            animate={{ opacity: 0, scale: 0.1, y: -18 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: pt.x - size / 2,
              top: pt.y - size / 2,
              width: Math.max(size, 3),
              height: Math.max(size, 3),
              borderRadius: "50%",
              background: `radial-gradient(circle, #E8A535, rgba(201,138,42,0.3))`,
              pointerEvents: "none",
              boxShadow: "0 0 4px rgba(201,138,42,0.4)",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── AMBIENT PLAYER ───────────────────────────────────────────────────────────
export function AmbientPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener("scroll", show, { once: true, passive: true });
    window.addEventListener("click", show, { once: true });
    return () => {
      window.removeEventListener("scroll", show);
      window.removeEventListener("click", show);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setPulsing(p => !p), 800);
    return () => clearInterval(iv);
  }, [playing]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.18;
      audioRef.current.play().catch(() => {});
    }
    setPlaying(p => !p);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Scott_Joplin_-_Maple_Leaf_Rag.ogg"
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            style={{ position: "fixed", bottom: 24, left: 24, zIndex: 9000 }}
          >
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggle}
              title={playing ? "Mute ambient music" : "Play 1900s ragtime ambient music"}
              style={{
                width: 50, height: 50, borderRadius: "50%",
                background: playing
                  ? "linear-gradient(135deg, #C98A2A, #E8A535)"
                  : "rgba(28,16,8,0.88)",
                border: `2px solid ${playing ? "#E8A535" : "rgba(201,138,42,0.4)"}`,
                backdropFilter: "blur(14px)",
                color: "#fff", fontSize: "1.3rem",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: playing
                  ? `0 0 ${pulsing ? "28px" : "14px"} rgba(201,138,42,0.6), 0 4px 16px rgba(0,0,0,0.4)`
                  : "0 4px 20px rgba(0,0,0,0.45)",
                transition: "box-shadow 0.6s ease, background 0.3s ease, border 0.3s ease",
              }}
            >
              {playing ? "🎵" : "🔇"}
            </motion.button>
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: playing ? 1 : 0, x: playing ? 0 : -8 }}
              style={{
                position: "absolute", left: 58, top: "50%", transform: "translateY(-50%)",
                background: "rgba(28,16,8,0.88)", backdropFilter: "blur(14px)",
                border: "1px solid rgba(201,138,42,0.3)", borderRadius: 8,
                padding: "5px 10px", whiteSpace: "nowrap",
                fontSize: "0.65rem", color: "rgba(242,232,213,0.8)", fontWeight: 600,
                letterSpacing: "0.05em", pointerEvents: "none",
              }}
            >
              🎹 Maple Leaf Rag · Scott Joplin, 1899
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── BACK TO TOP ─────────────────────────────────────────────────────────────
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 420);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.15, boxShadow: "0 10px 36px rgba(201,138,42,0.55)" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 9000,
            width: 50, height: 50, borderRadius: "50%",
            background: "linear-gradient(135deg, #9A6518, #C98A2A)",
            border: "2px solid rgba(232,165,53,0.5)",
            color: "#FFF8EE", fontSize: "1.2rem",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3), 0 0 0 0 rgba(201,138,42,0)",
            fontWeight: 700,
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── CONFETTI BURST ───────────────────────────────────────────────────────────
export function ConfettiBurst({ trigger }) {
  const [particles, setParticles] = useState([]);
  const prevTrigger = useRef(null);

  useEffect(() => {
    if (!trigger || trigger === prevTrigger.current) return;
    prevTrigger.current = trigger;
    const colors = ["#B22234", "#FFFFFF", "#3C3B6E", "#BF0A30", "#fff", "#002868", "#CC0000", "#F0F0F0"];
    const shapes = ["circle", "square", "rect"];
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      size: Math.random() * 10 + 4,
      drift: (Math.random() - 0.5) * 280,
      duration: Math.random() * 1.8 + 0.9,
      delay: Math.random() * 0.6,
      shape: shapes[i % shapes.length],
      spin: (Math.random() - 0.5) * 900,
      startY: -5 - Math.random() * 15,
    }));
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 3500);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!particles.length) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998, overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.startY}vh`, rotate: 0, opacity: 1, scale: 1 }}
          animate={{
            y: "115vh",
            x: `calc(${p.x}vw + ${p.drift}px)`,
            rotate: p.spin,
            opacity: [1, 1, 0.6, 0],
            scale: [1, 1.1, 0.6, 0.2],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.23, 0.95, 0.58, 1] }}
          style={{
            position: "absolute",
            width: p.shape === "rect" ? p.size * 2 : p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "square" ? 2 : 1,
            boxShadow: p.color === "#FFFFFF" || p.color === "#F0F0F0" ? "0 0 4px rgba(200,200,200,0.4)" : `0 0 ${p.size * 0.8}px ${p.color}88`,
          }}
        />
      ))}
    </div>
  );
}

// ─── DID YOU KNOW ─────────────────────────────────────────────────────────────
const DYK_FACTS = [
  "Fort Des Moines was established in 1843 at the confluence of the Raccoon and Des Moines Rivers — just 20 years after the Lewis & Clark Expedition.",
  "Des Moines is the only U.S. city to have hosted the first training programs for both Black Army officers (1917) and women soldiers (1942).",
  "The Iowa State Capitol has five domes — the only such arrangement among all U.S. state capitols.",
  "Des Moines grew from 165 people in 1843 to a metro of over 700,000 today — a 4,000× increase in under 200 years.",
  "The 1948 Katz Drug Store sit-in led Iowa to become the first state to ban public accommodation discrimination — 16 years before the federal Civil Rights Act.",
  "Tinker v. Des Moines (1969) established that students do not shed their constitutional rights at the schoolhouse gate.",
  "The 1993 flood cut water to 250,000 Des Moines residents for 12 straight days — the system was restored faster than any expert predicted.",
  "The Iowa State Fair has run every August since 1854, except during WWII — it inspired the 1945 Rodgers & Hammerstein musical.",
  "The Iowa State Capitol's gold dome uses real 23-karat gold leaf and rises 275 feet — the same height as a 27-story building.",
  "Des Moines is nicknamed the 'Hartford of the West' because more insurance companies are headquartered here than almost anywhere in the U.S.",
];

export function DidYouKnow({ page }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % DYK_FACTS.length);
        setVisible(true);
      }, 380);
    }, 9000);
    return () => clearInterval(iv);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 22 }}
      style={{
        position: "fixed", right: 16, bottom: 84, zIndex: 8000,
        maxWidth: 270,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
          background: "rgba(28,16,8,0.93)",
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(201,138,42,0.4)",
          borderRadius: 14, padding: "13px 16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,138,42,0.1)",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(e => !e)}
      >
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3 }}
              style={{ fontSize: "0.95rem" }}
            >💡</motion.span>
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8A535", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
              Did You Know?
            </span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); setDismissed(true); }}
            style={{ background: "none", border: "none", color: "rgba(242,232,213,0.35)", cursor: "pointer", fontSize: "0.85rem", padding: "0 2px", lineHeight: 1 }}
            title="Dismiss"
          >✕</button>
        </div>

        <AnimatePresence mode="wait">
          {visible && (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              style={{
                color: "rgba(242,232,213,0.85)", fontSize: "0.73rem",
                lineHeight: 1.65, margin: 0, fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {DYK_FACTS[idx]}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 4, marginTop: 10, justifyContent: "center" }}>
          {DYK_FACTS.map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i === idx ? 1.3 : 1, opacity: i === idx ? 1 : 0.3 }}
              style={{
                width: 4, height: 4, borderRadius: "50%",
                background: i === idx ? "#E8A535" : "rgba(242,232,213,0.4)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── FLOATING SPARKLE ─────────────────────────────────────────────────────────
export function FloatingSparkle({ x, y, color = "#E8A535" }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, x, y }}
      animate={{ opacity: 0, scale: 1.8, y: y - 50 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed", width: 10, height: 10,
        borderRadius: "50%", background: color,
        pointerEvents: "none", zIndex: 9500,
        boxShadow: `0 0 12px ${color}`,
      }}
    />
  );
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────
export function MagneticButton({ children, style = {}, onClick, className = "", ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.28,
      y: (e.clientY - cy) * 0.28,
    });
  };

  const onMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={className}
      style={{ cursor: "pointer", ...style }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

// ─── PAGE TRANSITION WRAPPER ──────────────────────────────────────────────────
export function PageTransition({ children, pageKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
