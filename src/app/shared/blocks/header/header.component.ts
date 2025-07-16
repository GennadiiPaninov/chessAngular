import {Component, computed, signal} from '@angular/core';
import {ButtonComponent} from "@components/button/button.component";
import {NgFor, NgIf} from "@angular/common";
import {menuItem} from "@core/models/header-models/header-models";
import {ModalComponent} from "@components/modals/common-modal/modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    NgFor,
    ModalComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private showModal = signal(false)
  readonly isShow = computed(()=> this.showModal())
  menu: menuItem[] = [
    {title: 'Profile', svgName: 'profile', id: '1', link: '/'},
    {title: 'Debuts', svgName: 'debuts', id: '2', link: '/debuts' },
    {title: 'Activity', svgName: 'activity', id: '3', link: '/activity'},
    {title: 'Achievements', svgName: 'notification-success', id: '4', link: '/achievements'},
  ]

  trackById(index: number, item: menuItem) {
    return item.id
  }
  open(){
    this.showModal.set(true)
  }
  close(){
    this.showModal.set(false)
  }
}
