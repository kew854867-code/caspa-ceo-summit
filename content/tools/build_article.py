#!/usr/bin/env python3
"""Build the designed HTML article from chip-world-map-article.md.

Usage: python3 build_article.py <out.html>
Figures are generated here from the numbers recorded in the article's sources
(each figure caption names its source and reference number).
"""
import base64, html, re, sys
from pathlib import Path
import markdown

ROOT = Path(__file__).resolve().parent.parent
MD = (ROOT / "chip-world-map-article.md").read_text(encoding="utf-8")
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "chip-world-map-article.html"

TICKET_URL = ("https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-"
              "the-ceo-summit-tickets-1994631439329?discount=CC15OFF")


def b64(path, mime):
    return f"data:{mime};base64," + base64.b64encode((ROOT / path).read_bytes()).decode()


POSTER = b64("assets/summit-poster.jpg", "image/jpeg")
QR = b64("assets/summit-qr.png", "image/png")

# ---------------------------------------------------------------- figures
def cite(n):
    return f'<sup class="cite"><a href="#ref-{n}">{n}</a></sup>'


def fig_shares():
    # BCG x SIA (Apr 2021), Exhibit 1, 2019 data. Only labelled values are shown;
    # "rest" is the remainder that the exhibit leaves unlabelled.
    rows = [
        ("设计工具与核心 IP", {"us": 74}),
        ("逻辑芯片设计", {"us": 67, "ea": 15, "eu": 8}),
        ("存储设计", {"us": 29, "ea": 70}),
        ("设备", {"us": 41, "ea": 36, "eu": 18}),
        ("材料", {"us": 11, "cn": 13, "ea": 57, "eu": 12}),
        ("晶圆制造", {"us": 12, "cn": 16, "ea": 56, "eu": 9}),
        ("封装与测试", {"cn": 38, "ea": 43}),
    ]
    names = {"us": "美国", "cn": "中国大陆", "ea": "东亚（日韩台）", "eu": "欧洲"}
    out = ['<figure class="fig" id="fig-shares"><div class="panel">',
           '<div class="fig-kicker">谁主导哪一环</div>',
           '<div class="fig-title">2019 年各环节的区域份额</div>',
           '<div class="legend">']
    for k in ("us", "ea", "cn", "eu"):
        out.append(f'<span><i class="sw r-{k}"></i>{names[k]}</span>')
    out.append('<span><i class="sw r-ot"></i>其他或未标注</span></div><div class="bars">')
    for label, d in rows:
        rest = 100 - sum(d.values())
        desc = "，".join(f"{names[k]} {v}%" for k, v in d.items())
        segs = "".join(
            f'<span class="seg r-{k}" style="flex:{v}">{v}%</span>' if v >= 6
            else f'<span class="seg r-{k}" style="flex:{v}"></span>'
            for k, v in d.items())
        if rest > 0:
            segs += f'<span class="seg r-ot" style="flex:{rest}"></span>'
        out.append(f'<div class="bar-row"><div class="bar-label">{label}</div>'
                   f'<div class="bar" role="img" aria-label="{label}：{desc}">{segs}</div></div>')
    out.append('</div></div>'
               f'<figcaption>图 1　数据来源：BCG 与 SIA，2021 年 4 月报告 Exhibit 1，数据年份为 2019 年。{cite(6)} '
               '该图只标出了报告标注的数值，未标注部分以灰色表示。“东亚”为报告口径，指韩国、日本和台湾。</figcaption></figure>')
    return "".join(out)


