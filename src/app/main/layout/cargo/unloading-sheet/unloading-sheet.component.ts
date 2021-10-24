import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-unloading-sheet',
    templateUrl: './unloading-sheet.component.html',
    styleUrls: ['./unloading-sheet.component.css']
})
export class UnloadingSheetComponent implements OnInit {

    public currentUser: any;
    public branchOffices: Array<any> = [];
    public errorMessage: any;
    public cargoBookings: Array<any> = [];
    filterObj: any = {toBranchId: ''};
    filterByStatus: any = 'All';
    filterString: any;
    public allBookings: Array<any> = [];
    public vehicles: Array<any> = [];
    public total: any;
    public paidCargoBooking: any;
    public toPayCargoBooking: any;
    public truckId: any;
    public selectedBookings: Array<any> = [];

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.filterObj.toBranchId = this.currentUser.branchOfficeId;
        this.loadBranchOffice();
        this.getCargoUnloadingSheetData();
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

    getCargoUnloadingSheetData(): void {
        this.apiService.getAll(this.apiUrls.getBookingsForUnloading, this.filterObj).subscribe((res: any) => {
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
            this.currentUser.userName + '_UnloadingSheet', '', '');
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
                                        this.getCargoUnloadingSheetData();
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

    unload(): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to Unload the selected bookings?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Unload it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.apiService.getAll(this.apiUrls.unloadVehicle, this.selectedBookings).subscribe((res: any) => {
                    if (res) {
                        Swal.fire(
                            'Unloaded!',
                            'Your booking has been Unloaded.',
                            'success'
                        );
                        this.selectedBookings = [];
                        this.getCargoUnloadingSheetData();
                    }
                }, error => {
                    Swal.fire(
                        'Error!',
                        error.message,
                        'error'
                    );
                });
            }
        });
    }
}
