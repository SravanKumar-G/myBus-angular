import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OperatorAccountsComponent} from './operator-accounts.component';
import {AddEditOperatorAccountsComponent} from './add-edit-operator-accounts/add-edit-operator-accounts.component';

const routes: Routes = [
    {
        path: '',
        data: {breadcrumb: 'Operator Accounts'},
        component: OperatorAccountsComponent,
    },
    {
        path: 'addOperatorAccount',
        data: {breadcrumb: 'Add Operator Account'},
        component: AddEditOperatorAccountsComponent
    },
    {
        path: 'editOperatorAccount/:id',
        data: {breadcrumb: 'Edit Operator Account'},
        component: AddEditOperatorAccountsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperatorAccountsRoutingModule {
}
