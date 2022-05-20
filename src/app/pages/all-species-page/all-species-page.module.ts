import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSpeciesPageComponent } from './all-species-page.component';
import { SpeciesPageComponent } from './species/species-page.component';
import { RouterModule } from '@angular/router';
import { SPECIES_ROUTES } from './all-species-page-routing';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { OrganismTableModule } from '../../components/shared/organism-table/organism-table.module';
import { FilterPanelModule } from '../../components/shared/filter-panel/filter-panel.module';
import { MaterialModule } from '../../modules/vendors/material.module';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [AllSpeciesPageComponent, SpeciesPageComponent],
  imports: [
    CommonModule,
    PlotlyModule,
    RouterModule.forChild(SPECIES_ROUTES),
    OrganismTableModule,
    FilterPanelModule,
    MaterialModule,
  ],
  exports: [],
})
export class AllSpeciesPageModule {
}
