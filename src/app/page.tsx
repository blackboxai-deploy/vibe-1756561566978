"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            🌌 Cosmic Flow
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light">
            A mesmerizing generative art screensaver
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Watch hundreds of cosmic particles drift through space, forming constellation connections 
            and responding to your touch in this relaxing interactive visualization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-300">✨ Particle System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Hundreds of floating particles with physics-based movement and cosmic colors
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-blue-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300">🌟 Constellation Lines</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Dynamic connections form between nearby particles creating ethereal patterns
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-pink-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-pink-300">🎯 Interactive</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Mouse interactions and click ripples that influence particle behavior
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link href="/screensaver">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              🚀 Enter Cosmic Flow
            </Button>
          </Link>
          
          <Link href="/gallery">
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-400 px-8 py-6 text-lg rounded-xl transition-all duration-300"
            >
              🎨 View Gallery
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          <p>Press F for fullscreen • Space to pause • R to reset</p>
        </div>
      </div>
    </div>
  );
}