import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html'
})
export class TerminalComponent implements OnInit {

  input = '';
  history: string[] = [];

  @Output() navigate = new EventEmitter<string>();

  @ViewChild('terminalContainer') terminal?: ElementRef;

  // 🔊 SOM
  typingAudio = new Audio('assets/typing.mp3');
  soundEnabled = false;

  ngOnInit() {
    this.bootSequence();
  }

  // 🚀 BOOT INICIAL
  async bootSequence() {
    await this.type("Initializing system...");
    await this.delay(200);
    await this.type("Access granted.");
    await this.delay(200);
    await this.type("Jaiza.exe ready.");
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 💻 COMANDOS
  async handleCommand() {
    const cmd = this.input.toLowerCase().trim();

    this.history.push(`> ${cmd}`);

    // 🔊 libera som após primeira interação
    if (!this.soundEnabled) {
      this.typingAudio.play().then(() => {
        this.typingAudio.pause();
        this.typingAudio.currentTime = 0;
        this.soundEnabled = true;
      }).catch(() => {});
    }

    switch (cmd) {

      case 'projects':
      case 'skills':
      case 'contact':
      case 'home':
        this.navigate.emit(cmd);
        await this.type(`Opening ${cmd}...`);
        break;

      case 'help':
        await this.type("commands: home, projects, skills, contact, clear, about, whoami, hack");
        break;

      case 'about':
        await this.type(`Jaíza Freire - Developer
Frontend | Angular | UI/UX`);
        break;

      case 'whoami':
        await this.type("You are inside the Matrix.");
        break;

      case 'hack':
        await this.type("Accessing secure node...");
        await this.delay(300);
        await this.type("Bypassing firewall...");
        await this.delay(300);
        await this.type("Decrypting data...");
        await this.delay(300);
        await this.type("Access granted 🔓");
        break;

      case 'clear':
        this.history = [];
        break;

      default:
        await this.type("command not found");
        break;
    }

    this.input = '';
    this.scrollToBottom();
  }

  // ✨ EFEITO DIGITAÇÃO + SOM
  async type(text: string) {
    let output = '';
    this.history.push('');

    for (let char of text) {
      output += char;
      this.history[this.history.length - 1] = output;

      if (this.soundEnabled) {
        this.typingAudio.currentTime = 0;
        this.typingAudio.play().catch(() => {});
      }

      this.scrollToBottom();
      await new Promise(r => setTimeout(r, 15));
    }
  }

  // 🔽 SCROLL AUTOMÁTICO
  scrollToBottom() {
    setTimeout(() => {
      if (this.terminal?.nativeElement) {
        this.terminal.nativeElement.scrollTop =
          this.terminal.nativeElement.scrollHeight;
      }
    }, 0);
  }
}