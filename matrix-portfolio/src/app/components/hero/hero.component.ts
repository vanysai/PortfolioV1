import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html'
})
export class HeroComponent {

  @Output() onEnter = new EventEmitter<void>();

  enter() {
    this.onEnter.emit(); // 👈 ISSO FAZ FUNCIONAR
  }
}