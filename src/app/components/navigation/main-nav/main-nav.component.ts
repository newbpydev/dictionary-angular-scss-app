import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { LogoComponent } from '../../ui/icons/logo/logo.component';
import { ThemeSwitchComponent } from '../../ui/theme-switch/theme-switch.component';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, ThemeSwitchComponent, LogoComponent],
  // inputs: ['isDark'],
  // outputs: ['isCheckedChange'],
  template: `
    <header class="container top-container">
      <app-logo />

      <div class="theme-font-group">
        <select name="font" id="font">
          <option value="sans-serif">Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="mono">Mono</option>
        </select>

        <app-theme-switch />
      </div>
    </header>
  `,
  styles: /*css*/ `
    header {
      display:flex;
      justify-content: space-between;
      align-items: center;

    }

    .theme-font-group {
      display: flex;
    }
  `,
})
export class MainNavComponent {
  isDark: boolean | null = null;
  isCheckedChange = new EventEmitter<boolean>();

  handleChange(event: boolean) {
    this.isCheckedChange.emit(event);
  }
}
