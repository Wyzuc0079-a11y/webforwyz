"use client";

import { useState } from "react";
import PageShell from "@/app/components/PageShell";
import { useLanguage } from "@/app/lib/i18n";

export default function Project04PosterPage() {
  const { lang } = useLanguage();

  // =========================================================================
  // ✎ 【核心可视化数据配置面板】── 字体、颜色、图片在这里直接修改
  // =========================================================================
  const PROJECT_DATA = {
    theme: {
      accentColor: "#FF6B00", // 标志性橙色高亮（Tag、关闭按钮等）
    },

    // 顶部的分类标签
    tags: ["海报设计 / POSTER", "字体设计 / TYPOGRAPHY", "版式设计 / LAYOUT"],

    // 核心项目信息（右侧 1/3 区域使用）
    meta: {
      titlePngSrc: "/photo/g/p04/title.png", // 右侧标题图形路径
      projectName: "ファン・デ・ナゴヤ美術展2026「石の裏を覗く」",
      creationDate: "2025.10",
      client: "Kosuke YAMAGISHI/山岸耕輔",
    },

    // 设计解说（多语言）
    descriptions: {
      cn: [
        "艺术家山岸耕辅于2026年在名古屋市民画廊矢田举办的个展《石の裏を覗く》的视觉设计。",
        "“石间泛绿”的字体设计来源于两重联想：一是山岸在再现石头造型时使用的3D打印笔所采用的荧光绿色3D耗材，二是秋田县鹿角市绳文时代遗址中出土的绿色石材。",
        "整体设计语言上，字体采用偏锐利感的宋体结构，并在版面编排中模拟河滩的流动走向，使视觉动线与“石与水”的地理意象产生呼应。"
      ],
      en: [
        "For the visual identity of Behind the Stone (Ishi no Ura wo Nozoku), a solo exhibition by artist Kosuke Yamagishi held in 2026 at Nagoya Civic Gallery Yada, the green-tinted typography emerging between the stones was developed from two associations.",
        "The first references the fluorescent green filament used in the 3D printing pen that Yamagishi employed to recreate stone forms. The second draws from the green stone materials found at Jomon-period archaeological sites in Kazuno.",
        "The overall design adopts a sharp-edged Ming-style typeface, while the layout composition follows the flow of a riverbank. This arrangement creates a visual rhythm that resonates with the geographical imagery of stone and water."
      ],
      jp: [
        "アーティスト山岸耕輔による2026年の個展『石の裏を覗く』（名古屋市民ギャラリー矢田）のビジュアルデザインにおいて、石の間から緑が滲み出るようなタイポグラフィは、二つの連想をもとに制作された。",
        "一つは、山岸が石の造形を再現する際に使用した3Dプリントペンの蛍光グリーンのフィラメントであり、もう一つは、鹿角市の縄文時代遺跡で見られる緑色の石材である。",
        "デザイン面では、やや鋭利な印象を持つ宋朝体を採用し、レイアウトは河原の流れを想起させる配置とした。これにより、「石」と「水」が織りなす地理的イメージと呼応する視覚的な動線を形成している。"
      ],
    },

    // 主海报图片路径
    mainPosters: [
      "/photo/g/p04/gp004-001.png",
      "/photo/g/p04/gp004-002.png",
    ],

    // 底部草图堆叠区
    sketches: [
      { id: 1, src: "/photo/g/p04/detail-01.jpg", width: 180, rotate: -8, top: "20px", left: "5%" },
      { id: 2, src: "/photo/g/p04/detail-02.jpg", width: 220, rotate: 6, top: "0px", left: "40%" },
      { id: 3, src: "/photo/g/p04/main.jpg", width: 160, rotate: -12, top: "40px", left: "70%" },
    ]
  };

  const [activeSketch, setActiveSketch] = useState<null | string>(null);
  const [hoveredSketchId, setHoveredSketchId] = useState<number | null>(null);
  const ZOOM = 4; // 放大倍率（如需调整，直接改这个数字）
  const LENS_SIZE = 280; // 放大镜尺寸（px）

  // 放大镜：追踪鼠标在海报上的位置
  const [lens, setLens] = useState<{
    x: number; y: number; show: boolean; index: number | null;
    imgW: number; imgH: number;
  }>({
    x: 0, y: 0, show: false, index: null,
    imgW: 0, imgH: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // 以 img 元素自身为坐标系基准，避免容器内边距导致偏移
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ x, y, show: true, index, imgW: rect.width, imgH: rect.height });
  };

  const handleMouseLeave = () => {
    setLens({ x: 0, y: 0, show: false, index: null, imgW: 0, imgH: 0 });
  };

  return (
    <PageShell
      backHref="/letter-g"
      navAccentColor="#ffffff"
    >
      <div className="relative z-10 pt-32 pb-32 overflow-x-hidden">
        {/* ▲ pt-32 = 上方内边距（整个内容区距顶部距离）| pb-32 = 下方内边距 */}

        {/* 主体两栏布局 */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12">
          {/* ▲ px-6 = 手机端左右内边距 | md:px-12 = 桌面端左右内边距 | gap-12 = 两栏之间的间距 */}

          {/* 左侧海报展示区 ── 占 2/3 宽度 */}
          <div className="w-full md:w-2/3 space-y-12">
            {/* ▲ space-y-12 = 多张海报之间的垂直间距 */}
            {PROJECT_DATA.mainPosters.map((posterSrc, idx) => (
              <div
                key={idx}
                className="w-full relative cursor-crosshair"
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={posterSrc}
                  alt={`Project 04 poster view ${idx}`}
                  className="w-full h-auto block opacity-95 transition-opacity duration-300"
                />

                {/* 放大镜 ── 5 倍放大，跟随鼠标 */}
                {lens.show && lens.index === idx && (
                  <div
                    className="absolute pointer-events-none border border-white/40 shadow-2xl overflow-hidden z-30 bg-[#1c1c1c]"
                    style={{
                      width: `${LENS_SIZE}px`,
                      height: `${LENS_SIZE}px`,
                      left: `${lens.x - LENS_SIZE / 2}px`,
                      top: `${lens.y - LENS_SIZE / 2}px`,
                      borderRadius: "2px"
                    }}
                  >
                    <div
                      className="absolute"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${posterSrc})`,
                        backgroundRepeat: "no-repeat",
                        // 背景以 ZOOM 倍率显示
                        backgroundSize: `${lens.imgW * ZOOM}px ${lens.imgH * ZOOM}px`,
                        // 鼠标所在像素对准镜头中心
                        backgroundPosition: `${-lens.x * ZOOM + LENS_SIZE / 2}px ${-lens.y * ZOOM + LENS_SIZE / 2}px`
                      }}
                    />
                    {/* 放大倍率标注 */}
                    <div
                      style={{ fontSize: "var(--fs-008)" }}
                      className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 font-mono text-white/60 tracking-widest"
                    >
                      SCALE: {ZOOM}X
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 右侧信息区 ── 占 1/3 宽度 */}
          <div className="w-full md:w-1/3 md:sticky md:top-0 h-fit space-y-8">
            {/* ▲ md:top-32 = 滚动时信息区距顶部距离 | space-y-8 = 信息区内部各模块之间的垂直间距 */}

            {/* 分类标签 ── 字号 008 最小字 */}
            <div className="flex flex-wrap gap-2">
              {/* ▲ gap-2 = tag 标签之间的间距（flex-wrap 换行） */}
              {PROJECT_DATA.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "var(--fs-008)",
                    color: "#ffffff"
                  }}
                  className="tracking-widest font-mono uppercase px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 标题图形 */}
            <div className="w-full max-w-[280px] h-auto select-none pointer-events-none my-4">
              {/* ▲ my-4 = 标题图与上下模块之间的垂直间距 */}
              <img
                src={PROJECT_DATA.meta.titlePngSrc}
                alt={PROJECT_DATA.meta.projectName}
                className="w-full h-auto object-contain opacity-95"
              />
            </div>

            {/* 项目元数据 ── 字号 007 注释级 */}
            <div
              style={{ fontSize: "var(--fs-007)" }}
              className="border-t border-b border-white/5 py-5 space-y-2.5 font-mono text-neutral-400"
            >
              {/* ▲ py-5 = 元数据块上下内边距 | space-y-2.5 = PROJECT/DATE/CLIENT 三行之间的间距 */}
              <div className="flex justify-between">
                <span className="opacity-40">PROJECT:</span>
                <span className="text-white font-medium">{PROJECT_DATA.meta.projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-40">DATE:</span>
                <span className="text-white">{PROJECT_DATA.meta.creationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-40">CLIENT:</span>
                <a
                  href="https://sites.google.com/view/kosuke-yamagishi?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-right truncate max-w-[180px] hover:opacity-70 transition-opacity underline underline-offset-2 decoration-white/30"
                >
                  {PROJECT_DATA.meta.client}
                </a>
              </div>
            </div>

            {/* 正文描述 ── 字号 006 小字 */}
            <div className="leading-relaxed tracking-wider space-y-4 font-light text-neutral-300">
              {/* ▲ space-y-4 = 描述各段落之间的垂直间距 */}
              <p
                style={{ fontSize: "var(--fs-008)" }}
                className="opacity-30 font-mono tracking-[0.2em]"
              >
                {` Project Information`}
              </p>
              {PROJECT_DATA.descriptions[lang].map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{ fontSize: "var(--fs-006)" }}
                  className="leading-loose"
                >
                  {paragraph}
                </p>
              ))}
            </div>

          </div>
        </div>

        {/* 底部草图堆叠区 */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32 border-t border-white/5 pt-12 relative">
          {/* ▲ mt-32 = 草图区与上方海报区的间距 | pt-12 = 草图区顶部内边距 */}
          {/* 草图区标注 ── 字号 008 最小字 */}
          <span
            style={{ fontSize: "var(--fs-008)" }}
            className="tracking-[0.3em] opacity-30 font-mono block mb-12"
          >
            {`// PROCESS SKETCHES (HOVER TO SCATTER)`}
          </span>

          <div className="relative w-full h-[400px]">
            {PROJECT_DATA.sketches.map((sketch) => {
              const isHovered = hoveredSketchId === sketch.id;
              const anyHovered = hoveredSketchId !== null;

              let scatterTransform = `rotate(${sketch.rotate}deg)`;
              if (anyHovered && !isHovered) {
                const direction = sketch.id % 2 === 0 ? 35 : -35;
                scatterTransform = `translate(${direction}px, -12px) rotate(${sketch.rotate * 0.4}deg) scale(0.92)`;
              } else if (isHovered) {
                scatterTransform = `scale(1.15) rotate(0deg)`;
              }

              return (
                <div
                  key={sketch.id}
                  onClick={() => setActiveSketch(sketch.src)}
                  onMouseEnter={() => setHoveredSketchId(sketch.id)}
                  onMouseLeave={() => setHoveredSketchId(null)}
                  className="absolute cursor-zoom-in transition-all duration-500 ease-out"
                  style={{
                    top: sketch.top,
                    left: sketch.left,
                    width: `${sketch.width}px`,
                    transform: scatterTransform,
                    zIndex: isHovered ? 40 : sketch.id,
                  }}
                >
                  <img
                    src={sketch.src}
                    alt="Process sketch"
                    className="w-full h-auto object-cover border border-white/10 shadow-xl bg-[#2a2a2a] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 全屏剧场弹窗 */}
        {activeSketch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
            <button
              onClick={() => setActiveSketch(null)}
              style={{
                fontSize: "var(--fs-007)",
                color: PROJECT_DATA.theme.accentColor
              }}
              className="absolute top-8 right-12 font-mono tracking-[0.3em] font-black hover:opacity-70 transition-opacity z-50 flex items-center gap-2"
            >
              CLOSE ESC ×
            </button>
            <div className="w-full max-w-5xl px-6 md:px-0 max-h-[85vh] overflow-hidden flex items-center justify-center">
              <img
                src={activeSketch}
                alt="Expanded Theater View"
                className="w-full md:w-2/3 h-auto max-h-[80vh] object-contain border border-white/10 shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 z-10 cursor-zoom-out" onClick={() => setActiveSketch(null)} />
          </div>
        )}

      </div>
    </PageShell>
  );
}
