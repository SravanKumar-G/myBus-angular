import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-edit-office-expense',
  templateUrl: './add-edit-office-expense.component.html',
  styleUrls: ['./add-edit-office-expense.component.css']
})
export class AddEditOfficeExpenseComponent implements OnInit {

    public xlsxFile: any;
    public lastInvalids: any;
   public addExpenseQuery: any = {
       date: new Date(),
       branchOfficeId: '',
       expenseType: '',
       description: '',
       amount: '',
       fromDate : new Date(),
       toDate : new Date(),
   };
   public names: Array<any> = [];
   public expenseList: Array<any> = [];
    public officeExpenseId: any;
    public headerTitle: any;
    public expenseDetails: any;
    public errorMessage: any;
    public suppliersList: Array<any> = [];
    public vehicles: Array<any> = [];
    public xlsxResponse: any;
    afuConfig = {
        // multiple: false,
        // formatsAllowed: '.jpg,.png',
        // maxSize: '1',
        // // theme: 'dragNDrop',
        // hideProgressBar: true,
        // hideResetBtn: true,
        // hideSelectBtn: true,
        // fileNameIndex: true,
        // autoUpload: false,
        // replaceTexts: {
        //     selectFileBtn: 'Select Files',
        //     resetBtn: 'Reset',
        //     uploadBtn: 'Upload',
        //     dragNDropBox: 'Drag N Drop',
        //     attachPinBtn: 'Attach Files...',
        //     afterUploadMsg_success: 'Successfully Uploaded !',
        //     afterUploadMsg_error: 'Upload Failed !',
        //     sizeLimit: 'Size Limit'
        // }
    };
    resetVar: any;
    public f: any;

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
      if (this.officeExpenseId){
          this.headerTitle = 'Update OfficeExpense';
          this.getExpenseDetails();
      }else {
          this.headerTitle = 'Add OfficeExpense';
      }
  }

  getExpenseDetails(): void{
      this.apiService.get(this.apiUrls.getExpense + this.officeExpenseId).subscribe((res: any) => {
         if (res){
             this.addExpenseQuery = res;
             this.addExpenseQuery.date = new Date(res.date);
             console.log('gh', this.addExpenseQuery.date);
         }
      });
  }

  branchOfficeNames(): void{
      this.apiService.get(this.apiUrls.branchOfficeNames).subscribe((res: any) => {
          if (res){
                this.names = res;
            }
      });
  }
  getExpenseTypes(): void{
      this.apiService.get(this.apiUrls.expensesTypes).subscribe((res: any) => {
          if (res){
              this.expenseList  = res;
          }
      });
  }

  getSuppliers(): void{
      this.apiService.get(this.apiUrls.suppliers).subscribe((res: any) => {
         if (res){
             this.suppliersList = res;
         }
      });
  }

  getVehicles(): void{
      this.apiService.getAll(this.apiUrls.vehiclesList, {}).subscribe((res: any) => {
          if (res){
              this.vehicles = res;
          }
      });
  }

  dateFunction(): void {
      if (this.addExpenseQuery.date){
          const CDate = new Date(this.addExpenseQuery.date);
          const startYear = CDate.getFullYear();
          const startMonth: any = CDate.getMonth() + 1;
          const startDay: any = CDate.getDate();
          this.addExpenseQuery.date = startYear + '-' + startMonth + '-' + startDay;
      }

  }
    save(): void {
      if (this.officeExpenseId){
          this.apiService.update(this.apiUrls.editExpense, this.addExpenseQuery).subscribe((res: any) => {
            if (res){
                this.addExpenseQuery = res;
                this.router.navigate(['officeExpenses']);
            }
         }, error => {
              this.errorMessage = error.message;
          });
      }else {
          this.apiService.getAll(this.apiUrls.addExpense, this.addExpenseQuery).subscribe((res: any) => {
              if (res){
                  this.addExpenseQuery = res;
                  this.router.navigate(['officeExpenses']);
              }
          }, error => {
              this.errorMessage = error.message;
          });
      }
    }

    close(): void{
       this.router.navigate(['officeExpenses']);
    }

    fileUpload(xlsxFile: any, officeExpenseId: void): void {
        console.log('jsd', xlsxFile);
      if (xlsxFile){
          const file = xlsxFile;
          console.log('s', file);
          const formData = new FormData();
          // @ts-ignore
          Array.from(xlsxFile).forEach(f => formData.append('file', f));
          this.apiService.FileUpload(this.apiUrls.fileUpload, file,  officeExpenseId).subscribe((res: any) => {
              if (res) {
                  this.xlsxResponse = res;

              }
          });
      }
    }


    fileSelected($event: any): void {
      this.f = $event.target.files;
      console.log('d', this.f);
    }

    docUpload($event: any): void {

    }
}
