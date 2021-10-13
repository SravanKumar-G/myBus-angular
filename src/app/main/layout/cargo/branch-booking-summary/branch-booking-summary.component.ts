import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-branch-booking-summary',
    templateUrl: './branch-booking-summary.component.html',
    styleUrls: ['./branch-booking-summary.component.css']
})
export class BranchBookingSummaryComponent implements OnInit {

    branchOffices: Array<any> = [];
    filterObj: any = {
        startDate: new Date(),
        endDate: new Date(),
        fromBranchId: ''
    };
    public errorMessage: any;
    public summaryData: any = {branchCargoBookings: [], userCargoBookingsSummaries: []};
    public currentUser: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.loadBranchOffice();
        this.filterObj.fromBranchId = this.currentUser.branchOfficeId;
        this.filterObj.startDate.setDate(this.filterObj.startDate.getDate() - 1);
        this.loadBranchBookingsSummary();

    }

    loadBranchOffice(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    exportToExcel(): void {
        this.apiService.exportExcel('branchBookingSummary',
            this.currentUser.userName + '_BranchBookingSummary', '', '');
    }

    loadBranchBookingsSummary(): void {
        this.apiService.getAll(this.apiUrls.branchBookingSummary, this.filterObj).subscribe((summary: any) => {
            if (summary) {
                this.summaryData = summary;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }
}
