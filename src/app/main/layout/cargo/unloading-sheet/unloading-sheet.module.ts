import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnloadingSheetRoutingModule } from './unloading-sheet-routing.module';
import {UnloadingSheetComponent} from './unloading-sheet.component';
import {LayoutModule} from '../../layout.module';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [UnloadingSheetComponent],
  imports: [
    CommonModule,
    UnloadingSheetRoutingModule,
    LayoutModule,
    FormsModule,
    NgSelectModule
  ]
})
export class UnloadingSheetModule { }
