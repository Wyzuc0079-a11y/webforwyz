"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "./portfolioContent";
import type { CanvasUiState } from "./CanvasScene";
import { useLanguage } from "./lib/i18n";

const CanvasScene = dynamic(() => import("./CanvasScene"), { ssr: false });

const SECTIONS = [
  { id: "bookdesign", title: "BOOK DESIGN", modelPath: "/models/PORTFLIO-B.obj", projects: ["Project 01", "Project 02", "Project 03", "Project 04"] },
  { id: "event", title: "EVENTS", modelPath: "/models/PORTFLIO-E.obj", projects: ["Event 01", "Event 02", "Event 03"] },
  { id: "studio", title: "STUDIO ITSELF", modelPath: "/models/PORTFLIO-S.obj", projects: ["Studio 01", "Studio 02", "Studio 03"] },
  { id: "graphic", title: "GRAPHIC DESIGN", modelPath: "/models/PORTFLIO-G.obj", projects: ["Graphic 01", "Graphic 02", "Graphic 03", "「石の裏を覗く」"] },
  { id: "typography", title: "TYPOGRAPHY", modelPath: "/models/PORTFLIO-T.obj", projects: ["Type 01", "Type 02", "Type 03"] },
  { id: "other", title: "OTHER", modelPath: "/models/PORTFLIO-O.obj", projects: ["Other 01", "Other 02", "Other 03"] }
];

const STEP = 1 / SECTIONS.length;

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

function getProjectDetailUrl(sectionId: string, projectIndex: number): string {
  const category = CATEGORIES.find((item) => item.key === sectionId);
  if (!category) return "/letter-b/bookdesign-project01";
  const number = String(projectIndex + 1).padStart(2, "0");
  return `/letter-${category.routeSuffix}/${category.detailPrefix}-project${number}`;
}

