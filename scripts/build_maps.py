# -*- coding: utf-8 -*-
import json

M=[]
def add(**k):
    k.setdefault("aliases",[])
    k.setdefault("annotations",[])
    k.setdefault("tips",[])
    k.setdefault("strategy",{})
    k.setdefault("updatedAt","2026-06-06")
    M.append(k)

def feat(vents=False,cctv=False,jail=True,pretask=False,dn=False,corrupt=False,
         disposal=0,sabos=None,hides=None):
    return {"hasVents":vents,"hasCCTV":cctv,"hasJail":jail,"hasPreTask":pretask,
            "dayNight":dn,"corruption":corrupt,"disposalAreas":disposal,
            "mapSabotages":sabos or [],"hideSpots":hides or []}

# ===== 太空主题 =====
add(slug="nexus-colony", name="星枢殖民地", nameEn="Nexus Colony",
    aliases=["太空站","星际殖民地"], theme="太空", size="medium",
    summary="经典太空站，狭窄通道与环形房间交错，有运输舱通往独立坞区。",
    features=feat(vents=True,cctv=True,pretask=True,
                  sabos=["反应堆","氧气","通讯"],hides=[]),
    annotations=[
      {"type":"meeting","x":50,"y":48,"label":"中央会议按钮","note":"位于地图中心，紧急会议在此召集"},
      {"type":"task","x":22,"y":30,"label":"上层电力室","note":"接线任务集中区，注意落单"},
      {"type":"task","x":78,"y":62,"label":"医疗室","note":"扫描任务，单人停留时间长易被刀"},
      {"type":"killspot","x":16,"y":68,"label":"下层走廊死角","note":"无监控覆盖，鸭子常在此卡视野单杀"},
      {"type":"vent","x":34,"y":44,"label":"中部通风口","note":"连接上下层，鸭子快速转移"},
      {"type":"blindspot","x":85,"y":20,"label":"独立坞区","note":"仅运输舱可达，进去前确认同行者身份"}
    ],
    strategy={
      "goose":["任务尽量结伴，下层死角和独立坞区不要单独进","记住监控覆盖范围，沿监控路线走更安全","反应堆/氧气破坏要立刻分两路去修"],
      "duck":["利用中部通风口在上下层之间游走找单","把目标引向下层走廊死角再卡视野","破坏氧气逼鹅分散，制造单杀机会"],
      "neutral":["鹈鹕在独立坞区吞人最隐蔽","猎鹰可借太空服伪装混入任务流"]
    },
    tips=["有前置任务，开局先解锁任务列表","太空图有监控，刀人前先看监控位置"])

add(slug="black-swan", name="黑天鹅号", nameEn="Black Swan",
    aliases=["黑天鹅"], theme="太空", size="large",
    summary="大型太空船，路线长、人流分散，节奏偏慢，冷门但适合伏击。",
    features=feat(vents=True,cctv=True,pretask=True,sabos=["反应堆","氧气"]),
    tips=["地图大人易散，鹅方更要主动抱团","冷门图，多数人不熟点位，先看小地图"])

