import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent {

  @Output() navigate = new EventEmitter<string>(); // 👈 ESSENCIAL

  go(section: string) {
    this.navigate.emit(section);
  }
  
}
