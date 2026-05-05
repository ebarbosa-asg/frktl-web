"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── PALETTE ───
const C = {
  ground: "#2d4a2a",
  groundAlt: "#3a5e30",
  reactorFront: "#c4714a",
  reactorSide: "#a05a38",
  reactorTop: "#d4845a",
  towerBody: "#9bbfd4",
  towerRim: "#c4e4f4",
  annexFront: "#a06040",
  annexSide: "#8a5035",
  annexTop: "#b87050",
  truckBed: "#4a7a8a",
  truckCab: "#3a6070",
  truckGlass: "#89c0d4",
  wheel: "#1a1a2a",
  tree: "#3a7a2a",
  treeDark: "#2d5a20",
  smoke: "#e8f4f8",
  steam: "#d4eef8",
  pipe: "#8a8080",
  road: "#4a5a4a",
  sign: "#ffffff",
};

// ─── GROUND ───
function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshLambertMaterial color={C.ground} />
      </mesh>
      {/* Grid lines */}
      {[-4, -2, 0, 2, 4].map((x) => (
        <mesh key={`gx${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, 0]}>
          <planeGeometry args={[0.04, 22]} />
          <meshBasicMaterial color={C.groundAlt} transparent opacity={0.3} />
        </mesh>
      ))}
      {[-4, -2, 0, 2, 4].map((z) => (
        <mesh key={`gz${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z]}>
          <planeGeometry args={[22, 0.04]} />
          <meshBasicMaterial color={C.groundAlt} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ─── ISO BOX (reusable low-poly building block) ───
function IsoBox({
  pos, size, colorTop, colorFront, colorSide, castShadow = true,
}: {
  pos: [number, number, number];
  size: [number, number, number];
  colorTop: string; colorFront: string; colorSide: string;
  castShadow?: boolean;
}) {
  const [w, h, d] = size;
  return (
    <group position={pos}>
      {/* Top */}
      <mesh position={[0, h / 2, 0]} castShadow={castShadow} receiveShadow>
        <boxGeometry args={[w, 0.05, d]} />
        <meshLambertMaterial color={colorTop} />
      </mesh>
      {/* Front */}
      <mesh position={[0, 0, d / 2]} castShadow={castShadow} receiveShadow>
        <boxGeometry args={[w, h, 0.05]} />
        <meshLambertMaterial color={colorFront} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0, -d / 2]} castShadow={castShadow} receiveShadow>
        <boxGeometry args={[w, h, 0.05]} />
        <meshLambertMaterial color={colorSide} />
      </mesh>
      {/* Left */}
      <mesh position={[-w / 2, 0, 0]} castShadow={castShadow} receiveShadow>
        <boxGeometry args={[0.05, h, d]} />
        <meshLambertMaterial color={colorSide} />
      </mesh>
      {/* Right */}
      <mesh position={[w / 2, 0, 0]} castShadow={castShadow} receiveShadow>
        <boxGeometry args={[0.05, h, d]} />
        <meshLambertMaterial color={colorFront} />
      </mesh>
    </group>
  );
}

// ─── REACTOR BUILDING ───
function ReactorBuilding() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main body */}
      <IsoBox
        pos={[0, 1.5, 0]}
        size={[3.2, 3, 3.2]}
        colorTop={C.reactorTop}
        colorFront={C.reactorFront}
        colorSide={C.reactorSide}
      />
      {/* Dome on top */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <sphereGeometry args={[0.55, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshLambertMaterial color={C.reactorTop} />
      </mesh>
      {/* Vent cylinder on dome */}
      <mesh position={[0, 3.55, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.4, 6]} />
        <meshLambertMaterial color={C.reactorSide} />
      </mesh>
      {/* Windows - front face */}
      {[-0.85, 0, 0.85].map((x, i) => (
        <mesh key={`wf${i}`} position={[x, 1.8, 1.64]}>
          <boxGeometry args={[0.45, 0.35, 0.04]} />
          <meshLambertMaterial color="#d4aa7a" transparent opacity={0.55} />
        </mesh>
      ))}
      {[-0.85, 0, 0.85].map((x, i) => (
        <mesh key={`wf2${i}`} position={[x, 1.2, 1.64]}>
          <boxGeometry args={[0.45, 0.3, 0.04]} />
          <meshLambertMaterial color="#d4aa7a" transparent opacity={0.4} />
        </mesh>
      ))}
      {/* Door */}
      <mesh position={[0, 0.45, 1.64]}>
        <boxGeometry args={[0.55, 0.9, 0.05]} />
        <meshLambertMaterial color="#8a4020" transparent opacity={0.65} />
      </mesh>
      {/* Windows - side face */}
      {[-0.6, 0.6].map((z, i) => (
        <mesh key={`ws${i}`} position={[1.64, 1.8, z]}>
          <boxGeometry args={[0.04, 0.35, 0.4]} />
          <meshLambertMaterial color="#b87050" transparent opacity={0.4} />
        </mesh>
      ))}
      {/* Pipes on side */}
      <mesh position={[1.7, 1.2, -0.8]}>
        <cylinderGeometry args={[0.06, 0.06, 1.8, 5]} />
        <meshLambertMaterial color={C.pipe} />
      </mesh>
      <mesh position={[1.7, 1.4, -0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 2.0, 5]} />
        <meshLambertMaterial color={C.pipe} />
      </mesh>
    </group>
  );
}

// ─── COOLING TOWER ───
function CoolingTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tower body — tapered cylinder (hyperboloid shape) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.55, 0.75, 3.2, 10, 1, false]} />
        <meshLambertMaterial color={C.towerBody} />
      </mesh>
      {/* Rim */}
      <mesh position={[0, 1.65, 0]}>
        <torusGeometry args={[0.57, 0.07, 6, 12]} />
        <meshLambertMaterial color={C.towerRim} />
      </mesh>
    </group>
  );
}

