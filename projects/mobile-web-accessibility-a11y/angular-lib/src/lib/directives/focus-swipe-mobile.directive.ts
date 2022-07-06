import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
} from '@angular/core';
import { TouchePosition } from '../interfaces/focus-swipe-mobile.interface';

@Directive({
  selector: '[appFocusSwipeMobile]',
})
export class FocusSwipeMobileDirective implements AfterViewInit {
  sizeSwipe: number = 60;
  defaultTouch: TouchePosition = { deltaX: 0, deltaY: 0, time: 0 };
  timerSwipe: number = 500;
  indexPosition = 0;

  constructor(
    @Inject(DOCUMENT) private fisrtFocusAbleElement: HTMLElement,
    @Inject(DOCUMENT) private lastFocusAbleElement: HTMLElement,
    @Inject(DOCUMENT) private nextFocusElement: HTMLElement,
    private elementRef: ElementRef<any>
  ) {}

  ngAfterViewInit(): void {
    this.focusInitializationElements();
  }

  focusInitializationElements() {
    this.fisrtFocusAbleElement = this.getFocusAllEnabledElements()[0];
    this.lastFocusAbleElement =
      this.getFocusAllEnabledElements()[
        this.getFocusAllEnabledElements().length - 1
      ];
    this.fisrtFocusAbleElement.focus();
  }

  getFocusAllEnabledElements() {
    const focusAllEnableableElements = this.elementRef.nativeElement
      .querySelectorAll(`
        [tabindex]:not([tabindex="-1"]),
        a[href]:not([disabled]),
        button:not([disabled]),
        textarea:not([disabled]),
        input:not([disabled]),
        select:not([disabled])`) as Array<HTMLElement>;
    return focusAllEnableableElements;
  }

  // touchstart and touchend
  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  managerSwipe(event: TouchEvent) {
    const touch = event.touches[0] || event.changedTouches[0];

    if (event.type !== 'touchstart' && event.type !== 'touchend') {
      return;
    }

    if (event.type === 'touchstart') {
      this.defaultTouch.deltaX = touch.pageX;
      this.defaultTouch.deltaY = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      const deltaX = touch.pageX - this.defaultTouch.deltaX;
      const deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < this.timerSwipe) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > this.sizeSwipe) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            return this.swipeRight(event);
          } else if (deltaX < 0) {
            return this.swipeLeft(event);
          }
        }
      }
    }
  }

  swipeRight(event: any) {
    try {
      this.indexPosition++;
      const totalPosition = this.getFocusAllEnabledElements().length - 1;

      if (this.indexPosition > totalPosition) {
        this.indexPosition = 0;
      }

      this.nextFocusElement =
        this.getFocusAllEnabledElements()[this.indexPosition];
      this.nextFocusElement.focus();
      event.preventDefault();
    } catch (error) {
      throw new Error(`Error swipe right: ${error}`);
    }
  }

  swipeLeft(event: any) {
    try {
      const totalPosition = this.getFocusAllEnabledElements().length - 1;
      this.indexPosition--;

      if (this.fisrtFocusAbleElement === document.activeElement) {
        this.indexPosition = totalPosition;
        this.lastFocusAbleElement.focus();
        event.preventDefault();
      }

      this.nextFocusElement =
        this.getFocusAllEnabledElements()[this.indexPosition];
      this.nextFocusElement.focus();
      event.preventDefault();
    } catch (error) {
      throw new Error(`Error swipe left: ${error}`);
    }
  }
}
