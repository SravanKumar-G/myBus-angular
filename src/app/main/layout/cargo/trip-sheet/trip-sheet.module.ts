import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripSheetRoutingModule } from './trip-sheet-routing.module';
import {TripSheetComponent} from './trip-sheet.component';
import {LayoutModule} from '../../layout.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
      TripSheetComponent
  ],
  imports: [
    CommonModule,
    TripSheetRoutingModule,
    LayoutModule,
    NgSelectModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbModule
  ]
})
export class TripSheetModule { }
