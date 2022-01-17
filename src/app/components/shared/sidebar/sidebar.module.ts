import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { ShowMoreButtonModule } from '../show-more-button/show-more-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ShowMoreButtonModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
  ],
})

export class SidebarModule {
}
