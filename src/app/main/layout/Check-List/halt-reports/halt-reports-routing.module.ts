import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HaltReportsComponent} from './halt-reports.component';
import {ServiceReportsComponent} from '../../reports/service-reports/service-reports.component';
import {ServiceReportComponent} from '../../reports/shared/service-report/service-report.component';

const routes: Routes = [
  {
    path: '',
    component: HaltReportsComponent
  },
  {
    path: 'serviceReport/:id',
    component: ServiceReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HaltReportsRoutingModule { }
