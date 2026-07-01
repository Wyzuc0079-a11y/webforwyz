export type ProjectItem = {
  id: string;
  name: string;
  thumb: string;
  ballPos: { x: number; y: number; z: number };
  titles?: { cn: string; en: string; jp: string };
};

export type PortfolioCategory = {
  key: string;
  routeSuffix: string;
  detailPrefix: string;
  title: string;
  navBackLabel: string;
  eyebrow: string;
  modelPath: string;
  introCn: string[];
  introEn: string[];
  detailLabel: string;
  detailBody: string;
  projects: ProjectItem[];
};

const DEFAULT_BALL_POSITIONS = [
  { x: 1.8, y: 1.4, z: 4.35 },
  { x: -0.55, y: 0.7, z: 4.15 },
  { x: 1.5, y: 0.3, z: 4.05 },
  { x: -1.65, y: -1.7, z: 3.46 },
  { x: -0.45, y: 2.15, z: 4.5 },
  { x: 1.1, y: -1.05, z: 3.7 },
  { x: -1.56, y: 0.2, z: 3.95 },
  { x: 1.5, y: 0.3, z: 2.5 },
  { x: -0.45, y: 2.15, z: 0 },
  { x: 2, y: -1.2, z: 3.7 },
  { x: -0.61, y: -0.22, z: 0 },
  { x: 0.55, y: -1.85, z: 2.5 },
  { x: -1.7, y: -2.9, z: 3.1 },
  { x: 0.1, y: -0.9, z: 0.5 },
  { x: 1.2, y: -1, z: 0.6 },
];

function makeProjects(prefix: string, letter: string, label: string): ProjectItem[] {
  return DEFAULT_BALL_POSITIONS.map((ballPos, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `${prefix}-project${number}`,
      name: `${label} ${letter}${index + 1}`,
      thumb: `/thumbs/${letter.toLowerCase()}${index + 1}.jpg`,
      ballPos,
      titles: { cn: `${label} ${letter}${index + 1}`, en: `${label} ${letter}${index + 1}`, jp: `${label} ${letter}${index + 1}` },
    };
  });
}

