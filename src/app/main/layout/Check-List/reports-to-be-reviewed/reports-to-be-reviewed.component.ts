import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reports-to-be-reviewed',
  templateUrl: './reports-to-be-reviewed.component.html',
  styleUrls: ['./reports-to-be-reviewed.component.css']
})
export class ReportsToBeReviewedComponent implements OnInit {
  reports: any;
  sortOrder = 's.name';
  orderBy = 'asc';
  Query: any = {
    searchText: '',
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    orderBy: 'asc',
    sortOrder: 's.name',
    sort: this.sortOrder + ',' + this.orderBy,
  };


  constructor(public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private router: Router, ) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void{
    this.apiService.get(this.apiUrls.reportsToBeReviewed).subscribe((res: any) => {
      if (res) {
        this.reports = res;
      }
    });
  }
  goToServiceReport(service: any): void{
    if (service.attrs.formId) {
      this.router.navigate(['reportsToBeReviewed/serviceForm/' + service.attrs.formId + '/reportsReviewedData']);
    } else {
      this.router.navigate(['reportsToBeReviewed/serviceReport/' + service.id + '/reportsReviewedData']);
    }
  }
  exportExcel(): void{
    this.apiService.exportExcel('reportToViewData', 'Report to Reviewed', '', '');
  }
}
