import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DueReportsRoutingModule } from './due-reports-routing.module';
import {DueReportsComponent} from './due-reports.component';
import {LayoutModule} from '../../layout.module';
import { OfficeDueReportComponent } from './office-due-report/office-due-report.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import { OfficeDueReportByDateComponent } from './office-due-report-by-date/office-due-report-by-date.component';
import { OfficeDueReportByServiceComponent } from './office-due-report-by-service/office-due-report-by-service.component';
import { OfficeDueReportByAgentComponent } from './office-due-report-by-agent/office-due-report-by-agent.component';
import { ShowDuePaymentSummaryComponent } from './show-due-payment-summary/show-due-payment-summary.component';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      DueReportsComponent,
      OfficeDueReportComponent,
      OfficeDueReportByDateComponent,
      OfficeDueReportByServiceComponent,
      OfficeDueReportByAgentComponent,
      ShowDuePaymentSummaryComponent
  ],
    imports: [
        CommonModule,
        DueReportsRoutingModule,
        LayoutModule,
        FormsModule,
        BsDatepickerModule,
        NgSelectModule,
        BreadcrumbModule
    ]
})
export class DueReportsModule { }
