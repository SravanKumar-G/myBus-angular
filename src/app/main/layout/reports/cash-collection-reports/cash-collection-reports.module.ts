import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { CashCollectionReportsRoutingModule } from './cash-collection-reports-routing.module';
import {CashCollectionReportsComponent} from './cash-collection-reports.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../../layout.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BreadcrumbModule} from "xng-breadcrumb";


@NgModule({
  declarations: [CashCollectionReportsComponent],
  imports: [
    CommonModule,
    CashCollectionReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    LayoutModule,
    BsDatepickerModule,
    BreadcrumbModule,
  ],
  providers: [ DatePipe]
})
export class CashCollectionReportsModule { }
