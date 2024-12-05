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
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);

  }

  addReview(review: Review ): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews`, review)
  }

  createProduct(productName: string , description: string , productCategory: string, productImage: string){
    const payLoad = {productName,description,productCategory,productImage}
    return this.http.post<Product>(`http://localhost:3000/api/products`, payLoad , { withCredentials: true })
  }
  // createTheme(productName: string , description: string , category: string, productImage: string){
  //   const payLoad = {productName,description,category,productImage}
  //   return this.http.post<newProduct>(`/api/themes`, payLoad)

  // }
 }