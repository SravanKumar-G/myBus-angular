import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoCancellationsRoutingModule } from './cargo-cancellations-routing.module';
import {CargoCancellationsComponent} from './cargo-cancellations.component';


@NgModule({
  declarations: [
      CargoCancellationsComponent
  ],
  imports: [
    CommonModule,
    CargoCancellationsRoutingModule
  ]
})
export class CargoCancellationsModule { }
