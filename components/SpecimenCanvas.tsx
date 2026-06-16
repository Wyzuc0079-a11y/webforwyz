"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ProjectMeta {
  name: string;
  id: string;
  thumb: string;
  ballPos?: { x: number; y: number; z: number }; 
}

interface SpecimenCanvasProps {
  modelPath: string;         
  projects: ProjectMeta[];   
  onProjectClick: (id: string) => void;
}

interface StaticLabel {
  id: string;
  name: string;
  threePos: THREE.Vector3;
}

export default function SpecimenCanvas({ modelPath, projects, onProjectClick }: SpecimenCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hoveredProject, setHoveredProject] = useState<ProjectMeta | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [staticLabels, setStaticLabels] = useState<StaticLabel[]>([]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group>(new THREE.Group());
  
  const labelElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const labelPositionsRef = useRef<StaticLabel[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    const canvasEl = renderer.domElement;
    canvasEl.style.cursor = "grab";
    canvasEl.style.pointerEvents = "auto";
    
    const onCanvasMouseDown = () => { canvasEl.style.cursor = "grabbing"; };
    const onCanvasMouseUp = () => { canvasEl.style.cursor = "grab"; };
    canvasEl.addEventListener("mousedown", onCanvasMouseDown);
    window.addEventListener("mouseup", onCanvasMouseUp);

    container.appendChild(canvasEl);

    const controls = new OrbitControls(camera, canvasEl);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 6;
    controls.maxDistance = 16;

    const modelGroup = modelGroupRef.current;
    while(modelGroup.children.length > 0){ 
      modelGroup.remove(modelGroup.children[0]); 
    }
    scene.add(modelGroup);

    const loader = new OBJLoader();
    loader.load(modelPath, (obj) => {
      const box = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box.getCenter(center);

      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); 

          const wireframeGeom = new THREE.WireframeGeometry(mesh.geometry);
          const wireframeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 });
          const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMat);
          mesh.add(wireframe);
        }
      });

      obj.position.set(0, 0, 0);
      modelGroup.add(obj);

      const validLabels: StaticLabel[] = [];

      projects.forEach((project, i) => {
        const customPos = project.ballPos || { x: 0, y: 0, z: 0 };
        const rawPos = new THREE.Vector3(customPos.x, customPos.y, customPos.z);

        const geo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const mat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
        const cubeMesh = new THREE.Mesh(geo, mat);
        cubeMesh.position.copy(rawPos);
        modelGroup.add(cubeMesh);

        validLabels.push({
          id: project.id,
          name: project.name,
          threePos: rawPos
        });
      });

      labelPositionsRef.current = validLabels;
      setStaticLabels(validLabels);
    }, undefined, (err) => console.error(err));

    const tempV = new THREE.Vector3();
    const updateLabelsNative = () => {
      if (!cameraRef.current || labelPositionsRef.current.length === 0) return;

      labelPositionsRef.current.forEach((label) => {
        const el = labelElementsRef.current[label.id];
        if (!el) return;

        tempV.copy(label.threePos);
        tempV.applyMatrix4(modelGroup.matrixWorld);
        tempV.project(cameraRef.current!);

        const sphereX = (tempV.x * 0.5 + 0.5) * window.innerWidth;
        const sphereY = (tempV.y * -0.5 + 0.5) * window.innerHeight;

        const isLeft = sphereX < window.innerWidth / 2;
        const offset = 18; 
        
        el.style.left = "0px";
        el.style.top = "0px";
        
        const isInFront = tempV.z <= 1;
        el.style.display = isInFront ? "block" : "none";
        el.style.transform = `translate3d(${sphereX}px, ${sphereY}px, 0)`;

        const btn = el.querySelector("button");
        const arrow = el.querySelector(".bubble-arrow") as HTMLDivElement;

        if (btn && arrow) {
          if (isLeft) {
            btn.style.transform = `translate3d(${offset}px, -50%, 0) scale(1)`;
            btn.style.transformOrigin = "left center";
            
            arrow.style.transform = `translate3d(${offset}px, -50%, 0) rotate(180deg) scale(1)`;
            arrow.style.transformOrigin = "left center";
          } else {
            btn.style.transform = `translate3d(${-offset}px, -50%, 0) translateX(-100%) scale(1)`;
            btn.style.transformOrigin = "right center";
            
            arrow.style.transform = `translate3d(${-offset}px, -50%, 0) rotate(0deg) scale(1)`;
            arrow.style.transformOrigin = "right center";
          }
        }
      });
    };

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      controls.update();
      updateLabelsNative(); 
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      canvasEl.removeEventListener("mousedown", onCanvasMouseDown);
      window.removeEventListener("mouseup", onCanvasMouseUp);
      controls.dispose();
      renderer.dispose();
      if (container.contains(canvasEl)) {
        container.removeChild(canvasEl);
      }
    };
  }, [modelPath]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left + 20,
        y: e.clientY - rect.top - 60
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="fixed inset-0 w-screen h-screen z-10 select-none overflow-visible pointer-events-none"
    >
      {staticLabels.map((p) => {
        const originalProject = projects.find(proj => proj.id === p.id)!;

        return (
          <div
            key={p.id}
            ref={(el) => { labelElementsRef.current[p.id] = el; }}
            className="absolute z-30 pointer-events-auto w-0 h-0 overflow-visible opacity-20 hover:opacity-100 transition-opacity duration-300"
            style={{ willChange: "transform" }}
          >
            <div 
              className="bubble-arrow absolute w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-black/95 z-40 transition-none will-change-transform
                after:content-[''] after:absolute after:-top-[5px] after:-left-[1px] after:w-0 after:h-0 after:border-t-[5px] after:border-t-transparent after:border-b-[5px] after:border-b-transparent after:border-r-[6px] after:border-r-white/10 hover:after:border-r-white/40"
            />

            <button
              onClick={() => onProjectClick(p.id)}
              onMouseEnter={() => setHoveredProject(originalProject)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ whiteSpace: "nowrap" }}
              className="absolute flex items-center space-x-2 bg-black/95 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-sm text-[13px] font-bold tracking-widest text-white uppercase shadow-2xl transition-colors duration-200 will-change-transform z-30 cursor-pointer animate-none"
            >
              <span>{p.name}</span>
            </button>
          </div>
        );
      })}

      {hoveredProject && (
        <div
          className="absolute z-40 pointer-events-none border border-white/10 bg-[#1c1c1c] p-1.5 rounded-sm shadow-2xl transition-all duration-150 ease-out overflow-hidden"
          style={{ 
            left: `${mousePos.x}px`, 
            top: `${mousePos.y}px`,
            width: "140px",
            height: "105px"
          }}
        >
          <div className="w-full h-full bg-black/40 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <span className="text-[9px] text-white/40 tracking-wider text-center px-2 z-20">
              [PREVIEW IMAGE]
              <br />
              {hoveredProject.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}