// =========================================================================
// 🎛 主页配置面板
// =========================================================================
// 修改此文件即可控制主页上的所有按钮和连接，无需碰其他代码。
// 改完后 git add + commit + push 就能生效。
// =========================================================================

export type OffsetRow = [number, number, number, number, number, number?]; // [标题, p1, p2, p3, 可选p4, more]

export type SectionConfig = {
  id: string;
  title: string;
  modelPath: string;
  // 按钮位置（左对齐百分比）：
  //   WIDE_OFFSETS → 宽屏(≥1920px)  NARROW_OFFSETS → 窄屏(≤768px)
  //   中间宽度自动平滑过渡
  wideOffsets: OffsetRow;
  narrowOffsets: OffsetRow;
  // 该分类下所有项目的详情页配置
  projectPages: ProjectPageConfig[];
};

export type ProjectPageConfig = {
  // 项目编号（如 project01 → 链接到 /letter-g/graphic-project01）
  id: string;
  // 三语标题
  titles: { cn: string; en: string; jp: string };
};

// =========================================================================
// ↓↓↓ 从这里开始改 ↓↓↓
// =========================================================================

export const HOME_SECTIONS: SectionConfig[] = [
  {
    id: "bookdesign",
    title: "BOOK DESIGN",
    modelPath: "/models/PORTFLIO-B.obj",
    wideOffsets:  [52, 48, 48, 48, 48, 52],
    narrowOffsets: [56, 56, 56, 56, 52, 56],
    projectPages: [
      { id: "project01", titles: { cn: "Project 01", en: "Project 01", jp: "Project 01" } },
      { id: "project02", titles: { cn: "Project 02", en: "Project 02", jp: "Project 02" } },
      { id: "project03", titles: { cn: "Project 03", en: "Project 03", jp: "Project 03" } },
      { id: "project04", titles: { cn: "Project 04", en: "Project 04", jp: "Project 04" } },
    ],
  },
  {
    id: "event",
    title: "EVENTS",
    modelPath: "/models/PORTFLIO-E.obj",
    wideOffsets:  [52, 44, 44, 44.5,       51.5],
    narrowOffsets: [56, 50, 56, 50,       61],
    projectPages: [
      { id: "project01", titles: { cn: "Event 01", en: "Event 01", jp: "Event 01" } },
      { id: "project02", titles: { cn: "Event 02", en: "Event 02", jp: "Event 02" } },
      { id: "project03", titles: { cn: "Event 03", en: "Event 03", jp: "Event 03" } },
    ],
  },
  {
    id: "studio",
    title: "STUDIO ITSELF",
    modelPath: "/models/PORTFLIO-S.obj",
    wideOffsets:  [58, 50, 50, 50,       55],
    narrowOffsets: [64, 56, 60, 56,       59],
    projectPages: [
      { id: "project01", titles: { cn: "Studio 01", en: "Studio 01", jp: "Studio 01" } },
      { id: "project02", titles: { cn: "Studio 02", en: "Studio 02", jp: "Studio 02" } },
      { id: "project03", titles: { cn: "Studio 03", en: "Studio 03", jp: "Studio 03" } },
    ],
  },
  {
    id: "graphic",
    title: "GRAPHIC DESIGN",
    modelPath: "/models/PORTFLIO-G.obj",
    wideOffsets:  [57, 48, 48.1, 48, 47.5, 55],
    narrowOffsets: [68, 58, 62, 58, 53, 63],
    projectPages: [
      { id: "project01", titles: { cn: "凬凬展", en: "KAZE²", jp: "凬々展" } },
      { id: "project02", titles: { cn: "Project G02", en: "Project G02", jp: "Project G02" } },
      { id: "project03", titles: { cn: "Project G03", en: "Project G03", jp: "Project G03" } },
      { id: "project04", titles: { cn: "「石の裏を覗く」", en: "Behind the Stone", jp: "「石の裏を覗く」" } },
    ],
  },
  {
    id: "typography",
    title: "TYPOGRAPHY",
    modelPath: "/models/PORTFLIO-T.obj",
    wideOffsets:  [53, 46.5, 46.2, 46,       50],
    narrowOffsets: [56, 40, 47, 46,       50],
    projectPages: [
      { id: "project01", titles: { cn: "Type 01", en: "Type 01", jp: "Type 01" } },
      { id: "project02", titles: { cn: "Type 02", en: "Type 02", jp: "Type 02" } },
      { id: "project03", titles: { cn: "Type 03", en: "Type 03", jp: "Type 03" } },
    ],
  },
  {
    id: "other",
    title: "OTHER",
    modelPath: "/models/PORTFLIO-O.obj",
    wideOffsets:  [58, 48, 48.5, 48.5,       53],
    narrowOffsets: [68, 58, 56, 55,       60],
    projectPages: [
      { id: "project01", titles: { cn: "Other 01", en: "Other 01", jp: "Other 01" } },
      { id: "project02", titles: { cn: "Other 02", en: "Other 02", jp: "Other 02" } },
      { id: "project03", titles: { cn: "Other 03", en: "Other 03", jp: "Other 03" } },
    ],
  },
];

// =========================================================================
// 辅助函数（不用动）
// =========================================================================

/** 根据 section id 获取对应的字母后缀（用于路由） */
export function getLetterSuffix(sectionId: string): string {
  const map: Record<string, string> = {
    bookdesign: "b",
    event: "e",
    studio: "s",
    graphic: "g",
    typography: "t",
    other: "o",
  };
  return map[sectionId] ?? "b";
}

/** 根据 section id 获取对应的分类 key（用于 CATEGORIES 查找） */
export function getCategoryKey(sectionId: string): string {
  const map: Record<string, string> = {
    bookdesign: "bookdesign",
    event: "event",
    studio: "studio",
    graphic: "graphic",
    typography: "typo",
    other: "other",
  };
  return map[sectionId] ?? sectionId;
}

/** 根据 section id 生成某个项目的详情页 URL */
export function getProjectDetailUrl(sectionId: string, projectIndex: number): string {
  const prefixMap: Record<string, string> = {
    bookdesign: "bookdesign",
    event: "event",
    studio: "studio",
    graphic: "graphic",
    typography: "typo",
    other: "other",
  };
  const prefix = prefixMap[sectionId] ?? sectionId;
  const number = String(projectIndex + 1).padStart(2, "0");
  return `/letter-${getLetterSuffix(sectionId)}/${prefix}-project${number}`;
}
