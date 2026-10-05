import { TICKETS } from "@/data/redesign/sponsors";

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
          {TICKETS.map((t) => (
            <div key={t.name} className={`tier${t.hl ? " hl" : ""}`}>
              <div className="tb">
                <h3>{t.name}</h3>
                <div className="p">
                  {t.price}
                  {t.hl ? <span className="pill">BEST VALUE</span> : null}
                </div>
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
