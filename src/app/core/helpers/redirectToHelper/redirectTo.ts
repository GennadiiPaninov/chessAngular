import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedirectTo {
  private router = inject(Router);

  navigateTo(url: string): Observable<boolean> {
    return of(this.router.navigate([url])).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        return of(false);
      }),
    );
  }
}
