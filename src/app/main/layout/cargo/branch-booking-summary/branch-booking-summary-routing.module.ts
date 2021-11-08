import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BranchBookingSummaryComponent} from './branch-booking-summary.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Branch Booking Summary'},
    component: BranchBookingSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchBookingSummaryRoutingModule { }
