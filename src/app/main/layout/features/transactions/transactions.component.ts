import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  public usersNames: Array<any> = [];
  sortOrder = 'createdAt';
  orderBy = 'desc';
  public transactionObj: any = {
    page: 1,
    size: 10,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
    status: null,
  };
  public startDate = new Date();
  public endDate = new Date();
  public searchTransactionsList: Array<any> = [];
  public SearchError: any;
  public transactionsCount: any;
  public userId: any = '';
  private currentUser: any;
  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.getAllUsers();
    this.searchTransactionsCount();
  }

  goToDashboard(): void{
    this.router.navigate(['']);
  }

  getAllUsers(): void{
    this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
      if (res){
        this.usersNames = res;
      }
    });
  }

  searchTransactionsCount(): void{
    this.apiService.getAll(this.apiUrls.count, this.transactionObj).subscribe((res: any) => {
      if (res >= 0){
        this.transactionsCount = res;
        OnlynumberDirective.pagination(res, this.transactionObj);
        this.searchTransactions();
      }
    });
  }

  searchTransactions(): void{
    this.apiService.getAll(this.apiUrls.search, this.transactionObj).subscribe((res: any) => {
      if (res){
        this.searchTransactionsList = res.content;
      }
    });
  }

  changePage(event: any): void {
    this.transactionObj.page = event;
    this.searchTransactionsCount();

  }

  handlePageSizeChange(event: any): void {
    this.transactionObj.size = event;
    this.transactionObj.page = 1;
    this.searchTransactionsCount();
  }

  search(): void {
    if (this.userId){
      this.transactionObj.userId = this.userId;
    }
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
      this.transactionObj.startDate = startYear + '-' + startMonth + '-' + startDay;
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
      this.transactionObj.endDate = startYear + '-' + startMonth + '-' + startDay;
    }
    if (!this.SearchError){
      this.searchTransactionsCount();
    }
  }

  exportToExcel(): void {
    if (this.startDate){
      const currentDate = new Date(this.startDate);
      const startYear = currentDate.getFullYear();
      const startMonth: any = currentDate.getMonth() + 1;
      const startDay: any = currentDate.getDate();
      this.transactionObj.startDate = startYear + '-' + startMonth + '-' + startDay;
    }
    if (this.endDate){
      const CDate = new Date(this.endDate);
      const startYear = CDate.getFullYear();
      const startMonth: any = CDate.getMonth() + 1;
      const startDay: any = CDate.getDate();
      this.transactionObj.endDate = startYear + '-' + startMonth + '-' + startDay;
    }
    this.apiService.exportExcel( 'transactionExcel', this.currentUser.userName + '_transactionExcel' + '(' + this.transactionObj.startDate + ' to ' +
        this.transactionObj.endDate + ')',   '',  '');
  }

  clickSorting(event: any): void {
    OnlynumberDirective.clickSorting(event, this.transactionObj);
    this.searchTransactionsCount();
  }

  searchUser(): void {
    if (this.userId){
      this.transactionObj.userId = this.userId;
    }
    this.searchTransactionsCount();
  }
}
