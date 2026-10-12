import { Illus } from "@/components/redesign/diagram-iso";
import { MODULES } from "@/data/redesign/value";

const GOLD = "#d9aa3e";
const BG = "#060608";

/** One summit threading through the whole chip supply chain: eight parts of the industry drawn as stops on a circuit-trace line. */
export function RouteMap() {
  const row1 = [200, 440, 680, 920];
  const row2 = [920, 680, 440, 200];
  const y1 = 170;
  const y2 = 470;
  const stops = [
    ...MODULES.slice(0, 4).map((m, i) => ({ m, x: row1[i], y: y1, n: i + 1 })),
    ...MODULES.slice(4).map((m, i) => ({ m, x: row2[i], y: y2, n: i + 5 })),
  ];
  const route = `M40 ${y1} H1010 A150 150 0 0 1 1010 ${y2} H40`;
  return (
    <>
      <svg className="dg-svg route-d" viewBox="0 0 1200 690" role="img" aria-label="The entire chip supply chain, one summit: chip design, AI compute, memory, manufacturing, networking, capital, industry bodies and media, ending at the summit on Oct 23 to 24">
        <path d={route} fill="none" stroke={GOLD} strokeOpacity={0.18} strokeWidth={22} strokeLinejoin="round" />
        <path d={route} fill="none" stroke={GOLD} strokeWidth={5} strokeLinejoin="round" />
        <path d={route} fill="none" stroke={BG} strokeWidth={1.4} strokeDasharray="2 10" strokeLinejoin="round" />
        <circle cx={40} cy={y1} r={9} fill={GOLD} />
        <text className="dg-m" x={40} y={y1 - 26}>START</text>
        <circle cx={40} cy={y2} r={9} fill={BG} stroke={GOLD} strokeWidth={3} />
        <text className="dg-m" x={40} y={y2 - 46}>ARRIVE</text>
        <text className="dg-m" x={40} y={y2 - 28}>OCT 23–24</text>
        <text className="dg-h" x={600} y={356} textAnchor="middle">The Entire Chip Supply Chain. One Summit.</text>
        {stops.map(({ m, x, y, n }) => (
          <g key={m.key}>
            <circle cx={x} cy={y} r={46} fill={BG} stroke={GOLD} strokeWidth={3} />
            <circle cx={x} cy={y} r={46} fill="rgba(217,170,62,.14)" />
            <Illus k={m.key} cx={x} cy={y - 5} scale={0.55} />
            <circle cx={x + 36} cy={y - 34} r={12} fill={GOLD} />
            <text className="dg-num" x={x + 36} y={y - 34} textAnchor="middle" dominantBaseline="central">{n}</text>
            <text className="dg-t" x={x} y={y + 76} textAnchor="middle">{m.lines[0]}</text>
            <text className="dg-t" x={x} y={y + 100} textAnchor="middle">{m.lines[1]}</text>
            <text className="dg-b" x={x} y={y + 124} textAnchor="middle">{m.blurb}</text>
          </g>
        ))}
      </svg>

      <div className="route-m">
        <div className="rm-head">
          <h3>The Entire Chip Supply Chain. One Summit.</h3>
        </div>
        <ol>
          {MODULES.map((m, i) => (
            <li key={m.key}>
              <span className="rm-badge">
                <svg viewBox="-62 -62 124 124" width={64} height={64} aria-hidden="true">
                  <Illus k={m.key} cx={0} cy={-2} scale={0.62} />
                </svg>
              </span>
              <div>
                <span className="rm-n">{String(i + 1).padStart(2, "0")}</span>
                <h4>{m.lines.join(" ")}</h4>
                <p>{m.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="rm-end">Arrive Oct 23–24, Santa Clara.</p>
      </div>
    </>
  );
}

export function RouteMapSection() {
  return (
    <section className="routem">
      <div className="wrap">
        <div className="routem-stage">
          <RouteMap />
        </div>
      </div>
    </section>
  );
}
