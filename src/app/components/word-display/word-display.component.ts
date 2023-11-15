import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-word-display',
  standalone: true,
  imports: [CommonModule],
  template: ` <section class="container">word-display works!</section> `,
  styles: ``,
})
export class WordDisplayComponent {}
