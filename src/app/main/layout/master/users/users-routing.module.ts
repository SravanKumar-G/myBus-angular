import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users.component';
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'addUser',
    component: AddEditUserComponent
  },
  {
    path: 'editUser/:id',
    component: AddEditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
