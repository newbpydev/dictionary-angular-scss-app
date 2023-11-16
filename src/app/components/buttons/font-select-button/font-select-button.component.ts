import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ClickOutsideDirective } from '../../../click-outside.directive';
import { SvgIconComponent } from '../../ui/icons/svg-icon/svg-icon.component';

type FontType = 'sans-serif' | 'serif' | 'mono';

@Component({
  selector: 'app-font-select-button',
  standalone: true,
  template: `
    <div class="font-selection-wrapper">
      <button
        class="font-btn"
        (click)="toggleSelectMenu()"
        appClickOutside
        (clickOutside)="isSelecting && handleOutsideClick()"
      >
        <span>Sans Serif</span>
        <app-svg-icon icon="arrow-down" width="12" height="6" />
      </button>

      @if (isSelecting) {
      <ul class="font-options">
        <li (click)="handleFontChange('sans-serif')">Sans Serif</li>
        <li (click)="handleFontChange('serif')">Serif</li>
        <li (click)="handleFontChange('mono')">Mono</li>
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
  imports: [CommonModule, SvgIconComponent, ClickOutsideDirective],
})
export class FontSelectButtonComponent {
  isSelecting: boolean = false;
  selectedFont: FontType = 'sans-serif';

  toggleSelectMenu() {
    this.isSelecting = !this.isSelecting;
  }

  handleOutsideClick() {
    this.isSelecting = false;
  }

  handleFontChange(font: FontType) {
    this.selectedFont = font;
    console.log(this.selectedFont);
  }
}
