# 发布检查清单（Launch Checklist）

构建状态：✅ 70 页全部生成，零构建错误，零控制台错误，移动端无溢出。

---

## A. 发布前必做（需要你操作）

### 1. 买域名 + 填进配置
- [ ] 购买域名
- [ ] 改 `astro.config.mjs` 里的 `site: 'https://你的域名'`
  （这是**唯一**要改域名的地方，sitemap / canonical / OG / robots 全自动更新）
- [ ] 重新 `npm run build`

### 2. 部署到 Cloudflare Pages
详见 `DEPLOY.md`。最快路径：
- [ ] 项目推到 GitHub
- [ ] Cloudflare → Pages → 连接仓库
- [ ] 构建命令 `npm run build`，输出目录 `dist`，Node 版本 20
- [ ] 绑定自定义域名

### 3. 提交搜索引擎
- [ ] Google Search Console 添加站点，提交 `/sitemap.xml`
- [ ] Bing Webmaster Tools 提交 sitemap
- [ ] （可选）百度资源平台 —— 注意无备案海外站收录慢，已知代价

---

## B. 已完成（无需操作）

- ✅ 数据驱动：53 角色 + 12 地图，改 JSON 即全站更新
- ✅ 每个角色/地图独立静态 URL
- ✅ SEO：title / description / canonical / 完整 OG+Twitter / 社交分享图(PNG)
- ✅ 结构化数据：WebSite(首页)、FAQPage+BreadcrumbList(角色)、Article+BreadcrumbList(地图)
- ✅ sitemap.xml + robots.txt（构建时按域名自动生成）
- ✅ 404 页面、theme-color、图片 lazy-load
- ✅ 响应式：移动端无横向溢出
- ✅ 广告位预留：固定尺寸防 CLS（728×90 / 300×600）

---

## C. 上线后可持续补充（不阻塞发布）

- [ ] 其余 11 张地图的 SVG 示意图 + 标注（`build_maps.py` 里加，热门图优先）
- [ ] 新手入门页（`/guide` 目前是占位）
- [ ] 角色强度梯队 `tier`（数据里已留字段，待你按实战填）
- [ ] 角色数据按游戏版本复查（每条有 `updatedAt`，留意带数值的技能）
- [ ] 广告接入（流量起来后申请 AdSense，把 `.ad` 占位换成广告代码）
- [ ] 进阶话术页

---

## D. 内容准确性提醒

- 角色技能基于 Fandom Wiki 2026 快照，鹅鸭杀更新频繁，上线前最好对游戏内描述抽查一遍
- 地图示意图是**原创抽象图**（非游戏截图），版权安全；布局为示意，非像素级复刻
- 略过的活动限定角色（万圣节/鸡肉晚餐等）如需补充，改 `build_roles.py`
