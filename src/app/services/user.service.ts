// import { Injectable } from '@angular/core';
// import {  userForAuth } from '../types/user';
// import { HttpClient,  } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })

// export class UserService {
//   private apiUrl = environment.apiUrl
//   private user$$= new BehaviorSubject<userForAuth | null>(null);
//   public user$ = this.user$$.asObservable();

//   USER_KEY = '[user]';
//   user: userForAuth | null = null;

// get isLogged(): boolean {
//   return !!this.user$$

// }
//   constructor(private http: HttpClient ) { 
// //  this.user$.subscribe((user) => {
// //   this.user = user;
// //  })
// this.loadUser()
//   }

//   private loadUser(): void {
//     this.http.get<userForAuth>('/api/users/profile', { withCredentials: true }).subscribe({
//       next: (user) => this.user$$.next(user),
//       error: () => this.user$$.next(null),
//     });
//   }
//   login(email: string, password: string) {
//     return this.http
//       .post<userForAuth>('/api/login', { email, password })
//       .pipe(tap((user) => this.user$$.next(user)));
//   }

// register(username:string, email: string  , password: string , rePassword:string){
//   return this.http.post<userForAuth>(`/api/register`, { username,email,password,rePassword})
//   .pipe(tap((user) => this.user$$.next(user)));
//  }

// //  getProfile(){
// //   return this.http
// //   .get<userForAuth>('/api/users/profile', { withCredentials: true})
// //   .pipe(tap((user) => this.user$$.next(user)));
// // }

// getProfile(): Observable<userForAuth> {
//   return this.http.get<userForAuth>('/api/users/profile', { withCredentials: true })
//     .pipe(
//       tap(user => {
//         if (user) {
//           this.user$$.next(user);
//         }
//       })
//     );
// }



// updateProfile(username: string, email: string, password?: string) {
//   return this.http
//     .put<userForAuth>('/api/users/profile', { username, email, password }) 
//     .pipe(tap((user) => this.user$$.next(user)));
// }


// logout(){
//   return this.http.post('/api/logout', {})
//   .pipe(tap((user) => this.user$$.next(null)));
// }

// getCurrentUser() {
//   return this.user$$.asObservable();
// }
// }


import { Injectable } from '@angular/core';
import { userForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private user$$ = new BehaviorSubject<userForAuth | null>(null);
  public user$ = this.user$$.asObservable();

  // Getter за директен достъп до текущия потребител
  get user(): userForAuth | null {
    return this.user$$.getValue();
  }

  get isLogged(): boolean {
    return !!this.user$$.getValue();
  }

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  private loadUser(): void {
    this.http.get<userForAuth>('/api/users/profile', { withCredentials: true }).subscribe({
      next: (user) => this.user$$.next(user),
      error: () => this.user$$.next(null),
    });
  }

  login(email: string, password: string) {
    return this.http.post<userForAuth>('/api/login', { email, password }).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  register(username: string, email: string, password: string, rePassword: string) {
    return this.http.post<userForAuth>('/api/register', { username, email, password, rePassword }).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  getProfile(): Observable<userForAuth> {
    return this.http.get<userForAuth>('/api/users/profile', { withCredentials: true }).pipe(
      tap((user) => {
        if (user) {
          this.user$$.next(user);
        }
      })
    );
  }

  updateProfile(username: string, email: string, password?: string) {
    return this.http.put<userForAuth>('/api/users/profile', { username, email, password }).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(
      tap(() => this.user$$.next(null))
    );
  }

  getCurrentUser() {
    return this.user$$.asObservable();
  }
}
