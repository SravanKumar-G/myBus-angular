import {Component, Injectable, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-loading-sheet',
    templateUrl: './loading-sheet.component.html',
    styleUrls: ['./loading-sheet.component.css']
})
export class LoadingSheetComponent implements OnInit {

    public currentUser: any;
    public branchOffices: Array<any> = [];
    public errorMessage: any;
    public cargoBookings: Array<any> = [];
    filterObj: any = {fromBranchId: ''};
    filterByStatus: any = 'All';
    filterString: any;
    public allBookings: Array<any> = [];
    public vehicles: Array<any> = [];
    public total: any;
    public paidCargoBooking: any;
    public toPayCargoBooking: any;
    public truckId: any;
    public selectedBookings: Array<any> = [];
    public selectedBooking: any;
    date = new Date();
    tripSheets: Array<any> = [];
    public vehicleRegNo: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router,
                public modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.filterObj.fromBranchId = this.currentUser.branchOfficeId;
        this.loadBranchOffice();
        this.getLoadingSheetData();
        this.loadVehicles();
    }

    loadBranchOffice(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    loadVehicles(): void {
        this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
            if (res) {
                this.vehicles = res.content;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    getLoadingSheetData(): void {
        this.apiService.getAll(this.apiUrls.getBookingsForLoading, this.filterObj).subscribe((res: any) => {
            if (res) {
                this.cargoBookings = res;
                this.allBookings = res;
                this.total = 0;
                this.paidCargoBooking = 0;
                this.toPayCargoBooking = 0;
                let i;
                for (i = 0; i < this.cargoBookings.length; i++) {
                    this.total += this.cargoBookings[i].totalCharge;
                    if (this.cargoBookings[i].paymentType === 'Paid') {
                        this.paidCargoBooking += this.cargoBookings[i].totalCharge;
                    } else {
                        this.toPayCargoBooking += this.cargoBookings[i].totalCharge;
                    }
                }
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    exportToExcel(): void {
        this.apiService.exportExcel('cargoBookings',
            this.currentUser.userName + '_LoadingSheet', '', '');
    }

    gotoBooking(id: any): void {
        this.router.navigate(['viewCargoBooking', id]);
    }

    addComment(bookingId: any): void {
        this.apiService.get(this.apiUrls.getCargoBooking + bookingId).subscribe((cargoBooking: any) => {
            if (cargoBooking) {
                Swal.fire({
                    title: '<h4>' + 'Comment?' + '</h4>',
                    html: 'Please provide comment:',
                    input: 'text',
                    inputPlaceholder: 'Add Comment',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    inputValue: cargoBooking.reviewComment,
                    showCancelButton: true,
                    confirmButtonText: 'Add Comment',
                    confirmButtonColor: 'green',
                    showLoaderOnConfirm: true,
                    preConfirm: (data) => {
                        if (!data) {
                            Swal.showValidationMessage(
                                'Enter comment'
                            );
                        } else {
                            this.apiService.update(this.apiUrls.saveCommentCargoBooking
                                + bookingId, data)
                                .subscribe((response: any) => {
                                    if (response) {
                                        Swal.fire('Great!', 'Comment added Successfully..!', 'success');
                                        this.getLoadingSheetData();
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
        });
    }

    filterBookingsByStatus(status: any): void {
        this.cargoBookings = [];
        if (status === 'All') {
            this.cargoBookings = this.allBookings;
        } else if (status === 'Loaded') {
            let i;
            for (i = 0; i < this.allBookings.length; i++) {
                if (this.allBookings[i].vehicleId !== null) {
                    this.cargoBookings.push(this.allBookings[i]);
                }
            }
        } else {
            let i;
            for (i = 0; i < this.allBookings.length; i++) {
                if (!this.allBookings[i].vehicleId) {
                    this.cargoBookings.push(this.allBookings[i]);
                }
            }
        }
    }

    toggleBookingSelection(bookingId: any): void {
        const idx = this.selectedBookings.indexOf(bookingId);
        if (idx > -1) {
            this.selectedBookings.splice(idx, 1);
        } else {
            this.selectedBookings.push(bookingId);
        }
    }

    loadVehicle(truckId: any, modal: any): void {
        if (!truckId.id) {
            Swal.fire('Error', 'Please select a vehicle number to load', 'error');
            return;
        }
        if (this.selectedBookings.length === 0) {
            Swal.fire('Error', 'Please select a bookings to load', 'error');
            return;
        }
        const startYear = this.date.getFullYear();
        let startMonth: number = this.date.getMonth() + 1;
        if (startMonth < 10) {
            startMonth = parseInt('0' + startMonth, 0 );
        }
        let startDay = this.date.getDate();
        if (startDay < 10) {
            startDay = parseInt('0' + startDay, 0);
        }
        const tripDate = startYear + '-' + startMonth + '-' + startDay;
        this.apiService.getAll(this.apiUrls.loadToVehicle + truckId.id, {ids: this.selectedBookings, tripDate}).subscribe((res: any) => {
           if (res) {
               this.tripSheets = res;
               this.vehicleRegNo  = truckId;
               this.modalService.open(modal, {size: 'lg'});
               this.selectedBookings = [];
               // this.getLoadingSheetData();
           }
        }, error => {
            Swal.fire('Error unloading bookings', error.message, 'error');
        });
    }

    selectTripSheet(id: any): void {
        this.apiService.create(this.apiUrls.addBookingsToTripSheet + id, this.selectedBookings).subscribe((res: any) => {
            if (res) {
                this.modalService.dismissAll();
                this.getLoadingSheetData();
                Swal.fire('Success', 'Successfully Loaded', 'success');
            }
        }, error => {
            Swal.fire('Error loading bookings to Tripsheet', error.message, 'error');
        });
    }

    createTripSheet(): void {
        this.apiService.create(this.apiUrls.createTripSheet + this.vehicleRegNo.id, this.selectedBookings).subscribe((res: any) => {
            if (res) {
                Swal.fire('Success', 'Successfully created Tripsheet', 'success');
                this.modalService.dismissAll();
                this.getLoadingSheetData();
            }
        }, error => {
            Swal.fire('Error loading bookings to Tripsheet', error.message, 'error');
        });
    }
}
