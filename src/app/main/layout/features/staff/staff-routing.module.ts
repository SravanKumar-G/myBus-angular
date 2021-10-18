import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaffComponent} from './staff.component';
import {AddEditAgentComponent} from '../agents/add-edit-agent/add-edit-agent.component';
import {AddEditStaffComponent} from './add-edit-staff/add-edit-staff.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent
  },
  {
    path: 'addStaff',
    component: AddEditStaffComponent
  },
  {
    path: 'editStaff/:id',
    component: AddEditStaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