// ─── STEAM PUFFS ───
function SteamPuff({ origin, offset, speed }: { origin: [number, number, number]; offset: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const start = useMemo(() => offset, [offset]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.getElapsedTime() * speed + start) % 1);
    ref.current.position.y = origin[1] + t * 2.5;
    ref.current.position.x = origin[0] + Math.sin(t * Math.PI * 2) * 0.15;
    const s = 0.3 + t * 0.9;
    ref.current.scale.setScalar(s);
    (ref.current.material as THREE.MeshLambertMaterial).opacity = (1 - t) * 0.75;
  });

  return (
    <mesh ref={ref} position={origin} castShadow={false}>
      <sphereGeometry args={[0.28, 7, 5]} />
      <meshLambertMaterial color={C.smoke} transparent opacity={0.6} />
    </mesh>
  );
}

function SteamColumn({ position }: { position: [number, number, number] }) {
  const puffs = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      offset: i / 5,
      speed: 0.35 + Math.random() * 0.15,
      jitter: [(Math.random() - 0.5) * 0.2, 0, (Math.random() - 0.5) * 0.2] as [number, number, number],
    })), []);

  return (
    <>
      {puffs.map((p, i) => (
        <SteamPuff
          key={i}
          origin={[position[0] + p.jitter[0], position[1], position[2] + p.jitter[2]]}
          offset={p.offset}
          speed={p.speed}
        />
      ))}
    </>
  );
}

