import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ROLES, findSession } from "@/data/redesign/value";
import { TICKETS } from "@/data/redesign/sponsors";
import { MAP_W, MAP_H, MAP_RX, MAP_RY, MAP_STAGES, MAP_LABELS, MAP_WORDS, MAP_EDGES } from "@/data/redesign/chipmap";

/** "I'm a…" picker: pick a role, see what to do, which sessions to catch and who to meet. */
export function RoleSection() {
  const [key, setKey] = useState(ROLES[0].key);
  const role = ROLES.find((r) => r.key === key) ?? ROLES[0];

  return (
    <section id="why" className="why">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Why Attend</span>
            <h2>
              Come With A Goal. <em>Meet The Right People.</em>
            </h2>
          </div>
          <p className="why-sub">Tell us what you are here to do. We will show you the sessions and the people that matter.</p>
        </div>

        <div className="roletabs rv" role="tablist" aria-label="I am a">
          <span className="roletabs-l">I am a</span>
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              role="tab"
              aria-selected={r.key === key}
              className={`rtab${r.key === key ? " on" : ""}`}
              onClick={() => setKey(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="rolepanel" key={role.key}>
          <div className="rp-main">
            <h3>{role.headline}</h3>
            <ol className="rp-actions">
              {role.actions.map((a, i) => (
                <li key={a}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rp-side">
            <div className="rp-l">Sessions to catch</div>
            <ul className="rp-sessions">
              {role.sessions.map((t) => {
                const s = findSession(t);
                return (
                  <li key={t}>
                    {s ? (
                      <span className="when">
                        {s.day} · {s.time}
                      </span>
                    ) : null}
                    <span className="what">{t}</span>
                  </li>
                );
              })}
            </ul>
            <div className="rp-agenda">
              <Link className="agenda-tag" href="/agenda">
                See All The Agenda →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A map of the AI chip supply chain, drawn as a ring of keywords around the call to action. */
export function ChipMapSection({
  eyebrow = "Seats are limited",
  title = (
    <>
      Be In The Room For <em>All Of It.</em>
    </>
  ),
  note = "Schedule and speakers are subject to change.",
}: {
  eyebrow?: string;
  title?: ReactNode;
  note?: string;
}) {
  const core = (
    <div className="cmap-core">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <a className="btn gold" href={TICKETS[0].href} target="_blank" rel="noopener noreferrer">
        Get Your Ticket →
      </a>
      <p className="cmap-note">{note}</p>
    </div>
  );
  return (
    <section id="map" className="cmap">
      <div className="wrap">
        <div className="cmap-stage rv">
          <svg className="cmap-svg" viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Keywords across the AI chip supply chain, from design to deployment">
            <ellipse className="ring" cx={MAP_W / 2} cy={MAP_H / 2} rx={MAP_RX} ry={MAP_RY} />
            {MAP_EDGES.map(([a, b]) => (
              <line key={`${a}-${b}`} className="edge" x1={MAP_WORDS[a].x} y1={MAP_WORDS[a].y} x2={MAP_WORDS[b].x} y2={MAP_WORDS[b].y} />
            ))}
            {MAP_WORDS.map((w) => (
              <text key={w.t} className={`kw ${w.c}${w.s > 28 ? " xl" : ""}`} x={w.x} y={w.y} fontSize={w.s} textAnchor="middle" dominantBaseline="central">
                {w.t}
              </text>
            ))}
            {MAP_LABELS.map((l, i) => (
              <g key={l.t}>
                <circle className="dot" cx={l.x} cy={l.y} r={3.5} />
                <text className="stg" x={l.x} y={l.y + (Math.sin((l.a * Math.PI) / 180) > 0.5 ? 22 : Math.sin((l.a * Math.PI) / 180) < -0.5 ? -16 : 0)} textAnchor="middle" dominantBaseline="central">
                  {String(i + 1).padStart(2, "0")} · {l.t}
                </text>
              </g>
            ))}
          </svg>
          {core}
        </div>

        <div className="cmap-m">
          {core}
          {MAP_STAGES.map((st, i) => (
            <div className="cm-group" key={st}>
              <span className="cm-l">
                {String(i + 1).padStart(2, "0")} · {st}
              </span>
              <p>
                {MAP_WORDS.filter((w) => w.g === st).map((w) => (
                  <span key={w.t} className={`cm-w ${w.c}${w.s > 28 ? " xl" : w.s > 20 ? " md" : ""}`}>
                    {w.t}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
