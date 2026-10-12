// Small isometric illustrations (drawn for this site) for the eight industry modules.
// Everything is built from boxes / discs projected onto an isometric grid, so the set shares one light and one style.
import type { ReactNode } from "react";

const COS = Math.cos(Math.PI / 6); // 0.866
const SIN = 0.5;
type P3 = [number, number, number];
/** Isometric projection: +x goes right-down, +y goes left-down, +z goes up. */
const proj = ([x, y, z]: P3): [number, number] => [(x - y) * COS, (x + y) * SIN - z];
const pts = (ps: P3[]) => ps.map((p) => proj(p).map((n) => n.toFixed(1)).join(",")).join(" ");

// One light from the top-left: lit top, mid right face, shaded left face.
const TONE = { top: "#f6f4ee", right: "#d9d5c9", left: "#b9b5a8" };
type Tone = { top: string; right: string; left: string };
const tone = (top: string, right: string, left: string): Tone => ({ top, right, left });
const GOLD = tone("#f1cf7a", "#d9aa3e", "#b0852a");
const BLUE = tone("#8fc6f2", "#4aa3e8", "#3079b3");
const MINT = tone("#a9e3c0", "#6fcf97", "#4ca571");
const CORAL = tone("#f6ab9b", "#ec7b62", "#bd5a45");
const DARK = tone("#4a4742", "#35332f", "#25231f");

