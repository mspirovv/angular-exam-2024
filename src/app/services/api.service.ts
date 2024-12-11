import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductResponse } from '../types/product';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

   getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

 
  getTopProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/products/top-products');
  }
  
  

  getProducts(page: number, limit: number = 10): Observable<{ products: Product[]; totalPages: number }> {
    return this.http.get<{ products: Product[]; totalPages: number }>(
      `http://localhost:3000/api/products?page=${page}&limit=${limit}`
    );
  }
  
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/products/${productId}`);
  }
  
  searchProducts(query: string, page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/products/search`, {
        params: {
            query,
            page: page.toString(),
            limit: limit.toString()
        }
    });
}

getUserProducts(page: number, limit: number): Observable<ProductResponse> {
  return this.http.get<ProductResponse>(
    `http://localhost:3000/api/products?page=${page}&limit=${limit}`
  );
}
  createProduct(productName: string , description: string , productCategory: string, productImage: string){
    const payLoad = {productName,description,productCategory,productImage}
    return this.http.post<Product>(`http://localhost:3000/api/products`, payLoad , { withCredentials: true })
  }
  editProduct(productId: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/api/products/${productId}`, updatedProduct);
  }  
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/products/${id}`);
  }

  addLike(body: { productId: string, userId: string }) {
    return this.http.post<any>(`http://localhost:3000/api/products/${body.productId}/like`, body);
  }
  
  removeLike(body: { productId: string, userId: string }) {
    return this.http.post<any>(`http://localhost:3000/api/products/${body.productId}/unlike`, body);
  }
  
  

}
