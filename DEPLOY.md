# 部署到 Cloudflare Pages

## 一、准备
本项目是 Astro 静态站，构建产物在 `dist/`，纯静态，适合 Cloudflare Pages 免费托管。

## 二、买域名后唯一要改的地方
全站域名只在一处配置 —— `astro.config.mjs`：

```js
export default defineConfig({
  site: 'https://你的域名.com',   // ← 改这里，sitemap/canonical/OG 全部自动更新
  ...
});
```

robots.txt、sitemap.xml、所有页面的 canonical 和 OG 标签都从这个值生成，改完重新部署即可。

## 三、Cloudflare Pages 部署步骤

### 方式 A：连 Git 仓库（推荐，自动部署）
1. 把项目推到 GitHub / GitLab
2. Cloudflare 控制台 → Workers & Pages → Create → Pages → 连接仓库
3. 构建配置：
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 18 或更高（环境变量 `NODE_VERSION=20`）
4. 保存并部署。之后每次 push 自动重新构建。

### 方式 B：直接上传 dist（手动）
1. 本地 `npm install && npm run build`
2. Cloudflare Pages → Upload assets → 拖入 `dist/` 整个文件夹

## 四、绑定自定义域名
1. Pages 项目 → Custom domains → Set up a domain
2. 按提示把域名 DNS 指向 Cloudflare（如果域名也在 Cloudflare 买的会更顺）
3. 绑定后改 `astro.config.mjs` 的 `site` 为正式域名，重新部署

## 五、部署后必做的 SEO 动作
1. **Google Search Console**：添加站点 → 提交 `https://你的域名/sitemap.xml`
2. **Bing Webmaster Tools**：同样提交 sitemap
3. 用 Google「富媒体结果测试」验证角色页/地图页的结构化数据
4. 国内搜索引擎收录：百度搜索资源平台（注意百度对无备案的海外站收录较慢，这是放海外的已知代价）

## 六、广告接入（流量起来后）
- 预留的广告位在各页 `.ad` 容器，已是固定尺寸（防 CLS）
- AdSense：审核需要站点有一定内容量和流量，建议角色/地图内容填充完整后再申请
- 接入时把 `.ad` 占位块替换成广告代码即可，尺寸已对齐（728×90 / 300×600）
