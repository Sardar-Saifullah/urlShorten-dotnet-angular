import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UrlsListComponent } from './pages/urls-list/urls-list.component';
import { UrlRedirectComponent } from './components/url-redirect/url-redirect.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'urls',
    component: UrlsListComponent
  },
  {
    path: ':shortCode',
    component: UrlRedirectComponent
  }
];
