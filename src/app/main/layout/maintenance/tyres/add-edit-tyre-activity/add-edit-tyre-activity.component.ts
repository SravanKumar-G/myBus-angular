import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';

@Component({
  selector: 'app-add-edit-tyre-activity',
  templateUrl: './add-edit-tyre-activity.component.html',
  styleUrls: ['./add-edit-tyre-activity.component.css']
})
export class AddEditTyreActivityComponent implements OnInit {

  public tyreActivateTitle: any;
  public errorMessage: any;
  public tyreActivtyId: any;
  public tyreId: any;
  public tyreActivity:any = {
    tyreId: '',
    installedOn: new Date(),
    vehicleId:'',
    location: ''
  };
  public allVehicles: Array<any> = [];
  public Tyres: Array<any> = [];
  public day = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private router: Router,
    public apiService: ApiServiceService,
    private apiUrls: ApiUrls,
    private actRoute: ActivatedRoute,
    private datePipe: DatePipe) { 
      this.tyreActivtyId = this.actRoute.snapshot.params.typeActivityId || '';
      this.tyreId = this.actRoute.snapshot.params.id || '';
    }

  ngOnInit(): void {
    if (this.tyreId) {
      this.tyreActivity.tyreId = this.tyreId || '';
    }

    this.apiService.getAll(this.apiUrls.getAllTyres, {}).subscribe((response: any) => {
      if (response) {
          this.Tyres = response.content;
      }
    });

    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
        this.allVehicles = res.content;
    });

    if (this.tyreActivtyId) {
      this.tyreActivateTitle = 'Edit';
      this.apiService.get(this.apiUrls.getTyreActivityById + this.tyreActivtyId).subscribe((response: any) => {
          if (response) {
              this.tyreActivity = response;
              this.tyreActivity.date = new Date(this.tyreActivity.date);
          }
      })
    } else {
      this.tyreActivateTitle = 'Add'
    }

    if (this.tyreId) {
      this.tyreActivity = {
          tyreId: this.tyreId
      };
    }
  }

  getVehicleOdometerReading(): void{
    for(let v=0;v <this.allVehicles.length; v++){
        if(this.allVehicles[v].id === this.tyreActivity.vehicleId) {
          this.apiService.get(this.apiUrls.getVehicleOdometerReading + this.allVehicles[v].regNo).subscribe((response: any) => {
                this.tyreActivity.odometerReading = response;
            });
        }
    }
  }

  save():void {
    if (this.tyreActivtyId) {
      var updateTyreActivity = {
          tyreId: this.tyreActivity.tyreId,
          activity: this.tyreActivity.activity,
          installedOn: new Date(this.tyreActivity.installedOn),
          vehicleId: this.tyreActivity.vehicleId,
          odometerReading: this.tyreActivity.odometerReading,
          comments: this.tyreActivity.comments,
          location: this.tyreActivity.location
      };
      this.apiService.update(this.apiUrls.updateTyreActivity + this.tyreActivtyId, updateTyreActivity).subscribe((response: any) => {
        this.router.navigate(['maintenance/tyres']);
      })
    } else {
      this.apiService.getAll(this.apiUrls.createTyreActivity, this.tyreActivity).subscribe((response: any) => {
          if (response) {
            this.router.navigate(['maintenance/tyres']);
          }
      })
    }     
  }
  
  cancel(): void {
    this.router.navigate(['maintenance/tyres']);
  }
}

    

   

    
   

    