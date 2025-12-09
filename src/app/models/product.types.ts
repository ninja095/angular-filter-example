export type ProductCategory = 'Shirts' | 'Pants' | 'Jackets';

export type Product = {
  id: number;
  name: string;
  price: number;
  color: string[];
  size: string[];
  category: ProductCategory;
};

export type FilterCategory = 'All' | ProductCategory;

export interface ProductFilters {
  category: FilterCategory;
  priceRange: {
    min: number;
    max: number;
  };
  color: string[];
  size: string[];
}
