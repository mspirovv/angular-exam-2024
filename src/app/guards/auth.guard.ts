import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.user$.pipe(
    switchMap((user) => {
      if (user) {
        // Ако потребителят е логнат, позволяваме достъп
        return of(true);
      } else {
        // Ако няма потребител, опитваме да заредим текущия от сървъра
        return userService.getProfile().pipe(
          map(() => true), // Успешно зареждане – потребителят е логнат
          catchError(() => {
            // Грешка при зареждане – пренасочваме към логин
            router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return of(false);
          })
        );
      }
    })
  );
};
