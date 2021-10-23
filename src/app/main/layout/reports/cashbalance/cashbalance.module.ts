import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashbalanceRoutingModule } from './cashbalance-routing.module';
import {CashbalanceComponent} from './cashbalance.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [CashbalanceComponent],
  imports: [
    CommonModule,
    CashbalanceRoutingModule,
    NgSelectModule,
    FormsModule,
    BsDatepickerModule
  ]
})
export class CashbalanceModule { }
