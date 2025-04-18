import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', title: "chess notes", loadComponent: () => import('./features/sign-in/sign-in.component').then(m => m.SignInComponent)},
  {path: 'sign-up',loadComponent: () => import('./features/sign-up/sign-up.component').then(m => m.SignUpComponent) , title: "chess notes registration"},
  {path: '**', redirectTo: 'sign-in'}
];
