import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import {InvoiceComponent} from './invoice.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    BsDatepickerModule,
    BreadcrumbModule
  ]
})
export class InvoiceModule { }
