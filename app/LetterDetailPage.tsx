import type { PortfolioCategory } from "./portfolioContent";
import PageShell from "./components/PageShell";
import { useLanguage } from "./lib/i18n";

type LetterDetailPageProps = {
  category: PortfolioCategory;
  projectId: string;

  // 导航栏强调色，不传就用默认白色
  navAccentColor?: string;
};

export default function LetterDetailPage({ category, projectId, navAccentColor }: LetterDetailPageProps) {
  const { lang, t } = useLanguage();
  const projectTitle = projectId.split("-")[1]?.toUpperCase() || "PROJECT DETAIL";

  return (
    <PageShell
      backHref={`/letter-${category.routeSuffix}`}
      navAccentColor={navAccentColor}
    >
      <div className="relative z-10 pt-32 min-h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 pb-24">

        {/* 左侧图片区域 */}
        <div className="w-full md:w-3/5 space-y-8">
          <div className="w-full relative">
            <img
              src={`/photo/g/p04/poster-front.jpg`}
              alt={projectTitle}
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* 右侧信息区域 */}
        <div className="w-full md:w-2/5 md:sticky md:top-32 h-fit space-y-8">
          <div>
            {/* 分类标签 ── 字号 008 最小字 */}
            <span
              style={{ fontSize: "var(--fs-008)" }}
              className="text-white/30 tracking-[0.3em] uppercase block mb-2"
            >
              {category.detailLabel} / {lang === "cn" ? "详细报告" : lang === "jp" ? "詳細レポート" : "Detailed Report"}
            </span>

            {/* 项目主标题 ── 字号 002 大标题 */}
            <h1
              style={{ fontSize: "var(--fs-002)" }}
              className="font-black tracking-wider text-white uppercase break-words leading-tight"
            >
              {projectTitle}
            </h1>
          </div>

          <div className="text-neutral-400 leading-relaxed tracking-wider space-y-4 font-light">
            {/* 数据标注行 ── 字号 007 注释级 */}
            <p
              style={{ fontSize: "var(--fs-007)" }}
              className="border-t border-white/5 pt-4"
            >
              {`// PRODUCTION SPECIMEN DATA`}
            </p>

            {/* 正文描述 ── 字号 006 小字 */}
            <p style={{ fontSize: "var(--fs-006)" }}>
              {t(`detail_${category.key}`)}
            </p>
          </div>
        </div>

      </div>
    </PageShell>
  );
}