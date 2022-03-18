import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './filter-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/vendors/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppSliderModule } from '../../ui-components/components/slider/app-slider.module';

@NgModule({
  declarations: [FilterPanelComponent],
  exports: [
    FilterPanelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    AppSliderModule,
    FormsModule,
  ],
})
export class FilterPanelModule { }
