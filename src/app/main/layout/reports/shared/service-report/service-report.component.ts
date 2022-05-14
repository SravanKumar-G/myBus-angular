import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
// @ts-ignore
import * as _ from 'underscore';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import {ChangeDetectorRef} from '@angular/core';

@Component({
    selector: 'app-service-report',
    templateUrl: './service-report.component.html',
    styleUrls: ['./service-report.component.css']
})
export class ServiceReportComponent implements OnInit {
    private serviceId: any;
    public serviceReportDetails: any = {
        fuelExpenses: [],
        expenses: [],
        staffDetails: []
    };
    public currentUser: any;
    public vehicles: Array<any> = [];
    public agents: Array<any> = [];
    private differenceAmountRatio = 99;
    suppliers: Array<any> = [];
    public allStaff: Array<any> = [];
    public allStaffDuplicate: Array<any> = [];
    newStaffId: any;
    selectedStaffId: any;
    public agent: any;
    public branchOffices: Array<any> = [];
    public serviceReports: Array<any> = [];
    public indexCount = 0;
    private currentDate: any;

    constructor(
        private apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private actRoute: ActivatedRoute,
        public modalService: NgbModal,
        public router: Router,
        private location: Location,
        private ref: ChangeDetectorRef
    ) {
        this.serviceId = this.actRoute.snapshot.params.id || '';
        this.indexCount = this.actRoute.snapshot.params.index || 0;
    }

    ngOnInit(): void {
        if (this.actRoute.snapshot.params.date) {
            this.currentDate = this.actRoute.snapshot.params.date;
            this.loadReports();
        }
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        if (this.serviceId) {
            this.getServiceReport('');
        } else {
            Swal.fire('error', 'Did not find any Service Id', 'error');
        }

        this.getAllVehicles();
        this.getAgentNames();
        this.getSuppliers();
        this.getStaffList();
        this.loadBranchOffices();
    }

        loadReports(): void {
            const dateObj = this.apiService.getYYYYMMDD(this.currentDate);
            this.apiService.get(this.apiUrls.loadServiceReports + dateObj).subscribe((res: any) => {
                if (res) {
                    this.serviceReports = res;
                }
            }, error => {
                Swal.fire('Oops...', error.message, 'error');
            });
        }

