#!/usr/bin/env python3
"""Build the white, mobile-first HTML article from chip-world-map-article.md.

Usage: python3 build_article.py <out.html>
All figure numbers are copied from the sources cited next to them (numbers in
superscripts refer to the reference list at the end of the article).
"""
import base64, html, json, re, sys
from pathlib import Path
import markdown

ROOT = Path(__file__).resolve().parent.parent
MD = (ROOT / "chip-world-map-article.md").read_text(encoding="utf-8")
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "chip-world-map-article.html"
LOGO_DIR = ROOT / "assets" / "logos"

TICKET_URL = ("https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-"
              "the-ceo-summit-tickets-1994631439329?discount=CC15OFF")

INK, MUTE, LINE, SOFT = "#16191F", "#8A92A3", "#D5D9E2", "#F2F4F8"
C_US, C_EA, C_EU, C_CN = "#2F6FDF", "#D99A00", "#14A38B", "#E4572E"


def cite(*ns):
    return "".join(f'<sup class="cite"><a href="#ref-{n}">{n}</a></sup>' for n in ns)


# ------------------------------------------------------------------ logos
# name -> (kind, file). kind "png" = Wikimedia Commons raster (public-domain text logo),
# kind "si" = Simple Icons monochrome svg.  Missing logos fall back to a text chip.
LOGOS = {
    "贝尔实验室": ("png", "bell.png"), "德州仪器": ("png", "ti.png"), "仙童": ("png", "fairchild.png"),
    "英特尔": ("si", "intel"), "英伟达": ("si", "nvidia"), "Arm": ("si", "arm"), "三星": ("si", "samsung"),
    "日立": ("si", "hitachi"), "西门子 EDA": ("si", "siemens"), "高通": ("si", "qualcomm"), "AMD": ("si", "amd"),
    "日本电气": ("png", "nec.png"), "铠侠": ("png", "kioxia.png"), "东京电子": ("png", "tel.png"),
    "台积电": ("png", "tsmc.png"), "SK 海力士": ("png", "skhynix.png"), "美光": ("png", "micron.png"),
    "ASML": ("png", "asml.png"), "应用材料": ("png", "amat.png"), "泛林集团": ("png", "lam.png"),
    "KLA": ("png", "kla.png"), "中芯国际": ("png", "smic.png"), "华虹": ("png", "hh.png"),
    "新思科技": ("png", "synopsys.png"), "铿腾电子": ("png", "cadence.png"), "鸿海": ("png", "foxconn.png"),
    "纬创": ("png", "wistron.png"), "Fabrinet": ("png", "fabrinet.png"),
}
_logo_cache = {}


def logo_uri(name):
    if name in _logo_cache:
        return _logo_cache[name]
    uri = None
    if name in LOGOS:
        kind, f = LOGOS[name]
        fn = f if kind == "png" else f"si_{f}.png"
        fp = LOGO_DIR / "trim" / fn
        if fp.exists():
            uri = "data:image/png;base64," + base64.b64encode(fp.read_bytes()).decode()
    _logo_cache[name] = uri
    return uri


def logos(names):
    out = []
    for n in names:
        u = logo_uri(n)
        if u:
            out.append(f'<span class="lg" title="{n}"><img src="{u}" alt="{n}"></span>')
        else:
            out.append(f'<span class="lg tx">{n}</span>')
    return '<div class="logos">' + "".join(out) + "</div>"


# ----------------------------------------------------------------- artwork
# Original flat illustrations (240x150). They are schematic drawings, not photographs.
def _tint(c, a):
    return f"color-mix(in srgb,{c} {int(a*100)}%,#fff)"


def art_design(c, u="d"):
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="芯片设计示意图"><rect x="40" y="12" width="160" height="98" rx="9" fill="#fff" stroke="{INK}" stroke-width="2"/>
<rect x="48" y="20" width="144" height="82" rx="5" fill="{_tint(c,.09)}"/><rect x="62" y="30" width="116" height="62" rx="3" fill="none" stroke="{c}" stroke-width="1.6"/>
<rect x="70" y="38" width="42" height="26" rx="2" fill="{c}" opacity=".9"/><rect x="118" y="38" width="52" height="15" rx="2" fill="{c}" opacity=".5"/>
<rect x="118" y="58" width="24" height="26" rx="2" fill="{c}" opacity=".35"/><rect x="146" y="58" width="24" height="26" rx="2" fill="{c}" opacity=".7"/><rect x="70" y="70" width="42" height="14" rx="2" fill="{c}" opacity=".3"/>
<path d="M62 52H70M112 46H118M142 71H146M90 64V70M130 53V58" stroke="{INK}" stroke-width="1.2"/>
<rect x="108" y="110" width="24" height="10" fill="{LINE}"/><rect x="88" y="120" width="64" height="7" rx="3.5" fill="{INK}"/>
<path d="M206 118l16-30 6 3-16 30-9 3z" fill="{c}"/><path d="M219 91l6 3" stroke="{INK}" stroke-width="2"/></svg>'''


def art_eda(c, u="e"):
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="设计工具与标准件示意图"><rect x="14" y="16" width="130" height="102" rx="9" fill="#fff" stroke="{INK}" stroke-width="2"/>
<path d="M14 36H144" stroke="{INK}" stroke-width="2"/><circle cx="27" cy="26" r="3.2" fill="{c}"/><circle cx="38" cy="26" r="3.2" fill="{LINE}"/><circle cx="49" cy="26" r="3.2" fill="{LINE}"/>
<rect x="26" y="46" width="62" height="7" rx="3.5" fill="{c}" opacity=".85"/><rect x="36" y="58" width="82" height="7" rx="3.5" fill="{LINE}"/><rect x="36" y="70" width="52" height="7" rx="3.5" fill="{LINE}"/>
<rect x="26" y="82" width="74" height="7" rx="3.5" fill="{c}" opacity=".45"/><rect x="36" y="94" width="92" height="7" rx="3.5" fill="{LINE}"/>
<g><rect x="158" y="86" width="68" height="26" rx="6" fill="{c}"/><circle cx="192" cy="86" r="5" fill="{c}"/>
<rect x="158" y="56" width="68" height="26" rx="6" fill="{c}" opacity=".7"/><circle cx="178" cy="56" r="5" fill="{c}" opacity=".7"/>
<rect x="158" y="26" width="68" height="26" rx="6" fill="{c}" opacity=".4"/><circle cx="204" cy="26" r="5" fill="{c}" opacity=".4"/>
<path d="M170 99h44M170 69h44M170 39h44" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></g>
<path d="M144 70H156" stroke="{INK}" stroke-width="2" stroke-dasharray="3 3"/></svg>'''


