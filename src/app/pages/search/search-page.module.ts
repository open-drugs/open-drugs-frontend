import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { RouterModule } from '@angular/router';
import { SEARCH_ROUTES } from './search-page-routing';
import { SearchFieldModule } from '../../components/shared/search-field/search-field.module';
import {FilterPanelModule} from '../../components/shared/filter-panel/filter-panel.module';
import {AppSliderModule} from '../../components/ui-components/components/slider/app-slider.module';

@NgModule({
  declarations: [SearchPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(SEARCH_ROUTES),
        SearchFieldModule,
        FilterPanelModule,
        AppSliderModule,
    ],
  exports: [],
})
export class SearchPageModule {}
