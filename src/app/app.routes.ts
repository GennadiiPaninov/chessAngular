import {Routes} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {AuthorizedLayoutComponent} from "./shared/layouts/authorized-layout/authorized-layout.component";
import {authGuard} from "./core/helpers/authGuard/authGuard";
import {redirectAuthGuard} from "./core/helpers/redirectAuthGuard/redirectAuthGuard";


export const routes: Routes = [
  {
    path: '',
    component: AuthorizedLayoutComponent,
    canActivate: [authGuard],
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
      },
      {
        path: 'moves/:id',
        title: 'chess notes',
        loadComponent: () => import('./features/moves-page/moves-page.component').then(m => m.MovesPageComponent)
      },
      {
        path: 'debut/:id',
        title: 'chess notes',
        loadComponent: () => import('./features/debut-page/debut-page.component').then(m => m.DebutPageComponent)
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
      },
      {
        path: 'sign-up',
        title: 'chess notes registration',
        canActivate: [redirectAuthGuard],
        loadComponent: () => import('./features/sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: 'verify/:token',
        title: 'verify',
        loadComponent: () => import('./features/verify/verify.component').then(m => m.VerifyComponent),
      }
    ]
  },
  {path: '**', redirectTo: ''}
]