def art_wafer(c, u="w"):
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="晶圆示意图"><defs>
<radialGradient id="g{u}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#C9CFDB"/></radialGradient>
<pattern id="p{u}" width="13" height="9.5" patternUnits="userSpaceOnUse"><rect x=".7" y=".7" width="11.6" height="8.1" rx="1" fill="{c}" opacity=".32"/></pattern>
<clipPath id="k{u}"><circle cx="120" cy="76" r="56"/></clipPath></defs>
<ellipse cx="120" cy="140" rx="64" ry="6" fill="{LINE}" opacity=".7"/>
<circle cx="128" cy="70" r="56" fill="{_tint(c,.12)}" stroke="{LINE}" stroke-width="2"/>
<circle cx="120" cy="76" r="56" fill="url(#g{u})" stroke="{INK}" stroke-width="2"/>
<g clip-path="url(#k{u})"><rect x="60" y="20" width="120" height="116" fill="url(#p{u})"/><path d="M70 30Q110 10 160 36" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/></g>
<circle cx="120" cy="131" r="5" fill="#fff" stroke="{INK}" stroke-width="2"/></svg>'''


def art_litho(c, u="l"):
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="EUV 光刻原理示意图"><rect x="8" y="34" width="34" height="40" rx="5" fill="{INK}"/>
<path d="M42 46L110 60M42 64L110 60" stroke="{c}" stroke-width="3" stroke-linecap="round" opacity=".85"/>
<g fill="{INK}"><circle cx="118" cy="10" r="3.4"/><circle cx="118" cy="24" r="3.4"/><circle cx="118" cy="38" r="3.4"/></g><ellipse cx="118" cy="50" rx="9" ry="3" fill="{INK}" opacity=".55"/>
<polygon points="118,52 122,59 130,60 124,66 126,74 118,70 110,74 112,66 106,60 114,59" fill="{c}"/>
<path d="M58 52Q118 132 178 52" fill="none" stroke="{INK}" stroke-width="4.5" stroke-linecap="round"/>
<path d="M118 70L90 98M118 70L146 98" stroke="{c}" stroke-width="1.8" stroke-dasharray="3 3"/>
<path d="M176 58L206 100" stroke="{c}" stroke-width="3" stroke-linecap="round"/><polygon points="208,104 198,98 207,92" fill="{c}"/>
<ellipse cx="208" cy="122" rx="24" ry="4.5" fill="{c}"/><rect x="180" y="125" width="56" height="7" rx="3.5" fill="{INK}"/>
<text x="150" y="22" font-size="12" font-weight="700" fill="{c}" font-family="Arial,sans-serif">13.5 nm</text></svg>'''


def art_package(c, u="p", label="AI"):
    blocks = ""
    for x, y in ((56, 40), (56, 82), (162, 40), (162, 82)):
        blocks += f'<rect x="{x}" y="{y}" width="24" height="32" rx="2" fill="{_tint(c,.35)}" stroke="{INK}" stroke-width="1.2"/>'
        blocks += "".join(f'<path d="M{x+3} {y+6+i*6}H{x+21}" stroke="{INK}" stroke-width="1"/>' for i in range(5))
    dots = "".join(f'<circle cx="{x}" cy="{y}" r="1.7" fill="{MUTE}"/>' for x in range(44, 200, 11) for y in (24, 126)) + \
           "".join(f'<circle cx="{x}" cy="{y}" r="1.7" fill="{MUTE}"/>' for x in (44, 196) for y in range(35, 120, 11))
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="AI 芯片封装示意图（俯视）"><rect x="30" y="12" width="180" height="126" rx="11" fill="{SOFT}" stroke="{INK}" stroke-width="2"/>{dots}
<path d="M80 56H92M80 98H92M148 56H160M148 98H160" stroke="{c}" stroke-width="2"/><rect x="92" y="42" width="56" height="64" rx="5" fill="{c}"/>
<text x="120" y="82" font-size="17" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">{label}</text>{blocks}</svg>'''


def art_hbm(c, u="h"):
    layers = "".join(f'<rect x="70" y="{24+i*15}" width="100" height="11" rx="2.5" fill="{c}" opacity="{0.95-i*0.1:.2f}"/>' for i in range(6))
    tsv = "".join(f'<path d="M{x} 22V114" stroke="{INK}" stroke-width="1.6" stroke-dasharray="2 3"/><circle cx="{x}" cy="116" r="2.4" fill="{INK}"/>' for x in (86, 108, 130, 152))
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="HBM 存储堆叠示意图">{layers}{tsv}
<rect x="58" y="114" width="124" height="14" rx="3" fill="{INK}"/><rect x="40" y="128" width="160" height="7" rx="3.5" fill="{LINE}"/>
<path d="M190 30l22-8M190 54l22-8" stroke="{c}" stroke-width="2"/><text x="196" y="80" font-size="12" font-weight="700" fill="{c}" font-family="Arial,sans-serif">HBM</text></svg>'''


def art_rack(c, u="r"):
    out = ""
    for i in range(3):
        x = 22 + i * 72
        out += f'<rect x="{x}" y="22" width="58" height="110" rx="7" fill="#fff" stroke="{INK}" stroke-width="2"/>'
        for j in range(7):
            y = 30 + j * 14
            out += f'<rect x="{x+6}" y="{y}" width="46" height="10" rx="2.5" fill="{SOFT}"/><circle cx="{x+45}" cy="{y+5}" r="2.2" fill="{c if (i+j)%3 else "#14A38B"}"/>'
    out += f'<path d="M51 22Q87 -4 123 22M123 22Q159 -4 195 22" stroke="{c}" stroke-width="2.5" fill="none"/><rect x="8" y="132" width="224" height="6" rx="3" fill="{LINE}"/>'
    return f'<svg viewBox="0 0 240 150" role="img" aria-label="数据中心机架示意图">{out}</svg>'


def art_transistor(c, u="t"):
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="晶体管与集成电路示意图"><circle cx="86" cy="72" r="40" fill="{_tint(c,.1)}" stroke="{INK}" stroke-width="2.5"/>
<path d="M60 72H78M78 46V98" stroke="{INK}" stroke-width="3" stroke-linecap="round"/><path d="M78 62L106 40M78 82L106 104" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>
<polygon points="106,104 95,102 101,93" fill="{INK}"/><path d="M106 40V20M106 104V124M60 72H40" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>
<rect x="152" y="40" width="64" height="64" rx="6" fill="{c}"/><rect x="162" y="50" width="44" height="44" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
<path d="M170 58h28M170 72h28M170 86h28" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>
<g stroke="{INK}" stroke-width="2.5" stroke-linecap="round"><path d="M160 32v8M176 32v8M192 32v8M208 32v8M160 104v8M176 104v8M192 104v8M208 104v8"/></g></svg>'''


