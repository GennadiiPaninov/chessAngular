import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule, NgIf} from "@angular/common";
import {RouteLoaderComponent} from "./shared/components/route-loader/route-loader.component";
import {ButtonComponent} from "./shared/components/button/button.component";
import {} from "@angular/common/http";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {Store} from "@ngrx/store";
import {GlobalState} from "./store/global/global.reducer";
import {selectLoading, selectNotifications} from "./store/global/global.selector";
import {NotificationsComponent} from "./shared/components/notifications/notifications.component";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouteLoaderComponent, RouteLoaderComponent, ButtonComponent,  LoaderComponent, NgIf, NotificationsComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('appAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(0)' }))
      ])
    ])
  ],
})
export class AppComponent {
  isLoading$ = this.store.select(selectLoading)
  notifications$ = this.store.select(selectNotifications)

  constructor(private store: Store<{ global: GlobalState }>) {
  }
}
