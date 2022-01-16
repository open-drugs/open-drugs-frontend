import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMoreButtonComponent } from './show-more-button.component';

@NgModule({
  declarations: [ShowMoreButtonComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ShowMoreButtonComponent,
  ],
})
export class ShowMoreButtonModule {}
