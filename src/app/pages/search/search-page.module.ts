import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { RouterModule } from '@angular/router';
import { SEARCH_ROUTES } from './search-page-routing';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SEARCH_ROUTES),
  ],
  exports: [],
})
export class SearchPageModule {}
