import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceFeedbackRoutingModule } from './service-feedback-routing.module';
import {ServiceFeedbackComponent} from './service-feedback.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {LayoutModule} from '../../layout.module';
import { ServiceFeedbackReportComponent } from './service-feedback-report/service-feedback-report.component';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      ServiceFeedbackComponent,
      ServiceFeedbackReportComponent
  ],
  imports: [
    CommonModule,
    ServiceFeedbackRoutingModule,
    FormsModule,
    BsDatepickerModule,
    LayoutModule,
    BreadcrumbModule
  ]
})
export class ServiceFeedbackModule { }
