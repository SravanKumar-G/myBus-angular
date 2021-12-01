import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsToBeReviewedRoutingModule } from './reports-to-be-reviewed-routing.module';
import {ReportsToBeReviewedComponent} from './reports-to-be-reviewed.component';


@NgModule({
  declarations: [
      ReportsToBeReviewedComponent
  ],
  imports: [
    CommonModule,
    ReportsToBeReviewedRoutingModule
  ]
})
export class ReportsToBeReviewedModule { }
