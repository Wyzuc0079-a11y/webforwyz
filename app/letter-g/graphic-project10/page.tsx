"use client";

import { useState } from "react";
import PageShell from "@/app/components/PageShell";
import { useLanguage } from "@/app/lib/i18n";

export default function ProjectPosterPage() {
  const { lang } = useLanguage();

  const PROJECT_DATA = {
    theme: { accentColor: "#FF6B00" },
    tags: ["海报设计 / POSTER", "VISUAL IDENTITY"],
    meta: {
      titlePngSrc: "/photo/g/p10/title.png",
      titles: { cn: "Project G10", en: "Project G10", jp: "Project G10" },
      projectName: "Project G10",
      creationDate: "2025",
      client: "TBD",
    },
    descriptions: {
      cn: ["项目 G10 的详细设计说明。", "更多信息待补充。"],
      en: ["Detailed description for Project G10.", "More information coming soon."],
      jp: ["プロジェクトG10の詳細説明。", "詳細は追って追記予定。"],
    },
    mainPosters: [
      "/photo/g/p10/gp10-001.png",
      "/photo/g/p10/gp10-002.png",
    ],
    sketches: [
      { id: 1, src: "/photo/g/p10/detail-01.jpg", width: 180, rotate: -8, top: "20px", left: "5%" },
      { id: 2, src: "/photo/g/p10/detail-02.jpg", width: 220, rotate: 6, top: "0px", left: "40%" },
      { id: 3, src: "/photo/g/p10/detail-03.jpg", width: 160, rotate: -12, top: "40px", left: "70%" },
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
                  alt={`Project poster view ${idx}`}
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
            <div className="w-full max-w-[280px] h-auto select-none pointer-events-none my-4">
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
                <p key={idx} style={{ fontSize: "var(--fs-006)" }} className="leading-loose">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

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
                    top: sketch.top, left: sketch.left, width: `${sketch.width}px`,
                    transform: scatterTransform, zIndex: isHovered ? 40 : sketch.id,
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
