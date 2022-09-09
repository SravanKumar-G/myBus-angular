import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-delivery-sheet',
    templateUrl: './delivery-sheet.component.html',
    styleUrls: ['./delivery-sheet.component.css']
})
export class DeliverySheetComponent implements OnInit {
    tab = 1;
    public currentUser: any;
    public branchOffices: Array<any> = [];
    public errorMessage: any;
    public cargoBookings: Array<any> = [];
    filterObj: any = {toBranchId: ''};
    filterString: any;
    public allBookings: Array<any> = [];
    public vehicles: Array<any> = [];
    public users: Array<any> = [];
    public total: any;
    public paidCargoBooking: any;
    public toPayCargoBooking: any;
    public truckId: any;
    public branchCashBalances: Array<any> = [];
    public cashBalances: any;
    selectedBookings: Array<any> = [];
    sortOrder = 'deliveredBy';
    orderBy = 'asc';
    deliveredObj: any = {
        page: 1,
        size: 100,
        pageSizes: [],
        sort: this.sortOrder + ',' + this.orderBy
    };
    public deliveredBookingsCount: any;
    startDate: any =  '';
    endDate: any = '';

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.filterObj.toBranchId = this.currentUser.branchOfficeId;
        this.loadBranchOffices();
        this.tabChange(this.tab);
    }

    tabChange(tabKey: any): void {
        this.tab = tabKey ? tabKey : 1;
        switch (this.tab) {
            case 1:
                this.loadUndeliveredBookings();
                break;
            case 2:
                this.loadVehicles();
                this.loadUsers();
                this.countOfDeliveredBookings();
                break;
            default:
                this.loadUndeliveredBookings();
                break;
        }

    }


    loadBranchOffices(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res;
                this.branchOffices.unshift({name: 'All'});
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    loadUndeliveredBookings(): void {
        this.apiService.getAll(this.apiUrls.getBookingsForDelivery, this.filterObj).subscribe((res: any) => {
            if (res) {
                this.cargoBookings = res;
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
                this.getBranchCashBalances();
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    getBranchCashBalances(): void {
        this.branchCashBalances = [];
        this.apiService.get(this.apiUrls.branchCashBalances + this.filterObj.toBranchId).subscribe((res: any) => {
            if (res) {
                this.cashBalances = res;
                let i;
                for (i = 0; i < this.cashBalances.length; i++) {
                    const obj = {
                        fullName: undefined,
                        balance: undefined
                    };
                    if (this.cashBalances[i].amountToBePaid !== 0) {
                        obj.fullName = this.cashBalances[i].fullName;
                        obj.balance = this.cashBalances[i].amountToBePaid;
                        this.branchCashBalances.push(obj);
                    }
                }
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    gotoBooking(shipmentNumber: any): void {
        this.router.navigate(['viewCargoBooking', shipmentNumber]);
    }

    initiateDeliverCargoBooking(id: any): void {
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
                        + id, data)
                        .subscribe((response: any) => {
                            if (response) {
                                Swal.fire('Great!', response.shipmentNumber + ' has been delivered', 'success');
                                this.loadUndeliveredBookings();
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
                                        this.loadUndeliveredBookings();
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

    toggleBookingSelection(bookingId: any): void {
        const idx = this.selectedBookings.indexOf(bookingId);
        if (idx > -1) {
            this.selectedBookings.splice(idx, 1);
        } else {
            this.selectedBookings.push(bookingId);
        }
    }

    cancelBookings(id: any): void {
        if (id) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to cancel this booking now?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.update(this.apiUrls.cancelCargoBooking + id, {}).subscribe((res: any) => {
                        if (res) {
                            Swal.fire(
                                'Cancelled!',
                                'Your booking has been Cancelled.',
                                'success'
                            );
                            this.loadUndeliveredBookings();
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

    exportToExcel(): void {
        this.apiService.exportExcel('cargoBookings',
            this.currentUser.userName + '_Undelivered Bookings', '', '');
    }

    loadVehicles(): void {
       this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
           if (res) {
               this.vehicles = res.content;
           }
       });
    }

    loadUsers(): void {
        this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
            if (res) {
                this.users = res;
            }
        });
    }

    countOfDeliveredBookings(): void {
        this.deliveredObj.startDate = this.apiService.getDate(this.startDate);
        this.deliveredObj.endDate = this.apiService.getDate(this.endDate);
        for (const [key, value] of Object.entries(this.deliveredObj)) {
            if (value === null || value === undefined || value === '' ) {
                delete this.deliveredObj[key];
            }
        }
        this.apiService.getAll(this.apiUrls.countDeliveredBookings, this.deliveredObj).subscribe((count: any) => {
            // if (count) {
                this.deliveredBookingsCount = count;
                OnlynumberDirective.pagination(count, this.deliveredObj);
                // this.cargoBookings = [];
                this.loadDeliveredBookings();
            // }
        });
    }

    loadDeliveredBookings(): void {
        this.apiService.getAll(this.apiUrls.deliveredBookings, this.deliveredObj).subscribe((res: any) => {
            if (res) {
                this.cargoBookings = res.content;
            }
        });
    }

    exportDeliveredDataToExcel(): void {
        this.apiService.exportExcel('deliveredCargoBookings',
            this.currentUser.userName + '_Delivered Bookings', '', '');
    }

    handlePageChange($event: number): void {
        this.deliveredObj.page = $event;
        this.countOfDeliveredBookings();
    }

    handlePageSizeChange(size: any): void {
        this.deliveredObj.size = size;
        this.deliveredObj.page = 1;
        this.countOfDeliveredBookings();
    }

    clickSorting($event: any): void {
        OnlynumberDirective.clickSorting($event, this.deliveredObj);
        this.countOfDeliveredBookings();
    }

    searchDeliveredData(): void {
        this.countOfDeliveredBookings();
       // if (!this.deliveredObj.startDate || !this.deliveredObj.endDate ||
       //     !this.deliveredObj.vehicleId || !this.deliveredObj.branchOffice || !this.deliveredObj.deliveredBy) {
       //     Swal.fire('Error', 'Please select at least one filter to Search', 'error');
       // }else{
       //     this.countOfDeliveredBookings();
       // }
    }
}
