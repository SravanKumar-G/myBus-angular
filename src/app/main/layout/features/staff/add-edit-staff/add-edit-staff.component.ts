import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-edit-staff',
    templateUrl: './add-edit-staff.component.html',
    styleUrls: ['./add-edit-staff.component.css']
})
export class AddEditStaffComponent implements OnInit {
    public staffTitle: any;
    public staffId: any;
    public newDate: any = new Date();
    public staff: any = {
        type: ''
    };
    public types: any;
    public errorMessage: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute) {
        this.staffId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        if (this.staffId) {
            console.log('this.vendorExpenseId', this.staffId);
            this.staffTitle = 'Edit Staff';
            this.getDetails();
        } else {
            this.staffTitle = 'Add Staff';
        }
    }

    goToDashboard(): void {
        this.router.navigate(['dashboard']);
    }

    close(): void {
        this.router.navigate(['staff']);
    }

    save(): void {
        if (!this.staff.name && !this.staff.contactNumber && !this.staff.dlExpiry && !this.staff.type) {
            this.errorMessage = '(*) Fields are mandatory';
        } else if (!this.staff.name) {
            this.errorMessage = 'Please enter user name';
        } else if (!this.staff.contactNumber) {
            this.errorMessage = 'Please enter contact number';
        } else if (!this.staff.dlExpiry) {
            this.errorMessage = 'Please select dlExpiry';
        } else if (!this.staff.type) {
            this.errorMessage = 'Please select type';
        } else {
            if (this.staffId) {
                this.apiService.update(this.apiUrls.getStaffDetails + this.staffId, this.staff).subscribe((res: any) => {
                    if (res || res === 0) {
                        this.staff = res;
                        Swal.fire('Success', 'Your Staff Updated Successfully', 'success');
                        this.close();
                    }
                }, error => {
                    this.errorMessage = error;
                });
            }
            this.apiService.create(this.apiUrls.addNewStaff, this.staff).subscribe((res: any) => {
                if (res) {
                    this.staff = res;
                    Swal.fire('Success', 'Your Staff Added Successfully', 'success');
                    this.close();
                }
            });
        }
    }

    getDetails(): void {
        this.apiService.get(this.apiUrls.editStaff + this.staffId).subscribe((res: any) => {
            if (res) {
                this.staff = res;
            }
        });
    }
}
