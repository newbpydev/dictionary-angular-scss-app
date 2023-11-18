import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { WindowSizeDirective } from '../../../window-size.directive';
import { SvgIconComponent } from '../icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, WindowSizeDirective],
  template: `
    <app-svg-icon
      icon="play"
      [height]="height.toString()"
      [width]="width.toString()"
      class="play-btn"
      id="play-btn"
      appWindowSize
      (sizeChange)="onWindowSizeChange($event)"
    />
  `,
  styles: ``,
})
export class PlayButtonComponent {
  height = 48;
  width = 48;

  onWindowSizeChange(size: { height: number; width: number }) {
    if (768 < size.width) {
      this.width = 75;
      this.height = 75;
    } else {
      this.width = 48;
      this.height = 48;
    }
  }
}
