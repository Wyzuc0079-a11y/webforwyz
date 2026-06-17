"use client";

import { useState } from "react";
import PageShell from "@/app/components/PageShell";
import { useLanguage } from "@/app/lib/i18n";

export default function Project01PosterPage() {
  const { lang } = useLanguage();

  const PROJECT_DATA = {
    theme: { accentColor: "#FF6B00" },
    tags: ["海报设计 / POSTER", "VISUAL IDENTITY"],
    meta: {
      titlePngSrc: "/photo/g/p01/title.png",
      titles: { cn: "凬凬展", en: "KAZE²", jp: "凬々展" },
      projectName: "凬々展 / KAZE²",
      creationDate: "2025.07",
      client: "Studio Itself",
    },
    descriptions: {
      cn: [
        "「凬凬展」是由秋田公立美术大学大学院学生自主策划并参展的一次展览。",
        "展览空间位于秋田市松美町一栋闲置超过十年的旧民居内。该建筑于2026年4月由吴艺舟购入，并与蓝晶鑫共同历时五个月完成改造，最终作为展览空间启用。",
        "由于进入该场所必须穿过他人所有的私人道路，其地理条件属于「袋地（口袋地）」。基于这一特殊性，本次视觉设计引入了「风」的意象——如同风能够不受边界限制地穿行、渗入空间一般，展览也以一种柔软而自然的方式介入这处被遗忘的场所。",
        "海报主视觉亦由此展开：象征风的流动曲线轻柔地拂过空间中的结构体，而这些结构则源自荒川修作立方体作品的形式语言。在「侵入」与「穿行」、「废墟」与「激活」之间，构成了本次展览视觉表达的核心意象。"
      ],
      en: [
        "KAZE² Exhibition is an exhibition planned and presented by graduate students of the Akita University of Art Graduate School.",
        "The venue is a former private residence in Matsumi-chō, Akita City, which had remained vacant for more than ten years. The property was purchased by Wu Yizhou in April 2026 and, together with Lan Jingxin, was renovated over a period of five months before being reopened as an exhibition space.",
        "As access to the site requires passing through a privately owned road, the property can be described as a landlocked \"flag lot.\" This unique condition inspired the central visual motif of the exhibition: wind. Just as wind can enter a space regardless of boundaries, the exhibition seeks to gently permeate and activate this long-abandoned site.",
        "The poster's key visual develops from this idea. Soft, flowing forms representing wind move across an architectural framework derived from the cubic structures found in the work of Shusaku Arakawa. Through the interplay between intrusion and passage, abandonment and renewal, the visual identity embodies the exhibition's relationship to the site."
      ],
      jp: [
        "「凬々展」は、秋田公立美術大学大学院の大学院生によって企画・出展された展覧会である。",
        "会場となったのは、秋田市松美町にある10年以上放置されていた旧民家である。この建物は2026年4月に呉藝舟が購入し、藍晶鑫とともに約5か月をかけて改修を行い、展示空間として再生された。",
        "会場へは他者所有の私道を通らなければアクセスできず、いわゆる「袋地」に位置している。この特殊な立地条件から、本展のビジュアルデザインでは「風」のイメージを着想源とした。境界に縛られることなく空間へ入り込む風のように、展覧会もまた忘れられていた場所へ柔らかく介入していくことを意図している。",
        "ポスターのメインビジュアルもこの発想に基づいている。風を象徴する柔らかな流線が、荒川修作の立方体作品に由来する構造体の上をなぞるように通り抜ける構成とした。「侵入」と「通過」、「廃墟」と「再生」のあいだに生まれる関係性を、視覚表現として示している。"
      ],
    },
    mainPosters: [
      "/photo/g/p01/gp001-001.jpg",
      "/photo/g/p01/gp001-002.png",
    ],
    sketches: [
      { id: 1, src: "/photo/g/p01/detail-01.jpg", width: 180, rotate: -8, top: "20px", left: "5%" },
      { id: 2, src: "/photo/g/p01/detail-02.jpg", width: 220, rotate: 6, top: "0px", left: "40%" },
      { id: 3, src: "/photo/g/p01/detail-03.jpg", width: 160, rotate: -12, top: "40px", left: "70%" },
    ]
  };

  const [activeSketch, setActiveSketch] = useState<null | string>(null);
  const [hoveredSketchId, setHoveredSketchId] = useState<number | null>(null);
  const ZOOM = 4;
  const LENS_SIZE = 280;

  const [lens, setLens] = useState<{
    x: number; y: number; show: boolean; index: number | null;
    imgW: number; imgH: number;
  }>({ x: 0, y: 0, show: false, index: null, imgW: 0, imgH: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
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
      backLabel="BACK TO GRAPHIC ←"
      navAccentColor="#ffffff"
    >
      <div className="relative z-10 pt-32 pb-32 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12">

          {/* 左侧海报展示区 */}
          <div className="w-full md:w-2/3 space-y-12">
            {PROJECT_DATA.mainPosters.map((posterSrc, idx) => (
              <div
                key={idx}
                className="w-full relative cursor-crosshair"
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={posterSrc}
                  alt={`Project 01 poster view ${idx}`}
                  className="w-full h-auto block opacity-95 transition-opacity duration-300"
                />

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
                        backgroundSize: `${lens.imgW * ZOOM}px ${lens.imgH * ZOOM}px`,
                        backgroundPosition: `${-lens.x * ZOOM + LENS_SIZE / 2}px ${-lens.y * ZOOM + LENS_SIZE / 2}px`
                      }}
                    />
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

          {/* 右侧信息区 */}
          <div className="w-full md:w-1/3 md:sticky md:top-0 h-fit space-y-8">
            <div className="flex flex-wrap gap-2">
              {PROJECT_DATA.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{ fontSize: "var(--fs-008)", color: "#ffffff" }}
                  className="tracking-widest font-mono uppercase px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="w-full max-w-[380px] h-auto select-none pointer-events-none my-4">
              <img
                src={PROJECT_DATA.meta.titlePngSrc}
                alt={PROJECT_DATA.meta.projectName}
                className="w-full h-auto object-contain opacity-95"
              />
            </div>

            <div
              style={{ fontSize: "var(--fs-007)" }}
              className="border-t border-b border-white/5 py-5 space-y-2.5 font-mono text-neutral-400"
            >
              <div className="flex justify-between">
                <span className="opacity-40">PROJECT:</span>
                <span className="text-white font-medium">{PROJECT_DATA.meta.titles[lang]}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-40">DATE:</span>
                <span className="text-white">{PROJECT_DATA.meta.creationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-40">CLIENT:</span>
                <span className="text-white">{PROJECT_DATA.meta.client}</span>
              </div>
            </div>

            <div className="leading-relaxed tracking-wider space-y-4 font-light text-neutral-300">
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
              style={{ fontSize: "var(--fs-007)", color: PROJECT_DATA.theme.accentColor }}
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
