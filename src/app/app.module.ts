import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_ROUTES, ROUTER_OPTIONS } from './app-routing';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderModule } from './components/header/header.module';
import { ShowMoreButtonModule } from './components/show-more-button/show-more-button.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(APP_ROUTES, ROUTER_OPTIONS),
    BrowserAnimationsModule,
    HeaderModule,
    ShowMoreButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
