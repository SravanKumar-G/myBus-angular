import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { OfficeExpensesRoutingModule } from './office-expenses-routing.module';
import {OfficeExpensesComponent} from './office-expenses.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import { AddEditOfficeExpenseComponent } from './add-edit-office-expense/add-edit-office-expense.component';
import { FileUploadModule } from 'ng2-file-upload';
import {LayoutModule} from '../../layout.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [OfficeExpensesComponent, AddEditOfficeExpenseComponent],
    imports: [
        CommonModule,
        OfficeExpensesRoutingModule,
        NgbPaginationModule,
        FormsModule,
        BsDatepickerModule,
        NgSelectModule,
        FileUploadModule,
        LayoutModule,
        BreadcrumbModule
    ],
    providers: [ DatePipe]
})
export class OfficeExpensesModule { }