export const CATEGORIES: PortfolioCategory[] = [
  {
    key: "bookdesign",
    routeSuffix: "b",
    detailPrefix: "bookdesign",
    title: "BOOK DESIGN",
    navBackLabel: "BOOK",
    eyebrow: "书籍装帧/書籍デザイン",
    modelPath: "/models/PORTFLIO-B.obj",
    introCn: ["本界面的作品皆为", "由多个具有厚度的平面单元构成", "通过一个或多个旋转轴心连接", "并可在旋转运动过程中形成不同空间状态的集合体。"],
    introEn: ["All works presented in this section", "are assemblages consisting of", "multiple planar elements with measurable thickness,", "connected by one or more", "rotational axes and capable of", "forming different spatial configurations", "through rotational movement."],
    detailLabel: "BOOK DESIGN // DETAILED REPORT",
    detailBody: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的平面排版设计都将在这里以最纯粹、安稳的形式展开深入观察。",
    projects: [
      { id: "bookdesign-project01", name: "『感覚斜行』", thumb: "/thumbs/b1.jpg", ballPos: DEFAULT_BALL_POSITIONS[0], titles: { cn: "『感覚斜行』", en: "Sensation Oblique", jp: "『感覚斜行』" } },
      { id: "bookdesign-project02", name: "『私は』", thumb: "/thumbs/b2.jpg", ballPos: DEFAULT_BALL_POSITIONS[1], titles: { cn: "『私は』", en: "I am", jp: "『私は』" } },
      { id: "bookdesign-project03", name: "『落とし物』", thumb: "/thumbs/b3.jpg", ballPos: DEFAULT_BALL_POSITIONS[2], titles: { cn: "『落とし物』", en: "Lost & Found", jp: "『落とし物』" } },
      { id: "bookdesign-project04", name: "『生活者工房』令和四年", thumb: "/thumbs/b4.jpg", ballPos: DEFAULT_BALL_POSITIONS[3], titles: { cn: "『生活者工房』令和四年", en: "Seikatsusha Kobo 2022", jp: "『生活者工房』令和四年" } },
      { id: "bookdesign-project05", name: "『日本酒の話』", thumb: "/thumbs/b5.jpg", ballPos: DEFAULT_BALL_POSITIONS[4], titles: { cn: "『日本酒の話』", en: "About Sake", jp: "『日本酒の話』" } },
      { id: "bookdesign-project06", name: "『凬々展』記録冊子", thumb: "/thumbs/b6.jpg", ballPos: DEFAULT_BALL_POSITIONS[5], titles: { cn: "『凬凬展』记录册子", en: "KAZE² Record Booklet", jp: "『凬々展』記録冊子" } },
      { id: "bookdesign-project07", name: "『石の裏を覗く』記録冊子", thumb: "/thumbs/b7.jpg", ballPos: DEFAULT_BALL_POSITIONS[6], titles: { cn: "『石の裏を覗く』记录册子", en: "Behind the Stone Booklet", jp: "『石の裏を覗く』記録冊子" } },
      { id: "bookdesign-project08", name: "『字』", thumb: "/thumbs/b8.jpg", ballPos: DEFAULT_BALL_POSITIONS[7], titles: { cn: "『字』", en: "Character", jp: "『字』" } },
      { id: "bookdesign-project09", name: "『良渚』", thumb: "/thumbs/b9.jpg", ballPos: DEFAULT_BALL_POSITIONS[8], titles: { cn: "『良渚』", en: "Liangzhu", jp: "『良渚』" } },
      { id: "bookdesign-project10", name: "『MYTHISTORY』", thumb: "/thumbs/b10.jpg", ballPos: DEFAULT_BALL_POSITIONS[9], titles: { cn: "『MYTHISTORY』", en: "MYTHISTORY", jp: "『MYTHISTORY』" } },
      { id: "bookdesign-project11", name: "『斬蛇』", thumb: "/thumbs/b11.jpg", ballPos: DEFAULT_BALL_POSITIONS[10], titles: { cn: "『斩蛇』", en: "Slaying the Serpent", jp: "『斬蛇』" } },
      { id: "bookdesign-project12", name: "『掃』＆『黒』", thumb: "/thumbs/b12.jpg", ballPos: DEFAULT_BALL_POSITIONS[11], titles: { cn: "『扫』&『黑』", en: "Sweep & Black", jp: "『掃』＆『黒』" } },
      { id: "bookdesign-project13", name: "『环境、气候变动及经济模型与良渚的集落形态』、『绳文时代的意象 宗教与生活』", thumb: "/thumbs/b13.jpg", ballPos: DEFAULT_BALL_POSITIONS[12], titles: { cn: "良渚与绳文", en: "Liangzhu & Jomon", jp: "良渚と縄文" } },
      { id: "bookdesign-project14", name: "Project 14", thumb: "/thumbs/b14.jpg", ballPos: DEFAULT_BALL_POSITIONS[13], titles: { cn: "Project 14", en: "Project 14", jp: "Project 14" } },
      { id: "bookdesign-project15", name: "Project 15", thumb: "/thumbs/b15.jpg", ballPos: DEFAULT_BALL_POSITIONS[14], titles: { cn: "Project 15", en: "Project 15", jp: "Project 15" } },
    ],
  },
  {
    key: "event",
    routeSuffix: "e",
    detailPrefix: "event",
    title: "EXHIBITION / EVENTS",
    navBackLabel: "EVENTS",
    eyebrow: "活动/イベント・活動",
    modelPath: "/models/PORTFLIO-E.obj",
    introCn: ["本界面的作品皆为", "针对特定场域与社群策划的活动实践", "通过展览生成、视觉介入与空间共时", "将转瞬即逝的现场转化为可感知的集体叙事。"],
    introEn: ["All works presented in this section", "are temporal and spatial event practices,", "translating ephemeral interactions and", "site-specific interventions into permanent", "collective narratives."],
    detailLabel: "EVENTS // DETAILED REPORT",
    detailBody: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个特定场域、社群活动与现场实践，都将在这里以最纯粹、安稳的形式展开深入观察。",
    projects: makeProjects("event", "E", "Project"),
  },
  {
    key: "studio",
    routeSuffix: "s",
    detailPrefix: "studio",
    title: "STUDIO ITSELF",
    navBackLabel: "STUDIO",
    eyebrow: "studioitself/スタジオ・イットセルフ",
    modelPath: "/models/PORTFLIO-S.obj",
    introCn: ["本界面的作品皆为", "针对工作坊自身内核与机制的探索", "通过元设计思考、方法论解构与自我审视", "呈现工作室边界演变过程中的核心物证。"],
    introEn: ["All works presented in this section", "are internal systematic explorations of", "the studio's own methodologies, deconstructing", "the mechanisms of self-archiving and", "meta-design creation."],
    detailLabel: "STUDIO ITSELF // DETAILED REPORT",
    detailBody: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个关于工作坊自身内核探索与方法论解构的实验物证，都将在这里以最纯粹、安稳的形式展开深入观察。",
    projects: makeProjects("studio", "S", "Project"),
  },
  {
    key: "graphic",
    routeSuffix: "g",
    detailPrefix: "graphic",
    title: "GRAPHIC DESIGN",
    navBackLabel: "GRAPHIC",
    eyebrow: "平面设计/グラフィックデザイン",
    modelPath: "/models/PORTFLIO-G.obj",
    introCn: ["本界面的作品皆为", "二维媒介中的平面图形与信息阶层重构", "通过版面秩序、图像解构与叙事传达", "探索视觉张力在不同媒介载体中的定格与输出。"],
    introEn: ["All works presented in this section", "are structured graphic practices,", "reinterpreting layout logic, visual communication,", "and informational hierarchy across", "diverse physical and digital formats."],
    detailLabel: "GRAPHIC DESIGN // DETAILED REPORT",
    detailBody: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的版面秩序重建、图像解构与二维视觉传达设计，都将在这里以最纯粹、安稳的形式展开深入观察。",
    projects: [
      { id: "graphic-project01", name: "凬凬展", thumb: "/photo/g/p01/gp001-001.jpg", ballPos: DEFAULT_BALL_POSITIONS[0], titles: { cn: "凬凬展", en: "KAZE²", jp: "凬々展" } },
      { id: "graphic-project02", name: "我们将如何生成，实践，记录咒术", thumb: "/photo/g/p02/gp002-001.jpg", ballPos: DEFAULT_BALL_POSITIONS[1], titles: { cn: "我们将如何生成，实践，记录咒术", en: "How Do We Generate, Practice, and Record Magic?", jp: "私たちはいかに呪術を、生成し、実践し、記録するのか" } },
      { id: "graphic-project03", name: "异乡人与摩托车旅行技艺-4600km", thumb: "/photo/g/p03/gp003-001.png", ballPos: DEFAULT_BALL_POSITIONS[2], titles: { cn: "异乡人与摩托车旅行技艺-4600km", en: "L'Étranger \nand the Motorcycle Journey Arts \n- 4600km", jp: "エトランゼとオートバイ旅行アーツ-4600km" } },
      { id: "graphic-project04", name: "「石の裏を覗く」", thumb: "/photo/g/p04/gp004-001.png", ballPos: DEFAULT_BALL_POSITIONS[3], titles: { cn: "「石の裏を覗く」", en: "Behind the Stone", jp: "「石の裏を覗く」" } },
      { id: "graphic-project05", name: "Project G5", thumb: "/photo/g/p05/gp005-001.png", ballPos: DEFAULT_BALL_POSITIONS[4], titles: { cn: "Project G05", en: "Project G05", jp: "Project G05" } },
      { id: "graphic-project06", name: "ORAe, Taipei", thumb: "/photo/g/p06/gp006-001.png", ballPos: DEFAULT_BALL_POSITIONS[5], titles: { cn: "ORAe 台北建筑建材及产品展", en: "ORAe, Taipei Building Show", jp: "ORAe, 台北建築建材及び産品展" } },
      { id: "graphic-project07", name: "Project G7", thumb: "/photo/g/p07/gp007-001.png", ballPos: DEFAULT_BALL_POSITIONS[6], titles: { cn: "Project G07", en: "Project G07", jp: "Project G07" } },
      { id: "graphic-project08", name: "Project G8", thumb: "/photo/g/p08/gp008-001.png", ballPos: DEFAULT_BALL_POSITIONS[7], titles: { cn: "Project G08", en: "Project G08", jp: "Project G08" } },
      { id: "graphic-project09", name: "Project G9", thumb: "/photo/g/p09/gp009-001.png", ballPos: DEFAULT_BALL_POSITIONS[8], titles: { cn: "Project G09", en: "Project G09", jp: "Project G09" } },
      { id: "graphic-project10", name: "Project G10", thumb: "/photo/g/p10/gp010-001.png", ballPos: DEFAULT_BALL_POSITIONS[9], titles: { cn: "Project G10", en: "Project G10", jp: "Project G10" } },
      { id: "graphic-project11", name: "Project G11", thumb: "/photo/g/p11/gp011-001.png", ballPos: DEFAULT_BALL_POSITIONS[10], titles: { cn: "Project G11", en: "Project G11", jp: "Project G11" } },
      { id: "graphic-project12", name: "Project G12", thumb: "/photo/g/p12/gp012-001.png", ballPos: DEFAULT_BALL_POSITIONS[11], titles: { cn: "Project G12", en: "Project G12", jp: "Project G12" } },
      { id: "graphic-project13", name: "Project G13", thumb: "/photo/g/p13/gp013-001.png", ballPos: DEFAULT_BALL_POSITIONS[12], titles: { cn: "Project G13", en: "Project G13", jp: "Project G13" } },
      { id: "graphic-project14", name: "Project G14", thumb: "/photo/g/p14/gp014-001.png", ballPos: DEFAULT_BALL_POSITIONS[13], titles: { cn: "Project G14", en: "Project G14", jp: "Project G14" } },
      { id: "graphic-project15", name: "Project G15", thumb: "/photo/g/p15/gp015-001.png", ballPos: DEFAULT_BALL_POSITIONS[14], titles: { cn: "Project G15", en: "Project G15", jp: "Project G15" } },
    ],
  },
  {
    key: "typography",
    routeSuffix: "t",
    detailPrefix: "typo",
    title: "TYPOGRAPHY",
    navBackLabel: "TYPOGRAPHY",
    eyebrow: "字体设计/タイポグラフィ",
    modelPath: "/models/PORTFLIO-T.obj",
    introCn: ["本界面的作品皆为", "将文字视作独立视觉骨骼的构造形态研究", "在字形变体、笔画重构与实验性排版中", "探索文字符号超越单纯阅读工具的纯粹美学表达。"],
    introEn: ["All works presented in this section", "treat type as an architectural system,", "dismantling conventional typography to explore", "the raw, abstract visual aesthetics of letterforms", "and glyphs."],
    detailLabel: "TYPOGRAPHY // DETAILED REPORT",
    detailBody: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的字形构造、变体研究与实验性排版美学，都将在这里以最纯粹、安稳的形式展开深入观察。",
    projects: makeProjects("typo", "T", "Project"),
  },
  {
    key: "other",
    routeSuffix: "o",
    detailPrefix: "other",
    title: "OTHERS",
    navBackLabel: "OTHERS",
    eyebrow: "其他/その他",
    modelPath: "/models/PORTFLIO-O.obj",
    introCn: ["本界面的作品皆为", "打破传统边界的综合媒介与跨界设计探索", "涵盖未定义性质的实验性艺术实践、装置残片与", "多维课题研究，呈现设计实验室的未知切面。"],
    introEn: ["All works presented in this section", "are uncategorized alternative practices,", "bridging interdisciplinary media research, experiments,", "and hybrid narrative formats."],
    detailLabel: "OTHERS // DETAILED REPORT",
    detailBody: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的跨界综合媒介实践、实验性艺术探索与未知切面，都将在这里以最纯粹、安稳的形式展开深入观察。",
    projects: makeProjects("other", "O", "Project"),
  },
];

export function getCategoryBySuffix(routeSuffix: string) {
  return CATEGORIES.find((category) => category.routeSuffix === routeSuffix);
}

export function formatTitle(title: string): string {
  return title.length > 8 ? `${title.slice(0, 8)}...` : title;
}
