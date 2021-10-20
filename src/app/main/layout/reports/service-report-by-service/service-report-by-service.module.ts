import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceReportByServiceRoutingModule} from './service-report-by-service-routing.module';
import {ServiceReportByServiceComponent} from './service-report-by-service.component';
import {LayoutModule} from '../../layout.module';
import {ServiceReportComponent} from '../shared/service-report/service-report.component';
import {ServiceFormComponent} from '../shared/service-form/service-form.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
    declarations: [
        ServiceReportByServiceComponent,
        ServiceReportComponent,
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
