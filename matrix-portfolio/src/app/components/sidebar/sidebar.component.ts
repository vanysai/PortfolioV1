import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() navigate = new EventEmitter<string>();

  activeSection = 'home';

  go(section: string) {
    this.activeSection = section;
    this.navigate.emit(section);
  }

}
