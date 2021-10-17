import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceIncomeReportComponent} from './service-income-report.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceIncomeReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceIncomeReportRoutingModule { }
