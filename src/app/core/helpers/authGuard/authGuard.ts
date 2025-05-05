import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {catchError, map, of} from "rxjs";

export const authGuard: CanActivateFn =(route, state)=>{
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.checkAuth().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/sign-in'])
      return of(false);
    })
  )
}
