import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {VerifyStore} from "../../store/verify/verifyStore";

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [NgIf, LoaderComponent, AsyncPipe],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private verifyStore =  inject(VerifyStore)
  isVerify = this.verifyStore.isVerify

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token')
    if (token) {
      this.verifyStore.verify(token).then()
    }
  }
}
