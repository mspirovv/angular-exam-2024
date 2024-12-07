import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../types/product';
import { Review } from '../models/review';
import { newProduct } from '../types/theme';


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
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/products`);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/products/${productId}`);
  }
  

  addReview(review: Review ): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews`, review)
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

}
 
 