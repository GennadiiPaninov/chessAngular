import {Routes} from '@angular/router';
import {authGuard} from "./core/helpers/authGuard/authGuard";
import {provideEffects} from "@ngrx/effects";
import {RegisterEffects} from "./store/register/register.effects";
import {VerifyEffects} from "./store/verify/verify.effects";
import {provideState} from "@ngrx/store";
import {verifyReducer} from "./store/verify/verify.reducer";
import {LoginEffects} from "./store/login/login.effects";
import {redirectAuthGuard} from "./core/helpers/redirectAuthGuard/redirectAuthGuard";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {AuthorizedLayoutComponent} from "./shared/layouts/authorized-layout/authorized-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthorizedLayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'chess notes',
        loadComponent: () => import('./features/main-page/main-page.component').then(m => m.MainPageComponent)
      },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-in',
        title: 'chess notes',
        canActivate: [redirectAuthGuard],
        loadComponent: () => import('./features/sign-in/sign-in.component').then(m => m.SignInComponent),
        providers: [provideEffects(LoginEffects)]
      },
      {
        path: 'sign-up',
        title: 'chess notes registration',
        canActivate: [redirectAuthGuard],
        loadComponent: () => import('./features/sign-up/sign-up.component').then(m => m.SignUpComponent),
        providers: [provideEffects(RegisterEffects)]
      },
      {
        path: 'verify/:token',
        title: 'verify',
        loadComponent: () => import('./features/verify/verify.component').then(m => m.VerifyComponent),
        providers: [provideState('verify', verifyReducer), provideEffects(VerifyEffects)]
      }
    ]
  },
  {path: '**', redirectTo: ''}
]
