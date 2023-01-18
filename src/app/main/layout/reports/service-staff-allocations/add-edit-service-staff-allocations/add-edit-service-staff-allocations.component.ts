import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiServiceService} from "../../../../../services/api-service.service";
import {ApiUrls} from "../../../../../_helpers/apiUrls";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-edit-service-staff-allocations',
  templateUrl: './add-edit-service-staff-allocations.component.html',
  styleUrls: ['./add-edit-service-staff-allocations.component.css']
})
export class AddEditServiceStaffAllocationsComponent implements OnInit {
  public staffId: any;
  public staffTitle: any;
  public allVehicles: Array <any> = [];
  public suppliersList: Array<any> = [];
  public listOfStaff: Array<any> = [];
  public driverOne: Array<any> = [];
  public  driverOneSelection: any;
  public driverTwo: Array<any> = [];
  public  driverTwoSelection: any;
  public cleaner: Array<any> = [];
  public conductor: Array<any> = [];
  public allError: any = [];
  public currentDate: any;
  public query = {
    journeyDate: new Date(),
    fuelQuantity: '',
    fuelCost: '',
    cashCollection: '',
    vehicleRegNumber: '',
    driver1Id: '',
    driver2Id: '',
    conductorId: '',
    cleanerId: '',
    supplierId: '',
    verified: false
  };
  constructor(
              private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute) {
    this.currentDate = this.actRoute.snapshot.params.date || '';
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate());
    this.staffId = this.actRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (this.staffId){
      this.staffTitle = 'Edit Staff';
      this.editStaff();
    }else {
      this.staffTitle = 'Add Staff';
    }
    this.getVehicles();
    this.getSuppliers();
    this.getStaffList();
  }

  getVehicles(): void {
    this.apiService.get(this.apiUrls.getAllVehicleNumbers).subscribe((res: any) => {
      if (res) {
        this.allVehicles = res;
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
  getStaffList(): void {
    this.apiService.getAll(this.apiUrls.getStaffList, {}).subscribe((res: any) => {
      if (res) {
        this.listOfStaff = res.content;
        for (const item of this.listOfStaff){
          if (!(item.type === null) && item.type.toUpperCase() === 'DRIVER'){
            // if (item2 === null || !(item2.id === item.id) ){
                this.driverOne.push(item);
            // }
            // if (item1 === null || !(item1.id === item.id)){
                this.driverTwo.push(item);
            // }
          }else if (!(item.type === null) && item.type.toUpperCase() === 'CLEANER'){
            this.cleaner.push(item);
          }else if (!(item.type === null) && item.type.toUpperCase() === 'CONDUCTOR'){
            this.conductor.push(item);
          }
        }
        this.listOfStaff = [];
      }
    });
  }


  save(): void{
    this.allError = [];
    if (this.staffId){
      this.apiService.update(this.apiUrls.updateServiceStaff, this.query).subscribe((res: any) => {
        if (res){
          this.driverOne = [];
          this.driverTwo = [];
          this.cleaner = [];
          this.conductor = [];
          Swal.fire('Success', 'Staff Updated Successfully', 'success');
          this.router.navigate(['ServiceStaffAllocation/:date']);
        }
      }, err => {
        this.allError = err;
      });
    }else {
      this.apiService.getAll(this.apiUrls.addServiceStaff, this.query).subscribe((res: any) => {
        if (res){
          this.driverOne = [];
          this.driverTwo = [];
          this.cleaner = [];
          this.conductor = [];
          Swal.fire('Success', 'Staff Added Successfully', 'success');
          this.router.navigate(['ServiceStaffAllocation/:date']);
          this.staffId = '';
        }
      }, err => {
        this.allError = err;
      });
    }
  }

  removedDriverFun(item: any, i: any): void {
    if (i === 1){
      let item2Object;
      for (const a of this.driverOne){
        if (a.id === item){
          item2Object = a;
        }
      }
      const data = this.driverTwo.indexOf(item2Object);
      this.driverTwo.splice(data, 1);
      if ( !(this.driverOneSelection === undefined) && !(item2Object.id === this.driverOneSelection.id)){
        this.driverTwo.push(this.driverOneSelection);
      }
      this.driverOneSelection = item2Object;
    }else {
      let item2Object;
      for (const a of this.driverTwo){
        if (a.id === item){
            item2Object = a;
        }
      }
      const data = this.driverOne.indexOf(item2Object);
      this.driverOne.splice(data, 1);
      if (!(this.driverTwoSelection === undefined) && !(item2Object.id === this.driverTwoSelection.id)){
        this.driverOne.push(this.driverTwoSelection);
      }
      this.driverTwoSelection = item2Object;
    }
  }

  editStaff(): void{
    this.apiService.get(this.apiUrls.getServiceStaff + this.staffId ).subscribe((res: any) => {
      if (res) {
        this.query = res;
        // if (res.driver1Id && res.driver2Id){
        //   this.driverTwoSelection = res.driver2;
        //   this.driverOneSelection = res.driver1;
        //   this.getStaffList(res.driver1, res.driver2);
        // }
        // else if (res.driver1Id){
        //   this.driverOneSelection = res.driver1;
        //   this.getStaffList(res.driver1, null);
        // }
        // else if (res.driver2Id){
        //   this.driverTwoSelection = res.driver2;
        //   this.getStaffList(res.driver2, null);
        // }
        this.query.journeyDate = new Date(res.journeyDate);
      }
    });
  }

  cancel(): void{
    this.router.navigate(['ServiceStaffAllocation/:date']);
  }
}
