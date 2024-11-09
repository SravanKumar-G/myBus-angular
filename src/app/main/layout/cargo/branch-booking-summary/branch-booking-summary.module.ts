import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchBookingSummaryRoutingModule } from './branch-booking-summary-routing.module';
import {BranchBookingSummaryComponent} from './branch-booking-summary.component';
import {LayoutModule} from '../../layout.module';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
      BranchBookingSummaryComponent
  ],
  imports: [
    CommonModule,
    BranchBookingSummaryRoutingModule,
    LayoutModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbModule
  ]
})
export class BranchBookingSummaryModule { }
