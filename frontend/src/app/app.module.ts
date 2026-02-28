import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UrlsListComponent } from './pages/urls-list/urls-list.component';
import { UrlRedirectComponent } from './components/url-redirect/url-redirect.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    HomeComponent,
    UrlsListComponent,
    UrlRedirectComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
