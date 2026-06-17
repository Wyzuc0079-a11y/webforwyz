"use client";

import React, { useRef, Suspense, forwardRef, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Group, Mesh, MeshBasicMaterial, Vector3, NoToneMapping } from "three";
import { OBJLoader } from "three-stdlib";

const STEP = 1 / 6; 

type SceneSection = {
  id: string;
  modelPath: string;
};

export type CanvasUiState = {
  index: number;
  titleAlpha: number;
  btnAlpha: number;
  projectedY: number;
  edgeOffsets: number[];
};

function getLetterState(p: number, idx: number) {
  p = Math.min(Math.max(p, 0), 1);
  let x = 0; let y = 0; let scale = 0.35; let rotationY = 0; let titleAlpha = 0; let btnAlpha = 0;

  if (p <= 0.3) {
    const ratio = p / 0.3; 
    if (idx === 0) y = -9.0 + ratio * 9.0; else y = -12.0 + ratio * 12.0; 
    x = 0 - ratio * 0.75; scale = 1.65 - ratio * 1.3; rotationY = 0;
  } else if (p > 0.3 && p <= 0.7) {
    x = -0.75; y = 0; scale = 0.35; 
    const rotRatio = (p - 0.3) / 0.4; rotationY = - (Math.PI / 6) * rotRatio; 
    if (p >= 0.3) {
      const uiRatio = Math.min((p - 0.3) / 0.15, 1); 
      titleAlpha = uiRatio; btnAlpha = uiRatio;
    }
  } else if (p > 0.7) {
    const outRatio = (p - 0.7) / 0.3;
    x = -0.75; scale = 0.35;
    rotationY = - (Math.PI / 6) - (Math.PI / 6) * outRatio; y = 0 + outRatio * 6.0;
    const fastOut = Math.min(outRatio / 0.5, 1); 
    titleAlpha = 1 - fastOut; btnAlpha = 1 - fastOut;
  }
  return { position: { x, y, z: 0 }, scale, rotation: rotationY, titleAlpha, btnAlpha, localProgress: p };
}

