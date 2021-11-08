import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import {ReviewsComponent} from './reviews.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbPaginationModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '../../layout.module';
import { ViewReviewComponent } from './view-review/view-review.component';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      ReviewsComponent,
      ViewReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    FormsModule,
    BsDatepickerModule,
    NgSelectModule,
    NgbPopoverModule,
    NgbPaginationModule,
    LayoutModule,
    BreadcrumbModule
  ]
})
export class ReviewsModule { }
