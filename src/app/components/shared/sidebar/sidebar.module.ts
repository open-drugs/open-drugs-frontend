import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { ShowMoreButtonModule } from '../show-more-button/show-more-button.module';
import { SIDEBAR_ROUTES } from './sidebar-routing';
import { SidebarRoutingModule } from './sibedar-routing.module';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    RouterModule.forChild(SIDEBAR_ROUTES),
    ShowMoreButtonModule,
  ],
  exports: [
    SidebarComponent,
  ],
})

export class SidebarModule {
}
