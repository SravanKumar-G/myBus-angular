import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliverySheetRoutingModule } from './delivery-sheet-routing.module';
import {DeliverySheetComponent} from './delivery-sheet.component';
import {LayoutModule} from '../../layout.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [DeliverySheetComponent],
    imports: [
        CommonModule,
        DeliverySheetRoutingModule,
        LayoutModule,
        NgSelectModule,
        FormsModule,
        BsDatepickerModule,
        NgbModule,
        BreadcrumbModule
    ]
})
export class DeliverySheetModule { }
