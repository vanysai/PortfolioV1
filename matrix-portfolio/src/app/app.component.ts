
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  entered = false;

  private animationId = 0;
  private resizeHandler?: () => void;
  private reducedMotion = false;
  private mediaQuery?: MediaQueryList;

  enterSystem(): void {
    this.entered = true;
  }

  ngAfterViewInit(): void {
    this.initAmbientBackground();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    this.mediaQuery?.removeEventListener(
      'change',
      this.handleMotionPreference
    );
  }

  private handleMotionPreference = (): void => {
    this.reducedMotion = this.mediaQuery?.matches ?? false;
  };

  private initAmbientBackground(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    this.mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    this.handleMotionPreference();

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.00012 + 0.00004,
      phase: Math.random() * Math.PI * 2,
      cyan: Math.random() > 0.72
    }));

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    this.resizeHandler = resize;

    window.addEventListener('resize', resize, { passive: true });
    this.mediaQuery.addEventListener(
      'change',
      this.handleMotionPreference
    );

    resize();

    const draw = (time: number): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Linhas de sinal: detalhes discretos, sem competir com o conteúdo.
      ctx.lineWidth = 1;

      particles.forEach((particle) => {
        if (!this.reducedMotion) {
          particle.y += particle.speed;

          if (particle.y > 1.05) {
            particle.y = -0.05;
            particle.x = Math.random();
          }
        }

        const x = particle.x * width;
        const y = particle.y * height;
        const pulse = this.reducedMotion
          ? 0.55
          : 0.35 + (Math.sin(time * 0.0008 + particle.phase) + 1) * 0.2;

        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);

        ctx.fillStyle = particle.cyan
          ? `rgba(85, 230, 224, ${pulse})`
          : `rgba(255, 46, 136, ${pulse})`;

        ctx.fill();
      });

      // Linhas horizontais ocasionais, lembrando uma interface de terminal.
      ctx.strokeStyle = 'rgba(255, 46, 136, 0.08)';

      for (let i = 0; i < 4; i++) {
        const y = ((time * 0.008 + i * height / 4) % height);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (!this.reducedMotion) {
        this.animationId = requestAnimationFrame(draw);
      }
    };

    draw(0);
  }
}
