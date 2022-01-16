import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';
import { LanguageComponent } from '../../language/language.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LanguageComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
  ],
})

export class HeaderModule {
}