// ─── DELIVERY TRUCK ───
function DeliveryTruck() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * 0.18) % 1;
    // Circular path around the building
    const angle = t * Math.PI * 2 - Math.PI / 2;
    const r = 5.5;
    ref.current.position.x = Math.cos(angle) * r;
    ref.current.position.z = Math.sin(angle) * r;
    ref.current.rotation.y = -angle - Math.PI / 2;
  });

  return (
    <group ref={ref} position={[-5.5, 0, 0]}>
      {/* Bed */}
      <mesh position={[-0.5, 0.38, 0]} castShadow>
        <boxGeometry args={[2.2, 0.55, 0.9]} />
        <meshLambertMaterial color={C.truckBed} />
      </mesh>
      {/* Cargo box on bed */}
      <mesh position={[-0.7, 0.85, 0]} castShadow>
        <boxGeometry args={[1.4, 0.6, 0.7]} />
        <meshLambertMaterial color="#2a5a6a" />
      </mesh>
      {/* Cab */}
      <mesh position={[0.75, 0.52, 0]} castShadow>
        <boxGeometry args={[0.75, 0.75, 0.85]} />
        <meshLambertMaterial color={C.truckCab} />
      </mesh>
      {/* Windshield */}
      <mesh position={[1.12, 0.62, 0]}>
        <boxGeometry args={[0.04, 0.4, 0.6]} />
        <meshLambertMaterial color={C.truckGlass} transparent opacity={0.65} />
      </mesh>
      {/* Wheels */}
      {[
        [-0.9, -0.2], [0.2, -0.2], [0.75, -0.2],
      ].map(([x, z], i) => (
        <group key={i}>
          <mesh position={[x, 0.14, 0.52]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 8]} />
            <meshLambertMaterial color={C.wheel} />
          </mesh>
          <mesh position={[x, 0.14, -0.52]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 8]} />
            <meshLambertMaterial color={C.wheel} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── TREE ───
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 1.0, 6]} />
        <meshLambertMaterial color="#5a3a20" />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.55, 7, 5]} />
        <meshLambertMaterial color={C.treeDark} />
      </mesh>
      <mesh position={[0.1, 1.75, 0.1]} castShadow>
        <sphereGeometry args={[0.42, 6, 4]} />
        <meshLambertMaterial color={C.tree} />
      </mesh>
    </group>
  );
}

// ─── ANNEX BUILDING ───
function AnnexBuilding() {
  return (
    <group position={[4.2, 0, -1.5]}>
      <IsoBox
        pos={[0, 0.9, 0]}
        size={[2.2, 1.8, 2.0]}
        colorTop={C.annexTop}
        colorFront={C.annexFront}
        colorSide={C.annexSide}
      />
      {/* Small chimney */}
      <mesh position={[0.5, 2.0, 0.3]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.7, 6]} />
        <meshLambertMaterial color={C.annexSide} />
      </mesh>
    </group>
  );
}

// ─── FULL SCENE ───
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.65} color="#d4eef8" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.4}
        color="#fff8e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 4, -4]} intensity={0.3} color="#a0c8e8" />

      <Ground />
      <ReactorBuilding />

      {/* Two cooling towers */}
      <CoolingTower position={[3.8, 1.6, 2.4]} />
      <CoolingTower position={[5.0, 1.6, 0.6]} />

      {/* Steam from towers */}
      <SteamColumn position={[3.8, 3.4, 2.4]} />
      <SteamColumn position={[5.0, 3.4, 0.6]} />

      <AnnexBuilding />
      <DeliveryTruck />

      {/* Trees */}
      <Tree position={[-4.5, 0, -3.5]} />
      <Tree position={[-5.0, 0, -1.8]} />
      <Tree position={[-3.8, 0, 4.0]} />
      <Tree position={[2.5, 0, 4.5]} />
      <Tree position={[6.5, 0, -3.0]} />
      <Tree position={[-4.0, 0, 2.0]} />

      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 5]} position={[-3.5, 0.01, 3.0]} receiveShadow>
        <planeGeometry args={[1.2, 7]} />
        <meshLambertMaterial color={C.road} transparent opacity={0.55} />
      </mesh>
    </>
  );
}

// ─── EXPORTED COMPONENT ───
export function FRKTLScene({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", minHeight: 420 }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <OrthographicCamera
          makeDefault
          zoom={52}
          position={[10, 12, 10]}
          near={0.1}
          far={100}
        />
        <Scene />
      </Canvas>
    </div>
  );
}
