import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PendingReportsComponent} from './pending-reports.component';

const routes: Routes = [
  {
    path: '',
    component: PendingReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingReportsRoutingModule { }
