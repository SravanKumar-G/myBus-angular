import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceReportsComponent} from './service-reports.component';
import {ServiceReportComponent} from '../shared/service-report/service-report.component';
import {ServiceFormComponent} from '../shared/service-form/service-form.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceReportsComponent
  },
  {
    path: 'serviceReport/:id',
    component: ServiceReportComponent
  },
  {
    path: 'serviceForm/:id',
    component: ServiceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceReportsRoutingModule { }
