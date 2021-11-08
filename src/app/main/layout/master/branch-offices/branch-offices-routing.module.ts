import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BranchOfficesComponent} from './branch-offices.component';
import {AddEditBranchOfficeComponent} from './add-edit-branch-office/add-edit-branch-office.component';

const routes: Routes = [
    {
        path: '',
        data: {breadcrumb: 'Branch Offices'},
        component: BranchOfficesComponent
    },
    {
        path: 'addBranchOffice',
        data: {breadcrumb: 'Add Branch Office'},
        component: AddEditBranchOfficeComponent
    },
    {
        path: 'editBranchOffice/:id',
        data: {breadcrumb: 'Edit Branch Office'},
        component: AddEditBranchOfficeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BranchOfficesRoutingModule {
}
