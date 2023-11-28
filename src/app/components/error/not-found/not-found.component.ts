import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { DictionaryError } from '../../../types/shared';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container not-found">
      <div class="not-found__icon">☹️</div>
      <h1 class="not-found__title">
        {{ error ? error.title : '404 Page Not Found' }}
      </h1>
      <p class="not-found__message">
        {{
          error
            ? error.message + ' ' + error.resolution
            : 'The page you’re looking for can’t be found'
        }}
      </p>
    </section>
  `,
  styles: `
    @import './utilities/variables';
    @import './utilities/mixins';

    .not-found {
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      text-align: center;
      margin-top: 9.2rem;

      @include media-query(tablet) {
        margin-top: 13.2rem;
      }

      &__icon {
        font-size: 4.8rem;
        margin-bottom: 2.4rem;

        @include media-query(tablet) {
          font-size: 6.4rem;
          margin-bottom: 4.4rem;
        }
      }

      &__title {
        font-weight: 700;
        font-size: 1.6rem;
        margin-bottom: 1.8rem;

        @include media-query(tablet) {
          font-size: 2rem;
          margin-bottom: 2.4rem;
        }
      }

      &__message {
        font-size: 1.5rem;
        color: $color-medium-gray;

        @include media-query(tablet) {
          font-size: 1.8rem;
        }
      }
    }
  `,
})
export class NotFoundComponent {
  @Input() error: DictionaryError = {
    message: '',
    resolution: '',
    title: '',
  };
}