TIMELINE = [
    ("1947–1959", "美国", "us", "发明晶体管与集成电路", "贝尔实验室 · 德州仪器 · 仙童"),
    ("1971", "美国", "us", "第一款商用微处理器", "英特尔 4004"),
    ("1980 年代", "日本", "ea", "存储领跑，后期全球份额 52%", "日本电气 · 日立等"),
    ("1987–1990", "台湾 · 英国", "ea", "设计与制造分工", "台积电 · Arm"),
    ("1992", "韩国", "ea", "DRAM 接棒", "三星电子"),
    ("2010–2020", "荷兰", "eu", "EUV 光刻机走向量产", "ASML"),
    ("2020 年代", "美 · 台 · 韩", "us", "AI 把整条链拉到极限", "英伟达 · 台积电 · SK 海力士"),
    ("1996–2023", "中国大陆", "cn", "全球晶圆产能份额 1.62% → 25.83%", "中芯国际 · 长鑫存储"),
]


def fig_timeline():
    out = ['<figure class="fig" id="fig-timeline"><div class="panel">',
           '<div class="fig-kicker">谁在推动</div>',
           '<div class="fig-title">八个关键节点</div><ol class="tl">']
    for when, who, reg, what, cos in TIMELINE:
        out.append(f'<li class="tl-card r-line-{reg}"><div class="tl-when">{when}</div>'
                   f'<div class="tl-who">{who}</div><div class="tl-what">{what}</div>'
                   f'<div class="tl-co">{cos}</div></li>')
    out.append('</ol></div><figcaption>图 2　本文各节的脉络。颜色与图 1 一致：蓝为美国，金为东亚，绿为欧洲，红为中国大陆。'
               f'依据正文第一至七节及其出处{cite(1)}{cite(2)}{cite(4)}{cite(8)}{cite(10)}{cite(12)}{cite(13)}{cite(15)}{cite(21)}。</figcaption></figure>')
    return "".join(out)


def fig_ai():
    return f'''<figure class="fig" id="fig-ai"><div class="panel">
<div class="fig-kicker">2026 年的一条供应链</div>
<div class="fig-title">一块 AI 加速器，经过哪些手</div>
<div class="flow">
  <div class="node n-design"><b>设计</b><span>NVIDIA（美国）</span></div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="node n-fab"><b>晶圆代工</b><span>台积电 · 三星</span><em>台积电 2026 年第二季度份额 72.5%</em></div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="node n-pack"><b>先进封装</b><span>CoWoS</span></div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="node n-asm"><b>组装测试</b><span>鸿海 · 纬创 · Fabrinet</span></div>
</div>
<div class="flow-mem">
  <div class="mem-label"><b>HBM 内存</b><span>2026 年第二季度营收份额</span></div>
  <div class="bar mem-bar" role="img" aria-label="HBM 份额：SK 海力士 50%，三星 33%，美光 18%">
    <span class="seg m-1" style="flex:50">SK 海力士 50%</span><span class="seg m-2" style="flex:33">三星 33%</span><span class="seg m-3" style="flex:18">美光 18%</span>
  </div>
</div>
<div class="stats">
  <div><b>7,020 亿美元</b><span>2026 年上半年全球半导体销售额，同比 +102%</span></div>
  <div><b>+305%</b><span>2026 年上半年存储同比增速</span></div>
  <div><b>+45%</b><span>2026 年上半年逻辑同比增速</span></div>
  <div><b>7,917 亿美元</b><span>2025 年全年销售额，同比 +25.6%</span></div>
</div></div>
<figcaption>图 3　供应链环节取自 NVIDIA 2026 财年 10-K。{cite(14)} 代工份额来自 TrendForce。{cite(18)} HBM 份额来自 Counterpoint，为研究机构估算，四舍五入后合计可能不是 100%。{cite(11)} 销售额来自 WSTS 与 SIA。{cite(19)}{cite(20)}</figcaption></figure>'''


