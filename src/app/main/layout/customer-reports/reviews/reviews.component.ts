import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

    tab = 1;
    public sortOrder = 'date';
    public orderBy = 'asc';
    public dateOfJoining = new Date();

    filterObj: any = {
        page: 1,
        size: 20,
        sort: this.sortOrder + ',' + this.orderBy,
        pageSizes: []
    };
    dateOfJourney: any;
    public listOfRoutes: Array<any> = [];
    public listOfReviews: Array<any> = [];
    public listOfDownloads: Array<any> = [];
    public reviewsCount: any;
    private currentUser: any;
    private filesToUpload: any;
    isDisabled = true;
    files: Array<any> = [];

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.getAllRoutes();
        this.tabChange(this.tab);
    }

    tabChange(tabKey: number): void {
        this.tab = tabKey ? tabKey : 1;
        switch (this.tab) {
            case 1:
                this.loadReviewsCount();
                break;
            case 2:
                this.getAllReviewDownloads();
                break;
            default:
                this.loadReviewsCount();
                break;
        }
    }

    loadReviewsCount(): void {
        this.apiService.getAll(this.apiUrls.getReviewsCount, this.filterObj).subscribe((count: any) => {
            if (count > 0) {
                this.reviewsCount = count;
                OnlynumberDirective.pagination(count, this.filterObj);
                this.getAllReviews();
            } else {
                Swal.fire('Error', 'There are no Reviews', 'error');
            }
        });
    }

    public getAllRoutes(): void {
        this.apiService.get(this.apiUrls.getAllRoutes).subscribe((res: any) => {
            if (res) {
                this.listOfRoutes = res;
            }
        });
    }

    getAllReviewDownloads(): void{
        this.apiService.get(this.apiUrls.getAllReviewUploads).subscribe((res: any) => {
            if (res) {
                this.listOfDownloads = res;
            }
        });
    }

    searchData(): void {
        if (this.dateOfJourney) {
            const dateObj = new Date(this.dateOfJourney);
            const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
            const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
            const year = dateObj.getFullYear();
            this.filterObj.dateOfJourney = day + '/' + month + '/' + year;
        }
        for (const [key, value] of Object.entries(this.filterObj)) {
            if (value === null || value === undefined || value === '') {
                delete this.filterObj[key];
            }
        }
        this.loadReviewsCount();
    }

    exportToExcel(): void {
        this.apiService.exportExcel('reviewsData',
            this.currentUser.userName + '_Reviews', '', '');
    }

    public getAllReviews(): void {
        this.apiService.getAll(this.apiUrls.getAllReviews, this.filterObj).subscribe((data: any) => {
            if (data) {
                this.listOfReviews = data.content;
            }
        }, error => {
            Swal.fire('Error', error.message, 'error');
        });
    }

    handlePageChange(event: any): void {
        this.filterObj.page = event;
        this.loadReviewsCount();
    }

    handlePageSizeChange(event: any): void {
        this.filterObj.size = event;
        this.filterObj.page = 1;
        this.loadReviewsCount();
    }

    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.filterObj);
        this.loadReviewsCount();
    }

    viewUploadDetails(id: any, fileName: any): void {
       this.router.navigate(['/reviews/viewReview/' + id]);
    }

    handleFileInput(listOfFiles: any): void {
        const files = listOfFiles.target.files;
        this.files = files;
        for (const file of files) {
            if (file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'text/csv') {
                this.filesToUpload = files;
                this.isDisabled = false;
            } else {
                Swal.fire('error', 'Please upload only PNG or JPEG or PDF or XLSX or CSV files', 'error');
                this.files = [];
            }
        }
    }

    fileUpload(): void {
        this.apiService.upload(this.apiUrls.reviewFileUpload, this.files).subscribe((res: any) => {
            if (res) {
                Swal.fire('Wow!', 'File uploaded Successfully', 'success');
                this.files = [];
                this.getAllReviewDownloads();
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }
}
