import {
  Component,
  AfterViewInit,
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
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  entered = false;

  enterSystem() {
    this.entered = true;
  }

  ngAfterViewInit() {
    this.initMatrix();
  }

  initMatrix() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("Erro no canvas");
      return;
    }

    const letters = "アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;

    let columns: number;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {

      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff88";
      ctx.font = `${fontSize}px monospace`;
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur = 3;

      for (let i = 0; i < drops.length; i++) {

        const text = letters[Math.floor(Math.random() * letters.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // reset aleatório
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] += 0.6;
        }

        // velocidade variável
        drops[i] += Math.random() * 1.5 + 0.5;
      }

      requestAnimationFrame(draw);
    };

    draw();
  }
}