// =========================================================================
// 🌟 核心视觉间距调节面板（数字代表按钮离 3D 字母边缘的版式距离百分比）
// 💡 调节法则：数字越大，对应的那个按钮就会被往右【推得更远】；数字越小，就会往左【贴得更近】。
// =========================================================================
const LETTER_PROFILES: Record<string, { points: number[][][]; paddingOffsets: number[] }> = {
  
  // 🅰️ 字母 B 的专属微调（对应 BOOK DESIGN）
  bookdesign: { 
    points: [[[0,0],[1.1,0.4],[1.2,0]], [[0,0],[1.3,0.3],[1.4,0]], [[0,0],[1.0,0.4],[1.1,0]], [[0,0],[1.3,0.3],[1.4,0]], [[0,0],[1.1,0.4],[1.2,0]]],
    paddingOffsets: [
      4.5, // ← 第 1 行项目 (Project 01) 离 B 顶部的距离
      4.5, // ← 第 2 行项目 (Project 02) 离 B 上凸起的距离
      5.5, // ← 第 3 行项目 (Project 03) 离 B 中间内凹处的距离
      3.5, // ← 第 4 行项目 (Project 04) 离 B 下凸起的距离
      3.5  // ← 第 5 行项目 (MORE CASES 按钮) 离 B 底部的距离
    ]
  },

  // 🅱️ 字母 E 的专属微调（对应 EVENTS）
  event: { 
    points: [[[0,0],[1.3,0.2],[1.4,0]], [[0,0],[0.6,0.2],[0.7,0]], [[0,0],[1.2,0.2],[1.3,0]], [[0,0],[0.6,0.2],[0.7,0]], [[0,0],[1.3,0.2],[1.4,0]]],
    paddingOffsets: [
      7.0, // ← 第 1 行项目 (Event 01) 离 E 最上方横杠的距离
      9.0, // ← 第 2 行项目 (Event 02) 遇到 E 的第一个空隙：调大这个数字，能防止按钮缩进得太深
      6.0, // ← 第 3 行项目 (Event 03) 离 E 中间短横杠的距离
      4.5, // ← 第 4 行项目 (空行/位置补偿) 遇到 E 的第二个空隙
      6.0  // ← 第 5 行项目 (MORE CASES 按钮) 离 E 最下方横杠的距离
    ]
  },

  // 🅲️ 字母 S 的专属微调（对应 STUDIO ITSELF）
  studio: { 
    points: [[[0,0],[1.2,0.3],[1.3,0]], [[0,0],[0.8,0.4],[0.9,0]], [[0,0],[1.2,0.3],[1.3,0]], [[0,0],[0.7,0.4],[0.8,0]], [[0,0],[1.2,0.3],[1.3,0]]],
    paddingOffsets: [
      6.0, // ← 第 1 行项目 (Studio 01) 离 S 上弧顶部的距离
      8.0, // ← 第 2 行项目 (Studio 02) 离 S 左弯曲弧度的距离
      6.0, // ← 第 3 行项目 (Studio 03) 离 S 正中间交界处的距离
      7.0, // ← 第 4 行项目 (空行/位置补偿) 离 S 右下腹大弯曲处的距离
      5.5  // ← 第 5 行项目 (MORE CASES 按钮) 离 S 底部的距离
    ]
  },

  // 🅳️ 字母 G 的专属微调（对应 GRAPHIC DESIGN）
  graphic: { 
    points: [[[0,0],[1.2,0.3],[1.3,0]], [[0,0],[0.7,0.4],[0.8,0]], [[0,0],[1.1,0.3],[1.2,0]], [[0,0],[1.3,0.3],[1.4,0]], [[0,0],[1.2,0.3],[1.3,0]]],
    paddingOffsets: [
      7.0, // ← 第 1 行项目 (Graphic 01) 离 G 顶部圆弧的距离
      8.5, // ← 第 2 行项目 (Graphic 02) 离 G 左侧内壁凹陷的距离
      7.0, // ← 第 3 行项目 (Graphic 03) 离 G 横向小拐角的距离
      6.0, // ← 第 4 行项目 (Graphic 04) 离 G 右下角大拐弯的距离
      6.3  // ← 第 5 行项目 (MORE CASES 按钮) 离 G 底部的距离
    ]
  },

  // 🅴️ 字母 T 的专属微调（对应 TYPOGRAPHY）
  typography: { 
    points: [[[0,0],[1.4,0.2],[1.5,0]], [[0,0],[0.6,0.3],[0.7,0]], [[0,0],[0.6,0.3],[0.7,0]], [[0,0],[0.6,0.3],[0.7,0]], [[0,0],[0.6,0.3],[0.7,0]]],
    paddingOffsets: [
      1.0, // ← 第 1 行项目 (Type 01) 离 T 顶部宽横杠的距离（调小一些，防止横杠太宽把它推得太远）
      3.5, // ← 第 2 行项目 (Type 02) 离 T 下方细竖杆的距离（调大一些，防止离杆子太近、甚至重叠）
      3.5, // ← 第 3 行项目 (Type 03) 离 T 下方细竖杆的距离
      6.5, // ← 第 4 行项目 (空行/位置补偿) 离 T 下方细竖杆的距离
      3.3  // ← 第 5 行项目 (MORE CASES 按钮) 离 T 最底部的距离
    ]
  },

  // 🅵️ 字母 O 的专属微调（对应 OTHER）
  other: { 
    points: [[[0,0],[1.1,0.4],[1.2,0]], [[0,0],[1.3,0.3],[1.4,0]], [[0,0],[1.3,0.3],[1.4,0]], [[0,0],[1.1,0.4],[1.2,0]], [[0,0],[0.8,0.5],[0.9,0]]],
    paddingOffsets: [
      7.0, // ← 第 1 行项目 (Other 01) 离 O 上收口圆弧的距离
      5.5, // ← 第 2 行项目 (Other 02) 离 O 中上侧面最宽处的距离
      5.0, // ← 第 3 行项目 (Other 03) 离 O 中下侧面最宽处的距离
      4.0, // ← 第 4 行项目 (空行/位置补偿) 离 O 下收口圆弧的距离
      6.0  // ← 第 5 行项目 (MORE CASES 按钮) 离 O 正底部的距离
    ]
  }
};

const LetterModel = forwardRef<Group, { modelPath: string }>((props, ref) => {
  const obj = useLoader(OBJLoader, props.modelPath);
  const clonedObj = useMemo(() => {
    const c = obj.clone();
    c.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).material = new MeshBasicMaterial({ color: "#ffffff" });
      }
    });
    return c;
  }, [obj]);
  return <primitive ref={ref} object={clonedObj} />;
});
LetterModel.displayName = "LetterModel";

