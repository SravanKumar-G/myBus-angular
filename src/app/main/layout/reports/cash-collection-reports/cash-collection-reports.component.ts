import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';
// @ts-ignore
import * as _ from 'underscore';

@Component({
  selector: 'app-cash-collection-reports',
  templateUrl: './cash-collection-reports.component.html',
  styleUrls: ['./cash-collection-reports.component.css']
})
export class CashCollectionReportsComponent implements OnInit {
  public officeId: any;
  public currentDate: any;
  public cashBookingList: Array<any> = [];
  public name = 'Select All';
  public branchOffices: Array<any> = [];
  public branchOfficeId: any;
  public cashBookingTotals: any;
  public duplicateCashBookingList: Array<any> = [];
  public branchOfficeTotals: Array<any> = [];

  public bookingTotal: any = 0;

  constructor( private apiService: ApiServiceService,
               private apiUrls: ApiUrls,
               private route: Router,
               private actRoute: ActivatedRoute,
               private  datePipe: DatePipe,
               private ngModalService: NgbModal) {
    this.currentDate = this.actRoute.snapshot.params.date || '';
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.officeId = this.actRoute.snapshot.params._id || '';
    this.bookingTotal = 0;
  }

  ngOnInit(): void {
    this.getCashBookingForADate();
    this.loadBranchOffices();
  }

  getCashBookingForADate(): void{
    const date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    let total = 0;
    this.apiService.get(this.apiUrls.getCashBookingForADate + date).subscribe((res: any) => {
      if (res){
          this.cashBookingList = res.bookings;
          this.cashBookingTotals = res;
          console.log("bookings " + this.cashBookingTotals);
          this.duplicateCashBookingList = res.bookings;
          _.each(this.duplicateCashBookingList, function(b: any){
            total += b.netAmt;
          });
          this.bookingTotal = total;
      }
    });
  }

  previousDate(): void {
    const currentDate = new Date(this.currentDate);
    const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
    this.currentDate = new Date(date);
    this.getCashBookingForADate();
  }

  nextDate(): void {
    const currentDate = new Date(this.currentDate);
    const todaydate: any = new Date();
    todaydate.setDate(todaydate.getDate() - 1);
    const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
    if (new Date(date) <= todaydate) {
      this.currentDate = currentDate;
      this.getCashBookingForADate();
    } else {
      Swal.fire('Oops...', 'U\'ve checked for future date, Check Later', 'error');
    }
  }

  loadBranchOffices(): void {
    this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
      if (res) {
        this.branchOffices = res;
        this.duplicateCashBookingList = this.cashBookingList;
      }
    });
  }

  cashCollectionReportExportToExcel(): void {
    this.apiService.exportExcel('CashCollectionReportExcelData', 'CashCollectionReportExcelDate', '', '');
  }

  bookingByFilter(branchOfficeId: any): void {
    let total = 0;
    if (branchOfficeId === 'All') {
      this.cashBookingList = this.duplicateCashBookingList;
    } else {
      this.cashBookingList = _.filter(this.duplicateCashBookingList, (item: any) => {
        return item.branchOfficeId === branchOfficeId;
      });
    }
    _.each(this.cashBookingList, function(b: any){
      total += b.netAmt;
    });
    this.bookingTotal = total;
  }
}
