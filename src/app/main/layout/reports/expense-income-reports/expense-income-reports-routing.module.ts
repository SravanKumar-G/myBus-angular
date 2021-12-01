import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpenseIncomeReportsComponent} from './expense-income-reports.component';

const routes: Routes = [{
  path: '',
  data: {breadcrumb: 'Expense Income Report'},
  component: ExpenseIncomeReportsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseIncomeReportsRoutingModule { }
