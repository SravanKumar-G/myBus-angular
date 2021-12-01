import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaffComponent} from './staff.component';
import {AddEditAgentComponent} from '../agents/add-edit-agent/add-edit-agent.component';
import {AddEditStaffComponent} from './add-edit-staff/add-edit-staff.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Staff'},
    component: StaffComponent
  },
  {
    path: 'addStaff',
    data: {breadcrumb: 'Add Staff'},
    component: AddEditStaffComponent
  },
  {
    path: 'editStaff/:id',
    data: {breadcrumb: 'Edit Staff'},
    component: AddEditStaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
