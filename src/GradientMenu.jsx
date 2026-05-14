import { useState } from "react";
import {
  IoHomeOutline,
  IoTimeOutline,
  IoTrophyOutline,
  IoMicOutline,
  IoMapOutline,
  IoGridOutline,
  IoSwapHorizontalOutline,
  IoLibraryOutline,
  IoSchoolOutline,
} from "react-icons/io5";

const GRADIENT_ITEMS = [
  { id: "home",          label: "Home",       Icon: IoHomeOutline,           from: "#C98A2A", to: "#8B5A2B" },
  { id: "history",       label: "History",    Icon: IoTimeOutline,           from: "#FF9966", to: "#E05A30" },
  { id: "heroes",        label: "Heroes",     Icon: IoTrophyOutline,         from: "#FFD700", to: "#C98A2A" },
  { id: "voices",        label: "Voices",     Icon: IoMicOutline,            from: "#56CCF2", to: "#2F80ED" },
  { id: "map",           label: "Map",        Icon: IoMapOutline,            from: "#80FF72", to: "#2ED573" },
  { id: "neighborhoods", label: "Areas",      Icon: IoGridOutline,           from: "#a955ff", to: "#7B2FBE" },
  { id: "then-now",      label: "Numbers",    Icon: IoSwapHorizontalOutline, from: "#FF6B9D", to: "#C44569" },
  { id: "sources",       label: "Reference",  Icon: IoLibraryOutline,        from: "#A8EDEA", to: "#5FC3BA" },
  { id: "education",    label: "Education",  Icon: IoSchoolOutline,         from: "#F7971E", to: "#FFD200" },
];

export function GradientMenu({ activePage, setPage }) {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        .gm-list { display: flex; gap: 5px; align-items: center; list-style: none; margin: 0; padding: 0; }
        .gm-item {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; outline: none;
          background: rgba(255,255,255,0.08);
          border-radius: 50px;
          height: 44px; width: 44px; flex-shrink: 0;
          transition: width 0.45s cubic-bezier(0.16,1,0.3,1),
                      border-radius 0.45s ease,
                      background 0.3s ease,
                      box-shadow 0.3s ease;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.28);
        }
        .gm-item.gm-hovered,
        .gm-item.gm-active {
          width: 116px;
          background: transparent;
          box-shadow: none;
        }
        .gm-bg {
          position: absolute; inset: 0; border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .gm-item.gm-hovered .gm-bg,
        .gm-item.gm-active  .gm-bg { opacity: 1; }

        .gm-glow {
          position: absolute; top: 8px; left: 0; right: 0; height: 100%;
          border-radius: inherit; opacity: 0; z-index: -1;
          filter: blur(14px);
          transition: opacity 0.4s ease;
        }
        .gm-item.gm-hovered .gm-glow,
        .gm-item.gm-active  .gm-glow { opacity: 0.55; }

        .gm-icon {
          position: relative; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.28s ease, opacity 0.28s ease;
        }
        .gm-item.gm-hovered .gm-icon,
        .gm-item.gm-active  .gm-icon { transform: scale(0); opacity: 0; }

        .gm-label {
          position: absolute; z-index: 2;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          white-space: nowrap;
          transform: scale(0); opacity: 0;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1) 0.12s,
                      opacity 0.28s ease 0.12s;
        }
        .gm-item.gm-hovered .gm-label,
        .gm-item.gm-active  .gm-label { transform: scale(1); opacity: 1; }

        @media (max-width: 1100px) {
          .gm-item.gm-hovered, .gm-item.gm-active { width: 44px; }
          .gm-item.gm-hovered .gm-icon, .gm-item.gm-active .gm-icon { transform: none; opacity: 1; }
          .gm-item.gm-hovered .gm-label, .gm-item.gm-active .gm-label { transform: scale(0); opacity: 0; }
        }
      `}</style>

      <ul className="gm-list">
        {GRADIENT_ITEMS.map(({ id, label, Icon, from, to }, idx) => {
          const isActive  = activePage === id;
          const isHovered = hovered === idx;
          const highlight = isActive || isHovered;

          return (
            <li
              key={id}
              className={`gm-item${isHovered ? " gm-hovered" : ""}${isActive ? " gm-active" : ""}`}
              onClick={() => setPage(id)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              title={label}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && setPage(id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="gm-bg"  style={{ background: `linear-gradient(45deg, ${from}, ${to})` }} />
              <span className="gm-glow" style={{ background: `linear-gradient(45deg, ${from}, ${to})` }} />
              <span className="gm-icon">
                <Icon
                  size={17}
                  color={isActive ? "#FFD980" : highlight ? "#fff" : "rgba(255,255,255,0.65)"}
                />
              </span>
              <span className="gm-label">{label}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
