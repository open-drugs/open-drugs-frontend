import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesPageComponent } from './species-page.component';
import { RouterModule } from '@angular/router';
import { SPECIES_ROUTES } from './species-page-routing';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { FeedTableModule } from '../../components/shared/table/feed-table.module';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [SpeciesPageComponent],
  imports: [
    CommonModule,
    PlotlyModule,
    RouterModule.forChild(SPECIES_ROUTES),
    FeedTableModule,
  ],
  exports: [],
})
export class SpeciesPageModule {
}
