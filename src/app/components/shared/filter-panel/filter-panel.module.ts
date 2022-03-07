import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './filter-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/vendors/material.module';
import { TranslateModule } from '@ngx-translate/core';

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
  ],
})
export class FilterPanelModule { }
