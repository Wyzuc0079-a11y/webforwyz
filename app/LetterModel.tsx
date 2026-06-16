// app/LetterModel.tsx
"use client";

import { forwardRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import {
  Group,
  Mesh,
  MeshStandardMaterial
} from "three";

const LetterModel = forwardRef<Group, { modelPath: string }>(function LetterModel({ modelPath }, ref) {
  const obj = useLoader(OBJLoader, modelPath);

  useEffect(() => {
    if (obj) {
      obj.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = child.material || new MeshStandardMaterial();
          child.material.color.setHex(0xffffff);
          child.material.metalness = 0.85;
          child.material.roughness = 0.25;
          child.material.transparent = true;
          child.material.opacity = 1;
        }
      });
    }
  }, [obj]);

  // 注意：这里不要设置 position，让 page.tsx 里的 Section 组件完全控制位置
 return (
  <group ref={ref}>
    <primitive
      object={obj}
      scale={0.55}
    />
  </group>
);
});

export default LetterModel;