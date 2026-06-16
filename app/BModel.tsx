"use client";

import { forwardRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { Group } from "three";

const BModel = forwardRef<Group>(function BModel(props, ref) {
  const obj = useLoader(
    OBJLoader,
    "/models/PORTFLIO-B.obj"
  );

  return (
    <group
      ref={ref}
      position={[0, -4, 0]}
    >
      <primitive
        object={obj}
        scale={1}
      />
    </group>
  );
});

export default BModel;