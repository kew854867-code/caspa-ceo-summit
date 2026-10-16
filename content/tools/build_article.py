#!/usr/bin/env python3
"""Build the white, clean HTML article from chip-world-map-article.md.

Usage: python3 build_article.py <out.html>
All figure numbers are copied from the sources cited in each caption.
"""
import html, re, sys
from pathlib import Path
import markdown

ROOT = Path(__file__).resolve().parent.parent
MD = (ROOT / "chip-world-map-article.md").read_text(encoding="utf-8")
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "chip-world-map-article.html"

TICKET_URL = ("https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-"
              "the-ceo-summit-tickets-1994631439329?discount=CC15OFF")


def cite(*ns):
    return "".join(f'<sup class="cite"><a href="#ref-{n}">{n}</a></sup>' for n in ns)


# ------------------------------------------------------------- figures
CHAIN = [
    ("设计", "决定芯片做什么、怎么做", "英伟达等无晶圆设计公司",
     "美国公司占 2025 年全球半导体销售额的 53.4%", (3,), "#2F6FDF"),
    ("设计工具与 IP", "画图纸用的软件，和可以复用的标准件", "新思科技、铿腾电子（Cadence）、西门子 EDA、Arm",
     "新思科技 2025 财年营收 70.54 亿美元，同比约 +15%", (32,), "#7A5AF8"),
    ("制造", "把图纸刻在硅片上", "台积电、三星、中芯国际",
     "台积电占 2026 年二季度全球代工营收的 72.5%", (17,), "#D99A00"),
    ("设备", "造芯片工厂的机器，包括光刻机", "ASML、应用材料、泛林集团、东京电子、KLA",
     "2025 年全球设备市场 1,362 亿美元，ASML 营收 275 亿美元居首", (24,), "#E4572E"),
    ("封装与测试", "把裸片变成能用的产品，先进封装是 AI 芯片的关键一步", "CoWoS 先进封装，鸿海、纬创、Fabrinet 等承包商",
     "英伟达用 CoWoS 做封装，组装与测试交给承包商", (16,), "#14A38B"),
    ("存储", "芯片的记忆", "三星、SK 海力士、美光、长鑫存储",
     "2026 年二季度 HBM 份额：SK 海力士 50%、三星 33%、美光 18%", (12,), "#F08A24"),
    ("系统与数据中心", "最终买单的人", "云厂商、服务器厂商",
     "英伟达 2026 年 5–7 月季度数据中心收入 890 亿美元，同比 +117%", (27,), "#5B6B8C"),
]


def fig_chain():
    out = ['<figure class="fig" id="fig-chain"><div class="fig-title">一颗芯片的七个环节</div>'
           '<div class="fig-sub">每个环节的代表公司，和最新一期的数据</div><ol class="chain">']
    for i, (name, what, who, data, refs, color) in enumerate(CHAIN, 1):
        out.append(
            f'<li style="--c:{color}"><span class="dot" aria-hidden="true">{i}</span>'
            f'<div class="ch-body"><div class="ch-h"><b>{name}</b><span>{what}</span></div>'
            f'<div class="ch-who">{who}</div><div class="ch-data">{data}{cite(*refs)}</div></div></li>')
    out.append('</ol><figcaption>图 1　产业链七个环节与各环节的最新数据（2025–2026 年）。统计口径与出处见各角标。</figcaption></figure>')
    return "".join(out)


