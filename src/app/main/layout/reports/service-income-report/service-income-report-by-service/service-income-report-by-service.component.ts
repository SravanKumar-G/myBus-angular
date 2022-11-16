import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {StorageServiceService} from '../../../../../services/storage-service.service';

@Component({
  selector: 'app-service-income-report-by-service',
  templateUrl: './service-income-report-by-service.component.html',
  styleUrls: ['./service-income-report-by-service.component.css']
})
export class ServiceIncomeReportByServiceComponent implements OnInit {

  public serviceId: any;
  public source: any;
  public destination: any;
  public serviceReportsByServiceNumber: Array<any> = [];

  constructor(private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private router: Router,
              private actRoute: ActivatedRoute,
              private location: Location) {
    this.serviceId = this.actRoute.snapshot.params.id || '';
  }

  ngOnInit(): void {
    if (this.serviceId) {
      this.getServiceReportByServiceId();
    }
    this.source = StorageServiceService.getIncomeFilters().source;
    this.destination = StorageServiceService.getIncomeFilters().destination;
  }

  getServiceReportByServiceId(): void {
    const Obj = {
      source: this.source,
      destination: this.destination,
      serviceNumber: this.serviceId
    };
    this.apiService.getAll(this.apiUrls.serviceReportByServiceId, Obj)
        .subscribe((res: any) => {
          if (res) {
            this.serviceReportsByServiceNumber = res;
            this.source = res[0].source;
            this.destination = res[0].destination;
          }
        });
  }

  back(): void {
    this.location.back();
    StorageServiceService.setIncomeFilters(
        {
          serviceNumber: this.serviceId,
          source: this.source,
          destination: this.destination
        });
  }

  goToServiceReport(reports: any): void {
    if (reports.attrs.formId) {
      this.router.navigate(['/serviceIncomeReport/serviceReportByService/' + this.serviceId + '/serviceForm/' + reports.attrs.formId]);
    }else{
      this.router.navigate(['/serviceIncomeReport/serviceReportByService/' + this.serviceId + '/serviceReport/' + reports.id]);
    }
  }

}
