import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users.component';
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Users'},
    component: UsersComponent
  },
  {
    path: 'addUser',
    data: {breadcrumb: 'Add User'},
    component: AddEditUserComponent
  },
  {
    path: 'editUser/:id',
    data: {breadcrumb: 'Edit User'},
    component: AddEditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
