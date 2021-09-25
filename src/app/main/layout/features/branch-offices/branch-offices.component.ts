import {Component, OnInit} from '@angular/core';
import {OnlynumberDirective} from '../../../../_helpers/onlynumber.directive';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-branch-offices',
    templateUrl: './branch-offices.component.html',
    styleUrls: ['./branch-offices.component.css']
})
export class BranchOfficesComponent implements OnInit {

    public branchOffices: Array<any> = [];
    public errorMessage: any;
    sortOrder = 'name';
    orderBy = 'asc';
    public branchOfficeQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        sort: this.sortOrder + ',' + this.orderBy,
    };
    public branchOfficesCount: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls) {
    }

    ngOnInit(): void {
        this.getBranchOfficesCount();
    }

    deleteBranchOffice(officeId: any): void {
        if (officeId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this City !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.delete(this.apiUrls.updateBranchOffice + officeId).subscribe((res: any) => {
                        Swal.fire(
                            'Deleted!',
                            'Your Branch Office has been successfully deleted',
                            'success'
                        );
                        this.getBranchOfficesCount();
                    });
                }
            });
        } else {
            Swal.fire('Oops...', 'Error finding branch office data!', 'error');
        }
    }


    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.branchOfficeQuery);
        this.getBranchOfficesCount();
    }

    handlePageChange(event: number): void {
        this.branchOfficeQuery.page = event;
        this.getBranchOfficesCount();
    }

    handlePageSizeChange(event: any): void {
        this.branchOfficeQuery.size = event;
        this.branchOfficeQuery.page = 1;
        this.getBranchOfficesCount();
    }

    private getBranchOfficesCount(): void {
        this.apiService.get(this.apiUrls.branchOfficesCount).subscribe((res: any) => {
            if (res !== 0) {
                this.branchOfficesCount = res;
                OnlynumberDirective.pagination(res, this.branchOfficeQuery);
                this.getAllBranchOffices();
            } else {
                Swal.fire('Oops...', 'Error finding Branch Offices data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    private getAllBranchOffices(): void {
        this.apiService.get(this.apiUrls.getAllBranchOffices + '?page=' + this.branchOfficeQuery.page +
            '&size=' + this.branchOfficeQuery.size + '&sort=' + this.branchOfficeQuery.sort).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res.content;
            } else {
                Swal.fire('Oops...', 'Error finding Branch Offices data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }
}
