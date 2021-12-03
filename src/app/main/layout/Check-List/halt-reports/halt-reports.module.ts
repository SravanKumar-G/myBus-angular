import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HaltReportsRoutingModule } from './halt-reports-routing.module';
import {HaltReportsComponent} from './halt-reports.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
      HaltReportsComponent
  ],
  imports: [
    CommonModule,
    HaltReportsRoutingModule,
    FormsModule,
    BsDatepickerModule
  ]
})
export class HaltReportsModule { }
