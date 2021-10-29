import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalationsRoutingModule } from './escalations-routing.module';
import {EscalationsComponent} from './escalations.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {NgbPaginationModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
      EscalationsComponent
  ],
    imports: [
        CommonModule,
        EscalationsRoutingModule,
        NgSelectModule,
        FormsModule,
        NgbPaginationModule,
        NgbPopoverModule
    ]
})
export class EscalationsModule { }
