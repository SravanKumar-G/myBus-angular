import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import * as _ from 'underscore';

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
  public serviceData: any;

  constructor(
      private apiService: ApiServiceService,
      private apiUrls: ApiUrls,
      private actRoute: ActivatedRoute,
      public modalService: NgbModal,
  ) {
    this.formId = this.actRoute.snapshot.params.id || '';
  }

  ngOnInit(): void {
    if (this.formId) {
      this.getServiceFormDetails();
    }else{
      Swal.fire('error', 'Did not find any Service form Id', 'error');
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    this.getAllVehicles();
  }

  getServiceFormDetails(): void {
    this.apiService.get(this.apiUrls.getDetailsByFormId + this.formId).subscribe((res: any) => {
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
}
