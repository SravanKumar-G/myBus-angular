import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
// @ts-ignore
import * as _ from 'underscore';
import {StorageServiceService} from '../../../../../services/storage-service.service';

@Component({
    selector: 'app-office-due-report-by-date',
    templateUrl: './office-due-report-by-date.component.html',
    styleUrls: ['./office-due-report-by-date.component.css']
})
export class OfficeDueReportByDateComponent implements OnInit {
    public officeId: any;
    public date: any;
    public dueBookings: Array<any> = [];
    public duplicateOfficeDues: Array<any> = [];
    public officeDues: any = {};
    public agentNames: Array<any> = [];
    bookedBy = 'Select All';
    public selectedBookings: Array<any> = [];

    constructor(private location: Location,
                private actRoute: ActivatedRoute,
                private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router
    ) {
        this.officeId = this.actRoute.snapshot.params.id || '';
        this.date = this.actRoute.snapshot.params.date || '';
    }

    ngOnInit(): void {
        if (this.officeId && this.date) {
            this.loadOfficeDuesByDate();
        } else {
            Swal.fire('Error', 'error finding data in Office Dues by date', 'error');
        }
    }

    loadOfficeDuesByDate(): void {
        this.apiService.get(this.apiUrls.officeDuesByDate + this.officeId + '/' + this.date).subscribe((res: any) => {
            if (res) {
                this.officeDues = res;
                this.dueBookings = res.bookings;
                this.duplicateOfficeDues = res.bookings;
                this.agentNames = _.uniq(this.dueBookings, (item: any) => item.bookedBy);
                this.agentNames.splice(0, 0, {bookedBy: 'Select All'});
            }
        });
    }

    back(): void {
        this.location.back();
        StorageServiceService.setTabValue(1);
    }

    toggleBookingSelection(bookingId: any): void {
        const idx = this.selectedBookings.indexOf(bookingId);
        if (idx > -1) {
            this.selectedBookings.splice(idx, 1);
        } else {
            this.selectedBookings.push(bookingId);
        }
    }

    bookingByFilter(bookedBy: any): void {
        if (bookedBy === 'Select All') {
            this.dueBookings = this.duplicateOfficeDues;
        } else {
            this.dueBookings = _.filter(this.duplicateOfficeDues, (item: any) => {
                return item.bookedBy === bookedBy;
            });
        }
    }
}
