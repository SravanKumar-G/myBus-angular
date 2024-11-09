import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelExpenseReportsRoutingModule } from './fuel-expense-reports-routing.module';
import {FuelExpenseReportsComponent} from './fuel-expense-reports.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { AddEditFuelExpenseReportsComponent } from './add-edit-fuel-expense-reports/add-edit-fuel-expense-reports.component';
import {LayoutModule} from '../../layout.module';
import {SearchFilterPipe} from '../../../../customDirectives/pipes/search-filter.pipe';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [FuelExpenseReportsComponent, AddEditFuelExpenseReportsComponent],
    imports: [
        CommonModule,
        FuelExpenseReportsRoutingModule,
        NgbModule,
        BsDatepickerModule,
        FormsModule,
        NgSelectModule,
        LayoutModule,
        BreadcrumbModule
    ],
    exports: [
        SearchFilterPipe
    ]
})
export class FuelExpenseReportsModule { }
