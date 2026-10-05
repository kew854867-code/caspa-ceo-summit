import { useEffect, useState } from "react";
import { LISTED, byName, PHOTO_BASE, topSpeakers, type Person } from "@/data/redesign/speakers";
import { BIOS } from "@/data/redesign/bios";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function PersonCard({ person, onOpen }: { person: Person; onOpen: () => void }) {
  const [broken, setBroken] = useState(false);
  const clickable = Boolean(BIOS[person.name]);
  return (
    <div className="card" data-name={person.name} tabIndex={clickable ? 0 : undefined} style={clickable ? undefined : { cursor: "default" }} onClick={clickable ? onOpen : undefined} onKeyDown={clickable ? (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    } : undefined}>
      <div className="ph">
        {broken ? (
          <i className="ini">{initials(person.name)}</i>
        ) : (
          <img
            loading="lazy"
            src={`${PHOTO_BASE}${person.photo}`}
            alt={person.name}
            onError={() => setBroken(true)}
          />
        )}
      </div>
      <h4>{person.name}</h4>
      <div className="r">{person.title}</div>
      {person.company ? <div className="o">{person.company}</div> : null}
    </div>
  );
}

export function ProfileModal({
  name,
  onClose,
}: {
  name: string | null;
  onClose: () => void;
}) {
  const [broken, setBroken] = useState(false);
  useEffect(() => {
    if (!name) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [name, onClose]);

  if (!name) return null;
  const p = byName(name);
  if (!p) return null;
  const b = BIOS[name];
  const role = [p.title, p.company]
    .filter(Boolean)
    .join(p.company && p.company.includes(",") ? " · " : ", ");

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="dlg pdlg"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pf">
          <button type="button" className="x" onClick={onClose} aria-label="Close">
            ×
          </button>
          <div className="pimg">
            {broken ? (
              <i className="ini">{initials(name)}</i>
            ) : (
              <img src={`${PHOTO_BASE}${p.photo}`} alt={name} onError={() => setBroken(true)} />
            )}
          </div>
          <div className="pbody">
            <h3>{name}</h3>
            <div className="prole">{role}</div>
            {b?.bio ? <p className="pbio">{b.bio}</p> : null}
            <div className="plinks">
              {(b?.links ?? []).map(([label, url]) => (
                <a key={url} className="btn line" href={url} target="_blank" rel="noopener noreferrer">
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpeakersSection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const rest = LISTED.filter((p) => !topSpeakers.includes(p));

  return (
    <section id="speakers">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Who Takes The Stage</span>
            <h2>Featured <em>Speakers</em></h2>
          </div>
          <button
            type="button"
            className="btn line"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Show fewer ↑" : `See all ${LISTED.length} speakers →`}
          </button>
        </div>
        <div className="feat">
          {topSpeakers.map((p) => (
            <PersonCard key={p.name} person={p} onOpen={() => setSelected(p.name)} />
          ))}
        </div>
        {open && (
          <div className="more open">
            {rest.map((p) => (
              <PersonCard key={p.name} person={p} onOpen={() => setSelected(p.name)} />
            ))}
          </div>
        )}
      </div>
      <ProfileModal name={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
