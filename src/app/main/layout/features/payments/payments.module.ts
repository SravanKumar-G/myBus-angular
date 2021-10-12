import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaymentsComponent} from './payments.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [PaymentsComponent],
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        NgSelectModule,
        FormsModule,
        NgbPaginationModule,
        BsDatepickerModule
    ]
})
export class PaymentsModule { }
