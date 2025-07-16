import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const redirectAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('access_token');
  if (!token) {
    return of(true);
  }

  return authService.checkAuth().pipe(
    map(() => {
      router.navigate(['/']);
      return false;
    }),
    catchError(() => of(true)),
  );
};
