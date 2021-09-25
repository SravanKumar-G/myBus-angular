import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBookingRoutingModule } from './new-booking-routing.module';
import {NewBookingComponent} from './new-booking.component';


@NgModule({
  declarations: [
      NewBookingComponent
  ],
  imports: [
    CommonModule,
    NewBookingRoutingModule
  ]
})
export class NewBookingModule { }
