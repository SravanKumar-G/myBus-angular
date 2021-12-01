import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-inventories',
  templateUrl: './add-inventories.component.html',
  styleUrls: ['./add-inventories.component.css']
})
export class AddInventoriesComponent implements OnInit {

  public headerTitle: any = 'Add Inventory';
  public errorMessage: any;
  public inventoryId: any;
  public inventory: any = {};
  public others = {name: "others", id:"others"};
  public suppliers: Array<any> = [];

  constructor(private router: Router,
    public apiService: ApiServiceService,
    private apiUrls: ApiUrls,
    private actRoute: ActivatedRoute) {
      this.inventoryId = this.actRoute.snapshot.params.id || '';
     }

  ngOnInit(): void {
    this.apiService.get(this.apiUrls.getAllSuppliers).subscribe((res: any) => {
      this.suppliers = res;
      this.suppliers.push(this.others);
    });

    if(this.inventoryId){
      this.headerTitle = "Edit Inventory";
      this.apiService.get(this.apiUrls.getInventory + this.inventoryId).subscribe((res: any) => {
          this.inventory = res;
          // if (this.inventory.supplierType === 'others'){
          //     this.inventory.supplierType = this.suppliers.filter((supplier) => {
          //         return supplier.id === this.inventory.supplierId;
          //     });
          // } else {
          //     this.inventory.supplierType = this.suppliers.filter((supplier) => {
          //         return supplier.id === this.inventory.supplierType;
          //     });
          // }
      });
    }
  }

  save():void {
    if (this.inventory.supplierType === 'others') {
        this.inventory.supplierType = this.inventory.supplierType.name;
    }
    else{
        this.inventory.supplierType = this.inventory.supplierType;
    }
    if (!this.inventory.uniqueId) {
        Swal.fire("Error", "Please enter a UniqueId", "error");
    }else {
        if (this.inventoryId) {
            this.apiService.update(this.apiUrls.updateInventory, this.inventory).subscribe((res: any) => {
              this.router.navigate(['maintenance/inventories']);
            }, error => {
              this.errorMessage = error.messages;
            });
        } else {
          // console.log(this.inventory.supplierType);
            this.apiService.getAll(this.apiUrls.addInventory, this.inventory).subscribe((res: any) => {
              this.router.navigate(['maintenance/inventories']);
            }, error => {
              this.errorMessage = error.messages;
            });
        }
    }
  }
  
  cancel():void {
    this.router.navigate(['maintenance/inventories']);
  };
}
