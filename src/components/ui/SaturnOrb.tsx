/**
 * SaturnOrb — Premium Cinematic Animation
 * Enhanced for agency/portfolio use. Awwwards-level interaction quality.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SaturnOrbProps {
  mousePos: { x: number; y: number };
}

// ─── Utility: smooth lerp ─────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function SaturnOrb({ mousePos }: SaturnOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>({});
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // ── Drag / inertia ──────────────────────────────────────────────────────────
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 }); // inertia after drag release
  const dragMomentum = useRef({ x: 0, y: 0 }); // raw delta for momentum

  // ── Click shockwave ─────────────────────────────────────────────────────────
  const shockRef = useRef(0);

  // ── Cursor magnetic gravity ─────────────────────────────────────────────────
  const velocity = useRef({ x: 0, y: 0 });

  // ── Interaction energy (0 = idle, 1 = active) ────────────────────────────────
  const energyRef = useRef(0);
  const lastActivityRef = useRef(0);

  // ── Camera shake after click ─────────────────────────────────────────────────
  const cameraShake = useRef(0);

  // ── Proximity glow target ────────────────────────────────────────────────────
  const proximityRef = useRef(0);

  // ─── Sync mouse pos ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseRef.current = {
        x: mousePos.x / window.innerWidth,
        y: mousePos.y / window.innerHeight,
      };
    }
  }, [mousePos]);

  // ─── Event listeners ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleClick = () => {
      shockRef.current = 1;
      cameraShake.current = 1;
      lastActivityRef.current = performance.now();
    };

    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      dragMomentum.current = { x: 0, y: 0 };
      lastActivityRef.current = performance.now();
    };

    const onUp = () => {
      isDragging.current = false;
      // Transfer drag delta into inertia
      dragVelocity.current.x = dragMomentum.current.x * 0.005;
      dragVelocity.current.y = dragMomentum.current.y * 0.005;
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      dragMomentum.current = { x: dx, y: dy };

      const { root } = sceneRef.current;
      if (root) {
        root.rotation.y += dx * 0.004;
        root.rotation.x = clamp(root.rotation.x + dy * 0.004, -0.8, 0.8);
      }
      lastMouse.current = { x: e.clientX, y: e.clientY };
      lastActivityRef.current = performance.now();
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // ─── Scene setup ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ────────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.18, 7.2);

    const root = new THREE.Group();
    scene.add(root);

    // ── Lights ──────────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xf7efe4, 1.6);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfffbf3, 2.4);
    key.position.set(4, 3, 6);
    scene.add(key);

    const fill = new THREE.PointLight(0xd9fff6, 1.0, 30);
    fill.position.set(-3.8, -1.4, 4.5);
    scene.add(fill);

    // [ENHANCED] Rim light — cool blue tone for cinematic depth
    const rim = new THREE.DirectionalLight(0x8bb8ff, 0.85);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    // [ENHANCED] Warm back light
    const back = new THREE.PointLight(0xffe8c0, 0.65, 20);
    back.position.set(2, -3, -5);
    scene.add(back);

    // ── Planet body ─────────────────────────────────────────────────────────────
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1.82, 128, 128),
      new THREE.MeshPhysicalMaterial({
        color: 0xd8cfc1,
        roughness: 0.96,
        metalness: 0.02,
        clearcoat: 0.18,
        clearcoatRoughness: 0.9,
        sheen: 0.55,
        sheenColor: new THREE.Color(0xf8f3eb),
      }),
    );
    root.add(planet);

    // ── Atmosphere glow (animated) ───────────────────────────────────────────────
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.97, 90, 90),
      new THREE.MeshBasicMaterial({ color: 0xfff8ee, transparent: true, opacity: 0.055 }),
    );
    root.add(atmo);

    // [ENHANCED] Outer glow halo — additive blending for bloom illusion
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(2.1, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffe4b0,
        transparent: true,
        opacity: 0.025,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    root.add(halo);

    // ── Ring system ──────────────────────────────────────────────────────────────
    const ringRoot = new THREE.Group();
    ringRoot.rotation.x = -1.13;
    ringRoot.rotation.z = 0.34;
    root.add(ringRoot);

    const ringSpecs: [number, number, number, number][] = [
      [2.18, 2.58, 0xcec0aa, 0.18],
      [2.63, 2.96, 0xa6b7af, 0.16],
      [3.02, 3.38, 0xece2d3, 0.09],
      // [ENHANCED] Extra faint outer ring
      [3.42, 3.72, 0xd8d0c8, 0.05],
    ];

    const ringMeshes: THREE.Mesh[] = [];
    ringSpecs.forEach(([inner, outer, color, opacity]) => {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(inner, outer, 200),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      ringRoot.add(m);
      ringMeshes.push(m);
    });

    // [ENHANCED] Shockwave ring (starts hidden, animates on click)
    const shockRing = new THREE.Mesh(
      new THREE.RingGeometry(1.9, 2.05, 128),
      new THREE.MeshBasicMaterial({
        color: 0xfff6e0,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    root.add(shockRing);

    // ── Orbiters ─────────────────────────────────────────────────────────────────
    const moonGeo = new THREE.SphereGeometry(0.055, 24, 24);
    const moonPalette = [0xc6fff6, 0xe8fff9, 0xb9e4d8];
    const orbiters: any[] = [];

    for (let i = 0; i < 3; i++) {
      const mesh = new THREE.Mesh(
        moonGeo,
        new THREE.MeshBasicMaterial({
          color: moonPalette[i],
          transparent: true,
          opacity: 0.85 - i * 0.15,
        }),
      );

      // [ENHANCED] Trailing glow sphere
      const trail = new THREE.Mesh(
        new THREE.SphereGeometry(0.055 + 0.035 * (3 - i), 16, 16),
        new THREE.MeshBasicMaterial({
          color: moonPalette[i],
          transparent: true,
          opacity: 0.15,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      mesh.add(trail);

      scene.add(mesh);
      orbiters.push({
        mesh,
        radius: 2.75 + i * 0.72,
        speed: 0.22 + i * 0.09,        // [ENHANCED] Varied speeds
        tilt: i * 0.32,
        offset: i * 2.05,
        y: i === 1 ? -0.64 : i === 2 ? 0.42 : 0.58,
      });
    }

    // ── Particle field ────────────────────────────────────────────────────────────
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const phasesArr = new Float32Array(count);     // [ENHANCED] per-particle twinkle phase
    const driftArr = new Float32Array(count * 3);  // [ENHANCED] per-particle drift direction

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      phasesArr[i]         = Math.random() * Math.PI * 2;
      driftArr[i * 3]      = (Math.random() - 0.5) * 0.0004;
      driftArr[i * 3 + 1]  = (Math.random() - 0.5) * 0.0004;
      driftArr[i * 3 + 2]  = (Math.random() - 0.5) * 0.0004;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xded6c9,
      size: 0.032,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // ── Burst particles (click shockwave) ────────────────────────────────────────
    const burstCount = 60;
    const burstPositions = new Float32Array(burstCount * 3);
    const burstVelocities: THREE.Vector3[] = [];
    for (let i = 0; i < burstCount; i++) {
      burstPositions[i * 3] = 0;
      burstPositions[i * 3 + 1] = 0;
      burstPositions[i * 3 + 2] = 0;
      const dir = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5),
      ).normalize().multiplyScalar(0.04 + Math.random() * 0.06);
      burstVelocities.push(dir);
    }
    const burstGeo = new THREE.BufferGeometry();
    burstGeo.setAttribute("position", new THREE.BufferAttribute(burstPositions, 3));
    const burstMat = new THREE.PointsMaterial({
      color: 0xfffbe8,
      size: 0.06,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const burstParticles = new THREE.Points(burstGeo, burstMat);
    scene.add(burstParticles);
    let burstActive = false;
    let burstTime = 0;

    // ── Store refs ───────────────────────────────────────────────────────────────
    sceneRef.current = {
      renderer, scene, camera, root,
      planet, atmo, halo, ringRoot, ringMeshes,
      orbiters, particles, particlesGeo, phasesArr, driftArr,
      shockRing, burstGeo, burstMat,
      ambient, fill,
    };

    // ── Resize handler ───────────────────────────────────────────────────────────
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Animation loop ────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const CAMERA_ORIGIN = new THREE.Vector3(0, 0.18, 7.2);

    const animate = () => {
      const t = clock.getElapsedTime();
      const now = performance.now();
      const timeSinceActivity = (now - lastActivityRef.current) / 1000;

      // ── Energy: ramps up on interaction, decays in idle ─────────────────────────
      const targetEnergy = isDragging.current ? 1 : timeSinceActivity < 2 ? 0.6 : 0;
      energyRef.current = lerp(energyRef.current, targetEnergy, 0.03);
      const energy = energyRef.current;

      // ── Cursor proximity to screen center ──────────────────────────────────────
      const mouse = mouseRef.current;
      const mdx = mouse.x - 0.5;
      const mdy = mouse.y - 0.5;
      const dist = Math.sqrt(mdx * mdx + mdy * mdy);
      const rawProximity = Math.max(0, 1 - dist * 2.2);
      proximityRef.current = lerp(proximityRef.current, rawProximity, 0.06);
      const proximity = proximityRef.current;

      // ── Ambient light subtle color shift over time (very slow) ─────────────────
      const hue = (t * 0.008) % 1;
      ambient.color.setHSL(0.08 + Math.sin(t * 0.05) * 0.04, 0.3, 0.92);

      // ── Flickering ambient (subtle) ─────────────────────────────────────────────
      ambient.intensity = 1.6 + Math.sin(t * 1.3) * 0.06 + Math.sin(t * 3.7) * 0.02;

      // ── Fill light gentle pulse ─────────────────────────────────────────────────
      fill.intensity = 1.0 + Math.sin(t * 0.7) * 0.15 + proximity * 0.4;
      fill.position.x = -3.8 + Math.sin(t * 0.2) * 0.4;

      // ── Idle breathing (organic feel) ───────────────────────────────────────────
      const breathe = 1 + Math.sin(t * 0.9) * 0.008 + Math.sin(t * 2.3) * 0.004;

      // ── Planet idle wobble + rotation ───────────────────────────────────────────
      const noiseX = Math.sin(t * 0.17 + 1.2) * 0.03 + Math.sin(t * 0.41) * 0.012;
      const noiseY = Math.cos(t * 0.23 + 0.6) * 0.025 + Math.cos(t * 0.53) * 0.008;
      planet.rotation.x = lerp(planet.rotation.x, noiseX, 0.05);
      planet.rotation.y += lerp(0.0015, 0.006, energy); // idle vs active speed

      // ── Atmosphere breathing ─────────────────────────────────────────────────────
      const atmoScale = breathe + proximity * 0.018;
      atmo.scale.setScalar(atmoScale);

      // ── Halo glow: proximity + energy ────────────────────────────────────────────
      (halo.material as THREE.MeshBasicMaterial).opacity = 0.025 + proximity * 0.04 + energy * 0.02;
      halo.scale.setScalar(1 + proximity * 0.06 + Math.sin(t * 0.8) * 0.01);

      // ── Ring subtle wobble ────────────────────────────────────────────────────────
      ringRoot.rotation.z += lerp(0.0008, 0.003, energy);
      ringRoot.rotation.x = -1.13 + Math.sin(t * 0.15) * 0.012; // [ENHANCED] subtle wobble

      // ── Cursor gravity (depth parallax layers) ────────────────────────────────────
      const pullStrength = 0.5 + proximity * 0.2;
      planet.position.x = lerp(planet.position.x, (mouse.x - 0.5) * pullStrength, 0.04);
      planet.position.y = lerp(planet.position.y, -(mouse.y - 0.5) * pullStrength, 0.04);

      // [ENHANCED] Depth Z — orb slightly moves toward camera when near cursor
      planet.position.z = lerp(planet.position.z, proximity * 0.15, 0.04);

      // [ENHANCED] Scale up on hover proximity
      const targetScale = 1 + proximity * 0.04 + energy * 0.02;
      root.scale.setScalar(lerp(root.scale.x, targetScale, 0.05));

      // ── Particle parallax (different depth layers) ────────────────────────────────
      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0002;
      // Layer 1 (slower, deeper)
      particles.position.x = lerp(particles.position.x, -(mouse.x - 0.5) * 1.2, 0.025);
      particles.position.y = lerp(particles.position.y, (mouse.y - 0.5) * 1.2, 0.025);

      // [ENHANCED] Particle twinkling + drift
      const posArr = (particlesGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3]     += driftArr[i * 3];
        posArr[i * 3 + 1] += driftArr[i * 3 + 1];
        posArr[i * 3 + 2] += driftArr[i * 3 + 2];
      }
      particlesGeo.attributes.position.needsUpdate = true;
      // Twinkle opacity
      particlesMat.opacity = 0.35 + Math.sin(t * 1.1) * 0.08 + Math.sin(t * 2.7) * 0.04;

      // ── Magnetic tilt via velocity ────────────────────────────────────────────────
      const intensity = Math.max(0.15, 1 - dist * 1.4);
      const targetTiltX = mdy * 0.7 * intensity;
      const targetTiltY = mdx * 1.1 * intensity;
      velocity.current.x = lerp(velocity.current.x, targetTiltX, 0.04);
      velocity.current.y = lerp(velocity.current.y, targetTiltY, 0.04);

      if (!isDragging.current) {
        // [ENHANCED] Inertia from drag — decays smoothly
        dragVelocity.current.x *= 0.92;
        dragVelocity.current.y *= 0.92;
        root.rotation.x = lerp(root.rotation.x, velocity.current.x, 0.04);
        root.rotation.x = clamp(root.rotation.x + dragVelocity.current.y, -0.7, 0.7);
        root.rotation.y += velocity.current.y + dragVelocity.current.x;
      }

      // ── Orbiters ──────────────────────────────────────────────────────────────────
      orbiters.forEach((o, i) => {
        const speedBoost = 1 + energy * 0.5 + proximity * 0.3;
        const a = t * o.speed * speedBoost + o.offset;
        o.mesh.position.set(
          Math.cos(a) * o.radius,
          o.y + Math.sin(a * 1.45 + o.tilt) * 0.1,
          Math.sin(a) * 1.22,
        );
        // [ENHANCED] Pulse + trailing stretch illusion
        const pulse = (1 + Math.sin(t * 2.2 + i) * 0.06) * breathe;
        const stretch = 1 + o.speed * speedBoost * 0.4; // motion blur illusion
        o.mesh.scale.set(stretch, pulse, pulse);

        // [ENHANCED] Trail glow opacity follows speed
        const trail = o.mesh.children[0] as THREE.Mesh;
        if (trail) {
          (trail.material as THREE.MeshBasicMaterial).opacity = 0.1 + energy * 0.12;
        }
      });

      // ── SHOCKWAVE EFFECT (click) ───────────────────────────────────────────────────
      if (shockRef.current > 0) {
        shockRef.current *= 0.9;
        const shock = shockRef.current;

        // Ring expansion
        ringRoot.scale.setScalar(1 + shock * 0.35);
        planet.scale.setScalar(1 + shock * 0.18);

        // [ENHANCED] Expanding shockwave ring
        shockRing.scale.setScalar(1 + (1 - shock) * 3.5);
        (shockRing.material as THREE.MeshBasicMaterial).opacity = shock * 0.55;

        // [ENHANCED] Camera shake
        cameraShake.current = lerp(cameraShake.current, 0, 0.15);
        camera.position.x = CAMERA_ORIGIN.x + (Math.random() - 0.5) * cameraShake.current * 0.08;
        camera.position.y = CAMERA_ORIGIN.y + (Math.random() - 0.5) * cameraShake.current * 0.08;

        // [ENHANCED] Start burst particles on click
        if (!burstActive && shock > 0.9) {
          burstActive = true;
          burstTime = 0;
          const bPos = burstGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < burstCount; i++) {
            bPos[i * 3] = 0;
            bPos[i * 3 + 1] = 0;
            bPos[i * 3 + 2] = 0;
          }
          burstGeo.attributes.position.needsUpdate = true;
        }
      } else {
        // Return scale to normal
        ringRoot.scale.setScalar(lerp(ringRoot.scale.x, 1, 0.08));
        planet.scale.setScalar(lerp(planet.scale.x, 1, 0.08));
        shockRing.scale.setScalar(lerp(shockRing.scale.x, 1, 0.06));
        (shockRing.material as THREE.MeshBasicMaterial).opacity *= 0.88;

        // Camera return to origin
        camera.position.x = lerp(camera.position.x, CAMERA_ORIGIN.x, 0.1);
        camera.position.y = lerp(camera.position.y, CAMERA_ORIGIN.y, 0.1);
      }

      // [ENHANCED] Burst particle system update
      if (burstActive) {
        burstTime += 0.016;
        const bPos = burstGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < burstCount; i++) {
          bPos[i * 3]     += burstVelocities[i].x;
          bPos[i * 3 + 1] += burstVelocities[i].y;
          bPos[i * 3 + 2] += burstVelocities[i].z;
          // Decelerate
          burstVelocities[i].multiplyScalar(0.94);
        }
        burstGeo.attributes.position.needsUpdate = true;
        burstMat.opacity = Math.max(0, 0.7 - burstTime * 1.2);
        if (burstTime > 0.6) {
          burstActive = false;
          burstMat.opacity = 0;
        }
      }

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      particlesGeo.dispose();
      burstGeo.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ background: "transparent" }}
    />
  );
}