def art_dram(c, u="m"):
    pins = "".join(f'<rect x="56" y="{34+i*12}" width="14" height="6" rx="1.5" fill="{MUTE}"/><rect x="170" y="{34+i*12}" width="14" height="6" rx="1.5" fill="{MUTE}"/>' for i in range(7))
    cells = "".join(f'<rect x="{80+j*13}" y="{50+i*13}" width="10" height="10" rx="1.5" fill="{c}" opacity="{0.9 if (i*3+j)%5==0 else 0.28}"/>' for i in range(5) for j in range(7))
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="存储芯片示意图">{pins}<rect x="68" y="22" width="104" height="100" rx="5" fill="#fff" stroke="{INK}" stroke-width="2.5"/>
<path d="M108 22a12 12 0 0 0 24 0" fill="none" stroke="{INK}" stroke-width="2.5"/>{cells}</svg>'''


def art_split(c, u="s"):
    grid = "".join(f'<path d="M{20} {34+i*14}H{100}" stroke="{c}" stroke-width=".8" opacity=".45"/>' for i in range(6)) + \
           "".join(f'<path d="M{20+i*16} 34V104" stroke="{c}" stroke-width=".8" opacity=".45"/>' for i in range(6))
    return f'''<svg viewBox="0 0 240 150" role="img" aria-label="设计与制造分工示意图"><defs><radialGradient id="g{u}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#C9CFDB"/></radialGradient>
