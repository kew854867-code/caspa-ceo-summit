import { LOGO_BASE, SPONSOR_TIERS } from "@/data/redesign/sponsors";

export function SponsorsSection({ onBecomeSponsor }: { onBecomeSponsor: () => void }) {
  return (
    <section id="sponsors" className="spons">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Backed By The Industry</span>
            <h2>
              Trusted by the companies <em>building it.</em>
            </h2>
          </div>
          <button type="button" className="btn line" onClick={onBecomeSponsor}>
            Become a sponsor
          </button>
        </div>
        {SPONSOR_TIERS.map((tier) => (
          <div key={tier.name}>
            <div className="tier-l">{tier.name}</div>
            <div className={`lgrid${tier.c4 ? " c4" : ""}`}>
              {tier.logos.map((logo) => (
                <div key={logo} className={`lg${tier.c4 ? " big" : ""}`}>
                  <img loading="lazy" src={`${LOGO_BASE}${logo}`} alt={logo.replace(/\.\w+$/, "")} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          className="sdeck"
          style={{
            marginTop: 44,
            borderTop: "1px solid var(--line)",
            paddingTop: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="eyebrow">Sponsor The CEO Summit</span>
            <h3 style={{ fontSize: "clamp(22px,2.4vw,30px)", margin: "6px 0 0" }}>Put your team in the room</h3>
            <p className="dim" style={{ maxWidth: 540, marginTop: 10 }}>
              Packages are built around what you actually need — from stage time to table seats. Tell us what a
              good outcome looks like and we will shape it around that.
            </p>
          </div>
          <button type="button" className="btn gold" onClick={onBecomeSponsor}>
            Request the sponsorship deck →
          </button>
        </div>
      </div>
    </section>
  );
}