add(slug="ss-mothergoose", name="鹅妈妈号", nameEn="S.S. Mother Goose",
    aliases=["母鹅号","老妈鹅飞船"], theme="太空", size="large",
    summary="基于 Among Us 经典布局的太空母舰，横向动线，货舱气闸是核心陷阱杀。",
    image="/maps/ss-mothergoose.svg", imageW=800, imageH=460,
    features=feat(vents=True,cctv=True,pretask=True,
                  sabos=["灯光","反应堆","门","通讯/生命维持","货舱气闸陷阱"]),
    annotations=[
      {"type":"meeting","x":50,"y":50,"label":"娱乐室 会议按钮","note":"中央钢琴旁的桌上，紧急会议在此召集"},
      {"type":"task","x":13,"y":33,"label":"电力室","note":"灯光破坏点，接线任务集中，狭窄易被堵"},
      {"type":"task","x":13,"y":67,"label":"反应堆","note":"反应堆破坏需两人同按，落单进来很危险"},
      {"type":"task","x":30,"y":78,"label":"孵化室","note":"生命维持破坏点，偏僻死角"},
      {"type":"task","x":72,"y":30,"label":"舰桥","note":"通讯破坏点 + 气闸操纵杆，鸭子拉杆触发陷阱"},
      {"type":"vent","x":40,"y":40,"label":"安保室通风口","note":"连接监控室，鸭子常用此快速转移"},
      {"type":"task","x":40,"y":33,"label":"安保室","note":"监控所在，可远程看人，刀前先确认无人盯监控"},
      {"type":"hazard","x":85,"y":67,"label":"货舱 气闸陷阱","note":"站在货舱可能被吸出太空！鸭子可借此无冷却杀人，非任务别久留"},
      {"type":"killspot","x":85,"y":50,"label":"货舱死角","note":"远离主动线、无人经过，气闸+单杀双重危险"},
      {"type":"blindspot","x":30,"y":62,"label":"下层走廊","note":"长走廊视野盲区，鸭子卡视野单杀高发"}
    ],
    strategy={
      "goose":["货舱没任务就别进，气闸陷阱可无冷却秒杀","记住监控在安保室，做任务时可请人盯监控","反应堆/生命维持破坏要立刻两路分头去修，别全挤一处","走长走廊尽量结伴，别落单"],
      "duck":["把目标往货舱引，用气闸陷阱杀人不算刀且可隐藏","下层长走廊卡视野单杀，杀完从安保室通风口转移","拉舰桥操纵杆前先确认货舱有人","破坏灯光制造黑暗趁机动手"],
      "neutral":["鹈鹕在货舱或孵化室等封闭死角吞人最隐蔽","猎鹰可借太空服伪装混入任务流，注意别因不投票露馅"]
    },
    tips=["货舱气闸是本图标志性陷阱杀，新手最易中招","有只能通过通风管进入的密室","采用率偏低，熟点位的人优势明显"])

# ===== 维多利亚主题 =====
add(slug="mallard-manor", name="野鸭庄园", nameEn="Mallard Manor",
    aliases=["庄园","绿头鸭庄园"], theme="维多利亚", size="medium",
    summary="阴暗庄园，无通风管，但可藏身树叶与柜子，室内外动线分明。",
    features=feat(vents=False,cctv=False,disposal=0,
                  hides=["树叶","柜子"]),
    annotations=[
      {"type":"meeting","x":50,"y":52,"label":"大厅会议铃","note":"庄园中央大厅"},
      {"type":"task","x":28,"y":70,"label":"庭院任务区","note":"室外修破坏点，视野开阔较安全"},
      {"type":"hide","x":70,"y":34,"label":"二楼柜子","note":"无通风管图的藏身点，可蹲守或躲刀"},
      {"type":"killspot","x":18,"y":40,"label":"侧厅拐角","note":"无监控、视野遮挡多，单杀高发"},
      {"type":"hide","x":40,"y":78,"label":"庭院树叶","note":"可藏身，鸭子也可借此伏击"}
    ],
    strategy={
      "goose":["没有通风管，看到有人凭空消失高度可疑","室外庭院视野好，优先在外做任务","注意柜子和树叶里可能藏着鸭"],
      "duck":["利用树叶/柜子藏身伏击，没风管要靠走位","把目标引到侧厅拐角等遮挡区","无监控，刀法相对自由但要做好不在场"],
      "neutral":["鹈鹕在二楼封闭房间吞人不易被发现"]
    },
    tips=["全图无通风管，凭空消失=可疑","可藏身树叶和柜子，搜身时留意"])

add(slug="goosechapel", name="鹅教堂", nameEn="Goosechapel",
    aliases=["教堂"], theme="维多利亚", size="medium",
    summary="夜晚的维多利亚伦敦村落，多建筑与小巷，南侧临水，工程师可长期藏身。",
    features=feat(vents=True,cctv=False,hides=["建筑内","小巷"]),
    tips=["小巷多、易制造单独相处","工程师在本图可长期藏匿，注意防范"])

add(slug="basement", name="地下室", nameEn="The Basement",
    aliases=["地窖"], theme="维多利亚", size="small",
    summary="小型封闭地下室，节奏快、遭遇频繁，工程师可长期藏身。",
    features=feat(vents=True,cctv=False),
    tips=["图小节奏快，刀法频繁，发言信息密度高","工程师可长期藏匿在隐蔽点"])

