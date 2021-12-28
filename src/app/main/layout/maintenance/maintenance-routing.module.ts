import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoriesComponent } from './inventories/inventories.component';
import { AddInventoriesComponent } from './inventories/add-inventories/add-inventories.component';
import { JobsComponent } from './jobs/jobs.component';
import { RemindersComponent } from './reminders/reminders.component';
import { StaffcomplaintsComponent } from './staffcomplaints/staffcomplaints.component';
import { TyresComponent } from './tyres/tyres.component';
import { ViewjobsbyinventoriesComponent } from './inventories/viewjobsbyinventories/viewjobsbyinventories.component';
import { AddtyresComponent } from './tyres/addtyres/addtyres.component';
import { AddEditTyreActivityComponent } from './tyres/add-edit-tyre-activity/add-edit-tyre-activity.component';
import { AddEditJobsComponent } from './jobs/add-edit-jobs/add-edit-jobs.component';
import {JobRemindersComponent} from './job-reminders/job-reminders.component';

const routes: Routes = [
  {
    path: 'inventories',
    component: InventoriesComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'reminders',
    component: RemindersComponent
  },
  {
    path: 'staffComplaints',
    component: StaffcomplaintsComponent
  },
  {
    path: 'tyres',
    component: TyresComponent
  },
  {
    path: 'tyres/addTyres',
    component: AddtyresComponent
  },
  {
    path: 'jobs/addJobs',
    component: AddEditJobsComponent
  },
  {
    path: 'jobs/editJobs/:id',
    component: AddEditJobsComponent
  },
  {
    path: 'tyres/editTyres/:id',
    component: AddtyresComponent
  },
  {
    path: 'tyres/addTyreActivity/:id',
    component: AddEditTyreActivityComponent
  },
  {
    path: 'tyres/editTyreActivity/:typeActivityId',
    component: AddEditTyreActivityComponent
  },
  {
    path: 'inventories/edit-inventories/:id',
    component: AddInventoriesComponent
  },
  {
    path: 'inventories/add-inventories',
    component: AddInventoriesComponent
  },
  {
    path: 'inventories/viewJobsByInventory/:id',
    component: ViewjobsbyinventoriesComponent
  },
  {
    path: 'jobReminders',
    component: JobRemindersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
