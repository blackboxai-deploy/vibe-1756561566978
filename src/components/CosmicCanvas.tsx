"use client";

import { useEffect, useRef, useState } from 'react';
import { ParticleSystem } from '@/lib/particleSystem';
import { ParticleConfig } from '@/lib/particle';

interface CosmicCanvasProps {
  config: ParticleConfig;
  className?: string;
}

export default function CosmicCanvas({ config, className = "" }: CosmicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleSystem | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (systemRef.current) {
        systemRef.current.resize(canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particle system
    systemRef.current = new ParticleSystem(canvas, config);
    systemRef.current.start();
    setIsInitialized(true);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (systemRef.current) {
        systemRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (systemRef.current && isInitialized) {
      systemRef.current.updateConfig(config);
    }
  }, [config, isInitialized]);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{ 
        width: '100vw', 
        height: '100vh',
        cursor: 'crosshair'
      }}
    />
  );
}