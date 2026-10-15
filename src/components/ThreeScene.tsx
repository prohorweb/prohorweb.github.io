import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  connections: number[];
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    container.appendChild(renderer.domElement);

    // Colors
    const gold = new THREE.Color(0xD6B36A);

    // Create neural network nodes
    const nodeCount = isMobile ? 60 : 120;
    const nodes: Node[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    
    // Create nodes in layered sphere distribution
    for (let i = 0; i < nodeCount; i++) {
      const layer = Math.floor(i / (nodeCount / 3));
      const radius = 6 + layer * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: gold,
        transparent: true,
        opacity: 0.8
      });
      
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      
      nodes.push({
        position: new THREE.Vector3(x, y, z),
        mesh,
        connections: []
      });
    }

    // Create connections to nearest neighbors
    const maxConnections = isMobile ? 3 : 4;
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.15
    });
    
    const connections: THREE.Line[] = [];
    
    nodes.forEach((node, i) => {
      const distances = nodes.map((n, j) => ({
        index: j,
        distance: node.position.distanceTo(n.position)
      })).filter(d => d.index !== i);
      
      distances.sort((a, b) => a.distance - b.distance);
      
      const nearestCount = Math.min(maxConnections, distances.length);
      for (let k = 0; k < nearestCount; k++) {
        const targetIndex = distances[k].index;
        if (!node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
          
          const geometry = new THREE.BufferGeometry().setFromPoints([
            node.position,
            nodes[targetIndex].position
          ]);
          const line = new THREE.Line(geometry, connectionMaterial);
          scene.add(line);
          connections.push(line);
        }
      }
    });

    // Create pulse system
    const pulses: Pulse[] = [];
    const pulseGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.9
    });
    const pulseMeshes: THREE.Mesh[] = [];
    
    const maxPulses = isMobile ? 8 : 15;
    for (let i = 0; i < maxPulses; i++) {
      const mesh = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      mesh.visible = false;
      scene.add(mesh);
      pulseMeshes.push(mesh);
    }

    // Animation
    let isVisible = !document.hidden;
    let rotation = 0;
    let lastPulseTime = 0;
    
    const animate = (time: number) => {
      if (isVisible && !prefersReducedMotion) {
        // Slow rotation
        rotation += 0.0005;
        scene.rotation.y = rotation;
        
        // Mouse parallax
        scene.rotation.x = mouseRef.current.y * 0.05;
        scene.rotation.y = rotation + mouseRef.current.x * 0.05;
        
        // Update pulses
        if (time - lastPulseTime > 800 && pulses.length < maxPulses) {
          const nodeIndex = Math.floor(Math.random() * nodes.length);
          const node = nodes[nodeIndex];
          if (node.connections.length > 0) {
            const targetIndex = node.connections[Math.floor(Math.random() * node.connections.length)];
            pulses.push({
              fromIndex: nodeIndex,
              toIndex: targetIndex,
              progress: 0,
              speed: 0.01 + Math.random() * 0.02
            });
            lastPulseTime = time;
          }
        }
        
        pulses.forEach((pulse, i) => {
          pulse.progress += pulse.speed;
          
          if (pulse.progress >= 1) {
            pulses.splice(i, 1);
            pulseMeshes[i].visible = false;
          } else {
            const fromPos = nodes[pulse.fromIndex].position;
            const toPos = nodes[pulse.toIndex].position;
            const pos = new THREE.Vector3().lerpVectors(fromPos, toPos, pulse.progress);
            
            pulseMeshes[i].position.copy(pos);
            pulseMeshes[i].visible = true;
            
            const material = pulseMeshes[i].material as THREE.MeshBasicMaterial;
            material.opacity = Math.sin(pulse.progress * Math.PI) * 0.9;
          }
        });
        
        renderer.render(scene, camera);
      } else if (prefersReducedMotion) {
        // Static or very slow rotation
        rotation += 0.0001;
        scene.rotation.y = rotation;
        renderer.render(scene, camera);
      }
      
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    animate(0);

    // Mouse parallax handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!prefersReducedMotion) {
        mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Visibility handler
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      
      nodeGeometry.dispose();
      pulseGeometry.dispose();
      nodes.forEach(node => {
        (node.mesh.material as THREE.Material).dispose();
      });
      connections.forEach(conn => {
        conn.geometry.dispose();
        (conn.material as THREE.Material).dispose();
      });
      pulseMeshes.forEach(mesh => {
        (mesh.material as THREE.Material).dispose();
      });
      connectionMaterial.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
