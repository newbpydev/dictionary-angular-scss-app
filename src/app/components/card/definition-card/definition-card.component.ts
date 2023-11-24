import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Meaning } from '../../../types/shared';

@Component({
  selector: 'app-definition-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  inputs: ['meaning'],
  template: `
    <article class="definition-card">
      <h3 class="definition-card__title">
        {{ meaning.partOfSpeech }}
      </h3>

      <h4 class="definition-card__meaning-title">Meaning</h4>

      <ul class="definition-card__meaning-list">
        @for (definition of meaning.definitions; track $index) {
        <li class="definition-card__meaning-item">
          <div>
            {{ definition.definition }}

            @if (definition.example) {
            <p class="definition-card__example">
              {{ definition.example | json }}
            </p>
            }
          </div>
        </li>
        }
      </ul>

      @if (meaning.antonyms.length) {
      <div class="definition-card__other-words">
        <h4 class="definition-card__other-word-title">Antonyms</h4>
        <p class="definition-card__other-word">
          @for (word of meaning.antonyms; track $index) {
          <a [routerLink]="['/search', word]">{{ word }}</a> {{ ' ' }}
          }
        </p>
      </div>
      } @if (meaning.synonyms.length) {
      <div class="definition-card__other-words">
        <h4 class="definition-card__other-word-title">Synonyms</h4>
        <p class="definition-card__other-word">
          @for (word of meaning.synonyms; track $index) {
          <a [routerLink]="['/search', word]">{{ word }}</a> {{ ' ' }}
          }
        </p>
      </div>

      }
    </article>
  `,
  styles: `
  @import './utilities/variables';
  @import './utilities/mixins';

  .definition-card {

    &__title {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      font-size: 1.8rem;
      font-style: italic;
      font-weight: 700;
      margin-bottom: 3.2rem;

      @include media-query(tablet) {
        font-size: 2.4rem;
        gap: 2rem;
        margin-bottom: 4rem;
      }

      &:after {
        content: '';
        height: 1px;
        width: 100%;
        background-color: $color-lightest-gray;
      }
    }

    &__meaning-title {
      font-size: 1.6rem;
      color: $color-medium-gray;
      margin-bottom: 1.7rem;

      @include media-query(tablet) {
        font-size: 2rem;
        margin-bottom: 2.5rem;
      }
    }
    &__meaning-list {
      margin-bottom: 3.2rem;
      display: flex;
      flex-direction: column;
      gap: 1.3rem;

      @include media-query(tablet) {
        margin-left: 2.2rem;
        margin-bottom: 4rem;
      }
    }
    &__meaning-item {
      position: relative;
      display: flex;

      @include media-query(tablet) {
        font-size: 1.8rem;
      }

      &::before {
        content: '\u2022';
        color: $color-purple;
        font-size: 1.2rem;
        margin-right:2rem;
      }

      & .definition-card__example {
        margin-top: 1.3rem;
        color: $color-medium-gray;
      }

    }

    &__other-words {
      display: flex;
      gap: 2.4rem;
      font-size: 1.6rem;
      margin-bottom: 3.2rem;

      @include media-query(tablet) {
        font-size: 2rem;
        gap: 2.2rem;
        margin-bottom: 4rem;
      }
    }
    &__other-word a {
      font-weight: 700;
      color: $color-purple;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
    &__other-word-title {
      /* font-size: 1.6rem; */
      color: $color-medium-gray;
    }
  }
  `,
})
export class DefinitionCardComponent {
  meaning: Meaning = {
    partOfSpeech: 'noun',
    definitions: [
      {
        definition:
          '(etc.) A set of keys used to operate a typewriter, computer etc.',
        synonyms: [],
        antonyms: [],
      },
      {
        definition:
          'A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.',
        synonyms: [],
        antonyms: [],
      },
      {
        definition:
          'A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.',
        synonyms: [],
        antonyms: [],
      },
    ],
    synonyms: ['electronic keyboard'],
    antonyms: [],
  };
}
