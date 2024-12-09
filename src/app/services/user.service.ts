import { Injectable } from '@angular/core';
import { profileDetails, userForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = environment.apiUrl
  private user$$= new BehaviorSubject<userForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: userForAuth | null = null;

get isLogged(): boolean {
  return !!this.user;

}
  constructor(private http: HttpClient) { 
 this.user$.subscribe((user) => {
  this.user = user;
 })
  }

login(email: string , password: string){
 return this.http.post<userForAuth>(`/api/login`, { email,password},{ withCredentials: true })
 .pipe(tap((user) => this.user$$.next(user)));
}

register(username:string, email: string  , password: string , rePassword:string){
  return this.http.post<userForAuth>(`/api/register`, { username,email,password,rePassword})
  .pipe(tap((user) => this.user$$.next(user)));
 }

 getProfile(){
  return this.http
  .get<userForAuth>('/api/users/profile')
  .pipe(tap((user) => this.user$$.next(user)));
}

updateProfile(username: string, email: string, password?: string) {
  return this.http
    .put<userForAuth>('/api/users/profile', { username, email, password }) 
    .pipe(tap((user) => this.user$$.next(user)));
}


logout(){
  return this.http.post('/api/logout', {})
  .pipe(tap((user) => this.user$$.next(null)));
}

getCurrentUser() {
  return this.user$$.asObservable();
}
}