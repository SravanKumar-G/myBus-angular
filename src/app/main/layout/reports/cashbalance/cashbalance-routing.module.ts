import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CashbalanceComponent} from './cashbalance.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Cash Balances here'},
    component: CashbalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbalanceRoutingModule { }
