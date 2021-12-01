import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfficeExpensesComponent} from './office-expenses.component';
import {AddEditOfficeExpenseComponent} from './add-edit-office-expense/add-edit-office-expense.component';

const routes: Routes = [
    {
        path: '',
        data: {breadcrumb: 'Office Expenses'},
        component: OfficeExpensesComponent,
    },
    {
        path: 'addOfficeExpense',
        data: {breadcrumb: 'Add Office Expense'},
        component: AddEditOfficeExpenseComponent,
    },
    {
        path: 'editOfficeExpense/:id',
        data: {breadcrumb: 'Edit Office Expense'},
        component: AddEditOfficeExpenseComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OfficeExpensesRoutingModule {
}
