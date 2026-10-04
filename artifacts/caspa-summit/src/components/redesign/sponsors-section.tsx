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
                  <div key={entry} className={`lg${tier.cols === "c2" ? " big" : ""}${cap ? " cp" : ""}`}>
                    <img loading="lazy" src={`${LOGO_BASE}${file.includes(".") ? file : `${file}.png`}`} alt={file} />
                    {cap && <span className="cap">{cap}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div
          className="sdeck"
          style={{
            marginTop: 44,
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="eyebrow">Sponsor The CEO Summit</span>
            <h3 style={{ fontSize: "clamp(22px,2.4vw,30px)", margin: "6px 0 0" }}>Put Your Team In The Room</h3>
            <p className="dim" style={{ maxWidth: 540, marginTop: 10 }}>
              Packages are built around what you actually need — from stage time to table seats. Tell us what a
              good outcome looks like and we will shape it around that.
            </p>
          </div>
          <button type="button" className="btn gold" onClick={onBecomeSponsor}>
            Request The Sponsorship Deck →
          </button>
        </div>
      </div>
    </section>
  );
}
