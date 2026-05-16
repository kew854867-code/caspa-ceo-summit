import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'attached_assets');
const OUT  = path.join(__dirname, '..', 'attached_assets', 'generated_images');

const speakers = [
  { file: 'C903BD82-9F70-4B4A-830F-D4CECEF193A4_1778915933700.png', name: 'Lip-Bu Tan',       role: 'CEO, Intel' },
  { file: '6A7EF360-96B9-4CCB-944B-5D261E218AE9_1778915933700.png', name: 'John Martinis',    role: '2025 Nobel Laureate' },
  { file: 'D4E3FEF0-CB1F-4CFC-92C8-FBE2423D3026_1778915933700.png', name: 'Michael Hurlston', role: 'CEO, Lumentum' },
  { file: 'EFCF1D2A-C8D2-4D24-9076-00D406059288_1778915933700.png', name: 'Paul Cho',          role: 'President, Samsung Semi' },
  { file: '407E990F-0E32-4B6C-882F-AD61B64E22A5_1778915933700.png', name: 'David Lam',         role: 'Founder, Lam Research' },
  { file: 'B17E97FA-FCA9-4F06-86B0-FF3AE511025A_1778915933700.png', name: 'Raghib Hussain',    role: 'CEO, Altera' },
  { file: '1C67BD62-6D2E-47E5-A720-F9F977B5B558_1778915933700.png', name: 'Rodrigo Liang',     role: 'CEO, SambaNova' },
  { file: 'AE1B747A-FB29-42E3-B787-F25E78086DCC_1778915933700.png', name: 'Sid Sheth',         role: 'CEO, D-Matrix' },
  { file: '607DBF28-2718-42EE-BA73-59BE82AB69F9_1778915933700.png', name: 'Anna Goldie',       role: 'CEO, Ricursive Intelligence' },
];

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// ── SQUARE POSTER 1080×1080 ──────────────────────────────────────
async function buildSquare() {
  const W = 1080, H = 1080;
  const COLS = 3, ROWS = 3;
  const PAD   = 14;
  const TOP_H = 230;
  const BOT_H = 120;
  const GRID_H = H - TOP_H - BOT_H;
  const cellW = Math.floor((W - PAD * (COLS + 1)) / COLS);
  const cellH = Math.floor((GRID_H - PAD * (ROWS + 1)) / ROWS);

  const headerSvg = `<svg width="${W}" height="${TOP_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#8a6a10"/>
        <stop offset="0.5" stop-color="#f0d060"/>
        <stop offset="1"   stop-color="#8a6a10"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${TOP_H}" fill="#080e28"/>
    <rect x="0" y="0" width="${W}" height="3" fill="url(#g)"/>
    <rect x="60" y="22" width="${W-120}" height="1" fill="#b8962e" opacity="0.3"/>
    <text x="${W/2}" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="58"
          font-weight="bold" letter-spacing="16" fill="#f0d060">CASPA</text>
    <text x="${W/2}" y="128" text-anchor="middle" font-family="Georgia,serif" font-size="36"
          letter-spacing="12" fill="#ffffff">CEO SUMMIT</text>
    <text x="${W/2}" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-size="13"
          letter-spacing="5" fill="#b8962e">ANNUAL CONFERENCE &amp; DINNER BANQUET</text>
    <rect x="${W/2-100}" y="176" width="200" height="1" fill="url(#g)" opacity="0.5"/>
    <text x="${W/2}" y="202" text-anchor="middle" font-family="Arial,sans-serif" font-size="13"
          letter-spacing="3" fill="#a0a0c0">OCTOBER 24, 2026  ·  SANTA CLARA CONVENTION CENTER</text>
    <rect x="0" y="${TOP_H-1}" width="${W}" height="1" fill="#b8962e" opacity="0.25"/>
  </svg>`;

  const footerSvg = `<svg width="${W}" height="${BOT_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#8a6a10"/>
        <stop offset="0.5" stop-color="#f0d060"/>
        <stop offset="1"   stop-color="#8a6a10"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${BOT_H}" fill="#080e28"/>
    <rect x="0" y="0" width="${W}" height="1" fill="#b8962e" opacity="0.25"/>
    <text x="${W/2}" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="14"
          letter-spacing="5" fill="#f0d060">FEATURING 9 INDUSTRY LEADERS</text>
    <text x="${W/2}" y="72" text-anchor="middle" font-family="Arial,sans-serif" font-size="12"
          letter-spacing="3" fill="#7070a0">caspa.com  ·  office@caspa.com</text>
    <rect x="0" y="${BOT_H-3}" width="${W}" height="3" fill="url(#g)"/>
  </svg>`;

  function labelSvg(name, role, w, h) {
    return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stop-color="#080e28" stop-opacity="0"/>
          <stop offset="0.55" stop-color="#080e28" stop-opacity="0.72"/>
          <stop offset="1"   stop-color="#080e28" stop-opacity="0.96"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#ov)"/>
      <rect x="0" y="${h-2}" width="${w}" height="2" fill="#b8962e" opacity="0.9"/>
      <text x="${w/2}" y="${h-34}" text-anchor="middle" font-family="Georgia,serif"
            font-size="14" font-weight="bold" fill="#ffffff">${esc(name)}</text>
      <text x="${w/2}" y="${h-14}" text-anchor="middle" font-family="Arial,sans-serif"
            font-size="10" letter-spacing="1" fill="#d4af37">${esc(role)}</text>
    </svg>`;
  }

  const photos = await Promise.all(speakers.map(async (sp, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = PAD + col * (cellW + PAD);
    const y = TOP_H + PAD + row * (cellH + PAD);

    const resized = await sharp(path.join(BASE, sp.file))
      .resize(cellW, cellH, { fit: 'cover', position: 'top' })
      .png().toBuffer();

    const label = Buffer.from(labelSvg(sp.name, sp.role, cellW, cellH));
    const withLabel = await sharp(resized)
      .composite([{ input: label, blend: 'over' }])
      .png().toBuffer();

    return { input: withLabel, left: x, top: y };
  }));

  await sharp({
    create: { width: W, height: H, channels: 4,
              background: { r: 8, g: 14, b: 40, alpha: 1 } }
  })
  .composite([
    { input: Buffer.from(headerSvg), left: 0, top: 0 },
    ...photos,
    { input: Buffer.from(footerSvg), left: 0, top: H - BOT_H },
  ])
  .png()
  .toFile(path.join(OUT, 'caspa_speakers_poster_square.png'));

  console.log('Square poster done.');
}

// ── STORY POSTER 1080×1920 ───────────────────────────────────────
async function buildStory() {
  const W = 1080, H = 1920;
  const COLS = 3, ROWS = 3;
  const PAD   = 14;
  const TOP_H = 320;
  const BOT_H = 140;
  const GRID_H = H - TOP_H - BOT_H;
  const cellW = Math.floor((W - PAD * (COLS + 1)) / COLS);
  const cellH = Math.floor((GRID_H - PAD * (ROWS + 1)) / ROWS);

  const headerSvg = `<svg width="${W}" height="${TOP_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#8a6a10"/>
        <stop offset="0.5" stop-color="#f0d060"/>
        <stop offset="1"   stop-color="#8a6a10"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${TOP_H}" fill="#080e28"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#g)"/>
    <rect x="80" y="30" width="${W-160}" height="1" fill="#b8962e" opacity="0.3"/>
    <text x="${W/2}" y="112" text-anchor="middle" font-family="Georgia,serif" font-size="80"
          font-weight="bold" letter-spacing="20" fill="#f0d060">CASPA</text>
    <text x="${W/2}" y="182" text-anchor="middle" font-family="Georgia,serif" font-size="52"
          letter-spacing="16" fill="#ffffff">CEO SUMMIT</text>
    <text x="${W/2}" y="224" text-anchor="middle" font-family="Arial,sans-serif" font-size="18"
          letter-spacing="6" fill="#b8962e">ANNUAL CONFERENCE &amp; DINNER BANQUET</text>
    <rect x="${W/2-130}" y="244" width="260" height="1" fill="url(#g)" opacity="0.6"/>
    <text x="${W/2}" y="278" text-anchor="middle" font-family="Arial,sans-serif" font-size="18"
          letter-spacing="4" fill="#a0a0c0">OCTOBER 24, 2026</text>
    <text x="${W/2}" y="306" text-anchor="middle" font-family="Arial,sans-serif" font-size="15"
          letter-spacing="3" fill="#7070a0">SANTA CLARA CONVENTION CENTER</text>
    <rect x="0" y="${TOP_H-1}" width="${W}" height="1" fill="#b8962e" opacity="0.25"/>
  </svg>`;

  const footerSvg = `<svg width="${W}" height="${BOT_H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#8a6a10"/>
        <stop offset="0.5" stop-color="#f0d060"/>
        <stop offset="1"   stop-color="#8a6a10"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${BOT_H}" fill="#080e28"/>
    <rect x="0" y="0" width="${W}" height="1" fill="#b8962e" opacity="0.25"/>
    <text x="${W/2}" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="20"
          letter-spacing="6" fill="#f0d060">FEATURING 9 INDUSTRY LEADERS</text>
    <text x="${W/2}" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="16"
          letter-spacing="3" fill="#7070a0">caspa.com  ·  office@caspa.com</text>
    <rect x="0" y="${BOT_H-4}" width="${W}" height="4" fill="url(#g)"/>
  </svg>`;

  function labelSvg(name, role, w, h) {
    return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ov" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"   stop-color="#080e28" stop-opacity="0"/>
          <stop offset="0.55" stop-color="#080e28" stop-opacity="0.72"/>
          <stop offset="1"   stop-color="#080e28" stop-opacity="0.96"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#ov)"/>
      <rect x="0" y="${h-2}" width="${w}" height="2" fill="#b8962e" opacity="0.9"/>
      <text x="${w/2}" y="${h-38}" text-anchor="middle" font-family="Georgia,serif"
            font-size="18" font-weight="bold" fill="#ffffff">${esc(name)}</text>
      <text x="${w/2}" y="${h-16}" text-anchor="middle" font-family="Arial,sans-serif"
            font-size="13" letter-spacing="1" fill="#d4af37">${esc(role)}</text>
    </svg>`;
  }

  const photos = await Promise.all(speakers.map(async (sp, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = PAD + col * (cellW + PAD);
    const y = TOP_H + PAD + row * (cellH + PAD);

    const resized = await sharp(path.join(BASE, sp.file))
      .resize(cellW, cellH, { fit: 'cover', position: 'top' })
      .png().toBuffer();

    const label = Buffer.from(labelSvg(sp.name, sp.role, cellW, cellH));
    const withLabel = await sharp(resized)
      .composite([{ input: label, blend: 'over' }])
      .png().toBuffer();

    return { input: withLabel, left: x, top: y };
  }));

  await sharp({
    create: { width: W, height: H, channels: 4,
              background: { r: 8, g: 14, b: 40, alpha: 1 } }
  })
  .composite([
    { input: Buffer.from(headerSvg), left: 0, top: 0 },
    ...photos,
    { input: Buffer.from(footerSvg), left: 0, top: H - BOT_H },
  ])
  .png()
  .toFile(path.join(OUT, 'caspa_speakers_poster_story.png'));

  console.log('Story poster done.');
}

await buildSquare();
await buildStory();
console.log('All posters generated!');
