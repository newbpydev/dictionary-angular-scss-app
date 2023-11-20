import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Meaning } from '../../../types/shared';

@Component({
  selector: 'app-definition-card',
  standalone: true,
  imports: [CommonModule],
  inputs: ['meaning'],
  template: `
    <article class="definition-card">
      <h3 class="definition-card__title">
        {{ meaning.partOfSpeech }}
      </h3>

      <h4 class="definition-card__subtitle">Meaning</h4>

      <ul class="definition-card__meaning-list">
        @for (definition of meaning.definitions; track $index) {
        <li class="definition-card__meaning-item">
          {{ definition.definition }}
        </li>
        }
      </ul>

      @if (meaning.antonyms.length) {
      <div class="definition-card__other-words">
        <h4 class="definition-card__subtitle">Antonyms</h4>
        <p class="definition-card__other-word">
          @for (word of meaning.antonyms; track $index) {
          <span>{{ word }}</span>
          }
        </p>
      </div>
      } @if (meaning.synonyms.length) {
      <div class="definition-card__other-words">
        <h4 class="definition-card__subtitle">Synonyms</h4>
        <p class="definition-card__other-word">
          @for (word of meaning.synonyms; track $index) {
          <span>{{ word }}</span>
          }
        </p>
      </div>

      }
    </article>
  `,
  styles: ``,
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
