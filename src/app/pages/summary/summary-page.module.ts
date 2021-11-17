import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPageComponent } from './summary-page.component';
import { RouterModule } from '@angular/router';
import { SUMMARY_ROUTES } from './summary-page-routing';

@NgModule({
  declarations: [SummaryPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SUMMARY_ROUTES),
  ],
  exports: [],
})
export class SummaryPageModule {}
