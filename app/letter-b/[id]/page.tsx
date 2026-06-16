"use client";

import { useParams, useRouter } from "next/navigation";

export default function BookDesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // 捕捉动态 ID，例如 "bookdesign-project01"
  const projectId = params?.id as string || "PROJECT DETAIL";

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
          {/* 这里可以点击一键返回到刚才的 2 级 More 列表大厅 */}
          <button 
            onClick={() => router.push("/letter-b")}
            className="text-xs tracking-widest text-white/40 hover:text-white transition-colors duration-300"
          >
            BACK TO BOOK INDEX ←
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 【模式 B：单个项目具体详情页】── 特效排版完美还原                             */}
      {/* ========================================================================= */}
      <div className="relative z-10 pt-32 min-h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 pb-24">
        
        {/* 左侧大图展示区 ── 保持你黄金比例的 4/3 大视窗 */}
        <div className="w-full md:w-3/5 space-y-8">
          <div className="w-full aspect-[4/3] bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
            <span className="text-white/10 text-xs tracking-[0.4em] uppercase font-light">
              Main Showcase Image / {projectId}
            </span>
          </div>
          {/* 你以后可以在这里继续往下堆叠更多细节照片，左侧支持自然向下滚动 */}
        </div>
        
        {/* 右侧文字内容介绍区 ── 保持高级的滚动粘滞效果（md:sticky） */}
        <div className="w-full md:w-2/5 md:sticky md:top-32 h-fit space-y-8">
          <div>
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase block mb-2">
              BOOK DESIGN // DETAILED REPORT
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-wider text-white uppercase break-words leading-tight">
              {projectId.split("-")[1]?.toUpperCase() || "PROJECT DETAIL"}
            </h1>
          </div>
          
          <div className="text-neutral-400 text-xs leading-relaxed tracking-wider space-y-4 font-light">
            <p className="border-t border-white/5 pt-4">// PRODUCTION SPECIMEN DATA</p>
            <p>通过独立物理分层进行的内容解耦。在脱离了主大厅滚轴宏观控制后，每一个落地的平面排版设计都将在这里以最纯粹、安稳的形式展开深入观察。</p>
          </div>
        </div>

      </div>

    </main>
  );
}