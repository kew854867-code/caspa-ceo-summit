// Packages shown here are taken from the published sponsorship price list (caspaceosummit.com/sponsorship):
// the entry-level options that are easiest to say yes to. Names, prices and inclusions are copied as published.
const PACKAGES: { name: string; price: string; points: string[] }[] = [
  {
    name: "Corp. Dinner Table Partner",
    price: "$12,000",
    points: ["1 reserved table (10 seats)", "Logo on stage and in proceedings", "VIP reception access"],
  },
  {
    name: "Oct 23 Dinner Sponsorship",
    price: "$10,000",
    points: ["Exclusive branding of the Oct 23 networking dinner", "2 dinner seats"],
  },
  {
    name: "Associate",
    price: "$7,000",
    points: ["5 reserved seats", "Logo on website and program", "VIP reception access"],
  },
  {
    name: "Annual Conf. Display Table",
    price: "$5,000",
    points: ["1 display table at the venue (10/23 PM, 10/24 AM and PM)", "2 conference passes"],
  },
];

export function WhySponsor({ onBecomeSponsor }: { onBecomeSponsor: () => void }) {
  return (
    <section id="why-sponsor" className="whysp">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Why Sponsor</span>
            <h2>
              Put Your Company In Front Of <em>The People Who Matter.</em>
            </h2>
          </div>
          <button type="button" className="btn gold" onClick={onBecomeSponsor}>
            Ask About Sponsorship
          </button>
        </div>

        <div className="sptiers">
          {PACKAGES.map((t, i) => (
            <article className="sptier rv" key={t.name}>
              <span className="sn">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t.name}</h3>
              <p className="sp-price">{t.price}</p>
              <ul>
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
