import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {subscribeOn} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import Swal from "sweetalert2";

@Component({
  selector: 'app-job-reminders',
  templateUrl: './job-reminders.component.html',
  styleUrls: ['./job-reminders.component.css']
})
export class JobRemindersComponent implements OnInit {
tab = 1;
  pendingData: any;
  collectedData: any;
  allVehicles: any = [];
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
  getVehicles(): void {
    this.apiService.getAll(this.apiUrls.vehicleNumbersList, {}).subscribe((res: any) => {
      if (res) {
        this.allVehicles = res;
      }
    });
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

  updateReminder(reminder: any) : void {
    Swal.fire({
      title: '<h4> Job Completed </h4>',
      html: 'Please provide comment:',
      input: 'text',
      inputPlaceholder: 'Add Comment',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputValue: reminder.remarks,
      showCancelButton: true,
      confirmButtonText: 'Add Comment',
      confirmButtonColor: 'green',
      showLoaderOnConfirm: true,
      preConfirm: (remarksText) => {
        if (!remarksText) {
          Swal.showValidationMessage(
              'Enter comment'
          );
        } else {
          reminder.remarks = remarksText;
          this.apiService.update(this.apiUrls.updateJobReminder, reminder)
              .subscribe((response: any) => {
                if (response) {
                  Swal.fire('Great!', 'Comment added Successfully..!', 'success');
                  this.pendingGetUpcoming();
                }
              }, (error) => {
                Swal.showValidationMessage(
                    `Enter comment :` + error
                );
              });
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
}
