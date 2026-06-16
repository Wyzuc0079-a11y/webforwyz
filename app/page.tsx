"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; 

const CanvasScene = dynamic(() => import("./CanvasScene"), { ssr: false });

const SECTIONS = [
  { id: "bookdesign", title: "BOOK DESIGN", modelPath: "/models/PORTFLIO-B.obj", projects: ["Project 01", "Project 02", "Project 03", "Project 04"] },
  { id: "event", title: "EVENTS", modelPath: "/models/PORTFLIO-E.obj", projects: ["Event 01", "Event 02", "Event 03"] },
  { id: "studio", title: "STUDIO ITSELF", modelPath: "/models/PORTFLIO-S.obj", projects: ["Studio 01", "Studio 02", "Studio 03"] },
  { id: "graphic", title: "GRAPHIC DESIGN", modelPath: "/models/PORTFLIO-G.obj", projects: ["Graphic 01", "Graphic 02", "Graphic 03", "Graphic 04"] },
  { id: "typography", title: "TYPOGRAPHY", modelPath: "/models/PORTFLIO-T.obj", projects: ["Type 01", "Type 02", "Type 03"] },
  { id: "other", title: "OTHER", modelPath: "/models/PORTFLIO-O.obj", projects: ["Other 01", "Other 02", "Other 03"] }
];

const STEP = 1 / SECTIONS.length;

// 🌟 辅助工具函数：将原本的 bookdesign, event 转换为我们物理文件夹对应的 b, e, s, g, t, o 后缀
function getLetterFolderSuffix(sectionId: string): string {
  switch (sectionId) {
    case "bookdesign": return "b";
    case "event": return "e";
    case "studio": return "s";
    case "graphic": return "g";
    case "typography": return "t";
    case "other": return "o";
    default: return "b";
  }
}

