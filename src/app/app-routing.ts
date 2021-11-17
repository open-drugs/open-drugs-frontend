import { ExtraOptions, Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'drug/:id',
    loadChildren: () => import('./pages/drug/drug-page.module').then((m) => m.DrugPageModule),
  },
  {
    path: 'species/:id',
    loadChildren: () => import('./pages/species/species-page.module').then((m) => m.SpeciesPageModule),
  },
  {
    path: '404',
    loadChildren: () => import('./pages/404/error-page.module').then((m) => m.ErrorPageModule),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

export const ROUTER_OPTIONS: ExtraOptions = {
  anchorScrolling: 'enabled',
};
