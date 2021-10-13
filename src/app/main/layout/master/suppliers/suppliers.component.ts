import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  sortOrder = 'createdAt';
  orderBy = 'desc';
  public supplierObj: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public addSupplierQuery: any = {
    name: '',
    contact: '',
    active: '',
    partyType: '',
  };
  public titleHeader: any;
  public suppliersList: Array<any> = [];
  public supplierId: any;
  public errorMessage: any;
  public currentUser: any;
  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.getAllSuppliers();
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }

  addSupplier(addEditSupplierModal: any): void {
    this.supplierId = '',
    this.titleHeader = 'Add a New Supplier';
    this.modalService.open(addEditSupplierModal, {backdrop: 'static'});
  }

  clickSorting($event: MouseEvent): void {
    OnlynumberDirective.clickSorting($event, this.supplierObj);
    this.getAllSuppliers();
  }

  getAllSuppliers(): void{
    this.apiService.get(this.apiUrls.getAllSuppliers).subscribe((res: any) => {
      if (res){
        this.suppliersList = res;
      } else {
        Swal.fire('Oops...', 'Error finding Suppliers data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }
  save(): void {
    if (this.supplierId){
      this.apiService.update(this.apiUrls.updateSupplier, this.addSupplierQuery).subscribe((res: any) => {
        if (res){
          this.addSupplierQuery = res;
          Swal.fire('Great', 'Your Supplier has been successfully updated', 'success');
          this.closeModal();
          this.getAllSuppliers();
        }
      }, error => {
        this.errorMessage = error.message;
      });
    }else {
      this.apiService.getAll(this.apiUrls.addSupplier,  this.addSupplierQuery).subscribe((res: any) => {
        if (res){
          this.addSupplierQuery = res;
          Swal.fire('Great', 'Your Supplier has been successfully added', 'success');
          this.closeModal();
          this.getAllSuppliers();
        }
      }, error => {
        this.errorMessage = error.message;
      });
    }
  }

  cancel(): void {
    this.modalService.dismissAll();
  }

  closeModal(): void {
    this.errorMessage = '';
    this.addSupplierQuery = {};
    this.modalService.dismissAll();
  }

  UpdateSupplier(addEditSupplierModal: any, id: any): void {
   if (id){
     this.supplierId = id;
     this.modalService.open(addEditSupplierModal, {backdrop: 'static'});
     this.titleHeader = 'Update supplier';
     this.apiService.get(this.apiUrls.getSupplier + id).subscribe((res: any) => {
       if (res){
         this.addSupplierQuery = res;
       }
     });
   } else {
     console.log(this.supplierId);
   }
  }

  delete(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting this Supplier',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value){
        this.apiService.delete(this.apiUrls.deleteSupplier + id).subscribe((res: any) => {
          Swal.fire(
              'Disable!',
              'successfully disable!',
              'success'
          );
          this.getAllSuppliers();
        });
      }
    });
  }

  exportingToExcelInSuppliers(): void {
    this.apiService.exportExcel( 'suppliersExcel', this.currentUser.userName + '_suppliersExcel',   '',  '');
  }
}
