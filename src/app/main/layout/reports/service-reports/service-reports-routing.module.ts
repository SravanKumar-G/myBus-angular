import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceReportsComponent} from './service-reports.component';
import {ServiceReportComponent} from '../shared/service-report/service-report.component';
import {ServiceFormComponent} from '../shared/service-form/service-form.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceReportsComponent,
    data: {breadcrumb:  'Service Reports' }
  },
  {
    path: 'serviceReport/:id/:reportsToBeReviewedStatus',
    data: {breadcrumb: 'Service Report'},
    component: ServiceReportComponent
  },
  {
    path: 'serviceForm/:id/:reportsToBeReviewedStatus',
    data: {breadcrumb: 'Service Form'},
    component: ServiceFormComponent
  },
  {
    path: 'serviceReport/:id/:index',
    data: {breadcrumb: 'Service Report'},
    component: ServiceReportComponent
  },
  {
    path: 'serviceForm/:id/:index',
    data: {breadcrumb: 'Service Form'},
    component: ServiceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceReportsRoutingModule { }
