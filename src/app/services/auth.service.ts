import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = environment.apiUrl;
private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, userData)
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials)
  }

  // Получаване на текущия потребител
  getCurrentUser() {
    return this.userSubject.asObservable();
  }
}

