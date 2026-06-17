"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "cn" | "en" | "jp";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// ============================================================================
// 全站 UI 文本翻译表（英文保留的界面文字不做翻译，如 PROJECT: / DATE: / MORE CASES 等）
// key 命名规则：页面_位置_描述
// ============================================================================
const translations: Record<string, { cn: string; en: string; jp: string }> = {
  // 首页操作提示
  "home_scroll_hint":   { cn: "滚动浏览",   en: "Scroll to explore",            jp: "スクロールして探索" },
  "home_tip_rotate":    { cn: "视角旋转",   en: "Rotate",                       jp: "画面回転" },
  "home_tip_pan":       { cn: "拖动平移",   en: "Pan",                          jp: "画面移動" },
  "home_tip_zoom":      { cn: "滚轮缩放",   en: "Zoom",                         jp: "拡大縮小" },
  "home_tip_mouse_left":  { cn: "鼠标左键", en: "Mouse Left Click",              jp: "マウス左クリック" },
  "home_tip_shift_left":  { cn: "Shift + 鼠标左键", en: "Shift + Mouse Left Click", jp: "Shift + マウス左クリック" },
  "home_tip_mouse_wheel": { cn: "鼠标滚轮", en: "Mouse Wheel",                  jp: "マウスホイール" },

  // MORE CASES
  "home_more_cases":    { cn: "更多项目→",  en: "MORE CASES →",                  jp: "さらに見る→" },

  // 分类眉题（eyebrow 的翻译）
  "eyebrow_bookdesign":  { cn: "书籍装帧",  en: "BOOK DESIGN",                   jp: "書籍デザイン" },
  "eyebrow_event":       { cn: "活动",      en: "EVENTS",                        jp: "イベント・活動" },
  "eyebrow_studio":      { cn: "工作室探索",en: "STUDIO ITSELF",                  jp: "スタジオ・イットセルフ" },
  "eyebrow_graphic":     { cn: "平面设计",  en: "GRAPHIC DESIGN",                 jp: "グラフィックデザイン" },
  "eyebrow_typography":  { cn: "字体设计",  en: "TYPOGRAPHY",                     jp: "タイポグラフィ" },
  "eyebrow_other":       { cn: "其他",      en: "OTHERS",                        jp: "その他" },

  // 分类详情页 detailBody（用于索引页面的底部描述）
  "detail_bookdesign": {
    cn: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的平面排版设计都将在这里以最纯粹、安稳的形式展开深入观察。",
    en: "Through independent physical layering, each typographic layout is observed in its purest state, decoupled from the macro control of the main gallery scroll.",
    jp: "独立した物理層による内容の分離。メインホールのスクロールによるマクロ制御から解放され、それぞれの平面排版デザインが最も純粋で安定した形で観察される。",
  },
  "detail_event": {
    cn: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个特定场域、社群活动与现场实践，都将在这里以最纯粹、安稳的形式展开深入观察。",
    en: "Each site-specific event and community practice is observed in its purest state, decoupled from the macro control of the main gallery scroll.",
    jp: "それぞれの特定の場域、コミュニティ活動、現場実践が最も純粋で安定した形で観察される。",
  },
  "detail_studio": {
    cn: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个关于工作坊自身内核探索与方法论解构的实验物证，都将在这里以最纯粹、安稳的形式展开深入观察。",
    en: "Each experimental artifact exploring the studio's own core and methodological deconstruction is observed in its purest state.",
    jp: "ワークショップ自身の核心探求と方法論の解体に関する実験的証拠が、最も純粋で安定した形で観察される。",
  },
  "detail_graphic": {
    cn: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的版面秩序重建、图像解构与二维视觉传达设计，都将在这里以最纯粹、安稳的形式展开深入观察。",
    en: "Each graphic design — layout reconstruction, image deconstruction, and two-dimensional visual communication — is observed in its purest state.",
    jp: "それぞれの版面秩序の再構築、画像の解体、二次元ビジュアルコミュニケーションデザインが、最も純粋で安定した形で観察される。",
  },
  "detail_typography": {
    cn: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的字形构造、变体研究与实验性排版美学，都将在这里以最纯粹、安稳的形式展开深入观察。",
    en: "Each typographic construction, variant study, and experimental layout aesthetic is observed in its purest state.",
    jp: "それぞれの字形構造、変体研究、実験的排版美学が、最も純粋で安定した形で観察される。",
  },
  "detail_other": {
    cn: "通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的跨界综合媒介实践、实验性艺术探索と未知切面，都将在这里以最纯粹、安稳的形式展开深入观察。",
    en: "Each cross-disciplinary media practice, experimental art exploration, and unknown facet is observed in its purest state.",
    jp: "それぞれのクロスボーダー総合メディア実践、実験的アート探求、未知の断面が、最も純粋で安定した形で観察される。",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("cn");

  const t = useCallback((key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry["en"];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
