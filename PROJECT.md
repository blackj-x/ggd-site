# 鹅鸭杀攻略站 — 项目交接文档

> 本文档用于把项目从对话环境迁移到 Claude Code 继续开发。
> 包含：项目背景、已完成内容、技术架构、数据结构、约定规范、待办计划、接手注意事项。
> 最后更新：2026-06-06

---

## 0. 一句话项目定位

为多人社交推理游戏《鹅鸭杀》(Goose Goose Duck) 做的**中文攻略站**，
数据驱动的静态站，主打「角色图鉴 + 地图攻略 + 新手入门」，
面向国内玩家，部署在海外（Cloudflare Pages，不做 ICP 备案），后续靠广告变现。

---

## 1. 关键决策记录（为什么这么做）

| 决策 | 选择 | 理由 |
|---|---|---|
| 技术栈 | Astro 静态站 | SEO 友好（SSG 出纯 HTML）、加载快、每角色独立 URL |
| 数据组织 | JSON 数据驱动 | 角色/地图都是 JSON，改数据即全站更新，加内容不碰页面代码 |
| 设计基调 | 暗色 + 阵营色 + 便当格 | 游戏感 + 信息密度兼顾；阵营色承担信息功能（鹅蓝/鸭红/中立紫） |
| 受众 | 国内玩家为主 | 中文内容、国内黑话术语；但站放海外不备案 |
| 部署 | Cloudflare Pages + GitHub | 连仓库后 push 自动部署；免费 |
| 域名 | gooseduck.metaup.pro | 母域名 metaup.pro（Namecheap 买，DNS 托管 Cloudflare），二级域名分游戏管理 |
| 地图底图 | 原创 SVG 示意图 | 不用游戏截图（版权风险，尤其商业站），自绘抽象图版权干净 |
| 国际化 | 暂缓 | 翻译工作量大、英文市场竞争激烈，框架未搭，仅记录为未来选项 |

---

## 2. 当前完成状态（截至迁移时）

### 已完成 ✅
- **技术骨架**：Astro 项目，干净环境构建通过，70 个页面
- **角色数据**：53 个（鹅 24 / 鸭 22 / 中立 7），基于 Fandom Wiki 2026 核对，字段齐全
- **角色页**：图鉴页（筛选+搜索）+ 53 个独立详情页（含 FAQ + 面包屑结构化数据）
- **地图数据**：12 张全部录入机制特性与文字攻略
- **地图页**：列表页（按主题分组）+ 12 个详情页（SVG 底图 + 可悬浮标注 + 分阵营攻略）
- **新手入门页**：完整内容（核心规则/三阵营/流程/术语表/避坑）
- **SEO**：每页 title/description/canonical/完整 OG+Twitter/社交分享图(PNG)/结构化数据/sitemap/robots/404
- **域名**：已全站配置为 gooseduck.metaup.pro（仅 astro.config.mjs 一处）
- **部署准备**：.gitignore 就绪，依赖已清理（移除临时的 playwright）

### 进行中 / 你接手时的状态 🔶
- **部署**：DNS 已生效，正在走「推 GitHub → Cloudflare Pages 连仓库 → 绑域名」流程
  - 见本项目 DEPLOY.md 和 LAUNCH-CHECKLIST.md

### 未完成（待办，见第 6 节）⬜
- 地图 SVG 示意图：只有 ss-mothergoose（老妈鹅飞船）完整。
  nexus-colony 和 mallard-manor 有标注数据但**还没画 SVG 底图**
- 其余 9 张地图：只有文字攻略，无标注、无底图
- 角色强度梯队 tier：数据留了字段，全部为空
- 进阶话术页：未做
- 广告接入：广告位已预留（占位块），未接真实广告代码

---

## 3. 技术架构

