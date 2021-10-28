import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CashbalanceModule} from '../cashbalance/cashbalance.module';
import {CashTransferComponent} from './cash-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: CashTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashTransferRoutingModule { }
