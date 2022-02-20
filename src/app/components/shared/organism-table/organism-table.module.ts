import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismTableHeaderComponent } from './components/organism-table-header/organism-table-header.component';
import { OrganismTableRowComponent } from './components/organism-table-row/organism-table-row.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrganismTableComponent } from './organism-table.component';
import { MaterialModule } from '../../../modules/vendors/material.module';

@NgModule({
  declarations: [OrganismTableComponent, OrganismTableHeaderComponent, OrganismTableRowComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule
  ],
  exports: [
    OrganismTableComponent,
  ],
})
export class OrganismTableModule {
}
