"use client";

import { useState } from 'react';
import CosmicCanvas from '@/components/CosmicCanvas';
import ControlPanel from '@/components/ControlPanel';
import { ParticleConfig } from '@/lib/particle';

const defaultConfig: ParticleConfig = {
  maxParticles: 200,
  connectionDistance: 100,
  mouseInfluenceRadius: 150,
  mouseInfluenceStrength: 1.0,
  colorTheme: 'cosmic',
  particleSize: 2,
  speed: 0.5,
};

export default function ScreensaverPage() {
  const [config, setConfig] = useState<ParticleConfig>(defaultConfig);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <CosmicCanvas 
        config={config}
        className="absolute inset-0"
      />
      
      <ControlPanel
        config={config}
        onConfigChange={setConfig}
        isVisible={showControls}
        onToggleVisibility={() => setShowControls(!showControls)}
      />
      
      {/* Welcome message that fades out */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white/80 animate-pulse">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🌌 Cosmic Flow
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Move your mouse to interact • Click for ripples
            </p>
            <p className="text-sm text-white/60">
              Press Space to pause • R to reset • F for fullscreen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}