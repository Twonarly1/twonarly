import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TileData {
  id: number;
  x: number;
  z: number;
  size: number;
  height: number;
}

interface Camera {
  theta: number;
  phi: number;
  radius: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const TILE_SIZE = 80;
const TILE_HEIGHT = 80;
const SPACING = 120;

const COLS = 5;
const ROWS = 1;

// ─── Generate tiles ───────────────────────────────────────────────────────────

function generateTiles(): TileData[] {
  return Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => ({
      id: r * COLS + c,
      x: (c - (COLS - 1) / 2) * SPACING,
      z: (r - (ROWS - 1) / 2) * SPACING,
      size: TILE_SIZE,
      height: TILE_HEIGHT,
    })),
  ).flat();
}

// ─── Camera ───────────────────────────────────────────────────────────────────

const DEFAULT_CAMERA: Camera = {
  theta: -30,
  phi: 35,
  radius: 600,
};

function sceneTransform(camera: Camera) {
  return `rotateX(${-camera.phi}deg) rotateY(${-camera.theta}deg)`;
}

// ─── Cube (CORRECT GEOMETRY) ──────────────────────────────────────────────────

function Cube({ tile }: { tile: TileData }) {
  const { x, z, size, height } = tile;

  /* half extents */
  const hw = size / 2;
  const hh = height / 2;

  /* 4 px looks good for small tiles; change here if you want more/less */
  const radius = 4;

  /* base style every face shares */
  const faceBase: React.CSSProperties = {
    position: "absolute",
    transformStyle: "preserve-3d",
    borderRadius: radius,
    overflow: "hidden" /* clips inner gradients to the radius */,
  };

  return (
    <div
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        /* cube origin is centre-bottom, so bottom face sits on z=0 */
        transform: `translate3d(${x}px, ${-hh}px, ${z}px)`,
      }}
    >
      {/* FRONT */}
      <div
        style={{
          ...faceBase,
          width: size,
          height,
          background: "#a1a1aa",
          transform: `translateZ(${hw}px)`,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.08)",
        }}
      >
        Front
      </div>

      {/* BACK */}
      <div
        style={{
          ...faceBase,
          width: size,
          height,
          background: "#8b8b95",
          transform: `rotateY(180deg) translateZ(${hw}px)`,
        }}
      >
        Back
      </div>

      {/* RIGHT */}
      <div
        style={{
          ...faceBase,
          width: size,
          height,
          background: "#62626b",
          transform: `rotateY(90deg) translateZ(${hw}px)`,
        }}
      >
        Right
      </div>

      {/* LEFT */}
      <div
        style={{
          ...faceBase,
          width: size,
          height,
          background: "#71717a",
          transform: `rotateY(-90deg) translateZ(${hw}px)`,
        }}
      >
        Left
      </div>

      {/* TOP */}
      <div
        style={{
          ...faceBase,
          width: size,
          height: size,
          background: "linear-gradient(to bottom,#f4f4f5,#d4d4d8)",
          transform: `rotateX(90deg) translateZ(${hh}px)`,
        }}
      >
        Top
      </div>

      {/* BOTTOM */}
      <div
        style={{
          ...faceBase,
          width: size,
          height: size,
          background: "#3f3f46",
          transform: `rotateX(-90deg) translateZ(${hh}px)`,
        }}
      >
        Bottom
      </div>
    </div>
  );
}
// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Map3D() {
  const [tiles] = useState(generateTiles);
  const [camera, setCamera] = useState(DEFAULT_CAMERA);

  const wrapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, x: 0, y: 0 });

  const updateCamera = useCallback((dx: number, dy: number) => {
    setCamera((c) => ({
      ...c,
      theta: c.theta + dx * 0.5,
      phi: c.phi + dy * 0.5,
    }));
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const down = (e: MouseEvent) => {
      dragRef.current = { active: true, x: e.clientX, y: e.clientY };
    };

    const move = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      dragRef.current.x = e.clientX;
      dragRef.current.y = e.clientY;
      updateCamera(dx, dy);
    };

    const up = () => (dragRef.current.active = false);

    el.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [updateCamera]);

  const scale = 500 / camera.radius;

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden bg-content"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 600,
          perspectiveOrigin: "50% 45%",
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `scale(${scale}) ${sceneTransform(camera)}`,
          }}
        >
          {tiles.map((tile) => (
            <Cube key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </div>
  );
}
