import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';

@Component({
    selector: 'app-view-review',
    templateUrl: './view-review.component.html',
    styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {
    public reviewId: any;

    constructor(private actRoute: ActivatedRoute,
                private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private location: Location
    ) {
        this.reviewId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
      console.log(this.reviewId);
    }

    routingToBack(): void {
      this.location.back();
    }
}
