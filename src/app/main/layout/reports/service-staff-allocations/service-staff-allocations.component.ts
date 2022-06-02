import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {AuthenticationService} from '../../../../services/authentication.service';

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
        // for (const re of res) {
        //     re.driverone = '';
        //     re.driverTwo = '';
        //     re.cleanerName = '';
        //     re.conductorName = '';
        //       for (const data of re.staffDetails) {
        //           if (data.type === 'Driver') {
        //               re.driverOne = data.name;
        //           }else if (data.type === 'DRIVER') {
        //               re.driverTwo = data.name;
        //           }else if (data.type === 'Cleaner' || data.type === 'CLEANER') {
        //               re.cleanerName = data.name;
        //           }else if (data.type === 'CONDUCTOR' || data.type ===  'Conductor') {
        //               re.conductorName = data.name;
        //           }
        //       }
        //   }
      }
    });
  }
}
