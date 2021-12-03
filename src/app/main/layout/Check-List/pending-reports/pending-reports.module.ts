import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingReportsRoutingModule } from './pending-reports-routing.module';
import {PendingReportsComponent} from './pending-reports.component';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../../layout.module';


@NgModule({
  declarations: [
      PendingReportsComponent
  ],
    imports: [
        CommonModule,
        PendingReportsRoutingModule,
        FormsModule,
        LayoutModule
    ]
})
export class PendingReportsModule { }
