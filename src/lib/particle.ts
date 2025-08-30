export interface Vector2D {
  x: number;
  y: number;
}

export interface ParticleConfig {
  maxParticles: number;
  connectionDistance: number;
  mouseInfluenceRadius: number;
  mouseInfluenceStrength: number;
  colorTheme: string;
  particleSize: number;
  speed: number;
}

export class Particle {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  size: number;
  maxSize: number;
  life: number;
  maxLife: number;
  angle: number;
  angleVelocity: number;

  constructor(x: number, y: number, config: ParticleConfig) {
    this.position = { x, y };
    this.velocity = {
      x: (Math.random() - 0.5) * config.speed,
      y: (Math.random() - 0.5) * config.speed,
    };
    this.acceleration = { x: 0, y: 0 };
    
    // Color based on theme
    this.hue = this.getThemeHue(config.colorTheme);
    this.saturation = 70 + Math.random() * 30;
    this.lightness = 50 + Math.random() * 30;
    this.alpha = 0.6 + Math.random() * 0.4;
    
    this.size = config.particleSize * (0.5 + Math.random() * 0.5);
    this.maxSize = this.size * (1.2 + Math.random() * 0.8);
    this.life = 0;
    this.maxLife = 1000 + Math.random() * 2000;
    
    this.angle = Math.random() * Math.PI * 2;
    this.angleVelocity = (Math.random() - 0.5) * 0.02;
  }

  private getThemeHue(theme: string): number {
    const themeHues: { [key: string]: [number, number] } = {
      cosmic: [220, 280], // Blue to purple
      sunset: [10, 60],   // Red to yellow
      aurora: [120, 200], // Green to cyan
      nebula: [280, 340], // Purple to magenta
      galaxy: [200, 260], // Blue to purple-blue
    };
    
    const [min, max] = themeHues[theme] || themeHues.cosmic;
    return min + Math.random() * (max - min);
  }

  update(width: number, height: number, _config: ParticleConfig): void {
    // Update life
    this.life++;
    
    // Update angle
    this.angle += this.angleVelocity;
    
    // Add slight orbital motion
    this.acceleration.x += Math.cos(this.angle) * 0.001;
    this.acceleration.y += Math.sin(this.angle) * 0.001;
    
    // Apply velocity and acceleration
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    
    // Damping
    this.velocity.x *= 0.999;
    this.velocity.y *= 0.999;
    
    // Update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    // Boundary wrapping
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
    
    // Reset acceleration
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    
    // Size pulsing
    const pulsePhase = (this.life * 0.01) % (Math.PI * 2);
    this.size = this.maxSize * (0.8 + 0.2 * Math.sin(pulsePhase));
  }

  applyForce(force: Vector2D): void {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
  }

  applyMouseInfluence(mouseX: number, mouseY: number, config: ParticleConfig): void {
    const dx = mouseX - this.position.x;
    const dy = mouseY - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < config.mouseInfluenceRadius && distance > 0) {
      const force = config.mouseInfluenceStrength / (distance * distance);
      const normalizedDx = dx / distance;
      const normalizedDy = dy / distance;
      
      // Attraction/repulsion based on distance
      const attractionForce = distance < config.mouseInfluenceRadius * 0.3 ? -force : force;
      
      this.applyForce({
        x: normalizedDx * attractionForce,
        y: normalizedDy * attractionForce,
      });
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    // Create glow effect
    ctx.shadowColor = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
    ctx.shadowBlur = this.size * 2;
    
    // Draw particle
    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  distanceTo(other: Particle): number {
    const dx = this.position.x - other.position.x;
    const dy = this.position.y - other.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  shouldReset(): boolean {
    return this.life >= this.maxLife;
  }

  reset(width: number, height: number, config: ParticleConfig): void {
    this.position.x = Math.random() * width;
    this.position.y = Math.random() * height;
    this.velocity.x = (Math.random() - 0.5) * config.speed;
    this.velocity.y = (Math.random() - 0.5) * config.speed;
    this.hue = this.getThemeHue(config.colorTheme);
    this.life = 0;
    this.maxLife = 1000 + Math.random() * 2000;
  }
}