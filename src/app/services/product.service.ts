import {Injectable, inject, signal, computed} from '@angular/core';
import {DataStream} from './data-stream';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductFilters, Product, FilterCategory} from '../models/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dataStream = inject(DataStream);

  private allProducts = toSignal(
    this.dataStream.getProductsStream(),
    { initialValue: [] }
  );

  readonly filters = signal<ProductFilters>({
    category: 'All',
    priceRange: { min: 0, max: 1000 },
    color: []
  });

  readonly filteredProducts = computed<Product[]>(() => {
    const allProducts = this.allProducts();
    if (allProducts.length === 0) return [];
    const currentFilters = this.filters();
    let result = allProducts;
    // Фильтрация по категории
    if (currentFilters.category !== 'All') {
      result = result.filter(product => product.category === currentFilters.category);
    }
    // Фильтрация по ценовому диапазону
    const { min, max } = currentFilters.priceRange;
    if (min > 0 || max < 1000) {
      result = result.filter(product => product.price >= min && product.price <= max);
    }
    // Фильтрация по цвету
    const activeColors = currentFilters.color;
    if (activeColors.length > 0) {
      result = result.filter(product =>
        product.color.some(color => activeColors.includes(color))
      );
    }
    return result;
  });

  readonly isLoading = computed(() => this.allProducts().length === 0);

  readonly availableColors = computed<string[]>(() => {
    const products = this.allProducts();
    if (products.length === 0) return [];
    const allColors = products.flatMap(p => p.color);
    return Array.from(new Set(allColors)).sort();
  });

  setCategoryFilter(category: FilterCategory) {
    this.filters.update(f => ({ ...f, category }));
  }

  setPriceRange(min: number, max: number) {
    this.filters.update(f => ({ ...f, priceRange: { min, max } }));
  }

  setColor(color: string) {
    this.filters.update(f => {
      const colors = f.color.includes(color)
        ? f.color.filter(c => c !== color)
        : [...f.color, color];
      return { ...f, color: colors };
    });
  }
}
