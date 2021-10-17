import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceReportByServiceRoutingModule } from './service-report-by-service-routing.module';
import {ServiceReportByServiceComponent} from './service-report-by-service.component';
import {LayoutModule} from '../../layout.module';


@NgModule({
  declarations: [ServiceReportByServiceComponent],
    imports: [
        CommonModule,
        ServiceReportByServiceRoutingModule,
        LayoutModule
    ]
})
export class ServiceReportByServiceModule { }
