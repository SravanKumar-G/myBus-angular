import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransactionsRoutingModule } from './transactions-routing.module';
import {TransactionsComponent} from './transactions.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    BsDatepickerModule,
    NgSelectModule,
    FormsModule,
    NgbPaginationModule,
    BreadcrumbModule
    
  ]
})
export class TransactionsModule { }
