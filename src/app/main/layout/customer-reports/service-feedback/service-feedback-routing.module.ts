import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceFeedbackComponent} from './service-feedback.component';
import {ServiceFeedbackReportComponent} from './service-feedback-report/service-feedback-report.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Service Feedback'},
    component: ServiceFeedbackComponent
  },
  {
    path: 'serviceFeedbackReport/:id',
    data: {breadcrumb: 'Service Feedback By Service'},
    component: ServiceFeedbackReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceFeedbackRoutingModule { }
