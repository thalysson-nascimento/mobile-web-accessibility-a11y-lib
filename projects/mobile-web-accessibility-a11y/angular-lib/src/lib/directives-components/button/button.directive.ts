import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.changeBehavior();
  }

  changeBehavior() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
    this.elementRef.nativeElement.style.border = 'none';
    this.elementRef.nativeElement.style.borderRadius = '0.2rem';
    this.elementRef.nativeElement.style.color = '#fff';
    this.elementRef.nativeElement.style.padding = '1rem';
  }
}