TIMELINE = [
    ("1947–1959", "美国", "us", "发明晶体管与集成电路", "贝尔实验室 · 德州仪器 · 仙童", (4, 5)),
    ("1971", "美国", "us", "第一款商用微处理器", "英特尔 4004", (7,)),
    ("1980 年代", "日本", "ea", "存储领跑，后期占全球半导体市场 52%", "日本电气 · 日立等", (9,)),
    ("1987–1990", "台湾 · 英国", "ea", "设计与制造分工", "台积电 · Arm", (14, 15)),
    ("1992", "韩国", "ea", "DRAM 接棒", "三星电子", (11,)),
    ("2010–2026", "荷兰", "eu", "EUV 光刻机：从原型机到年出货约 65 台", "ASML", (19, 22)),
    ("2026", "美 · 台 · 韩", "us", "AI 需求推动 8 月单月销售额达 1,597 亿美元", "英伟达 · 台积电 · SK 海力士", (2,)),
    ("2025–2026", "中国大陆", "cn", "设备投入 493 亿美元，居全球首位", "中芯国际 · 华虹 · 长鑫存储", (13,)),
]


def fig_timeline():
    out = ['<figure class="fig" id="fig-timeline"><div class="fig-title">决定今天分工的八个节点</div>'
           '<div class="fig-sub">按时间顺序，颜色代表推动者所在的地区</div>'
           '<div class="legend"><span><i class="sw k-us"></i>美国</span><span><i class="sw k-ea"></i>日本、韩国、台湾</span>'
           '<span><i class="sw k-eu"></i>欧洲</span><span><i class="sw k-cn"></i>中国大陆</span></div><ol class="tl">']
    for when, who, reg, what, cos, refs in TIMELINE:
        out.append(f'<li class="tl-card c-{reg}"><div class="tl-when">{when}</div><div class="tl-who">{who}</div>'
                   f'<div class="tl-what">{what}{cite(*refs)}</div><div class="tl-co">{cos}</div></li>')
    out.append('</ol><figcaption>图 2　八个关键节点。1980 年代的份额为日本厂商在全球半导体市场的份额；2010–2026 年指 ASML 从第一台 EUV 原型机到 2026 年预计出货。</figcaption></figure>')
    return "".join(out)


def fig_ai():
    return f'''<figure class="fig" id="fig-ai"><div class="fig-title">一块 AI 加速器，经过哪些手</div>
<div class="fig-sub">以英伟达披露的供应链为例，数据为 2026 年最新一期</div>
<div class="flow">
  <div class="node" style="--c:#2F6FDF"><b>设计</b><span>英伟达（美国）</span></div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="node" style="--c:#D99A00"><b>晶圆代工</b><span>台积电 · 三星</span><em>台积电占二季度全球代工营收 72.5%{cite(17)}</em></div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="node" style="--c:#14A38B"><b>先进封装</b><span>CoWoS</span></div>
  <div class="arrow" aria-hidden="true">→</div>
  <div class="node" style="--c:#5B6B8C"><b>组装测试</b><span>鸿海 · 纬创 · Fabrinet</span></div>
</div>
<div class="flow-mem">
  <div class="mem-label"><b>HBM 内存</b><span>2026 年二季度营收份额{cite(12)}</span></div>
  <div class="bar" role="img" aria-label="HBM 份额：SK 海力士 50%，三星 33%，美光 18%">
    <span class="seg" style="flex:50;background:#F08A24">SK 海力士 50%</span><span class="seg" style="flex:33;background:#2F6FDF;color:#fff">三星 33%</span><span class="seg" style="flex:18;background:#14A38B">美光 18%</span>
  </div>
</div>
<div class="stats">
  <div><b>1,597 亿美元</b><span>2026 年 8 月全球半导体销售额，同比 +144.3%{cite(2)}</span></div>
  <div><b>+305%</b><span>2026 年上半年存储同比增速，逻辑为 +45%{cite(25)}</span></div>
  <div><b>962 亿美元</b><span>英伟达 5–7 月季度营收，同比 +106%{cite(27)}</span></div>
  <div><b>402 亿美元</b><span>台积电二季度营收，同比 +33.7%{cite(18)}</span></div>
</div>
<figcaption>图 3　供应链环节取自英伟达 2026 财年 10-K。{cite(16)} HBM 份额为研究机构估算，四舍五入后合计可能不是 100%。</figcaption></figure>'''


