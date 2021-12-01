import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pending-reports',
    templateUrl: './pending-reports.component.html',
    styleUrls: ['./pending-reports.component.css']
})
export class PendingReportsComponent implements OnInit {
    reports: any;
    sortOrder = 's.name';
    orderBy = 'asc';
    Query: any = {
        searchText: '',
        byVaccinated: false,
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        orderBy: 'asc',
        sortOrder: 's.name',
        sort: this.sortOrder + ',' + this.orderBy,
    };

    constructor(
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private router: Router, ) {
    }

    ngOnInit(): void {
      this.getPendingReports();
    }

    getPendingReports(): void{
      this.apiService.get(this.apiUrls.pendingReports).subscribe((res: any) => {
              if (res) {
                  this.reports = res;
              }
      });
    }
  goToServiceReport(service: any): void{
    if (service.attrs.formId) {
      this.router.navigate(['serviceform/' + service.attrs.formId]);
    } else {
      this.router.navigate(['servicereport/' + service.id]);
    }
  }
}