### 目录结构
```
ggd-site/
├─ astro.config.mjs        # 站点配置；site 字段是唯一的域名配置处
├─ package.json            # 依赖只有 astro（干净）
├─ .gitignore
├─ DEPLOY.md               # Cloudflare 部署步骤
├─ LAUNCH-CHECKLIST.md     # 发布检查清单
├─ public/
│  ├─ og-default.svg/png   # 默认社交分享图
│  └─ maps/
│     └─ ss-mothergoose.svg/png   # 地图示意图（SVG 用于页面，PNG 用于 OG）
└─ src/
   ├─ data/
   │  ├─ roles.json         # ★ 角色数据源（53 个）
   │  ├─ roles.ts           # 角色类型定义 + 访问函数
   │  ├─ roles.schema.md    # 角色字段说明
   │  ├─ maps.json          # ★ 地图数据源（12 张）
   │  ├─ maps.ts            # 地图类型定义 + 访问函数
   │  ├─ maps.schema.md     # 地图字段说明
   │  └─ site.ts            # 站点级配置（站名、默认 OG 图等）
   ├─ layouts/
   │  └─ Base.astro         # 全局布局：SEO 头部、导航、页脚
   ├─ components/
   │  ├─ RoleCard.astro     # 角色卡
   │  └─ MapCard.astro      # 地图卡
   ├─ pages/
   │  ├─ index.astro        # 首页（便当格）
   │  ├─ guide.astro        # 新手入门
   │  ├─ roles/index.astro  # 角色图鉴（筛选+搜索）
   │  ├─ roles/[slug].astro # 角色详情（getStaticPaths 生成）
   │  ├─ maps/index.astro   # 地图列表
   │  ├─ maps/[slug].astro  # 地图详情
   │  ├─ 404.astro
   │  ├─ sitemap.xml.js     # 动态生成 sitemap
   │  └─ robots.txt.js      # 动态生成 robots
   └─ styles/
      └─ global.css         # CSS 变量 + 全局样式
```

