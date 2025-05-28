import { Component } from '@angular/core';
import {ButtonComponent} from "../../components/button/button.component";
import {NgFor} from "@angular/common";
import {notification} from "../../../store/global/global.reducer";
import {menuItem} from "../../../core/models/header-models/header-models";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    NgFor
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menu: menuItem[] = [
    {title: 'Profile', svgName: 'profile', id: '1', link: '/'},
    {title: 'Debuts', svgName: 'debuts', id: '2', link: '/debuts' },
    {title: 'Activity', svgName: 'activity', id: '3', link: '/activity'},
    {title: 'Achievements', svgName: 'notification-success', id: '4', link: '/achievements'},
  ]
  trackById(index: number, item: menuItem) {
    return item.id
  }
}
