import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@shared/layouts/auth-layout/auth-layout.component';
import { AuthorizedLayoutComponent } from '@shared/layouts/authorized-layout/authorized-layout.component';
import { authGuard } from '@core/helpers/authGuard/authGuard';
import { redirectAuthGuard } from '@core/helpers/redirectAuthGuard/redirectAuthGuard';
import { AnimationLayoutComponent } from '@shared/layouts/animation-layout/animation-layout.component';
import * as path from 'path';
import { AnimationsPageComponent } from '@features/animations-page/animations-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthorizedLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'profile',
        loadComponent: () =>
          import('./features/profile-page/profile-page.component').then(
            (m) => m.ProfilePageComponent,
          ),
      },
      {
        path: 'achievements',
        title: 'chess notes',
        loadComponent: () =>
          import('./features/achievements-page/achievements-page.component').then(
            (m) => m.AchievementsPageComponent,
          ),
      },
      {
        path: 'activity',
        title: 'chess notes',
        loadComponent: () =>
          import('./features/activity-page/activity-page.component').then(
            (m) => m.ActivityPageComponent,
          ),
      },
      {
        path: 'debuts',
        title: 'chess notes',
        loadComponent: () =>
          import('./features/debuts-page/debuts-page.component').then((m) => m.DebutsPageComponent),
      },
      {
        path: 'move/:id',
        title: 'chess notes',
        loadComponent: () =>
          import('./features/move-page/move-page.component').then((m) => m.MovePageComponent),
      },
      {
        path: 'debut/:id',
        title: 'chess notes',
        loadComponent: () =>
          import('./features/debut-page/debut-page.component').then((m) => m.DebutPageComponent),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-in',
        title: 'chess notes',
        canActivate: [redirectAuthGuard],
        loadComponent: () =>
          import('./features/sign-in/sign-in.component').then((m) => m.SignInComponent),
      },
      {
        path: 'sign-up',
        title: 'chess notes registration',
        canActivate: [redirectAuthGuard],
        loadComponent: () =>
          import('./features/sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
      {
        path: 'verify/:token',
        title: 'verify',
        loadComponent: () =>
          import('./features/verify/verify.component').then((m) => m.VerifyComponent),
      },
    ],
  },
  {
    path: 'animations',
    component: AnimationLayoutComponent,
    children: [
      {
        path: 'animations-page',
        title: 'chess-animations-page',
        loadComponent: () =>
          import('./features/animations-page/animations-page.component').then(
            (m) => m.AnimationsPageComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
