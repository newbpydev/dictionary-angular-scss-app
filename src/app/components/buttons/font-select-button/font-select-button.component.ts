import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ClickOutsideDirective } from '../../../click-outside.directive';
import { SharedService } from '../../../shared.service';
import { StorageService } from '../../../storage.service';
import { FontType } from '../../../types/shared';
import { SvgIconComponent } from '../../ui/icons/svg-icon/svg-icon.component';

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
        <span>{{ selectedFont | titlecase }}</span>
        <app-svg-icon icon="arrow-down" width="12" height="6" />
      </button>

      @if (isSelecting) {
      <ul class="font-options" [ngClass]="isDark ? 'dark' : ''">
        <li (click)="handleFontChange('sans serif')">Sans Serif</li>
        <li (click)="handleFontChange('serif')">Serif</li>
        <li (click)="handleFontChange('mono')">Mono</li>
      </ul>
      }
    </div>
  `,
  styles: `
    @import './utilities/variables';
    @import './utilities/mixins';

    .font {
      &-selection-wrapper {
        position: relative;
        font-weight: 700;
        font-size: 1.4rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        @include media-query(tablet) {
          font-size: 1.8rem;
        }

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

        &.dark {
          background: $color-gray;
          box-shadow: 0px 5px 30px 0px rgba(255, 255, 255, .1);
        }

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
  isDark: boolean = false;
  selectedFont: FontType = 'sans serif';

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService
  ) {
    this.sharedService.isDark$.subscribe((isDark) => (this.isDark = isDark));
    this.sharedService.selectedFont$.subscribe(
      (selectedFont) => (this.selectedFont = selectedFont)
    );
  }

  toggleSelectMenu() {
    this.isSelecting = !this.isSelecting;
  }

  handleOutsideClick() {
    this.isSelecting = false;
  }

  handleFontChange(font: FontType) {
    this.selectedFont = font;
    this.sharedService.setSelectedFont(font);
    this.storageService.setItem('selectedFont', font);
  }
}
