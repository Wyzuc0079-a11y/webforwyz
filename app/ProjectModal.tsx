"use client";

import React, { useEffect } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string; // 比如 "BOOK DESIGN"
  projectName: string;  // 比如 "Project 01"
}

export default function ProjectModal({ isOpen, onClose, sectionTitle, projectName }: ProjectModalProps) {
  
  // 监听 ESC 键，按下时自动关闭，提升用户体验
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // 🌟 全屏遮罩层：高层级 z-50，自带高级的模糊（backdrop-blur）效果
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg transition-all duration-500 animate-fadeIn">
      
      {/* 🌟 详情内容面板 */}
      <div className="relative w-full h-full md:w-[90vw] md:h-[85vh] bg-[#1c1c1c] border border-white/10 md:rounded-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* ❌ 右上角极简有关按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-white/40 hover:text-white tracking-widest text-xs transition-colors duration-300 group"
        >
          CLOSE <span className="inline-block transition-transform duration-300 group-hover:rotate-90">✕</span>
        </button>

        {/* 🖼️ 左侧：巨幅项目视觉图区域 */}
        <div className="w-full md:w-3/5 h-1/2 md:h-full bg-black/40 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          {/* 💡 实际项目中你可以把下面这个灰色占位块换成真实图片: <img src="..." /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <span className="text-white/10 text-xs tracking-[0.4em] uppercase font-light">Project Image Placeholder</span>
        </div>

        {/* 📝 右侧：详尽的项目图文排版区（支持滚动） */}
        <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-between no-scrollbar">
          
          <div>
            {/* 面包屑分类 */}
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase block mb-2">{sectionTitle}</span>
            {/* 项目主标题 */}
            <h3 className="text-2xl md:text-4xl font-black tracking-wider text-white mb-6 uppercase">{projectName}</h3>
            
            {/* 精致的参数分割线表格 */}
            <div className="border-t border-b border-white/10 py-4 my-6 space-y-2 text-xs tracking-wide text-white/50 font-light">
              <div className="flex justify-between"><span>YEAR / 年份</span><span className="text-white/80">2026</span></div>
              <div className="flex justify-between"><span>ROLE / 职责</span><span className="text-white/80">Art Direction, Design</span></div>
              <div className="flex justify-between"><span>CLIENT / 客户</span><span className="text-white/80">Personal Project</span></div>
            </div>

            {/* 中英双语设计理念描述 */}
            <div className="space-y-4 text-xs md:text-sm text-white/60 font-light leading-relaxed tracking-wide">
              <p>
                This project explores the intersection of geometric structure and digital minimalism, 
                redefining visual layouts within a three-dimensional interactive space.
              </p>
              <p className="text-white/40 text-[11px] font-normal leading-relaxed">
                该项目探索了几何结构与数字极简主义的交汇点，在三维交互空间中重新定义了视觉版式。
                通过网格的韵律与字母的张力，传递出严谨而具有艺术感的设计语言。
              </p>
            </div>
          </div>

          {/* 底部外链链接（可选） */}
          <div className="pt-8">
            <a 
              href="#launch" 
              className="inline-block text-xs tracking-widest text-white/40 hover:text-white border border-white/20 hover:border-white px-4 py-2 transition-all duration-300"
            >
              LAUNCH PROJECT →
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}