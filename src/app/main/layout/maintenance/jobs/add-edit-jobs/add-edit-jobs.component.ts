import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-jobs',
  templateUrl: './add-edit-jobs.component.html',
  styleUrls: ['./add-edit-jobs.component.css']
})
export class AddEditJobsComponent implements OnInit {

  job: any = {
    inventories: [],
    inventoryId: '',
    vehicleId: ''
  };
  allVehicles: any = [];
  jobCategories: any = [];
  allInventories: any = [];
  allUsers: any = [];
  titleName = 'Add Job';
  odometerReading = 0;
  jobId: any;
  errorMessage: any;
  public latestJobs: any;

  constructor(private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private router: Router,
              private actRoute: ActivatedRoute) {
      this.jobId = this.actRoute.snapshot.params.id || '';
    }

  ngOnInit(): void {

    this.getVehicles();
    this.getInventories();
    this.getAllUsers();
    this.getAllJobCategories();
  }

  cancel(): void{
    this.router.navigate(['maintenance/jobs']);
  }

  getVehicles() {
    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
        this.allVehicles = res.content;
        // $rootScope.$broadcast('vehicles', this.allVehicles);
        if (this.jobId){
            this.titleName = 'Edit Job';
            this.apiService.get(this.apiUrls.getJob + this.jobId).subscribe((data: any) => {
                this.job = data;
                this.job.jobDate = new Date(this.job.jobDate);
                this.getOdometerReading();
                this.getLatestJobsToTable();
            });
        }
    });
  }

  getAllJobCategories() {
    this.apiService.get(this.apiUrls.getAllJobCategories).subscribe((res: any) => {
        this.jobCategories = res;
    });
  }


    getOdometerReading(): void{
    for (let i = 0; i < this.allVehicles.length; i++) {
        if (this.allVehicles[i].id === this.job.vehicleId){
            this.odometerReading =  this.allVehicles[i].odometerReading;
        }
    }
  }

  getInventories(): void{
    this.apiService.get(this.apiUrls.getAllInventories).subscribe((res: any) => {
        this.allInventories = res.content;
    });
  }

  getAllUsers(): void{
    this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
        this.allUsers = res;
    });
  }

  save(): void{
     if (this.jobId) {
      this.apiService.update(this.apiUrls.updateJob, this.job).subscribe((response: any) => {
        if (response){
          this.router.navigate(['maintenance/jobs']);
        }
      });
     } else {
      this.apiService.getAll(this.apiUrls.addJob, this.job).subscribe((response: any) => {
         if (response){
          this.router.navigate(['maintenance/jobs']);
         }
         });
     }
  }

  setUnitCost(inventory: any): void {
  for (let i = 0; i < this.allInventories.length; i++) {
      if (this.allInventories[i].id === inventory.inventoryId){
          inventory.unitCost = this.allInventories[i].unitCost;
      }
  }
  this.calculateTotal();
  }


  addJobInventories(): void{
      if (!this.job.inventories){
          this.job.inventories = [];
      }
      for (let i = 0; i < this.job.inventories.length; i++) {
          if (!this.job.inventories[i].inventoryId ||
              !this.job.inventories[i].quantity) {
              Swal.fire('Error', 'Please select values for inventory and quantity', 'error');
              return;
          }
      }
      this.job.inventories.push({
          inventoryId: undefined,
          quantity: undefined,
          unitCost: 0
      });
  }

    calculateTotal(): void{
      let total = 0;
      for (let i = 0; i < this.job.inventories.length; i++){
          total += (this.job.inventories[i].unitCost * this.job.inventories[i].quantity);
      }
      total += this.job.additionalCost;
      this.job.totalCost = total;
    }

    deleteJobInventory(index: any): void{
      if (this.job.inventories.length > 0) {
          this.job.inventories.splice(index, 1);
      }
    }

    getLatestJobsToTable(): void{
      this.apiService.get(this.apiUrls.getLatestJobs + this.job.vehicleId).subscribe(( res: any) => {
          if (res){
              this.latestJobs = res;
          }
      });

    }
}


