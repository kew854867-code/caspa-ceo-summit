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

export function PartnersSection({
  onPress,
  showMedia = true,
  showAlliance = true,
}: {
  onPress: () => void;
  showMedia?: boolean;
  showAlliance?: boolean;
}) {
  return (
    <section id="partners" className="partners">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Partners</span>
            <h2>
              {showMedia && showAlliance ? (
                <>
                  Media &amp; Alliance <em>Partners.</em>
                </>
              ) : showMedia ? (
                <>
                  Media <em>Partners.</em>
                </>
              ) : (
                <>
                  Alliance <em>Partners.</em>
                </>
              )}
            </h2>
          </div>
          {showMedia && (
            <button type="button" className="btn gold" onClick={onPress}>
              Cover The Summit
            </button>
          )}
        </div>
      </div>

      <div className="wrap">
        {showMedia && (
          <div className="pgroup">
            <div className="phead">
              <span className="eyebrow">Official Media Partners</span>
            </div>
            <LogoGrid items={MEDIA_PARTNERS} id="mediaPartners" />
          </div>
        )}

        {showAlliance && (
          <div className="pgroup">
            <div className="phead">
              <span className="eyebrow">Alliance Partners</span>
            </div>
            <LogoGrid items={ALLIANCE_PARTNERS} id="alliancePartners" />
          </div>
        )}
      </div>
    </section>
  );
}
