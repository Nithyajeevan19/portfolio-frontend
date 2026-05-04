/**
 * SaturnOrb — Premium Cinematic Animation
 * Enhanced with GSAP for Awwwards-level motion and cinematic transitions.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface SaturnOrbProps {
  mousePos: { x: number; y: number };
}

// ─── Utility: smooth lerp (still used for some physics) ───────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function SaturnOrb({ mousePos }: SaturnOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>({});
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // ── Drag / inertia refs ─────────────────────────────────────────────────────
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const dragMomentum = useRef({ x: 0, y: 0 });

  // ── GSAP Timeline Refs ──────────────────────────────────────────────────────
  const rotationTimeline = useRef<gsap.core.Timeline | null>(null);
  const shockwaveTimeline = useRef<gsap.core.Timeline | null>(null);
  const proximityTimeline = useRef<gsap.core.Tween | null>(null);

  // ── Interaction state ───────────────────────────────────────────────────────
  const energyRef = useRef(0);
  const lastActivityRef = useRef(0);
  const proximityRef = useRef(0);

  // ─── Sync mouse pos ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseRef.current = {
        x: mousePos.x / window.innerWidth,
        y: mousePos.y / window.innerHeight,
      };

      // [GSAP] Handle Proximity Hover Targets
      const mouse = mouseRef.current;
      const dist = Math.sqrt(Math.pow(mouse.x - 0.5, 2) + Math.pow(mouse.y - 0.5, 2));
      const rawProximity = Math.max(0, 1 - dist * 2.2);

      // Smoothly animate proximity targets when mouse moves
      if (sceneRef.current.planet) {
        gsap.to(proximityRef, {
          current: rawProximity,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true
        });

        // [GSAP] Hover / Proximity Scale & Light Boost
        gsap.to([sceneRef.current.planet.scale, sceneRef.current.atmo.scale], {
          x: 1 + rawProximity * 0.1,
          y: 1 + rawProximity * 0.1,
          z: 1 + rawProximity * 0.1,
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to(sceneRef.current.ringRoot.scale, {
          x: 1 + rawProximity * 0.2,
          y: 1 + rawProximity * 0.2,
          z: 1 + rawProximity * 0.2,
          duration: 0.8,
          ease: "power2.out"
        });

        gsap.to(sceneRef.current.fill, {
          intensity: 1.0 + rawProximity * 0.8,
          duration: 0.5
        });
      }
    }
  }, [mousePos]);

  // ─── Event listeners ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleClick = () => {
      lastActivityRef.current = performance.now();

      // [GSAP] PREMIUM SHOCKWAVE TIMELINE
      if (shockwaveTimeline.current) shockwaveTimeline.current.kill();

      const { planet, ringRoot, shockRing, camera, burstMat, burstGeo } = sceneRef.current;
      const tl = gsap.timeline();
      shockwaveTimeline.current = tl;

      // 1. Planet scale bounce
      tl.to(planet.scale, {
        x: 1.25, y: 1.25, z: 1.25,
        duration: 0.4,
        ease: "power3.out"
      });
      tl.to(planet.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.2");

      // 2. Ring expansion/shrink
      tl.to(ringRoot.scale, {
        x: 1.35, y: 1.35, z: 1.35,
        duration: 0.5,
        ease: "power3.out"
      }, 0);
      tl.to(ringRoot.scale, {
        x: 1, y: 1, z: 1,
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.3");

      // 3. Shockwave ring expansion
      tl.fromTo(shockRing.scale,
        { x: 1, y: 1, z: 1 },
        { x: 4.5, y: 4.5, z: 4.5, duration: 1.5, ease: "power2.out" },
        0
      );
      tl.fromTo(shockRing.material,
        { opacity: 0.6 },
        { opacity: 0, duration: 1.2, ease: "power2.out" },
        0
      );

      // 4. Quick rotation boost
      tl.to(planet.rotation, {
        y: "+=" + (Math.PI * 0.5),
        duration: 1.2,
        ease: "power4.out"
      }, 0);

      // 5. Camera shake (jitter)
      tl.to(camera.position, {
        x: "+=" + (Math.random() - 0.5) * 0.2,
        y: "+=" + (Math.random() - 0.5) * 0.2,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "none"
      }, 0);
      tl.to(camera.position, { x: 0, y: 0.18, duration: 0.5, ease: "power2.out" });

      // 6. Particle Burst
      tl.to(burstMat, { opacity: 0.8, duration: 0.1 }, 0);
      tl.to(burstMat, { opacity: 0, duration: 1.5, ease: "power2.out" }, 0.2);
    };

    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      dragMomentum.current = { x: 0, y: 0 };
      lastActivityRef.current = performance.now();
    };

    const onUp = () => {
      isDragging.current = false;

      // [GSAP] DRAG INERTIA DECAY
      // Store current momentum as starting velocity
      const vel = {
        x: dragMomentum.current.x * 0.005,
        y: dragMomentum.current.y * 0.005
      };

      dragVelocity.current = vel;

      // Use GSAP to smoothly decay the velocity
      gsap.to(dragVelocity.current, {
        x: 0,
        y: 0,
        duration: 2.0,
        ease: "power2.out"
      });
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

    // Lights
    const ambient = new THREE.AmbientLight(0xf7efe4, 1.6);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfffbf3, 2.4);
    key.position.set(4, 3, 6);
    scene.add(key);
    const fill = new THREE.PointLight(0xd9fff6, 1.0, 30);
    fill.position.set(-3.8, -1.4, 4.5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x8bb8ff, 0.85);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    // Planet
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1.82, 128, 128),
      new THREE.MeshPhysicalMaterial({
        color: 0xd8cfc1,
        roughness: 0.65, // Lowered from 0.96 for lighting contrast
        metalness: 0.1,  // Slight metallic hint
        clearcoat: 0.4,  // Increased for surface highlights
        clearcoatRoughness: 0.2,
        sheen: 0.8,
        sheenColor: new THREE.Color(0xf8f3eb),
      }),
    );
    root.add(planet);

    // [FIX] Removed GSAP rotation to prevent conflicts with animate loop

    // Atmosphere
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.97, 90, 90),
      new THREE.MeshBasicMaterial({ color: 0xfff8ee, transparent: true, opacity: 0.055 }),
    );
    root.add(atmo);

    // [GSAP] ATMOSPHERE BREATHING
    gsap.to(atmo.scale, {
      x: 1.02, y: 1.02, z: 1.02,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Ring root
    const ringRoot = new THREE.Group();
    ringRoot.rotation.x = -1.13;
    ringRoot.rotation.z = 0.34;
    root.add(ringRoot);

    const ringSpecs: [number, number, number, number][] = [
      [2.18, 2.58, 0xcec0aa, 0.18],
      [2.63, 2.96, 0xa6b7af, 0.16],
      [3.02, 3.38, 0xece2d3, 0.09],
      [3.42, 3.72, 0xd8d0c8, 0.05],
    ];

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
    });

    // [GSAP] RING WOBBLE
    gsap.to(ringRoot.rotation, {
      x: -1.13 + 0.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Shock Ring (for click effect)
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

    // Orbiters
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
      scene.add(mesh);
      orbiters.push({
        mesh,
        radius: 2.75 + i * 0.72,
        speed: 0.22 + i * 0.09,
        tilt: i * 0.32,
        offset: i * 2.05,
        y: i === 1 ? -0.64 : i === 2 ? 0.42 : 0.58,
      });
    }

    // Particles
    const count = 1000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
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

    // [GSAP] PARTICLE DRIFT & FLICKER
    gsap.to(particles.rotation, {
      y: "+=" + (Math.PI * 2),
      x: "+=" + (Math.PI * 0.5),
      duration: 120,
      repeat: -1,
      ease: "none"
    });
    gsap.to(particlesMat, {
      opacity: 0.2,
      duration: 0.5 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Burst particles
    const burstCount = 60;
    const burstPositions = new Float32Array(burstCount * 3);
    const burstVelocities: THREE.Vector3[] = [];
    for (let i = 0; i < burstCount; i++) {
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

    sceneRef.current = {
      renderer, scene, camera, root,
      planet, atmo, ringRoot,
      orbiters, particles,
      shockRing, burstGeo, burstMat, burstVelocities, burstCount,
      fill,
    };

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta(); // Frame-rate independent time
      const t = clock.getElapsedTime();

      // [FIX 1] Continuous spinning (clearly visible)
      // Boosted speed to 2.0 for debug visibility as requested
      planet.rotation.y += delta * 2.0;

      // [GSAP] Velocity Inertia Integration
      if (!isDragging.current) {
        root.rotation.y += dragVelocity.current.x;
        root.rotation.x = clamp(root.rotation.x + dragVelocity.current.y, -0.7, 0.7);
      }

      // Orbiters position updates (manual math for circular orbits)
      orbiters.forEach((o, i) => {
        const a = t * o.speed + o.offset;
        o.mesh.position.set(
          Math.cos(a) * o.radius,
          o.y + Math.sin(a * 1.45 + o.tilt) * 0.1,
          Math.sin(a) * 1.22,
        );
      });

      // Update burst particles if active (managed by GSAP timing)
      if (burstMat.opacity > 0) {
        const bPos = burstGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < burstCount; i++) {
          bPos[i * 3]     += burstVelocities[i].x;
          bPos[i * 3 + 1] += burstVelocities[i].y;
          bPos[i * 3 + 2] += burstVelocities[i].z;
        }
        burstGeo.attributes.position.needsUpdate = true;
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

      // [GSAP] Cleanup all timelines/tweens
      gsap.killTweensOf("*");
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
