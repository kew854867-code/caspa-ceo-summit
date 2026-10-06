import { useEffect, useState } from "react";
import { TICKETS } from "@/data/redesign/sponsors";
import { SIGNOFF_BODY, SIGNOFF_SUBJECT } from "./signoff-email";

function TemplateDialog({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${SIGNOFF_SUBJECT}\n\n${SIGNOFF_BODY}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable: the text is selectable below */
    }
  };

  const openMail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(SIGNOFF_SUBJECT)}&body=${encodeURIComponent(SIGNOFF_BODY)}`;
  };

  return (
    <div className="tpl-ov" onClick={onClose}>
      <div className="tpl" role="dialog" aria-modal="true" aria-label="Email template" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="x" onClick={onClose} aria-label="Close">
          ×
        </button>
        <span className="eyebrow">Need Sign-Off To Attend?</span>
        <h3>Email Template For Your Leadership Team</h3>
        <p className="tpl-sub">Replace the bracketed names, then send.</p>
        <div className="tpl-body" tabIndex={0}>
          <b>Subject: {SIGNOFF_SUBJECT}</b>
          {"\n\n"}
          {SIGNOFF_BODY}
        </div>
        <div className="tpl-actions">
          <button type="button" className="btn gold" onClick={copy}>
            {copied ? "Copied ✓" : "Copy Email"}
          </button>
          <button type="button" className="btn line" onClick={openMail}>
            Open In Email App
          </button>
        </div>
      </div>
    </div>
  );
}

export function TicketsSection() {
  const [tplOpen, setTplOpen] = useState(false);

  return (
    <section id="tickets" className="tickets">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Tickets</span>
            <h2>Take A Seat.</h2>
          </div>
          <p className="dim" style={{ maxWidth: 360 }}>
            Sales end Oct 23.
          </p>
        </div>

        <div className="tkts rv">
          {TICKETS.map((t) => (
            <div key={t.name} className={`tkt${t.hl ? " pop" : ""}`}>
              <div className="tkt-top">
                <h3>{t.name}</h3>
                {t.hl ? <span className="tkt-pill">Most Popular</span> : null}
              </div>
              <div className="tkt-dt">{t.dates}</div>
              <div className="tkt-pr">{t.price}</div>
              <ul>
                {t.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <a className="tkt-btn" href={t.href} target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </div>
          ))}
        </div>

        <div className="signoff rv">
          <div>
            <h3>Need Sign-Off To Attend?</h3>
            <p>A ready-to-send email making the case to your leadership team.</p>
          </div>
          <button type="button" className="signoff-btn" onClick={() => setTplOpen(true)}>
            Get The Email Template <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      {tplOpen ? <TemplateDialog onClose={() => setTplOpen(false)} /> : null}
    </section>
  );
}
