"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ParticleConfig } from '@/lib/particle';

const presets: Array<{ name: string; description: string; emoji: string; config: ParticleConfig }> = [
  {
    name: "Cosmic Drift",
    description: "Gentle floating particles with soft blue connections",
    emoji: "🌌",
    config: {
      maxParticles: 150,
      connectionDistance: 120,
      mouseInfluenceRadius: 100,
      mouseInfluenceStrength: 0.8,
      colorTheme: 'cosmic',
      particleSize: 2,
      speed: 0.3,
    }
  },
  {
    name: "Nebula Storm",
    description: "Dense particle field with dynamic purple energy",
    emoji: "💫",
    config: {
      maxParticles: 400,
      connectionDistance: 80,
      mouseInfluenceRadius: 200,
      mouseInfluenceStrength: 1.5,
      colorTheme: 'nebula',
      particleSize: 3,
      speed: 1.2,
    }
  },
  {
    name: "Aurora Flow",
    description: "Ethereal green streams with gentle movement",
    emoji: "🌊",
    config: {
      maxParticles: 250,
      connectionDistance: 100,
      mouseInfluenceRadius: 150,
      mouseInfluenceStrength: 1.0,
      colorTheme: 'aurora',
      particleSize: 2.5,
      speed: 0.7,
    }
  },
  {
    name: "Sunset Galaxy",
    description: "Warm orange and red cosmic dance",
    emoji: "🌅",
    config: {
      maxParticles: 300,
      connectionDistance: 90,
      mouseInfluenceRadius: 180,
      mouseInfluenceStrength: 1.2,
      colorTheme: 'sunset',
      particleSize: 2.5,
      speed: 0.8,
    }
  },
  {
    name: "Deep Space",
    description: "Minimal particles in the cosmic void",
    emoji: "🌠",
    config: {
      maxParticles: 100,
      connectionDistance: 150,
      mouseInfluenceRadius: 120,
      mouseInfluenceStrength: 0.6,
      colorTheme: 'galaxy',
      particleSize: 4,
      speed: 0.4,
    }
  },
  {
    name: "Hyperspace",
    description: "High energy particle acceleration",
    emoji: "⚡",
    config: {
      maxParticles: 500,
      connectionDistance: 60,
      mouseInfluenceRadius: 250,
      mouseInfluenceStrength: 2.0,
      colorTheme: 'cosmic',
      particleSize: 1.5,
      speed: 2.5,
    }
  }
];

export default function GalleryPage() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const handlePresetSelect = (index: number) => {
    setSelectedPreset(index);
    const config = presets[index].config;
    // Store in localStorage for the screensaver page
    localStorage.setItem('cosmicFlowConfig', JSON.stringify(config));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            🎨 Cosmic Gallery
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Discover different cosmic configurations and find your perfect flow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20">
                ← Back to Home
              </Button>
            </Link>
            <Link href="/screensaver">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                🌌 Enter Screensaver
              </Button>
            </Link>
          </div>
        </div>

        {/* Presets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {presets.map((preset, index) => (
            <Card 
              key={index}
              className={`bg-black/20 border-2 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPreset === index 
                  ? 'border-purple-400 shadow-lg shadow-purple-400/25' 
                  : 'border-white/20 hover:border-purple-400/50'
              }`}
              onClick={() => handlePresetSelect(index)}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-2xl">{preset.emoji}</span>
                  {preset.name}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {preset.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex justify-between">
                    <span>Particles:</span>
                    <span>{preset.config.maxParticles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connections:</span>
                    <span>{preset.config.connectionDistance}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span>{preset.config.speed}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theme:</span>
                    <span className="capitalize">{preset.config.colorTheme}</span>
                  </div>
                </div>
                
                {selectedPreset === index && (
                  <div className="mt-4">
                    <Link href="/screensaver">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Launch This Preset
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-300">🌟 How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400 space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">🎮 Interactive Controls</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Mouse Movement:</strong> Particles are attracted to and repelled by your cursor</li>
                  <li><strong>Click:</strong> Creates ripple effects that propagate through the particle field</li>
                  <li><strong>Touch:</strong> Full mobile support for touch interactions</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">⌨️ Keyboard Shortcuts</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Space:</strong> Pause/resume animation</li>
                  <li><strong>R:</strong> Reset particles to initial state</li>
                  <li><strong>F:</strong> Toggle fullscreen mode</li>
                  <li><strong>S:</strong> Show/hide performance statistics</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">⚙️ Customization</h4>
                <p>
                  Use the control panel in the screensaver to adjust particle count, connection distance, 
                  mouse influence, colors, and more. Create your own cosmic experience!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}