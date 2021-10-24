import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpenseIncomeReportsComponent} from './expense-income-reports.component';

const routes: Routes = [{
  path: '',
  component: ExpenseIncomeReportsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseIncomeReportsRoutingModule { }
