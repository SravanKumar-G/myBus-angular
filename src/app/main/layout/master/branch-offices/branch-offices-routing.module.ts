import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BranchOfficesComponent} from './branch-offices.component';
import {AddEditBranchOfficeComponent} from './add-edit-branch-office/add-edit-branch-office.component';

const routes: Routes = [
    {
        path: '',
        component: BranchOfficesComponent
    },
    {
        path: 'addBranchOffice',
        component: AddEditBranchOfficeComponent
    },
    {
        path: 'editBranchOffice/:id',
        component: AddEditBranchOfficeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BranchOfficesRoutingModule {
}
