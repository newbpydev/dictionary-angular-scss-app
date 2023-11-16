import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="38"
        viewBox="0 0 34 38"
      >
        <g
          fill="none"
          fill-rule="evenodd"
          stroke="#838383"
          stroke-linecap="round"
          stroke-width="1.5"
        >
          <path
            d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"
          />
          <path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8" />
          <path d="M11 9h12" />
        </g>
      </svg>
    </div>
  `,
  styles: `
    @import './utilities/mixins';

    .logo-wrapper {
      height: 3.2rem;

      @include media-query(tablet) {
        height: 3.65rem;
      }

      & svg {
        height: 32px;
        width: auto;

        @include media-query(tablet) {
          height: 36.5px;
        }
      }
    }
  `,
})
export class LogoComponent {}