def fig_china():
    return f'''<figure class="fig" id="fig-china"><div class="panel">
<div class="fig-kicker">中国大陆在全球晶圆产能中的位置</div>
<div class="fig-title">规模在变大，最前沿仍是 0</div>
<div class="china-grid">
  <div class="big-pair">
    <div><b>1.62%</b><span>1996 年 2 月</span></div>
    <div class="big-arrow" aria-hidden="true">→</div>
    <div><b class="gold">25.83%</b><span>2023 年 8 月</span></div>
  </div>
  <div class="node-bars">
    <div class="nb-title">2023 年第三季度，占全球该类产能</div>
    <div class="nb"><span class="nb-l">成熟制程<br><small>28 纳米及以上</small></span><div class="nb-track"><i style="width:30.19%"></i></div><span class="nb-v">30.19%</span></div>
    <div class="nb"><span class="nb-l">先进制程<br><small>6 至 27 纳米</small></span><div class="nb-track"><i style="width:17.57%"></i></div><span class="nb-v">17.57%</span></div>
    <div class="nb"><span class="nb-l">最前沿<br><small>5 纳米及以下</small></span><div class="nb-track"><i style="width:0%"></i></div><span class="nb-v">0%</span></div>
  </div>
</div>
<div class="fund">
  <div class="fund-t">“大基金”募资</div>
  <div class="fund-items">
    <div><b>1,387 亿元</b><span>一期 · 2014</span></div>
    <div><b>2,040 亿元</b><span>二期 · 2019</span></div>
    <div><b>3,440 亿元</b><span>三期 · 2024</span></div>
  </div>
</div></div>
<figcaption>图 4　产能数据来自美联储 FEDS Notes。{cite(21)} 大基金金额来自 heise online 报道。{cite(23)} 同一份美联储数据中，台湾占最前沿产能的 51.85%。三期金额为报道数字，具体到位资金未经核实。</figcaption></figure>'''


def fig_who():
    rows = [
        ("发明与集成", "美国", "us", "贝尔实验室、德州仪器、仙童", "2019 年 EDA 与核心 IP 美国占 74%，逻辑设计占 67%"),
        ("微处理器", "美国", "us", "英特尔", "1971 年 4004 上市"),
        ("存储领跑", "日本", "ea", "日本电气、日立等", "1980 年代后期全球半导体份额 52%，1993 年被美国反超"),
        ("设计与制造分工", "台湾、英国", "ea", "台积电、Arm", "2026 年第二季度台积电代工份额 72.5%"),
        ("存储接棒", "韩国", "ea", "三星电子、SK 海力士", "DRAM 三星 38%、SK 海力士 25%；HBM SK 海力士 50%"),
        ("最难的设备", "荷兰", "eu", "ASML", "2021 年年报称其为 EUV 技术唯一供应商"),
        ("AI 时代", "美、台、韩", "us", "英伟达、台积电、SK 海力士", "2026 年上半年全球销售额 7,020 亿美元"),
        ("新变量", "中国大陆", "cn", "中芯国际、长鑫存储", "产能份额 25.83%（2023）；代工第三，5.4%（2026 Q2）"),
    ]
    out = ['<figure class="fig" id="fig-who"><div class="who-wrap"><table class="who"><thead><tr>'
           '<th>转折</th><th>来自哪里</th><th>代表公司</th><th>今天的位置</th></tr></thead><tbody>']
    for a, b, reg, c, d in rows:
        out.append(f'<tr><th scope="row">{a}</th><td><span class="chip r-line-{reg}">{b}</span></td><td>{c}</td><td>{d}</td></tr>')
    out.append('</tbody></table></div><figcaption>表 1　汇总前文各节，数字均来自正文所引出处。数据年份不同，不能直接相加或对比。</figcaption></figure>')
    return "".join(out)


def cta():
    return f'''<aside class="cta" id="cta">
  <img class="cta-poster" src="{POSTER}" alt="CASPA CEO Summit 官方海报：Silicon's Boldest Leaders Convene" width="480" height="600">
  <div class="cta-body">
    <div class="cta-eyebrow">35TH ANNUAL CONFERENCE &amp; DINNER BANQUET</div>
    <h3 class="cta-title">The <em>CEO Summit</em></h3>
    <p class="cta-date">2026 年 10 月 23–24 日</p>
    <p class="cta-venue">Santa Clara Convention Center<br>Santa Clara, California</p>
    <p class="cta-note">本文提到的设计工具、AI 算力、存储、互连、设备与资本，在这场峰会的议程里各有一席。</p>
    <div class="cta-row">
      <a class="btn" href="{TICKET_URL}" target="_blank" rel="noopener">报名参会</a>
      <a class="btn ghost" href="https://caspaceosummit.com" target="_blank" rel="noopener">caspaceosummit.com</a>
    </div>
    <div class="cta-qr"><img src="{QR}" alt="报名二维码，指向 Eventbrite 售票页" width="96" height="96"><span>扫码报名<br>官方海报二维码</span></div>
  </div>
</aside>'''


