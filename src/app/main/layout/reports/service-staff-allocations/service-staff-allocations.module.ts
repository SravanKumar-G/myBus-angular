import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ServiceStaffAllocationsRoutingModule } from './service-staff-allocations-routing.module';
import {ServiceStaffAllocationsComponent} from './service-staff-allocations.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [ServiceStaffAllocationsComponent],
  imports: [
    CommonModule,
    ServiceStaffAllocationsRoutingModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbModule
  ],
  providers: [ DatePipe]
})
export class ServiceStaffAllocationsModule { }
