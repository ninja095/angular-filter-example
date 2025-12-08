import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList) },
];