EQUIP = [("中国大陆", 49.3, "-0.5%"), ("台湾", 31.5, "+90%"), ("韩国", 25.8, "+26%"),
         ("北美", 10.9, "-20%"), ("日本", 9.5, "+22%"), ("其他地区", 5.2, "+25%"), ("欧洲", 2.9, "-41%")]


def fig_china():
    # values are in billions; show as 亿美元 = x10
    rows = "".join(
        f'<div class="eq-row{" hl" if n == "中国大陆" else ""}"><span class="eq-n">{n}</span>'
        f'<div class="eq-track"><i style="width:{v / 49.3 * 100:.1f}%"></i></div>'
        f'<span class="eq-v">{v * 10:.0f}</span><span class="eq-g">{g}</span></div>' for n, v, g in EQUIP)
    return f'''<figure class="fig" id="fig-china"><div class="fig-title">2025 年，钱花在哪里</div>
<div class="fig-sub">各地区半导体设备销售额（亿美元）与同比变化{cite(13)}</div>
<div class="eq">{rows}</div>
<div class="tiles">
  <div><b>30.06 亿美元</b><span>中芯国际 2026 年二季度营收，同比 +36.1%{cite(28)}</span></div>
  <div><b>3 家</b><span>二季度全球晶圆代工前十中的中国大陆企业：中芯国际、华虹集团、晶合集成{cite(17)}</span></div>
  <div><b>约 10%</b><span>长鑫存储占 2026 年二季度全球 DRAM 营收{cite(12)}</span></div>
  <div><b>约 20%</b><span>中国大陆占 ASML 2026 年全年净销售额的预期比例{cite(22)}</span></div>
  <div><b>3,440 亿元</b><span>“大基金”三期注册资本，2024 年 5 月成立{cite(31)}</span></div>
  <div><b>+131.3%</b><span>2026 年 8 月中国市场半导体销售额同比增速{cite(2)}</span></div>
</div>
<figcaption>图 4　设备销售额来自 SEMI，同比为 2025 年相对 2024 年的变化。“其他地区”为 SEMI 口径的 Rest of World。</figcaption></figure>'''


WHO = [
    ("发明晶体管与集成电路", "美国", "us", "贝尔实验室、德州仪器、仙童", "2025 年美国公司占全球半导体销售额 53.4%，为 1984 年以来最高", (3,)),
    ("从微处理器到 AI 芯片", "美国", "us", "英特尔、英伟达", "英伟达 2026 年 5–7 月季度营收 962 亿美元，同比 +106%", (27,)),
    ("存储领跑", "日本", "ea", "日本电气、日立等", "1993 年被美国反超，份额降至 20% 左右；东京电子居 2025 年设备厂商前五", (9, 24)),
    ("设计与制造分工", "台湾、英国", "ea", "台积电、Arm", "台积电占 2026 年二季度全球代工营收 72.5%", (17,)),
    ("存储接棒", "韩国", "ea", "三星电子、SK 海力士", "DRAM：三星 38%、SK 海力士 25%；HBM：SK 海力士 50%", (12,)),
    ("光刻", "荷兰", "eu", "ASML", "预计 2026 年出货约 65 台低数值孔径 EUV，EUV 系统销售额增长超过 45%", (22,)),
    ("AI 时代", "美、台、韩", "us", "英伟达、台积电、SK 海力士", "2026 年 8 月全球半导体销售额 1,597 亿美元，同比 +144.3%", (2,)),
    ("新变量", "中国大陆", "cn", "中芯国际、华虹、长鑫存储", "2025 年设备投入 493 亿美元，居全球首位；代工第三，份额 5.4%", (13, 17)),
]


def fig_who():
    out = ['<figure class="fig" id="fig-who"><div class="fig-title">谁推动了什么，今天站在哪里</div>'
           '<div class="who-wrap"><table class="who"><thead><tr><th>转折</th><th>来自哪里</th><th>代表公司</th><th>今天的位置</th></tr></thead><tbody>']
    for a, b, reg, c, d, refs in WHO:
        out.append(f'<tr><th scope="row">{a}</th><td><span class="chip c-{reg}">{b}</span></td><td>{c}</td><td>{d}{cite(*refs)}</td></tr>')
    out.append('</tbody></table></div><figcaption>表 1　数据年份不同：历史节点取当时数据，“今天的位置”取 2025–2026 年最新数据。</figcaption></figure>')
    return "".join(out)


def info():
    return f'''<aside class="info" id="info"><div class="info-h">CASPA 第 35 届年会 · The CEO Summit</div>
<dl><div><dt>时间</dt><dd>2026 年 10 月 23–24 日</dd></div>
<div><dt>地点</dt><dd>Santa Clara Convention Center，美国加州圣塔克拉拉</dd></div>
<div><dt>官网</dt><dd><a href="https://caspaceosummit.com" target="_blank" rel="noopener">caspaceosummit.com</a></dd></div></dl>
<a class="btn" href="{TICKET_URL}" target="_blank" rel="noopener">报名参会</a></aside>'''


FIGS = {"{{FIG_CHAIN}}": fig_chain, "{{FIG_TIMELINE}}": fig_timeline, "{{FIG_AI}}": fig_ai,
        "{{FIG_CHINA}}": fig_china, "{{FIG_WHO}}": fig_who, "{{INFO}}": info}

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
            f'<section class="sec refs" id="refs"><div class="sec-head"><h2>{html.escape(head)}</h2></div>'
            f'<div class="prose"><p>{html.escape(intro)}</p></div><ol class="reflist">{"".join(lis)}</ol>'
            f'<div class="prose"><p>延伸阅读{html.escape(extra.strip())}</p></div></section>')
        toc.append(("refs", "参考与出处"))
        continue
    num, _, title = head.partition("　")
    if not title:
        num, title = "", head
    sid = f"s{i}"
    cls = "sec note" if head.startswith("数据说明") else "sec"
    if head.startswith("数据说明"):
        num, title = "", head
    numhtml = f'<span class="num">{html.escape(num)}</span>' if num else ""
    sec_html.append(
        f'<section class="{cls}" id="{sid}"><div class="sec-head">{numhtml}<h2>{html.escape(title)}</h2></div>'
        f'<div class="prose">{md2html(rest)}</div></section>')
    toc.append((sid, (f"{num} {title}" if num else title).strip()))

nav = "".join(f'<a href="#{a}">{html.escape(b)}</a>' for a, b in toc)

