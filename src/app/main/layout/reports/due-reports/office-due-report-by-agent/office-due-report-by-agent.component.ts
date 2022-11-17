import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';
import {StorageServiceService} from '../../../../../services/storage-service.service';

@Component({
  selector: 'app-office-due-report-by-agent',
  templateUrl: './office-due-report-by-agent.component.html',
  styleUrls: ['./office-due-report-by-agent.component.css']
})
export class OfficeDueReportByAgentComponent implements OnInit {

  public agentName: any;
  public dueBookings: Array<any> = [];
  public officeDues: any = {};
  public selectedBookings: Array<any> = [];
  public selectedTotal = 0;


  constructor(private location: Location,
              private actRoute: ActivatedRoute,
              private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
  ) {
    this.agentName = this.actRoute.snapshot.params.agentName || '';
  }

  ngOnInit(): void {
    if (this.agentName) {
      this.loadOfficeDuesByAgent();
    } else {
      Swal.fire('Error', 'error finding data in Office Dues by Agent', 'error');
    }
  }

  loadOfficeDuesByAgent(): void {
    this.apiService.get(this.apiUrls.officeDuesByAgent + this.agentName).subscribe((res: any) => {
      if (res) {
        this.officeDues = res;
        this.dueBookings = res;
      }
    });
  }

  back(): void {
    this.location.back();
    StorageServiceService.setTabValue(3);
  }

  toggleBookingSelection(booking: any): void {
    const bookingId = booking.id;
    const idx = this.selectedBookings.indexOf(bookingId);
    if (idx > -1) {
      this.selectedBookings.splice(idx, 1);
      this.selectedTotal -= booking.netAmt;
    } else {
      this.selectedBookings.push(bookingId);
      this.selectedTotal += booking.netAmt;
    }
  }

}
