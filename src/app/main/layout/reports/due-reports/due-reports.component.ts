import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-due-reports',
    templateUrl: './due-reports.component.html',
    styleUrls: ['./due-reports.component.css']
})
export class DueReportsComponent implements OnInit {

    public currentPageOfDues: Array<any> = [];

    constructor(
        private apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private route: Router,
    ) {
    }

    ngOnInit(): void {
        this.loadDueReports();
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
}
