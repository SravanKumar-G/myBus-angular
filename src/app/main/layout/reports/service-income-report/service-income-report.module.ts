import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceIncomeReportRoutingModule } from './service-income-report-routing.module';
import {ServiceIncomeReportComponent} from './service-income-report.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [ServiceIncomeReportComponent],
  imports: [
    CommonModule,
    ServiceIncomeReportRoutingModule,
    NgSelectModule,
    FormsModule,
    BsDatepickerModule
  ]
})
export class ServiceIncomeReportModule { }
