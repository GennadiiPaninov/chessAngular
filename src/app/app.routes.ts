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
import {debutsReducer} from "./store/debuts/debuts.reducer";
import {DebutsEffects} from "./store/debuts/debuts.effects";
import {DebutListSignal} from "./shared/blocks/debuts/debuts-list/debut-list-signal/debut-list-signal";


export const routes: Routes = [
  {
    path: '',
    component: AuthorizedLayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'profile',
        loadComponent: () => import('./features/profile-page/profile-page.component').then(m => m.ProfilePageComponent)
      },
      {
        path: 'achievements',
        title: 'chess notes',
        loadComponent: () => import('./features/achievements-page/achievements-page.component').then(m => m.AchievementsPageComponent)
      },
      {
        path: 'activity',
        title: 'chess notes',
        loadComponent: () => import('./features/activity-page/activity-page.component').then(m => m.ActivityPageComponent)
      },
      {
        path: 'debuts',
        title: 'chess notes',
        loadComponent: () => import('./features/debuts-page/debuts-page.component').then(m => m.DebutsPageComponent),
        providers: [
          DebutListSignal,
          provideState('debuts', debutsReducer),
          provideEffects(DebutsEffects)
        ]
      },
      {
        path: 'moves/:id',
        title: 'chess notes',
        loadComponent: () => import('./features/moves-page/moves-page.component').then(m => m.MovesPageComponent)
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
        // canActivate: [redirectAuthGuard],
        loadComponent: () => import('./features/sign-in/sign-in.component').then(m => m.SignInComponent),
        providers: [provideEffects(LoginEffects)]
      },
      {
        path: 'sign-up',
        title: 'chess notes registration',
        // canActivate: [redirectAuthGuard],
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
