import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusSwipeMobileDirective } from './focus-swipe-mobile.directive';

@NgModule({
  declarations: [FocusSwipeMobileDirective],
  imports: [CommonModule],
  exports: [FocusSwipeMobileDirective],
})
export class FocusSwipeMobileModule {}
