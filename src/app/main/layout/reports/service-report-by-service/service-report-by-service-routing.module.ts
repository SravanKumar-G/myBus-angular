import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceReportByServiceComponent} from './service-report-by-service.component';
import {ServiceReportsComponent} from './service-reports/service-reports.component';
import {ServiceFormComponent} from './service-form/service-form.component';

const routes: Routes = [
    {
        path: '',
        component: ServiceReportByServiceComponent
    },
    {
        path: 'serviceReport/:id',
        component: ServiceReportsComponent
    },
    {
        path: 'serviceForm/:id',
        component: ServiceFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceReportByServiceRoutingModule {
}
