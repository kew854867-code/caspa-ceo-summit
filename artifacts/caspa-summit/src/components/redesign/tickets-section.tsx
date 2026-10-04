import { REDESIGN_BASE } from "@/data/redesign/base";
import { TICKETS } from "@/data/redesign/sponsors";

const TICKET_IMAGES = ["img/aud.jpg", "img/banq.jpg", "img/fire.jpg"] as const;

export function TicketsSection() {
  return (
    <section id="tickets" className="tickets">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Tickets</span>
            <h2>Take a seat.</h2>
          </div>
          <p className="dim" style={{ maxWidth: 360 }}>
            Sales end Oct 23.
          </p>
        </div>
        <div className="tiers rv">
          {TICKETS.map((t, i) => (
            <div key={t.name} className={`tier${t.hl ? " hl" : ""}`}>
              <div className="timg" style={{ backgroundImage: `url(${REDESIGN_BASE}${TICKET_IMAGES[i]})` }}>
                {t.hl ? <span className="pill">BEST VALUE</span> : null}
              </div>
              <div className="tb">
                <h3>{t.name}</h3>
                <div className="p">{t.price}</div>
                <ul>
                  {t.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <a className={`btn ${t.hl ? "gold" : "line"}`} href={t.href} target="_blank" rel="noopener noreferrer">
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
