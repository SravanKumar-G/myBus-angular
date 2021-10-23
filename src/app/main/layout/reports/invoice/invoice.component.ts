import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  public sortOrder = 'journeyDate';
  public orderBy = 'desc';
  invoiceObj: any = {
    channel: '',
    startDate: new Date(),
    endDate: new Date(),
  };
  public invoices: any = {};
  private currentUser: any;
  public channels = [{value: 'REDBUS-API', name: 'Redbus'}, {value: 'ABHIBUS', name: 'Abhibus'}, {value: 'Agent', name: 'Agent'}];
  public loading: boolean | undefined;

  constructor(private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private router: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    this.SearchGetInvoices();
  }


  SearchGetInvoices(): void {
    if (this.invoiceObj.startDate){
      const CDate = new Date(this.invoiceObj.startDate);
      const startYear = CDate.getFullYear();
      const startMonth: any = CDate.getMonth() + 1;
      const startDay: any = CDate.getDate();
      this.invoiceObj.startDate = startYear + '-' + startMonth + '-' + startDay;
    }
    if (this.invoiceObj.endDate){
      const CDate = new Date(this.invoiceObj.endDate);
      const startYear = CDate.getFullYear();
      const startMonth: any = CDate.getMonth() + 1;
      const startDay: any = CDate.getDate();
      this.invoiceObj.endDate = startYear + '-' + startMonth + '-' + startDay;
    }
    this.invoiceObj.channel = [this.invoiceObj.channel];
    this.apiService.getAll(this.apiUrls.searchInvoice, this.invoiceObj).subscribe((res: any) => {
      if (res){
        this.invoices = res;
      }
    }, error => {
      Swal.fire('error', error.message, 'error');
    });
  }

  goToDashboard(): void {
    this.router.navigate(['']);
  }

  exportToExcel(): void {
    this.apiService.exportExcel('Invoice',
        this.currentUser.userName + '_Invoice', '', '');
  }

  invoiceClickSorting($event: MouseEvent): void{
    OnlynumberDirective.clickSorting($event, this.invoiceObj);
    this.SearchGetInvoices();
  }
}
