import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PendingReportsComponent} from './pending-reports.component';
import {ServiceReportComponent} from '../../reports/shared/service-report/service-report.component';
import {ServiceFormComponent} from '../../reports/shared/service-form/service-form.component';

const routes: Routes = [
  {
    path: '',
    component: PendingReportsComponent
  },
  {
    path: 'pendingReports/serviceReport/:id',
    data: {breadcrumb: 'Pending Report'},
    component: ServiceReportComponent
  },
  {
    path: 'pendingReports/serviceForm/:id',
    data: {breadcrumb: 'Pending Report'},
    component: ServiceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingReportsRoutingModule { }
