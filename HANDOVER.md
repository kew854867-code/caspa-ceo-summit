# CASPA CEO Summit 官网 — 交接说明（给接手 AI）

> 最后更新：2026-10-04。请先读本文件，再动代码。

## 一、仓库与分支（重要，别搞错）

- 仓库：`https://github.com/kew854867/caspa-ceo-summit`（私有）
- 本地克隆：`/Users/wangke/Desktop/半导体协会`（仓库根）
- **`main` 分支 = 领导（jimmycheng8）做的官网原始版，从未被我们改动，不要动它。**
- **`redesign-v3` 分支 = 新版官网最终状态**。历史已被压缩成 **1 个 commit**（`563afbf`），
  中间所有修改版本记录已删除——不要期待看到多次修改历史。
- 发布（Publish）权限在 **owner: jimmycheng8**；当前账号（kew854867）无 Republish 权限，
  发版必须由领导在 Replit 操作。

## 二、代码位置与构建

- 应用根：`artifacts/caspa-summit/`
- 静态预览稿（可直接打开）：`artifacts/caspa-summit/public/redesign/`
  - `index.html` = 首页；`agenda.html` = 议程；`history.html` = 历年回顾页
  - 样式：`public/redesign/assets/site.css`（静态稿用）与 `public/redesign/rsv3.css`（React 版用）——**两处都要同步改**
- React 真应用（含登录/赞助申请/后台）：`src/`，新版页面组件在 `src/components/redesign/`，
  数据在 `src/data/redesign/`（speakers.ts / sponsors.ts / bios.ts / agenda.ts）
- 构建命令（必须带这 4 个环境变量）：
  ```
  cd artifacts/caspa-summit && PORT=8788 BASE_PATH=/ REPL_ID=local NODE_ENV=production pnpm build
  ```
- 改动后流程：`git add -A && git commit && git push origin redesign-v3`，然后用户/领导在 Replit 点 **Sync Changes** 拉取。

## 三、预览方式

- 本地静态预览：`http://localhost:8765/index.html`（python3 http.server，服务停了用：
  `cd artifacts/caspa-summit/public/redesign && nohup python3 -m http.server 8765 &`）
- Replit 工作区预览：`https://f973dd53-d43b-4e30-8453-daee72096965-00-3danig9m1bwrf.kirk.replit.dev/`（需先 Sync Changes）
- 正式发布版：`https://caspaceosummit.com/` / `https://caspa-summit--jimmycheng8.replit.app/`（等领导 Republish）

## 四、新版页面结构（自上而下）

1. Hero（The CEO Summit / Register now / See the agenda，购票直链 Eventbrite）
2. Featured Speakers（18 位市值最高公司一把手，3 行网格；"See all 40 speakers" 展开全部）
3. About CASPA
4. Sponsors（Crown / Diamond / Platinum / Table sponsors 四档，末尾有金色按钮 **Request the sponsorship deck →**）
5. Partners（Official Media：Reuters→ABC7→EE Times→SemiWiki→NYSE Wired；Alliance：IEEE→GPT.DAO→VIP Club→CEO(Stanford)→SESE→PopPopTech→文字徽章；末尾按钮 **Cover the summit — apply for a media pass →**）
6. History（Past CASPA summits，2023/2024/2025 三个视频卡片，可点击播放）
7. Tickets（Take a seat，$399，Eventbrite 链接）
8. Jimmy 引言（CEO Summit 创始人引言）
9. Footer（CASPA logo + © + 官网/领英链接 + 场馆地址）

## 五、关键约定（已经历多轮返工，务必遵守）

1. **字体已全部本地化**（`public/redesign/assets/fonts/` 8 个 woff2 + fonts.css）。
   **禁止再引入 Google Fonts / 任何外网字体链接**——外网字体加载失败会导致整块文字不渲染（用户环境访问不了 Google Fonts）。React 入口 `index.html`、`src/index.css`、`src/App.tsx` 已全部改为本地 DM Sans，别再改回去。
2. **静态稿（public/redesign）与 React（src）两套必须同步改**，改一处漏一处会出"预览正常、线上不对"的问题。
3. **Partner/赞助商 logo 统一"纯白 + 透明底"**（深色背景上白色显示）。白化时注意别把 logo 文字涂丢（曾丢过 SemiWiki 的 "Semi"、NYSE Wired 全文）。
4. 标题/小标题：**每个单词首字母大写**（Title Case）。
5. 购票统一用 Eventbrite 直链（带 `aff=oddtdtcreator`）。
6. 价格 **$399**（未涨价）。
7. History 导航在 React 里必须用 `<a href="/redesign/history.html" target="_blank">`（wouter 的 Link 不支持 target）。
8. 老登录/账户/赞助后台功能保留在 React 版（Clerk 登录、用户中心、赞助申请弹窗、后台接口），不要删。

## 六、当前状态与剩余事项

- ✅ 全部视觉/内容修改已完成并推送（redesign-v3 = 563afbf）。
- ⏳ **Replit 工作区需要 Sync Changes 拉到 563afbf**（此前 force-push 过，若 Replit 报 diverged/冲突，
  在 Replit Git 面板把本地重置到远端或重新连接 GitHub 分支即可）。
- ⏳ **正式发布需领导（jimmycheng8）Republish**。
- 剩余可做：最终文字校对、发布后验证线上字体/文字显示。