    getServiceReport(service: any): void {
        if (service) {
            this.serviceId = service.id;
        }
        this.apiService.get(this.apiUrls.getServiceReportDetails + this.serviceId).subscribe((res: any) => {
            if (res) {
                if (res.fuelExpenses.length > 0) {
                    for (const data of res.fuelExpenses) {
                        data.journeyDate = new Date(data.journeyDate);
                    }
                }
                this.serviceReportDetails = res;
                this.countSeats();
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    getAllVehicles(): void {
        this.apiService.get(this.apiUrls.getAllVehicleNumbers).subscribe((res: any) => {
            if (res) {
                this.vehicles = res;
            }
        });
    }

    getAgentNames(): void {
        this.apiService.get(this.apiUrls.getAgentNames).subscribe((res: any) => {
            if (res) {
                this.agents = res;
            }
        });
    }

    getSuppliers(): void {
        this.apiService.get(this.apiUrls.getSuppliers).subscribe((res: any) => {
            if (res) {
                this.suppliers = res;
            }
        });
    }

    getStaffList(): void {
        this.apiService.getAll(this.apiUrls.getStaffList, {}).subscribe((res: any) => {
            if (res) {
                this.allStaff = res.content;
                this.allStaffDuplicate = res.content;
            }
        });
    }

    updateOdometerReading(): void {
        this.apiService.get(this.apiUrls.updateVehicleRegNo + this.serviceReportDetails.vehicleRegNumber).subscribe((res: any) => {
            if (res) {
                this.serviceReportDetails.oldOdometerReading = res;
            }
        });
    }

    rateToBeVerified(booking: any): any {
        return booking.requireVerification || (booking.netAmt < (booking.originalCost * this.differenceAmountRatio / 100));
    }

    isCashBooking(booking: any): any {
        return booking.paymentType === 'CASH';
    }

    editAgent(bookedBy: any, modal: any): void {
        if (bookedBy) {
            let i;
            for (i = 0; i < this.agents.length; i++) {
                if (this.agents[i].username === bookedBy) {
                    this.agent = this.agents[i];
                }
            }
            this.modalService.open(modal);
        }else{
            Swal.fire('error', 'Select agent', 'error');
        }
    }

    countSeats(): void {
        let seatsCount = 0;
        let i;
        for (i = 0; i < this.serviceReportDetails.bookings.length; i++) {
            if (this.serviceReportDetails.bookings[i].seats) {
                seatsCount += this.serviceReportDetails.bookings[i].seats.split(',').length;
            }
        }
        this.serviceReportDetails.totalSeats = seatsCount;
    }

    isOnlineBooking(booking: any): any {
        return booking.bookingType === '4' || booking.bookedOnline;
    }

    checkDues(event: any, changedBooking: any): any {
        if (changedBooking) {
            const bookedBy = changedBooking.name.toLowerCase();
            if (bookedBy.indexOf('buspay') !== -1 || bookedBy.indexOf('bus pay') !== -1
                || bookedBy.indexOf('buspa') !== -1) {
                alert('bus pay can not be set to due');
                changedBooking.due = false;
                event.stopPropagation();
                return false;
            }
        }
        this.calculateNet(changedBooking);
    }
    calculateNet(changedBooking: any): any {
        this.serviceReportDetails.netCashIncome = 0;
        this.serviceReportDetails.grossIncome = 0;
        let expenseTotal = 0;
        // if the net amount is 13% less than original cost
        if (changedBooking) {
            changedBooking.requireVerification = Math.abs(changedBooking.netAmt) <
                (changedBooking.originalCost * this.differenceAmountRatio / 100);
            const bookingsToBeVerified = _.find(this.serviceReportDetails.bookings, (booking: { requireVerification: boolean; }) => {
                return booking.requireVerification;
            });
            this.serviceReportDetails.requiresVerification = bookingsToBeVerified != null;
        }
        let i;
        for (i = 0; i < this.serviceReportDetails.bookings.length; i++) {
            const booking = this.serviceReportDetails.bookings[i];
            if (this.isCashBooking(booking) && booking.netAmt && booking.netAmt !== '') {
                if (!booking.due) {
                    this.serviceReportDetails.netCashIncome += parseFloat(booking.netAmt);
                }
            }
            this.serviceReportDetails.grossIncome += parseFloat(booking.netAmt);
        }
        let j;
        for (j = 0; j < this.serviceReportDetails.expenses.length; j++) {
            const expense = this.serviceReportDetails.expenses[j];
            if (expense.amount && expense.amount !== '') {
                expenseTotal += parseFloat(expense.amount);
            }
        }
        if (!isNaN(this.serviceReportDetails.police)) {
            expenseTotal += this.serviceReportDetails.police;
        }
        if (!isNaN(this.serviceReportDetails.tollFee)) {
            expenseTotal += this.serviceReportDetails.tollFee;
        }
        if (!isNaN(this.serviceReportDetails.driverBatta)) {
            expenseTotal += this.serviceReportDetails.driverBatta;
        }
        if (!isNaN(this.serviceReportDetails.pooja)) {
            expenseTotal += this.serviceReportDetails.pooja;
        }
        if (!isNaN(this.serviceReportDetails.repair)) {
            expenseTotal += this.serviceReportDetails.repair;
        }
        if (!isNaN(this.serviceReportDetails.parking)) {
            expenseTotal += this.serviceReportDetails.parking;
        }
        if (!isNaN(this.serviceReportDetails.luggageCommission)) {
            expenseTotal += this.serviceReportDetails.luggageCommission;
        }
        this.serviceReportDetails.netCashIncome -= expenseTotal;

        if (this.serviceReportDetails.luggageIncome) {
            this.serviceReportDetails.netCashIncome += parseFloat(this.serviceReportDetails.luggageIncome);
            this.serviceReportDetails.grossIncome += parseFloat(this.serviceReportDetails.luggageIncome);
        }
        if (this.serviceReportDetails.advance) {
            this.serviceReportDetails.netCashIncome += parseFloat(this.serviceReportDetails.advance);
        }
        if (this.serviceReportDetails.onRoadServiceIncome) {
            this.serviceReportDetails.netCashIncome += parseFloat(this.serviceReportDetails.onRoadServiceIncome);
            this.serviceReportDetails.grossIncome += parseFloat(this.serviceReportDetails.onRoadServiceIncome);
        }
        if (this.serviceReportDetails.otherIncome) {
            this.serviceReportDetails.netCashIncome += parseFloat(this.serviceReportDetails.otherIncome);
            this.serviceReportDetails.grossIncome += parseFloat(this.serviceReportDetails.otherIncome);
        }
        this.serviceReportDetails.netCashIncome = this.serviceReportDetails.netCashIncome.toFixed(2);
        this.serviceReportDetails.netIncome = this.serviceReportDetails.grossIncome;

        if (!isNaN(this.serviceReportDetails.fuelExpense)) {
            expenseTotal += this.serviceReportDetails.fuelExpense;
        }
        if (!isNaN(this.serviceReportDetails.insurance)) {
            expenseTotal += this.serviceReportDetails.insurance;
        }
        if (!isNaN(this.serviceReportDetails.roadTax)) {
            expenseTotal += this.serviceReportDetails.roadTax;
        }
        if (!isNaN(this.serviceReportDetails.salary)) {
            expenseTotal += this.serviceReportDetails.salary;
        }
        if (!isNaN(this.serviceReportDetails.tollFasttag)) {
            expenseTotal += this.serviceReportDetails.tollFasttag;
        }

        this.serviceReportDetails.netIncome -= expenseTotal;
        let k;
        for (k = 0; i < this.serviceReportDetails.bookings.length; k++) {
            const booking = this.serviceReportDetails.bookings[k];
            if (booking.due) {
                this.serviceReportDetails.netCashIncome -= parseFloat(booking.netAmt);
            }
        }
    }

    deleteBooking(booking: any): void {
        this.serviceReportDetails.bookings = _.filter(this.serviceReportDetails.bookings, (thisBooking: any) => {
            return thisBooking.index !== booking.index;
        });
        this.calculateNet(null);
        this.countSeats();
    }

    openPop(popover: any): any {
        popover.isOpen() ? popover.close() : popover.open();
    }

    addFuelExpense(): void {
        this.serviceReportDetails.fuelExpenses.push({index: this.serviceReportDetails.fuelExpenses.length, journeyDate: new Date()});
    }

    deleteFuelExpense(index: any): void {
        this.serviceReportDetails.fuelExpenses.splice(index, 1);
    }

    addBooking(): void {
        this.serviceReportDetails.bookings.push({
            index: this.serviceReportDetails.bookings.length,
            paymentType: 'CASH',
            ticketNo: 'SERVICE'
        });
    }

    addExpenses(): void {
        if (!this.serviceReportDetails.expenses) {
            this.serviceReportDetails.expenses = [];
        }
        this.serviceReportDetails.expenses.push({type: 'EXPENSE', index: this.serviceReportDetails.expenses.length + 1});
    }

    deleteExpense(index: any): void {
        this.serviceReportDetails.expenses.splice(index, 1);
        this.calculateNet(  null);
    }

    addStaff(): void {
        if (!this.serviceReportDetails.staffDetails) {
            this.serviceReportDetails.staffDetails = [];
        }
        if (!this.newStaffId) {
            Swal.fire('Error', 'Please select Staff', 'error');
        } else {
            this.serviceReportDetails.staffDetails.push(this.newStaffId);
        }
        // for (let j = 0; j < this.serviceReportDetails.staffDetails.length; j++) {
        //     this.allStaff = _.without(this.allStaff, _.findWhere(this.allStaff, {id: this.serviceReportDetails.staffDetails[j]}));
        // }
    }

    deleteStaff(index: any): void {
        this.serviceReportDetails.staffDetails.splice(index, 1);
    }

    onStaffSelect(newStaffId: any): void {
        this.selectedStaffId = newStaffId;
    }

    haltService(status: string): any {
        if (!this.serviceReportDetails.vehicleRegNumber) {
            Swal.fire('Error', 'Please select Vehicle', 'error');
            return;
        }
        this.serviceReportDetails.status = status;
        this.submitReport(status);
    }

    submit(status: string): any {
        this.submitReport(status);
    }

    requireVerification(): any {
        return !this.serviceReportDetails.invalid &&
            this.serviceReportDetails.requiresVerification &&
            this.serviceReportDetails.status !== 'SUBMITTED';
    }

    canSubmit(): any {
        // if (this.operatorAccount.skipAgentValidity === true) {
        //     this.serviceReportDetails.invalid = false;
        //     return true;
        // }
        if (this.serviceReportDetails.status === 'REQUIRE_VERIFICATION') {
            if (this.currentUser.canVerifyRates) {
                return true;
            }
        } else if (!this.serviceReportDetails.requiresVerification) {
            return (!this.serviceReportDetails.invalid && !this.serviceReportDetails.status);
        }
        return false;
    }

    launchAgents(): any {

    }

    submitReport(status: any): void {
        // console.log(this.serviceReportDetails);
        if (!this.serviceReportDetails.vehicleRegNumber) {
            Swal.fire('Error', 'Please select Vehicle', 'error');
            return;
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Submit it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.create(this.apiUrls.submitReport + status, this.serviceReportDetails).subscribe((res: any) => {
                        if (res) {
                            Swal.fire('Great', 'The report successfully submitted for' + res.serviceNumber, 'success');
                            // this.getServiceReport();
                            this.apiService.getLoggedInUserData();
                            this.goToReportsPage();
                        }
                    }, error => {
                        this.serviceReportDetails.status = null;
                        Swal.fire('Oops...', 'Error submitting the report :' + error.data.message, 'error');
                    });
                }
            });
        }
    }

    isDisabled(): any {
        if (this.serviceReportDetails.status === 'SUBMITTED') {
            return true;
        }else{
            return false;
        }
    }

    closeModal(): void {
       this.modalService.dismissAll();
    }

    updateAgent(): void {
        if (this.agent.id) {
            this.apiService.update(this.apiUrls.updateAgent, this.agent).subscribe((res: any) => {
                if (res) {
                    Swal.fire('success', 'Agent updated successfully..!', 'success');
                    this.modalService.dismissAll();
                    this.agent = {};
                }
            }, error => {
                Swal.fire('error', error.message, 'error');
            });
        }else {
            this.apiService.create(this.apiUrls.addAgent, this.agent).subscribe((res: any) => {
                if (res) {
                    Swal.fire('success', 'Agent added successfully..!', 'success');
                    this.modalService.dismissAll();
                    this.agent = {};
                }
            }, error => {
                Swal.fire('error', error.message, 'error');
            });
        }
    }

    loadBranchOffices(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    public goToReportsPage(): void {
        this.router.navigate(['serviceReports/' + this.actRoute.snapshot.params.date] );
    }

    nextAndPreviousService(status: any): void {
        if (status === 'decrement') {
            this.indexCount--;
        } else if (status === 'increment') {
            this.indexCount++;
        }
        const data = this.serviceReports[this.indexCount];
        if (data.attrs.formId) {
            this.router.navigate(['serviceReports/' + this.currentDate + '/serviceForm/' + data.attrs.formId + '/' + this.indexCount]);
        }else {
            this.getServiceReport(data);
            this.location.replaceState('/serviceReports/' + this.currentDate + '/serviceReport/' + data.id + '/' + this.indexCount);
        }
    }

}
