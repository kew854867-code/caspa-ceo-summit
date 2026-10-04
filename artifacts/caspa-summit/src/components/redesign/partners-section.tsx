import { MEDIA_PARTNERS, ALLIANCE_PARTNERS, PARTNER_LOGO_BASE } from "@/data/redesign/sponsors";

function LogoGrid({ items, id }: { items: [string, string | null][]; id?: string }) {
  return (
    <div className="lgrid" id={id}>
      {items.map(([name, file]) =>
        file ? (
          <div key={name} className="lg">
            <img src={`${PARTNER_LOGO_BASE}${file}`} alt={name} loading="lazy" />
          </div>
        ) : (
          <div key={name} className="lg tx">
            {name}
          </div>
        )
      )}
    </div>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" className="partners">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Partners</span>
            <h2>
              Media &amp; Alliance <em>Partners.</em>
            </h2>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="pgroup">
          <div className="phead">
            <span className="eyebrow">Official Media Partners</span>
          </div>
          <LogoGrid items={MEDIA_PARTNERS} id="mediaPartners" />
        </div>

        <div className="pgroup">
          <div className="phead">
            <span className="eyebrow">Alliance Partners</span>
          </div>
          <LogoGrid items={ALLIANCE_PARTNERS} id="alliancePartners" />
        </div>

        <p className="dim" style={{ marginTop: 22, fontSize: 15 }}>
          Panels moderated by journalists from Reuters, EE Times, Semiconductor Engineering and SemiWiki.
        </p>
        <div style={{ marginTop: 34, textAlign: "center" }}>
          <button type="button" className="btn line" onClick={onPress}>
            Cover The Summit — apply for a media pass →
          </button>
        </div>
      </div>
    </section>
  );
}