<pattern id="p{u}" width="10" height="7.5" patternUnits="userSpaceOnUse"><rect x=".6" y=".6" width="8.8" height="6.3" rx=".8" fill="{c}" opacity=".35"/></pattern><clipPath id="k{u}"><circle cx="176" cy="74" r="44"/></clipPath></defs>
<rect x="12" y="22" width="98" height="104" rx="9" fill="{_tint(c,.08)}" stroke="{INK}" stroke-width="2"/>{grid}
<rect x="40" y="52" width="42" height="34" rx="3" fill="{c}" opacity=".85"/><path d="M82 62h12M82 76h12M40 62H28M40 76H28" stroke="{INK}" stroke-width="1.6"/>
<circle cx="176" cy="74" r="44" fill="url(#g{u})" stroke="{INK}" stroke-width="2"/><g clip-path="url(#k{u})"><rect x="130" y="30" width="92" height="90" fill="url(#p{u})"/></g><circle cx="176" cy="117" r="4" fill="#fff" stroke="{INK}" stroke-width="1.6"/>
<path d="M112 74H128" stroke="{INK}" stroke-width="2.5"/><polygon points="130,74 122,69 122,79" fill="{INK}"/></svg>'''


def art_fab(c, u="f"):
    car = "".join(f'<path d="M{x+17} 32V40" stroke="{INK}" stroke-width="2"/><rect x="{x}" y="40" width="34" height="26" rx="5" fill="{c}" opacity=".85"/><path d="M{x+6} 50H{x+28}M{x+6} 57H{x+28}" stroke="#fff" stroke-width="2" stroke-linecap="round"/>' for x in (18, 70, 122, 174))
    eq = f'<rect x="14" y="96" width="62" height="38" rx="5" fill="{SOFT}" stroke="{INK}" stroke-width="2"/><rect x="88" y="84" width="54" height="50" rx="5" fill="{SOFT}" stroke="{INK}" stroke-width="2"/><rect x="154" y="100" width="72" height="34" rx="5" fill="{SOFT}" stroke="{INK}" stroke-width="2"/>' + \
         f'<circle cx="45" cy="108" r="8" fill="{c}" opacity=".6"/><circle cx="115" cy="98" r="8" fill="{c}" opacity=".6"/><circle cx="190" cy="112" r="7" fill="{c}" opacity=".6"/>'
    return f'<svg viewBox="0 0 240 150" role="img" aria-label="晶圆厂示意图"><path d="M0 30H240" stroke="{INK}" stroke-width="4"/>{car}{eq}<rect x="0" y="134" width="240" height="6" fill="{LINE}"/></svg>'


def art_converge(c, u="v"):
    cols = [x[7] for x in CHAIN_ROWS]
    import math
    out = f'<circle cx="120" cy="75" r="58" fill="none" stroke="{LINE}" stroke-width="1.5" stroke-dasharray="4 5"/>'
    for i, col in enumerate(cols):
        a = -math.pi / 2 + i * 2 * math.pi / len(cols)
        x, y = 120 + 58 * math.cos(a), 75 + 58 * math.sin(a)
        out += f'<path d="M120 75L{x:.1f} {y:.1f}" stroke="{col}" stroke-width="2" opacity=".6"/><circle cx="{x:.1f}" cy="{y:.1f}" r="10" fill="{col}"/><text x="{x:.1f}" y="{y+4:.1f}" font-size="11" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">{i+1}</text>'
    out += f'<circle cx="120" cy="75" r="19" fill="{INK}"/><circle cx="120" cy="75" r="8" fill="#fff"/>'
    return f'<svg viewBox="0 0 240 150" role="img" aria-label="七个环节汇聚示意图">{out}</svg>'


# --------------------------------------------------------------- charts
def hbars(rows, unit="", maxv=None, hl=None, fmt="{:g}"):
    """rows: [(label, value, color?)]  horizontal bars"""
    m = maxv or max(r[1] for r in rows)
    out = ['<div class="hb">']
    for r in rows:
        lab, v = r[0], r[1]
        col = r[2] if len(r) > 2 else None
        w = max(v / m * 100, 1.2)
        st = f' style="width:{w:.1f}%;{("background:"+col) if col else ""}"'
        out.append(f'<div class="hb-r"><span class="hb-l">{lab}</span><div class="hb-t"><i{st}></i></div><span class="hb-v">{fmt.format(v)}{unit}</span></div>')
    out.append("</div>")
    return "".join(out)


def grouped(groups, unit):
    """groups: [(name, color, [(label, value)])]  -> horizontal bars grouped by company"""
    m = max(v for _, _, bars in groups for _, v in bars)
    out = ['<div class="gb">']
    for name, col, bars in groups:
        out.append(f'<div class="gb-g"><div class="gb-n">{name}</div>')
        for i, (lab, v) in enumerate(bars):
            w = max(v / m * 100, 1.5)
            op = 0.45 + 0.55 * (i + 1) / len(bars)
            out.append(f'<div class="gb-r"><span class="gb-l">{lab}</span><div class="hb-t"><i style="width:{w:.1f}%;background:{col};opacity:{op:.2f}"></i></div><span class="hb-v">{(f"{v:,.0f}" if v>=100 else f"{v:.1f}")}{unit}</span></div>')
        out.append("</div>")
    out.append("</div>")
    return "".join(out)


def chart_title(t):
    return f'<div class="ch-ct">{t}</div>'


# ---- the seven links (shares from published statistics; see reference numbers)
def pie(slices, center="", sub=""):
    """slices: [(label, pct, color)] -> donut (conic-gradient) + legend"""
    acc, stops = 0.0, []
    for _, v, c in slices:
        stops.append(f"{c} {acc:.2f}% {acc+v:.2f}%"); acc += v
    leg = "".join(f'<div class="pl"><i style="background:{c}"></i><span>{l}</span><b>{v:g}%</b></div>' for l, v, c in slices)
    return (f'<div class="pie"><div class="donut" style="background:conic-gradient({",".join(stops)})">'
            f'<div class="dh"><b>{center}</b><span>{sub}</span></div></div><div class="pleg">{leg}</div></div>')


GREY, GREY2 = "#D5DAE3", "#B9C0CD"
CHAIN_ROWS = [
    # name, what, art, companies, chart html, data line, refs, color
    ("设计", "决定芯片做什么、怎么做", art_design, ["英伟达", "高通", "AMD"],
     chart_title("2025 年全球半导体销售额，按公司总部所在地") +
     pie([("美国公司", 53.4, C_US), ("其他国家和地区", 46.6, GREY)], "53.4%", "美国公司"),
     "美国公司 2025 年销售额 4,250 亿美元，占全球 7,956 亿美元的 53.4%，为 1984 年以来最高", (3,), C_US),
    ("设计工具与 IP", "画图纸用的软件，和可以复用的标准件", art_eda, ["新思科技", "铿腾电子", "西门子 EDA", "Arm"],
     "",
     "新思科技、铿腾电子、西门子 EDA 是这一环的三家主要供应商；Arm 靠授权设计、按产出收取版税", (17,), "#7A5AF8"),
    ("制造", "把图纸刻在硅片上", art_wafer, ["台积电", "三星", "中芯国际"],
     chart_title("2026 年二季度全球晶圆代工营收份额") +
     pie([("台积电", 72.5, C_EA), ("三星", 5.9, "#F2C94C"), ("中芯国际", 5.4, C_CN), ("联电", 3.9, "#9FD8CB"), ("格芯", 3.2, "#A9C3F5"), ("其他", 9.1, GREY)], "72.5%", "台积电"),
     "台积电一家，占去全球晶圆代工营收的七成以上；“其他”为 100% 减去前五名", (19,), C_EA),
    ("设备", "造芯片工厂的机器，包括光刻机", art_litho, ["ASML", "应用材料", "泛林集团", "东京电子", "KLA"],
     chart_title("2025 年全球芯片制造设备市场，ASML 的占比") +
     pie([("ASML", 20.2, C_CN), ("应用材料、泛林、东京电子、KLA 及其他", 79.8, GREY)], "约 20%", "ASML"),
     "市场总额 1,362 亿美元，ASML 营收 275 亿美元，相除得约 20.2%；其余四家居第二至第五，未公布各自份额", (11,), C_CN),
    ("封装与测试", "把裸片变成能用的产品，先进封装是 AI 芯片的关键一步", art_package, ["Fabrinet", "鸿海", "纬创"],
     chart_title("2024 年前十大封测厂商合计营收中的占比") +
     pie([("日月光", 44.6, C_EU), ("安靠", 15.2, "#4FBFA8"), ("长电科技", 12.0, "#9FD8CB"), ("通富微电", 8.0, "#C8EBE3"), ("力成", 5.5, "#E1F4F0"), ("其余五家", 14.7, GREY)], "44.6%", "日月光"),
     "占比为各家 2024 年营收除以前十大合计 415.6 亿美元；英伟达用 CoWoS 做封装", (39, 18), C_EU),
    ("存储", "芯片的记忆", art_hbm, ["三星", "SK 海力士", "美光"],
     chart_title("2026 年二季度 DRAM 营收份额") +
     pie([("三星", 38, "#F08A24"), ("SK 海力士", 25, "#F7BE86"), ("美光", 24, "#FBD9B5"), ("其他", 13, GREY)], "38%", "三星") +
     chart_title("2026 年二季度 HBM 营收份额") +
     pie([("SK 海力士", 50, "#F08A24"), ("三星", 33, "#F7BE86"), ("美光", 18, "#FBD9B5")], "50%", "SK 海力士"),
     "AI 加速器必需的 HBM，SK 海力士一家占一半；DRAM“其他”约 13%，其中长鑫存储约 10%", (22,), "#F08A24"),
    ("系统与数据中心", "最终买单的人", art_rack, ["英伟达"],
     '<div class="tiles"><div><b>4,500+</b><span>一个 AI 服务器机架里的封装芯片数量</span></div><div><b>95%+</b><span>芯片占 AI 服务器机架价值的比例</span></div></div>',
     "芯片在 AI 数据中心的总投资里，占到一半以上", (3,), "#5B6B8C"),
]


def fig_chain():
    out = ['<figure class="fig" id="fig-chain"><div class="fig-title">一颗芯片的七个环节</div>'
           '<div class="fig-sub">每个环节长什么样，谁在做，规模有多大</div><ol class="chain">']
    for i, (name, what, art, cos, chart, line, refs, color) in enumerate(CHAIN_ROWS, 1):
        out.append(
            f'<li class="link" style="--c:{color}" id="link-{i}"><div class="link-art">{art(color, f"c{i}")}</div>'
            f'<div class="link-body"><div class="ch-h"><span class="dot">{i}</span><b>{name}</b></div><div class="ch-what">{what}</div>'
            f'{logos(cos)}<div class="ch-chart">{chart}</div><div class="ch-data">{line}{cite(*refs)}</div></div></li>')
    out.append('</ol><figcaption>图 1　七个环节与代表公司。插画为示意图；图表数据为官方或研究机构统计，口径见文末数据说明。</figcaption></figure>')
    return "".join(out)


TIMELINE = [
    ("1947–1959", "美国", "us", "发明晶体管与集成电路", ["贝尔实验室", "德州仪器", "仙童"], (4, 5),
     "美国公司占 2025 年全球半导体销售额的 53.4%", (3,)),
    ("1971", "美国", "us", "第一款商用微处理器", ["英特尔"], (7,),
     "美国半导体企业 2025 年研发投入 768 亿美元，创纪录", (3,)),
    ("1980 年代", "日本", "ea", "存储领跑，后期占全球半导体市场 52%", ["日本电气", "日立"], (9,),
     "铠侠居 NAND 全球第四，份额 13.6%；信越化学与 SUMCO 占硅片 44.1%", (14, 13)),
    ("1987–1990", "台湾 · 英国", "ea", "设计与制造分工", ["台积电", "Arm"], (16, 17),
     "台积电占 2026 年二季度全球代工营收 72.5%", (19,)),
    ("1992", "韩国", "ea", "DRAM 接棒", ["三星", "SK 海力士"], (21,),
     "DRAM：三星 38%、SK 海力士 25%；HBM：SK 海力士 50%", (22,)),
    ("2010–2026", "荷兰", "eu", "EUV 光刻机，从原型机到量产", ["ASML"], (23,),
     "ASML 预计 2026 年出货约 65 台 EUV", (26,)),
    ("2025–2026", "中国大陆", "cn", "设备投入全球最大，晶圆产能快速扩张", ["中芯国际", "华虹"], (12,),
     "中芯国际 2026 年二季度营收 30.06 亿美元，同比 +36.1%", (28,)),
    ("2026", "美 · 台 · 韩", "us", "AI 需求把整条链拉到极限", ["英伟达", "台积电", "SK 海力士"], (2,),
     "2026 年 8 月全球半导体销售额 1,597 亿美元，同比 +144.3%", (2,)),
]


def fig_timeline():
    out = ['<figure class="fig" id="fig-timeline"><div class="fig-title">八个关键节点</div>'
           '<div class="fig-sub">从 1947 年到今天，每一步由谁推动</div>'
           '<div class="legend"><span><i class="sw k-us"></i>美国</span><span><i class="sw k-ea"></i>日本、韩国、台湾</span>'
           '<span><i class="sw k-eu"></i>欧洲</span><span><i class="sw k-cn"></i>中国大陆</span></div><ol class="vt">']
    for when, who, reg, what, cos, refs, now, nrefs in TIMELINE:
        out.append(f'<li class="vt-i c-{reg}"><div class="vt-when">{when}</div><div class="vt-card"><div class="vt-who">{who}</div>'
                   f'<div class="vt-what">{what}{cite(*refs)}</div>{logos(cos)}'
                   f'<div class="vt-now"><b>今天</b>{now}{cite(*nrefs)}</div></div></li>')
    out.append('</ol><figcaption>图 2　时间线。1980 年代的份额为日本厂商在全球半导体市场的份额；各节点“今天”一行均为 2025–2026 年数据。</figcaption></figure>')
    return "".join(out)


def fig_ai():
    return f'''<figure class="fig" id="fig-ai"><div class="fig-title">一块 AI 加速器，经过哪些手</div>
