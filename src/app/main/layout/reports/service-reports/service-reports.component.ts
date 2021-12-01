import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
    selector: 'app-service-reports',
    templateUrl: './service-reports.component.html',
    styleUrls: ['./service-reports.component.css']
})
export class ServiceReportsComponent implements OnInit {
    public currentDate: any;
    public allReports: Array<any> = [];
    public submitted = 0;
    public verified = 0;
    newDate: any = new Date();
    private currentUser: any;
    public downloaded: any;
    public loading = true;
    public downloadedOn: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router,
                private actRoute: ActivatedRoute,
                private location: Location) {
        this.currentDate = this.actRoute.snapshot.params.date || '';
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        if (this.currentDate) {
            this.loadReports();
        }
    }

    loadReports(): void {
        const date = this.apiService.getYYYYMMDD(this.currentDate);
        this.submitted = 0;
        this.apiService.get(this.apiUrls.loadServiceReports + date).subscribe((res: any) => {
            if (res) {
                this.allReports = res;
                if (this.submitted === 0) {
                    for (const data of this.allReports) {
                        if (data.status === 'SUBMITTED') {
                            this.submitted = this.submitted + 1;
                        }
                    }
                }
            }
        }, error => {
            Swal.fire('Oops...', error.message, 'error');
        });
    }

    loadReportsByDate(): void {
        if (new Date(this.currentDate) > new Date()) {
            Swal.fire('Oops...', 'U\'ve checked for future date, Check Later', 'error');
        } else {
            this.downloadPassengerReport();
        }
    }

    // will return date in YYYY-M-D format
    getDate(date: any): any {
        const dateObj = date;
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        this.currentDate = year + '-' + month + '-' + day;
        this.loadReports();
        this.location.replaceState('/serviceReports/' + this.currentDate);
        return year + '-' + month + '-' + day;
    }

    goToServiceReport(service: any): void {
        if (service.attrs.formId) {
            this.router.navigate(['serviceReports/' + this.currentDate + '/serviceForm/' + service.attrs.formId]);
        } else {
            this.router.navigate(['serviceReports/' + this.currentDate + '/serviceReport/' + service.id]);
        }
    }

    nextDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
        // console.log(new Date(date));
        if (new Date(date) <= new Date()) {
            this.currentDate = this.getDate(new Date(date));
            this.location.replaceState('/serviceReports/' + this.currentDate);
        } else {
            Swal.fire('Oops...', 'U\'ve checked for future date, Check Later', 'error');
        }
    }

    previousDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
        this.location.replaceState('/serviceReports/' + this.currentDate);
        this.currentDate = this.getDate(new Date(date));
    }

    exportToExcel(): void {
        this.apiService.exportExcel('serviceReports',
            this.currentUser.userName + '_ServiceReports', '', '');
    }

    public downloadPassengerReport(): void {
        const date = this.apiService.getYYYYMMDD(this.currentDate);
        this.apiService.get(this.apiUrls.downloadPassengerReport + date).subscribe((res: any) => {
            if (res) {
                this.allReports = res;
                this.downloaded = res.downloaded;
                this.loading = false;
                this.downloadedOn = res.downloadedOn;

            }
        }, error => {
            Swal.fire('Oops...', error.message, 'error');
        });
    }
}
