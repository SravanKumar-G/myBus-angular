import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-salary-reports',
    templateUrl: './salary-reports.component.html',
    styleUrls: ['./salary-reports.component.css']
})
export class SalaryReportsComponent implements OnInit {
    public tab = 1;
    public isPaid = false;
    public salaryReportsCount: any;
    public currentPageOfData: Array<any> = [];
    sortOrder = 'tripDate';
    orderBy = 'asc';
    public pagination: any = {
        page: 1,
        size: 20,
        pageSizes: [],
        sort: this.sortOrder + ',' + this.orderBy
    };
    selection: any;
    selectedPayments: Array<any> = [];
    private currentUser: any;
    public currentPageOfPaidData: Array<any> = [];
    vehicles: Array<any> = [];
    staffList: Array<any> = [];
    toDate: any;
    fromDate: any;
    vehicleId: any;
    staffId: any;
    public query: any = {};

    constructor(
        private apiService: ApiServiceService,
        private apiUrls: ApiUrls
    ) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.tabChange(this.tab);
        this.getStaff();
        this.getVehicles();
    }

    getStaff(): void {
        this.apiService.getAll(this.apiUrls.getStaffList, {}).subscribe((res: any) => {
            if (res) {
                this.staffList = res.content;
            }
        });
    }

    getVehicles(): void {
        this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
            if (res) {
                this.vehicles = res.content;
            }
        });
    }

    tabChange(tabKey: any): void {
        this.tab = tabKey ? tabKey : 1;
        switch (this.tab) {
            case 1:
                this.isPaid = false;
                this.pagination.page = 1;
                this.resetFilters();
                this.getSalaryReportsCount();
                break;
            case 2:
                this.isPaid = true;
                this.pagination.page = 1;
                this.resetFilters();
                this.getSalaryReportsCount();
                break;
            default:
                this.isPaid = false;
                this.getSalaryReportsCount();
                break;
        }
    }

    public getSalaryReportsCount(): void {
        for (const [key, value] of Object.entries(this.pagination)) {
            if (value === null || value === undefined || value === '') {
                delete this.pagination[key];
            }
        }
        this.pagination.isPaid = this.isPaid;
        this.salaryReportsCount = 0;
        this.apiService.getAll(this.apiUrls.getSalaryReportsCount, this.pagination).subscribe((count: any) => {
            if (count > 0) {
                this.salaryReportsCount = count;
                OnlynumberDirective.pagination(count, this.pagination);
                if (!this.isPaid) {
                    this.getSalaryReportsDetails();
                } else {
                    this.getPaidSalaryReportsDetails();
                }
            }else {
                this.currentPageOfData = [];
                this.currentPageOfPaidData = [];
            }
        });
    }

    public getSalaryReportsDetails(): void {
        this.apiService.getAll(this.apiUrls.getSalaryReports, this.pagination).subscribe((data: any) => {
            if (data) {
                this.currentPageOfData = data.content;
            }
        });
    }

    public getPaidSalaryReportsDetails(): void {
        this.pagination.isPaid = this.isPaid;
        this.apiService.getAll(this.apiUrls.getSalaryReports, this.pagination).subscribe((data: any) => {
            if (data) {
                let i;
                for (i = 0; i < data.content.length; i++) {
                    data.content[i].paidBy = JSON.parse(data.content[i].paidBy);
                }
                this.currentPageOfPaidData = data.content;
            }
        });
    }

    toggleSalaryReportSelection(paymentId: any): void {
        const idx = this.selectedPayments.indexOf(paymentId);
        if (idx > -1) {
            this.selectedPayments.splice(idx, 1);
        } else {
            this.selectedPayments.push(paymentId);
        }
    }

    handlePageChange($event: number): void {
        this.pagination.page = $event;
        this.getSalaryReportsCount();
    }

    handlePageSizeChange(size: any): void {
        this.pagination.size = size;
        this.pagination.page = 1;
        this.getSalaryReportsCount();
    }

    clickSorting($event: any): void {
        OnlynumberDirective.clickSorting($event, this.pagination);
        this.getSalaryReportsCount();
    }

    paySalary(): void {
        this.query = {selectedPayments: this.selectedPayments};
        console.log(this.selectedPayments);
        Swal.fire({
            title: 'Payment',
            html: 'Please enter amount to be paid:',
            input: 'text',
            inputPlaceholder: 'enter salary amount',
            showCancelButton: true,
            confirmButtonText: 'Pay',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            preConfirm: (amountPaid) => {
                if (!amountPaid) {
                    Swal.showValidationMessage(
                        'Enter Amount'
                    );
                } else {
                    this.query.amountPaid = amountPaid;
                    this.apiService.create(this.apiUrls.paySalaryForSelected, this.query)
                        .subscribe((response: any) => {
                            if (response) {
                                Swal.fire('Great!', 'Payment done for Selected Staffs', 'success');
                                this.getSalaryReportsCount();
                                this.apiService.getLoggedInUserData();
                            }
                        }, (error) => {
                            Swal.showValidationMessage(
                                `Enter amount :` + error
                            );
                        });
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }

    exportPendingData(): void {
        this.apiService.exportExcel('pendingData',
            this.currentUser.userName + '_PendingSalaryReports', '', '');
    }

    exportPaidData(): void {
        this.apiService.exportExcel('paidData',
            this.currentUser.userName + '_PaidSalaryReports', '', '');
    }

    searchSalaryReports(): void {
        if (this.fromDate) {
           this.pagination.fromDate =  this.apiService.getDate(this.fromDate);
        }
        if (this.toDate) {
            this.pagination.toDate =  this.apiService.getDate(this.toDate);
        }
        if (this.vehicleId) {
            this.pagination.vehicleId = this.vehicleId;
        }
        if (this.staffId) {
            this.pagination.staffId = this.staffId;
        }
        this.getSalaryReportsCount();
    }

    resetFilters(): void {
        this.pagination.fromDate = this.fromDate = '';
        this.pagination.toDate = this.toDate = '';
        this.pagination.vehicleId = this.vehicleId = '';
        this.pagination.staffId = this.staffId = '';
    }
}
