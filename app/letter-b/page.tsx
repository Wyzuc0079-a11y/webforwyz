"use client";

import { useRouter } from "next/navigation";
import SpecimenCanvas from "@/components/SpecimenCanvas";

/* ========================================================================= */
/* 🗺️ B 分类 精简版 15 个项目【独立物理坐标控制中心 & 标题 8 字自动截断】 */
/* ========================================================================= */
const RAW_PROJECTS = [
  { id: "bookdesign-project01", name: "『感覚斜行』", thumb: "/thumbs/b1.jpg", ballPos: { x: 1.8, y: 1.4, z: 4.35 } }, // 顶层偏左
  { id: "bookdesign-project02", name: "『私は』", thumb: "/thumbs/b2.jpg", ballPos: { x: -0.55, y: 0.7, z: 4.15 } }, // 顶层偏右
  { id: "bookdesign-project03", name: "『落とし物』", thumb: "/thumbs/b3.jpg", ballPos: { x: 1.5, y: 0.3, z: 4.05 } }, // 上层极左
  { id: "bookdesign-project04", name: "『生活者工房』令和四年", thumb: "/thumbs/b4.jpg", ballPos: { x: -1.65, y: -1.7, z: 3.46 } }, // 上层居中偏近
  { id: "bookdesign-project05", name: "『日本酒の話』", thumb: "/thumbs/b5.jpg", ballPos: { x: -0.45, y: 2.15, z: 4.5 } }, // 上层极右
  { id: "bookdesign-project06", name: "『凬々展』記録冊子", thumb: "/thumbs/b6.jpg", ballPos: { x: 1.1, y: -1.05, z: 3.7 } }, // 中上偏左
  { id: "bookdesign-project07", name: "『石の裏を覗く』記録冊子", thumb: "/thumbs/b7.jpg", ballPos: { x: -1.56, y: 0.2, z: 3.95 } }, // 中层偏右
  { id: "bookdesign-project08", name: "『字』", thumb: "/thumbs/b8.jpg", ballPos: { x: 1.5, y: 0.3, z: 2.5 } }, // 绝对中线左
  { id: "bookdesign-project09", name: "『良渚』", thumb: "/thumbs/b9.jpg", ballPos: { x:-0.45, y: 2.15, z: 0. } }, // 核心正中央
  { id: "bookdesign-project10", name: "『MYTHISTORY』", thumb: "/thumbs/b10.jpg", ballPos: { x: 2.0, y: -1.2, z: 3.7 } }, // 绝对中线右
  { id: "bookdesign-project11", name: "『斬蛇』", thumb: "/thumbs/b11.jpg", ballPos: { x: -0.61, y: -0.22, z: 0 } }, // 中下偏左
  { id: "bookdesign-project12", name: "『掃』＆『黒』", thumb: "/thumbs/b12.jpg", ballPos: { x: 0.55, y: -1.85, z: 2.5 } }, // 中下偏右
  { id: "bookdesign-project13", name: "『环境、气候变动及经济模型与良渚的集落形态』、『绳文时代的意象 宗教与生活』", thumb: "/thumbs/b13.jpg", ballPos: { x: -1.7, y: -2.9, z: 3.1 } }, // 下层极左
  { id: "bookdesign-project14", name: "Project 14", thumb: "/thumbs/b14.jpg", ballPos: { x: 0.1, y: -0.9, z: 0.5 } }, // 下层居中
  { id: "bookdesign-project15", name: "Project 15", thumb: "/thumbs/b15.jpg", ballPos: { x: 1.2, y: -1.0, z: 0.6 } }, // 下层极右
];

// 📌 核心过滤器已更新：如果原始标题超过 8 个字，则精准截取前 8 个汉字，并在后面接上省略号
function formatTitle(title: string): string {
  if (title.length > 8) {
    return title.slice(0, 8) + "...";
  }
  return title;
}

export default function BookDesignListPage() {
  const router = useRouter();

  const canvasProjects = RAW_PROJECTS.map((proj) => ({
    id: proj.id,
    name: formatTitle(proj.name),
    thumb: proj.thumb,
    ballPos: proj.ballPos,
  }));

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
            className="text-xs tracking-widest text-white/100 hover:text-white transition-colors duration-300"
          >
            BACK TO TOP ←
          </button>
        </div>
      </nav>

      <div className="relative w-screen h-screen overflow-hidden pt-28 pb-12 flex flex-col justify-between">
        
        {/* 前景悬浮大标题区域（Z轴已沉降到3D层级下方） */}
        <div className="relative z-10 w-full px-8 md:pl-16 md:pr-12 border-b border-white/5 pb-8 mt-4 pointer-events-none flex flex-col items-start">
          <span className="text-white/80 text-[12px] tracking-[0.3em] uppercase block mb-2">
            书籍装帧/書籍デザイン
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-wider text-white uppercase mb-30 leading-none">
            BOOK DESIGN
          </h1>
          
          {/* 🌟 彻底重构的文本块：彻底解决标签嵌套引发的未刷新问题 */}
          <div className="max-w-[280px] md:max-w-[400px] block">
            {/* 1. 中文先上 */}
            <div className="text-[12px] text-white/90 block leading-[30px] font-normal">
              本界面的作品皆为
              <br />
              由多个具有厚度的平面单元构成
              <br />
              通过一个或多个旋转轴心连接
              <br />
              并可在旋转运动过程中形成不同空间状态的集合体。
            </div>

            {/* 2. 英文随后 */}
            <div className="text-[14px] text-white/80 font-light tracking-wide leading-[32px] block mt-10">
              All works presented in this section
              <br />
              are assemblages consisting of
              <br />
              multiple planar elements with measurable thickness,
              <br />
              connected by one or more
              <br />
              rotational axes and capable of
              <br />
              forming different spatial configurations
              <br />
              through rotational movement.
            </div>
          </div>
        </div>

        {/* 3D 渲染画布 */}
        <SpecimenCanvas
          modelPath="/models/PORTFLIO-B.obj"
          projects={canvasProjects}
          onProjectClick={(targetId) => {
            router.push(`/letter-b/${targetId}`);
          }}
        />

        {/* 鼠标操作说明栏（紧贴底端悬浮） */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-black/50 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md z-50 flex items-center gap-x-5 flex-row text-[#FF6B00] text-[10px] font-bold tracking-wider shadow-2xl">
          <span>● ROTATE / 视角旋转 / 画面回転 [ Mouse Left Click ]</span>
          <span className="opacity-30 text-white font-normal">|</span>
          <span>● PAN / 拖动平移 / 画面移動 [ Shift + Mouse Left Click ]</span>
          <span className="opacity-30 text-white font-normal">|</span>
          <span>● ZOOM / 滚轮缩放 / 拡大縮小 [ Mouse Wheel ]</span>
        </div>

        {/* 底端极简页脚 */}
        <div className="relative z-20 w-full px-8 md:pl-16 text-[9px] text-white/10 tracking-[0.25em] text-left border-t border-white/5 pt-4 pointer-events-none uppercase">
          WU YIZHOU DESIGN LABORATORY · PROJECT METRICS ACTIVE
        </div>

      </div>
    </main>
  );
}