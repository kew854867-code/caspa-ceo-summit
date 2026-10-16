"""Build a WeChat-editor-friendly version: inline styles only, plain tags, images as separate numbered files."""
import re, html, shutil, os
from pathlib import Path
import markdown
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MD = (ROOT / "chip-world-map-article.md").read_text(encoding="utf8")
OUT = ROOT / "wechat"; IMG = OUT / "images"
shutil.rmtree(IMG, ignore_errors=True); IMG.mkdir(parents=True)

from playwright.sync_api import sync_playwright
SHOTS = Path("/tmp/wechat_shots"); shutil.rmtree(SHOTS, ignore_errors=True); SHOTS.mkdir(parents=True)
with sync_playwright() as pw:
    br = pw.chromium.launch(executable_path="/opt/pw-browsers/chromium", args=["--no-sandbox"])
    pg = br.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=3)
    pg.goto("file://" + str(ROOT / "chip-world-map-article.html")); pg.wait_for_timeout(1500)
    pg.evaluate("document.querySelectorAll('img').forEach(i=>i.loading='eager')")
    pg.evaluate("window.scrollTo(0,document.body.scrollHeight)"); pg.wait_for_timeout(2500); pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(1000)
    pg.add_style_tag(content=".nav,#bar{display:none!important} body{background:#fff} .hero{margin:0} .sec-head{background:#fff;padding:6px 0}")
    for key, sel in [("hero", "header.hero")] + [(f"s{n}", f"#s{n} .sec-head") for n in range(0, 9)] + [("info", "#info")]:
        el = pg.query_selector(sel)
        if el: el.screenshot(path=str(SHOTS / f"{key}.png"))
        else: print("missing", sel)
    br.close()

BASE = os.environ.get("IMG_BASE", "images/")
GOLD, INK, MUTED = "#B8860B", "#222222", "#888888"
order = []   # (number, filename, caption)

def add_image(src, label, caption, w=1080, plain=False):
    n = len(order) + 1
    name = f"{n:02d}-{label}"
    p = Path(src) if str(src).startswith('/') else ROOT / src
    im = Image.open(p)
    if im.width > w: im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    if src.endswith(".png"):
        fn = name + ".png"; im.save(IMG / fn)
    else:
        fn = name + ".jpg"; im.convert("RGB").save(IMG / fn, quality=88)
    order.append((n, fn, caption))
    if plain:
        return f'<p style="margin:{"0 0 14px" if label.startswith("heading") else "0 0 18px"};"><img src="{BASE}{fn}" alt="{html.escape(caption)}" style="width:100%;"></p>'
    return (f'<p style="text-align:center;margin:18px 0 6px;"><img src="{BASE}{fn}" alt="图{n:02d}　{html.escape(caption)}" style="width:100%;"></p>'
            f'<p style="text-align:center;font-size:12px;color:{MUTED};margin:0 0 18px;line-height:1.6;">图{n:02d}　{html.escape(caption)}</p>')

def cites(s):
    s = re.sub(r"\[\[(\d+)\]\]", lambda m: f"@@{m.group(1)}@@", s)
    return s

PHOTOS = {
 "一": ("assets/photos/bell-1948.jpg", "bell-labs", "巴丁、肖克利、布拉顿，晶体管的三位发明者，贝尔实验室。AT&T 新闻照片，公有领域 [40]"),
 "二": ("assets/photos/toshiba-1m-dram.jpg", "toshiba-dram", "东芝 1M DRAM 芯片，1980 年代。图片来源：日本半导体历史馆 [43]"),
 "三": ("assets/photos/morris-chang.jpg", "morris-chang", "张忠谋，2011 年。图片来源：IEEE 工程与技术史 Wiki [44]"),
 "四": ("assets/photos/samsung-early-dram.jpg", "samsung-dram", "三星半导体事业的起点，是 64Kb DRAM。图片来源：三星新闻中心 [45]"),
 "五": ("assets/photos/asml-hq.jpg", "asml-hq", "ASML 总部，荷兰费尔德霍芬，2008 年。摄影：A. Ansems，公有领域 [42]"),
 "六": ("assets/photos/smic-building.jpg", "smic", "中芯国际厂区外墙。图片来源：凤凰网 [46]"),
 "七": ("assets/photos/nvidia-hq.jpg", "nvidia-hq", "英伟达总部 Voyager 大楼。图片来源：NVIDIA 新闻中心 [32]"),
 "八": ("assets/photos/summit-poster.jpg", "summit-poster", "CASPA 第 35 届年会 · The CEO Summit 官方海报"),
}

