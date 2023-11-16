import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SvgIconComponent } from '../../ui/icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-font-select-button',
  standalone: true,
  template: `
    <div class="font-selection-wrapper">
      <button class="font-btn" (click)="toggleSelectMenu()">
        <span>Sans Serif</span>
        <app-svg-icon icon="arrow-down" width="12" height="6" />
      </button>

      @if (isSelecting) {
      <ul class="font-options">
        <li>Sans Serif</li>
        <li>Serif</li>
        <li>Mono</li>
      </ul>
      }
    </div>
  `,
  styles: `
    @import './utilities/variables';

    .font {
      &-selection-wrapper {
        position: relative;
        font-weight: 700;
        display: flex;
        align-items: center;

      }

      &-btn {
        display: flex;
        gap: 1.2rem;
        cursor: pointer;
      }

      &-options {
        position: absolute;
        top: 3.8rem;
        right: 0rem;
        padding: 2.4rem 7rem 2.4rem 2.4rem;
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        border-radius: 1.6rem;
        box-shadow: 0px 5px 30px 0px rgba(0, 0, 0, .1);
        z-index: 5;
        background-color: #fff;

        & li {
          width: 9rem;
          cursor: pointer;
          transition: color .3s;

          &:hover {
            color: $color-purple;
          }
        }
      }
    }

  `,
  imports: [CommonModule, SvgIconComponent],
})
export class FontSelectButtonComponent {
  isSelecting: boolean = true;

  toggleSelectMenu() {
    this.isSelecting = !this.isSelecting;
  }
}
