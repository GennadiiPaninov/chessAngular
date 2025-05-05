import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../core/services/auth/auth.service";
import {NgIf} from "@angular/common";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {delay} from "rxjs";

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [NgIf, LoaderComponent],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
  }
  isLoading:boolean = true
  isVerify:boolean = false
  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token')
    if(token){
      this.auth.confirmEmail(token).pipe(delay(1000)).subscribe({
        next: res=> {
          console.log(res.message)
          this.isLoading = false
          this.isVerify = true
        },
        error: err=> {
          console.log(err.error)
          this.isLoading = false
          this.isVerify = false
        }
      })
    }

  }
}
