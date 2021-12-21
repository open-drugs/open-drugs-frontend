import { ExtraOptions, Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search-page.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'species',
    loadChildren: () => import('./pages/species/species-page.module').then((m) => m.SpeciesPageModule),
  },
  {
    path: 'summary',
    loadChildren: () => import('./pages/summary/summary-page.module').then((m) => m.SummaryPageModule),
  },
  {
    path: '404',
    loadChildren: () => import('./pages/404/error-page.module').then((m) => m.ErrorPageModule),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
  {
    path: 'index',
    redirectTo: '',
  },
];

export const ROUTER_OPTIONS: ExtraOptions = {
  anchorScrolling: 'enabled',
};