add(slug="bloodhaven", name="血港", nameEn="Bloodhaven",
    aliases=[], theme="维多利亚", size="medium",
    summary="维多利亚黑暗港湾，含昼夜循环与腐化机制，两处藏尸区与专属破坏。",
    features=feat(vents=True,cctv=False,dn=True,corrupt=True,disposal=2,
                  sabos=["巴士","专属破坏"]),
    tips=["有昼夜循环与腐化，注意腐化扩散","两处藏尸区，报尸前留意尸体可能被转移"])

# ===== 其他主题 =====
add(slug="jungle-temple", name="丛林神庙", nameEn="Jungle Temple",
    aliases=["神庙","丛林"], theme="丛林", size="medium",
    summary="丛林古庙，鸭子可激活死亡陷阱（如滚石），瞬间清掉路过玩家。",
    features=feat(vents=True,cctv=False,sabos=["死亡陷阱","滚石"]),
    tips=["小心鸭子激活的死亡陷阱，别在陷阱通道久留","陷阱致死不算刀，排查时别误判"])

add(slug="ancient-sands", name="古代沙地", nameEn="Ancient Sands",
    aliases=["沙漠","古沙"], theme="沙漠", size="large",
    summary="古埃及沙漠遗迹，有沙暴机制与禁忌通道，部分角色为本图专属。",
    features=feat(vents=True,cctv=True,sabos=["沙暴"]),
    tips=["沙暴期间室外视野受限，注意走位","街头顽童/追踪者为本图专属角色"])

add(slug="eagleton-springs", name="鹰镇温泉", nameEn="Eagleton Springs",
    aliases=["鹰镇"], theme="小镇", size="medium",
    summary="小镇温泉度假地，较新地图，动线与机制需实战熟悉。",
    features=feat(vents=True,cctv=False),
    tips=["较新地图，多数人点位不熟，先摸清动线"])

add(slug="the-carnival", name="嘉年华", nameEn="The Carnival",
    aliases=["游乐场","狂欢节"], theme="嘉年华", size="medium",
    summary="热闹游乐园，有监控、对讲机与前置任务，含本图专属角色。",
    features=feat(vents=True,cctv=True,pretask=True),
    tips=["有监控与对讲机，刀前先确认监控","科学家为嘉年华专属角色"])

add(slug="mallardon", name="哥斯拉镇", nameEn="Mallardon",
    aliases=["怪兽镇","哥斯拉"], theme="怪兽", size="large",
    summary="巨型怪兽主题地图，可用望远镜观察远处，角落适合鸭/鹈鹕动手。",
    features=feat(vents=True,cctv=True,sabos=["怪兽事件"]),
    tips=["可用望远镜随时观察远处，但视角是角落","角落隐蔽，适合伏击也要防伏击"])

out={
  "version":"2.x（基于 Fandom Wiki 2026 核对，共12图）",
  "updatedAt":"2026-06-06",
  "annotationTypes":{
    "task":    {"name":"任务点","color":"#3ba9ff","icon":"📋"},
    "killspot":{"name":"刀点","color":"#ff5470","icon":"🔪"},
    "blindspot":{"name":"视野盲区","color":"#b06bff","icon":"🌫️"},
    "vent":    {"name":"通风口","color":"#ffd84e","icon":"🕳️"},
    "meeting": {"name":"会议按钮","color":"#4ade80","icon":"🔔"},
    "hide":    {"name":"藏身点","color":"#94a3b8","icon":"🫥"},
    "dispose": {"name":"藏尸点","color":"#a855f7","icon":"⚰️"},
    "hazard":  {"name":"陷阱/危险","color":"#fb923c","icon":"⚠️"},
    "jail":    {"name":"监狱","color":"#64748b","icon":"🔒"}
  },
  "maps":M
}

slugs=[m["slug"] for m in M]
assert len(slugs)==len(set(slugs)),"slug 重复"
with open("src/data/maps.json","w",encoding="utf-8") as f:
    json.dump(out,f,ensure_ascii=False,indent=2)

from collections import Counter
print("地图总数:",len(M))
print("主题分布:",dict(Counter(m["theme"] for m in M)))
print("已带标注的图:",[m["slug"] for m in M if m["annotations"]])
print("slug 唯一: True")
