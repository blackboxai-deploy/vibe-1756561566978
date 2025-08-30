"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ParticleConfig } from '@/lib/particle';

interface ControlPanelProps {
  config: ParticleConfig;
  onConfigChange: (config: ParticleConfig) => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const colorThemes = [
  { value: 'cosmic', label: '🌌 Cosmic Blue', description: 'Deep blues and purples' },
  { value: 'sunset', label: '🌅 Sunset', description: 'Warm oranges and reds' },
  { value: 'aurora', label: '🌊 Aurora', description: 'Cool greens and cyans' },
  { value: 'nebula', label: '💫 Nebula', description: 'Purple and magenta' },
  { value: 'galaxy', label: '🌠 Galaxy', description: 'Deep space blues' },
];

export default function ControlPanel({ 
  config, 
  onConfigChange, 
  isVisible, 
  onToggleVisibility 
}: ControlPanelProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const updateConfig = (key: keyof ParticleConfig, value: any) => {
    onConfigChange({
      ...config,
      [key]: value,
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // This would trigger the particle system pause/resume
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
  };

  const handleReset = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyR' }));
  };

  const handleFullscreen = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF' }));
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggleVisibility}
        className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white border border-white/20"
        size="sm"
      >
        ⚙️ Controls
      </Button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Card className="bg-black/80 border-white/20 backdrop-blur-sm text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">🌌 Cosmic Controls</CardTitle>
            <Button
              onClick={onToggleVisibility}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Playback Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Playback</Label>
            <div className="flex gap-2">
              <Button
                onClick={handlePlayPause}
                size="sm"
                className="flex-1"
                variant={isPlaying ? "secondary" : "default"}
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </Button>
              <Button onClick={handleReset} size="sm" variant="outline">
                🔄 Reset
              </Button>
              <Button onClick={handleFullscreen} size="sm" variant="outline">
                ⛶ Full
              </Button>
            </div>
          </div>

          {/* Particle Count */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Particles: {config.maxParticles}
            </Label>
            <Slider
              value={[config.maxParticles]}
              onValueChange={([value]) => updateConfig('maxParticles', value)}
              min={50}
              max={500}
              step={25}
              className="w-full"
            />
          </div>

          {/* Connection Distance */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Connections: {config.connectionDistance}px
            </Label>
            <Slider
              value={[config.connectionDistance]}
              onValueChange={([value]) => updateConfig('connectionDistance', value)}
              min={50}
              max={200}
              step={10}
              className="w-full"
            />
          </div>

          {/* Mouse Influence */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Mouse Range: {config.mouseInfluenceRadius}px
            </Label>
            <Slider
              value={[config.mouseInfluenceRadius]}
              onValueChange={([value]) => updateConfig('mouseInfluenceRadius', value)}
              min={50}
              max={300}
              step={25}
              className="w-full"
            />
          </div>

          {/* Mouse Strength */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Mouse Strength: {config.mouseInfluenceStrength}
            </Label>
            <Slider
              value={[config.mouseInfluenceStrength]}
              onValueChange={([value]) => updateConfig('mouseInfluenceStrength', value)}
              min={0.1}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Particle Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Particle Size: {config.particleSize}px
            </Label>
            <Slider
              value={[config.particleSize]}
              onValueChange={([value]) => updateConfig('particleSize', value)}
              min={1}
              max={6}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Speed */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Speed: {config.speed}
            </Label>
            <Slider
              value={[config.speed]}
              onValueChange={([value]) => updateConfig('speed', value)}
              min={0.1}
              max={3.0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Color Theme */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Color Theme</Label>
            <Select
              value={config.colorTheme}
              onValueChange={(value) => updateConfig('colorTheme', value)}
            >
              <SelectTrigger className="bg-black/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                {colorThemes.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value} className="hover:bg-white/20">
                    <div>
                      <div className="font-medium">{theme.label}</div>
                      <div className="text-xs text-gray-400">{theme.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Presets */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Presets</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onConfigChange({
                  maxParticles: 200,
                  connectionDistance: 100,
                  mouseInfluenceRadius: 150,
                  mouseInfluenceStrength: 1.0,
                  colorTheme: 'cosmic',
                  particleSize: 2,
                  speed: 0.5,
                })}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                🌌 Calm
              </Button>
              <Button
                onClick={() => onConfigChange({
                  maxParticles: 400,
                  connectionDistance: 80,
                  mouseInfluenceRadius: 200,
                  mouseInfluenceStrength: 1.5,
                  colorTheme: 'nebula',
                  particleSize: 3,
                  speed: 1.2,
                })}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                💫 Active
              </Button>
              <Button
                onClick={() => onConfigChange({
                  maxParticles: 100,
                  connectionDistance: 150,
                  mouseInfluenceRadius: 100,
                  mouseInfluenceStrength: 0.5,
                  colorTheme: 'aurora',
                  particleSize: 4,
                  speed: 0.3,
                })}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                🌊 Zen
              </Button>
              <Button
                onClick={() => onConfigChange({
                  maxParticles: 500,
                  connectionDistance: 60,
                  mouseInfluenceRadius: 250,
                  mouseInfluenceStrength: 2.0,
                  colorTheme: 'sunset',
                  particleSize: 2.5,
                  speed: 2.0,
                })}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                🔥 Intense
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-white/20">
            <p><strong>Controls:</strong></p>
            <p>• Move mouse to influence particles</p>
            <p>• Click for ripple effects</p>
            <p>• Space: pause/play</p>
            <p>• R: reset</p>
            <p>• F: fullscreen</p>
            <p>• S: show stats</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}