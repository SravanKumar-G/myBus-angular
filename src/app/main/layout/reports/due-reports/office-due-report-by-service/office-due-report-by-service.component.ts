import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';
import {StorageServiceService} from '../../../../../services/storage-service.service';

@Component({
  selector: 'app-office-due-report-by-service',
  templateUrl: './office-due-report-by-service.component.html',
  styleUrls: ['./office-due-report-by-service.component.css']
})
export class OfficeDueReportByServiceComponent implements OnInit {
  public serviceId: any;
  public dueBookings: Array<any> = [];
  public officeDues: any = {};
  public selectedBookings: Array<any> = [];
  public selectedTotal: any = 0;

  constructor(private location: Location,
              private actRoute: ActivatedRoute,
              private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
  ) {
    this.serviceId = this.actRoute.snapshot.params.service || '';
  }

  ngOnInit(): void {
    if (this.serviceId) {
      this.loadOfficeDuesByService();
    } else {
      Swal.fire('Error', 'error finding data in Office Dues by Service', 'error');
    }
  }

  loadOfficeDuesByService(): void {
    this.apiService.get(this.apiUrls.officeDuesByService + this.serviceId).subscribe((res: any) => {
      if (res) {
        this.officeDues = res;
        this.dueBookings = res;
      }
    });
  }

  back(): void {
    this.location.back();
    StorageServiceService.setTabValue(2);
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
