import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { InventoriesComponent } from './inventories/inventories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AddInventoriesComponent } from './inventories/add-inventories/add-inventories.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TyresComponent } from './tyres/tyres.component';
import { StaffcomplaintsComponent } from './staffcomplaints/staffcomplaints.component';
import { JobsComponent } from './jobs/jobs.component';
import { RemindersComponent } from './reminders/reminders.component';
import { ViewjobsbyinventoriesComponent } from './inventories/viewjobsbyinventories/viewjobsbyinventories.component';
import { AddtyresComponent } from './tyres/addtyres/addtyres.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddEditTyreActivityComponent } from './tyres/add-edit-tyre-activity/add-edit-tyre-activity.component';
import { AddEditJobsComponent } from './jobs/add-edit-jobs/add-edit-jobs.component';
import { JobRemindersComponent } from './job-reminders/job-reminders.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
    InventoriesComponent,
    AddInventoriesComponent,
    TyresComponent,
    StaffcomplaintsComponent,
    JobsComponent,
    RemindersComponent,
    ViewjobsbyinventoriesComponent,
    AddtyresComponent,
    AddEditTyreActivityComponent,
    AddEditJobsComponent,
    JobRemindersComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbModule,
  ],
  providers: [
    DatePipe
  ],
})
export class MaintenanceModule { }
