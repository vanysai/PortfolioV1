import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.startBoot();
  }

  async startBoot() {
    await this.write("Initializing system...");
    await this.write("Access granted.");
    await this.write("Jaiza.exe ready.");
  }

  async write(text: string) {
    let output = '';
    this.history.push('');

    for (let char of text) {
      output += char;
      this.history[this.history.length - 1] = output;
      await new Promise(r => setTimeout(r, 20));
    }
  }

  handleCommand() {
    const cmd = this.input.toLowerCase().trim();

    this.history.push(`> ${cmd}`);

    if (cmd === 'clear') {
      this.history = [];
    } else if (['home','projects','skills','contact'].includes(cmd)) {
      this.navigate.emit(cmd);
      this.write(`Opening ${cmd}...`);
    } else if (cmd === 'help') {
      this.write("commands: home, projects, skills, contact, clear");
    } else {
      this.write("command not found");
    }

    this.input = '';
  }
}