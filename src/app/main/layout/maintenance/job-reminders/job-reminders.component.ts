import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {subscribeOn} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-job-reminders',
  templateUrl: './job-reminders.component.html',
  styleUrls: ['./job-reminders.component.css']
})
export class JobRemindersComponent implements OnInit {
tab = 1;
  pendingData: any;
  collectedData: any;
  // allVehicles: any = [];
  public sortOrder = 'createdAt';
  public orderBy = 'desc';
  data: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
    fromDate: new Date(),
    toDate: new Date()
  };
  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private datePipe: DatePipe, ) { }

  ngOnInit(): void {
    this.changeJobRemindersTab( '');
  }
  pendingGetUpcoming(): void{
    this.apiService.get(this.apiUrls.pendingGetUpcoming).subscribe((res: any) => {
      if (res){
       this.pendingData = res;
      }
    });
  }
  getAllCollected(): void{
    this.data.fromDate = this.datePipe.transform(this.data.fromDate, 'yyyy-MM-dd');
    this.data.toDate = this.datePipe.transform(this.data.toDate, 'yyyy-MM-dd');
    this.apiService.getAll(this.apiUrls.getAllCollectedData, this.data).subscribe((res: any) => {
      if (res){
        this.collectedData = res.content;
      }
    });
  }
  changeJobRemindersTab(tabkey: any): void {
    this.tab = tabkey ? tabkey : 1;
    switch (this.tab) {
      case 1:
        this.pendingGetUpcoming();
        break;
      case 2:
        this.getAllCollected();
        break;
      default:
        this.pendingGetUpcoming();
        break;
    }
  }
}