FIGS = {"{{FIG_SHARES}}": fig_shares, "{{FIG_TIMELINE}}": fig_timeline, "{{FIG_AI}}": fig_ai,
        "{{FIG_WHO}}": fig_who, "{{CTA}}": cta}

# ---------------------------------------------------------------- markdown
text = MD
fm = dict(re.findall(r"^(\w+):\s*(.+)$", text.split("---")[1], re.M))
body = text.split("---", 2)[2]

# China figure goes after the 2nd paragraph of section 七 intro: add placeholder
body = body.replace("再回头看 BCG 的 2019 年数据", "{{FIG_CHINA}}\n\n再回头看 BCG 的 2019 年数据")
FIGS["{{FIG_CHINA}}"] = fig_china

# split sections
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


sec_html = []
toc = []
for i, (head, rest) in enumerate(sections):
    if head.startswith("参考与出处"):
        # numbered list -> ids
        m = re.split(r"\n(?=延伸阅读)", rest)
        lst, extra = m[0], (m[1] if len(m) > 1 else "")
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
            f'<section class="sec refs" id="refs"><div class="sec-head"><span class="num">注</span><h2>{html.escape(head)}</h2></div>'
            f'<div class="prose"><p>{html.escape(intro)}</p></div><ol class="reflist">{"".join(lis)}</ol>'
            f'<div class="prose"><p>{html.escape(extra.strip())}</p></div></section>')
        toc.append(("refs", "参考与出处"))
        continue
    num, _, title = head.partition("　")
    if not title:
        num, title = "", head
    sid = f"s{i}"
    cls = "sec note" if head.startswith("数据说明") else "sec"
    if head.startswith("数据说明"):
        num, title = "", head
    sec_html.append(
        f'<section class="{cls}" id="{sid}"><div class="sec-head"><span class="num">{html.escape(num)}</span>'
        f'<h2>{html.escape(title)}</h2></div><div class="prose">{md2html(rest)}</div></section>')
    toc.append((sid, f"{num} {title}".strip()))

nav = "".join(f'<a href="#{a}">{html.escape(b)}</a>' for a, b in toc)

CSS = r"""
:root{
  --bg:#F7F8FB; --surface:#FFFFFF; --ink:#101A2E; --muted:#55607A; --rule:#DCE1EC;
  --gold:#D9A621; --gold-ink:#8A6508; --link:#1E4DA0;
  --panel:#0E1830; --panel-2:#16264A; --panel-ink:#EAF0FA; --panel-mute:#9FB0CF; --panel-rule:#2A3C66;
  --us:#5BB8E8; --cn:#EE7F6D; --ea:#D9A621; --eu:#4FC3A1; --ot:#55658A;
  --shadow:0 1px 2px rgba(16,26,46,.06),0 8px 28px rgba(16,26,46,.08);
  --serif:'Noto Serif SC','Songti SC','STSong','Source Han Serif SC','WenQuanYi Zen Hei',serif;
  --sans:'Noto Sans SC','PingFang SC','Microsoft YaHei','Source Han Sans SC','WenQuanYi Zen Hei',system-ui,sans-serif;
  --disp:'Playfair Display','Noto Serif SC',Georgia,serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#0B1424; --surface:#13203A; --ink:#EEF2F9; --muted:#A5B2CB; --rule:#26375A;
  --gold:#E3B53C; --gold-ink:#E9BE4C; --link:#8DB4F2; --panel:#0E1A33; --panel-2:#182A52; --panel-rule:#2E4272;
  --shadow:0 1px 2px rgba(0,0,0,.3),0 8px 28px rgba(0,0,0,.35); color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#0B1424; --surface:#13203A; --ink:#EEF2F9; --muted:#A5B2CB; --rule:#26375A;
  --gold:#E3B53C; --gold-ink:#E9BE4C; --link:#8DB4F2; --panel:#0E1A33; --panel-2:#182A52; --panel-rule:#2E4272;
  --shadow:0 1px 2px rgba(0,0,0,.3),0 8px 28px rgba(0,0,0,.35); color-scheme:dark}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:64px}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.95;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.wrap{max-width:720px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.wide{max-width:960px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
#bar{position:fixed;left:0;top:env(safe-area-inset-top,0px);height:3px;width:0;background:var(--gold);z-index:30}
/* hero */
.hero{background:radial-gradient(1200px 500px at 85% -10%,#2A4A86 0%,rgba(42,74,134,0) 60%),linear-gradient(180deg,#14284D 0%,#0B1730 100%);
  color:#F4F7FD;padding-block:56px 64px;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;inset:auto 0 0 0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.brand{display:flex;align-items:center;gap:12px;margin-bottom:44px}
.brand svg{height:34px;width:auto}
.eyebrow{font-family:var(--sans);letter-spacing:.22em;font-size:12px;color:#D9A621;text-transform:uppercase;font-weight:500}
.hero h1{font-family:var(--serif);font-weight:700;font-size:clamp(40px,9vw,80px);line-height:1.12;margin:14px 0 18px;letter-spacing:.01em;text-wrap:balance}
.hero .sub{font-family:var(--serif);font-size:clamp(18px,3.2vw,24px);line-height:1.6;color:#E7C25E;max-width:30em;margin:0}
.meta{margin-top:30px;display:flex;flex-wrap:wrap;gap:8px 22px;font-size:14px;color:#AFC0DE}
.meta b{color:#F4F7FD;font-weight:500}
/* nav */
.nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;background:var(--surface);border-bottom:1px solid var(--rule)}
.nav-in{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding-block:8px}
.nav-in::-webkit-scrollbar{display:none}
.nav a{white-space:nowrap;font-size:13.5px;color:var(--muted);text-decoration:none;padding:6px 12px;border-radius:999px;line-height:1.4}
.nav a:hover,.nav a.on{background:var(--panel);color:#fff}
/* sections */
.sec{padding-block:56px 8px}
.sec-head{display:flex;align-items:baseline;gap:18px;margin-bottom:22px}
.num{font-family:var(--serif);font-weight:700;font-size:clamp(44px,9vw,64px);line-height:1;color:var(--gold);min-width:1.1em}
.sec h2{font-family:var(--serif);font-weight:700;font-size:clamp(24px,5vw,32px);line-height:1.35;margin:0;text-wrap:balance}
.prose p{margin:0 0 1.15em}
.prose strong{font-weight:700;background:linear-gradient(transparent 62%,rgba(217,166,33,.28) 0)}
.prose ul{padding-left:1.2em;margin:0 0 1.2em}
.prose li{margin-bottom:.45em}
.prose li::marker{color:var(--gold)}
sup.cite{font-size:.68em;line-height:0;margin-left:1px;vertical-align:super}
sup.cite a{color:var(--gold-ink);text-decoration:none;font-weight:600;padding:0 1px}
sup.cite a:hover{background:var(--gold);color:#101A2E;border-radius:3px}
.prose a{color:var(--link)}
/* figures */
.fig{margin:34px 0}
.fig-bleed{margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw)}
.panel{background:var(--panel);color:var(--panel-ink);border-radius:16px;padding:26px 24px;box-shadow:var(--shadow);border:1px solid var(--panel-rule)}
.fig-kicker{font-size:12px;letter-spacing:.2em;color:var(--gold);font-weight:500}
.fig-title{font-family:var(--serif);font-size:22px;font-weight:700;margin:4px 0 18px;line-height:1.4}
figcaption{font-size:13px;line-height:1.75;color:var(--muted);margin-top:10px;padding-inline:4px}
figcaption sup.cite a{color:var(--gold-ink)}
.legend{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:13px;color:var(--panel-mute);margin-bottom:16px}
.legend i.sw{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:6px;vertical-align:-1px}
.r-us{background:var(--us)}.r-cn{background:var(--cn)}.r-ea{background:var(--ea)}.r-eu{background:var(--eu)}.r-ot{background:var(--ot)}
.bars{display:flex;flex-direction:column;gap:11px}
.bar-row{display:grid;grid-template-columns:8.2em 1fr;gap:12px;align-items:center}
.bar-label{font-size:14px;color:var(--panel-ink)}
.bar{display:flex;height:30px;border-radius:7px;overflow:hidden;gap:2px;background:var(--panel-2)}
.seg{display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:600;color:#0B1427;min-width:0;white-space:nowrap;overflow:hidden}
.seg.r-ot{background:var(--ot)}
/* timeline */
.tl{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.tl-card{background:var(--panel-2);border-radius:12px;padding:14px 16px 16px;border-top:4px solid var(--ot)}
.r-line-us{border-top-color:var(--us)}.r-line-ea{border-top-color:var(--ea)}.r-line-eu{border-top-color:var(--eu)}.r-line-cn{border-top-color:var(--cn)}
.tl-when{font-family:var(--disp);font-size:20px;font-weight:700;color:#fff;letter-spacing:.02em}
.tl-who{font-size:13px;color:var(--panel-mute);margin:2px 0 8px}
.tl-what{font-family:var(--serif);font-weight:600;font-size:16px;line-height:1.5;margin-bottom:8px}
.tl-co{font-size:12.5px;color:var(--panel-mute);line-height:1.6}
/* ai flow */
.flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:8px;align-items:stretch}
.node{background:var(--panel-2);border-radius:12px;padding:12px 12px 14px;border-top:4px solid var(--ot);display:flex;flex-direction:column;gap:2px;font-size:13.5px;line-height:1.55}
.node b{font-family:var(--serif);font-size:16px}
.node span{color:var(--panel-mute)}
.node em{font-style:normal;color:var(--gold);font-size:12.5px;margin-top:4px}
.n-design{border-top-color:var(--us)}.n-fab{border-top-color:var(--ea)}.n-pack{border-top-color:var(--ea)}.n-asm{border-top-color:var(--ot)}
.arrow{align-self:center;color:var(--gold);font-size:20px}
.flow-mem{margin-top:14px;display:grid;grid-template-columns:8.2em 1fr;gap:12px;align-items:center}
.mem-label{display:flex;flex-direction:column;font-size:13px;line-height:1.5}
.mem-label span{color:var(--panel-mute);font-size:12px}
.m-1{background:var(--ea)}.m-2{background:var(--us)}.m-3{background:var(--eu)}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-top:20px}
.stats div{border-top:1px solid var(--panel-rule);padding-top:10px}
.stats b{display:block;font-family:var(--disp);font-size:24px;color:var(--gold);line-height:1.2}
.stats span{font-size:12.5px;color:var(--panel-mute);line-height:1.55;display:block;margin-top:4px}
/* china */
.china-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:26px;align-items:center}
.big-pair{display:flex;align-items:center;justify-content:space-around;gap:6px}
.big-pair b{display:block;font-family:var(--disp);font-size:clamp(30px,6vw,42px);line-height:1.1}
.big-pair b.gold{color:var(--gold)}
.big-pair span{font-size:12.5px;color:var(--panel-mute)}
.big-arrow{font-size:26px;color:var(--gold)}
.nb-title{font-size:12.5px;color:var(--panel-mute);margin-bottom:8px}
.nb{display:grid;grid-template-columns:6.4em 1fr 3.6em;gap:10px;align-items:center;margin-bottom:10px;font-size:14px;line-height:1.35}
.nb small{color:var(--panel-mute);font-size:11.5px}
.nb-track{height:14px;background:var(--panel-2);border-radius:7px;overflow:hidden}
.nb-track i{display:block;height:100%;background:var(--cn);border-radius:7px}
.nb-v{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.fund{margin-top:24px;padding-top:14px;border-top:1px solid var(--panel-rule)}
.fund-t{font-size:12.5px;color:var(--panel-mute);margin-bottom:8px}
.fund-items{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.fund-items b{display:block;font-family:var(--disp);font-size:clamp(18px,4vw,24px);color:var(--gold);line-height:1.25}
.fund-items span{font-size:12.5px;color:var(--panel-mute)}
/* who table */
.who-wrap{overflow-x:auto;border-radius:14px;box-shadow:var(--shadow);border:1px solid var(--rule);background:var(--surface)}
table.who{border-collapse:collapse;width:100%;min-width:640px;font-size:14.5px;line-height:1.65}
.who th,.who td{text-align:left;padding:12px 14px;border-bottom:1px solid var(--rule);vertical-align:top}
.who thead th{background:var(--panel);color:#EAF0FA;font-size:13px;letter-spacing:.08em;font-weight:500;white-space:nowrap}
.who tbody th{font-family:var(--serif);font-weight:700;white-space:nowrap}
.who tbody tr:last-child>*{border-bottom:0}
.chip{display:inline-flex;align-items:center;gap:7px;padding:2px 11px 2px 9px;border-radius:999px;font-size:13px;font-weight:500;background:var(--bg);color:var(--ink);white-space:nowrap;border:1px solid var(--rule)}
.chip::before{content:"";width:9px;height:9px;border-radius:50%;background:var(--ot)}
.chip.r-line-us::before{background:var(--us)}.chip.r-line-ea::before{background:var(--ea)}.chip.r-line-eu::before{background:var(--eu)}.chip.r-line-cn::before{background:var(--cn)}
/* note */
.sec.note .prose{background:var(--surface);border:1px solid var(--rule);border-radius:14px;padding:20px 24px 8px;font-size:15px;line-height:1.85}
.sec.note .sec-head{margin-bottom:16px}
.sec.note .sec-head h2{font-size:22px}
/* refs */
.reflist{list-style:none;padding:0;margin:18px 0;display:flex;flex-direction:column;gap:2px;font-size:14px;line-height:1.7}
.reflist li{display:grid;grid-template-columns:2.2em 1fr;gap:6px;padding:10px 12px;border-radius:10px;scroll-margin-top:70px}
.reflist li:target{background:rgba(217,166,33,.18);outline:1px solid var(--gold)}
.rn{font-family:var(--disp);font-weight:700;color:var(--gold-ink);text-align:right}
.reflist a{color:var(--link);word-break:break-all}
.badge{display:inline-block;font-size:11.5px;padding:0 8px;border-radius:999px;margin-right:8px;font-weight:600;line-height:1.7}
.b-prim{background:rgba(79,195,161,.2);color:#1B7A5F}.b-res{background:rgba(91,184,232,.22);color:#1E6C98}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .b-prim{color:#7FE3C3}:root:not([data-theme="light"]) .b-res{color:#8DD3F5}}
:root[data-theme="dark"] .b-prim{color:#7FE3C3}:root[data-theme="dark"] .b-res{color:#8DD3F5}
/* cta */
.cta{margin:56px 0 8px;display:grid;grid-template-columns:minmax(0,240px) 1fr;gap:28px;align-items:center;background:linear-gradient(160deg,#14284D,#0B1730);color:#F4F7FD;border-radius:18px;padding:26px;box-shadow:var(--shadow);border:1px solid #2A3C66}
.cta-poster{width:100%;height:auto;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.45);display:block}
.cta-eyebrow{font-size:11.5px;letter-spacing:.2em;color:#D9A621;font-weight:500}
.cta-title{font-family:var(--disp);font-size:clamp(34px,6vw,46px);font-weight:700;margin:6px 0 8px;line-height:1.1}
.cta-title em{color:#E3B53C;font-style:italic}
.cta-date{font-family:var(--serif);font-size:20px;font-weight:700;margin:0 0 4px;line-height:1.5}
.cta-venue{margin:0 0 14px;color:#B7C5E0;font-size:15px;line-height:1.7}
.cta-note{font-size:14px;line-height:1.8;color:#C9D6EE;margin:0 0 18px}
.cta-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
.btn{display:inline-block;padding:11px 22px;border-radius:999px;background:#D9A621;color:#101A2E;font-weight:700;text-decoration:none;font-size:15px;line-height:1.3}
.btn:hover{background:#E8B93A}
.btn.ghost{background:transparent;color:#F4F7FD;border:1px solid #4A5E8C;font-weight:500}
.btn.ghost:hover{background:#1B2F58}
.cta-qr{display:flex;align-items:center;gap:12px;font-size:12.5px;color:#B7C5E0;line-height:1.6}
.cta-qr img{background:#fff;padding:6px;border-radius:8px;width:96px;height:96px}
.foot{padding-block:40px 64px;color:var(--muted);font-size:13px;line-height:1.8;text-align:center}
.foot a{color:var(--muted)}
@media (max-width:720px){
  body{font-size:16.5px}
  .bar-row{grid-template-columns:1fr;gap:4px}
  .flow{grid-template-columns:1fr}.arrow{transform:rotate(90deg);justify-self:center}
  .flow-mem{grid-template-columns:1fr}
  .china-grid{grid-template-columns:1fr}
  .cta{grid-template-columns:1fr}.cta-poster{max-width:280px;margin-inline:auto}
  .panel{padding:20px 16px}
  .sec-head{gap:12px}
}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
"""

