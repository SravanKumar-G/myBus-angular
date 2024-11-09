import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './main/authentication/login/login.component';
import {AuthGuard} from './authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {expectedRole: [45, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19, 0], breadcrumb: 'Dashboard'},
    loadChildren: () => import('./main/layout/layout.module').then(m => m.LayoutModule)
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
