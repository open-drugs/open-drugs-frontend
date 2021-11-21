import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from './search-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/vendors/material.module';

@NgModule({
  declarations: [SearchFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    SearchFieldComponent,
  ],
})
export class SearchFieldModule {}
