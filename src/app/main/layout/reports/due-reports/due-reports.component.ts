import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-due-reports',
    templateUrl: './due-reports.component.html',
    styleUrls: ['./due-reports.component.css']
})
export class DueReportsComponent implements OnInit {

    public currentPageOfDues: Array<any> = [];
    tab = 1;
    public dueByDateList: any;
    public dueByDateListView: any = [];
    public modalRef: any;
    @ViewChild('myModal') myModal: any;
    public dueReportDate: string | undefined;
    public selectedBookings: Array<any> = [];

    constructor(
        private apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private route: Router,
        private ngModalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.changeDueReportsTab(1);
    }

    loadDueReports(): void {
        this.apiService.get(this.apiUrls.loadDueReports).subscribe((reports: any) => {
            if (reports) {
                this.currentPageOfDues = reports;
            }
        }, error => {
            Swal.fire('Error', error.message, 'error');
        });
    }

    goToDueReport(branchOfficeId: any): void {
        if (branchOfficeId) {
            this.route.navigate(['dueReports/officeDueReport/' + branchOfficeId]);
        }
    }

    gotoPayments(): void {
        this.route.navigate(['./payments']);
    }

    getAllDuesByDate(): void {
        this.apiService.get(this.apiUrls.getAllDuesByDate).subscribe((res: any) => {
           if (res){
              this.dueByDateList = res;
           };
        });
    }

    changeDueReportsTab(tabKey: number): void {
        this.tab = tabKey ? tabKey : 1;
        switch (this.tab){
            case 1:
                this.loadDueReports();
                break;
            case 2:
                this.getAllDuesByDate();
                break;
        }
    }

    dueReportsBDateView(date: string): void {
        this.dueReportDate = date;
        this.apiService.get(this.apiUrls.getAllDuesByDate + '/' + date).subscribe((res: any) => {
            if (res){
                this.dueByDateListView = res;
                this.modalRef = this.ngModalService.open(this.myModal, {size: 'xl', backdrop: 'static', keyboard: false});
            };
        });
    }

    close(): void {
        this.ngModalService.dismissAll(this.modalRef);
    }


    toggleBookingSelection(bookingId: string): void {
        const idx = this.selectedBookings.indexOf(bookingId);
        if (idx > -1) {
            this.selectedBookings.splice(idx, 1);
        } else {
            this.selectedBookings.push(bookingId);
        }
    }

    dueReportExportToExcel(): void {
        this.apiService.exportExcel('dueReportExcelData', 'dueReportByDate', '', '');
    }
}
