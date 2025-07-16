import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { GlobalStore } from '@store/global/globalStore';
import { notification } from '@core/models/store-models/global-store';

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
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class NotificationsComponent {
  global = inject(GlobalStore);
  notifications = this.global.notifications;

  trackById(index: number, item: notification) {
    return item.id;
  }
}
