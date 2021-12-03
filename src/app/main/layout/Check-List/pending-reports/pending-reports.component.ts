import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';

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
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        orderBy: 'asc',
        sortOrder: 's.name',
        sort: this.sortOrder + ',' + this.orderBy,
    };
    public id: any;

    constructor(
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private router: Router,
        private actRoute: ActivatedRoute) {
        this.id = this.actRoute.snapshot.paramMap.get('id') || '';
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
      this.router.navigate(['./pendingReports/serviceForm/' + service.attrs.formId]);
    } else {
        console.log(service);
        this.router.navigate(['/pendingReports/serviceReport/' + service.id]);
    }
  }
    exportExcel(): void{
        this.apiService.exportExcel('pendingReportData', 'Pending Report', '', '');
    }
}
