import {Component, inject} from '@angular/core';
import {NavigationError, NavigationStart, NavigationEnd, NavigationCancel, Router, RouterOutlet} from '@angular/router';
import {LoadingService} from "./core/loadingService/loading.service";
import {CommonModule} from "@angular/common";
import {RouteLoaderComponent} from "./shared/components/route-loader/route-loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, CommonModule, RouteLoaderComponent, RouteLoaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
