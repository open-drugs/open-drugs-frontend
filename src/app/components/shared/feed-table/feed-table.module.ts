import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedTableHeaderComponent } from './components/feed-table-header/feed-table-header.component';
import { FeedTableRowComponent } from './components/feed-table-row/feed-table-row.component';
import { TranslateModule } from '@ngx-translate/core';
import { FeedTableComponent } from './feed-table.component';
import { MaterialModule } from '../../../modules/vendors/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FeedTableComponent, FeedTableHeaderComponent, FeedTableRowComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    FeedTableComponent,
  ],
})
export class FeedTableModule {
}
