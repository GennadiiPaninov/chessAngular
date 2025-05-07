import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule, NgIf} from "@angular/common";
import {RouteLoaderComponent} from "./shared/components/route-loader/route-loader.component";
import {ButtonComponent} from "./shared/components/button/button.component";
import {HttpClientModule} from "@angular/common/http";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {Store} from "@ngrx/store";
import {GlobalState} from "./store/global/global.reducer";
import {selectLoading, selectNotifications} from "./store/global/global.selector";
import {createNotification, toggleLoader} from "./store/global/global.actions";
import {NotificationsComponent} from "./shared/components/notifications/notifications.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouteLoaderComponent, RouteLoaderComponent, ButtonComponent, HttpClientModule, LoaderComponent, NgIf, NotificationsComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading$ = this.store.select(selectLoading)
  notifications$ = this.store.select(selectNotifications)
  constructor(private store: Store<{ global: GlobalState }>) {
  }

}
