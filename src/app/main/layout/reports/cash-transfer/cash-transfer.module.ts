import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashTransferRoutingModule } from './cash-transfer-routing.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CashTransferRoutingModule,
      FormsModule
  ]
})
export class CashTransferModule { }
