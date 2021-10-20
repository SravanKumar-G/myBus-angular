import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfficeExpensesComponent} from './office-expenses.component';
import {AddEditOfficeExpenseComponent} from './add-edit-office-expense/add-edit-office-expense.component';

const routes: Routes = [
    {
      path: '',
      component: OfficeExpensesComponent,
    },
   {
      path: 'addOfficeExpense',
      component: AddEditOfficeExpenseComponent,
   },
   {
    path: 'editOfficeExpense/:id',
    component: AddEditOfficeExpenseComponent,
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeExpensesRoutingModule { }
