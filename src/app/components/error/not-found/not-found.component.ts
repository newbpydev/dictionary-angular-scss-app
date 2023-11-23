import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { DictionaryError } from '../../../types/shared';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  inputs: ['error'],
  template: `
    <section class="container not-found">
      <h1 class="not-found__title">title</h1>
      <p class="not-found__message">message</p>
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
  // error: DictionaryError;
}
