import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OperatorAccountsComponent} from './operator-accounts.component';
import {AddEditOperatorAccountsComponent} from './add-edit-operator-accounts/add-edit-operator-accounts.component';

const routes: Routes = [
    {
        path: '',
        component: OperatorAccountsComponent,
    },
    {
        path: 'addOperatorAccount',
        component: AddEditOperatorAccountsComponent
    },
    {
        path: 'editOperatorAccount/:id',
        component: AddEditOperatorAccountsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperatorAccountsRoutingModule {
}
