import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceReportByServiceRoutingModule} from './service-report-by-service-routing.module';
import {ServiceReportByServiceComponent} from './service-report-by-service.component';
import {LayoutModule} from '../../layout.module';
import {ServiceReportsComponent} from './service-reports/service-reports.component';
import {ServiceFormComponent} from './service-form/service-form.component';


@NgModule({
    declarations: [
        ServiceReportByServiceComponent,
        ServiceReportsComponent,
        ServiceFormComponent
    ],
    imports: [
        CommonModule,
        ServiceReportByServiceRoutingModule,
        LayoutModule
    ]
})
export class ServiceReportByServiceModule {
}
