import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import * as _ from 'underscore';
import {Location} from '@angular/common';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  public formId: any;
  public serviceReportDetails: any = {
    fuelExpenses: []
  };
  public downloaded = false;
  public currentUser: any;
  public vehicles: Array<any> = [];
  public serviceReports: Array<any> = [];
  public serviceData: any;
  public indexCount = 0;
  private currentDate: any;

  constructor(
      private apiService: ApiServiceService,
      private apiUrls: ApiUrls,
      private actRoute: ActivatedRoute,
      public modalService: NgbModal,
      public router: Router,
      public location: Location
  ) {
    this.formId = this.actRoute.snapshot.params.id || '';
    this.indexCount = this.actRoute.snapshot.params.index || 0;
  }

  ngOnInit(): void {
    if (this.formId) {
      this.getServiceFormDetails(this.formId);
    }else{
      Swal.fire('error', 'Did not find any Service form Id', 'error');
    }
    if (this.actRoute.snapshot.params.date) {
      this.currentDate = this.actRoute.snapshot.params.date;
      this.loadReports();
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    this.getAllVehicles();
  }

  loadReports(): void {
    const dateObj = this.apiService.getYYYYMMDD(this.currentDate);
    this.apiService.get(this.apiUrls.loadServiceReports + dateObj).subscribe((res: any) => {
      if (res) {
        this.serviceReports = res;
      }
    }, error => {
      Swal.fire('Oops...', error.message, 'error');
    });
  }

  getServiceFormDetails(formId: any): void {
    this.apiService.get(this.apiUrls.getDetailsByFormId + formId).subscribe((res: any) => {
      if (res) {
        this.serviceReportDetails = res;
        this.serviceReportDetails.fuelExpenses = [];
        if (this.serviceReportDetails.requiresVerification === undefined) {
          this.serviceReportDetails.requiresVerification = false;
        }
        this.downloaded = true;
      }
    }, error => {
      Swal.fire('error', error.message, 'error');
    });
  }

  getAllVehicles(): void {
    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
      if (res) {
        this.vehicles = res.content;
      }
    });
  }

  serviceIdClick(serviceReportId: any, modal: any): void {
    this.apiService.get(this.apiUrls.getServiceReportDetails + serviceReportId).subscribe((data: any) => {
      this.serviceData = data;
      this.modalService.open(modal, {size: 'lg'});
    }, error => {
      Swal.fire('Error', error.message, 'error');
    });
  }

  rateToBeVerified(booking: any): any {

  }
  nextAndPreviousService(status: any): void {
    if (status === 'decrement') {
      this.indexCount--;
    } else if (status === 'increment') {
      this.indexCount++;
    }
    const data = this.serviceReports[this.indexCount];
    console.log(this.indexCount);
    if (data.attrs.formId) {
      this.getServiceFormDetails(data.attrs.formId);
      this.location.replaceState('/serviceReports/' + this.currentDate + '/serviceForm/' + data.attrs.formId + '/' + this.indexCount);
    }else {
      this.router.navigate(['serviceReports/' + this.currentDate + '/serviceReport/' + data.id + '/' + this.indexCount]);
    }
  }
}
