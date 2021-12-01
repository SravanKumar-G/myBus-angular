import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReviewsComponent} from './reviews.component';
import {ViewReviewComponent} from './view-review/view-review.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Reviews'},
    component: ReviewsComponent
  },
  {
    path: 'viewReview/:id',
    data: {breadcrumb: 'View Review'},
    component: ViewReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
