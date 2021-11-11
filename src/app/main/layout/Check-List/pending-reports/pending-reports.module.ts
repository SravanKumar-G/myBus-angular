import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingReportsRoutingModule } from './pending-reports-routing.module';
import {PendingReportsComponent} from './pending-reports.component';


@NgModule({
  declarations: [
      PendingReportsComponent
  ],
  imports: [
    CommonModule,
    PendingReportsRoutingModule
  ]
})
export class PendingReportsModule { }
