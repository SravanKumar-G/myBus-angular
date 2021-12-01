import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-new-booking',
    templateUrl: './new-booking.component.html',
    styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {
    newBooking: any = {
        fromBranchId: '',
        toBranchId: '',
        dispatchDate: new Date(),
        copySenderDetails: false,
        paymentType: '',
        items: [
            {
                description: '',
                value: '',
                quantity: '',
                weight: '',
                charge: ''
            }
        ]
    };
    branchOffices: Array<any> = [];
    shipmentTypes: Array<any> = [];
    users: Array<any> = [];
    public currentUser: any;
    public errorMessage: any;
    public isDisabled = false;
    public bookingId: any;
    public searchData: any;

    constructor(
        private router: Router,
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private actRoute: ActivatedRoute
    ) {
        this.searchData = this.actRoute.snapshot.params.data || '';
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.loadBranchOffice();
        this.getShipmentTypes();
        this.loadUsers();
        console.log(this.searchData);
    }

    loadBranchOffice(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res;
                this.newBooking.fromBranchId = this.currentUser.branchOfficeId;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    getShipmentTypes(): void {
        this.apiService.get(this.apiUrls.getShipmentTypes).subscribe((res: any) => {
            if (res) {
                this.shipmentTypes = res;
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

    addItems(item: any): void {
        if (!item.description && !item.value && !item.quantity && !item.weight && !item.charge) {
            Swal.fire('error', 'Please enter Item Details', 'error');
        } else {
            this.newBooking.items.push({index: this.newBooking.items.length + 1});
        }
    }

    deleteItem(index: any): void {
        if (this.newBooking.items.length === 1) {
            this.errorMessage = 'You can not Delete this (Please add at least one item)';
        } else {
            this.newBooking.items.splice(index, 1);
        }
    }

    getTotalPrice(): any {
        this.newBooking.totalCharge = 0;
        this.newBooking.loadingCharge = 0;
        let index;
        for (index = 0; index < this.newBooking.items.length; index++) {
            if (this.newBooking.items[index].quantity) {
                this.newBooking.loadingCharge += this.newBooking.items[index].quantity * 10;
            }
            if (this.newBooking.items[index].charge) {
                this.newBooking.totalCharge += parseFloat(this.newBooking.items[index].charge);
            }
        }
        if (this.newBooking.loadingCharge) {
            this.newBooking.totalCharge += parseFloat(this.newBooking.loadingCharge);
        }
        if (this.newBooking.unloadingCharge) {
            this.newBooking.totalCharge += parseFloat(this.newBooking.unloadingCharge);
        }
        if (this.newBooking.otherCharge) {
            this.newBooking.totalCharge += parseFloat(this.newBooking.otherCharge);
        }
        return this.newBooking.totalCharge;
    }

    calculateTotal(): any {
    }

    save(): void {
        if (!this.newBooking.fromBranchId) {
            this.errorMessage = 'Please select From Branch Office';
        } else if (!this.newBooking.toBranchId) {
            this.errorMessage = 'Please select To Branch Office';
        } else if (!this.newBooking.paymentType) {
            this.errorMessage = 'Please select Shipment Type';
        } else if (!this.newBooking.fromContact) {
            this.errorMessage = 'Please enter Sender Contact Number';
        } else if (!this.newBooking.fromName) {
            this.errorMessage = 'Please enter Sender Name';
        } else if (!this.newBooking.toContact) {
            this.errorMessage = 'Please enter Receiver Contact Number';
        } else if (!this.newBooking.toName) {
            this.errorMessage = 'Please enter Receiver Name';
        } else {
            this.apiService.create(this.apiUrls.saveNewCargoBooking, this.newBooking).subscribe((res: any) => {
                if (res) {
                    Swal.fire('success', 'Cargo booking added Successfully..!', 'success');
                    this.router.navigate(['viewCargoBooking', res.id]);
                    // this.router.navigate(['cargoBookings']);
                    this.apiService.getLoggedInUserData();
                }
            }, error => {
                this.errorMessage = error.message;
            });
        }
    }

    close(): void {
        this.router.navigate(['cargoBookings']);
    }

    copySenderDetails(booleanValue: any): any {
        if (booleanValue) {
            this.isDisabled = true;
            this.newBooking.toContact = this.newBooking.fromContact;
            this.newBooking.toName = this.newBooking.fromName;
            this.newBooking.toEmail = this.newBooking.fromEmail;
        } else {
            this.isDisabled = false;
        }
    }

    getDetailsForContact(type: any): void {
        if (type === 'from' && this.newBooking.fromContact.length === 10) {
            this.apiService.get(this.apiUrls.findContactInfoFromPreviousBookings
                + '?contactType=' + type
                + '&contact=' + this.newBooking.fromContact)
                .subscribe((res: any) => {
                    if (res) {
                        this.newBooking.fromName = res.name;
                        this.newBooking.fromEmail = res.email;
                    }
                }, error => {
                    Swal.fire('error', error.message, 'error');
                });
        } else if (type === 'to' && this.newBooking.toContact.length === 10) {
            this.apiService.get(this.apiUrls.findContactInfoFromPreviousBookings
                + '?contactType=' + type
                + '&contact=' + this.newBooking.toContact)
                .subscribe((res: any) => {
                    if (res) {
                        this.newBooking.toName = res.name;
                        this.newBooking.toEmail = res.email;
                    }
                }, error => {
                    Swal.fire('error', error.message, 'error');
                });
        }
    }

    cargoSearchById(id: any): void {
        if (!id) {
            Swal.fire('error', 'Enter the bookingId for search', 'error');
        }else{
            this.router.navigate(['viewCargoBooking', id]);
        }
    }

    callingData($event: any): void {
        console.log($event);
    }
}
