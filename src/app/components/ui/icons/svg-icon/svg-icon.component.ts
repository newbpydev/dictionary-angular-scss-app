import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  inputs: ['icon', 'stroke', 'height', 'width'],
  template: `
    <div
      class="icon-wrapper"
      [ngStyle]="{ 'height.px': height, 'width.px': width }"
    >
      @switch (icon) {

      <!-- Search -->
      @case ('search') {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <path
          fill="none"
          [attr.stroke]="stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
        /></svg
      >}

      <!-- Play -->
      @case ('play') {<svg
        xmlns="http://www.w3.org/2000/svg"
        width="75"
        height="75"
        viewBox="0 0 75 75"
        class="play"
      >
        <g [attr.fill]="stroke" fill-rule="evenodd">
          <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
          <path d="M29 27v21l21-10.5z" />
        </g></svg
      >}

      <!-- Moon -->
      @case ('moon') {<svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <path
          fill="none"
          [attr.stroke]="stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
        /></svg
      >}

      <!-- Link -->
      @case ('link') {<svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
      >
        <path
          fill="none"
          [attr.stroke]="stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
        /></svg
      >}

      <!-- arrow -->
      @default {<svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="8"
        viewBox="0 0 14 8"
      >
        <path
          fill="none"
          [attr.stroke]="stroke"
          stroke-width="1.5"
          d="m1 1 6 6 6-6"
        /></svg
      >} }
    </div>
  `,
  styles: `
    .icon-wrapper {
      height: 20px;

      & svg {
        height: 100%;
        width: 100%;
        /* width: 20px; */
      }
    }

    .play {
      cursor: pointer;

      & circle {
        transition: all .3s ease-in-out;

        &+path {
          transition: all .3s ease-in-out;
        }

        &:hover {
          opacity: 1;

          &+path {
            fill: #fff;
          }
        }
      }
    }
  `,
})
export class SvgIconComponent {
  icon: 'moon' | 'search' | 'play' | 'link' | 'arrow-down' = 'search';
  stroke: string = '#A445ED';
  height: string = '20';
  width: string = '20';
}
