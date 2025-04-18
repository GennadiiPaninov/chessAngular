import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { debounceTime, filter, map, merge, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-route-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-loader.component.html',
  styleUrls: ['./route-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteLoaderComponent {
  private loadingTrigger$ = new Subject<boolean>();
  public readonly loading$ = this.loadingTrigger$.pipe(
    switchMap(loading => loading ? of(true).pipe(debounceTime(150)) : of(false))
  );

  constructor(private router: Router) {
    const navStart$ = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(() => true)
    );

    const navEnd$ = this.router.events.pipe(
      filter(event =>
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ),
      map(() => false)
    );

    merge(navStart$, navEnd$).subscribe(this.loadingTrigger$);
  }
}
