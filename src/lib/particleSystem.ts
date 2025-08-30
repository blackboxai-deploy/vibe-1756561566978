import { Particle, ParticleConfig, Vector2D } from './particle';

export interface RippleEffect {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  life: number;
  maxLife: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private ripples: RippleEffect[] = [];
  private config: ParticleConfig;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mouse: Vector2D = { x: 0, y: 0 };
  private isMouseActive = false;
  private animationId: number | null = null;
  private backgroundHue = 0;
  private lastTime = 0;
  private fps = 0;
  private frameCount = 0;
  private showStats = false;

  constructor(canvas: HTMLCanvasElement, config: ParticleConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = config;
    this.initializeParticles();
    this.setupEventListeners();
  }

  private initializeParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.config.maxParticles; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.particles.push(new Particle(x, y, this.config));
    }
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.isMouseActive = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.isMouseActive = false;
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.createRipple(x, y);
    });

    // Touch support
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
      this.isMouseActive = true;
    });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.createRipple(x, y);
      this.isMouseActive = true;
    });

    this.canvas.addEventListener('touchend', () => {
      this.isMouseActive = false;
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.toggle();
          break;
        case 'KeyR':
          this.reset();
          break;
        case 'KeyF':
          this.toggleFullscreen();
          break;
        case 'KeyS':
          this.showStats = !this.showStats;
          break;
      }
    });
  }

  private createRipple(x: number, y: number): void {
    this.ripples.push({
      x,
      y,
      radius: 0,
      maxRadius: 200 + Math.random() * 100,
      strength: 5 + Math.random() * 5,
      life: 0,
      maxLife: 60 + Math.random() * 30,
    });
  }

  updateConfig(newConfig: Partial<ParticleConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Adjust particle count if needed
    while (this.particles.length < this.config.maxParticles) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.particles.push(new Particle(x, y, this.config));
    }
    
    if (this.particles.length > this.config.maxParticles) {
      this.particles = this.particles.slice(0, this.config.maxParticles);
    }
  }

  private update(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Update FPS
    this.frameCount++;
    if (this.frameCount % 60 === 0) {
      this.fps = Math.round(1000 / (deltaTime || 16));
    }

    // Update background hue for color shifting
    this.backgroundHue += 0.1;
    if (this.backgroundHue >= 360) this.backgroundHue = 0;

    // Update particles
    this.particles.forEach(particle => {
      particle.update(this.canvas.width, this.canvas.height, this.config);
      
      // Apply mouse influence
      if (this.isMouseActive) {
        particle.applyMouseInfluence(this.mouse.x, this.mouse.y, this.config);
      }
      
      // Apply ripple effects
      this.ripples.forEach(ripple => {
        const dx = particle.position.x - ripple.x;
        const dy = particle.position.y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ripple.radius && distance > ripple.radius - 20) {
          const force = ripple.strength / (distance + 1);
          particle.applyForce({
            x: (dx / distance) * force,
            y: (dy / distance) * force,
          });
        }
      });
      
      // Reset particle if needed
      if (particle.shouldReset()) {
        particle.reset(this.canvas.width, this.canvas.height, this.config);
      }
    });

    // Update ripples
    this.ripples = this.ripples.filter(ripple => {
      ripple.life++;
      ripple.radius = (ripple.life / ripple.maxLife) * ripple.maxRadius;
      ripple.strength *= 0.98;
      return ripple.life < ripple.maxLife;
    });
  }

  private drawBackground(): void {
    // Create gradient background
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height)
    );
    
    gradient.addColorStop(0, `hsla(${this.backgroundHue}, 20%, 5%, 1)`);
    gradient.addColorStop(0.5, `hsla(${(this.backgroundHue + 30) % 360}, 30%, 3%, 1)`);
    gradient.addColorStop(1, `hsla(${(this.backgroundHue + 60) % 360}, 40%, 1%, 1)`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawConnections(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const distance = this.particles[i].distanceTo(this.particles[j]);
        
        if (distance < this.config.connectionDistance) {
          const alpha = 1 - (distance / this.config.connectionDistance);
          const hue = (this.particles[i].hue + this.particles[j].hue) / 2;
          
          this.ctx.strokeStyle = `hsla(${hue}, 60%, 60%, ${alpha * 0.3})`;
          this.ctx.lineWidth = alpha * 2;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].position.x, this.particles[i].position.y);
          this.ctx.lineTo(this.particles[j].position.x, this.particles[j].position.y);
          this.ctx.stroke();
        }
      }
    }
  }

  private drawRipples(): void {
    this.ripples.forEach(ripple => {
      const alpha = 1 - (ripple.life / ripple.maxLife);
      this.ctx.strokeStyle = `hsla(${this.backgroundHue + 180}, 80%, 70%, ${alpha * 0.5})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
  }

  private drawStats(): void {
    if (!this.showStats) return;
    
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = '14px monospace';
    this.ctx.fillText(`FPS: ${this.fps}`, 10, 20);
    this.ctx.fillText(`Particles: ${this.particles.length}`, 10, 40);
    this.ctx.fillText(`Ripples: ${this.ripples.length}`, 10, 60);
    this.ctx.fillText(`Mouse: ${this.isMouseActive ? 'Active' : 'Inactive'}`, 10, 80);
  }

  private render(): void {
    // Clear and draw background
    this.drawBackground();
    
    // Draw connections
    this.drawConnections();
    
    // Draw particles
    this.particles.forEach(particle => particle.draw(this.ctx));
    
    // Draw ripples
    this.drawRipples();
    
    // Draw stats
    this.drawStats();
  }

  private animate = (currentTime: number): void => {
    this.update(currentTime);
    this.render();
    this.animationId = requestAnimationFrame(this.animate);
  };

  start(): void {
    if (!this.animationId) {
      this.lastTime = performance.now();
      this.animationId = requestAnimationFrame(this.animate);
    }
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  toggle(): void {
    if (this.animationId) {
      this.stop();
    } else {
      this.start();
    }
  }

  reset(): void {
    this.initializeParticles();
    this.ripples = [];
    this.backgroundHue = 0;
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  private toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      this.canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  destroy(): void {
    this.stop();
    // Remove event listeners would go here if needed
  }
}