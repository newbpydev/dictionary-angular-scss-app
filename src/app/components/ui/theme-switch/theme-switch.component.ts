import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [CommonModule],
  // inputs: ['isChecked'],
  // outputs: ['isCheckedChange'],
  template: `
    <label class="switch">
      <input type="checkbox" (change)="onCheckChange($event)" />
      <span class="slider round"></span>
    </label>
  `,
  styles: `
    @import './utilities/variables';

    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #979797;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 14px;
      width: 14px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: $color-purple;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px $color-purple;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `,
})
export class ThemeSwitchComponent {
  // isChecked: boolean | null = null;
  // isCheckedChange = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService) {}

  onCheckChange(event: Event): void {
    // this.isChecked = (event.target as HTMLInputElement).checked;
    // this.isCheckedChange.emit(this.isChecked);
    this.sharedService.setIsDark((event.target as HTMLInputElement).checked);
  }
}
