import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsToBeReviewedComponent} from './reports-to-be-reviewed.component';
import {ServiceReportComponent} from '../../reports/shared/service-report/service-report.component';
import {ServiceFormComponent} from '../../reports/shared/service-form/service-form.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsToBeReviewedComponent
  },
  {
    path: 'serviceReport/:id/:reportsToBeReviewedStatus',
    data: {breadcrumb: 'reportsToBe Reviewed'},
    component: ServiceReportComponent
  },
  {
    path: 'serviceForm/:id/:reportsToBeReviewedStatus',
    data: {breadcrumb: 'reportsToBe Reviewed'},
    component: ServiceFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsToBeReviewedRoutingModule { }
