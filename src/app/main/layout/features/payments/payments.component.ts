import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import {event} from 'jquery';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public tab: any;
  public sortOrder = 'createdAt';
  public orderBy = 'desc';
  public paymentsQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public approvedPaymentQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };

  public addPaymentQuery: any = {
    description: '',
    amount: '',
    branchOfficeId: '',
    type: '',
    date:  new Date(),
  };
  public pendingPayments: Array<any> = [];
  public errorMessage: any;
  public pendingPaymentsCount: any;
  public approvedPayments: Array<any> = [];
  public approvedPaymentsCount: any;
  public titleHeader: any = 'Add New a Payment';
  public paymentId: any;
  public payment: any = {};
  public names: Array<any> = [];
  public usersNames: Array<any> = [];
  public searchPaymentsList: Array<any> = [];
  public startDate = new Date();
  public endDate =  new Date();
  public searchPaymentQuery: any = {
    userId: '',
  };
  public SearchError: any;
  public currentUser: any;
  public paymentsVerify: any;
  public selectedPayments: any = [];
  public approvedAndRejected: any;
  public bookingIddetails: any = {};

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.branchOfficeNames();
    this.getAllUsers();
    this.changePaymentsTab(1);
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }

  getAllUsers(): void{
    this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
      if (res){
        this.usersNames = res;
      }
    });
  }


  changePaymentsTab(tabkey: any): void {
    this.tab = tabkey ? tabkey : 1;
    switch (this.tab){
      case 1:
        this.getPendingPaymentCount();
        break;
      case 2:
        this.getApprovedPaymentCount();
        break;
      case 3:
        this.searchPayments();
    }
  }

  getPendingPaymentCount(): void{
    this.apiService.get(this.apiUrls.countPendingPayments).subscribe((res: any) => {
      if (res !== 0){
        this.pendingPaymentsCount = res;
        OnlynumberDirective.pagination(res, this.paymentsQuery);
        this.getAllPendingPayments();
      }else {
        Swal.fire('Oops...', 'Error finding pendingPayments data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  getAllPendingPayments(): void{
    this.apiService.get(this.apiUrls.pendingPayments + '?page=' + this.paymentsQuery.page +
        '&size=' + this.paymentsQuery.size + '&sort=' + this.paymentsQuery.sort).subscribe((res: any) => {
      if (res){
          this.pendingPayments = res.content;
      } else {
        Swal.fire('Oops...', 'Error finding pendingPayments data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  getApprovedPaymentCount(): void{
    this.apiService.get(this.apiUrls.countApprovedPayments).subscribe((res: any) => {
      if (res !== 0){
        this.approvedPaymentsCount = res;
        OnlynumberDirective.pagination(res, this.approvedPaymentQuery);
        this.getAllApprovedPayments();
      }else {
        Swal.fire('Oops...', 'Error finding approvedPayments data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  getAllApprovedPayments(): void{
    this.apiService.get(this.apiUrls.approvedPayments + '?page=' + this.approvedPaymentQuery.page +
        '&size=' + this.approvedPaymentQuery.size + '&sort=' + this.approvedPaymentQuery.sort).subscribe((res: any) => {
      if (res){
        this.approvedPayments = res.content;
      } else {
        Swal.fire('Oops...', 'Error finding approvedPayments data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  UpdatePayment(addEditPaymentModal: any, paymentId: any): void {
    if (paymentId) {
      this.paymentId = paymentId;
      this.modalService.open(addEditPaymentModal, {size: 'lg', backdrop: 'static'});
      this.titleHeader = 'Update payment';
      this.apiService.get(this.apiUrls.updatePayment + paymentId).subscribe((res: any) => {
        if (res) {
          this.addPaymentQuery = res;
          const date = new Date(res.date);
          this.addPaymentQuery.date = date;
        }
      });
    } else {
      console.log(paymentId);
    }
  }

  delete(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting this Payment',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value){
        this.apiService.delete(this.apiUrls.delete + '/' + id).subscribe((res: any) => {
          Swal.fire(
              'Disable!',
              'successfully disable!',
              'success'
          );
          this.getPendingPaymentCount();
        });
      }
    });
  }

  clickSorting($event: any): void {
    OnlynumberDirective.clickSorting($event, this.paymentsQuery);
    this.getPendingPaymentCount();
  }

  changePendingPage($event: any): void {
    this.paymentsQuery.page = $event;
    this.getPendingPaymentCount();
  }

  handlePendingPageSizeChange(size: any): void {
    this.paymentsQuery.size = size;
    this.paymentsQuery.page = 1;
    this.getPendingPaymentCount();
  }

  changeApprovedPage($event: number): void {
    this.approvedPaymentQuery.page = $event;
    this.getApprovedPaymentCount();
  }

  handleApprovedPageSizeChange(size: any): void {
    this.approvedPaymentQuery.size = size;
    this.approvedPaymentQuery.page = 1;
    this.getApprovedPaymentCount();
  }

  addPayment(addEditPaymentModal: any): void {
    this.paymentId = '';
    this.titleHeader = 'Add a New Payment';
    this.modalService.open(addEditPaymentModal, {size: 'lg', backdrop: 'static'});
  }

  closeModal(): void {
    this.errorMessage = '';
    this.modalService.dismissAll();
  }

  branchOfficeNames(): void{
    this.apiService.get(this.apiUrls.branchOfficeNames).subscribe((res: any) => {
      if (res){
        this.names = res;
      }
    });
  }
  save(): void {
    if (this.paymentId) {
      this.apiService.update(this.apiUrls.updatePayment + this.paymentId, this.addPaymentQuery).subscribe((res: any) => {
        if (res) {
          Swal.fire('Great', 'Your Payment has been updated successfully', 'success');
          this.closeModal();
          this.getPendingPaymentCount();
        }
      }, error => {
        this.errorMessage = error.message;
      });
    } else {
      this.apiService.create(this.apiUrls.savePayment, this.addPaymentQuery).subscribe((res: any) => {
        if (res) {
          Swal.fire('Great', 'Your Payment has been successfully added', 'success');
          this.closeModal();
          this.getPendingPaymentCount();
        }
      }, error => {
        this.errorMessage = error.message;
      });
    }
  }

  searchPayments(): void{
    this.apiService.getAll(this.apiUrls.searchPayments, {}).subscribe((res: any) => {
      if (res){
        this.searchPaymentsList = res;
        this.searchPaymentQuery.count = res.totalElements;
      }
    });
  }

  search(): void {
    if (this.startDate > this.endDate) {
      this.SearchError = 'End Date should not be before Start Date';
    } else {
      this.SearchError = '';
    }
    const day = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (this.startDate) {
      const currentDate = new Date(this.startDate);
      const startYear = currentDate.getFullYear();
      let startMonth: any = currentDate.getMonth() + 1;
      let startDay: any = currentDate.getDate();
      for (let m = 0; m <= day.length; m++) {
        if (startMonth === (day[m])) {
          startMonth = '0' + startMonth;
        }
        if (startDay === (day[m])) {
          startDay = '0' + startDay;
        }
      }
      this.searchPaymentQuery.startDate = startYear + '-' + startMonth + '-' + startDay;
    }
    if (this.endDate) {
      const CDate = new Date(this.endDate);
      const startYear = CDate.getFullYear();
      let startMonth: any = CDate.getMonth() + 1;
      let startDay: any = CDate.getDate();
      for (let m = 0; m <= day.length; m++) {
        if (startMonth === (day[m])) {
          startMonth = '0' + startMonth;
        }
        if (startDay === (day[m])) {
          startDay = '0' + startDay;
        }
      }
      this.searchPaymentQuery.endDate = startYear + '-' + startMonth + '-' + startDay;
    }
    if (!this.SearchError){
      this.searchPayments();
    }

  }

  exportToExcel(): void {
    const day = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (this.startDate) {
      const currentDate = new Date(this.startDate);
      const startYear = currentDate.getFullYear();
      let startMonth: any = currentDate.getMonth() + 1;
      let startDay: any = currentDate.getDate();
      for (let m = 0; m <= day.length; m++) {
        if (startMonth === (day[m])) {
          startMonth = '0' + startMonth;
        }
        if (startDay === (day[m])) {
          startDay = '0' + startDay;
        }
      }
      this.searchPaymentQuery.startDate = startYear + '-' + startMonth + '-' + startDay;
    }
    if (this.endDate) {
      const CDate = new Date(this.endDate);
      const startYear = CDate.getFullYear();
      let startMonth: any = CDate.getMonth() + 1;
      let startDay: any = CDate.getDate();
      for (let m = 0; m <= day.length; m++) {
        if (startMonth === (day[m])) {
          startMonth = '0' + startMonth;
        }
        if (startDay === (day[m])) {
          startDay = '0' + startDay;
        }
      }
      this.searchPaymentQuery.endDate = startYear + '-' + startMonth + '-' + startDay;
    }
    this.apiService.exportExcel( 'paymentExcel', this.currentUser.userName + '_paymentExcel' + '(' + this.searchPaymentQuery.startDate + ' to ' +
        this.searchPaymentQuery.endDate + ')',   '',  '');
  }

  verifyPayment(paymentId: string): void {
    this.apiService.update(this.apiUrls.verifyPayment + paymentId, {}).subscribe((res: any) => {
      if (res){
          this.paymentsVerify = res.data;
          this.changePaymentsTab(1);
      }
    });
  }

  togglePaymentSelection(paymentId: any): void {
    const idx = this.selectedPayments.indexOf(paymentId);
    if (idx > -1) {
      this.selectedPayments.splice(idx, 1);
    } else {
      this.selectedPayments.push(paymentId);
    }
  }

  // tslint:disable-next-line:variable-name
  approveOrRejectPayment(status: any): void {
    this.apiService.getAll(this.apiUrls.approveOrReject + status, this.selectedPayments).subscribe((res: any) => {
      if (res){
        this.approvedAndRejected = res.data;
        this.changePaymentsTab(2);
      }
    });
  }

    BookingDuePopUpPayments(serviceFormId: any, bookingId: any): void{
      this.apiService.get(this.apiUrls.booking + bookingId).subscribe((res: any) => {
          if (res){
            this.bookingIddetails = res;
            this.modalService.open(serviceFormId, {size: 'lg', backdrop: 'static'});

          }
        }, error => {
        Swal.fire('Oops...', 'Error finding approvedPayments data!', 'error');
      });
    }

  popUp(serviceFormId: any, s: any): void{
    this.modalService.open(serviceFormId, {size: 'lg', backdrop: 'static'});
  }

  cancel(): void {
    this.modalService.dismissAll();
  }
}
