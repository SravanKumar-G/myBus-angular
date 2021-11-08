import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import {SuppliersComponent} from './suppliers.component';
import {FormsModule} from '@angular/forms';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [SuppliersComponent],
    imports: [
        CommonModule,
        SuppliersRoutingModule,
        FormsModule,
        BreadcrumbModule
    ]
})
export class SuppliersModule { }
