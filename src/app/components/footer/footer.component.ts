import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container bottom-container">footer works!</section>
  `,
  styles: ``,
})
export class FooterComponent {}