function Box({ x, y, z, w, d, h, t = TONE }: { x: number; y: number; z: number; w: number; d: number; h: number; t?: Tone }) {
  return (
    <g>
      <polygon points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={t.left} />
      <polygon points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={t.right} />
      <polygon points={pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={t.top} />
    </g>
  );
}

/** A flat disc / coin: ellipse top with a visible side wall. */
function Disc({ cx, cy, z, r, h, t = TONE, children }: { cx: number; cy: number; z: number; r: number; h: number; t?: Tone; children?: ReactNode }) {
  const [sx, sy] = proj([cx, cy, z]);
  const rx = r * 1.2247;
  const ry = r * 0.7071;
  return (
    <g>
      <path d={`M${sx - rx} ${sy} V${sy - h} A${rx} ${ry} 0 0 0 ${sx + rx} ${sy - h} V${sy} A${rx} ${ry} 0 0 1 ${sx - rx} ${sy}Z`} fill={t.right} />
      <path d={`M${sx - rx} ${sy} V${sy - h} A${rx} ${ry} 0 0 0 ${sx} ${sy - h + ry} V${sy + ry} A${rx} ${ry} 0 0 1 ${sx - rx} ${sy}Z`} fill={t.left} />
      <ellipse cx={sx} cy={sy - h} rx={rx} ry={ry} fill={t.top} />
      {children}
    </g>
  );
}

const line = (a: P3, b: P3, stroke: string, w = 1.4) => {
  const [x1, y1] = proj(a);
  const [x2, y2] = proj(b);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={w} strokeLinecap="round" />;
};

/* ---- the eight objects, each roughly 110 × 100 units, origin near the centre ---- */

function Design() {
  // a circuit board layout with a chip and routed traces
  const z = 6;
  return (
    <g transform="translate(0 6)">
      <Box x={-42} y={-30} z={0} w={84} d={60} h={6} t={tone("#f6f4ee", "#d9d5c9", "#b9b5a8")} />
      {[-30, -15, 0, 15, 30].map((v) => line([v, -28, z], [v, 28, z], "rgba(20,15,0,.13)", 0.8))}
      {[-18, -6, 6, 18].map((v) => line([-40, v, z], [40, v, z], "rgba(20,15,0,.13)", 0.8))}
      {line([-8, 0, z], [-38, 0, z], "#d9aa3e", 2)}
      {line([-38, 0, z], [-38, -22, z], "#d9aa3e", 2)}
      {line([8, 0, z], [34, 0, z], "#d9aa3e", 2)}
      {line([34, 0, z], [34, 20, z], "#d9aa3e", 2)}
      {line([0, -8, z], [0, -26, z], "#d9aa3e", 2)}
      {[[-38, -22], [34, 20], [0, -26], [-38, 0], [34, 0]].map(([a, b], i) => {
        const [sx, sy] = proj([a, b, z]);
        return <circle key={i} cx={sx} cy={sy} r={2.6} fill="#d9aa3e" />;
      })}
      <Box x={-9} y={-9} z={z} w={18} d={18} h={9} t={GOLD} />
    </g>
  );
}

function Compute() {
  // a processor package with pins
  const z = 7;
  const pins = [];
  for (let i = 0; i < 8; i++) {
    const v = -33 + i * 9.5;
    pins.push(<g key={i}>{line([v, 40, z], [v, 47, z], "#8d897f", 1.8)}{line([40, v, z], [47, v, z], "#8d897f", 1.8)}</g>);
  }
  return (
    <g transform="translate(0 4)">
      <Box x={-40} y={-40} z={0} w={80} d={80} h={z} t={tone("#e9e5d9", "#cfcabd", "#aeaa9d")} />
      {pins}
      <Box x={-26} y={-26} z={z} w={52} d={52} h={9} t={tone("#f6f4ee", "#d9d5c9", "#b9b5a8")} />
      <Box x={-14} y={-14} z={z + 9} w={28} d={28} h={3} t={GOLD} />
      {line([-8, 0, z + 12], [8, 0, z + 12], "#6b4f10", 1.6)}
      {line([0, -8, z + 12], [0, 8, z + 12], "#6b4f10", 1.6)}
    </g>
  );
}

function Memory() {
  // a stacked-die memory (HBM-like) on a base
  const layers = [0, 1, 2, 3, 4];
  return (
    <g transform="translate(0 8)">
      <Box x={-42} y={-42} z={0} w={84} d={84} h={6} t={tone("#e9e5d9", "#cfcabd", "#aeaa9d")} />
      {layers.map((i) => (
        <Box key={i} x={-26} y={-26} z={6 + i * 8.5} w={52} d={52} h={6} t={i === 4 ? MINT : i % 2 ? TONE : tone("#ece9df", "#d2cec2", "#b0ac9f")} />
      ))}
      {[-22, 22].map((v) => (
        <g key={v}>{line([v, 26, 8], [v, 26, 46], "#8d897f", 1.4)}{line([26, v, 8], [26, v, 46], "#8d897f", 1.4)}</g>
      ))}
    </g>
  );
}

function Fab() {
  // a wafer
  const R = 46;
  const grid: ReactNode[] = [];
  const z = 5;
  for (let k = -5; k <= 5; k++) {
    const v = k * 9;
    grid.push(line([-R, v, z], [R, v, z], "rgba(20,15,0,.22)", 0.9));
    grid.push(line([v, -R, z], [v, R, z], "rgba(20,15,0,.22)", 0.9));
  }
  const [sx, sy] = proj([0, 0, z]);
  const rx = R * 1.2247;
  const ry = R * 0.7071;
  return (
    <g transform="translate(0 12)">
      <Disc cx={0} cy={0} z={0} r={R} h={z} t={tone("#e9e5d9", "#cfcabd", "#aeaa9d")}>
        <clipPath id="wclip">
          <ellipse cx={sx} cy={sy - 0} rx={rx} ry={ry} transform={`translate(0 ${-z})`} />
        </clipPath>
        <g clipPath="url(#wclip)">{grid.map((g, i) => <g key={i}>{g}</g>)}</g>
        {[[-9, -9], [9, 9], [-27, 9], [27, -9]].map(([a, b], i) => {
          const [dx, dy] = proj([a, b, z]);
          return <rect key={i} x={dx - 5} y={dy - 3} width={10} height={6} fill="#d9aa3e" opacity={0.9} />;
        })}
      </Disc>
      <ellipse cx={sx + R * 0.52} cy={sy + R * 0.58 - z} rx={5} ry={2.4} fill="#35332f" opacity={0.55} />
    </g>
  );
}

function Network() {
  // a network switch with ports and a fibre cable
  const ports = [];
  for (let i = 0; i < 7; i++) {
    const x = -34 + i * 10.5;
    ports.push(
      <polygon key={i} points={pts([[x, 22, 4], [x + 7, 22, 4], [x + 7, 22, 11], [x, 22, 11]])} fill="#35332f" />,
    );
  }
  const [cx1, cy1] = proj([-3, 22, 7]);
  return (
    <g transform="translate(0 10)">
      <Box x={-42} y={-22} z={0} w={84} d={44} h={16} t={tone("#f6f4ee", "#d9d5c9", "#b9b5a8")} />
      {ports}
      {[-34, -23.5].map((x, i) => {
        const [lx, ly] = proj([x + 3.5, 22, 14]);
        return <circle key={i} cx={lx} cy={ly} r={1.6} fill={i ? "#6fcf97" : "#d9aa3e"} />;
      })}
      <path d={`M${cx1} ${cy1} C${cx1 - 4} ${cy1 + 26} ${cx1 + 34} ${cy1 + 30} ${cx1 + 40} ${cy1 + 6}`} fill="none" stroke="#4aa3e8" strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={cx1} cy={cy1} r={3} fill="#8fc6f2" />
      <path d={`M${cx1 + 40} ${cy1 + 6} l6 -10`} stroke="#8fc6f2" strokeWidth={1.6} strokeLinecap="round" />
      <path d={`M${cx1 + 46} ${cy1 - 4} l5 -4 M${cx1 + 46} ${cy1 - 4} l7 0`} stroke="#8fc6f2" strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

function Capital() {
  // rising bars and a coin stack
  return (
    <g transform="translate(0 10)">
      <Box x={-44} y={-28} z={0} w={88} d={56} h={5} t={tone("#f6f4ee", "#d9d5c9", "#b9b5a8")} />
      <Box x={-8} y={-16} z={5} w={15} d={15} h={22} t={CORAL} />
      <Box x={10} y={-16} z={5} w={15} d={15} h={38} t={CORAL} />
      <Box x={28} y={-16} z={5} w={15} d={15} h={56} t={CORAL} />
      {[0, 1, 2, 3].map((i) => (
        <Disc key={i} cx={-24} cy={10} z={5 + i * 5} r={12} h={4} t={GOLD} />
      ))}
    </g>
  );
}

function Bodies() {
  // a columned institution
  const cols = [];
  for (let i = 0; i < 5; i++) cols.push(<Box key={i} x={-38 + i * 17} y={14} z={6} w={7} d={7} h={34} t={tone("#f6f4ee", "#d9d5c9", "#b9b5a8")} />);
  return (
    <g transform="translate(0 14)">
      <Box x={-44} y={-24} z={0} w={88} d={56} h={6} t={tone("#e9e5d9", "#cfcabd", "#aeaa9d")} />
      <Box x={-36} y={-10} z={6} w={72} d={30} h={4} t={tone("#ece9df", "#d2cec2", "#b0ac9f")} />
      {cols}
      <Box x={-42} y={-12} z={40} w={84} d={44} h={6} t={tone("#f6f4ee", "#d9d5c9", "#b9b5a8")} />
      <polygon points={pts([[-42, 32, 46], [42, 32, 46], [0, 32, 62]])} fill="#b9b5a8" />
      <polygon points={pts([[42, -12, 46], [42, 32, 46], [0, 32, 62], [0, -12, 62]])} fill="#d9d5c9" />
      <polygon points={pts([[-42, -12, 46], [42, -12, 46], [0, -12, 62]])} fill="#e9e5d9" />
    </g>
  );
}

function Media() {
  // a monitor with a rising chart
  const face = (x: number, z: number): P3 => [x, 8, z];
  return (
    <g transform="translate(0 12) scale(0.86)">
      <Box x={-24} y={-8} z={0} w={48} d={22} h={4} t={tone("#e9e5d9", "#cfcabd", "#aeaa9d")} />
      <Box x={-6} y={-2} z={4} w={12} d={8} h={14} t={tone("#e9e5d9", "#cfcabd", "#aeaa9d")} />
      <Box x={-40} y={-6} z={18} w={80} d={14} h={50} t={tone("#4a4742", "#35332f", "#25231f")} />
      <polygon points={pts([face(-36, 22), face(36, 22), face(36, 64), face(-36, 64)])} transform="translate(0 0)" fill="#15130f" />
      <polygon points={pts([[-36, 8, 22], [36, 8, 22], [36, 8, 64], [-36, 8, 64]])} fill="#1b1914" />
      <polyline
        points={pts([[-30, 8, 30], [-16, 8, 38], [-4, 8, 34], [10, 8, 48], [22, 8, 44], [32, 8, 58]])}
        fill="none"
        stroke="#d9aa3e"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[[-30, 30], [-4, 34], [32, 58]].map(([x, zz], i) => {
        const [px, py] = proj([x, 8, zz]);
        return <circle key={i} cx={px} cy={py} r={2.4} fill="#f1cf7a" />;
      })}
    </g>
  );
}

const ILLUS: Record<string, () => ReactNode> = {
  design: Design,
  compute: Compute,
  memory: Memory,
  fab: Fab,
  network: Network,
  capital: Capital,
  bodies: Bodies,
  media: Media,
};

/** An isometric illustration centred on (cx, cy). `scale` 1 ≈ 110 units wide. */
export function Illus({ k, cx, cy, scale = 1 }: { k: string; cx: number; cy: number; scale?: number }) {
  const C = ILLUS[k];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <C />
    </g>
  );
}
