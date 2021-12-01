import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';

@Component({
    selector: 'app-cargo-bookings',
    templateUrl: './cargo-bookings.component.html',
    styleUrls: ['./cargo-bookings.component.css']
})
export class CargoBookingsComponent implements OnInit {

    cargoBookings: Array<any> = [];
    public branchOffices: Array<any> = [];
    public users: Array<any> = [];
    cargoBookingsCount: any;
    filterObj: any = {
        fromBranchId: '',
        toBranchId: '',
        bookedBy: '',
        status: '',
        paymentType: '',
        startDate: new Date(),
        endDate: new Date()
    };
    sortOrder = 'createdAt';
    orderBy = 'desc';
    pagination: any = {
        count: 0,
        size: 100,
        page: 1,
        pageSizes: [10, 100],
        sortOrder: 'desc',
        orderBy: 'createdAt',
        sort: this.sortOrder + ',' + this.orderBy,
    };
    public errorMessage: any;
    public currentUser: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.loadCargoBookingsCount(this.pagination);
        this.loadBranchOffice();
        this.loadUsers();
    }

    loadCargoBookingsCount(data: any): void {
        for (const [key, value] of Object.entries(data)) {
            if (value === null || value === undefined || value === '') {
                delete data[key];
            }
        }
        this.apiService.getAll(this.apiUrls.cargoBookingsCount, data).subscribe((count: any) => {
            if (count > 0) {
                this.cargoBookingsCount = count;
                OnlynumberDirective.pagination(count, this.pagination);
                this.getAllCargoBookings(data);
            } else {
                Swal.fire('error', 'There are no Cargo Bookings', 'error');
            }
        });
    }

    getAllCargoBookings(data: any): void {
        this.apiService.getAll(this.apiUrls.cargoBookings, data).subscribe((shipments: any) => {
            if (shipments) {
                this.cargoBookings = shipments;
            } else {
                Swal.fire('error', 'There are no Cargo Bookings', 'error');
            }
        });
    }

    navigateToNewBooking(): void {
        this.router.navigate(['newBooking']);
    }

    initiateDeliverCargoBooking(bookingId: any): void {
        Swal.fire({
            title: '<h4>' + 'Deliver Comment?' + '</h4>',
            html: 'Please provide delivery comment:',
            input: 'text',
            inputPlaceholder: 'Collecting person name or identification',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Deliver',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            preConfirm: (data) => {
                if (!data) {
                    Swal.showValidationMessage(
                        'Enter comment'
                    );
                } else {
                    this.apiService.update(this.apiUrls.initiateDeliverCargoBooking
                        + bookingId, data)
                        .subscribe((response: any) => {
                            if (response) {
                                Swal.fire('Great!', response.shipmentNumber + ' has been delivered', 'success');
                                this.loadCargoBookingsCount(this.pagination);
                                this.apiService.getLoggedInUserData();
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
                                        this.loadCargoBookingsCount(this.pagination);
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

    routing(id: any): void {
        this.router.navigate(['viewCargoBooking', id]);
    }

    exportToExcel(): void {
        this.apiService.exportExcel('cargoBookings',
            this.currentUser.userName + '_cargoBookings', '', '');
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

    loadUsers(): void {
        this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
            if (res) {
                this.users = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    handlePageChange($event: number): void {
        this.pagination.page = $event;
        this.loadCargoBookingsCount(this.pagination);
    }

    handlePageSizeChange(size: any): void {
        this.pagination.size = size;
        this.pagination.page = 1;
        this.loadCargoBookingsCount(this.pagination);
    }

    clickSorting($event: any): void {
        OnlynumberDirective.clickSorting($event, this.pagination);
        this.loadCargoBookingsCount(this.pagination);
    }
}
