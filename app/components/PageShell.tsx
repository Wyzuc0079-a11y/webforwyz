"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/lib/i18n";

type PageShellProps = {
  children: React.ReactNode;

  // 返回按钮的链接地址，比如 "/" 或 "/letter-b"
  backHref: string;

  // 导航栏强调色，默认白色，可以每个界面传入不同颜色
  // 例如：navAccentColor="#FF6B00" 或 navAccentColor="#00BFFF"
  navAccentColor?: string;
};

export default function PageShell({
  children,
  backHref,
  navAccentColor = "#ffffff",
}: PageShellProps) {
  const router = useRouter();
  const { lang } = useLanguage();

  // 根据 backHref 自动生成三语返回文字
  // backHref === "/" → 回到主页  |  backHref 以 "/letter-" 开头 → 回到3D画廊
  const backLabel =
    backHref === "/"
      ? lang === "cn"
        ? "← 回到主页"
        : lang === "jp"
          ? "← ホームに戻る"
          : "← BACK TO HOME"
      : lang === "cn"
        ? "← 回到3D画廊"
        : lang === "jp"
          ? "← 3Dギャラリーに戻る"
          : "← BACK TO 3D GALLERY";

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white relative select-none font-sans overflow-x-hidden">

      {/* 背景网格 ── 全局共用，所有界面一致 */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transform-gpu"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 导航栏 ── 全局共用，颜色通过 navAccentColor 控制 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c]/40 backdrop-blur-md border-b border-white/5 px-6 md:px-12">
        {/* ▲ px-6/md:px-12 = 导航栏左右内边距 */}
        <div className="flex justify-between items-center h-20 max-w-7xl mx-auto">
          {/* ▲ h-20 = 导航栏高度（影响内容区 pt-32 是否需要同步调整） */}

          {/* Logo ── 点击回首页 */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img
              src="/logo.png"
              alt="ctww004 Logo"
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* 返回按钮 ── 文字颜色跟随 navAccentColor */}
          <button
            onClick={() => router.push(backHref)}
            style={{
              fontSize: "var(--fs-007)", /* 导航按钮 ── 注释级 */
              color: navAccentColor,
            }}
            className="tracking-widest opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            {backLabel}
          </button>

        </div>
      </nav>

      {/* 页面主体内容 ── 每个界面自己决定 */}
      {children}

    </main>
  );
}