<div class="fig-sub">以英伟达披露的供应链为例</div>
<div class="flow">
  <div class="node" style="--c:{C_US}"><b>设计</b><span>英伟达（美国）</span></div><div class="arrow" aria-hidden="true">→</div>
  <div class="node" style="--c:{C_EA}"><b>晶圆代工</b><span>台积电 · 三星</span><em>台积电占二季度全球代工营收 72.5%{cite(19)}</em></div><div class="arrow" aria-hidden="true">→</div>
  <div class="node" style="--c:{C_EU}"><b>先进封装</b><span>CoWoS</span></div><div class="arrow" aria-hidden="true">→</div>
  <div class="node" style="--c:#5B6B8C"><b>组装测试</b><span>鸿海 · 纬创 · Fabrinet</span></div>
</div>
<div class="ch-ct" style="margin-top:18px">HBM 内存：2026 年二季度营收份额{cite(22)}</div>
<div class="bar" role="img" aria-label="HBM 份额：SK 海力士 50%，三星 33%，美光 18%">
  <span class="seg" style="flex:50;background:#F08A24">SK 海力士 50%</span><span class="seg" style="flex:33;background:{C_US};color:#fff">三星 33%</span><span class="seg" style="flex:18;background:{C_EU}">美光 18%</span></div>
<div class="stats">
  <div><b>1,597 亿美元</b><span>2026 年 8 月全球半导体销售额，同比 +144.3%{cite(2)}</span></div>
  <div><b>+305%</b><span>2026 年上半年存储同比增速，逻辑为 +45%{cite(34)}</span></div>
  <div><b>962 亿美元</b><span>英伟达 5–7 月季度营收，同比 +106%{cite(32)}</span></div>
  <div><b>402 亿美元</b><span>台积电二季度营收，同比 +33.7%{cite(20)}</span></div>
</div>
<figcaption>图 3　供应链环节取自英伟达 2026 财年 10-K。{cite(18)} HBM 份额为研究机构估算，四舍五入后合计可能不是 100%。</figcaption></figure>'''


EQUIP = [("中国大陆", 49.3, "-0.5%"), ("台湾", 31.5, "+90%"), ("韩国", 25.8, "+26%"),
         ("北美", 10.9, "-20%"), ("日本", 9.5, "+22%"), ("其他地区", 5.2, "+25%"), ("欧洲", 2.9, "-41%")]


def fig_china():
    rows = "".join(
        f'<div class="eq-row{" hl" if n == "中国大陆" else ""}"><span class="eq-n">{n}</span>'
        f'<div class="eq-track"><i style="width:{v / 49.3 * 100:.1f}%"></i></div>'
        f'<span class="eq-v">{v * 10:.0f}</span><span class="eq-g">{g}</span></div>' for n, v, g in EQUIP)
    return f'''<figure class="fig" id="fig-china"><div class="fig-title">2025 年，钱花在哪里</div>
<div class="fig-sub">各地区半导体设备销售额（亿美元）与同比变化{cite(12)}</div>
<div class="eq">{rows}</div>
<div class="tiles">
  <div><b>30.06 亿美元</b><span>中芯国际 2026 年二季度营收，同比 +36.1%{cite(28)}</span></div>
  <div><b>3 家</b><span>二季度全球晶圆代工前十中的中国大陆企业：中芯国际、华虹集团、晶合集成{cite(19)}</span></div>
  <div><b>约 10%</b><span>长鑫存储占 2026 年二季度全球 DRAM 营收{cite(22)}</span></div>
  <div><b>约 20%</b><span>中国大陆占 ASML 2026 年全年净销售额的预期比例{cite(26)}</span></div>
  <div><b>3,440 亿元</b><span>“大基金”三期注册资本，2024 年 5 月成立{cite(29)}</span></div>
  <div><b>+131.3%</b><span>2026 年 8 月中国市场半导体销售额同比增速{cite(2)}</span></div>
</div>
<figcaption>图 4　同比为 2025 年相对 2024 年的变化。“其他地区”指统计口径中的 Rest of World。</figcaption></figure>'''


def info():
    return f'''<aside class="info" id="info"><div class="info-h">CASPA 第 35 届年会 · The CEO Summit</div>
