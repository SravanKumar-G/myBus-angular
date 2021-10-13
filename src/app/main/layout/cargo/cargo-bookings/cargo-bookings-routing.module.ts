import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CargoBookingsComponent} from './cargo-bookings.component';

const routes: Routes = [
  {
    path: '',
    component: CargoBookingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoBookingsRoutingModule { }
