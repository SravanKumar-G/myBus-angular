import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';
// @ts-ignore
import * as _ from 'underscore';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StorageServiceService} from '../../../../../services/storage-service.service';

@Component({
    selector: 'app-office-due-report',
    templateUrl: './office-due-report.component.html',
    styleUrls: ['./office-due-report.component.css']
})
export class OfficeDueReportComponent implements OnInit {

    public tab = 1;
    public dueReportByDate: any = {
        duesByDate: []
    };
    public dueReportByService: Array<any> = [];
    public dueReportByAgents: Array<any> = [];
    public branchOffices: Array<any> = [];
    public dueBookings: Array<any> = [];
    public dueBookingsByPnr: Array<any> = [];
    public branchOfficeId: any;
    searchText: any;
    searchObj: any = {
        startDate: new Date(),
        endDate: new Date()
    };
    public selectedBookings: Array<any> = [];
    pnrNumber: any;
    public reportDue: any;
    public totalDue = 0;
    public paidSummary: Array<any> = [];
    public totalPaidAmount = 0;
    public currentUser: any;

    constructor(
        private router: Router,
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private actRoute: ActivatedRoute,
        public modalService: NgbModal
    ) {
        this.branchOfficeId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        this.tab = StorageServiceService.getTabValue();
        this.changeTab(this.tab);
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    }

    changeTab(tabkey: any): void {
        this.tab = tabkey ? tabkey : 1;
        switch (this.tab) {
            case 1:
                this.getDueReportByDate();
                break;
            case 2:
                this.getDueReportByService();
                break;
            case 3:
                this.getDueReportByAgents();
                break;
            case 4:
                this.loadBranchOffice();
                break;
            case 5:
                break;
            case 6:
                this.getDueReportByDate();
        }
    }

    private getDueReportByDate(): void {
        this.apiService.get(this.apiUrls.loadOfficeDueReportByDate + this.branchOfficeId).subscribe((data: any) => {
            if (data) {
                this.dueReportByDate = data;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    private getDueReportByService(): void {
        this.apiService.get(this.apiUrls.loadOfficeDueReportByService).subscribe((data: any) => {
            if (data) {
                this.dueReportByService = data;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    private getDueReportByAgents(): void {
        this.apiService.get(this.apiUrls.loadOfficeDueReportByAgents).subscribe((data: any) => {
            if (data) {
                this.dueReportByAgents = data;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    loadBranchOffice(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    public search(): void {
        const startDate = this.apiService.getDate(this.searchObj.startDate);
        const endDate = this.apiService.getDate(this.searchObj.endDate);
        this.apiService.get(this.apiUrls.searchDueReports +
            '?startDate=' + startDate +
            '&endDate=' + endDate +
            '&branchOfficeId=' + this.searchObj.branchOfficeId ).subscribe((res: any) => {
            if (res) {
                this.dueBookings = res;
                this.totalDue = 0;
                for (const data of this.dueBookings) {
                    this.totalDue += data.netAmt;
                }
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    searchDataExportToExcel(): void {
        this.apiService.exportExcel('dueBookingsDataBySearch',
            this.currentUser.userName + '_Due Bookings' + '(' + this.apiService.getDate(this.searchObj.startDate)
            + ' to ' + this.apiService.getDate(this.searchObj.endDate) + ')', '', '');
    }


    toggleBookingSelection(bookingId: any): void {
        const idx = this.selectedBookings.indexOf(bookingId);
        if (idx > -1) {
            this.selectedBookings.splice(idx, 1);
        } else {
            this.selectedBookings.push(bookingId);
        }
    }

    payBookings(modal: any): void {
       if (this.selectedBookings) {
           Swal.fire({
               title: 'Are you sure?',
               text: 'You want to Pay selected bookings now?',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, pay now!'
           }).then((result) => {
               if (result.isConfirmed) {
                   this.apiService.create(this.apiUrls.payBookingDues, this.selectedBookings).subscribe((res: any) => {
                       if (res){
                           this.paidSummary = res;
                           this.totalPaidAmount = 0;
                           for (const data of this.paidSummary) {
                               this.totalPaidAmount += data.netAmt;
                           }
                           Swal.fire('Done!', 'Payment done successfully', 'success');
                           this.modalService.open(modal, {size: 'lg'});
                           this.search();
                       }
                   });
               }
           });
       }
    }

    searchByPNR(pnrNumber: any): void {
            this.apiService.get(this.apiUrls.searchByPNR +
                'pnr=' + pnrNumber).subscribe((res: any) => {
                if (res) {
                    this.dueBookingsByPnr = res;
                    for (const data of this.dueBookingsByPnr) {
                        this.reportDue = data.due;
                    }
                }
            }, error => {
                Swal.fire('error', error.message, 'error');
            });
    }

    payBooking(booking: any): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Pay for this booking now?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pay now!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.apiService.update(this.apiUrls.payBookingDue + booking.id, {}).subscribe((res: any) => {
                    Swal.fire(
                        'Done!',
                        'Payment done successfully',
                        'success'
                    );
                    this.searchByPNR(booking.ticketNo);
                    this.apiService.getLoggedInUserData();
                });
            }
        });
    }
}