fm_end = MD.split("---", 2)[2]
parts = re.split(r"^## ", fm_end, flags=re.M)
body = []
title = "一颗芯片的世界地图"
body.append(add_image(str(SHOTS / "hero.png"), "title-block", "顶部标题区", plain=True))

def md2(s):
    s = cites(s)
    h = markdown.markdown(s, extensions=["sane_lists"])
    h = re.sub(r"(?:@@\d+@@)+", lambda m: '<sup style="color:#9A7410;font-size:11px;">' + ",".join(re.findall(r"\d+", m.group(0))) + "</sup>", h)
    h = h.replace("<p>", f'<p style="font-size:16px;line-height:1.85;color:{INK};margin:0 0 16px;text-align:justify;">')
    h = h.replace("<li>", f'<li style="font-size:15px;line-height:1.8;color:{INK};margin-bottom:6px;">')
    h = h.replace("<ul>", '<ul style="padding-left:20px;margin:0 0 16px;">').replace("<ol>", '<ol style="padding-left:22px;margin:0 0 16px;">')
    h = h.replace("<strong>", '<strong style="color:#111;">')
    h = re.sub(r'<a href="([^"]+)">', r'<a href="\1" style="color:#9A7410;">', h)
    return h

for p in parts[1:]:
    head, _, rest = p.partition("\n"); head = head.strip(); rest = rest.strip()
    m = re.match(r"^(序|[一二三四五六七八])　(.*)$", head)
    if head.startswith("参考与出处"):
        body.append(f'<h2 style="font-size:20px;color:{INK};border-left:4px solid {GOLD};padding-left:10px;margin:34px 0 14px;">参考资料及图片来源</h2>')
        intro, _, lst = rest.partition("\n1.")
        lst, _, extra = ("1." + lst).partition("\n延伸阅读")
        body.append('<p style="font-size:12px;color:#999;margin:0 0 6px;">向下滑动，阅读全文 ↓</p>')
        body.append('<section style="max-height:260px;overflow-y:auto;-webkit-overflow-scrolling:touch;border:1px solid #E6E2D3;border-radius:10px;padding:12px 14px;background:#FCFBF7;margin:0 0 18px;">')
        body.append(f'<p style="font-size:12px;line-height:1.7;color:{MUTED};margin:0 0 10px;">{html.escape(intro.strip())}</p>')
        for n, t in re.findall(r"^(\d+)\.\s+(.*)$", lst, re.M):
            t = html.escape(t, quote=False)
            t = re.sub(r"&lt;(https?://[^&\s]+?)&gt;", lambda mm: mm.group(1), t)
            t = re.sub(r"\*([^*]+)\*", r"\1", t)
            body.append(f'<p style="font-size:12px;line-height:1.7;color:#666;margin:0 0 6px;word-break:break-all;">[{n}] {t}</p>')
        if extra: body.append(f'<p style="font-size:12px;line-height:1.7;color:#666;">延伸阅读{html.escape(extra.strip())}</p>')
        body.append('</section>')
        continue
    if head.startswith("数据说明"):
        body.append(f'<h2 style="font-size:20px;color:{INK};border-left:4px solid {GOLD};padding-left:10px;margin:34px 0 14px;">数据说明</h2>')
        body.append('<p style="font-size:12px;color:#999;margin:0 0 6px;">向下滑动，阅读全文 ↓</p>'); body.append('<section style="max-height:260px;overflow-y:auto;-webkit-overflow-scrolling:touch;border:1px solid #E6E2D3;border-radius:10px;padding:12px 14px;background:#FCFBF7;margin:0 0 18px;">'); body.append(md2(rest).replace('font-size:16px','font-size:13px')); body.append('</section>'); continue
    num = m.group(1) if m else None
    shown = head.replace("　", " ")
    sid = "s0" if head.startswith("序") else None
    if num and num != "序": sid = "s" + str("一二三四五六七八".index(num) + 1)
    body.append(add_image(str(SHOTS / f"{sid}.png"), f"heading-{sid}", f"章节标题：{shown}", plain=True))
    if num in PHOTOS:
        src, lab, cap = PHOTOS[num]
        c = re.sub(r"\s*\[(\d+)\]$", r" [\1]", cap)
        body.append(add_image(src, lab, c))
    # placeholders
    segs = re.split(r"(\{\{[A-Z_]+\}\})", rest)
    for seg in segs:
        if seg == "{{FIG_CHAIN}}":
            names = ["设计", "设计工具与 IP", "制造", "设备与材料", "封装与测试", "存储", "系统与数据中心"]
            for i, nm in enumerate(names, 1):
                body.append(add_image(f"figures/link-{i}.png", f"block-{i}", f"板块 {i}：{nm}"))
        elif seg == "{{FIG_TIMELINE}}":
            body.append(add_image("figures/timeline.png", "timeline", "八个关键节点：从 1947 年到今天，每一步由谁推动"))
        elif seg == "{{FIG_CHINA}}":
            body.append(add_image("figures/china.png", "china-equipment", "2025 年，各地区半导体设备销售额（亿美元）与同比变化 [12]"))
        elif seg == "{{FIG_AI}}":
            body.append(add_image("figures/ai.png", "nvidia-supply-chain", "英伟达披露的主要供应链伙伴（公司整体披露，不代表某一型号的固定生产路线）[18]"))
        elif seg == "{{ROOM}}":
            body.append(add_image("assets/photos/summit-room.jpg", "eight-sectors", "八大板块，同在一个现场"))
        elif seg == "{{INFO}}":
            body.append(add_image(str(SHOTS / "info.png"), "info-card", "报名信息卡片", plain=True))
            body.append(f'<p style="font-size:14px;line-height:1.8;color:{INK};">报名链接：<a href="https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-the-ceo-summit-tickets-1994631439329?discount=CC15OFF" style="color:#9A7410;">点击报名</a>（公众号中请放在“阅读原文”里）　官网：caspaceosummit.com</p>')
        elif seg.strip():
            body.append(md2(seg))

