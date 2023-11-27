import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { PlayButtonComponent } from '../ui/play-button/play-button.component';

@Component({
  selector: 'app-word-display',
  standalone: true,
  imports: [CommonModule, PlayButtonComponent],
  template: `
    <section class="container word-display__wrapper">
      <div class="word-display__group">
        <h1>{{ keyword }}</h1>
        <h2>{{ phonetic }}</h2>
      </div>

      <app-play-button />
    </section>
  `,
  styles: `
    @import './utilities/variables';
    @import './utilities/mixins';

    .word-display {
      &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3.2rem;
      }

      &__group {
        display: flex;
        flex-direction: column;
        gap: .8rem;

        & h1 {
          font-size: 3.2rem;
          font-weight: 700;

          @include media-query(tablet) {
            font-size: 6.4rem;
          }
        }

        & h2 {
          font-size: 1.8rem;
          color: $color-purple;

          @include media-query(tablet) {
            font-size: 2.4rem;
          }
        }
      }
    }
  `,
})
export class WordDisplayComponent {
  @Input({ required: true }) keyword = '';
  @Input({ required: true }) phonetic = '';
  // @Input({ required: true }) audioUrl = '';
}
