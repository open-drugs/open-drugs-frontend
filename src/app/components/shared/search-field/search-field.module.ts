import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from './search-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/vendors/material.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SearchFieldComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule,
    ],
  exports: [
    SearchFieldComponent,
  ],
})
export class SearchFieldModule {}
