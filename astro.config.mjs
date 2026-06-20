import { defineConfig } from 'astro/config';

// 全站域名唯一配置处 —— sitemap/canonical/OG/robots 全部由 site 字段生成
export default defineConfig({
  site: 'https://gooseduck.metaup.pro',
  // 显式声明尾部斜杠策略：与当前 canonical（/roles/xxx/ 等）和 dist 目录输出一致
  // sitemap、内链、面包屑全部统一使用带尾斜杠形式（首页为 /）
  trailingSlash: 'always',

  // 强制绑定 127.0.0.1，避免虚拟网卡/VPN 干扰导致无法访问或绑定错接口
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
});