### 本地开发命令
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产出 dist/
npm run preview  # 预览构建产物
```

### 设计系统（CSS 变量，在 global.css）
```
--bg:#151229     深紫底      --goose:#3ba9ff  鹅=亮蓝
--bg-card:#241f45 卡片       --duck:#ff5470   鸭=亮粉红
--txt:#f3f0ff    主文字      --neutral:#b06bff 中立=亮紫
--txt-dim:#a99fd6 次文字      --accent:#ffd84e  强调黄
```
字体：标题 ZCOOL KuaiLe（快乐体），正文 Noto Sans SC。

---

## 4. 数据结构速查

### 角色 roles.json
顶层：`{ version, updatedAt, camps, roles[] }`
角色字段：`slug`(唯一,做URL,不可改) `name` `nameEn` `aliases[]` `camp`(goose/duck/neutral)
`icon` `difficulty`(1-3) `canKill` `canVote` `summary` `winCondition` `ability`
`tips[]` `tags[]` `tier`(空,待填) `maps[]` `relations`(可选) `updatedAt`
完整说明见 `src/data/roles.schema.md`。

### 地图 maps.json
顶层：`{ version, updatedAt, annotationTypes, maps[] }`
地图字段：`slug` `name` `nameEn` `theme` `size`(small/medium/large) `summary`
`image`(可选,SVG路径) `imageW/H` `features`(机制对象) `annotations[]`(标注点)
`strategy`(分阵营) `tips[]` `updatedAt`
标注坐标用**百分比 0-100**（不绑像素，换底图不错位）。
标注类型：task/killspot/blindspot/vent/meeting/hide/dispose/hazard/jail
完整说明见 `src/data/maps.schema.md`。

---

## 5. 重要约定（改东西前必读）

1. **slug 一经发布不可更改** —— 改了旧链接失效、伤 SEO。
2. **域名只在 astro.config.mjs 的 `site` 字段配置** —— 改它，sitemap/canonical/OG/robots 全自动更新。
3. **加角色/地图 = 往 JSON 加一条** —— 详情页、列表、sitemap 自动生成，不碰页面代码。
4. **标注坐标用百分比** —— 画 SVG 时坐标和 maps.json 的 x/y 要对应。
5. **OG 分享图用 PNG** —— 微信/FB 不渲染 SVG 缩略图；页面内底图可用 SVG。
6. **数据有 updatedAt 字段** —— 游戏更新频繁，带数值的技能（冷却等）要定期对游戏内核对。

---

## 6. 待办计划（按优先级）

### P0 — 完成部署（进行中）
- 推 GitHub → Cloudflare Pages 连仓库（Framework: Astro, Build: `npm run build`, Output: `dist`, 加环境变量 NODE_VERSION=20）
- 绑定 gooseduck.metaup.pro
- Google/Bing Search Console 提交 sitemap
- 详细步骤见 DEPLOY.md / LAUNCH-CHECKLIST.md

### P1 — 内容填充（上线后持续，这是攻略站真正的护城河）
- **热门地图 SVG 示意图**：优先 basement(地下室,新手图)、nexus-colony(已有标注数据缺图)、mallard-manor(已有标注数据缺图)
  - 参考已完成的 public/maps/ss-mothergoose.svg 的画法
  - 流程：查该图舱室布局 → 画原创 SVG（用站点 CSS 变量配色）→ 在 maps.json 填 image 路径和 annotations 百分比坐标 → 生成 PNG 版供 OG
- **新手入门已完成**，可考虑做**进阶话术页**（发言模板、盘逻辑技巧）
- **角色强度梯队 tier**：给每个角色标 T0/T1/T2/T3，做强度榜。
  ⚠ 这是主观内容，最好由实际玩家判断，AI 只能给参考草稿

### P2 — 数据维护
- 角色技能按游戏版本号定期复查（每条有 updatedAt）
- 补充略过的活动限定角色（万圣节木乃伊/吸血鬼/村民、鸡肉晚餐迷彩鸭/鸡等），
  改 build_roles.py（注：该脚本在对话环境，CC 上需重新创建或直接编辑 roles.json）

### P3 — 变现
- 流量起来后申请 Google AdSense（需要内容量+流量门槛）
- 广告位已预留固定尺寸（728×90 顶部 / 300×600 侧栏），接入时把 .ad 占位块换成广告代码

### 未来选项（暂缓）
- 国际化 i18n：子路径 /en/ 结构 + hreflang，但翻译工作量大，需评估
- 母域名 metaup.pro 做游戏攻略导航页，扩展其他游戏二级站

---

## 7. 接手注意事项（CC 环境特有）

1. **数据生成脚本在 scripts/ 目录**：`scripts/build_roles.py` 和 `scripts/build_maps.py`
   是当初生成 roles.json / maps.json 的脚本，已归入项目。批量改数据时可编辑脚本后重跑
   （`python3 scripts/build_roles.py` 会重新生成 src/data/roles.json，注意脚本里的输出路径
   可能需要调整为 src/data/）。也可以直接手编辑 JSON，JSON 本身是完整可用的。

2. **截图验证用的是 playwright**：之前验证页面效果用 playwright headless 截图，
   已从 package.json 移除（避免拖慢 Cloudflare 构建）。CC 上如需可视化验证可重新装。

3. **内容准确性**：角色技能是 2026 年初 Fandom Wiki 快照，鹅鸭杀更新勤，
   带数值的技能（忍者三倍冷却、复仇者10秒窗口等）上线前最好抽查。

4. **地图示意图是原创抽象图**，非游戏截图（版权安全），布局为示意非像素级复刻。

5. **不要用游戏官方截图做底图** —— 商业站 + 接广告会削弱合理使用抗辩，坚持自绘 SVG。

---

## 8. 部署后验证清单
- [ ] 首页、角色页、地图页、新手入门都能打开
- [ ] gooseduck.metaup.pro HTTPS 正常（SSL 证书签发）
- [ ] /sitemap.xml 和 /robots.txt 可访问且域名正确
- [ ] 移动端无横向溢出（之前验证过 380px 正常）
- [ ] Google「富媒体结果测试」验证角色/地图页结构化数据
- [ ] Search Console 提交 sitemap
