import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

interface Project {
  id: string;
  code: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  link?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  section = 'home';

  setSection(value: string): void {
    this.section = value;
  }

  projects: Project[] = [
    {
      id: 'night-protocol',
      code: 'PROJECT_001',
      title: 'NIGHT//PROTOCOL',
      description: 'Uma experiência digital com identidade cyberpunk, interface autoral e atmosfera futurista.',
      technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
      status: 'IN DEVELOPMENT'
    },
    {
      id: 'clinical-api',
      code: 'PROJECT_002',
      title: 'API CLÍNICA',
      description: 'Projeto de backend para explorar APIs, organização de rotas e lógica de negócio.',
      technologies: ['Node.js', 'Express'],
      status: 'IN DEVELOPMENT'
    }
  ];

  connections = [
    {
      label: 'LINKEDIN',
      detail: 'Perfil profissional e networking',
      url: 'https://linkedin.com/in/jaiza-freire-vn',
      code: 'CONNECTION_01'
    },
    {
      label: 'GITHUB',
      detail: 'Código, repositórios e experimentos',
      url: 'https://github.com/vanysai',
      code: 'CONNECTION_02'
    },
    {
      label: 'EMAIL',
      detail: 'Contato direto',
      url: 'mailto:jaizamsf@gmail.com',
      code: 'CONNECTION_03'
    }
  ];

  skills = [
    {
      code: '01',
      title: 'FRONTEND',
      technologies: 'Angular · TypeScript · HTML · CSS',
      color: 'pink'
    },
    {
      code: '02',
      title: 'BACKEND',
      technologies: 'Node.js · Express · APIs',
      color: 'cyan'
    },
    {
      code: '03',
      title: 'INFRASTRUCTURE',
      technologies: 'Redes · Protocolos · Segurança digital',
      color: 'yellow'
    },
    {
      code: '04',
      title: 'INTERFACE DESIGN',
      technologies: 'UI/UX · Responsividade · Acessibilidade',
      color: 'pink'
    }
  ];
}