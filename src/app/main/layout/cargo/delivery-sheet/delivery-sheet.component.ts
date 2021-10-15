import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import {ViewCargoBookingComponent} from '../view-cargo-booking/view-cargo-booking.component';
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

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router,
                private viewCargo: ViewCargoBookingComponent) {
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
        this.viewCargo.initiateDeliverCargoBooking(id);
    }

    addComment(id: any): void {
        this.viewCargo.addCommentToBooking(id);
    }

    togglelBookingSelection(bookingId: any): void {
        const idx = this.selectedBookings.indexOf(bookingId);
        if (idx > -1) {
            this.selectedBookings.splice(idx, 1);
        } else {
            this.selectedBookings.push(bookingId);
        }
    }

    cancelBookings(id: any): void {
        this.viewCargo.cancelCargoBooking(id);
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
        this.apiService.getAll(this.apiUrls.countDeliveredBookings, this.deliveredObj).subscribe((count: any) => {
            if (count > 0) {
                this.deliveredBookingsCount = count;
                OnlynumberDirective.pagination(count, this.deliveredObj);
                this.loadDeliveredBookings();
            }
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
