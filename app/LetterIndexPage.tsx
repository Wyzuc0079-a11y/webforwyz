"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import SpecimenCanvas from "@/components/SpecimenCanvas";
import PageShell from "./components/PageShell";
import { formatTitle, type PortfolioCategory } from "./portfolioContent";
import { useLanguage } from "./lib/i18n";

type LetterIndexPageProps = {
  category: PortfolioCategory;

  // 导航栏强调色，不传就用默认白色
  navAccentColor?: string;
};

export default function LetterIndexPage({ category, navAccentColor }: LetterIndexPageProps) {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const canvasProjects = useMemo(
    () =>
      category.projects.map((project) => ({
        ...project,
        name: project.titles ? project.titles[lang as "cn" | "en" | "jp"] : formatTitle(project.name),
      })),
    [category.projects, lang],
  );

  return (
    <PageShell
      backHref="/"
      backLabel="BACK TO 3D GALLERY ←"
      navAccentColor={navAccentColor}
    >
      <div className="relative w-screen h-screen overflow-hidden pt-28 pb-12 flex flex-col justify-between">

        {/* 顶部标题区域 */}
        <div className="relative z-10 w-full px-8 md:pl-16 md:pr-12 border-b border-white/5 pb-8 mt-4 pointer-events-none flex flex-col items-start">

          {/* 分类眉题 ── 字号 007 注释级 */}
          <span
            style={{ fontSize: "var(--fs-007)" }}
            className="text-white/50 tracking-[0.3em] uppercase block mb-2"
          >
            {t(`eyebrow_${category.key}`)}
          </span>

          {/* 分类大标题 ── 字号 001 极大标题 */}
          <h1
            style={{ fontSize: "var(--fs-001)" }}
            className="font-black tracking-wider text-white uppercase mb-4 leading-none"
          >
            {category.title}
          </h1>

          <div className="max-w-[280px] md:max-w-[400px] block mt-[20px]">

            {/* 介绍文字 ── 字号 006 小字 */}
            <div
              style={{ fontSize: "var(--fs-006)" }}
              className="text-white/90 block leading-loose font-normal"
            >
              {(lang === "en" ? category.introEn : category.introCn).map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </div>

          </div>
        </div>

        {/* 3D 字母模型画布 */}
        <SpecimenCanvas
          modelPath={category.modelPath}
          projects={canvasProjects}
          onProjectClick={(targetId) => router.push(`/letter-${category.routeSuffix}/${targetId}`)}
        />

        {/* 底部操作提示 ── 字号 008 最小字 */}
        <div
          style={{ fontSize: "var(--fs-008)" }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-black/50 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md z-50 flex items-center gap-x-5 flex-row text-[#FF6B00] font-bold tracking-wider shadow-2xl"
        >
          <span>ROTATE / {lang === "cn" ? "视角旋转" : lang === "jp" ? "画面回転" : "Rotate"} [ Mouse Left Click ]</span>
          <span className="opacity-30 text-white font-normal">|</span>
          <span>PAN / {lang === "cn" ? "拖动平移" : lang === "jp" ? "画面移動" : "Pan"} [ Shift + Mouse Left Click ]</span>
          <span className="opacity-30 text-white font-normal">|</span>
          <span>ZOOM / {lang === "cn" ? "滚轮缩放" : lang === "jp" ? "拡大縮小" : "Zoom"} [ Mouse Wheel ]</span>
        </div>

        {/* 底部版权标注 ── 字号 008 最小字 */}
        <div
          style={{ fontSize: "var(--fs-008)" }}
          className="relative z-20 w-full px-8 md:pl-16 text-white/10 tracking-[0.25em] text-left border-t border-white/5 pt-4 pointer-events-none uppercase"
        >
          WU YIZHOU DESIGN LABORATORY · PROJECT METRICS ACTIVE
        </div>

      </div>
    </PageShell>
  );
}