'use client';

import { useEffect, useRef } from 'react';

interface AnimatedHalftoneBackgroundProps {
  className?: string;
}

export function AnimatedHalftoneBackgroundTwo({
  className = '',
}: AnimatedHalftoneBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderPattern = () => {
      // Fill background with black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const spacing = 4;
      const maxCrossSize = 3;

      // Draw halftone crosses
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const wave1 = Math.sin(x * 0.005 + y * 0.003) * 0.5 + 0.5;
          const wave2 = Math.cos(x * 0.004 - y * 0.006) * 0.5 + 0.5;
          const wave3 = Math.sin(x * 0.002 + y * 0.004) * 0.5 + 0.5;
          const wave4 = Math.cos(x * 0.006 - y * 0.002) * 0.5 + 0.5;
          const wave5 = Math.sin(x * 0.003 + y * 0.005) * 0.5 + 0.5;
          const wave6 = Math.cos(x * 0.007 + y * 0.001) * 0.5 + 0.5;

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

          const brightness = Math.floor(combined * 120);
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
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      renderPattern();
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        aria-hidden='true'
      />
    </div>
  );
}
