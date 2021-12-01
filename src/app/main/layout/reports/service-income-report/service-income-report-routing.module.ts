import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceIncomeReportComponent} from './service-income-report.component';
import {ServiceReportComponent} from '../shared/service-report/service-report.component';
import {ServiceFormComponent} from '../shared/service-form/service-form.component';
import {ServiceIncomeReportByServiceComponent} from './service-income-report-by-service/service-income-report-by-service.component';

const routes: Routes = [
    {
        path: '',
        data: {breadcrumb: 'Service Income Reports'},
        component: ServiceIncomeReportComponent,
    },
    {
        path: 'serviceReportByService/:id',
        data: {breadcrumb: 'Service Income Reports By Service'},
        component: ServiceIncomeReportByServiceComponent,
    },
    {
        path: 'serviceReportByService/:id/serviceReport/:id',
        data: {breadcrumb: 'Service Report'},
        component: ServiceReportComponent
    },
    {
        path: 'serviceReportByService/:id/serviceForm/:id',
        data: {breadcrumb: 'Service Form'},
        component: ServiceFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceIncomeReportRoutingModule {
}
