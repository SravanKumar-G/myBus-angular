import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-fuel-expense-reports',
  templateUrl: './fuel-expense-reports.component.html',
  styleUrls: ['./fuel-expense-reports.component.css']
})
export class FuelExpenseReportsComponent implements OnInit {
  public tab = 1;
  public fuelExpenseQuery: any = {
    page: 1,
    size: 10,
    pageSizes: [],
  };
  public searchQuery: any = {
    page: 1,
    size: 10,
    pageSizes: [],
  };
  public SearchError: any;
  suppliers: Array<any> = [];
  public vehicles: Array<any> = [];
  public fuelExpenses: Array<any> = [];
  newDate: any = new Date();
  public currentDate: any;
  public count: any;
  public dayTotalBill: any;
  public startDate = new Date();
  public endDate =  new Date();
  public searchList: Array<any> = [];
  public currentUser: any;
  public searchCount: any;
  public allReports: Array<any> = [];
  public  vehicleNumber: any;

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.currentDate = this.actRoute.snapshot.params.date || '';
    this.getDate(new Date(this.currentDate));
    this.changeFuelExpenseTab(1);
    this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }


  getSuppliers(): void {
    this.apiService.get(this.apiUrls.getSuppliers).subscribe((res: any) => {
      if (res) {
        this.suppliers = res;
      }
    });
  }

  getAllVehicles(): void {
    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
      if (res) {
        this.vehicles = res.content;
      }
    });
  }

  changeFuelExpenseTab(tabkey: number): void {
    this.tab = tabkey ? tabkey : 1;
    switch (this.tab){
      case 1:
        this.getSuppliers();
        break;
      case 2:
        this.searchData();
        this.getAllVehicles();
        this.getSuppliers();
        break;
    }
  }

  getAllByDate(): void{
    this.apiService.get(this.apiUrls.getAllByDate + '?' + 'date=' + this.currentDate).subscribe((res: any) => {
      if (res){
        this.allReports = res.content;
        this.fuelExpenses = this.allReports;
        OnlynumberDirective.pagination(res.totalElements, this.fuelExpenseQuery);
        this.count = res.totalElements;
        this.dayTotalBill = this.allReports.reduce((memo, bill) => { return memo + bill.cost}, 0);
      }
    });
  }

  previousDate(): void {
    const currentDate = new Date(this.currentDate);
    const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
    this.currentDate = this.getDate(new Date(date));
  }

  nextDate(): void {
    const currentDate = new Date(this.currentDate);
    const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
    if (new Date(date) < new Date()) {
      this.currentDate = this.getDate(new Date(date));
    } else {
      Swal.fire('Oops...', 'U\'ve checked for future date, Check Later', 'error');
    }
  }

  getDate(date: any): any {
    const dateObj = date;
    const month = dateObj.getMonth() + 1;
    const day = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    this.currentDate = year + '-' + month + '-' + day;
    this.getAllByDate();
    this.location.replaceState('/fuelExpenseReports/' + this.currentDate);
    return year + '-' + month + '-' + day;
  }

  delete(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting this FuelExpense',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value){
        this.apiService.delete(this.apiUrls.deleteFuelExpense + id).subscribe((res: any) => {
          if (res){
            Swal.fire('Great', 'Fuel Expense successfully deleted', 'success');
            this.getAllByDate();
          }
        });
      }
    });
  }

  searchData(): void{
    this.apiService.getAll(this.apiUrls.searchData, this.searchQuery).subscribe((res: any) => {
      if (res){
        this.searchList = res.content;
        OnlynumberDirective.pagination(res.totalElements, this.searchQuery);
        this.searchCount = res.totalElements;
      }
    });
  }
  clickSorting($event: MouseEvent): void {
    OnlynumberDirective.clickSorting($event, this.fuelExpenseQuery);
    this.getAllByDate();
  }

  dateFunction(): void{
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
    this.dateFunction();
    if (!this.SearchError){
      this.searchData();
    }

  }

  exportToExcel(): void {
    this.dateFunction();
    this.apiService.exportExcel('fuelExpenseReports',
        this.currentUser.userName + '_fuelExpenseReports' + '(' + this.searchQuery.startDate + ' to ' + this.searchQuery.endDate + ')', '', '');
  }

  print(): void {
    const printContent = document.getElementById('report_left_inner');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // @ts-ignore
    WindowPrt.document.write(printContent.innerHTML);
    // @ts-ignore
    WindowPrt.document.close();
  }

  filterBySupplier(supplierId: any): void {
    this.fuelExpenses = [];
    if (supplierId === 'All'){
      this.fuelExpenses = this.allReports;
    } else {
      for (let i = 0; i < this.allReports.length; i++){
        if (this.allReports[i].supplierId === supplierId ){
          this.fuelExpenses.push(this.allReports[i]);
        }
      }
    }
    this.dayTotalBill = this.fuelExpenses.reduce((memo, bill) => { return memo + bill.cost}, 0);
  }
  changeTodayPage(event: number): void {
    this.fuelExpenseQuery.page = event;
    this.getAllByDate();
  }

  handleTodayPageSizeChange(size: any): void {
    this.fuelExpenseQuery.size = size;
    this.fuelExpenseQuery.page = 1;
    this.getAllByDate();
  }

  changeSearchPage(event: number): void {
    this.searchQuery.page = event;
    this.searchData();
  }

  handleSearchPageSizeChange(size: any): void {
    this.searchQuery.size = size;
    this.searchQuery.page = 1;
    this.searchData();
  }

  clickSearchSorting(event: MouseEvent): void {
    OnlynumberDirective.clickSorting(event, this.searchQuery);
    this.searchData();
  }


  refreshServiceNames(): void {
    this.fuelExpenses = [];
    this.apiService.get(this.apiUrls.updateServiceName + 'date=' + this.currentDate).subscribe((res: any) => {
      if (res){
        this.fuelExpenseQuery = res.content;
      }
    });
  }

  routing(): void {
    this.router.navigate(['/fuelExpenseReports/' + this.currentDate + '/addFuelExpense']);
  }

  downloadExcel(): void {
    this.apiService.exportExcel('fuelExpenseData',
        this.currentUser.userName + '_FuelExpenseReports' + '-' + this.currentDate, '', '');
  }
}
