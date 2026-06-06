# 鹅鸭杀地图数据结构 (maps schema)

地图攻略页从 `maps.json` 渲染。与角色数据不同，地图的核心是
**底图 + 底图上的坐标标注**（任务点、刀点、盲区等），因此多了一套归一化坐标系统。

设计要点：
- 标注坐标统一用 **百分比 0–100**（相对底图宽高），不绑定像素尺寸 ——
  换高清底图、响应式缩放都不会错位。
- 标注按 **类型** 分类，类型驱动颜色与图标（与角色阵营色同一套思路）。
- 底图 **可选**：没图也能先上结构化文字攻略，有图了再补标注，渐进式。

## 顶层结构

```jsonc
{
  "version": "数据版本，跟随游戏版本",
  "updatedAt": "YYYY-MM-DD",
  "annotationTypes": { ...标注类型元数据，见下 },
  "maps": [ ...地图数组 ]
}
```

## 标注类型 annotationTypes

驱动地图上每个标记点的颜色和图标。

```jsonc
"annotationTypes": {
  "task":    { "name": "任务点",   "color": "#3ba9ff", "icon": "📋" },
  "killspot":{ "name": "刀点",     "color": "#ff5470", "icon": "🔪" },
  "blindspot":{"name": "视野盲区", "color": "#b06bff", "icon": "🌫️" },
  "vent":    { "name": "通风口",   "color": "#ffd84e", "icon": "🕳️" },
  "meeting": { "name": "会议按钮", "color": "#4ade80", "icon": "🔔" },
  "hide":    { "name": "藏身点",   "color": "#94a3b8", "icon": "🫥" },
  "dispose": { "name": "藏尸点",   "color": "#a855f7", "icon": "⚰️" },
  "hazard":  { "name": "陷阱/危险","color": "#fb923c", "icon": "⚠️" },
  "jail":    { "name": "监狱",     "color": "#64748b", "icon": "🔒" }
}
```

## 单张地图字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `slug` | string | ✅ | 唯一标识兼 URL（/maps/{slug}）。一经发布不可改 |
| `name` | string | ✅ | 中文名（国内通用译名） |
| `nameEn` | string | ✅ | 英文原名 |
| `aliases` | string[] |  | 别名/俗称，进搜索 |
| `theme` | string | ✅ | 主题分类：太空 / 维多利亚 / 丛林 / 沙漠 / 嘉年华 等 |
| `size` | enum | ✅ | `small` / `medium` / `large`，影响节奏与打法 |
| `summary` | string | ✅ | 一句话地图特点（卡片用） |
| `image` | string |  | 底图路径。无则页面只显示文字攻略 |
| `imageW` | int |  | 底图原始宽（仅记录用，标注用百分比不依赖它） |
| `imageH` | int |  | 底图原始高 |
| `features` | object | ✅ | 地图机制特性，见下 |
| `annotations` | Annotation[] |  | 坐标标注数组，见下 |
| `strategy` | object |  | 分阵营文字攻略，见下 |
| `tips` | string[] |  | 通用要点 |
| `updatedAt` | string |  | 该地图数据最后核对日期 |

### features（机制特性，决定打法与选图）

```jsonc
"features": {
  "hasVents": true,          // 是否有通风管（鸭子机动关键）
  "hasCCTV": false,          // 是否有监控
  "hasJail": true,           // 是否有监狱/平票关押机制
  "hasPreTask": false,       // 是否有前置任务（部分太空图/嘉年华）
  "dayNight": false,         // 是否有昼夜循环
  "corruption": false,       // 是否启用腐化机制
  "disposalAreas": 2,        // 藏尸点数量（0 表示无）
  "mapSabotages": ["死亡陷阱"], // 地图专属破坏/危险
  "hideSpots": ["树叶", "柜子"] // 藏身点形式（无通风管的图常有）
}
```

### Annotation（单个坐标标注）

```jsonc
{
  "type": "killspot",        // 对应 annotationTypes 的 key
  "x": 62.5,                 // 横向百分比 0–100（相对底图宽）
  "y": 40.0,                 // 纵向百分比 0–100（相对底图高）
  "label": "电力室",          // 点位名称
  "note": "死角无监控，落单常在此被秒"  // 可选，悬浮/点击说明
}
```

### strategy（分阵营文字攻略，可后填）

```jsonc
"strategy": {
  "goose": ["任务尽量结伴，避免落单进死角", "..."],
  "duck":  ["利用通风管在A区和电力室之间游走找单", "..."],
  "neutral": ["鹈鹕优先在封闭房间吞人", "..."]
}
```

## 维护约定
- 新地图上线：往 `maps` 数组追加一条，填全必填字段即可，前端自动出现
- 先上文字、后补底图标注：`image` 留空也能发布，后续补 `image` + `annotations`
- 标注坐标始终用百分比；换底图无需重标（除非布局变化）
- `slug` 一经发布不可更改
```
