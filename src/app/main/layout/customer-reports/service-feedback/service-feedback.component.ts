import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
    selector: 'app-service-feedback',
    templateUrl: './service-feedback.component.html',
    styleUrls: ['./service-feedback.component.css']
})
export class ServiceFeedbackComponent implements OnInit {

    public currentDate: any;
    public currentUser: any;
    public dailyReports: Array<any> = [];
    newDate: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private router: Router,
                private location: Location) {
        this.currentDate = this.actRoute.snapshot.params.date || '';
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        if (this.currentDate) {
            this.getDailyReports();
        }
    }

    getDailyReports(): void {
        const dateObj = new Date(this.currentDate);
        let month = dateObj.getMonth() + 1 ;
        let d : any;
        let m : any;
        if (month < 10) {
            m =  '0' + month;
        } else {
            m = month;
        }
        let day = dateObj.getDate();
        if (day < 10) {
            d = '0' + dateObj.getDate();
        } else {
            d = day;
        }
        const year = dateObj.getFullYear();
        const date = year + '-' + m + '-' + d;
        this.location.replaceState('/serviceFeedback/' + date);
        this.apiService.get(this.apiUrls.serviceFeedbackSearch + date).subscribe((res: any) => {
            if (res) {
                this.dailyReports = res;
            }
        });
    }

    nextDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
        if (new Date(date) <= new Date()) {
            this.currentDate = this.getDate(new Date(date));
            this.apiService.newDate = this.currentDate;
            this.location.replaceState('/serviceFeedback/' + this.currentDate);
        } else {
            Swal.fire('Oops...', 'U\'ve checked for future date, Check Later', 'error');
        }
    }

    previousDate(): void {
        const currentDate = new Date(this.currentDate);
        const date = currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
        this.currentDate = this.getDate(new Date(date));
        this.apiService.newDate = this.currentDate;
        this.location.replaceState('/serviceFeedback/' + this.currentDate);
    }

    getDate(date: any): any {
        const dateObj = date;
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        this.currentDate = year + '-' + month + '-' + day;
        this.getDailyReports();
        return year + '-' + month + '-' + day;
    }

    routeToReport(id: any): void {
        this.router.navigate(['serviceFeedback/' + this.currentDate + '/serviceFeedbackReport/' + id]);
    }

    requestFeedbackFromRedbus(serviceFeedBackId: any) {

        this.apiService.get(this.apiUrls.sendFeedbackRequestMessages + serviceFeedBackId +"/redbus").subscribe((res: any) => {
                this.getDailyReports();
        });
    }
}
