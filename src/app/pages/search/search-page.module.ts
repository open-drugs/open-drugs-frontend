import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { RouterModule } from '@angular/router';
import { SEARCH_ROUTES } from './search-page-routing';
import { SearchFieldModule } from '../../components/search-field/search-field.module';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SEARCH_ROUTES),
    SearchFieldModule,
  ],
  exports: [],
})
export class SearchPageModule {}
