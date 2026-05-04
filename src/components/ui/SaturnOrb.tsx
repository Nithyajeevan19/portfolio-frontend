import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SaturnOrbProps {
  mousePos: { x: number; y: number };
}

export default function SaturnOrb({ mousePos }: SaturnOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>({});
  const shockRef = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Drag to rotate refs
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  // Interaction mode ref
  const interactionRef = useRef(0);

  // Update mouse ref for the animation loop
  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseRef.current = {
        x: mousePos.x / window.innerWidth,
        y: mousePos.y / window.innerHeight,
      };
    }
  }, [mousePos]);

  // Click shockwave & Drag to rotate listeners
  useEffect(() => {
    const handleClick = () => {
      // Trigger shockwave
      shockRef.current = 1;
    };

    const down = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const up = () => {
      isDragging.current = false;
    };

    const move = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      const { root } = sceneRef.current;
      if (root) {
        root.rotation.y += dx * 0.005;
        root.rotation.x += dy * 0.005;
      }

      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.18, 7.2);

    const root = new THREE.Group();
    scene.add(root);

    // Lights
    scene.add(new THREE.AmbientLight(0xf7efe4, 1.85));
    const key = new THREE.DirectionalLight(0xfffbf3, 2.35);
    key.position.set(4, 3, 6);
    scene.add(key);
    const fill = new THREE.PointLight(0xd9fff6, 1.1, 30);
    fill.position.set(-3.8, -1.4, 4.5);
    scene.add(fill);

    // Planet body
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1.82, 120, 120),
      new THREE.MeshPhysicalMaterial({
        color: 0xd8cfc1,
        roughness: 0.96,
        metalness: 0.02,
        clearcoat: 0.14,
        clearcoatRoughness: 0.9,
        sheen: 0.5,
        sheenColor: new THREE.Color(0xf8f3eb),
      }),
    );
    root.add(planet);

    // Atmosphere halo
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.94, 90, 90),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 }),
    );
    root.add(atmo);

    // Ring system
    const ringRoot = new THREE.Group();
    ringRoot.rotation.x = -1.13;
    ringRoot.rotation.z = 0.34;
    root.add(ringRoot);

    const ringSpecs = [
      [2.18, 2.58, 0xcec0aa, 0.18],
      [2.63, 2.96, 0xa6b7af, 0.16],
      [3.02, 3.34, 0xece2d3, 0.09],
    ];

    // RING GLOW (Additive Blending)
    ringSpecs.forEach(([inner, outer, color, opacity]) => {
      ringRoot.add(
        new THREE.Mesh(
          new THREE.RingGeometry(inner as number, outer as number, 180),
          new THREE.MeshBasicMaterial({
            color: color as number,
            transparent: true,
            opacity: opacity as number,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
          }),
        ),
      );
    });

    // Orbiting moons
    const moonGeo = new THREE.SphereGeometry(0.055, 20, 20);
    const moonPalette = [0xc6fff6, 0xe8fff9, 0xb9e4d8];
    const orbiters: any[] = [];
    for (let i = 0; i < 3; i++) {
      const mesh = new THREE.Mesh(
        moonGeo,
        new THREE.MeshBasicMaterial({
          color: moonPalette[i],
          transparent: true,
          opacity: 0.78 - i * 0.14,
        }),
      );
      scene.add(mesh);
      orbiters.push({
        mesh,
        radius: 2.75 + i * 0.72,
        speed: 0.24 + i * 0.07,
        tilt: i * 0.32,
        offset: i * 2.05,
        y: i === 1 ? -0.64 : i === 2 ? 0.42 : 0.58,
      });
    }

    // PARTICLE FIELD
    const particlesGeo = new THREE.BufferGeometry();
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xded6c9,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      root,
      planet,
      atmo,
      ringRoot,
      orbiters,
      particles,
    };

    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      const t = clock.getElapsedTime();

      // INTERACTION MODE (idle vs active)
      const active = isDragging.current ? 1 : 0;
      interactionRef.current += (active - interactionRef.current) * 0.05;
      const boost = interactionRef.current;

      planet.rotation.x = Math.sin(t * 0.18) * 0.035;
      atmo.scale.setScalar(1 + Math.sin(t * 1.2) * 0.012);

      // Exactly user's snippet
      planet.rotation.y += 0.2 + boost * 0.6;
      ringRoot.rotation.z += 0.001 + boost * 0.004;

      orbiters.forEach((o, i) => {
        const a = t * o.speed + o.offset;
        o.mesh.position.set(
          Math.cos(a) * o.radius,
          o.y + Math.sin(a * 1.45 + o.tilt) * 0.08,
          Math.sin(a) * 1.18,
        );
        const pulse = 1 + Math.sin(t * 2.1 + i) * 0.07;
        o.mesh.scale.setScalar(pulse);
      });

      const mouse = mouseRef.current;

      // CURSOR GRAVITY
      const pullStrength = 0.6;
      planet.position.x += ((mouse.x - 0.5) * pullStrength - planet.position.x) * 0.05;
      planet.position.y += (-(mouse.y - 0.5) * pullStrength - planet.position.y) * 0.05;

      // PARTICLE PARALLAX
      if (particles) {
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0003;
        particles.position.x = -(mouse.x - 0.5) * 1.5;
        particles.position.y = (mouse.y - 0.5) * 1.5;
      }

      // MAGNETIC INTERACTION & INERTIA
      const dx = mouse.x - 0.5;
      const dy = mouse.y - 0.5;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const intensity = Math.max(0.2, 1 - distance * 1.5);

      const targetX = dy * 0.8 * intensity;
      const targetY = dx * 1.2 * intensity;

      velocity.current.x += (targetX - velocity.current.x) * 0.05;
      velocity.current.y += (targetY - velocity.current.y) * 0.05;

      root.rotation.x += velocity.current.x;
      root.rotation.y += velocity.current.y;

      // CLICK SHOCKWAVE EFFECT
      if (shockRef.current > 0) {
        shockRef.current *= 0.92; // decay
        const shock = shockRef.current;

        // rings expand
        ringRoot.scale.setScalar(1 + shock * 0.4);

        // planet pulse
        planet.scale.setScalar(1 + shock * 0.2);

        // slow motion effect
        planet.rotation.y += shock * 0.3;
      }

      renderer.render(scene, camera);
    };

    // PERFORMANCE FIX: use setAnimationLoop
    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      renderer.dispose();
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
