import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appManagerFocusScreenMobile]',
})
export class ManagerFocusScreenMobileDirective {
  fisrtAbleElementScreenMobile!: HTMLElement;
  lastAbleElementScreenMobile!: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.focusManagerInitializationFirstElement();
    this.managerLastElementDOM();
    this.managerSetAtributeLastElement();
  }

  private getAllElementDOM(): string {
    const elementsDOM = [
      '[tabindex]:not([tabindex="-1"])',
      'a[href]:not([disabled])',
      'p:not([disabled])',
      'h1:not([disabled])',
      'h3:not([disabled])',
      'h4:not([disabled])',
      'h5:not([disabled])',
      'h6:not([disabled])',
      'span:not([disabled])',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
    ];

    return elementsDOM.toString();
  }

  private getFocusAllEnabledElements() {
    const focusAllEnableableElements =
      this.elementRef.nativeElement.querySelectorAll(
        this.getAllElementDOM()
      ) as Array<HTMLElement>;
    return focusAllEnableableElements;
  }

  private focusManagerInitializationFirstElement() {
    this.fisrtAbleElementScreenMobile = this.getFocusAllEnabledElements()[0];
    this.fisrtAbleElementScreenMobile.focus();
  }

  private managerLastElementDOM() {
    this.lastAbleElementScreenMobile =
      this.getFocusAllEnabledElements()[
        this.getFocusAllEnabledElements().length - 1
      ];
  }

  // TODO: esta funcionalidade será implmentada na diretiva para lista ordenadas
  // após está implementação essa funcionalidade deverá ser removida
  private createElementLabelbyid() {
    const createElementLastA11y = this.renderer.createElement('span');
    this.renderer.setAttribute(
      createElementLastA11y,
      'aria-label',
      '1 de 5 elementos'
    );

    this.renderer.setAttribute(
      createElementLastA11y,
      'id',
      'aria-labelledby-last-element'
    );

    this.renderer.insertBefore(
      this.elementRef.nativeElement,
      createElementLastA11y,
      this.lastAbleElementScreenMobile
    );
  }

  private managerSetAtributeLastElement() {
    this.renderer.setAttribute(
      this.lastAbleElementScreenMobile,
      'aria-description',
      'ultimo elemento'
    );
  }
}
