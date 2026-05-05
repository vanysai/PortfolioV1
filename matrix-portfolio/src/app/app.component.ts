import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 ESSENCIAL
import { HeroComponent } from './components/hero/hero.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // 👈 AQUI
    HeroComponent,
    DashboardComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  entered = false;

  ngAfterViewInit() {
    setTimeout(() => {
    const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff9f";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    setInterval(draw, 33);
  }, 0);
  }
  enterSystem() {
  this.entered = true;
}
}