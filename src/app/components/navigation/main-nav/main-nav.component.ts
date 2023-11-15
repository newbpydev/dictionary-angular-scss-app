import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { ThemeSwitchComponent } from '../../ui/theme-switch/theme-switch.component';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, ThemeSwitchComponent],
  // inputs: ['isDark'],
  // outputs: ['isCheckedChange'],
  template: `
    <header>
      <h1>Logo</h1>

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
