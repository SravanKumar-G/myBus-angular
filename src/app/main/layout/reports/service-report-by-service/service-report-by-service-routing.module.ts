import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceReportByServiceComponent} from './service-report-by-service.component';
import {ServiceReportComponent} from '../shared/service-report/service-report.component';
import {ServiceFormComponent} from '../shared/service-form/service-form.component';

const routes: Routes = [
    {
        path: '',
        component: ServiceReportByServiceComponent
    },
    {
        path: 'serviceReport/:id',
        component: ServiceReportComponent
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
