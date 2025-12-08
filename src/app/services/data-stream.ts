import { Injectable } from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import { Product } from '../models/product.types';
import {ALL_PRODUCTS} from '../data/product-data';

@Injectable({
  providedIn: 'root',
})
export class DataStream {
  getProductsStream(): Observable<Product[]> {
    return of(ALL_PRODUCTS).pipe(delay(500));
  }
}
