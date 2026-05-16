import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, '..', 'attached_assets');
const OUT    = path.join(__dirname, '..', 'attached_assets', 'generated_images');
const LOGO   = path.join(ASSETS, 'IMG_4516_1778944440132.png');

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// Resize logo to a given width, returns buffer
async function logoBuffer(w) {
  return sharp(LOGO).resize(w, null, { fit: 'inside' }).png().toBuffer();
}

// ── TEMPLATE 1 · CLASSIC GOLD (navy + centered layout) ──────────
async function template1(W, H, outFile) {
  const cx = W / 2;
  const logoW = Math.round(W * 0.52);
  const logo  = await logoBuffer(logoW);
  const { width: lw, height: lh } = await sharp(logo).metadata();
  // Logo centred at 22% height
  const logoTop  = Math.round(H * 0.10);
  const logoLeft = Math.round(cx - lw / 2);

  // thin horizontal rule positions
  const rule1Y = Math.round(H * 0.26);
  const rule2Y = Math.round(H * 0.76);

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0"   stop-color="#06112e"/>
        <stop offset="1"   stop-color="#0d1e4a"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#7a5810" stop-opacity="0"/>
        <stop offset="0.2" stop-color="#c8922a"/>
        <stop offset="0.5" stop-color="#f5da6e"/>
        <stop offset="0.8" stop-color="#c8922a"/>
        <stop offset="1"   stop-color="#7a5810" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="goldV" x1="0" y1="0" x2="0" y2="${H}" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#c8922a"/>
        <stop offset="0.5" stop-color="#f5da6e"/>
        <stop offset="1"   stop-color="#c8922a"/>
      </linearGradient>
    </defs>

    <!-- background -->
    <rect width="${W}" height="${H}" fill="url(#bg)"/>

    <!-- radial glow centre -->
    <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0"   stop-color="#1a3a80" stop-opacity="0.4"/>
      <stop offset="1"   stop-color="#06112e" stop-opacity="0"/>
    </radialGradient>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>

    <!-- outer border lines -->
    <rect x="16" y="16" width="${W-32}" height="${H-32}"
          fill="none" stroke="#c8922a" stroke-width="1" opacity="0.35"/>
    <rect x="26" y="26" width="${W-52}" height="${H-52}"
          fill="none" stroke="#c8922a" stroke-width="0.5" opacity="0.2"/>

    <!-- corner ornaments TL -->
    <polyline points="16,60 16,16 60,16" fill="none" stroke="#f5da6e" stroke-width="2.5"/>
    <!-- corner ornaments TR -->
    <polyline points="${W-60},16 ${W-16},16 ${W-16},60" fill="none" stroke="#f5da6e" stroke-width="2.5"/>
    <!-- corner ornaments BL -->
    <polyline points="16,${H-60} 16,${H-16} 60,${H-16}" fill="none" stroke="#f5da6e" stroke-width="2.5"/>
    <!-- corner ornaments BR -->
    <polyline points="${W-60},${H-16} ${W-16},${H-16} ${W-16},${H-60}" fill="none" stroke="#f5da6e" stroke-width="2.5"/>

    <!-- horizontal rules -->
    <rect x="${cx-200}" y="${rule1Y}" width="400" height="1" fill="url(#gold)"/>
    <rect x="${cx-200}" y="${rule2Y}" width="400" height="1" fill="url(#gold)"/>

    <!-- headline block -->
    <text x="${cx}" y="${Math.round(H*0.38)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.072)}"
          font-weight="bold" letter-spacing="${Math.round(W*0.012)}" fill="#f5da6e">CEO SUMMIT</text>

    <text x="${cx}" y="${Math.round(H*0.47)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.022)}"
          letter-spacing="${Math.round(W*0.008)}" fill="#ffffff" opacity="0.85">2026 ANNUAL CONFERENCE &amp; DINNER BANQUET</text>

    <!-- divider dot row -->
    <text x="${cx}" y="${Math.round(H*0.525)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.015)}"
          letter-spacing="${Math.round(W*0.012)}" fill="#c8922a" opacity="0.7">· · · · · · · · · · · · ·</text>

    <!-- date & venue block -->
    <text x="${cx}" y="${Math.round(H*0.60)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.038)}"
          letter-spacing="${Math.round(W*0.004)}" fill="#ffffff">October 24, 2026</text>

    <text x="${cx}" y="${Math.round(H*0.655)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.020)}"
          letter-spacing="3" fill="#a0aac8">Santa Clara Convention Center</text>

    <!-- tagline -->
    <text x="${cx}" y="${Math.round(H*0.82)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.026)}" font-style="italic"
          fill="#c8922a">"Where Semiconductor Leaders Meet"</text>

    <!-- website -->
    <text x="${cx}" y="${Math.round(H*0.895)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.017)}"
          letter-spacing="3" fill="#606890">caspa.com  ·  office@caspa.com</text>

    <!-- top/bottom gold bars -->
    <rect x="0" y="0"       width="${W}" height="4" fill="url(#gold)"/>
    <rect x="0" y="${H-4}"  width="${W}" height="4" fill="url(#gold)"/>
  </svg>`;

  await sharp({ create: { width: W, height: H, channels: 4,
                           background: { r:6,g:17,b:46,alpha:1 } } })
    .composite([
      { input: Buffer.from(svg), left: 0, top: 0 },
      { input: logo, left: logoLeft, top: logoTop },
    ])
    .png()
    .toFile(outFile);
}

// ── TEMPLATE 2 · GEOMETRIC DARK (diagonal accent + bold type) ───
async function template2(W, H, outFile) {
  const cx = W / 2;
  const logoW = Math.round(W * 0.44);
  const logo  = await logoBuffer(logoW);
  const { width: lw, height: lh } = await sharp(logo).metadata();
  const logoTop  = Math.round(H * 0.065);
  const logoLeft = Math.round(cx - lw / 2);

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#040c22"/>
        <stop offset="1" stop-color="#0a1838"/>
      </linearGradient>
      <linearGradient id="strip" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0"   stop-color="#7a5010" stop-opacity="0"/>
        <stop offset="0.3" stop-color="#d4962a"/>
        <stop offset="0.7" stop-color="#f0c84a"/>
        <stop offset="1"   stop-color="#7a5010" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- base bg -->
    <rect width="${W}" height="${H}" fill="url(#bg)"/>

    <!-- diagonal gold band -->
    <polygon points="0,${H*0.28} ${W},${H*0.18} ${W},${H*0.22} 0,${H*0.32}"
             fill="url(#strip)" opacity="0.55"/>
    <polygon points="0,${H*0.30} ${W},${H*0.20} ${W},${H*0.205} 0,${H*0.305}"
             fill="#f0c84a" opacity="0.08"/>

    <!-- left gold vertical accent -->
    <rect x="48" y="${H*0.08}" width="3" height="${H*0.84}" fill="#c8922a" opacity="0.4"/>
    <rect x="54" y="${H*0.08}" width="1" height="${H*0.84}" fill="#c8922a" opacity="0.18"/>

    <!-- right gold vertical accent -->
    <rect x="${W-51}" y="${H*0.08}" width="3" height="${H*0.84}" fill="#c8922a" opacity="0.4"/>
    <rect x="${W-55}" y="${H*0.08}" width="1" height="${H*0.84}" fill="#c8922a" opacity="0.18"/>

    <!-- top label chip -->
    <rect x="${cx-130}" y="${Math.round(H*0.255)}" width="260" height="${Math.round(H*0.052)}"
          fill="#c8922a" opacity="0.12" rx="2"/>
    <rect x="${cx-130}" y="${Math.round(H*0.255)}" width="260" height="${Math.round(H*0.052)}"
          fill="none" stroke="#c8922a" stroke-width="0.8" opacity="0.5" rx="2"/>
    <text x="${cx}" y="${Math.round(H*0.292)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.019)}"
          letter-spacing="5" fill="#f0c84a">SAVE THE DATE</text>

    <!-- main title -->
    <text x="${cx}" y="${Math.round(H*0.41)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.082)}"
          font-weight="bold" fill="#ffffff" letter-spacing="${Math.round(W*0.005)}">CEO</text>
    <text x="${cx}" y="${Math.round(H*0.498)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.082)}"
          font-weight="bold" fill="#f0c84a" letter-spacing="${Math.round(W*0.005)}">SUMMIT</text>

    <!-- subtitle -->
    <text x="${cx}" y="${Math.round(H*0.565)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.019)}"
          letter-spacing="5" fill="#8898c8">2026 ANNUAL CONFERENCE &amp; DINNER BANQUET</text>

    <!-- horizontal rule -->
    <line x1="${cx-180}" y1="${Math.round(H*0.605)}" x2="${cx+180}" y2="${Math.round(H*0.605)}"
          stroke="#c8922a" stroke-width="1" opacity="0.5"/>
    <!-- small diamond centre -->
    <polygon points="${cx},${Math.round(H*0.598)} ${cx+6},${Math.round(H*0.605)} ${cx},${Math.round(H*0.612)} ${cx-6},${Math.round(H*0.605)}"
             fill="#f0c84a"/>

    <!-- date -->
    <text x="${cx}" y="${Math.round(H*0.672)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.042)}"
          fill="#ffffff" letter-spacing="2">October 24, 2026</text>

    <!-- venue -->
    <text x="${cx}" y="${Math.round(H*0.728)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.021)}"
          letter-spacing="3" fill="#a0aac8">Santa Clara Convention Center</text>

    <!-- bottom tagline -->
    <text x="${cx}" y="${Math.round(H*0.835)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.024)}" font-style="italic"
          fill="#c8922a">Industry · Innovation · Impact</text>

    <!-- contact -->
    <text x="${cx}" y="${Math.round(H*0.912)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.016)}"
          letter-spacing="3" fill="#505878">caspa.com  ·  office@caspa.com</text>

    <!-- corner diamonds -->
    <polygon points="16,8 24,16 16,24 8,16" fill="#f0c84a" opacity="0.7"/>
    <polygon points="${W-16},8 ${W-8},16 ${W-16},24 ${W-24},16" fill="#f0c84a" opacity="0.7"/>
    <polygon points="16,${H-8} 24,${H-16} 16,${H-24} 8,${H-16}" fill="#f0c84a" opacity="0.7"/>
    <polygon points="${W-16},${H-8} ${W-8},${H-16} ${W-16},${H-24} ${W-24},${H-16}" fill="#f0c84a" opacity="0.7"/>
  </svg>`;

  await sharp({ create: { width: W, height: H, channels: 4,
                           background: { r:4,g:12,b:34,alpha:1 } } })
    .composite([
      { input: Buffer.from(svg), left: 0, top: 0 },
      { input: logo, left: logoLeft, top: logoTop },
    ])
    .png()
    .toFile(outFile);
}