function BottomFooter() {
  return (
    <div className="h-[24vh] bg-transparent flex flex-col justify-end pb-8 border-t border-white/5 relative z-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs tracking-wider">
          <div className="text-white/40 text-center md:text-left leading-relaxed font-light">
            <div>© 2026 WU YIZHOU. ALL RIGHTS RESERVED.</div>
            <div className="text-[10px] text-white/25 mt-1">WU Yizhou · 保留所有权利 · 著作権所有</div>
          </div>
          <div className="flex items-center space-x-6 md:space-x-8 text-white/40 font-light">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">INSTAGRAM</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">X (TWITTER)</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LINKEDIN</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-white/20 hover:text-white transition-colors duration-300 border border-white/10 px-2 py-1 rounded text-[10px]">TOP ↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter(); 
  const [t, setT] = useState(0); 
  const [isClient, setIsClient] = useState(false);
  const raf = useRef<number | null>(null);
  
  const [uiState, setUiState] = useState({ 
    index: 0, 
    titleAlpha: 0, 
    btnAlpha: 0,
    projectedY: 50,
    edgeOffsets: [46, 46, 46, 46, 46]
  });

  const getScrollHeight = () => (SECTIONS.length * window.innerHeight * 1.55) + window.innerHeight;

  useEffect(() => {
    setIsClient(true);
    
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const sy = window.scrollY;
        const total = getScrollHeight() - window.innerHeight; 
        const nt = Math.min(Math.max(sy / total, 0), 1);
        setT(nt);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    const savedPosition = sessionStorage.getItem("gallery_scroll_position");
    if (savedPosition) {
      const targetPos = parseInt(savedPosition, 10);
      
      let attempts = 0;
      const scrollTimer = setInterval(() => {
        if (document.documentElement.scrollHeight >= targetPos || attempts > 10) {
          window.scrollTo(0, targetPos); 
          onScroll(); 
          clearInterval(scrollTimer); 
          sessionStorage.removeItem("gallery_scroll_position"); 
        }
        attempts++;
      }, 30);
    } else {
      onScroll();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const jumpToSection = (index: number) => {
    const targetSection = SECTIONS[index];
    const totalHeight = getScrollHeight() - window.innerHeight;
    const targetScrollY = (index * STEP + STEP * 0.5) * totalHeight;
    
    const startScrollY = window.scrollY;
    
    if (Math.abs(startScrollY - targetScrollY) < 5) {
      sessionStorage.setItem("gallery_scroll_position", window.scrollY.toString());
      // 🌟 升级：顶部导航栏直接点击时，精准导向你的独立二级分厅路由
      const suffix = getLetterFolderSuffix(targetSection.id);
      router.push(`/letter-${suffix}`);
      return;
    }

    const currentSectionIndex = uiState.index;
    const indexDistance = Math.max(1, Math.abs(index - currentSectionIndex));
    const duration = indexDistance * 450; 
    
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const currentProgress = easeInOutCubic(progress);
      window.scrollTo(0, startScrollY + (targetScrollY - startScrollY) * currentProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    const stayDuration = index === 0 ? 100 : 1000;

    setTimeout(() => {
      sessionStorage.setItem("gallery_scroll_position", window.scrollY.toString());
      // 🌟 升级：动画滚完定格后，完美分流进入对应的 2 级综合 More 文件夹
      const suffix = getLetterFolderSuffix(targetSection.id);
      router.push(`/letter-${suffix}`);
    }, duration + stayDuration); 
  };

  const handleProjectClick = (url: string) => {
    sessionStorage.setItem("gallery_scroll_position", window.scrollY.toString());
    router.push(url);
  };

  if (!isClient) return <main className="bg-[#1c1c1c] min-h-screen" />;

  const cur = SECTIONS[uiState.index];
  const letterSuffix = getLetterFolderSuffix(cur.id);

  return (
    <main className="bg-[#1c1c1c] min-h-screen text-white relative select-none">
      
      <div 
        className="fixed inset-0 z-20 pointer-events-none transform-gpu"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="fixed inset-0 z-10 pointer-events-none">
        <CanvasScene t={t} setUiState={setUiState} sections={SECTIONS} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c]/40 backdrop-blur-md border-b border-b-white/5 px-6 md:px-12">
        <div className="flex justify-between items-center h-20 max-w-7xl mx-auto">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="WU Yizhou Logo" 
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>
          <div className="flex space-x-6 md:space-x-10 text-xs tracking-widest overflow-x-auto no-scrollbar py-2">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => jumpToSection(i)}
                className={`transition-all duration-300 whitespace-nowrap ${i === uiState.index && uiState.titleAlpha > 0.3 ? "text-white font-bold scale-105" : "text-white/30 hover:text-white/70"}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {t < 0.02 && (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500" style={{ opacity: 1 - t / 0.02 }}>
          <p className="text-white/30 text-xs tracking-[0.3em] font-light uppercase animate-pulse">Scroll to explore</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-4 animate-bounce" />
        </div>
      )}

      {uiState.titleAlpha > 0.01 && (
        <div 
          className="fixed z-45 pointer-events-none transition-opacity duration-300 ease-out" 
          style={{ 
            opacity: uiState.titleAlpha, 
            left: `${uiState.edgeOffsets ? uiState.edgeOffsets[0] : 46}%`,
            top: `${uiState.projectedY - 2}%`, 
            transform: `translateY(-100%)` 
          }}
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-widest text-white whitespace-nowrap pb-2">
            {cur.title}
          </h2>
        </div>
      )}

      {uiState.btnAlpha > 0.01 && (
        <div 
          className="fixed z-45 inset-0 pointer-events-none"
          style={{ opacity: uiState.btnAlpha }}
        >
          {cur.projects.map((p, i) => {
            const currentLeft = uiState.edgeOffsets ? uiState.edgeOffsets[i] : 46;
            const rowTop = uiState.projectedY + 2 + (i * 4.5); 
            
            // 🌟 升级：点击具体的项目时，穿透送往对应的 3 级动态详情路由 (例如：/letter-b/bookdesign-project01)
            const cleanedProjectName = p.toLowerCase().replace(/\s+/g, "");
            const targetDetailUrl = `/letter-${letterSuffix}/${cur.id}-${cleanedProjectName}`;

            return (
              <button 
                key={`${uiState.index}-${i}-${Math.round(currentLeft)}`} 
                onClick={() => handleProjectClick(targetDetailUrl)} 
                className="fixed pointer-events-auto text-white/70 hover:text-white hover:translate-x-2 text-sm md:text-lg font-light tracking-wide py-1 text-left whitespace-nowrap"
                style={{
                  left: `${currentLeft}%`,
                  top: `${rowTop}%`,
                  transition: "left 0.12s ease-out, opacity 0.2s ease-out",
                }}
              >
                {p}
              </button>
            );
          })}

          {/* 🌟 升级：点击 MORE CASES 时，无缝对接跳转到你的二级专属展厅 (例如：/letter-b) */}
          <button 
            key={`more-${uiState.index}`}
            onClick={() => handleProjectClick(`/letter-${letterSuffix}`)}
            className="fixed pointer-events-auto text-white/40 hover:text-white transition-all duration-300 text-xs tracking-wider pt-2 border-t border-white/10 text-left cursor-pointer"
            style={{
              left: `${uiState.edgeOffsets ? uiState.edgeOffsets[4] : 46}%`,
              top: `${uiState.projectedY + 2 + (cur.projects.length * 4.5)}%`,
            }}
          >
            MORE CASES →
          </button>
        </div>
      )}

      <div style={{ height: `${SECTIONS.length * 155}vh` }} />

      <BottomFooter />
    </main>
  );
}