import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
  outputs: ['clickOutside'],
})
export class ClickOutsideDirective {
  clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) this.clickOutside.emit();
  }
}
