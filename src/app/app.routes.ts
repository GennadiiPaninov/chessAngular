import {Routes} from '@angular/router';
import {authGuard} from "./core/helpers/authGuard/authGuard";
import {provideState} from "@ngrx/store";
import {registerReducer} from "./store/register/register.reducer";
import {provideEffects} from "@ngrx/effects";
import {RegisterEffects} from "./store/register/register.effects";

export const routes: Routes = [
  {
    path: '',
    title: "chess notes",
    loadComponent: () => import('./features/main-page/main-page.component').then(m => m.MainPageComponent),
    canActivate:[authGuard]

  },
  {
    path: 'sign-in',
    title: "chess notes",
    loadComponent: () => import('./features/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./features/sign-up/sign-up.component').then(m => m.SignUpComponent),
    title: "chess notes registration",
    providers: [
      provideState('register', registerReducer),
      provideEffects(RegisterEffects)
    ]
  },
  {
    path: 'verify/:token',
    title: "verify",
    loadComponent: () => import('./features/verify/verify.component').then(m => m.VerifyComponent)
  },
  {path: '**', redirectTo: 'sign-in'}
];
