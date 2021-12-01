import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryReportsRoutingModule } from './salary-reports-routing.module';
import {SalaryReportsComponent} from './salary-reports.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      SalaryReportsComponent
  ],
    imports: [
        CommonModule,
        SalaryReportsRoutingModule,
        NgbModule,
        FormsModule,
        BsDatepickerModule,
        NgSelectModule,
        BreadcrumbModule
    ]
})
export class SalaryReportsModule { }
