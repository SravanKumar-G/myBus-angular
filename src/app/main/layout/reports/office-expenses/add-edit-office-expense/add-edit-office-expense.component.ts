import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-edit-office-expense',
    templateUrl: './add-edit-office-expense.component.html',
    styleUrls: ['./add-edit-office-expense.component.css']
})
export class AddEditOfficeExpenseComponent implements OnInit {

    public xlsxFile: any;
    public lastInvalids: any;
    public officeExpense: any = {
        date: new Date(),
        branchOfficeId: '',
        expenseType: '',
        description: '',
        amount: '',
        vehicleId: '',
        supplierId: '',
        fromDate: new Date(),
        toDate: new Date(),
    };
    public names: Array<any> = [];
    public expenseList: Array<any> = [];
    public officeExpenseId: any;
    public uploadType = 'multiple';
    public headerTitle: any;
    public expenseDetails: any;
    public errorMessage: any;
    public suppliersList: Array<any> = [];
    public vehicles: Array<any> = [];

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private modalService: NgbModal,
                private actRoute: ActivatedRoute) {
        this.officeExpenseId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        this.branchOfficeNames();
        this.getExpenseTypes();
        this.getSuppliers();
        if (this.officeExpenseId) {
            this.headerTitle = 'Update OfficeExpense';
            this.getExpenseDetails();
            this.getVehicles();
            this.getSuppliers();
        } else {
            this.headerTitle = 'Add OfficeExpense';
            this.getVehicles();
        }
    }

    getExpenseDetails(): void {
        this.apiService.get(this.apiUrls.getExpense + this.officeExpenseId).subscribe((res: any) => {
            if (res) {
                this.officeExpense = res;
                this.officeExpense.date = new Date(res.date);
            }
        });
    }

    branchOfficeNames(): void {
        this.apiService.get(this.apiUrls.branchOfficeNames).subscribe((res: any) => {
            if (res) {
                this.names = res;
            }
        });
    }

    getExpenseTypes(): void {
        this.apiService.get(this.apiUrls.expensesTypes).subscribe((res: any) => {
            if (res) {
                this.expenseList = res;
            }
        });
    }

    getSuppliers(): void {
        this.apiService.get(this.apiUrls.suppliers).subscribe((res: any) => {
            if (res) {
                this.suppliersList = res;
            }
        });
    }

    getVehicles(): void {
        this.apiService.get(this.apiUrls.vehicleNumbersList).subscribe((res: any) => {
            if (res) {

                this.vehicles = res;
            }
        });
    }
    deleteUpload(officeExpenseId: string, fileName: string): void {
        console.log(this.apiUrls.deleteBillUpload);
        this.apiService.delete( 'api/v1/officeExpense/deleteBillUpload/' + officeExpenseId + '/' + fileName).subscribe((res: any) => {
            if (res) {
                // this.router.navigate(['/officeExpenses/NaN/editOfficeExpense/' + officeExpenseId]);
                this.getExpenseDetails();
            }
        });
    }
    dateFunction(): void {
        if (this.officeExpense.date) {
            const CDate = new Date(this.officeExpense.date);
            const startYear = CDate.getFullYear();
            const startMonth: any = CDate.getMonth() + 1;
            const startDay: any = CDate.getDate();
            this.officeExpense.date = startYear + '-' + startMonth + '-' + startDay;
        }

    }

    save(): void {
        if (this.officeExpenseId) {
            this.apiService.update(this.apiUrls.editExpense, this.officeExpense).subscribe((res: any) => {
                if (res) {
                    this.officeExpense = res;
                    this.apiService.getLoggedInUserData();
                    this.router.navigate(['officeExpenses/:date']);
                }
            }, error => {
                this.errorMessage = error.message;
            });
        } else {
            this.apiService.getAll(this.apiUrls.addExpense, this.officeExpense).subscribe((res: any) => {
                if (res) {
                    this.officeExpense = res;
                    this.apiService.getLoggedInUserData();
                    this.router.navigate(['officeExpenses/:date']);
                }
            }, error => {
                this.errorMessage = error.message;
            });
        }
    }

    close(): void {
        this.router.navigate(['officeExpenses/:date']);
    }

    imageToEmitToUpload(event: any): void{
        if (event === 200){
            this.getExpenseDetails();
        }
    }
}
