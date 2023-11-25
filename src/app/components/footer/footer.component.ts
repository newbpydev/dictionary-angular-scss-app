import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { SvgIconComponent } from '../ui/icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `
    <footer class="container bottom-container footer">
      <p class="footer-source__title">Source</p>

      <a
        href="https://en.wikipedia.org/wiki/Keyboard"
        class="footer-source__link"
      >
        <span> {{ sourceLink }} </span>

        <app-svg-icon icon="link" height="12" width="12" />
      </a>
    </footer>
  `,
  styles: `
    @import './utilities/mixins';
    @import './utilities/variables';


    .footer {
      display: flex;
      gap: .8rem;
      flex-direction: column;
      font-size: 1.4rem;
      text-decoration-line: underline;
      padding-top: 2.4rem;
      border-top: 1px solid $color-lightest-gray;

      @include media-query(tablet) {
        flex-direction: row;
        gap: 2rem;
        margin-top: 1.9rem;
      }

      &-source__title {
        color: $color-medium-gray;
      }

      &-source__link {
        display: flex;
        gap: .8rem;
      }
    }
  `,
})
export class FooterComponent {
  @Input({ required: true }) sourceLink = '';
}
