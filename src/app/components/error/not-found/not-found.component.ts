import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { DictionaryError } from '../../../types/shared';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container not-found">
      <h1 class="not-found__title">{{ error.title }}</h1>
      <p class="not-found__message">{{ error.message }}</p>
    </section>
  `,
  styles: `
    .not-found {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `,
})
export class NotFoundComponent {
  @Input({ required: true }) error: DictionaryError = {
    message: '',
    resolution: '',
    title: '',
  };
}
