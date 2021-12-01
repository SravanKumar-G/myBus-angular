import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCargoBookingRoutingModule } from './view-cargo-booking-routing.module';
import {ViewCargoBookingComponent} from './view-cargo-booking.component';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      ViewCargoBookingComponent
  ],
  imports: [
    CommonModule,
    ViewCargoBookingRoutingModule,
    BreadcrumbModule
  ]
})
export class ViewCargoBookingModule { }
