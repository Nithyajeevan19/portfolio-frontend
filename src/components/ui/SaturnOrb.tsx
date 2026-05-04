/**
 * SaturnOrb — Awwwards-Level Cinematic Experience
 * An "insane-level" interactive celestial body featuring gravitational distortion,
 * magnetic cursor fields, and high-end physics-based motion.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface SaturnOrbProps {
  mousePos: { x: number; y: number };
}

// ─── Utility: Physics Helpers ────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function SaturnOrb({ mousePos }: SaturnOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>({});
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // ── Interaction State Refs ──────────────────────────────────────────────────
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const proximityRef = useRef(0);
  const energyRef = useRef(0); // 0 to 1 based on interaction intensity
  const clickMassRef = useRef(0); // shockwave power

  // ── GSAP Instances ─────────────────────────────────────────────────────────
  const timelines = useRef<{
    hover?: gsap.core.Timeline;
    click?: gsap.core.Timeline;
  }>({});

  // ─── Sync Mouse Pos ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseRef.current = {
        x: mousePos.x / window.innerWidth,
        y: mousePos.y / window.innerHeight,
      };
    }
  }, [mousePos]);

  // ─── Interaction Logic ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleClick = () => {
      // [GSAP] EXPLOSIVE PULSE TIMELINE
      if (timelines.current.click) timelines.current.click.kill();
      
      const { root, camera, shockRing, burstMat, planet, ringRoot } = sceneRef.current;
      const tl = gsap.timeline();
      timelines.current.click = tl;

      // Camera Shake
      tl.to(camera.position, {
        x: "+=" + (Math.random() - 0.5) * 0.4,
        y: "+=" + (Math.random() - 0.5) * 0.4,
        duration: 0.05,
        repeat: 7,
        yoyo: true,
        ease: "none"
      }, 0);
      tl.to(camera.position, { x: 0, y: 0.18, z: 7.2, duration: 0.8, ease: "power4.out" });

      // Planet Pulse
      tl.to(planet.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.2, ease: "power4.out" }, 0);
      tl.to(planet.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "elastic.out(1, 0.3)" }, 0.2);

      // Ring Expansion
      tl.to(ringRoot.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, ease: "power4.out" }, 0);
      tl.to(ringRoot.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: "power2.inOut" }, 0.3);

      // Shockwave ring
      tl.fromTo(shockRing.scale, { x: 0.1, y: 0.1 }, { x: 8, y: 8, duration: 1.8, ease: "power3.out" }, 0);
      tl.fromTo(shockRing.material, { opacity: 1 }, { opacity: 0, duration: 1.5, ease: "power2.out" }, 0);

      // Burst Particles
      tl.to(burstMat, { opacity: 1, duration: 0.1 }, 0);
      tl.to(burstMat, { opacity: 0, duration: 2, ease: "power2.out" }, 0.1);
      
      clickMassRef.current = 1;
      gsap.to(clickMassRef, { current: 0, duration: 2, ease: "power2.out" });
    };

    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      isDragging.current = false;
      const dx = dragVelocity.current.x;
      const dy = dragVelocity.current.y;
      gsap.to(dragVelocity.current, { x: 0, y: 0, duration: 2, ease: "power2.out" });
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      dragVelocity.current = { x: dx * 0.005, y: dy * 0.005 };
      
      const { root } = sceneRef.current;
      if (root) {
        root.rotation.y += dx * 0.004;
        root.rotation.x = clamp(root.rotation.x + dy * 0.004, -0.8, 0.8);
      }
      lastMouse.current = { x: e.clientX, y: e.clientY };
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

  // ─── Scene Setup ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.18, 7.2);

    const root = new THREE.Group();
    scene.add(root);

    // ── Lighting (Premium Setup) ───────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xf7efe4, 0.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfffbf3, 3.5);
    key.position.set(5, 5, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x8bb8ff, 4.0);
    rim.position.set(-6, 4, -5);
    scene.add(rim);

    const back = new THREE.PointLight(0xffe8c0, 2.0, 25);
    back.position.set(3, -4, -6);
    scene.add(back);

    // ── Planet Body ────────────────────────────────────────────────────────────
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1.82, 128, 128),
      new THREE.MeshPhysicalMaterial({
        color: 0xd8cfc1,
        roughness: 0.35,
        metalness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        sheen: 0.9,
        sheenColor: new THREE.Color(0xf8f3eb),
      }),
    );
    root.add(planet);

    // ── Atmosphere Glow ────────────────────────────────────────────────────────
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.98, 90, 90),
      new THREE.MeshBasicMaterial({ color: 0xfff8ee, transparent: true, opacity: 0.08 }),
    );
    root.add(atmo);

    // ── Ring System (Layered Cinematic) ────────────────────────────────────────
    const ringRoot = new THREE.Group();
    ringRoot.rotation.x = -1.13;
    ringRoot.rotation.z = 0.34;
    root.add(ringRoot);

    const ringSpecs = [
      { inner: 2.18, outer: 2.22, color: "#1a1917", opacity: 0.9 },
      { inner: 2.24, outer: 2.58, color: "#242320", opacity: 0.6 },
      { inner: 2.62, outer: 2.96, color: "#2f2d29", opacity: 0.45 },
      { inner: 3.02, outer: 3.38, color: "#1a1917", opacity: 0.3 },
      { inner: 3.42, outer: 3.85, color: "#242320", opacity: 0.15 },
    ];

    const rings: THREE.Mesh[] = [];
    ringSpecs.forEach((spec, i) => {
      const geo = new THREE.RingGeometry(spec.inner, spec.outer, 128);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(spec.color),
        transparent: true,
        opacity: spec.opacity,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.05,
        clearcoat: 0.2,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.z = i * 0.002; // depth layers
      ringRoot.add(m);
      rings.push(m);
    });

    // Shock Ring
    const shockRing = new THREE.Mesh(
      new THREE.RingGeometry(1.85, 2.05, 128),
      new THREE.MeshBasicMaterial({ color: 0xfff6e0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending })
    );
    root.add(shockRing);

    // ── Particle System (Energy Trails) ─────────────────────────────────────────
    const count = 1200;
    const posArr = new Float32Array(count * 3);
    const speedArr = new Float32Array(count);
    const angleArr = new Float32Array(count);
    const radiusArr = new Float32Array(count);
    const offsetArr = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.005 + Math.random() * 0.02;
      const offset = (Math.random() - 0.5) * 0.2;
      
      radiusArr[i] = radius;
      angleArr[i] = angle;
      speedArr[i] = speed;
      offsetArr[i] = offset;

      posArr[i * 3] = Math.cos(angle) * radius;
      posArr[i * 3 + 1] = Math.sin(angle) * radius;
      posArr[i * 3 + 2] = offset;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xfffbe8,
      size: 0.025,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    ringRoot.add(particles);

    // Burst particles (reused system)
    const burstCount = 60;
    const burstPos = new Float32Array(burstCount * 3);
    const burstVels: THREE.Vector3[] = [];
    for (let i = 0; i < burstCount; i++) {
      burstVels.push(new THREE.Vector3((Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1));
    }
    const burstGeo = new THREE.BufferGeometry();
    burstGeo.setAttribute("position", new THREE.BufferAttribute(burstPos, 3));
    const burstMat = new THREE.PointsMaterial({ color: 0xfffbe8, size: 0.06, transparent: true, opacity: 0 });
    const burstParticles = new THREE.Points(burstGeo, burstMat);
    scene.add(burstParticles);

    // ── Reference Storage ──────────────────────────────────────────────────────
    sceneRef.current = {
      renderer, scene, camera, root,
      planet, atmo, ringRoot, rings,
      particles, particlesGeo, radiusArr, angleArr, speedArr, offsetArr,
      shockRing, burstGeo, burstMat, burstVels, burstCount,
      key, rim, back
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
    let frame = 0;

    // ── Animation Loop ──────────────────────────────────────────────────────────
    const animate = () => {
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();
      const mouse = mouseRef.current;

      // 1. Proximity & Energy Calculations
      const dist = Math.sqrt(Math.pow(mouse.x - 0.5, 2) + Math.pow(mouse.y - 0.5, 2));
      const targetProximity = Math.max(0, 1 - dist * 2.5);
      proximityRef.current = lerp(proximityRef.current, targetProximity, 0.08);
      const prox = proximityRef.current;
      energyRef.current = lerp(energyRef.current, prox > 0.4 ? 1 : 0, 0.05);
      const energy = energyRef.current;

      // 2. Magnetic Hover Field (Distortion Simulation)
      // Tilt the rings toward the cursor
      const targetTiltZ = 0.34 + (mouse.x - 0.5) * 0.4 * prox;
      const targetTiltX = -1.13 + (mouse.y - 0.5) * 0.4 * prox;
      ringRoot.rotation.z = lerp(ringRoot.rotation.z, targetTiltZ, 0.06);
      ringRoot.rotation.x = lerp(ringRoot.rotation.x, targetTiltX, 0.06);

      // Organic Wobble (Noise-based illusion)
      const wobble = Math.sin(t * 1.5) * 0.02 + Math.cos(t * 2.1) * 0.01;
      ringRoot.rotation.x += wobble * (1 - prox * 0.5); // wobble less when controlled

      // 3. Cinematic Scale & Depth
      const targetScale = 1 + prox * 0.08 + clickMassRef.current * 0.2;
      root.scale.setScalar(lerp(root.scale.x, targetScale, 0.1));
      
      // Depth Illusion (Parallax)
      planet.position.z = prox * 0.15;
      ringRoot.position.z = prox * 0.05;
      camera.position.z = 7.2 - prox * 0.4; // subtle zoom on hover

      // 4. Lighting Animations
      rim.intensity = 4.0 + Math.sin(t * 2) * 0.5 + prox * 2;
      key.intensity = 3.5 + prox * 1.5;
      key.position.x = 5 + Math.sin(t * 0.4) * 2;

      // 5. Particle Engine (Acceleration & Trails)
      const pPos = (particlesGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const pCount = radiusArr.length;
      for (let i = 0; i < pCount; i++) {
        // Particles orbit faster when energized
        const speedBoost = 1 + energy * 2.5 + clickMassRef.current * 5;
        angleArr[i] += speedArr[i] * speedBoost;
        
        // Gravitational Pull simulation: particles cluster toward cursor direction subtly
        const targetRadius = radiusArr[i] * (1 - prox * 0.05);
        
        pPos[i * 3] = Math.cos(angleArr[i]) * targetRadius;
        pPos[i * 3 + 1] = Math.sin(angleArr[i]) * targetRadius;
        // Ripple effect simulation
        pPos[i * 3 + 2] = offsetArr[i] + Math.sin(angleArr[i] * 5 + t * 4) * 0.03 * prox;
      }
      particlesGeo.attributes.position.needsUpdate = true;
      particlesMat.opacity = 0.4 + prox * 0.4;
      particlesMat.size = 0.025 + energy * 0.01;

      // 6. Ring Life & Texture illusion
      rings.forEach((ring, i) => {
        // Layer separation on hover
        ring.position.z = i * (0.005 + prox * 0.02);
        // Subtle counter-rotation
        ring.rotation.z += 0.001 * (i + 1) * (1 + energy);
      });

      // Planet Spin
      planet.rotation.y += delta * 0.4 * (1 + energy * 2);

      // Update Burst Particles
      if (burstMat.opacity > 0) {
        const bP = burstGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < burstCount; i++) {
          bP[i * 3] += burstVels[i].x;
          bP[i * 3 + 1] += burstVels[i].y;
          bP[i * 3 + 2] += burstVels[i].z;
          burstVels[i].multiplyScalar(0.96);
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
