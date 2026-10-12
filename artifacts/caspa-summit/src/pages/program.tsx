import { useMemo, useRef, useState } from "react";
import { useReveal } from "@/components/redesign/use-reveal";
import { RedesignNav } from "@/components/redesign/redesign-nav";
import { RedesignFooter } from "@/components/redesign/redesign-footer";
import { DAYS, DAY_CHIPS, type AgendaItem, type AgendaDay } from "@/data/redesign/agenda";
import { byName, PHOTO_BASE } from "@/data/redesign/speakers";
import { THEMES, THEME_BY_TITLE, TAKEAWAY_BY_TITLE } from "@/data/redesign/value";
import { ChipMapSection } from "@/components/redesign/value-section";

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
        {THEME_BY_TITLE[title] ? <span className="theme-l">{THEME_BY_TITLE[title]}</span> : null}
        <h3>{title}</h3>
        {TAKEAWAY_BY_TITLE[title] ? <p className="takeaway">{TAKEAWAY_BY_TITLE[title]}</p> : null}
        {people.length > 0 ? (
          <div className="ppl">
            {people.map((n) => (
              <Person key={n} name={n} />
            ))}
          </div>
        ) : null}
        {mod ? (
          byName(modName || "") ? (
            <div className="modrow">
              <span className="modl">Moderated by</span>
              <Person name={modName as string} />
            </div>
          ) : (
            <div className="mod">
              Moderated by<b>{modName}</b>
              {modOrg ? <i>{modOrg}</i> : null}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

function DaySection({ day, theme }: { day: AgendaDay; theme: string }) {
  const items = theme === "all" ? day.items : day.items.filter((it) => THEME_BY_TITLE[it[2]] === theme);
  if (items.length === 0) return null;
  return (
    <section className="day-s" id={day.id}>
      <div className="dayh">
        <span className="eyebrow">{day.eyebrow}</span>
        <h2>{day.title}</h2>
      </div>
      {items.map((item, i) => (
        <Slot key={`${item[0]}-${item[2]}-${i}`} item={item} />
      ))}
    </section>
  );
}

export default function ProgramPage() {
  const [filter, setFilter] = useState<string>("all");
  const [theme, setTheme] = useState<string>("all");
  const chips = useMemo(() => DAY_CHIPS, []);
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, [filter, theme]);

  return (
    <div className="rsv3" ref={root}>
      <RedesignNav active="agenda" />

      <div className="nav-spacer" aria-hidden="true" />

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
        <div className="wrap themes">
          <span className="themes-l">Topic</span>
          {["all", ...THEMES].map((t) => (
            <button
              key={t}
              type="button"
              className={`chip sm${theme === t ? " on" : ""}`}
              onClick={() => setTheme(t)}
            >
              {t === "all" ? "All topics" : t}
            </button>
          ))}
        </div>
      </div>

      <main className="wrap" id="main">
        {DAYS.filter((d) => filter === "all" || d.id === filter).map((day) => (
          <DaySection key={day.id} day={day} theme={theme} />
        ))}
      </main>

      <ChipMapSection />

      <RedesignFooter />
    </div>
  );
}
