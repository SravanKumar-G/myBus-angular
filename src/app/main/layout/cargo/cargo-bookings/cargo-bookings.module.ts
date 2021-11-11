import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoBookingsRoutingModule } from './cargo-bookings-routing.module';
import {CargoBookingsComponent} from './cargo-bookings.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '../../layout.module';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [CargoBookingsComponent],
    imports: [
        CommonModule,
        CargoBookingsRoutingModule,
        FormsModule,
        BsDatepickerModule,
        NgbModule,
        LayoutModule,
        BreadcrumbModule
    ]
})
export class CargoBookingsModule { }
