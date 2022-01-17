import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_ROUTES, ROUTER_OPTIONS } from './app-routing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/vendors/material.module';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');
registerLocaleData(localeEn, 'en');

/*Components*/
import { HeaderModule } from './components/shared/header/header.module';
import { ShowMoreButtonModule } from './components/shared/show-more-button/show-more-button.module';
import { SidebarModule } from './components/shared/sidebar/sidebar.module';

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(APP_ROUTES, ROUTER_OPTIONS),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    HeaderModule,
    ShowMoreButtonModule,
    SidebarModule,
  ],
  providers: [
    TranslateService,
    { provide: LOCALE_ID, useValue: 'en' },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
