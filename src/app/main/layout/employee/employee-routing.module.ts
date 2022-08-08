import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {AddEditEmployeeComponent} from './add-edit-employee/add-edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'addEmployee',
    component: AddEditEmployeeComponent
  },
  {
    path: 'editEmployee/:id',
    component: AddEditEmployeeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
