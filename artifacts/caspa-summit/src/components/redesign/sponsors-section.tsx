import { LOGO_BASE, SPONSOR_TIERS } from "@/data/redesign/sponsors";

export function SponsorsSection({ onBecomeSponsor }: { onBecomeSponsor: () => void }) {
  return (
    <section id="sponsors" className="spons">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Backed By The Industry</span>
            <h2>
              Trusted By The Companies <em>Building It.</em>
            </h2>
          </div>
          <button type="button" className="btn gold" onClick={onBecomeSponsor}>
            Support CASPA’s Mission
          </button>
        </div>
        {SPONSOR_TIERS.map((tier) => (
          <div key={tier.name}>
            <div className="tier-l">{tier.name}</div>
            <div className={`lgrid ${tier.cols}`}>
              {tier.logos.map((entry) => {
                if (entry.startsWith("text:"))
                  return (
                    <div key={entry} className="lg tx">
                      {entry.slice(5)}
                    </div>
                  );
                const [file, cap] = entry.split("|");
                return (
                  <div key={entry} className={`lg${tier.cols === "c2" || tier.cols === "c3" ? " big" : ""}${cap ? " cp" : ""}`}>
                    <img loading="lazy" src={`${LOGO_BASE}${file.includes(".") ? file : `${file}.png`}`} alt={file} />
                    {cap && <span className="cap">{cap}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
