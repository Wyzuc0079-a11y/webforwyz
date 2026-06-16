"use client";

import { useRouter } from "next/navigation";
import SpecimenCanvas from "@/components/SpecimenCanvas";

/* ========================================================================= */
/* 🗺️ S 分类 精简版 15 个项目【独立物理坐标控制中心 & 标题 8 字自动截断】 */
/* ========================================================================= */
const RAW_PROJECTS = [
  { id: "studio-project01", name: "Project S1", thumb: "/thumbs/s1.jpg", ballPos: { x: 1.8, y: 1.4, z: 4.35 } },
  { id: "studio-project02", name: "Project S2", thumb: "/thumbs/s2.jpg", ballPos: { x: -0.55, y: 0.7, z: 4.15 } },
  { id: "studio-project03", name: "Project S3", thumb: "/thumbs/s3.jpg", ballPos: { x: 1.5, y: 0.3, z: 4.05 } },
  { id: "studio-project04", name: "Project S4", thumb: "/thumbs/s4.jpg", ballPos: { x: -1.65, y: -1.7, z: 3.46 } },
  { id: "studio-project05", name: "Project S5", thumb: "/thumbs/s5.jpg", ballPos: { x: -0.45, y: 2.15, z: 4.5 } },
  { id: "studio-project06", name: "Project S6", thumb: "/thumbs/s6.jpg", ballPos: { x: 1.1, y: -1.05, z: 3.7 } },
  { id: "studio-project07", name: "Project S7", thumb: "/thumbs/s7.jpg", ballPos: { x: -1.56, y: 0.2, z: 3.95 } },
  { id: "studio-project08", name: "Project S8", thumb: "/thumbs/s8.jpg", ballPos: { x: 1.5, y: 0.3, z: 2.5 } },
  { id: "studio-project09", name: "Project S9", thumb: "/thumbs/s9.jpg", ballPos: { x: -0.45, y: 2.15, z: 0.0 } },
  { id: "studio-project10", name: "Project S10", thumb: "/thumbs/s10.jpg", ballPos: { x: 2.0, y: -1.2, z: 3.7 } },
  { id: "studio-project11", name: "Project S11", thumb: "/thumbs/s11.jpg", ballPos: { x: -0.61, y: -0.22, z: 0.0 } },
  { id: "studio-project12", name: "Project S12", thumb: "/thumbs/s12.jpg", ballPos: { x: 0.55, y: -1.85, z: 2.5 } },
  { id: "studio-project13", name: "Project S13", thumb: "/thumbs/s13.jpg", ballPos: { x: -1.7, y: -2.9, z: 3.1 } },
  { id: "studio-project14", name: "Project S14", thumb: "/thumbs/s14.jpg", ballPos: { x: 0.1, y: -0.9, z: 0.5 } },
  { id: "studio-project15", name: "Project S15", thumb: "/thumbs/s15.jpg", ballPos: { x: 1.2, y: -1.0, z: 0.6 } },
];

function formatTitle(title: string): string {
  if (title.length > 8) {
    return title.slice(0, 8) + "...";
  }
  return title;
}

export default function StudioItselfListPage() {
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
            studioitself/スタジオ・イットセルフ
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-wider text-white uppercase mb-4 leading-none">
            STUDIO ITSELF
          </h1>
          
          <div className="max-w-[280px] md:max-w-[320px] block mt-[20px]">
            <div className="text-[12px] text-white/90 block leading-loose font-normal">
              本界面的作品皆为
              <br />
              针对工作坊自身内核与机制的探索
              <br />
              通过元设计思考、方法论解构与自我审视
              <br />
              呈现工作室边界演变过程中的核心物证。
            </div>

            <div className="text-[16px] text-white/50 font-light tracking-wide leading-relaxed block mt-4">
              All works presented in this section
              <br />
              are internal systematic explorations of
              <br />
              the studio's own methodologies, deconstructing
              <br />
              the mechanisms of self-archiving and
              <br />
              meta-design creation.
            </div>
          </div>
        </div>

        <SpecimenCanvas
          modelPath="/models/PORTFLIO-S.obj"
          projects={canvasProjects}
          onProjectClick={(targetId) => {
            router.push(`/letter-s/${targetId}`);
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