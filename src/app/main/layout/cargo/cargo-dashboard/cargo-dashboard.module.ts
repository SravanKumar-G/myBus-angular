import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoDashboardRoutingModule } from './cargo-dashboard-routing.module';
import {CargoDashboardComponent} from './cargo-dashboard.component';


@NgModule({
  declarations: [CargoDashboardComponent],
  imports: [
    CommonModule,
    CargoDashboardRoutingModule
  ]
})
export class CargoDashboardModule { }
