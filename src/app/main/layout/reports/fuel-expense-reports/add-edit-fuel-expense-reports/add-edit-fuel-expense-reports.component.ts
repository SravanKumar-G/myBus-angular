import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-edit-fuel-expense-reports',
  templateUrl: './add-edit-fuel-expense-reports.component.html',
  styleUrls: ['./add-edit-fuel-expense-reports.component.css']
})
export class AddEditFuelExpenseReportsComponent implements OnInit {
  suppliers: Array<any> = [];
  public fuelExpenseId: any;
  public vehicles: Array<any> = [];
  public errorMessage: any = [];
  addFuelExpenseQuery: any = {
    date: new Date(),
    journeyDate: new Date(),
    supplierId: [],
    vehicleId: [],
    odometer: 0,
    quantity: 0,
    rate: 0,
    paid: false,
    fillup: false,
    cost: 0,
  };
  date: any = new Date();
  public fuelExpenseTitle = '';
  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private location: Location) {
    this.fuelExpenseId = this.actRoute.snapshot.params.id || '';
  }

  ngOnInit(): void {
    if (this.fuelExpenseId) {
      this.fuelExpenseTitle = 'Edit FuelExpense';
      this.getFuelExpense();
    } else {
      this.fuelExpenseTitle = 'Add FuelExpense';
    }
    this.getSuppliers();
    this.getAllVehicles();
  }

  getFuelExpense(): void{
    this.apiService.get(this.apiUrls.getFuelExpense + this.fuelExpenseId).subscribe((res: any) => {
      if (res) {
            this.addFuelExpenseQuery = res;
            this.addFuelExpenseQuery.journeyDate = res.jdate;
      }
    });
  }
  getSuppliers(): void {
    this.apiService.get(this.apiUrls.getSuppliers).subscribe((res: any) => {
      if (res) {
        this.suppliers = res;
      }
    });
  }

  getAllVehicles(): void {
    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
      if (res) {
        this.vehicles = res.content;
      }
    });
  }
   dateFunction(): void{
     const day = [1, 2, 3, 4, 5, 6, 7, 8, 9];
     if (this.addFuelExpenseQuery.journeyDate) {
       const currentDate = new Date(this.addFuelExpenseQuery.journeyDate);
       const startYear = currentDate.getFullYear();
       let startMonth: any = currentDate.getMonth() + 1;
       let startDay: any = currentDate.getDate();
       for (let m = 0; m <= day.length; m++) {
         if (startMonth === (day[m])) {
           startMonth = '0' + startMonth;
         }
         if (startDay === (day[m])) {
           startDay = '0' + startDay;
         }
       }
       this.addFuelExpenseQuery.dateString = startYear + '-' + startMonth + '-' + startDay;
     }
  }
  saveFuelExpense(): void {
    this.errorMessage = [];
    if (!this.addFuelExpenseQuery.journeyDate) {
      this.errorMessage.push( 'Please enter date');
    } else if (!this.addFuelExpenseQuery.vehicleId) {
      this.errorMessage.push('Please enter vehicleId');
    } else if (!this.addFuelExpenseQuery.supplierId) {
      this.errorMessage.push('Please enter supplierId');
    }else if (!this.addFuelExpenseQuery.odometer) {
      this.errorMessage.push('Please enter odometerReading');
    }else if (!this.addFuelExpenseQuery.quantity) {
      this.errorMessage.push('Please enter the quantity');
    }else if (!this.addFuelExpenseQuery.rate) {
      this.errorMessage.push( 'Please enter the rate');
    } else {
      if (this.fuelExpenseId){
        // for (const [key, value] of Object.entries(this.addFuelExpenseQuery)) {
        //   if (value === null || value === undefined || value === '') {
        //     delete this.addFuelExpenseQuery[key];
        //   }
        // }
        this.apiService.update(this.apiUrls.updateFuelExpense, this.addFuelExpenseQuery).subscribe((res: any) => {
          if (res){
            Swal.fire('Great', 'Your Fuel Consumption successfully updated', 'success');
            this.router.navigate(['fuelExpenseReports/' +  this.addFuelExpenseQuery.journeyDate]);
          }
        }, error => {
          this.errorMessage = error.message;
        });
      } else {
        // for (const [key, value] of Object.entries(this.addFuelExpenseQuery)) {
        //   if (value === null || value === undefined || value === '') {
        //     delete this.addFuelExpenseQuery[key];
        //   }
        // }
        this.dateFunction();
        const date = new Date(this.addFuelExpenseQuery.dateString);
        // this.addFuelExpenseQuery.journeyDate.setDate(date.getDate() - 1);
        this.apiService.getAll(this.apiUrls.addFuelExpense, this.addFuelExpenseQuery).subscribe((res: any) => {
          if (res){
            Swal.fire('Great', 'Your Fuel Consumption successfully added', 'success');
            this.router.navigate(['fuelExpenseReports/' +  this.addFuelExpenseQuery.journeyDate]);
          }
        }, error => {
          this.errorMessage = error.message;
        });
      }
    }
  }

  cancel(): void {
    this.location.back();
  }

  getFuelCost(): void {
    this.addFuelExpenseQuery.cost = this.addFuelExpenseQuery.quantity * this.addFuelExpenseQuery.rate;
  }
}
