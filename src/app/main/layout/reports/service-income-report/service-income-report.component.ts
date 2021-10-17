import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {StorageServiceService} from '../../../../services/storage-service.service';

@Component({
    selector: 'app-service-income-report',
    templateUrl: './service-income-report.component.html',
    styleUrls: ['./service-income-report.component.css']
})
export class ServiceIncomeReportComponent implements OnInit {
    filterObj: any = {};
    cities: Array<any> = [];
    serviceReports: Array<any> = [];
    private currentUser: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.getAllCities();
        const data = StorageServiceService.getIncomeFilters();
        if (Object.keys(data).length !== 0) {
            this.filterObj.serviceNumber = StorageServiceService.getIncomeFilters().serviceNumber;
            this.filterObj.source = StorageServiceService.getIncomeFilters().source;
            this.filterObj.destination = StorageServiceService.getIncomeFilters().destination;
            this.searchServiceIncomeReport();
        }
    }

    getAllCities(): void {
        this.apiService.get(this.apiUrls.getDistinctSource).subscribe((cities: any) => {
            if (cities) {
                this.cities = cities;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    exchange(): void {
        const source = this.filterObj.source;
        const destination = this.filterObj.destination;
        this.filterObj.destination = source;
        this.filterObj.source = destination;
    }

    serviceReportByDates(id: any): void {
        if (id) {
            StorageServiceService.setIncomeFilters(this.filterObj);
            this.router.navigate(['serviceReportByService', id]);
        }
    }

    searchServiceIncomeReport(): void {
        this.apiService.getAll(this.apiUrls.searchServiceReport, this.filterObj).subscribe((data: any) => {
            if (data) {
                this.serviceReports = data;
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    exportToExcel(): void {
        this.apiService.exportExcel('serviceIncomeReport',
            this.currentUser.userName + '_ServiceIncomeReport', '', '');
    }
}
