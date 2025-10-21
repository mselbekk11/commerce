'use client';

import { useEffect, useRef } from 'react';

export function AnimatedHalftoneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.025;

      // Fill background with black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid settings
      const spacing = 8;
      const maxCrossSize = 6;

      // Draw halftone crosses
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const wave1 =
            Math.sin(x * 0.005 + y * 0.003 + time * 2.3) * 0.5 + 0.5;
          const wave2 =
            Math.cos(x * 0.004 - y * 0.006 + time * 1.7) * 0.5 + 0.5;
          const wave3 =
            Math.sin(x * 0.002 + y * 0.004 + time * 3.1) * 0.5 + 0.5;
          const wave4 =
            Math.cos(x * 0.006 - y * 0.002 + time * 2.8) * 0.5 + 0.5;
          const wave5 =
            Math.sin(x * 0.003 + y * 0.005 - time * 2.5) * 0.5 + 0.5;
          const wave6 =
            Math.cos(x * 0.007 + y * 0.001 + time * 3.5) * 0.5 + 0.5;

          // Combine waves for chaotic pattern
          const combined =
            wave1 * 0.2 +
            wave2 * 0.15 +
            wave3 * 0.2 +
            wave4 * 0.15 +
            wave5 * 0.15 +
            wave6 * 0.15;

          // Calculate cross size based on wave pattern
          const crossSize = combined * maxCrossSize;

          const brightness = Math.floor(combined * 180); // Reduced from 255 to 180 to avoid bright whites
          const color = `rgb(${brightness}, ${brightness}, ${brightness})`;

          ctx.fillStyle = color;
          ctx.fillRect(
            x - crossSize / 2,
            y - crossSize / 6,
            crossSize,
            crossSize / 3
          ); // Horizontal bar
          ctx.fillRect(
            x - crossSize / 6,
            y - crossSize / 2,
            crossSize / 3,
            crossSize
          ); // Vertical bar
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='inset-0 w-full h-[600px] -z-10'
      aria-hidden='true'
    />
  );
}
