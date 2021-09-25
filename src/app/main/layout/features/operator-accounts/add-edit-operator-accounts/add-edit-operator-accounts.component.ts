import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-edit-operator-accounts',
    templateUrl: './add-edit-operator-accounts.component.html',
    styleUrls: ['./add-edit-operator-accounts.component.css']
})
export class AddEditOperatorAccountsComponent implements OnInit {

    public operatorId: any;
    public headerTitle = 'Add Operator Account';
    public operatorAccount: any = {providerType: ''};
    public errorMessage: any;
    public providerTypes = [{value: 'Abhibus', name: 'Abhibus'}, {value: 'Bitla', name: 'Bitla'}];

    constructor(private actRoute: ActivatedRoute,
                private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls) {
        this.operatorId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        if (this.operatorId) {
            this.headerTitle = 'Edit Operator Account';
            this.getAccountDetails();
        } else {
            this.headerTitle = 'Add Operator Account';
        }
    }

    save(): void {
        if (Object.keys(this.operatorAccount).length === 0) {
            this.errorMessage = '(*) Fields are mandatory';
        } else {
            this.apiService.create(this.apiUrls.saveOrUpdateOperatorAccount, this.operatorAccount).subscribe((res: any) => {
                if (res) {
                    if (!this.operatorId) {
                        Swal.fire('Great', 'Your account has been sucessfully added', 'success');
                    } else {
                        Swal.fire('Great', 'Your account has been updated sucessfully', 'success');
                    }
                    this.router.navigate(['operatorAccounts']);
                }
            }, error => {
                console.log(error);
                this.errorMessage = error.message;
            });
        }
    }

    getAccountDetails(): void {
        this.apiService.get(this.apiUrls.getOperatorAccount + this.operatorId).subscribe((res: any) => {
            if (res) {
                this.operatorAccount = res;
            }
        }, error => {
            console.log(error);
        });
    }

    close(): void {
        this.router.navigate(['operatorAccounts']);
    }
}
