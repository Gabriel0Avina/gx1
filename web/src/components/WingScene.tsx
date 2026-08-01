"use client";

import { useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BOOT_HERO_DELAY, shouldBoot } from "@/lib/boot";
import WingMark from "./WingMark";

gsap.registerPlugin(ScrollTrigger);

/* Geometría del ala calcada del logo (mismo espacio 480×640 que WingMark):
   hoja larga con punta abajo-derecha + 3 plumas en abanico. El canto cyan
   es una lámina delgada pegada al borde superior de la hoja. */
type Feather = {
  pts: Array<[number, number]>;
  z: number;
  depth: number;
  edgePts?: Array<[number, number]>;
};

const FEATHERS: Feather[] = [
  // Hoja principal
  {
    pts: [
      [100, 44], [190, 86], [262, 146], [324, 208], [368, 340], [428, 560],
      [352, 376], [292, 292], [220, 196], [152, 104],
    ],
    edgePts: [
      [100, 44], [190, 86], [262, 146], [324, 208],
      [312, 224], [246, 152], [178, 96], [104, 60],
    ],
    z: 26,
    depth: 14,
  },
  // Plumas (de arriba hacia abajo)
  {
    pts: [[62, 212], [190, 240], [302, 290], [196, 304], [118, 336], [80, 272]],
    z: 6,
    depth: 10,
  },
  {
    pts: [[102, 352], [212, 378], [306, 404], [214, 428], [158, 470], [122, 408]],
    edgePts: [
      [102, 352], [212, 378], [306, 404],
      [298, 414], [210, 388], [108, 366],
    ],
    z: -12,
    depth: 10,
  },
  {
    pts: [[152, 478], [232, 488], [296, 506], [236, 532], [198, 574], [168, 522]],
    z: -30,
    depth: 8,
  },
];

const CX = 240;
const CY = 320;

function shapeFrom(pts: Array<[number, number]>) {
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const px = x - CX;
    const py = CY - y; // SVG y-abajo → three y-arriba
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

function featherGeometry(pts: Array<[number, number]>, depth: number) {
  return new THREE.ExtrudeGeometry(shapeFrom(pts), {
    depth,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2.5,
    bevelSegments: 3,
  });
}

/* Ala GX1 en 3D: metal pulido con canto cyan emisivo. Parallax con el
   mouse, ensamblaje al cargar, rotación sutil con el scroll. Fallback
   al SVG cuando no hay WebGL o hay reduced-motion. */
export default function WingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setFallback(true);
      return;
    }
    if (reduced) {
      renderer.dispose();
      setFallback(true);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 480 / 640, 1, 4000);
    camera.position.set(0, 0, 1060);

    // Entorno para reflejos metálicos
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Luz de acento cyan desde abajo-izquierda (la luz de cabina)
    const rim = new THREE.PointLight(0x22d3ee, 90000, 0, 1.8);
    rim.position.set(-320, -260, 240);
    scene.add(rim);

    const metal = new THREE.MeshPhysicalMaterial({
      color: 0xb9c4d1,
      metalness: 1,
      roughness: 0.26,
      clearcoat: 0.5,
      clearcoatRoughness: 0.25,
    });
    const edgeCyan = new THREE.MeshBasicMaterial({ color: 0x22d3ee });

    const wing = new THREE.Group();
    const meshes: THREE.Mesh[] = [];

    FEATHERS.forEach(({ pts, z, depth, edgePts }) => {
      const mesh = new THREE.Mesh(featherGeometry(pts, depth), metal);
      mesh.position.z = z;
      wing.add(mesh);
      meshes.push(mesh);

      if (edgePts) {
        // Canto cyan: lámina delgada sobre el borde superior
        const edge = new THREE.Mesh(featherGeometry(edgePts, 2), edgeCyan);
        edge.position.z = z + depth + 2;
        wing.add(edge);
      }
    });

    scene.add(wing);

    // Ensamblaje: la hoja llega primero, las plumas se acoplan después
    const boot = shouldBoot() ? BOOT_HERO_DELAY : 0;
    meshes.forEach((mesh, i) => {
      gsap.from(mesh.position, {
        x: 160 + i * 50,
        y: -120 - i * 40,
        z: mesh.position.z - 180,
        duration: 1.6,
        delay: boot + 0.5 + i * 0.12,
        ease: "expo.out",
      });
      gsap.from(mesh.rotation, {
        z: -0.5,
        duration: 1.6,
        delay: boot + 0.5 + i * 0.12,
        ease: "expo.out",
      });
    });

    // Flotación permanente
    gsap.to(wing.position, {
      y: 14,
      duration: 4.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: boot + 2,
    });

    // Rotación sutil con el scroll del hero
    gsap.to(wing.rotation, {
      z: -0.08,
      x: 0.18,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Parallax hacia el cursor
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Render solo con el hero en viewport y la pestaña visible
    let intersecting = true;
    let running = true;
    const updateRunning = () => {
      running = intersecting && !document.hidden;
    };
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      updateRunning();
    });
    observer.observe(container);
    document.addEventListener("visibilitychange", updateRunning);

    const tick = () => {
      if (!running) return;
      wing.rotation.y += (target.x - wing.rotation.y) * 0.06;
      wing.rotation.x += (target.y - wing.rotation.x) * 0.06;
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", updateRunning);
      observer.disconnect();
      ro.disconnect();
      wing.children.forEach((child) => {
        if (child instanceof THREE.Mesh) child.geometry.dispose();
      });
      metal.dispose();
      edgeCyan.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  if (fallback) {
    return <WingMark className="h-auto w-full opacity-70" />;
  }

  return <div ref={containerRef} aria-hidden className="h-full w-full" />;
}
