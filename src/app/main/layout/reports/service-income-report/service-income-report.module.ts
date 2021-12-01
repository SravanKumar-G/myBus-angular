import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceIncomeReportRoutingModule} from './service-income-report-routing.module';
import {ServiceIncomeReportComponent} from './service-income-report.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {ServiceIncomeReportByServiceComponent} from './service-income-report-by-service/service-income-report-by-service.component';
import {LayoutModule} from '../../layout.module';
import {ServiceReportComponent} from '../shared/service-report/service-report.component';
import {ServiceFormComponent} from '../shared/service-form/service-form.component';


@NgModule({
    declarations: [
        ServiceIncomeReportComponent,
        ServiceIncomeReportByServiceComponent,
        ServiceReportComponent,
        ServiceFormComponent
    ],
    imports: [
        CommonModule,
        ServiceIncomeReportRoutingModule,
        NgSelectModule,
        FormsModule,
        BsDatepickerModule,
        BreadcrumbModule,
        LayoutModule
    ]
})
export class ServiceIncomeReportModule {
}
