import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewCargoBookingComponent} from './view-cargo-booking.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCargoBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCargoBookingRoutingModule { }
