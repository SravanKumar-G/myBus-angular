import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseIncomeReportsRoutingModule } from './expense-income-reports-routing.module';
import {ExpenseIncomeReportsComponent} from './expense-income-reports.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ExpenseIncomeReportsComponent],
  imports: [
    CommonModule,
    ExpenseIncomeReportsRoutingModule,
    BsDatepickerModule,
    FormsModule
  ]
})
export class ExpenseIncomeReportsModule { }