function FrameController({
  t,
  setUiState,
  sections,
}: {
  t: number;
  setUiState: (state: CanvasUiState) => void;
  sections: SceneSection[];
}) {
  const refs = useRef<(Group | null)[]>([]);
  const { camera, size } = useThree(); 
  const tempVec = useRef(new Vector3()).current;

  const calculateProjectedY = (model: Group) => {
    model.updateMatrixWorld(true);
    tempVec.setFromMatrixPosition(model.matrixWorld);
    tempVec.project(camera);
    const pixelY = ((-tempVec.y + 1) / 2) * size.height;
    return (pixelY / size.height) * 100;
  };

  useFrame(() => {
    let activeSectionIdx = 0; let activeTitleAlpha = 0; let activeBtnAlpha = 0;
    let currentActiveModel: Group | null = null;
    let activeRotationY = 0;
    let activeScale = 0.35;
    let activeLocalP = 0;

    refs.current.forEach((model, idx) => {
      if (!model) return;
      const center = idx * STEP + STEP / 2;
      const windowStart = center - STEP * 0.8; const windowEnd = center + STEP * 0.8;
      let local = 0;
      if (t >= windowStart && t <= windowEnd) local = (t - windowStart) / (windowEnd - windowStart);
      else if (t > windowEnd) local = 1;

      const state = getLetterState(local, idx);
      model.position.set(state.position.x, state.position.y, state.position.z);
      model.scale.set(state.scale, state.scale, state.scale);
      model.rotation.y = state.rotation;

      if (state.titleAlpha > activeTitleAlpha) {
        activeSectionIdx = idx; activeTitleAlpha = state.titleAlpha; activeBtnAlpha = state.btnAlpha;
        currentActiveModel = model;
        activeRotationY = state.rotation;
        activeScale = state.scale;
        activeLocalP = state.localProgress;
      }
    });

    const projectedY = currentActiveModel ? calculateProjectedY(currentActiveModel) : 50;
    const edgeOffsets = [46, 46, 46, 46, 46]; 

    if (currentActiveModel) {
      const curSection = sections[activeSectionIdx];
      const profile = LETTER_PROFILES[curSection.id] || LETTER_PROFILES["bookdesign"];
      
      tempVec.set(-0.75, 0, 0);
      tempVec.project(camera);
      const screenCenterX = ((tempVec.x + 1) / 2) * 100;

      profile.points.forEach((rowPoints, i) => {
        let maxProjectedX = -Infinity;

        rowPoints.forEach(([localX, localZ]) => {
          const sX = localX * activeScale;
          const sZ = localZ * activeScale;

          const rotatedX = sX * Math.cos(activeRotationY) + sZ * Math.sin(activeRotationY);
          const rotatedZ = -sX * Math.sin(activeRotationY) + sZ * Math.cos(activeRotationY);

          tempVec.set(-0.75 + rotatedX, 0, rotatedZ);
          tempVec.project(camera);

          const pX = ((tempVec.x + 1) / 2) * 100;
          if (pX > maxProjectedX) {
            maxProjectedX = pX;
          }
        });

        let stageOffset = 0;
        if (activeLocalP <= 0.3) {
          stageOffset = (1 - (activeLocalP / 0.3)) * 12.0;
        }

        const currentPadding = profile.paddingOffsets[i] || 4.0;
        edgeOffsets[i] = Math.max(screenCenterX + 5, maxProjectedX + stageOffset + currentPadding);
      });

      // 安全距离：保留各行形状差异，整体向右平移
      // 找到所有行中最小的 left 值，如果小于安全阈值，整体平移
      const SAFETY_MIN = 50; // ▲ 最小安全距离阈值。数字越大按钮整体越靠右
      const minOffset = Math.min(...edgeOffsets);
      if (minOffset < SAFETY_MIN) {
        const shift = SAFETY_MIN - minOffset;
        for (let i = 0; i < edgeOffsets.length; i++) {
          edgeOffsets[i] += shift;
        }
      }
    }

    setUiState({ 
      index: activeSectionIdx, 
      titleAlpha: activeTitleAlpha, 
      btnAlpha: activeBtnAlpha,
      projectedY,
      edgeOffsets
    });
  });

  return (
    <>
      <Suspense fallback={null}>
        {sections.map((s, i) => (
          <LetterModel key={s.id} ref={(el) => { refs.current[i] = el; }} modelPath={s.modelPath} />
        ))}
      </Suspense>
    </>
  );
}

export default function CanvasScene({
  t,
  setUiState,
  sections,
}: {
  t: number;
  setUiState: (state: CanvasUiState) => void;
  sections: SceneSection[];
}) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5.5], fov: 45 }} 
      style={{ background: "#1c1c1c" }} 
      gl={{ antialias: true, toneMapping: NoToneMapping }}
      dpr={[1, 2]}
    >
      <FrameController t={t} setUiState={setUiState} sections={sections} />
    </Canvas>
  );
}
