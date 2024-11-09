import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceCollectionReportRoutingModule } from './service-collection-report-routing.module';
import {ServiceCollectionReportComponent} from './service-collection-report.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../../layout.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
      ServiceCollectionReportComponent
  ],
    imports: [
        CommonModule,
        ServiceCollectionReportRoutingModule,
        BsDatepickerModule,
        FormsModule,
        LayoutModule,
        BreadcrumbModule
    ]
})
export class ServiceCollectionReportModule { }
