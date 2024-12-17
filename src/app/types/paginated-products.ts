import { Product } from "./product";

export interface PaginatedProducts {
    products: Product[]; 
    totalPages: number;   
  }