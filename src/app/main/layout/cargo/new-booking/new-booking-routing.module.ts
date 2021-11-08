import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewBookingComponent} from './new-booking.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'New Cargo Booking'},
    component: NewBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewBookingRoutingModule { }
