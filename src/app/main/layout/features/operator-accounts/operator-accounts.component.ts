import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';

@Component({
  selector: 'app-operator-accounts',
  templateUrl: './operator-accounts.component.html',
  styleUrls: ['./operator-accounts.component.css']
})
export class OperatorAccountsComponent implements OnInit {
  public operatorAccountsData: Array<any> = [];

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls) {
  }

  ngOnInit(): void {
    this.getAllOperatorAccounts();
  }

  public getAllOperatorAccounts(): void {
    this.apiService.get(this.apiUrls.getAllOperatorAccounts).subscribe((res: any) => {
      if (res) {
        this.operatorAccountsData = res;
      }
    }, error =>  {
      console.log(error);
    });
  }

  editOperatorAccount(operatorId: any): void {
    if (operatorId) {
      this.router.navigate(['editOperatorAccount', {id: operatorId}]);
    }
  }

  addOperatorAccounts(): void {
    this.router.navigate(['addOperatorAccount']);
  }
}
