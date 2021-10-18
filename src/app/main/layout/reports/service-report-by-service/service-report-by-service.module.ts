import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceReportByServiceRoutingModule} from './service-report-by-service-routing.module';
import {ServiceReportByServiceComponent} from './service-report-by-service.component';
import {LayoutModule} from '../../layout.module';
import {ServiceReportsComponent} from './service-reports/service-reports.component';
import {ServiceFormComponent} from './service-form/service-form.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
    declarations: [
        ServiceReportByServiceComponent,
        ServiceReportsComponent,
        ServiceFormComponent
    ],
    imports: [
        CommonModule,
        ServiceReportByServiceRoutingModule,
        LayoutModule,
        NgSelectModule,
        FormsModule,
        NgbPopoverModule,
        BsDatepickerModule
    ]
})
export class ServiceReportByServiceModule {
}