CSS = r"""
:root{
  color-scheme:light;
  --bg:#FFFFFF; --ink:#16191F; --muted:#5C6370; --rule:#E7E9EE; --soft:#F6F7F9;
  --gold:#C99A1D; --gold-ink:#8A6508; --link:#16191F;
  --us:#2F6FDF; --ea:#D99A00; --eu:#14A38B; --cn:#E4572E;
  --serif:'Noto Serif SC','Songti SC','STSong','Source Han Serif SC','WenQuanYi Zen Hei',serif;
  --sans:'Noto Sans SC','PingFang SC','Microsoft YaHei','Source Han Sans SC','WenQuanYi Zen Hei',system-ui,sans-serif;
  --disp:'Playfair Display','Noto Serif SC',Georgia,serif;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:60px}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.95;-webkit-font-smoothing:antialiased}
.wrap{max-width:720px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
#bar{position:fixed;left:0;top:env(safe-area-inset-top,0px);height:3px;width:0;background:var(--gold);z-index:30}
/* hero */
.hero{padding-block:48px 40px;border-bottom:1px solid var(--rule)}
.brand{display:flex;align-items:center;gap:10px;margin-bottom:56px}
.brand svg{height:30px;width:auto}
.eyebrow{letter-spacing:.2em;font-size:12px;color:var(--gold-ink);text-transform:uppercase;font-weight:500}
.hero h1{font-family:var(--serif);font-weight:700;font-size:clamp(40px,9vw,72px);line-height:1.15;margin:14px 0 16px;text-wrap:balance}
.hero .sub{font-family:var(--serif);font-size:clamp(18px,3.2vw,22px);line-height:1.65;color:var(--muted);margin:0;max-width:28em}
.rule{width:56px;height:3px;background:var(--gold);margin:26px 0 18px;border:0}
.meta{font-size:13.5px;color:var(--muted);line-height:1.7}
/* nav */
.nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border-bottom:1px solid var(--rule)}
.nav-in{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;padding-block:6px}
.nav-in::-webkit-scrollbar{display:none}
.nav a{white-space:nowrap;font-size:13.5px;color:var(--muted);text-decoration:none;padding:6px 12px;border-radius:999px;line-height:1.4}
.nav a:hover{color:var(--ink)}
.nav a.on{color:var(--ink);background:var(--soft);font-weight:500}
/* sections */
.sec{padding-block:52px 4px}
.sec-head{display:flex;align-items:baseline;gap:16px;margin-bottom:20px}
.num{font-family:var(--serif);font-weight:700;font-size:clamp(40px,8vw,56px);line-height:1;color:var(--gold);min-width:1.1em}
.sec h2{font-family:var(--serif);font-weight:700;font-size:clamp(24px,5vw,30px);line-height:1.4;margin:0;text-wrap:balance}
.prose p{margin:0 0 1.15em}
.prose strong{font-weight:700}
.prose ul{padding-left:1.2em;margin:0 0 1.2em}
.prose li{margin-bottom:.45em}
.prose li::marker{color:var(--gold)}
.prose a{color:var(--link);text-decoration-color:var(--gold);text-underline-offset:3px}
sup.cite{font-size:.66em;line-height:0;margin-left:1px;vertical-align:super}
sup.cite a{color:var(--gold-ink);text-decoration:none;font-weight:600;padding:0 1px}
sup.cite a:hover{background:var(--gold);color:#fff;border-radius:3px}
/* figures */
.fig{margin:36px 0}
.fig-title{font-family:var(--serif);font-size:21px;font-weight:700;line-height:1.4}
.fig-sub{font-size:13.5px;color:var(--muted);margin:2px 0 16px;line-height:1.6}
figcaption{font-size:12.5px;line-height:1.75;color:var(--muted);margin-top:12px}
.legend{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:12.5px;color:var(--muted);margin-bottom:14px}
.legend .sw{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}
.k-us{background:var(--us)}.k-ea{background:var(--ea)}.k-eu{background:var(--eu)}.k-cn{background:var(--cn)}
/* chain */
.chain{list-style:none;margin:0;padding:0;position:relative}
.chain::before{content:"";position:absolute;left:17px;top:18px;bottom:18px;width:2px;background:linear-gradient(180deg,#2F6FDF,#7A5AF8,#D99A00,#E4572E,#14A38B,#F08A24,#5B6B8C);border-radius:2px}
.chain li{position:relative;display:grid;grid-template-columns:36px 1fr;gap:16px;padding:6px 0 18px}
.chain li:last-child{padding-bottom:0}
.dot{position:relative;z-index:1;width:36px;height:36px;border-radius:50%;background:var(--c);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 0 0 4px #fff}
.ch-body{background:color-mix(in srgb,var(--c) 7%,#fff);border:1px solid color-mix(in srgb,var(--c) 22%,#fff);border-radius:12px;padding:12px 16px 12px;line-height:1.7}
.ch-h{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px}
.ch-h b{font-family:var(--serif);font-size:18px;color:var(--c)}
.ch-h span{font-size:13.5px;color:var(--muted)}
.ch-who{font-size:14.5px;margin-top:2px}
.ch-data{font-size:13.5px;margin-top:6px;padding-top:6px;border-top:1px dashed color-mix(in srgb,var(--c) 35%,#fff);color:var(--ink)}
/* timeline */
.tl{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.tl-card{background:#fff;border:1px solid var(--rule);border-top:4px solid var(--ot,#aab);border-radius:12px;padding:14px 16px 16px}
.c-us{border-top-color:var(--us)}.c-ea{border-top-color:var(--ea)}.c-eu{border-top-color:var(--eu)}.c-cn{border-top-color:var(--cn)}
.tl-when{font-family:var(--disp);font-size:20px;font-weight:700;letter-spacing:.02em}
.tl-who{font-size:13px;color:var(--muted);margin:1px 0 8px}
.tl-what{font-family:var(--serif);font-weight:600;font-size:15.5px;line-height:1.55;margin-bottom:8px}
.tl-co{font-size:12.5px;color:var(--muted);line-height:1.6}
/* ai flow */
.flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:8px;align-items:stretch}
.node{background:color-mix(in srgb,var(--c) 7%,#fff);border:1px solid color-mix(in srgb,var(--c) 25%,#fff);border-top:4px solid var(--c);border-radius:12px;padding:12px 12px 14px;display:flex;flex-direction:column;gap:2px;font-size:13.5px;line-height:1.55}
.node b{font-family:var(--serif);font-size:16px;color:var(--c)}
.node span{color:var(--muted)}
.node em{font-style:normal;color:var(--ink);font-size:12.5px;margin-top:4px}
.arrow{align-self:center;color:var(--gold);font-size:20px}
.flow-mem{margin-top:16px;display:grid;grid-template-columns:9em 1fr;gap:12px;align-items:center}
.mem-label{display:flex;flex-direction:column;font-size:13.5px;line-height:1.5}
.mem-label span{color:var(--muted);font-size:12px}
.bar{display:flex;height:32px;border-radius:8px;overflow:hidden;gap:2px}
.seg{display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:600;color:#14161B;min-width:0;white-space:nowrap;overflow:hidden}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:20px}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:22px}
.stats div,.tiles div{background:var(--soft);border-radius:12px;padding:12px 14px}
.stats b,.tiles b{display:block;font-family:var(--disp);font-size:22px;line-height:1.25;color:var(--ink)}
.stats span,.tiles span{display:block;font-size:12.5px;color:var(--muted);line-height:1.6;margin-top:4px}
/* equipment bars */
.eq{display:flex;flex-direction:column;gap:9px}
.eq-row{display:grid;grid-template-columns:5.2em 1fr 3.2em 3.4em;gap:10px;align-items:center;font-size:14px}
.eq-track{height:16px;background:var(--soft);border-radius:8px;overflow:hidden}
.eq-track i{display:block;height:100%;background:#B9C0CD;border-radius:8px}
.eq-row.hl .eq-track i{background:var(--cn)}
.eq-row.hl .eq-n,.eq-row.hl .eq-v{font-weight:700}
.eq-v{text-align:right;font-variant-numeric:tabular-nums}
.eq-g{font-size:12.5px;color:var(--muted);text-align:right;font-variant-numeric:tabular-nums}
/* who table */
.who-wrap{overflow-x:auto;margin-top:12px;border:1px solid var(--rule);border-radius:12px}
table.who{border-collapse:collapse;width:100%;min-width:660px;font-size:14.5px;line-height:1.65}
.who th,.who td{text-align:left;padding:12px 14px;border-bottom:1px solid var(--rule);vertical-align:top}
.who thead th{background:var(--soft);color:var(--muted);font-size:12.5px;letter-spacing:.08em;font-weight:500;white-space:nowrap}
.who tbody th{font-family:var(--serif);font-weight:700;white-space:nowrap}
.who tbody tr:last-child>*{border-bottom:0}
.chip{display:inline-flex;align-items:center;gap:7px;padding:2px 11px 2px 9px;border-radius:999px;font-size:13px;font-weight:500;border:1px solid var(--rule);white-space:nowrap}
.chip::before{content:"";width:9px;height:9px;border-radius:50%;background:#aab}
.chip.c-us::before{background:var(--us)}.chip.c-ea::before{background:var(--ea)}.chip.c-eu::before{background:var(--eu)}.chip.c-cn::before{background:var(--cn)}
/* info */
.info{margin:40px 0 8px;border:1px solid var(--rule);border-radius:14px;padding:22px 24px;background:#fff}
.info-h{font-family:var(--serif);font-weight:700;font-size:20px;margin-bottom:12px}
.info dl{margin:0 0 16px}
.info dl div{display:grid;grid-template-columns:3.2em 1fr;gap:10px;padding:4px 0;font-size:15.5px;line-height:1.7}
.info dt{color:var(--muted)}.info dd{margin:0}
.info a{color:var(--ink);text-decoration-color:var(--gold);text-underline-offset:3px}
.btn{display:inline-block;padding:10px 24px;border-radius:999px;background:var(--ink);color:#fff!important;font-weight:700;text-decoration:none!important;font-size:15px;line-height:1.4}
.btn:hover{background:#2B303A}
/* note */
.sec.note .prose{background:var(--soft);border-radius:12px;padding:18px 22px 6px;font-size:14.5px;line-height:1.85}
.sec.note .sec-head h2{font-size:20px}
/* refs */
.refs h2{font-size:22px}
.reflist{list-style:none;padding:0;margin:16px 0;display:flex;flex-direction:column;gap:2px;font-size:13.5px;line-height:1.7}
.reflist li{display:grid;grid-template-columns:2.2em 1fr;gap:6px;padding:9px 10px;border-radius:8px;scroll-margin-top:70px}
.reflist li:target{background:#FFF6DC;outline:1px solid var(--gold)}
.rn{font-family:var(--disp);font-weight:700;color:var(--gold-ink);text-align:right}
.reflist a{color:var(--muted);word-break:break-all}
.badge{display:inline-block;font-size:11.5px;padding:0 8px;border-radius:999px;margin-right:8px;font-weight:600;line-height:1.7}
.b-prim{background:#E2F5EF;color:#0E7A64}.b-res{background:#E5EEFB;color:#2457B3}
.foot{padding-block:40px 64px;color:var(--muted);font-size:13px;line-height:1.8;text-align:center;border-top:1px solid var(--rule);margin-top:48px}
@media (max-width:720px){
  body{font-size:16.5px}
  .flow{grid-template-columns:1fr}.arrow{transform:rotate(90deg);justify-self:center}
  .flow-mem{grid-template-columns:1fr}
  .eq-row{grid-template-columns:4.6em 1fr 2.8em 3.2em;gap:8px;font-size:13px}
  .tiles{grid-template-columns:repeat(2,1fr)}
  .sec-head{gap:12px}
}
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

LOGO = ('<svg viewBox="0 0 240 70" role="img" aria-label="CASPA"><g fill="none" stroke="#C99A1D" stroke-width="2.4">'
        '<circle cx="35" cy="35" r="25"/><ellipse cx="35" cy="35" rx="12" ry="25"/><path d="M10 35h50M15 23h40M15 47h40"/></g>'
        '<text x="73" y="46" fill="#16191F" font-family="Arial, sans-serif" font-size="34" font-weight="600" letter-spacing="3">CASPA</text></svg>')

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
  <div class="meta">阅读约 15 分钟　·　全文数据均为 2025–2026 年最新统计，附 35 条出处　·　2026 年 10 月 16 日</div>
</div></header>
<nav class="nav" aria-label="章节"><div class="wrap nav-in">{nav}</div></nav>
<main class="wrap">{''.join(sec_html)}</main>
<footer class="foot wrap">CASPA CEO Summit · 2026 年 10 月 23–24 日 · Santa Clara Convention Center<br>
正文数据与出处以文末列表为准；峰会嘉宾与议程以官网最新信息为准。</footer>
<script>{JS}</script>
"""
OUT.write_text(page, encoding="utf-8")
print("wrote", OUT, len(page) // 1024, "KB")
