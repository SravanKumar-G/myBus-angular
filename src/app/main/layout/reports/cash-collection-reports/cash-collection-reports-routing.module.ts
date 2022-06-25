import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CashCollectionReportsComponent} from './cash-collection-reports.component';

const routes: Routes = [
    {
      path: '',
      data: {breadcrumb: 'cash Collection Reports'},
      component: CashCollectionReportsComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashCollectionReportsRoutingModule { }
