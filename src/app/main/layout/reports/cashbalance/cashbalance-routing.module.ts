import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CashbalanceComponent} from './cashbalance.component';

const routes: Routes = [
  {
    path: '',
    component: CashbalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbalanceRoutingModule { }
