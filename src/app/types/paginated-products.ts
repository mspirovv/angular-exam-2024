import { Product } from "./product";

export interface PaginatedProducts {
    products: Product[];  // Масив с продукти
    totalPages: number;   // Общо количество страници
  }