import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule, NgIf} from "@angular/common";
import {RouteLoaderComponent} from "./shared/components/route-loader/route-loader.component";
import {ButtonComponent} from "./shared/components/button/button.component";
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {NotificationsComponent} from "./shared/components/notifications/notifications.component";
import {animate, style, transition, trigger} from "@angular/animations";
import {GlobalStore} from "./store/global/globalStore";

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
  global = inject(GlobalStore)
  notifications = this.global.notifications
  isLoading = this.global.isLoading
}
