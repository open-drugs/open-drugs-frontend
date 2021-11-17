import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugPageComponent } from './drug-page.component';
import { RouterModule } from '@angular/router';
import { DRUG_ROUTES } from './drug-page-routing';

@NgModule({
  declarations: [DrugPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DRUG_ROUTES),
  ],
  exports: [],
})
export class DrugPageModule {}
