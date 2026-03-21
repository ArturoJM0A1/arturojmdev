import { useRef, useEffect } from "react";

export default function Particles({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const isDarkMode = theme === 'dark';
    const PARTICLE_COUNT = isDarkMode ? 116 : 22;
    const TRAIL_LENGTH = 4;
    const BASE_COLOR = isDarkMode ? '#00ff88' : '#9ed8ff';
    const TRAIL_COLOR = '0, 255, 136';
    const CLOUD_PALETTE = [
      {
        highlight: 'rgba(255, 255, 255, 0.97)',
        top: 'rgba(252, 254, 255, 0.93)',
        mid: 'rgba(244, 250, 255, 0.8)',
        bottom: 'rgba(229, 241, 252, 0.58)',
        under: 'rgba(173, 206, 232, 0.14)',
        glow: 'rgba(214, 235, 255, 0.2)',
        mist: 'rgba(245, 251, 255, 0.26)',
      },
      {
        highlight: 'rgba(255, 255, 255, 0.98)',
        top: 'rgba(249, 253, 255, 0.92)',
        mid: 'rgba(239, 248, 255, 0.78)',
        bottom: 'rgba(224, 238, 251, 0.56)',
        under: 'rgba(166, 199, 226, 0.14)',
        glow: 'rgba(206, 230, 255, 0.18)',
        mist: 'rgba(242, 249, 255, 0.24)',
      },
      {
        highlight: 'rgba(255, 255, 255, 0.99)',
        top: 'rgba(250, 253, 255, 0.94)',
        mid: 'rgba(243, 249, 255, 0.82)',
        bottom: 'rgba(231, 242, 252, 0.6)',
        under: 'rgba(179, 208, 232, 0.13)',
        glow: 'rgba(219, 238, 255, 0.22)',
        mist: 'rgba(247, 251, 255, 0.28)',
      },
      {
        highlight: 'rgba(254, 255, 255, 0.96)',
        top: 'rgba(248, 252, 255, 0.91)',
        mid: 'rgba(237, 246, 255, 0.76)',
        bottom: 'rgba(219, 235, 250, 0.54)',
        under: 'rgba(160, 194, 223, 0.13)',
        glow: 'rgba(199, 226, 252, 0.18)',
        mist: 'rgba(239, 248, 255, 0.24)',
      },
    ];
    const CLOUD_PROFILES = [
      [
        { x: 0, y: 0.18, rx: 0.56, ry: 0.28, layer: 'base' },
        { x: -0.32, y: 0.1, rx: 0.24, ry: 0.2, layer: 'mid' },
        { x: -0.12, y: -0.08, rx: 0.28, ry: 0.25, layer: 'top' },
        { x: 0.16, y: -0.18, rx: 0.31, ry: 0.28, layer: 'top' },
        { x: 0.42, y: 0.02, rx: 0.22, ry: 0.19, layer: 'mid' },
      ],
      [
        { x: 0, y: 0.18, rx: 0.58, ry: 0.27, layer: 'base' },
        { x: -0.38, y: 0.08, rx: 0.2, ry: 0.17, layer: 'mid' },
        { x: -0.18, y: -0.14, rx: 0.25, ry: 0.22, layer: 'top' },
        { x: 0.08, y: -0.2, rx: 0.3, ry: 0.27, layer: 'top' },
        { x: 0.34, y: -0.04, rx: 0.24, ry: 0.21, layer: 'mid' },
        { x: 0.54, y: 0.12, rx: 0.15, ry: 0.13, layer: 'edge' },
      ],
      [
        { x: 0, y: 0.2, rx: 0.62, ry: 0.29, layer: 'base' },
        { x: -0.42, y: 0.1, rx: 0.18, ry: 0.15, layer: 'edge' },
        { x: -0.22, y: -0.08, rx: 0.27, ry: 0.24, layer: 'top' },
        { x: 0.05, y: -0.16, rx: 0.29, ry: 0.27, layer: 'top' },
        { x: 0.31, y: -0.05, rx: 0.25, ry: 0.22, layer: 'mid' },
        { x: 0.52, y: 0.1, rx: 0.16, ry: 0.13, layer: 'edge' },
      ],
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDarkParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2 + 0.1,
      size: Math.random() * 2.51 + 1,
      trail: [],
      color: `hsl(${120 + Math.random() * 60}, 100%, 60%)`,
    });

    const createLightParticle = () => {
      const width = 90 + Math.random() * 120;
      const height = width * (0.34 + Math.random() * 0.12);
      const palette = CLOUD_PALETTE[Math.floor(Math.random() * CLOUD_PALETTE.length)];
      const profile = CLOUD_PROFILES[Math.floor(Math.random() * CLOUD_PROFILES.length)];
      const depth = 2.78 + Math.random() * 4.5;

      return {
        x: Math.random() * (canvas.width + width * 3) - width * 1.5,
        y: Math.random() * canvas.height,
        vx: 0.05 + depth * 0.08,
        vy: (Math.random() - 0.5) * 0.025,
        width,
        height,
        depth,
        trail: [],
        palette,
        shadowBlur: 26 + Math.random() * 18,
        wobbleX: 8 + Math.random() * 18,
        wobbleY: 3 + Math.random() * 8,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.0024 + Math.random() * 0.0025,
        profile,
      };
    };

    const createParticle = () => (isDarkMode ? createDarkParticle() : createLightParticle());

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const recycleLightParticle = (particle) => {
      const recycled = createLightParticle();
      recycled.x = -recycled.width * (1.5 + Math.random() * 1.5);
      recycled.y = Math.random() * canvas.height;
      Object.assign(particle, recycled);
    };

    const updateParticles = () => {
      particles.forEach(p => {
        if (isDarkMode) {
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

          return;
        }

        p.phase += p.phaseSpeed;
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.phase * 0.8) * 0.03;

        const cloudMargin = p.width * 1.5;
        if (
          p.x > canvas.width + cloudMargin ||
          p.y < -cloudMargin ||
          p.y > canvas.height + cloudMargin
        ) {
          recycleLightParticle(p);
        }
      });
    };

    const drawDarkParticles = () => {
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

    const drawLightParticles = () => {
      [...particles]
        .sort((leftCloud, rightCloud) => leftCloud.depth - rightCloud.depth)
        .forEach((p) => {
          const drawX = p.x + Math.cos(p.phase) * p.wobbleX;
          const drawY = p.y + Math.sin(p.phase * 0.9) * p.wobbleY;
          const { palette } = p;

          ctx.save();
          ctx.translate(drawX, drawY);

          ctx.shadowColor = palette.glow;
          ctx.shadowBlur = p.shadowBlur;

          const mist = ctx.createRadialGradient(
            0,
            0,
            p.width * 0.08,
            0,
            0,
            p.width * 0.7,
          );
          mist.addColorStop(0, palette.mist);
          mist.addColorStop(0.75, palette.glow);
          mist.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.ellipse(0, p.height * 0.16, p.width * 0.7, p.height * 0.88, 0, 0, Math.PI * 2);
          ctx.fillStyle = mist;
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.fillStyle = palette.under;
          ctx.beginPath();
          ctx.ellipse(0, p.height * 0.3, p.width * 0.42, p.height * 0.16, 0, 0, Math.PI * 2);
          ctx.fill();

          p.profile.forEach((puff) => {
            const rx = p.width * puff.rx;
            const ry = p.height * puff.ry;
            const puffGradient = ctx.createRadialGradient(
              -rx * 0.22,
              -ry * 0.5,
              rx * 0.08,
              0,
              0,
              rx,
            );
            puffGradient.addColorStop(0, palette.highlight);
            puffGradient.addColorStop(0.42, palette.top);
            puffGradient.addColorStop(
              0.82,
              puff.layer === 'base' ? palette.mid : palette.top,
            );
            puffGradient.addColorStop(1, puff.layer === 'base' ? palette.bottom : palette.mid);

            ctx.beginPath();
            ctx.ellipse(
              p.width * puff.x,
              p.height * puff.y,
              rx,
              ry,
              0,
              0,
              Math.PI * 2,
            );
            ctx.fillStyle = puffGradient;
            ctx.fill();
          });

          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          ctx.ellipse(
            -p.width * 0.1,
            -p.height * 0.16,
            p.width * 0.22,
            p.height * 0.08,
            -0.1,
            0,
            Math.PI * 2,
          );
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(
            p.width * 0.12,
            -p.height * 0.1,
            p.width * 0.16,
            p.height * 0.06,
            0.08,
            0,
            Math.PI * 2,
          );
          ctx.fill();

          ctx.restore();
        });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isDarkMode) {
        drawDarkParticles();
        return;
      }

      drawLightParticles();
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
