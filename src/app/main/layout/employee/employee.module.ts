import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import {FormsModule} from '@angular/forms';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [AddEditEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    BreadcrumbModule
  ]
})
export class EmployeeModule { }
