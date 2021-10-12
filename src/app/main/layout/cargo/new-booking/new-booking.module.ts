import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBookingRoutingModule } from './new-booking-routing.module';
import {NewBookingComponent} from './new-booking.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {LayoutModule} from '../../layout.module';


@NgModule({
  declarations: [
      NewBookingComponent
  ],
    imports: [
        CommonModule,
        NewBookingRoutingModule,
        FormsModule,
        BsDatepickerModule,
        LayoutModule
    ]
})
export class NewBookingModule { }
