import { Routes } from '@angular/router';
import { AllSpeciesPageComponent } from './all-species-page.component';
import { SpeciesPageComponent } from './species/species-page.component';

export const SPECIES_ROUTES: Routes = [
  { path: '', component: AllSpeciesPageComponent },
  { path: ':id', component: SpeciesPageComponent }
];
