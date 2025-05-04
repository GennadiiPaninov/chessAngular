import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {RouteLoaderComponent} from "./shared/components/route-loader/route-loader.component";
import {ButtonComponent} from "./shared/components/button/button.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouteLoaderComponent, RouteLoaderComponent, ButtonComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

}
