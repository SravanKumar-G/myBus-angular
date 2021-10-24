import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-service-collection-report',
    templateUrl: './service-collection-report.component.html',
    styleUrls: ['./service-collection-report.component.css']
})
export class ServiceCollectionReportComponent implements OnInit {

    public currentDate: any;
    public currentUser: any;
    public collections: Array<any> = [];
    newDate: any = new Date();
  serviceNum: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router,
                private actRoute: ActivatedRoute) {
        this.currentDate = new Date(this.actRoute.snapshot.params.date) || '';
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        if (this.currentDate) {
            this.serviceCollectionReport();
        }
    }

    public serviceCollectionReport(): void {
        const dateObj = new Date(this.currentDate);
        const month = dateObj.getMonth() + 1 < 10 ? '0' + dateObj.getMonth() + 1 : dateObj.getMonth() + 1;
        const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
        const year = dateObj.getFullYear();
        const date = day + '-' + month + '-' + year;
        this.apiService.getAll(this.apiUrls.searchCollection, {date}).subscribe((res: any) => {
            if (res) {
                this.collections = res;
            }
        }, error => {
            Swal.fire('Oops...', error.message, 'error');
        });
    }

    getDate(date: any): any {
        const dateObj = date;
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        this.currentDate = year + '-' + month + '-' + day;
        this.serviceCollectionReport();
        return year + '-' + month + '-' + day;
    }

    nextDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
        this.currentDate = this.getDate(new Date(date));
    }

    previousDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
        this.currentDate = this.getDate(new Date(date));
    }

    exportToExcel(): void {
        this.apiService.exportExcel('collections',
            this.currentUser.userName + '_ServiceCollectionReport' + '-' + this.currentDate, '', '');
    }
}
