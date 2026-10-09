import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label?: string;
  radius: number;
  opacity: number;
}

const LABELS = ['интерес', 'образование', 'технологии', 'будущее', 'IoT', 'данные', 'сети', 'код'];

export default function InteractiveNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const rect = canvas.getBoundingClientRect();
    const nodeCount = Math.min(40, Math.floor((rect.width * rect.height) / 15000));
    
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      label: i < LABELS.length ? LABELS[i] : undefined,
      radius: 2 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.4,
    }));

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      let closestLabel: string | null = null;
      let closestDist = Infinity;

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        // Mouse interaction
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          node.opacity = Math.min(1, node.opacity + 0.02);
          if (node.label && dist < closestDist) {
            closestDist = dist;
            closestLabel = node.label;
          }
        } else {
          node.opacity = Math.max(0.3, node.opacity - 0.005);
        }
      });

      setHoveredLabel(closestLabel);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mx > 0 && my > 0) {
        nodes.forEach((node) => {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.5;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${node.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${node.opacity * 0.2})`;
        ctx.fill();
      });

      // Draw mouse point
      if (mx > 0 && my > 0) {
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx, my, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
    setHoveredLabel(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
  };

  const handleTouchEnd = () => {
    mouseRef.current = { x: -1000, y: -1000 };
    setHoveredLabel(null);
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Интерактивная цифровая сеть — наведите курсор или коснитесь для взаимодействия"
      />
      {hoveredLabel && (
        <div className="absolute top-4 left-4 md:top-8 md:left-8 pointer-events-none">
          <span className="text-cyan-400 text-lg md:text-2xl font-light tracking-wider opacity-80 glow-text">
            {hoveredLabel}
          </span>
        </div>
      )}
    </div>
  );
}