<dl><div><dt>时间</dt><dd>2026 年 10 月 23–24 日</dd></div>
<div><dt>地点</dt><dd>Santa Clara Convention Center，美国加州圣塔克拉拉</dd></div>
<div><dt>官网</dt><dd><a href="https://caspaceosummit.com" target="_blank" rel="noopener">caspaceosummit.com</a></dd></div></dl>
<a class="btn" href="{TICKET_URL}" target="_blank" rel="noopener">报名参会</a></aside>'''


FIGS = {"{{FIG_CHAIN}}": fig_chain, "{{FIG_TIMELINE}}": fig_timeline, "{{FIG_AI}}": fig_ai,
        "{{FIG_CHINA}}": fig_china, "{{INFO}}": info}

# banners: section number -> (art function, colour)
BANNERS = {"一": (art_transistor, C_US), "二": (art_dram, C_EA), "三": (art_split, C_EA), "四": (art_hbm, C_EA),
           "五": (art_litho, C_EU), "六": (art_fab, C_CN), "七": (lambda c, u: art_package(c, u, "AI"), "#7A5AF8"),
           "八": (art_converge, "#5B6B8C")}


PHOTOS = {  # section number -> (file, caption, ref)
    "一": ("bell-1948.jpg", "巴丁、肖克利、布拉顿，晶体管的三位发明者，贝尔实验室。AT&T 新闻照片，公有领域", 40),
}


def banner(num):
    if num in PHOTOS:
        f, cap, ref = PHOTOS[num]
        b64 = base64.b64encode((ROOT / "assets" / "photos" / f).read_bytes()).decode()
        return (f'<figure class="photo"><img src="data:image/jpeg;base64,{b64}" alt="{cap}" loading="lazy">'
                f'<figcaption>{cap}{cite(ref)}</figcaption></figure>')
    if num not in BANNERS:
        return ""
    fn, col = BANNERS[num]
    return f'<div class="banner" style="--c:{col}">{fn(col, "b" + num)}<span class="banner-tag">示意图</span></div>'


# ------------------------------------------------------------- markdown
fm = dict(re.findall(r"^(\w+):\s*(.+)$", MD.split("---")[1], re.M))
body = MD.split("---", 2)[2]
parts = re.split(r"^## ", body, flags=re.M)
sections = []
for p in parts[1:]:
    head, _, rest = p.partition("\n")
    sections.append((head.strip(), rest.strip()))


def md2html(s):
    s = re.sub(r"\[\[(\d+)\]\]", lambda m: f"@@CITE{m.group(1)}@@", s)
    h = markdown.markdown(s, extensions=["sane_lists"])
    h = re.sub(r"@@CITE(\d+)@@", lambda m: cite(m.group(1)), h)
    for k, fn in FIGS.items():
        h = h.replace(f"<p>{k}</p>", fn())
    return h


SCROLL_HINT = '<div class="sc-hint">向下滑动，阅读全文 ↓</div>'
sec_html, toc = [], []
for i, (head, rest) in enumerate(sections):
    if head.startswith("参考与出处"):
        lst, _, extra = rest.partition("\n延伸阅读")
        items = re.findall(r"^(\d+)\.\s+(.*)$", lst, re.M)
        lis = []
        for n, t in items:
            t = html.escape(t, quote=False)
            t = re.sub(r"&lt;(https?://[^&\s]+?)&gt;", lambda mm: f'<a href="{mm.group(1)}" target="_blank" rel="noopener">{mm.group(1)}</a>', t)
            t = re.sub(r"\*([^*]+)\*", r"<i>\1</i>", t)
            badge = ""
            for tag, cls in (("【一手】", "b-prim"), ("【研究机构】", "b-res")):
                if t.startswith(tag):
                    badge = f'<span class="badge {cls}">{tag[1:-1]}</span>'
                    t = t[len(tag):]
            lis.append(f'<li id="ref-{n}"><span class="rn">{n}</span><div>{badge}{t}</div></li>')
        intro = rest.split("\n1.")[0].strip()
        sec_html.append(
            f'<section class="sec refs" id="refs"><div class="sec-head"><h2>{html.escape(head)}</h2></div>{SCROLL_HINT}'
            f'<div class="scrollbox" tabindex="0"><p class="sc-p">{html.escape(intro)}</p><ol class="reflist">{"".join(lis)}</ol>'
            f'<p class="sc-p">延伸阅读{html.escape(extra.strip())}</p></div></section>')
        toc.append(("refs", "参考与出处"))
        continue
    num, _, title = head.partition("　")
    if not title:
        num, title = "", head
    sid = f"s{i}"
    is_note = head.startswith("数据说明")
    if is_note:
        num, title = "", head
        sec_html.append(
            f'<section class="sec note" id="{sid}"><div class="sec-head"><h2>{html.escape(title)}</h2></div>{SCROLL_HINT}'
            f'<div class="scrollbox" tabindex="0">{md2html(rest)}</div></section>')
    else:
        numhtml = f'<span class="num">{html.escape(num)}</span>' if num else ""
        sec_html.append(
            f'<section class="sec" id="{sid}"><div class="sec-head">{numhtml}<h2>{html.escape(title)}</h2></div>'
            f'{banner(num)}<div class="prose">{md2html(rest)}</div></section>')
    toc.append((sid, (f"{num} {title}" if num else title).strip()))

nav = "".join(f'<a href="#{a}">{html.escape(b)}</a>' for a, b in toc)

CSS = r"""
:root{color-scheme:light;--bg:#fff;--ink:#16191F;--muted:#5C6370;--rule:#E7E9EE;--soft:#F6F7F9;--gold:#C99A1D;--gold-ink:#8A6508;
--us:#2F6FDF;--ea:#D99A00;--eu:#14A38B;--cn:#E4572E;
--serif:'Noto Serif SC','Songti SC','STSong','Source Han Serif SC','WenQuanYi Zen Hei',serif;
--sans:'Noto Sans SC','PingFang SC','Microsoft YaHei','Source Han Sans SC','WenQuanYi Zen Hei',system-ui,sans-serif;
--disp:'Playfair Display','Noto Serif SC',Georgia,serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:56px;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.9;-webkit-font-smoothing:antialiased}
.wrap{max-width:680px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
#bar{position:fixed;left:0;top:env(safe-area-inset-top,0px);height:3px;width:0;background:var(--gold);z-index:30}
.hero{padding-block:36px 30px;border-bottom:1px solid var(--rule)}
.brand{display:flex;align-items:center;margin-bottom:40px}.brand svg{height:28px;width:auto}
.eyebrow{letter-spacing:.16em;font-size:11.5px;color:var(--gold-ink);text-transform:uppercase;font-weight:500}
.hero h1{font-family:var(--serif);font-weight:700;font-size:clamp(36px,10vw,64px);line-height:1.18;margin:12px 0 14px;text-wrap:balance}
.hero .sub{font-family:var(--serif);font-size:clamp(17px,4.4vw,21px);line-height:1.65;color:var(--muted);margin:0}
.rule{width:52px;height:3px;background:var(--gold);margin:22px 0 14px;border:0}
.meta{font-size:13px;color:var(--muted);line-height:1.7}
.nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border-bottom:1px solid var(--rule)}
.nav-in{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;padding-block:6px}.nav-in::-webkit-scrollbar{display:none}
.nav a{white-space:nowrap;font-size:13px;color:var(--muted);text-decoration:none;padding:5px 11px;border-radius:999px;line-height:1.4}
.nav a.on{color:var(--ink);background:var(--soft);font-weight:500}
.sec{padding-block:44px 2px}
.sec-head{display:flex;align-items:baseline;gap:14px;margin-bottom:16px}
.num{font-family:var(--serif);font-weight:700;font-size:clamp(38px,10vw,52px);line-height:1;color:var(--gold);min-width:1.05em}
.sec h2{font-family:var(--serif);font-weight:700;font-size:clamp(21px,5.6vw,28px);line-height:1.4;margin:0;text-wrap:balance}
.prose p{margin:0 0 1.1em}.prose strong{font-weight:700}
.prose ul{padding-left:1.15em;margin:0 0 1.2em}.prose li{margin-bottom:.4em}.prose li::marker{color:var(--gold)}
.prose a{color:var(--ink);text-decoration-color:var(--gold);text-underline-offset:3px}
sup.cite{font-size:.64em;line-height:0;margin-left:1px;vertical-align:super;white-space:nowrap}
sup.cite a{color:var(--gold-ink);text-decoration:none;font-weight:600;padding:0 1px}
/* banner illustration */
.photo{margin:2px 0 22px}.photo img{display:block;width:100%;height:auto;border-radius:14px}.photo figcaption{font-size:12px;color:var(--muted);margin-top:8px;line-height:1.5}
.banner{position:relative;margin:2px 0 22px;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,color-mix(in srgb,var(--c) 11%,#fff),#fff 70%);border:1px solid color-mix(in srgb,var(--c) 18%,#fff);padding:12px 0 8px}
.banner svg{display:block;width:min(100%,300px);height:auto;margin:0 auto}
.banner-tag{position:absolute;right:10px;bottom:6px;font-size:11px;color:var(--muted)}
/* figures */
.fig{margin:30px 0}
.fig-title{font-family:var(--serif);font-size:20px;font-weight:700;line-height:1.4}
.fig-sub{font-size:13px;color:var(--muted);margin:2px 0 14px;line-height:1.6}
figcaption{font-size:12px;line-height:1.75;color:var(--muted);margin-top:10px}
.legend{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:12px;color:var(--muted);margin-bottom:12px}
.legend .sw{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px}
.k-us{background:var(--us)}.k-ea{background:var(--ea)}.k-eu{background:var(--eu)}.k-cn{background:var(--cn)}
/* logos */
.logos{display:flex;flex-wrap:wrap;gap:6px 8px;margin:8px 0 2px}
.lg{display:inline-flex;align-items:center;justify-content:center;height:30px;padding:0 10px;border:1px solid var(--rule);border-radius:8px;background:#fff}
.lg img{height:18px;width:auto;max-width:84px;object-fit:contain;filter:grayscale(1) contrast(1.05)}
.lg.tx{font-size:12.5px;color:#3A404C;font-weight:500}
/* seven links */
.chain{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:16px}
.link{border:1px solid color-mix(in srgb,var(--c) 22%,#fff);border-radius:16px;overflow:hidden;background:#fff}
.link-art{background:linear-gradient(135deg,color-mix(in srgb,var(--c) 12%,#fff),#fff 75%);padding:10px 0 4px}
.link-art svg{display:block;width:min(100%,260px);height:auto;margin:0 auto}
.link-body{padding:10px 16px 16px}
.ch-h{display:flex;align-items:center;gap:10px}
.dot{width:26px;height:26px;border-radius:50%;background:var(--c);color:#fff;font-weight:700;display:inline-flex;align-items:center;justify-content:center;font-size:14px;flex:none}
.ch-h b{font-family:var(--serif);font-size:19px;color:var(--c)}
.ch-what{font-size:13.5px;color:var(--muted);margin:2px 0 0;line-height:1.7}
.ch-chart{margin-top:12px;background:var(--soft);border-radius:12px;padding:12px 12px 6px}
.ch-ct{font-size:12.5px;color:var(--muted);margin:0 0 8px;line-height:1.5}
.ch-data{font-size:13.5px;margin-top:10px;line-height:1.75}
/* bars */
.pie{display:flex;align-items:center;gap:14px;margin-bottom:8px}.donut{flex:0 0 112px;width:112px;height:112px;border-radius:50%;display:grid;place-items:center}.dh{width:70px;height:70px;border-radius:50%;background:var(--soft);display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.2}.dh b{font-size:16px}.dh span{font-size:10.5px;color:#667}.pleg{flex:1;min-width:0}.pl{display:grid;grid-template-columns:10px 1fr auto;gap:7px;align-items:center;font-size:12.5px;margin:3px 0}.pl i{width:10px;height:10px;border-radius:3px}.pl b{font-variant-numeric:tabular-nums}
.hb-r,.gb-r{display:grid;grid-template-columns:5.6em 1fr 4.4em;gap:8px;align-items:center;font-size:12.5px;margin-bottom:6px;line-height:1.3}
.hb-t{height:12px;background:#E7EAF0;border-radius:6px;overflow:hidden}
.hb-t i{display:block;height:100%;background:#B9C0CD;border-radius:6px}
.hb-v{text-align:right;font-variant-numeric:tabular-nums}
.gb-g{margin-bottom:10px}.gb-n{font-size:13px;font-weight:700;margin-bottom:4px}
.gb-r{grid-template-columns:3em 1fr 4.4em}
.gb-l{color:var(--muted)}
/* timeline (vertical line) */
.vt{list-style:none;margin:0;padding:0 0 0 22px;position:relative}
.vt::before{content:"";position:absolute;left:6px;top:8px;bottom:8px;width:2px;background:var(--rule)}
.vt-i{position:relative;padding:0 0 18px}.vt-i:last-child{padding-bottom:0}
.vt-i::before{content:"";position:absolute;left:-22px;top:5px;width:14px;height:14px;border-radius:50%;background:var(--k,#aab);border:3px solid #fff;box-shadow:0 0 0 1.5px var(--k,#aab)}
.c-us{--k:var(--us)}.c-ea{--k:var(--ea)}.c-eu{--k:var(--eu)}.c-cn{--k:var(--cn)}
.vt-when{font-family:var(--disp);font-size:19px;font-weight:700;line-height:1.5;color:var(--k)}
.vt-card{border:1px solid var(--rule);border-left:4px solid var(--k);border-radius:12px;padding:10px 14px 12px;margin-top:4px;background:#fff}
.vt-who{font-size:12.5px;color:var(--muted)}
.vt-what{font-family:var(--serif);font-weight:600;font-size:16px;line-height:1.65}
.vt-now{margin-top:8px;padding-top:8px;border-top:1px dashed var(--rule);font-size:13px;line-height:1.7;color:#3A404C}
.vt-now b{display:inline-block;margin-right:8px;padding:0 8px;border-radius:999px;background:var(--soft);font-size:11.5px;color:var(--muted);font-weight:500}
/* ai flow */
.flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:8px;align-items:stretch}
.node{background:color-mix(in srgb,var(--c) 7%,#fff);border:1px solid color-mix(in srgb,var(--c) 25%,#fff);border-top:4px solid var(--c);border-radius:12px;padding:10px 12px 12px;display:flex;flex-direction:column;gap:2px;font-size:13px;line-height:1.55}
.node b{font-family:var(--serif);font-size:16px;color:var(--c)}.node span{color:var(--muted)}.node em{font-style:normal;color:var(--ink);font-size:12px;margin-top:4px}
.arrow{align-self:center;color:var(--gold);font-size:20px}
.bar{display:flex;height:32px;border-radius:8px;overflow:hidden;gap:2px}
.seg{display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#14161B;min-width:0;white-space:nowrap;overflow:hidden}
.stats,.tiles{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:18px}
.stats div,.tiles div{background:var(--soft);border-radius:12px;padding:11px 13px}
.stats b,.tiles b{display:block;font-family:var(--disp);font-size:20px;line-height:1.25}
.stats span,.tiles span{display:block;font-size:12px;color:var(--muted);line-height:1.6;margin-top:4px}
.eq{display:flex;flex-direction:column;gap:8px}
.eq-row{display:grid;grid-template-columns:4.6em 1fr 2.8em 3.2em;gap:8px;align-items:center;font-size:13px}
.eq-track{height:15px;background:var(--soft);border-radius:8px;overflow:hidden}.eq-track i{display:block;height:100%;background:#B9C0CD;border-radius:8px}
.eq-row.hl .eq-track i{background:var(--cn)}.eq-row.hl .eq-n,.eq-row.hl .eq-v{font-weight:700}
.eq-v{text-align:right;font-variant-numeric:tabular-nums}.eq-g{font-size:12px;color:var(--muted);text-align:right;font-variant-numeric:tabular-nums}
/* info */
.info{margin:32px 0 6px;border:1px solid var(--rule);border-radius:14px;padding:20px 20px;background:#fff}
.info-h{font-family:var(--serif);font-weight:700;font-size:19px;margin-bottom:10px}
.info dl{margin:0 0 14px}.info dl div{display:grid;grid-template-columns:3em 1fr;gap:8px;padding:3px 0;font-size:15px;line-height:1.7}
.info dt{color:var(--muted)}.info dd{margin:0}.info a{color:var(--ink);text-decoration-color:var(--gold);text-underline-offset:3px}
.btn{display:inline-block;padding:10px 24px;border-radius:999px;background:var(--ink);color:#fff!important;font-weight:700;text-decoration:none!important;font-size:15px;line-height:1.4}
/* scroll boxes */
.sc-hint{font-size:12.5px;color:var(--gold-ink);margin:-4px 0 8px}
.scrollbox{max-height:230px;overflow-y:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--rule);border-radius:12px;padding:12px 16px;background:var(--soft);font-size:14px;line-height:1.85;position:relative}
.scrollbox ul{padding-left:1.1em;margin:0}.scrollbox li{margin-bottom:.5em}.scrollbox li::marker{color:var(--gold)}
.scrollbox:focus{outline:2px solid var(--gold)}
.sc-p{margin:0 0 .8em}
.reflist{list-style:none;padding:0;margin:0;font-size:13px;line-height:1.7}
.reflist li{display:grid;grid-template-columns:2em 1fr;gap:6px;padding:7px 6px;border-radius:8px;margin:0}
.reflist li:target{background:#FFF6DC;outline:1px solid var(--gold)}
.rn{font-family:var(--disp);font-weight:700;color:var(--gold-ink);text-align:right}
.reflist a{color:var(--muted);word-break:break-all}
.reflist li>div{min-width:0;overflow-wrap:anywhere}
.badge{display:inline-block;font-size:11px;padding:0 7px;border-radius:999px;margin-right:6px;font-weight:600;line-height:1.7}
.b-prim{background:#E2F5EF;color:#0E7A64}.b-res{background:#E5EEFB;color:#2457B3}
.foot{padding-block:32px 56px;color:var(--muted);font-size:12.5px;line-height:1.8;text-align:center;border-top:1px solid var(--rule);margin-top:40px}
@media (min-width:640px){body{font-size:17px}.stats,.tiles{grid-template-columns:repeat(3,1fr)}.link{display:grid;grid-template-columns:240px 1fr}.link-art{display:flex;align-items:center;padding:10px}.link-art svg{width:100%}}
@media (max-width:560px){.flow{grid-template-columns:1fr}.arrow{transform:rotate(90deg);justify-self:center}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
"""

JS = r"""
(function(){
  var bar=document.getElementById('bar');
  function onScroll(){var h=document.documentElement;var m=h.scrollHeight-h.clientHeight;bar.style.width=(m>0?(h.scrollTop/m*100):0)+'%';}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var links=[].slice.call(document.querySelectorAll('.nav a')),map={};
  links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){a.classList.remove('on')});var a=map[e.target.id];
        if(a){a.classList.add('on');var n=a.parentElement;n.scrollLeft=a.offsetLeft-n.clientWidth/2+a.clientWidth/2;}}});},{rootMargin:'-30% 0px -60% 0px'});
    document.querySelectorAll('.sec').forEach(function(s){io.observe(s)});
  }
})();
"""

import base64
LOGO = ('<img src="data:image/png;base64,' + base64.b64encode((ROOT / "assets" / "caspa-logo-dark.png").read_bytes()).decode() +
        '" alt="CASPA" style="height:58px;width:auto;display:block">')

nrefs = len(re.findall(r"^\d+\.\s", MD.split("## 参考与出处")[1], re.M))
page = f"""<title>{html.escape(fm['title'])}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap">
<style>{CSS}</style>
<div id="bar"></div>
<header class="hero"><div class="wrap">
  <div class="brand">{LOGO}</div>
  <div class="eyebrow">CASPA 35th Annual Conference · The CEO Summit</div>
  <h1>{html.escape(fm['title'])}</h1>
  <p class="sub">{html.escape(fm['subtitle'])}</p>
  <hr class="rule">
  <div class="meta">阅读约 15 分钟　·　数据均为 2025–2026 年统计，附 {nrefs} 条出处　·　2026 年 10 月 16 日</div>
</div></header>
<nav class="nav" aria-label="章节"><div class="wrap nav-in">{nav}</div></nav>
<main class="wrap">{''.join(sec_html)}</main>
<footer class="foot wrap">CASPA CEO Summit · 2026 年 10 月 23–24 日 · Santa Clara Convention Center<br>
文中公司标志与名称归各公司所有，仅用于说明。峰会信息以主办方最新通知为准。</footer>
<script>{JS}</script>
"""
OUT.write_text(page, encoding="utf-8")
print("wrote", OUT, len(page) // 1024, "KB;", nrefs, "refs")
