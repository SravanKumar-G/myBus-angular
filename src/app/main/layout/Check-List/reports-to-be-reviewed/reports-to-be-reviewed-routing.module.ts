import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsToBeReviewedComponent} from './reports-to-be-reviewed.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsToBeReviewedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsToBeReviewedRoutingModule { }
