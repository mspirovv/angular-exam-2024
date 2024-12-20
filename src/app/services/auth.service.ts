import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { userForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = environment.apiUrl;
private userSubject = new BehaviorSubject<userForAuth | null>(null);

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, userData)
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials)
  }

  getCurrentUser() {
    console.log("Returning user from getCurrentUser");  
    return this.userSubject.asObservable();  
  }
  
}

