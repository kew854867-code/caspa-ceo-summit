import { useMemo, useRef, useState } from "react";
import { useReveal } from "@/components/redesign/use-reveal";
import { Link } from "wouter";
import { RedesignNav } from "@/components/redesign/redesign-nav";
import { RedesignFooter } from "@/components/redesign/redesign-footer";
import { DAYS, DAY_CHIPS, type AgendaItem, type AgendaDay } from "@/data/redesign/agenda";
import { byName, PHOTO_BASE } from "@/data/redesign/speakers";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function Person({ name }: { name: string }) {
  const p = byName(name);
  const [broken, setBroken] = useState(false);
  const role = p
    ? [p.title, p.company]
        .filter(Boolean)
        .join(p.company && p.company.includes(",") ? " · " : ", ")
    : "";
  return (
    <div className="pp" data-name={name} tabIndex={0}>
      {p ? (
        broken ? (
          <i className="ini">{initials(name)}</i>
        ) : (
          <img
            loading="lazy"
            src={`${PHOTO_BASE}${p.photo}`}
            alt={name}
            onError={() => setBroken(true)}
          />
        )
      ) : null}
      <div>
        <b>{name}</b>
        {role ? <span>{role}</span> : null}
      </div>
    </div>
  );
}

function Slot({ item }: { item: AgendaItem }) {
  const [time, type, title, people, mod, flags] = item;
  const soft = !type && people.length === 0;
  const modName = mod ? mod.split("|")[0] : null;
  const modOrg = mod ? mod.split("|")[1] : null;
  return (
    <div className={`slot${soft ? " soft" : ""}${flags ? ` ${flags}` : ""}`}>
      <div className="tm">{time}</div>
      <div>
        {type ? <span className="tag">{type}</span> : null}
        <h3>{title}</h3>
        {people.length > 0 ? (
          <div className="ppl">
            {people.map((n) => (
              <Person key={n} name={n} />
            ))}
          </div>
        ) : null}
        {mod ? (
          <div className="mod">
            Moderated by<b>{modName}</b>
            {modOrg ? <i>{modOrg}</i> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DaySection({ day }: { day: AgendaDay }) {
  return (
    <section className="day-s" id={day.id}>
      <div className="dayh">
        <span className="eyebrow">{day.eyebrow}</span>
        <h2>{day.title}</h2>
      </div>
      {day.items.map((item, i) => (
        <Slot key={`${item[0]}-${item[2]}-${i}`} item={item} />
      ))}
    </section>
  );
}

export default function ProgramPage() {
  const [filter, setFilter] = useState<string>("all");
  const chips = useMemo(() => DAY_CHIPS, []);
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, [filter]);

  return (
    <div className="rsv3" ref={root}>
      <RedesignNav active="agenda" />

      <header className="ahero">
        <div className="wrap">
          <span className="eyebrow">Oct 23–24, 2026 · Santa Clara Convention Center</span>
          <h1>The 2026 agenda</h1>
          <p>
            Two days, one stage. From the industry outlook to wafer-scale AI, and a closing evening with the CEO
            of Intel.
          </p>
          <Link className="btn gold" href="/summit#tickets">
            Get your ticket →
          </Link>
        </div>
      </header>

      <div className="fbar">
        <div className="wrap">
          {chips.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`chip${filter === key ? " on" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="wrap" id="main">
        {DAYS.filter((d) => filter === "all" || d.id === filter).map((day) => (
          <DaySection key={day.id} day={day} />
        ))}
      </main>

      <section className="cta2">
        <div className="wrap">
          <span className="eyebrow">Seats are limited</span>
          <h2>
            Be in the room for <em>all of it.</em>
          </h2>
          <Link className="btn gold" href="/summit#tickets">
            Get your ticket →
          </Link>
          <p className="dim" style={{ marginTop: 22, fontSize: 14 }}>
            Schedule and speakers are subject to change.
          </p>
        </div>
      </section>

      <RedesignFooter />
    </div>
  );
}
