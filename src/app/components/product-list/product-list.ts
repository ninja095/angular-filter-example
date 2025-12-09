import {Component, inject, signal} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {FormsModule} from '@angular/forms';
import {FilterCategory} from '../../models/product.types';
import {CurrencyPipe} from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  protected productService = inject(ProductService);

  protected products = this.productService.filteredProducts;
  protected isLoading = this.productService.isLoading;
  protected currentFilters = this.productService.filters;
  protected availableColors = this.productService.availableColors;
  protected availableSizes = this.productService.availableSizes;

  protected categories = ['All', 'Shirts', 'Pants', 'Jackets'] as const;
  protected minPrice = signal(this.currentFilters().priceRange.min);
  protected maxPrice = signal(this.currentFilters().priceRange.max);

  protected onCategorySelect(category: FilterCategory) {
    this.productService.setCategoryFilter(category);
  }

  protected onPriceRangeChange() {
    this.productService.setPriceRange(this.minPrice(), this.maxPrice());
  }

  protected onColorToggle(color: string) {
    this.productService.setColor(color);
  }
  protected onSizeToggle(size: string) {
    this.productService.setSize(size);
  }

  protected resetFilters() {
    this.productService.resetAllFilters();
    this.minPrice.set(0);
    this.maxPrice.set(300);
  }
}
