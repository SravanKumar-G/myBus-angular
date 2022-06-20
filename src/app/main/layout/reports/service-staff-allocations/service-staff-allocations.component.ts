import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {AuthenticationService} from '../../../../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-staff-allocations',
  templateUrl: './service-staff-allocations.component.html',
  styleUrls: ['./service-staff-allocations.component.css']
})
export class ServiceStaffAllocationsComponent implements OnInit {
  public staffAllocationList: Array<any> = [];
  public currentServerDate: Date| undefined;
  public currentUser: any;
  public currentDate: any;
  public newDate: any = new Date();

  constructor(private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private router: Router,
              private authService: AuthenticationService,
              private actRoute: ActivatedRoute,
              private location: Location,
              private  datePipe: DatePipe) {
    this.currentDate = this.actRoute.snapshot.params.date || '';
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() - 1);
  }

  ngOnInit(): void {
    this.serviceReportStaffAllocation();
  }

  serviceReportStaffAllocation(): void{
    const Date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.apiService.get(this.apiUrls.staffAllocation + '?travelDate=' + Date).subscribe((res: any) => {
      if (res){
        this.staffAllocationList = res;
      }
    });
  }

  previousDate(): void {
    const currentDate = new Date(this.currentDate);
    const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
    this.currentDate = new Date(date);
    this.serviceReportStaffAllocation();
  }

  nextDate(): void {
    const currentDate = new Date(this.currentDate);
    const todaydate: any = new Date();
    todaydate.setDate(todaydate.getDate() - 1);
    const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
    if (new Date(date) <= todaydate) {
      this.currentDate = currentDate;
      console.log('rt', this.currentDate, currentDate);
      this.serviceReportStaffAllocation();
    }
  }
}
