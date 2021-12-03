import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-halt-reports',
  templateUrl: './halt-reports.component.html',
  styleUrls: ['./halt-reports.component.css']
})
export class HaltReportsComponent implements OnInit {
  public haltReports: any;
  query: any = {
    todayDate: new Date()
  };
  pipe = new DatePipe('en-US');
  todayDate = new Date( );
  filterObj: any = {
    startDate: new Date(),
    endDate: new Date()
  };
  constructor(
      public apiService: ApiServiceService,
      private apiUrls: ApiUrls,
      private router: Router,
  ) { }

  ngOnInit(): void {
    this.getHaltedServices();
  }
  getHaltedServices(): void{
    const date = this.pipe.transform(this.todayDate, 'yyyy-MM-d');
    this.query.date = date;
    this.apiService.get(this.apiUrls.haltedServices + '?date=' + date).subscribe(( res: any) => {
      if (res){
        this.haltReports = res;
      }
    });
  }
  exportExcel(): void{
    this.apiService.exportExcel('haltReportData', 'Halt Report', '', '');
  }
  getFilterHaltedServices(): void{
    this.filterObj.startDate = this.pipe.transform(this.filterObj.startDate, 'yyyy-MM-d');
    this.filterObj.endDate = this.pipe.transform(this.filterObj.endDate, 'yyyy-MM-d');
    if (this.filterObj.startDate && this.filterObj.endDate){
      this.apiService.getAll(this.apiUrls.filterHaltedServices, this.filterObj).subscribe((res: any) => {
        if (res){
          this.haltReports = res;
        }
      });
    }else {
      this.getHaltedServices();
    }
  }
}
