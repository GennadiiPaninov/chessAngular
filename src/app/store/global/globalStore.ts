import {computed, DestroyRef, inject, Injectable, signal} from "@angular/core";
import {notification, notificationType} from "../../core/models/store-models/global-store";
import { v4 as uuidv4 } from 'uuid';
import {timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
@Injectable({providedIn: "root"})
export class GlobalStore {
  private destroyRef = inject(DestroyRef)
  private isLoadingSignal = signal<boolean>(false)
  private notificationsSignal = signal<notification[]>([])
  readonly isLoading = computed(()=>this.isLoadingSignal())
  readonly notifications = computed(()=> this.notificationsSignal())

  toggleLoader(val?: boolean){
    this.isLoadingSignal.update((prev)=> val === undefined ? !prev : val)
  }

  createNotification(title:string, type: notificationType = 'notification-success'){
    const id = uuidv4()
    this.notificationsSignal.update((n)=>[...n, {id, title, notificationType: type}])

    timer(4500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(()=>this.removeNotification(id))
  }

  removeNotification(id:string){
    this.notificationsSignal.update(n=> n.filter((item)=>item.id !== id))
  }

}
