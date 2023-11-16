import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { FontSelectButtonComponent } from '../../buttons/font-select-button/font-select-button.component';
import { LogoComponent } from '../../ui/icons/logo/logo.component';
import { SvgIconComponent } from '../../ui/icons/svg-icon/svg-icon.component';
import { ThemeSwitchComponent } from '../../ui/theme-switch/theme-switch.component';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  template: `
    <header class="container top-container">
      <app-logo />

      <div class="theme-font-group">
        <div class="select-font-group">
          <app-font-select-button />
        </div>

        <app-theme-switch />
      </div>
    </header>
  `,
  styles: /*scss*/ `
    header {
      display:flex;
      justify-content: space-between;
      align-items: center;
    }

    .theme-font-group {
      display: flex;
      gap: 3.3rem;
    }

    .select-font-group {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: -16px;
        top: 50%;
        width: 1px;
        height: 32px;
        background-color: #e9e9e9;
        transform: translateY(-50%)
      }
    }
  `,
  imports: [
    CommonModule,
    ThemeSwitchComponent,
    LogoComponent,
    SvgIconComponent,
    FontSelectButtonComponent,
  ],
})
export class MainNavComponent {}
