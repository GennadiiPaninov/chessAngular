import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {GlobalState, notification} from "../../../store/global/global.reducer";
import {selectNotifications} from "../../../store/global/global.selector";
import {CommonModule, NgClass, NgFor} from "@angular/common";
import {Subscription, timer} from "rxjs";
import {removeNotification} from "../../../store/global/global.actions";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, NgClass, NgFor],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('notificationAnimation', [
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

export class NotificationsComponent implements OnInit{
  notifications$ = this.store.select(selectNotifications)
  private timeouts = new Map<string, Subscription>()

  constructor(private store: Store<{ global: GlobalState }>) {

  }
  ngOnInit() {
    this.notifications$.subscribe(notifications$=>{
      notifications$.forEach((notification: notification)=>{
        if(!this.timeouts.has(notification.id)){
          const subscribe = timer(4500).subscribe(()=>{
            this.store.dispatch(removeNotification({id: notification.id}))
            this.timeouts.delete(notification.id);
          })
          this.timeouts.set(notification.id, subscribe);
        }
      })
    })
  }

  trackById(index: number, item: notification) {
    console.log(index, item)
    return item.id
  }
}
