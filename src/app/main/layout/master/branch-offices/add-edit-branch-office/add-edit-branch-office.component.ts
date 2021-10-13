import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-edit-branch-office',
    templateUrl: './add-edit-branch-office.component.html',
    styleUrls: ['./add-edit-branch-office.component.css']
})
export class AddEditBranchOfficeComponent implements OnInit {

    public headerTitle: any = 'Add Branch Office';
    public branchOffice: any = {
        cityId: '',
        managerId: ''
    };
    public cities: Array<any> = [];
    public users: Array<any> = [];
    public errorMessage: any;
    public branchOfficeId: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute) {
        this.branchOfficeId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        this.getActiveCities();
        this.getUsers();
        if (this.branchOfficeId) {
            this.headerTitle = 'Update Branch Office';
            this.getBranchOfficeDetails();
        }
    }

    getBranchOfficeDetails(): void {
        this.apiService.get(this.apiUrls.getBranchOffice + this.branchOfficeId).subscribe((res: any) => {
            if (res) {
                this.branchOffice = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    public getActiveCities(): void {
        this.apiService.get(this.apiUrls.getActiveCityNames).subscribe((res: any) => {
            if (res) {
                this.cities = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    public getUsers(): void {
        this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
            if (res) {
                this.users = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    public save(): void {
        if (!this.branchOffice.name && !this.branchOffice.contact && !this.branchOffice.cityId) {
            this.errorMessage = '(*) Fields are mandatory';
        } else {
            this.errorMessage = '';
            if (this.branchOfficeId) {
                this.apiService.update(this.apiUrls.updateBranchOffice + this.branchOfficeId, this.branchOffice).subscribe((res: any) => {
                    if (res) {
                        Swal.fire('Great', 'Your Branch Office has been updated successfully', 'success');
                        this.router.navigate(['branchOffices']);
                    }
                }, error => {
                    this.errorMessage = error.message;
                });

            } else {
                this.apiService.create(this.apiUrls.saveBranchOffice, this.branchOffice).subscribe((res: any) => {
                    if (res) {
                        Swal.fire('Great', 'Your Branch Office has been added successfully', 'success');
                        this.router.navigate(['branchOffices']);
                    }
                }, error => {
                    this.errorMessage = error.message;
                });
            }
        }
    }

    public close(): void {
        this.router.navigate(['branchOffices']);
    }

}
