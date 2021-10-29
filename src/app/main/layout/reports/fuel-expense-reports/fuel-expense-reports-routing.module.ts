import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FuelExpenseReportsComponent} from './fuel-expense-reports.component';
import {AddEditFuelExpenseReportsComponent} from './add-edit-fuel-expense-reports/add-edit-fuel-expense-reports.component';

const routes: Routes = [{
  path: '',
  component: FuelExpenseReportsComponent,
},
  {
    path: 'addFuelExpense',
    component: AddEditFuelExpenseReportsComponent
  },
  {
    path: 'editFuelExpense/:id',
    component: AddEditFuelExpenseReportsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelExpenseReportsRoutingModule { }
