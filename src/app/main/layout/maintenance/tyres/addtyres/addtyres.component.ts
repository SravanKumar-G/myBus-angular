import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtyres',
  templateUrl: './addtyres.component.html',
  styleUrls: ['./addtyres.component.css']
})
export class AddtyresComponent implements OnInit {


  public tyreTitle: any;
  public errorMessage: any;
  public tyreId: any;
  public tyre:any = {
    purchaseDateString: new Date(),
    purchasedOn: new Date(),
    supplierId: ''
  };
  public allVehicles: Array<any> = [];
  public suppliers: Array<any> = [];
  public day = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  

  constructor(private router: Router,
    public apiService: ApiServiceService,
    private apiUrls: ApiUrls,
    private actRoute: ActivatedRoute,
    private datePipe: DatePipe) { 
      this.tyreId = this.actRoute.snapshot.params.id || '';
    }

  ngOnInit(): void {
    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
      this.allVehicles = res.content;
    });

    this.apiService.get(this.apiUrls.getAllSuppliers).subscribe((res: any) => {
      this.suppliers = res;
    });

    if (this.tyreId) {
      this.tyreTitle = 'Edit';
      this.apiService.get(this.apiUrls.getTyreById + this.tyreId).subscribe((response: any) => {
        if (response) {
            this.tyre = response;
            this.tyre.purchaseDateString = new Date(this.tyre.purchaseDate);
            console.log(this.tyre);
        }
      })
    } else {
      this.tyreTitle = 'Add';
    }
  }

  save(): void {
    this.tyre.purchasedOn = this.tyre.purchaseDateString;
    if (this.tyreId) {
      this.tyre.tyreNumber = this.tyre.uniqueId;
      this.apiService.update(this.apiUrls.updateTyre + this.tyreId, this.tyre).subscribe((response: any) => {
        if(response){
          Swal.fire("Great", "Your tyre has been successfully updated", "success");
          this.router.navigate(['maintenance/tyres']);
        }
        }, error => {
          Swal.fire("Error", error.message, "error");
        })
    } else {
      this.apiService.getAll(this.apiUrls.createTyre, this.tyre).subscribe((response: any) => {
          if(response){
            Swal.fire("Great", "Your Tyre has been successfully added", "success");
            this.router.navigate(['maintenance/tyres']);
          }
        }, error =>{
            Swal.fire("Error Saving Tyre info", error.message, "error");
        })
    }
  }

  cancel(): void {
    this.router.navigate(['maintenance/tyres']);
  }  

}















