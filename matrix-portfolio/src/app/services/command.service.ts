import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  run(cmd: string): string {
    switch (cmd.toLowerCase()) {
      case 'help':
        return 'about | projects | skills | contact';
      case 'about':
        return 'Fullstack developer';
      case 'projects':
        return 'Portfolio Matrix';
      case 'skills':
        return 'Angular, Tailwind, Node';
      case 'contact':
        return 'email@email.com';
      default:
        return 'Command not found';
    }
  }
}