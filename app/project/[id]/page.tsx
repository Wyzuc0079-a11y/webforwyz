"use client";

import { useParams, useRouter } from "next/navigation";
import SpecimenCanvas from "@/components/SpecimenCanvas";

// 🗺️ 智能化数据映射：全自动抓取顶点，不需要手动填写 pos 坐标
const CATEGORY_SPECIMENS: Record<string, { modelPath: string; projects: { name: string; id: string; thumb: string }[] }> = {
  bookdesign: {
    modelPath: "/models/PORTFLIO-B.obj",
    projects: [
      { name: "Project 01", id: "bookdesign-project01", thumb: "/thumbs/b1.jpg" },
      { name: "Project 02", id: "bookdesign-project02", thumb: "/thumbs/b2.jpg" },
      { name: "Project 03", id: "bookdesign-project03", thumb: "/thumbs/b3.jpg" },
      { name: "Project 04", id: "bookdesign-project04", thumb: "/thumbs/b4.jpg" }
    ]
  },
  event: {
    modelPath: "/models/PORTFLIO-E.obj",
    projects: [
      { name: "Event 01", id: "event-event01", thumb: "/thumbs/e1.jpg" },
      { name: "Event 02", id: "event-event02", thumb: "/thumbs/e2.jpg" },
      { name: "Event 03", id: "event-event03", thumb: "/thumbs/e3.jpg" }
    ]
  },
  studio: {
    modelPath: "/models/PORTFLIO-S.obj",
    projects: [
      { name: "Studio 01", id: "studio-studio01", thumb: "/thumbs/s1.jpg" },
      { name: "Studio 02", id: "studio-studio02", thumb: "/thumbs/s2.jpg" },
      { name: "Studio 03", id: "studio-studio03", thumb: "/thumbs/s3.jpg" }
    ]
  },
  graphic: {
    modelPath: "/models/PORTFLIO-G.obj",
    projects: [
      { name: "Graphic 01", id: "graphic-graphic01", thumb: "/thumbs/g1.jpg" },
      { name: "Graphic 02", id: "graphic-graphic02", thumb: "/thumbs/g2.jpg" },
      { name: "Graphic 03", id: "graphic-graphic03", thumb: "/thumbs/g3.jpg" },
      { name: "Graphic 04", id: "graphic-graphic04", thumb: "/thumbs/g4.jpg" }
    ]
  },
  typography: {
    modelPath: "/models/PORTFLIO-T.obj",
    projects: [
      { name: "Type 01", id: "typography-type01", thumb: "/thumbs/t1.jpg" },
      { name: "Type 02", id: "typography-type02", thumb: "/thumbs/t2.jpg" },
      { name: "Type 03", id: "typography-type03", thumb: "/thumbs/t3.jpg" }
    ]
  },
  other: {
    modelPath: "/models/PORTFLIO-O.obj",
    projects: [
      { name: "Other 01", id: "other-other01", thumb: "/thumbs/o1.jpg" },
      { name: "Other 02", id: "other-other02", thumb: "/thumbs/o2.jpg" },
      { name: "Other 03", id: "other-other03", thumb: "/thumbs/o3.jpg" }
    ]
  }
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  // 🌟 核心判断：如果路由只有分类名（如 /project/bookdesign）则是列表台；如果带横杠（如 /project/bookdesign-project01）则是详情页
  const 本身是列表 = projectId && !projectId.includes("-");
  const baseCategory = 本身是列表 ? projectId : projectId?.split("-")[0];

  const categoryTitle = baseCategory ? baseCategory.replace("design", " DESIGN").toUpperCase() : "";
  const currentSpecimen = CATEGORY_SPECIMENS[baseCategory || "bookdesign"] || CATEGORY_SPECIMENS.bookdesign;

  const handleProjectNavigate = (targetId: string) => {
    router.push(`/project/${targetId}`);
  };

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white relative select-none font-sans overflow-x-hidden">
      
      {/* 全局背景装饰网格 */}
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

      {/* 全局导航栏 */}
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

      {/* 🌟 条件渲染核心 */}
      {本身是列表 ? (
        /* ========================================================================= */
        /* 【模式 A：3D 交互标本大列表页】── 极限左移、纵向窄幅文本排版                   */
        /* ========================================================================= */
        <div className="relative w-screen h-screen overflow-hidden pt-28 pb-12 flex flex-col justify-between">
          
          {/* 前景悬浮大标题 ── 解除居中限制，全宽铺开，极限左移留白 */}
          <div className="relative z-20 w-full px-8 md:pl-16 md:pr-12 border-b border-white/5 pb-8 mt-4 pointer-events-none flex flex-col items-start">
            <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase block mb-2">
              SPECIMEN OBSERVATION / 标本交互台
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-wider text-white uppercase mb-4 leading-none">
              {categoryTitle}
            </h1>
            
            {/* 说明文字：放大字号 (text-sm)，极致窄幅限制 (max-w-[280px]) 迫使频繁换行 */}
            <p className="text-sm text-white/50 max-w-[280px] md:max-w-[320px] font-light tracking-wide leading-relaxed block">
              Interact with the letter core. 
              <br />
              Hover over project anchors 
              <br />
              to capture immediate 
              <br />
              archival imagery data.
              
              {/* 中文说明高频换行，严防死守撞上中央模型 */}
              <span className="text-xs text-white/25 mt-4 block leading-loose">
                纯白字母与小球已在全屏幕
                <br />
                绝对归零对齐，
                <br />
                细丝结构线精确咬合
                <br />
                几何边缘。
              </span>
            </p>
          </div>

          {/* 全屏无边框 3D 画布背景（组件内部自带有 fixed inset-0 铺满视口） */}
          <SpecimenCanvas 
            modelPath={currentSpecimen.modelPath}
            projects={currentSpecimen.projects}
            onProjectClick={handleProjectNavigate}
          />

          {/* 底端极简页脚 ── 同步极限左对齐 */}
          <div className="relative z-20 w-full px-8 md:pl-16 text-[9px] text-white/10 tracking-[0.25em] text-left border-t border-white/5 pt-4 pointer-events-none uppercase">
            WU YIZHOU DESIGN LABORATORY · PROJECT METRICS ACTIVE
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 【模式 B：单个项目具体详情页】── 点击小球标签按钮后跳转进入                   */
        /* ========================================================================= */
        <div className="relative z-10 pt-32 min-h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 pb-24">
          
          {/* 左侧大图展示区 */}
          <div className="w-full md:w-3/5 space-y-8">
            <div className="w-full aspect-[4/3] bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
              <span className="text-white/10 text-xs tracking-[0.4em] uppercase font-light">
                Main Showcase Image
              </span>
            </div>
          </div>
          
          {/* 右侧文字内容介绍区 */}
          <div className="w-full md:w-2/5 md:sticky md:top-32 h-fit space-y-8">
            <div>
              <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase block mb-2">
                {categoryTitle}
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-wider text-white uppercase break-words leading-tight">
                {projectId ? projectId.split("-")[1]?.toUpperCase() || "PROJECT DETAIL" : "PROJECT DETAIL"}
              </h1>
            </div>
          </div>

        </div>
      )}

    </main>
  );
}