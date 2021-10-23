import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';

@Component({
  selector: 'app-cashbalance',
  templateUrl: './cashbalance.component.html',
  styleUrls: ['./cashbalance.component.css']
})
export class CashbalanceComponent implements OnInit {
  public branchOffices: Array<any> = [];
  public cashBal: any = {};
  public cashBalanceArray: Array<any> = [];
  public currentPageOfUsers: Array<any> = [];
  public cashCount: any = 0;
  sortOrder = 'name';
  orderBy = 'asc';
  public cashQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBranchNames();
    // this.getCash();
  }
  loadBranchNames(): void {
    this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
      if (res){
        this.branchOffices = res;
        this.getCash();
      }
    });
  }
  getCash(): void{
    this.apiService.get(this.apiUrls.getCashBalances).subscribe((res: any) => {
      if (res){
        this.cashBalanceArray = res;
        this.currentPageOfUsers = res;
        this.cashCount = res.length;
        console.log(this.cashCount);
      }
    });
  }
  exportExcel(): void{
    this.apiService.exportExcel('cashBalanceExcelData', 'Cashbalance', '', '');
  }
  searchBranchOffice(branchName: any): void {
    this.cashBalanceArray = [];
    if(branchName === 'All') {
      this.cashBalanceArray = this.currentPageOfUsers;
    } else {
      for (let i = 0; i < this.currentPageOfUsers.length; i++) {
        if (branchName === this.currentPageOfUsers[i].branchOfficeId) {
          this.cashBalanceArray.push(this.currentPageOfUsers[i]);
        }
      }
    }
  }

}
