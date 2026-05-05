import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TerminalComponent } from '../../components/terminal/terminal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TerminalComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  section: string = 'home';

  setSection(value: string) {
    this.section = value;
  }
selectedProject: any = null;

projects = [
  {
    id: 'matrix',
    title: 'Portfolio Matrix',
    description: 'Portfólio interativo com Angular + Tailwind',
    tech: 'Angular, Tailwind',
    link: 'https://seu-link.com'
  },
  {
    id: 'api',
    title: 'API Clínica',
    description: 'Backend com Node.js',
    tech: 'Node, Express',
    link: '#'
  }
];

openProject(project: any) {
  this.selectedProject = project;
}

closeProject() {
  this.selectedProject = null;
}
}