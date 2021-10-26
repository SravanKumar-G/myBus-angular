import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalaryReportsComponent} from './salary-reports.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryReportsRoutingModule { }
