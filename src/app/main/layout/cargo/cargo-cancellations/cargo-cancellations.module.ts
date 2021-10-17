import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoCancellationsRoutingModule } from './cargo-cancellations-routing.module';
import {CargoCancellationsComponent} from './cargo-cancellations.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '../../layout.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
      CargoCancellationsComponent
  ],
    imports: [
        CommonModule,
        CargoCancellationsRoutingModule,
        NgbPaginationModule,
        LayoutModule,
        FormsModule
    ]
})
export class CargoCancellationsModule { }
