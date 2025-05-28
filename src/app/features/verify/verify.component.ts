import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {Store} from "@ngrx/store";
import {verifyAction} from "../../store/verify/verify.actions";
import {selectIsVerify} from "../../store/verify/verify.selector";

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [NgIf, LoaderComponent, AsyncPipe],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private store =  inject(Store)
  isVerify$ = this.store.select(selectIsVerify)
  
  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token')
    if (token) {
      this.store.dispatch(verifyAction({token}))
    }
  }
}
