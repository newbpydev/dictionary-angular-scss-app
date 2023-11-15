import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  inputs: ['icon'],
  template: ` <p>svg-icon works!</p> `,
  styles: ``,
})
export class SvgIconComponent {
  icon: 'moon' | 'search' | 'play' | 'link' | 'arrow-down' = 'search';
}
