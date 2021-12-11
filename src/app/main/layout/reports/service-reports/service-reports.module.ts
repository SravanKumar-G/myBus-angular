import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ServiceReportsRoutingModule } from './service-reports-routing.module';
import {ServiceReportsComponent} from './service-reports.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      ServiceReportsComponent
  ],
  imports: [
    CommonModule,
    ServiceReportsRoutingModule,
    FormsModule,
    NgSelectModule,
    FormsModule,
    NgbPopoverModule,
    BsDatepickerModule,
    BreadcrumbModule,
  ],
  providers: [ DatePipe]
})
export class ServiceReportsModule { }
