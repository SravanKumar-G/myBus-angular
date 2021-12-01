import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ApiServiceService} from '../../../../services/api-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import {Location} from '@angular/common';

@Component({
    selector: 'app-expense-income-reports',
    templateUrl: './expense-income-reports.component.html',
    styleUrls: ['./expense-income-reports.component.css']
})
export class ExpenseIncomeReportsComponent implements OnInit {

    public currentDate: any;
    public currentUser: any;
    public expenseIncomeList: Array<any> = [];
    public sortOrder = 'status';
    public orderBy = 'desc';
    public expenseAndIncomeQuery: any = {
        page: 1,
        size: 10,
        sort: this.sortOrder + ',' + this.orderBy,
    };
    public count: any;
    newDate: any = new Date();
    public totalExpense: any;
    public totalIncome: any;
    public service: any;
    public booking: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private modalService: NgbModal,
                private location: Location) {
    }

    ngOnInit(): void {
        this.currentDate = this.actRoute.snapshot.params.date || '';
        const date = new Date(this.currentDate);
        this.getDate(date);
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    }

    goToDashboard(): void {
        this.router.navigate(['']);
    }

    getDate(date: any): any {
        const dateObj = date;
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        this.currentDate = year + '-' + month + '-' + day;
        this.getAllExpenseAndIncome();
        this.location.replaceState('/expenseIncomeReports/' + this.currentDate);
        return year + '-' + month + '-' + day;
    }

    previousDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
        this.currentDate = this.getDate(new Date(date));
        this.location.replaceState('/expenseIncomeReports/' + this.currentDate);
    }

    nextDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
        if (new Date(date) < new Date()) {
            this.currentDate = this.getDate(new Date(date));
            this.location.replaceState('/expenseIncomeReports/' + this.currentDate);
        } else {
            Swal.fire('Oops...', 'U\'ve checked for future date, Check Later', 'error');
        }
    }

    exportToExcel(): void {
        this.apiService.exportExcel('expenseIncomesReports',
            this.currentUser.userName + '_expenseIncomesReports', '', '');
    }

    print(): void {
        const printContent = document.getElementById('report_left_inner');
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        // @ts-ignore
        WindowPrt.document.write(printContent.innerHTML);
        // @ts-ignore
        WindowPrt.document.close();
    }

    clickSorting($event: any): void {
        OnlynumberDirective.clickSorting($event, this.expenseAndIncomeQuery);
        this.getAllExpenseAndIncome();
    }

    getAllExpenseAndIncome(): void {
        this.totalExpense = 0;
        this.totalIncome = 0;
        const date = this.apiService.getExpenesDate(this.currentDate);
        this.apiService.get(this.apiUrls.expenseIncomeReportsData + 'date=' + date + '&page=' + this.expenseAndIncomeQuery.page +
            '&size=' + this.expenseAndIncomeQuery.size + '&sort=' + this.expenseAndIncomeQuery.sort).subscribe((res: any) => {
            if (res) {
                this.expenseIncomeList = res.content;
                this.count = res.totalElements;
                const totalExpense = 0;
                const totalIncome = 0;
                for (const item of this.expenseIncomeList) {
                    if (item.type === 'EXPENSE') {
                        this.totalExpense += totalExpense + item.amount;
                    } else {
                        this.totalIncome += totalIncome + item.amount;
                    }
                }
            }
        }, error => {
            Swal.fire('Error', error.message, 'error');
        });
    }


    serviceReportsPopUp(ServiceReportPopUp: any, expenseAndReports: any): void {
        this.apiService.get(this.apiUrls.getDetailsByFormId + expenseAndReports.serviceFormId).subscribe((res: any) => {
            if (res) {
                this.service = res;
                this.modalService.open(ServiceReportPopUp, {backdrop: 'static'});
            }
        });
    }

    closeModal(): void {
        this.modalService.dismissAll();
    }

    bookingDuePopUpExpenses(bookingDueModal: any, expenseAndReports: any): void {
        this.apiService.get(this.apiUrls.bookingModal + expenseAndReports.bookingId).subscribe((res: any) => {
            if (res) {
                this.booking = res;
                this.modalService.open(bookingDueModal, {backdrop: 'static'});
            }
        });
    }
}
