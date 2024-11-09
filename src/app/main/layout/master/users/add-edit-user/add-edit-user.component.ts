import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-edit-user',
    templateUrl: './add-edit-user.component.html',
    styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

    public user: any = {role: '', branchOfficeId: ''};
    public userRoles: Array<any> = [];
    public branchOffices: Array<any> = [];
    public errorMessage: any;
    public userId: any;
    public headerTitle: any = 'Add a User';
    public confirmPassword: any;
    public addUserForm: any = UntypedFormGroup;
    public submitted = false;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private fb: UntypedFormBuilder,
                private router: Router) {
        this.userId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        this.getAllRoles();
        this.loadBranchNames();
        if (this.userId) {
            this.headerTitle = 'Edit User';
            this.getUserDetails();
        }
        this.addUserForm = this.fb.group({
            userName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
            firstName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2),
                Validators.pattern('^[a-zA-Z0-9\\s]*$')]],
            lastName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2),
                Validators.pattern('^[a-zA-Z0-9\\s]*$')]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.maxLength(30)]],
            contact: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^0|[1-9]\d*$')]],
            secondaryContact: [''],
            role: ['', Validators.required],
            branchOfficeId: ['', Validators.required],
            active: [],
            address1: [''],
            cancelCargoBookings: []
        });
    }

    getAllRoles(): void {
        this.apiService.get(this.apiUrls.getAllRoles).subscribe((res: any) => {
            this.userRoles = res.content;
        });
    }

    loadBranchNames(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            this.branchOffices = res;
        });
    }

    getUserDetails(): void {
        this.apiService.get(this.apiUrls.getUserByUserId + this.userId).subscribe((res: any) => {
            if (res) {
                this.user = res;
                this.confirmPassword = this.user.password;
            }
        });
    }

    save(): void {
        console.log("this.addUserForm.valid "+ this.addUserForm.valid);
        if (this.addUserForm.valid) {
            this.user = {
                userName: this.addUserForm.value.userName,
                contact: this.addUserForm.value.contact,
                firstName: this.addUserForm.value.firstName,
                lastName: this.addUserForm.value.lastName,
                password: this.addUserForm.value.password,
                email: this.addUserForm.value.email,
                address1: this.addUserForm.value.address1,
                secondaryContact: this.addUserForm.value.secondaryContact,
                role: this.addUserForm.value.role,
                branchOfficeId: this.addUserForm.value.branchOfficeId,
                cancelCargoBookings: this.addUserForm.value.cancelCargoBookings,
                active: this.addUserForm.value.active
            };
            if (this.user.password === this.confirmPassword) {
                if (!this.userId) {
                    this.apiService.create(this.apiUrls.saveUser, this.user).subscribe((res: any) => {
                        if (res) {
                            Swal.fire('Success', 'User added Successfully', 'success');
                            this.router.navigate(['users']);
                        }
                    }, error => {
                        this.errorMessage = error.message;
                    });
                }else{
                    this.apiService.update(this.apiUrls.updateUser + this.userId, this.user).subscribe((res: any) => {
                        if (res) {
                            Swal.fire('Success', 'User updated Successfully', 'success');
                            this.router.navigate(['users']);
                        }
                    }, error => {
                        this.errorMessage = error.message;
                    });
                }
            }else{
                this.errorMessage = 'Passwords don\'t match.';
            }
        } else {
            this.errorMessage = '* Fields are mandatory';
        }
    }

    close(): void {
        this.router.navigate(['users']);
    }

    getErrMsg(formControl: any, msg: any, type: any): any {
        if ((this.addUserForm.get(formControl).touched || this.submitted) &&
            (this.addUserForm.get(formControl).hasError('maxlength') ||
                this.addUserForm.get(formControl).hasError('minlength'))) {
            if (this.addUserForm.get(formControl).hasError('minlength')) {
                return msg + ' should not be less than ' +
                    this.addUserForm.get(formControl).errors.minlength.requiredLength + ' characters';
            }
            return msg + ' should not be more than ' +
                this.addUserForm.get(formControl).errors.maxlength.requiredLength + ' characters';
        } else if (this.addUserForm.get(formControl).touched || this.submitted) {
            return this.addUserForm.get(formControl).hasError('required') &&
            type === 'select' ? 'You must select ' + msg :
                this.addUserForm.get(formControl).hasError('required') ? 'You must enter ' + msg :
                    this.addUserForm.get(formControl).hasError('pattern') ? 'You must enter a valid ' + msg : '';
        }
    }

    routeToRole(): void {
        this.router.navigate(['roles']);
    }

    routeToBranchOffices(): void {
        this.router.navigate(['branchOffices/addBranchOffice']);
    }
}
