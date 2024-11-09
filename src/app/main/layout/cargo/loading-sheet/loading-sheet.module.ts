import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSheetRoutingModule } from './loading-sheet-routing.module';
import {LoadingSheetComponent} from './loading-sheet.component';
import {LayoutModule} from '../../layout.module';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [LoadingSheetComponent],
    imports: [
        CommonModule,
        LoadingSheetRoutingModule,
        LayoutModule,
        FormsModule,
        NgSelectModule,
        BreadcrumbModule
    ]
})
export class LoadingSheetModule { }