html_out = ('<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            '<title>一颗芯片的世界地图（公众号排版版）</title></head><body style="margin:0;background:#f4f4f4;">'
            '<div style="max-width:680px;margin:0 auto;padding:12px 16px;font:14px/1.6 sans-serif;color:#555;">'
            '<button id="cp" style="font-size:16px;padding:10px 18px;background:#07C160;color:#fff;border:0;border-radius:6px;">一键复制全文（粘贴到公众号编辑器）</button> '
            '<span id="msg" style="margin-left:8px;"></span><br>粘贴后请检查图片是否都已显示；若某张图没有出现，用下方“图片清单”里同编号的文件手动上传。</div>'
            '<div id="article" style="max-width:680px;margin:0 auto;background:#fff;padding:20px 16px;font-family:-apple-system,BlinkMacSystemFont,\'PingFang SC\',\'Helvetica Neue\',sans-serif;">'
            + "\n".join(body) + "</div>"
            '<script>document.getElementById("cp").onclick=function(){var el=document.getElementById("article");var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r);var ok=false;try{ok=document.execCommand("copy")}catch(e){}document.getElementById("msg").textContent=ok?"已复制，去公众号编辑器粘贴":"请手动全选后复制"}</script>'
            '<div style="max-width:680px;margin:0 auto;padding:12px 16px;font:13px/1.8 sans-serif;color:#666;"><b>图片清单（若粘贴后某张图缺失，用同编号文件手动上传）</b><br>'
            + "<br>".join(f'<a href="{BASE}{fn}" target="_blank">{n:02d}　{fn}</a>　{html.escape(cap)}' for n, fn, cap in order) + "</div>"
            "</body></html>")
(OUT / "article-wechat.html").write_text(html_out, encoding="utf8")
(OUT / "images-order.txt").write_text("\n".join(f"{n:02d}  {fn}  {cap}" for n, fn, cap in order), encoding="utf8")
print("images:", len(order), "html KB:", len(html_out)//1024)
