import { Routes } from '@angular/router';
import { HomeSidebarContentComponent } from '../../../sidebar/home-sidebar-content/home-sidebar-content.component';
import { FiltersSidebarContentComponent } from '../../../sidebar/filters-sidebar-content/filters-sidebar-content.component';

export const SIDEBAR_ROUTES: Routes = [
  {
    outlet: 'sidebar',
    path: '',
    component: HomeSidebarContentComponent,
  },
  {
    outlet: 'sidebar',
    path: '**',
    component: FiltersSidebarContentComponent,
  },
];