function BottomFooter() {
  return (
    <div className="h-[24vh] bg-transparent flex flex-col justify-end pb-8 border-t border-white/5 relative z-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 tracking-wider">

          <div className="text-white/40 text-center md:text-left leading-relaxed font-light">
            {/* 版权主文字 ── 字号 007 注释级 */}
            <div style={{ fontSize: "var(--fs-007)" }}>
              © 2026 WU YIZHOU. ALL RIGHTS RESERVED.
            </div>
            {/* 版权副文字 ── 字号 008 最小字 */}
            <div
              style={{ fontSize: "var(--fs-008)" }}
              className="text-white/25 mt-1"
            >
              WU Yizhou · 保留所有权利 · 著作権所有
            </div>
          </div>

          <div className="flex items-center space-x-6 md:space-x-8 text-white/40 font-light">
            {/* 底部社交链接 ── 字号 007 注释级 */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "var(--fs-007)" }}
              className="hover:text-white transition-colors duration-300"
            >
              INSTAGRAM
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "var(--fs-007)" }}
              className="hover:text-white transition-colors duration-300"
            >
              X (TWITTER)
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "var(--fs-007)" }}
              className="hover:text-white transition-colors duration-300"
            >
              LINKEDIN
            </a>
            {/* TOP 按钮 ── 字号 008 最小字 */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ fontSize: "var(--fs-008)" }}
              className="text-white/20 hover:text-white transition-colors duration-300 border border-white/10 px-2 py-1 rounded"
            >
              TOP ↑
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { t: langT } = useLanguage(); // 语言翻译函数
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);
  const [winWidth, setWinWidth] = useState(1920); // 记录屏幕宽度，用于按钮定位

  const [uiState, setUiState] = useState<CanvasUiState>({
    index: 0,
    titleAlpha: 0,
    btnAlpha: 0,
    projectedY: 50,
    edgeOffsets: [46, 46, 46, 46, 46]
  });

  const getScrollHeight = () => (SECTIONS.length * window.innerHeight * 1.55) + window.innerHeight;

  useEffect(() => {
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

    // 监听屏幕宽度变化，用于按钮定位
    const handleResize = () => setWinWidth(window.innerWidth);
    setWinWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("resize", handleResize);
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
      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);

    const stayDuration = index === 0 ? 100 : 1000;
    setTimeout(() => {
      sessionStorage.setItem("gallery_scroll_position", window.scrollY.toString());
      const suffix = getLetterFolderSuffix(targetSection.id);
      router.push(`/letter-${suffix}`);
    }, duration + stayDuration);
  };

  const handleProjectClick = (url: string) => {
    sessionStorage.setItem("gallery_scroll_position", window.scrollY.toString());
    router.push(url);
  };

  const cur = SECTIONS[uiState.index];
  const letterSuffix = getLetterFolderSuffix(cur.id);

  // =========================================================================
  // 按钮位置单独调节面板（每个分类单独设置）
  //
  // 每个数组从左到右依次为：
  //   [标题, 项目1, 项目2, 项目3, 项目4(如果没有则不填), MORE CASES]
  // WIDE_OFFSETS  → 宽屏(≥1920px)  NARROW_OFFSETS → 窄屏(≤768px)
  // 数字 = left 百分比，越大越靠右，中间宽度自动平滑过渡。
  // =========================================================================
  type OffsetRow = [number, number, number, number, number, number?]; // [标题, p1, p2, p3, 可选p4, more]
  const WIDE_OFFSETS: Record<string, OffsetRow> = {
    bookdesign:  [52, 48, 48, 48, 48, 52],
    event:       [52, 44, 44, 44.5,       51.5],
    studio:      [58, 50, 50, 50,       55],
    graphic:     [57, 48, 48.1, 48, 47.5, 55],
    typography:  [53, 46.5, 46.2, 46,       50],
    other:       [58, 48, 48.5, 48.5,       53],
  };
  const NARROW_OFFSETS: Record<string, OffsetRow> = {
    bookdesign:  [56, 56, 56, 56, 52, 56],
    event:       [56, 50, 56, 50,       61],
    studio:      [64, 56, 60, 56,       59],
    graphic:     [68, 58, 62, 58, 53, 63],
    typography:  [56, 40, 47, 46,       50],
    other:       [68, 58, 56, 55,       60],
  };
  const WIDE_WIDTH = 1920;
  const NARROW_WIDTH = 768;
  const clamped = Math.min(Math.max(winWidth, NARROW_WIDTH), WIDE_WIDTH);
  const ratio = (clamped - NARROW_WIDTH) / (WIDE_WIDTH - NARROW_WIDTH);
  // 计算当前分类的每个位置上对应的 left 值
  const wideRow = WIDE_OFFSETS[cur.id]!;
  const narrowRow = NARROW_OFFSETS[cur.id]!;
  const calcLeft = (i: number) => narrowRow[i] + (wideRow[i] - narrowRow[i]) * ratio;

  return (
    <main className="bg-[#1c1c1c] min-h-screen text-white relative select-none">

      {/* 背景网格 */}
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

      {/* 3D 画布 */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <CanvasScene t={t} setUiState={setUiState} sections={SECTIONS} />
      </div>

      {/* 顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c]/40 backdrop-blur-md border-b border-b-white/5 px-6 md:px-12 h-20">
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto w-full">
          
          <div className="flex items-center h-full">
            <img
              src="/logo.png"
              alt="WU Yizhou Logo"
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>

          {/* 导航按钮 ── 屏幕宽度不足 lg (1024px) 时隐藏，只留 logo */}
          <div className="hidden lg:flex items-center gap-x-10 tracking-widest h-full py-0">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => jumpToSection(i)}
                style={{ fontSize: "var(--fs-007)" }}
                className={`transition-all duration-300 whitespace-nowrap h-full flex items-center bg-transparent border-none outline-none cursor-pointer ${
                  i === uiState.index && uiState.titleAlpha > 0.3
                    ? "text-white font-bold"
                    : "text-white/30 hover:text-white/70"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

        </div>
      </nav>

      {/* 初始引导提示 ── 字号 007 注释级 */}
      {t < 0.02 && (
        <div
          className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500"
          style={{ opacity: 1 - t / 0.02 }}
        >
          <p
            style={{ fontSize: "var(--fs-007)" }}
            className="text-white/30 tracking-[0.3em] font-light uppercase animate-pulse"
          >
            {langT("home_scroll_hint")}
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-4 animate-bounce" />
        </div>
      )}

      {/* 分类大标题 ── 字号 001 极大标题 */}
      {uiState.titleAlpha > 0.01 && (
        <div
          className="fixed z-40 pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            opacity: uiState.titleAlpha,
            left: `${calcLeft(0)}%`,
            top: `${uiState.projectedY - 2}%`,
            transform: `translateY(-100%)`
          }}
        >
          <h2
            style={{ fontSize: "var(--fs-001)" }}
            className="font-black tracking-widest text-white whitespace-nowrap pb-2"
          >
            {cur.title}
          </h2>
        </div>
      )}

      {/* 项目列表按钮 ── 字号 005 正文 */}
      {uiState.btnAlpha > 0.01 && (
        <div
          className="fixed z-40 inset-0 pointer-events-none"
          style={{ opacity: uiState.btnAlpha }}
        >
          {cur.projects.map((p, i) => {
            // calcLeft(i+1) 取项目按钮的位置（索引0是标题，项目从1开始）
            const shapeDiff = uiState.edgeOffsets ? uiState.edgeOffsets[i] - 46 : 0;
            const currentLeft = calcLeft(i + 1) + shapeDiff;
            const rowTop = uiState.projectedY + 2 + (i * 4.5);
            const targetDetailUrl = getProjectDetailUrl(cur.id, i);

            return (
              <button
                key={`${uiState.index}-${i}-${Math.round(currentLeft)}`}
                onClick={() => handleProjectClick(targetDetailUrl)}
                style={{
                  fontSize: "var(--fs-005)",
                  left: `${currentLeft}%`,
                  top: `${rowTop}%`,
                  transition: "left 0.12s ease-out, opacity 0.2s ease-out",
                }}
                className="fixed pointer-events-auto text-white/70 hover:text-white hover:translate-x-2 font-light tracking-wide py-1 text-left whitespace-nowrap"
              >
                {p}
              </button>
            );
          })}

          {/* MORE CASES 按钮 ── 字号 007 注释级 */}
          <button
            key={`more-${uiState.index}`}
            onClick={() => handleProjectClick(`/letter-${letterSuffix}`)}
            style={{
              fontSize: "var(--fs-007)",
              left: `${calcLeft(wideRow.length - 1)}%`,
              top: `${uiState.projectedY + 2 + (cur.projects.length * 4.5)}%`,
              transition: "left 0.12s ease-out, opacity 0.2s ease-out",
            }}
            className="fixed pointer-events-auto text-white/40 hover:text-white transition-all duration-300 tracking-wider pt-2 border-t border-white/10 text-left cursor-pointer"
          >
            {langT("home_more_cases")}
          </button>
        </div>
      )}

      <div style={{ height: `${SECTIONS.length * 155}vh` }} />

      <BottomFooter />
    </main>
  );
}