JS = r"""
(function(){
  var bar=document.getElementById('bar');
  function onScroll(){var h=document.documentElement;var m=h.scrollHeight-h.clientHeight;bar.style.width=(m>0?(h.scrollTop/m*100):0)+'%';}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var links=[].slice.call(document.querySelectorAll('.nav a'));
  var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){a.classList.remove('on')});var a=map[e.target.id];if(a){a.classList.add('on');
        var nav=a.parentElement;nav.scrollLeft=a.offsetLeft-nav.clientWidth/2+a.clientWidth/2;}}});},{rootMargin:'-30% 0px -60% 0px'});
    document.querySelectorAll('.sec').forEach(function(s){io.observe(s)});
  }
})();
"""

LOGO = ('<svg viewBox="0 0 240 70" role="img" aria-label="CASPA"><g fill="none" stroke="#D4AF37" stroke-width="2">'
        '<circle cx="35" cy="35" r="25"/><ellipse cx="35" cy="35" rx="12" ry="25"/><path d="M10 35h50M15 23h40M15 47h40"/></g>'
        '<text x="73" y="46" fill="#F8FAFC" font-family="Arial, sans-serif" font-size="34" font-weight="600" letter-spacing="3">CASPA</text></svg>')

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
  <div class="meta"><span><b>阅读约 15 分钟</b></span><span>正文所有数据均附出处，见文末 <b>26 条参考</b></span><span>检索与核对：2026 年 10 月 16 日</span></div>
</div></header>
<nav class="nav" aria-label="章节"><div class="wrap nav-in">{nav}</div></nav>
<main class="wrap">{''.join(sec_html)}</main>
<footer class="foot wrap">CASPA CEO Summit · 2026 年 10 月 23–24 日 · Santa Clara Convention Center<br>
正文所引数据与出处以文末列表为准；峰会嘉宾与议程以官网最新信息为准。</footer>
<script>{JS}</script>
"""
OUT.write_text(page, encoding="utf-8")
print("wrote", OUT, len(page) // 1024, "KB")
