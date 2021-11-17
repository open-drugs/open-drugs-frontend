import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesPageComponent } from './species-page.component';
import { RouterModule } from '@angular/router';
import { SPECIES_ROUTES } from './species-page-routing';

@NgModule({
  declarations: [SpeciesPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SPECIES_ROUTES),
  ],
  exports: [],
})
export class SpeciesPageModule {}
