import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCargoBookingRoutingModule } from './view-cargo-booking-routing.module';
import {ViewCargoBookingComponent} from './view-cargo-booking.component';


@NgModule({
  declarations: [
      ViewCargoBookingComponent
  ],
  imports: [
    CommonModule,
    ViewCargoBookingRoutingModule
  ]
})
export class ViewCargoBookingModule { }
