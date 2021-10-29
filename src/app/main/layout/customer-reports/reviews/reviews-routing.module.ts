import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReviewsComponent} from './reviews.component';
import {ViewReviewComponent} from './view-review/view-review.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent
  },
  {
    path: 'viewReview/:id',
    component: ViewReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