// ── TEMPLATE 3 · MINIMAL ELEGANT (white on navy, accent lines) ──
async function template3(W, H, outFile) {
  const cx = W / 2;
  const logoW = Math.round(W * 0.40);
  const logo  = await logoBuffer(logoW);
  const { width: lw, height: lh } = await sharp(logo).metadata();
  const logoTop  = Math.round(H * 0.075);
  const logoLeft = Math.round(cx - lw / 2);

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#08122c"/>
        <stop offset="1" stop-color="#050c1e"/>
      </linearGradient>
      <linearGradient id="goldH" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0"   stop-color="#7a5810" stop-opacity="0"/>
        <stop offset="0.25" stop-color="#d4a830"/>
        <stop offset="0.75" stop-color="#d4a830"/>
        <stop offset="1"   stop-color="#7a5810" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- base -->
    <rect width="${W}" height="${H}" fill="url(#bg)"/>

    <!-- subtle dot grid pattern -->
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="#d4a830" opacity="0.07"/>
    </pattern>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>

    <!-- left full-height gold bar pair -->
    <rect x="36" y="0" width="2" height="${H}" fill="#d4a830" opacity="0.5"/>
    <rect x="40" y="0" width="1" height="${H}" fill="#d4a830" opacity="0.15"/>

    <!-- right full-height gold bar pair -->
    <rect x="${W-38}" y="0" width="2" height="${H}" fill="#d4a830" opacity="0.5"/>
    <rect x="${W-41}" y="0" width="1" height="${H}" fill="#d4a830" opacity="0.15"/>

    <!-- top bar -->
    <rect x="0" y="0" width="${W}" height="6" fill="#d4a830" opacity="0.85"/>
    <!-- bottom bar -->
    <rect x="0" y="${H-6}" width="${W}" height="6" fill="#d4a830" opacity="0.85"/>

    <!-- rule under logo area -->
    <rect x="60" y="${Math.round(H*0.255)}" width="${W-120}" height="1" fill="url(#goldH)"/>

    <!-- YEAR badge -->
    <text x="${cx}" y="${Math.round(H*0.33)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.016)}"
          letter-spacing="10" fill="#d4a830">2 0 2 6</text>

    <!-- big event type -->
    <text x="${cx}" y="${Math.round(H*0.42)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.065)}"
          font-weight="bold" letter-spacing="${Math.round(W*0.008)}" fill="#ffffff">CEO SUMMIT</text>

    <!-- rule under headline -->
    <rect x="60" y="${Math.round(H*0.445)}" width="${W-120}" height="1" fill="url(#goldH)" opacity="0.6"/>

    <!-- subtitle -->
    <text x="${cx}" y="${Math.round(H*0.504)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.018)}"
          letter-spacing="6" fill="#8898c0">ANNUAL CONFERENCE &amp; DINNER BANQUET</text>

    <!-- large date typography -->
    <text x="${cx}" y="${Math.round(H*0.613)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.050)}"
          fill="#ffffff" letter-spacing="1">October 24, 2026</text>

    <!-- venue -->
    <text x="${cx}" y="${Math.round(H*0.668)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.020)}"
          letter-spacing="3" fill="#6878a8">Santa Clara Convention Center</text>

    <!-- three feature pillars -->
    <line x1="${cx-180}" y1="${Math.round(H*0.73)}" x2="${cx+180}" y2="${Math.round(H*0.73)}"
          stroke="#d4a830" stroke-width="0.5" opacity="0.4"/>
    <text x="${cx - 160}" y="${Math.round(H*0.775)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.015)}"
          letter-spacing="3" fill="#d4a830">9 SPEAKERS</text>
    <text x="${cx}" y="${Math.round(H*0.775)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.015)}"
          letter-spacing="3" fill="#d4a830">VIP DINNER</text>
    <text x="${cx + 160}" y="${Math.round(H*0.775)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.015)}"
          letter-spacing="3" fill="#d4a830">NETWORKING</text>
    <line x1="${cx-180}" y1="${Math.round(H*0.795)}" x2="${cx+180}" y2="${Math.round(H*0.795)}"
          stroke="#d4a830" stroke-width="0.5" opacity="0.4"/>

    <!-- tagline italic -->
    <text x="${cx}" y="${Math.round(H*0.87)}" text-anchor="middle"
          font-family="Georgia,serif" font-size="${Math.round(W*0.025)}" font-style="italic"
          fill="#d4a830">Where Semiconductor Leaders Meet</text>

    <!-- website -->
    <text x="${cx}" y="${Math.round(H*0.924)}" text-anchor="middle"
          font-family="Arial,sans-serif" font-size="${Math.round(W*0.016)}"
          letter-spacing="3" fill="#404868">caspa.com  ·  office@caspa.com</text>
  </svg>`;

  await sharp({ create: { width: W, height: H, channels: 4,
                           background: { r:8,g:18,b:44,alpha:1 } } })
    .composite([
      { input: Buffer.from(svg), left: 0, top: 0 },
      { input: logo, left: logoLeft, top: logoTop },
    ])
    .png()
    .toFile(outFile);
}

// Generate all 6 files (3 templates × square + story)
await Promise.all([
  template1(1080, 1080, `${OUT}/poster_t1_square.png`),
  template1(1080, 1920, `${OUT}/poster_t1_story.png`),
  template2(1080, 1080, `${OUT}/poster_t2_square.png`),
  template2(1080, 1920, `${OUT}/poster_t2_story.png`),
  template3(1080, 1080, `${OUT}/poster_t3_square.png`),
  template3(1080, 1920, `${OUT}/poster_t3_story.png`),
]);

console.log('All 6 posters generated!');
