import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ServiceStaffAllocationsRoutingModule } from './service-staff-allocations-routing.module';
import {ServiceStaffAllocationsComponent} from './service-staff-allocations.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {NgSelectModule} from '@ng-select/ng-select';
import { AddEditServiceStaffAllocationsComponent } from './add-edit-service-staff-allocations/add-edit-service-staff-allocations.component';


@NgModule({
  declarations: [ServiceStaffAllocationsComponent, AddEditServiceStaffAllocationsComponent],
    imports: [
        CommonModule,
        ServiceStaffAllocationsRoutingModule,
        FormsModule,
        BsDatepickerModule,
        BreadcrumbModule,
        NgSelectModule
    ],
  providers: [ DatePipe]
})
export class ServiceStaffAllocationsModule { }
