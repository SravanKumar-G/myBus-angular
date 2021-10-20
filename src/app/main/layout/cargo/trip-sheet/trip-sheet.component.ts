import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-trip-sheet',
    templateUrl: './trip-sheet.component.html',
    styleUrls: ['./trip-sheet.component.css']
})
export class TripSheetComponent implements OnInit {
    public vehicles: Array<any> = [];
    public errorMessage: any;
    public filterObj: any = {};
    public tripSheetData: Array<any> = [];
    public titleHeader: any;
    tripSheet: any = {};
    description: any;
    amount: any;
    listOfStaff: Array<any> = [];
    staffData: Array<any> = [];
    public isEditable: any;
    public tripSheetSummary: any = {};
    public currentUser: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.getStaffList();
        this.loadVehicles();
        this.tripSheet.expenses = [];
        this.tripSheet.staff = [];
        this.searchTripSheet();
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

    searchTripSheet(): void {
        this.apiService.getAll(this.apiUrls.searchCargoTripSheet, this.filterObj).subscribe((res: any) => {
            if (res) {
                this.tripSheetData = res;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    exportToExcel(): void {
        this.apiService.exportExcel('tripSheet',
            this.currentUser.userName + '_CargoTripSheet', '', '');
    }

    editCargoTripSheet(tripSheet: any, status: string, modal: any): void {
        this.modalService.open(modal, {size: 'lg', backdrop: 'static'});
        if (tripSheet.id) {
            this.apiService.get(this.apiUrls.getCargoTripSheet + tripSheet.id).subscribe((res: any) => {
                if (res) {
                    this.tripSheet = res;
                    if (status === 'edit') {
                        this.titleHeader = 'Edit Trip Sheet for trip# ' + this.tripSheet.tripNumber +
                            ' vehicle: ' + this.tripSheet.attrs.vehicleNumber + ' on ' + this.tripSheet.dispatchDateStr;
                        this.isEditable = false;
                    } else {
                        this.titleHeader = 'View Trip Sheet for trip# ' + this.tripSheet.tripNumber +
                            ' vehicle: ' + this.tripSheet.attrs.vehicleNumber + ' on ' + this.tripSheet.dispatchDateStr;
                        this.isEditable = true;
                    }
                    if (this.tripSheet.expenses === null) {
                        this.tripSheet.expenses = [];
                    }
                    if (this.tripSheet.staff === null) {
                        this.tripSheet.staff = [];
                    } else {
                        this.staffData = this.tripSheet.staff;
                    }
                }
            });
        }
    }

    getStaffList(): void {
        this.apiService.getAll(this.apiUrls.getStaffList, {}).subscribe((res: any) => {
            if (res) {
                this.listOfStaff = res.content;
            }
        });
    }

    closeCargoTripSheet(tripSheet: any): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to close this sheet? Once done no changes can be made to the trip?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Close it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.apiService.update(this.apiUrls.closeTripSheet + tripSheet.id, {}).subscribe((res: any) => {
                    if (res) {
                        Swal.fire(
                            'Cancelled!',
                            'Your Trip has been Cancelled.',
                            'success'
                        );
                        this.searchTripSheet();
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

    viewCargoTripSheetSummary(tripSheet: any, cargoTripSheetSummary: any): void {
        this.modalService.open(cargoTripSheetSummary, {size: 'lg'});
        this.titleHeader = 'Trip Sheet Summary for ' + tripSheet.attrs.vehicleNumber;
        this.apiService.get(this.apiUrls.getTripSheetSummary + tripSheet.id).subscribe((res: any) => {
            if (res) {
                this.tripSheetSummary = res;
            }
        });
    }

    closeModal(): void {
        this.modalService.dismissAll();
        this.staffData = [];
    }

    addExpenseItem(description: any, amount: any): void {
        if (description && amount) {
            this.tripSheet.expenses.push({description, amount});
            this.description = '';
            this.amount = '';
            this.errorMessage = '';
        } else {
            this.errorMessage = 'Enter Description and Amount';
        }
    }

    removeExpenseItem(index: any): void {
        this.tripSheet.expenses.splice(index, 1);
    }

    onStaffSelectData(staffData: any): void {
        if (staffData) {
            this.staffData = staffData;
        }
    }

    updateTripSheet(): void {
        this.tripSheet.staff = this.staffData;
        this.apiService.create(this.apiUrls.updateTripSheet, this.tripSheet).subscribe((res: any) => {
            if (res) {
                this.tripSheet = {};
                Swal.fire('Updated!', 'Successfully Updated!', 'success');
                this.searchTripSheet();
                this.staffData = [];
                this.closeModal();
            }
        });
    }

    removeStaff(index: any): void {
        this.staffData.splice(index, 1);
    }
}
