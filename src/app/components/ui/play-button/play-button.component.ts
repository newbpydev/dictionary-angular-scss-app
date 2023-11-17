import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SvgIconComponent } from '../icons/svg-icon/svg-icon.component';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `
    <app-svg-icon
      icon="play"
      height="48"
      width="48"
      class="play-btn"
      id="play-btn"
    />
  `,
  styles: `
    .play-btn + div {
      height: 7rem;
    }
  `,
})
export class PlayButtonComponent {}
