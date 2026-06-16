"use client";

import { useRouter } from "next/navigation";
import SpecimenCanvas from "@/components/SpecimenCanvas";

/* ========================================================================= */
/* 🗺️ T 分类 精简版 15 个项目【独立物理坐标控制中心 & 标题 8 字自动截断】 */
/* ========================================================================= */
const RAW_PROJECTS = [
  { id: "typo-project01", name: "Project T1", thumb: "/thumbs/t1.jpg", ballPos: { x: 1.8, y: 1.4, z: 4.35 } },
  { id: "typo-project02", name: "Project T2", thumb: "/thumbs/t2.jpg", ballPos: { x: -0.55, y: 0.7, z: 4.15 } },
  { id: "typo-project03", name: "Project T3", thumb: "/thumbs/t3.jpg", ballPos: { x: 1.5, y: 0.3, z: 4.05 } },
  { id: "typo-project04", name: "Project T4", thumb: "/thumbs/t4.jpg", ballPos: { x: -1.65, y: -1.7, z: 3.46 } },
  { id: "typo-project05", name: "Project T5", thumb: "/thumbs/t5.jpg", ballPos: { x: -0.45, y: 2.15, z: 4.5 } },
  { id: "typo-project06", name: "Project T6", thumb: "/thumbs/t6.jpg", ballPos: { x: 1.1, y: -1.05, z: 3.7 } },
  { id: "typo-project07", name: "Project T7", thumb: "/thumbs/t7.jpg", ballPos: { x: -1.56, y: 0.2, z: 3.95 } },
  { id: "typo-project08", name: "Project T8", thumb: "/thumbs/t8.jpg", ballPos: { x: 1.5, y: 0.3, z: 2.5 } },
  { id: "typo-project09", name: "Project T9", thumb: "/thumbs/t9.jpg", ballPos: { x: -0.45, y: 2.15, z: 0.0 } },
  { id: "typo-project10", name: "Project T10", thumb: "/thumbs/t10.jpg", ballPos: { x: 2.0, y: -1.2, z: 3.7 } },
  { id: "typo-project11", name: "Project T11", thumb: "/thumbs/t11.jpg", ballPos: { x: -0.61, y: -0.22, z: 0.0 } },
  { id: "typo-project12", name: "Project T12", thumb: "/thumbs/t12.jpg", ballPos: { x: 0.55, y: -1.85, z: 2.5 } },
  { id: "typo-project13", name: "Project T13", thumb: "/thumbs/t13.jpg", ballPos: { x: -1.7, y: -2.9, z: 3.1 } },
  { id: "typo-project14", name: "Project T14", thumb: "/thumbs/t14.jpg", ballPos: { x: 0.1, y: -0.9, z: 0.5 } },
  { id: "typo-project15", name: "Project T15", thumb: "/thumbs/t15.jpg", ballPos: { x: 1.2, y: -1.0, z: 0.6 } },
];

function formatTitle(title: string): string {
  if (title.length > 8) {
    return title.slice(0, 8) + "...";
  }
  return title;
}

export default function TypographyListPage() {
  const router = useRouter();

  const canvasProjects = RAW_PROJECTS.map((proj) => ({
    id: proj.id,
    name: formatTitle(proj.name),
    thumb: proj.thumb,
    ballPos: proj.ballPos,
  }));

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white relative select-none font-sans overflow-x-hidden">
      <div
        className="fixed inset-0 z-0 pointer-events-none transform-gpu"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c]/40 backdrop-blur-md border-b border-white/5 px-6 md:px-12">
        <div className="flex justify-between items-center h-20 max-w-7xl mx-auto">
          <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
            <img src="/logo.png" alt="WU Yizhou Logo" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" />
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-xs tracking-widest text-white/40 hover:text-white transition-colors duration-300"
          >
            BACK TO 3D GALLERY ←
          </button>
        </div>
      </nav>

      <div className="relative w-screen h-screen overflow-hidden pt-28 pb-12 flex flex-col justify-between">
        
        <div className="relative z-10 w-full px-8 md:pl-16 md:pr-12 border-b border-white/5 pb-8 mt-4 pointer-events-none flex flex-col items-start">
          <span className="text-white/50 text-[12px] tracking-[0.3em] uppercase block mb-2">
            字体设计/タイポグラフィ
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-wider text-white uppercase mb-4 leading-none">
            TYPOGRAPHY
          </h1>
          
          <div className="max-w-[280px] md:max-w-[320px] block mt-[20px]">
            <div className="text-[12px] text-white/90 block leading-loose font-normal">
              本界面的作品皆为
              <br />
              将文字视作独立视觉骨骼的构造形态研究
              <br />
              在字形变体、笔画重构与实验性排版中
              <br />
              探索文字符号超越单纯阅读工具的纯粹美学表达。
            </div>

            <div className="text-[16px] text-white/50 font-light tracking-wide leading-relaxed block mt-4">
              All works presented in this section
              <br />
              treat type as an architectural system,
              <br />
              dismantling conventional typography to explore
              <br />
              the raw, abstract visual aesthetics of letterforms
              <br />
              and glyph glyphs.
            </div>
          </div>
        </div>

        <SpecimenCanvas
          modelPath="/models/PORTFLIO-T.obj"
          projects={canvasProjects}
          onProjectClick={(targetId) => {
            router.push(`/letter-t/${targetId}`);
          }}
        />

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-black/50 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md z-50 flex items-center gap-x-5 flex-row text-[#FF6B00] text-[10px] font-bold tracking-wider shadow-2xl">
          <span>● ROTATE / 视角旋转 / 画面回転 [ Mouse Left Click ]</span>
          <span className="opacity-30 text-white font-normal">|</span>
          <span>● PAN / 拖动平移 / 画面移動 [ Shift + Mouse Left Click ]</span>
          <span className="opacity-30 text-white font-normal">|</span>
          <span>● ZOOM / 滚轮缩放 / 拡大縮小 [ Mouse Wheel ]</span>
        </div>

        <div className="relative z-20 w-full px-8 md:pl-16 text-[9px] text-white/10 tracking-[0.25em] text-left border-t border-white/5 pt-4 pointer-events-none uppercase">
          WU YIZHOU DESIGN LABORATORY · PROJECT METRICS ACTIVE
        </div>
      </div>
    </main>
  );
}