import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[appWindowSize]',
  standalone: true,
  outputs: ['sizeChange'],
})
export class WindowSizeDirective implements AfterViewInit {
  sizeChange = new EventEmitter<{ width: number; height: number }>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.emitSize();
  }

  private emitSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.sizeChange.emit({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }

  ngAfterViewInit(): void {
    // Emit the initial size
    this.emitSize();
  }
}
