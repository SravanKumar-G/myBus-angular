import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CargoDashboardComponent} from './cargo-dashboard.component';

const dashboardRoutes: Routes = [{
  path: '',
  component: CargoDashboardComponent
}, {
  path: 'cargoDashboard',
  component: CargoDashboardComponent
}];
@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class CargoDashboardRoutingModule { }
