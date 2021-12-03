import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsToBeReviewedRoutingModule } from './reports-to-be-reviewed-routing.module';
import {ReportsToBeReviewedComponent} from './reports-to-be-reviewed.component';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../../layout.module';


@NgModule({
  declarations: [
      ReportsToBeReviewedComponent
  ],
    imports: [
        CommonModule,
        ReportsToBeReviewedRoutingModule,
        FormsModule,
        LayoutModule
    ]
})
export class ReportsToBeReviewedModule { }
