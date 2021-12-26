import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-office-expenses',
  templateUrl: './office-expenses.component.html',
  styleUrls: ['./office-expenses.component.css']
})
export class OfficeExpensesComponent implements OnInit {
  public tab = 1 ;
  public sortOrder = 'createdAt';
  public orderBy = 'desc';
  public pendingQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public approvedQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public payLaterQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public searchQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    userId: '',
    branchOfficeId: '',
    // name: '',
    supplierId: '',
    expenseType: '',
    vehicleId: '',
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public countPending: any;
  public pendingList: Array<any> = [];
  public ApprovedList: Array<any> = [];
  public paylaterContent: Array<any> = [];
  public countApproved: any;
  public countPaylater: any;
  public searchExpenseList: any;
  public startDate = new Date();
  public endDate = new Date();
  public names: Array<any> = [];
  public usersNames: Array<any> = [];
  public SearchError: any;
  public currentUser: any;
  public expenseList: any;
  public selectedOfficeExpenses: any = [];
  public approvedAndRejected: any;
  public suppliersList: Array<any> = [];
  public vehicles: Array<any> = [];

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.changeOfficeExpenseTab(1);
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }

  getPendingCount(): void{
    this.apiService.get(this.apiUrls.pendingCount).subscribe((res: any) => {
      if (res >= 0){
        this.countPending = res;
        OnlynumberDirective.pagination(res, this.pendingQuery);
        this.getAllPending();
      }
    });
  }

  getSearchCount(): void{
    this.apiService.get(this.apiUrls.searchExpensesCount).subscribe((res: any) => {
      if (res >= 0){
        this.countPending = res;
        OnlynumberDirective.pagination(res, this.searchQuery);
        this.getAllPending();
      }
    });
  }
  getAllPending(): void{
    this.apiService.get(this.apiUrls.allPending + '?page=' + this.pendingQuery.page +
        '&size=' + this.pendingQuery.size + '&sort=' + this.pendingQuery.sort).subscribe((res: any) => {
      if (res){
        this.pendingList = res.content;
      }
    });
  }

  searchExpenses(): void{
    this.apiService.getAll(this.apiUrls.searchExpense + '?page=' + this.searchQuery.page +
        '&size=' + this.searchQuery.size + '&sort=' + this.searchQuery.sort, this.searchQuery).subscribe((res: any) => {
      if (res){
        if (res){
          this.searchExpenseList = res.content;
          this.searchQuery.count = res.totalElements;
        }
      }
    });
  }
  searchExpensesOld(): void{
    this.apiService.getAll(this.apiUrls.searchExpense, this.searchQuery).subscribe((res: any) => {
      if (res){
        if (res){
          this.searchExpenseList = res;
          this.searchQuery.count = res.totalElements;
          console.log('dsd', this.searchQuery.count );
        }
      }
    });
  }
  getApprovedCount(): void{
    this.apiService.get(this.apiUrls.approvedCount).subscribe((res: any) => {
      if (res >= 0){
        this.countApproved = res;
        OnlynumberDirective.pagination(res, this.approvedQuery);
        this.getAllApproved();
      }
    });
  }

  getPayLaterCount(): void{
    this.apiService.get(this.apiUrls.paylaterCount).subscribe((res: any) => {
      if (res >= 0){
        this.countPaylater = res;
        OnlynumberDirective.pagination(res, this.payLaterQuery);
        this.getAllPayLater();
      }
    });
  }

  getAllPayLater(): void{
    this.apiService.get(this.apiUrls.allPaylater + '?page=' + this.payLaterQuery.page +
        '&size=' + this.payLaterQuery.size + '&sort=' + this.payLaterQuery.sort).subscribe((res: any) => {
      if (res){
        this.paylaterContent = res.content;
      }
    });
  }
  getAllApproved(): void{
    this.apiService.get(this.apiUrls.allApproved + '?page=' + this.approvedQuery.page +
        '&size=' + this.approvedQuery.size + '&sort=' + this.approvedQuery.sort).subscribe((res: any) => {
      if (res){
        this.ApprovedList = res.content;
      }
    });
  }

  branchOfficeNames(): void{
    this.apiService.get(this.apiUrls.branchOfficeNames).subscribe((res: any) => {
      if (res){
        this.names = res;
      }
    });
  }
  getAllUsers(): void{
    this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
      if (res){
        this.usersNames = res;
      }
    });
  }

  getExpenseTypes(): void{
    this.apiService.get(this.apiUrls.expensesTypes).subscribe((res: any) => {
      if (res){
        this.expenseList  = res;
      }
    });
  }
  getSuppliers(): void {
    this.apiService.get(this.apiUrls.suppliers).subscribe((res: any) => {
      if (res) {
        this.suppliersList = res;
      }
    });
  }
  getVehicles(): void {
    this.apiService.getAll(this.apiUrls.vehicleNumbersList, {}).subscribe((res: any) => {
      if (res) {
        this.vehicles = res;
      }
    });
  }
  changeOfficeExpenseTab(tabkey: number): void {
    this.tab = tabkey ? tabkey : 1;
    switch (this.tab) {
      case 1:
         this.getPendingCount();
         break;
      case 2:
        this.getApprovedCount();
        break;
      case 3:
        this.branchOfficeNames();
        this.getAllUsers();
        this.getExpenseTypes();
        this.searchExpenses();
        this.getSuppliers();
        this.getVehicles();
        break;
      case 4:
        this.getPayLaterCount();
        break;
    }
  }

  date(): void{
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
      this.searchQuery.startDate = startYear + '-' + startMonth + '-' + startDay;
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
      this.searchQuery.endDate = startYear + '-' + startMonth + '-' + startDay;
    }
  }
  search(): void {
    if (this.startDate > this.endDate) {
      this.SearchError = 'End Date should not be before Start Date';
    } else {
      this.SearchError = '';
    }
    this.date();
    if (!this.SearchError){
      this.searchExpenses();
    }

  }
  exportToExcel(): void {
    this.date();
    this.apiService.exportExcel( 'officeExpenseExcel', this.currentUser.userName + '_officeExpenseExcel' + '(' + this.searchQuery.startDate + ' to ' +
        this.searchQuery.endDate + ')',   '',  '');
  }
  pendingClickSorting($event: MouseEvent): void {
    OnlynumberDirective.clickSorting($event, this.pendingQuery);
    this.getPendingCount();
  }

  changePendingPage($event: number): void {
    this.pendingQuery.page = $event;
    this.getPendingCount();
  }

  handlePendingPageSizeChange(size: any): void {
    this.pendingQuery.size = size;
    this.pendingQuery.page = 1;
    this.getPendingCount();
  }

  changeApprovedPage($event: number): void {
    this.approvedQuery.page = $event;
    this.getApprovedCount();
  }

  handleApprovedPageSizeChange(size: any): void {
    this.approvedQuery.size = size;
    this.approvedQuery.page = 1;
    this.getApprovedCount();
  }

  changeSearchPage($event: number): void {
    this.searchQuery.page = $event;
    this.searchExpenses();
  }

  handleSearchPageSizeChange(size: any): void {
    this.searchQuery.size = size;
    this.searchQuery.page = 1;
    this.searchExpenses();
  }

  payLater(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Pay this later',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value){
        this.apiService.update(this.apiUrls.payLater + id, {}).subscribe((res: any) => {
          Swal.fire(
              'Moved to pay later bucket!',
              'Moved to pay later bucket!',
              'success'
          );
          this.getPendingCount();
          this.apiService.getLoggedInUserData();
        });
      }
    });
  }

  payNow(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Pay Now',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value){
        this.apiService.update(this.apiUrls.payNow + id, {}).subscribe((res: any) => {
          Swal.fire(
              'Paid!',
              'successfully disable!',
              'success'
          );
          this.getPayLaterCount();
          console.log("paying now get current user details");
          this.apiService.getLoggedInUserData();
        });
      }
    });
  }

  reject(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Reject this payment',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value){
        this.apiService.update(this.apiUrls.reject + id, {}).subscribe((res: any) => {
          Swal.fire(
              'Rejected!',
              'successfully disable!',
              'success'
          );
          this.getPayLaterCount();
          this.apiService.getLoggedInUserData();
        });
      }
    });
  }
  deleteOfficeExpense(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting this OfficeExpense',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value){
        this.apiService.delete(this.apiUrls.deleteOfficeExpense + id).subscribe((res: any) => {
          Swal.fire(
              'Disable!',
              'successfully disable!',
              'success'
          );
          this.getPendingCount();
        });
      }
    });
  }


  toggleOfficeExpenseSelection(id: any): void {
    const idx = this.selectedOfficeExpenses.indexOf(id);
    if (idx > -1) {
      this.selectedOfficeExpenses.splice(idx, 1);
    } else {
      this.selectedOfficeExpenses.push(id);
    }
  }

  approveOrRejectExpense(status: any): void {
    this.apiService.getAll(this.apiUrls.approveOrRejectStatus + status, this.selectedOfficeExpenses).subscribe((res: any) => {
      if (res){
        this.approvedAndRejected = res.data;
        this.selectedOfficeExpenses = [];
        this.apiService.getLoggedInUserData();
        this.changeOfficeExpenseTab(2);
      }
    });
  }

  approvedClickSorting($event: MouseEvent): void {
    OnlynumberDirective.clickSorting($event, this.approvedQuery);
    this.getApprovedCount();
  }

  searchClickSorting($event: MouseEvent): void {
    OnlynumberDirective.clickSorting($event, this.searchQuery);
    this.searchExpenses();
  }


}
