import { useRef, useEffect } from "react";

export default function Particles({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const PARTICLE_COUNT = 116;
    const TRAIL_LENGTH = 4;

    const BASE_COLOR = theme === 'dark'
      ? '#00ff88'
      : theme === 'alt'
      ? '#f24536'
      : '#00d4ff';
    const TRAIL_COLOR = theme === 'dark'
      ? '0, 255, 136'
      : theme === 'alt'
      ? '242, 69, 54'
      : '0, 212, 255';

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      let color;
      if (theme === 'dark') {
        color = `hsl(${120 + Math.random() * 60}, 100%, 60%)`;
      } else if (theme === 'alt') {
        color = `hsl(${8 + Math.random() * 28}, 90%, 60%)`;
      } else {
        color = `hsl(${180 + Math.random() * 60}, 80%, 70%)`;
      }
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2 + 0.1,
        size: Math.random() * 2.5 + 1,
        trail: [],
        color,
      };
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticles = () => {
      particles.forEach(p => {
        p.trail.push({ x: p.x, y: p.y, opacity: 0.7 });
        if (p.trail.length > TRAIL_LENGTH) p.trail.shift();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          if (Math.random() > 0.5) {
            p.x = Math.random() * canvas.width;
            p.y = 0;
          } else {
            p.x = 0;
            p.y = Math.random() * canvas.height;
          }
          p.trail = [];
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.trail.forEach((trailPoint, i) => {
          const opacity = (i / p.trail.length) * 0.4;
          ctx.beginPath();
          ctx.arc(trailPoint.x, trailPoint.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${TRAIL_COLOR}, ${opacity})`;
          ctx.fill();
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowColor = BASE_COLOR;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}
