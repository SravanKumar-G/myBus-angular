import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceReportByServiceComponent} from './service-report-by-service.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceReportByServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceReportByServiceRoutingModule { }
