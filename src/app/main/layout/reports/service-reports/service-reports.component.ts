import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

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

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router,
                private actRoute: ActivatedRoute) {
        this.currentDate = this.actRoute.snapshot.params.date || '';
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        if (this.currentDate) {
            this.loadReports();
        }
    }

    loadReports(): void {
        this.submitted = 0;
        this.apiService.get(this.apiUrls.loadServiceReports + this.currentDate).subscribe((res: any) => {
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
            this.loadReports();
        }
    }

    getDate(date: any): any {
        const dateObj = date;
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        this.currentDate = year + '-' + month + '-' + day;
        return year + '-' + month + '-' + day;
    }

    goToServiceReport(service: any): void {
        if (service.attrs.formId) {
            this.router.navigate(['serviceReports/' + this.currentDate + '/serviceForm/' + service.attrs.formId]);
        }else{
            this.router.navigate(['serviceReports/' + this.currentDate + '/serviceReport/' + service.id]);
        }
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
        this.apiService.exportExcel('serviceReports',
            this.currentUser.userName + '_ServiceReports', '', '');
    }
}
