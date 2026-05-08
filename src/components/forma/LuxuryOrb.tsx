import { useEffect, useRef, memo } from "react";
import * as THREE from "three";

function LuxuryOrb({ size = 380 }: { size: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const pref = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump", // Performance boost
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.5, 7.2);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xf8f2e8, 1.2));
    const key = new THREE.DirectionalLight(0xfff6e8, 2.0);
    key.position.set(5, 6, 7);
    scene.add(key);

    const root = new THREE.Group();
    scene.add(root);

    // Optimized Geometries
    const coreGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const glowGeo = new THREE.SphereGeometry(0.42, 16, 16);
    const nodeGeo = new THREE.SphereGeometry(1, 8, 8);

    const core = new THREE.Mesh(
      coreGeo,
      new THREE.MeshStandardMaterial({
        color: 0xf0e8d8,
        roughness: 0.7,
        metalness: 0.1,
        transparent: true,
        opacity: 0.95,
      }),
    );
    root.add(core);

    root.add(
      new THREE.Mesh(
        glowGeo,
        new THREE.MeshBasicMaterial({
          color: 0xfaf5ec,
          transparent: true,
          opacity: 0.045,
          depthWrite: false,
          side: THREE.BackSide,
        }),
      ),
    );

    const RINGS = [
      { r: 0.78, tube: 0.005, rx: -1.28, ry: 0.18, rz: 0.08, spd: 0.00042, col: 0xb8cec8, op: 0.7 },
      { r: 1.12, tube: 0.004, rx: -1.08, ry: -0.22, rz: 0.32, spd: -0.00031, col: 0xc8b89a, op: 0.58 },
      { r: 1.46, tube: 0.003, rx: -0.88, ry: 0.34, rz: -0.14, spd: 0.00024, col: 0xa8c0b8, op: 0.42 },
      { r: 1.8, tube: 0.003, rx: -1.44, ry: -0.12, rz: 0.52, spd: -0.00018, col: 0xd4c8b2, op: 0.3 },
      { r: 2.18, tube: 0.002, rx: -0.72, ry: 0.48, rz: -0.28, spd: 0.00013, col: 0x9ab8ae, op: 0.2 },
    ];

    const ringGroups = RINGS.map((def) => {
      const g = new THREE.Group();
      g.rotation.set(def.rx, def.ry, def.rz);
      g.add(
        new THREE.Mesh(
          new THREE.TorusGeometry(def.r, def.tube, 2, 48), // Lowered segments
          new THREE.MeshBasicMaterial({
            color: def.col,
            transparent: true,
            opacity: def.op,
            depthWrite: false,
          }),
        ),
      );
      root.add(g);
      return { g, spd: def.spd };
    });

    const NODE_DEFS = [
      { orbitR: 0.78, spd: 0.52, tilt: 0.28, phase: 0.0, sz: 0.022, col: 0xd8ede6, op: 0.85 },
      { orbitR: 1.12, spd: 0.33, tilt: -0.38, phase: 1.8, sz: 0.016, col: 0xe8dece, op: 0.72 },
      { orbitR: 1.46, spd: 0.21, tilt: 0.54, phase: 3.6, sz: 0.012, col: 0xb4cec6, op: 0.6 },
      { orbitR: 1.8, spd: 0.14, tilt: -0.22, phase: 5.1, sz: 0.009, col: 0xd0c4aa, op: 0.48 },
    ].map(nd => ({
      ...nd,
      sinTilt: Math.sin(nd.tilt),
      cosTilt: Math.cos(nd.tilt),
      invTwoOrbitR: 1 / (nd.orbitR * 2)
    }));

    const nodes = NODE_DEFS.map((nd) => {
      const mesh = new THREE.Mesh(
        nodeGeo,
        new THREE.MeshBasicMaterial({ color: nd.col, transparent: true, opacity: nd.op }),
      );
      mesh.scale.setScalar(nd.sz);
      scene.add(mesh);
      return { mesh, ...nd };
    });

    const DUST_COUNT = 80; // Reduced from 120
    const dustPos = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 1.64 + (Math.random() - 0.5) * 0.06;
      dustPos[i * 3 + 0] = r * Math.cos(t);
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      dustPos[i * 3 + 2] = r * Math.sin(t);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustGroup = new THREE.Group();
    dustGroup.rotation.x = -1.1;
    dustGroup.rotation.z = 0.38;
    dustGroup.add(
      new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({
          color: 0xc8bca8,
          size: 0.01,
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
          sizeAttenuation: true,
        }),
      ),
    );
    root.add(dustGroup);

    const resize = () => {
      const w = mount.clientWidth,
        h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let startTime = performance.now();
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (pref) {
        renderer.render(scene, camera);
        return;
      }

      const t = (performance.now() - startTime) / 1000;
      core.rotation.y = t * 0.08;
      
      for (let i = 0; i < ringGroups.length; i++) {
        ringGroups[i].g.rotation.z += ringGroups[i].spd;
      }
      
      dustGroup.rotation.z += 0.00008;

      for (let i = 0; i < nodes.length; i++) {
        const nd = nodes[i];
        const angle = t * nd.spd + nd.phase;
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        const zComp = s * nd.orbitR;
        
        nd.mesh.position.set(c * nd.orbitR, zComp * nd.sinTilt, zComp * nd.cosTilt);
        
        const depth = 0.5 + 0.5 * ((nd.mesh.position.z + nd.orbitR) * nd.invTwoOrbitR);
        (nd.mesh.material as THREE.MeshBasicMaterial).opacity = nd.op * (0.4 + 0.6 * depth);
      }
      
      root.rotation.x += (mouseRef.current.y * -0.02 - root.rotation.x) * 0.02;
      root.rotation.y += (mouseRef.current.x * 0.03 - root.rotation.y) * 0.02;
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      
      // Cleanup
      scene.traverse((obj: any) => {
        if (obj.isMesh || obj.isPoints) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        maxWidth: "82vw",
        maxHeight: "82vw",
        flexShrink: 0,
      }}
    />
  );
}

export default memo(LuxuryOrb);
