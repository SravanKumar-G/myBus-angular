import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlynumberDirective } from 'src/app/customDirectives/directives/onlynumber.directive';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css']
})
export class InventoriesComponent implements OnInit {
  public inventories: Array<any> = [];
  count:any;
  public errorMessage: any;
  sortOrder = 'date';
  orderBy = 'desc';
  pagination: any = {
        count: 0,
        size: 10,
        page: 1,
        pageSizes: [],
        sortOrder: 'desc',
        orderBy: 'createdAt',
        query: '',
        sort: this.sortOrder + ',' + this.orderBy,
  };

  constructor(private apiService: ApiServiceService,
    private apiUrls: ApiUrls,
    private router: Router) { }

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void{
    this.apiService.get(this.apiUrls.getInventoriesCount + '?query=' + this.pagination.query).subscribe((total: any) => {
      if (total) {
        this.count = total;
        OnlynumberDirective.pagination(total, this.pagination);
        this.apiService.get(this.apiUrls.getAllInventories 
          + '?page=' + this.pagination.page + '&query=' + this.pagination.query + '&size=' 
          + this.pagination.size + '&sort=' + this.pagination.sort).subscribe((res: any) => {
          if (res) {
            this.inventories = res.content;
          }
        }, error => {
              this.errorMessage = error.message;
        });
      }
    }, error => {
          this.errorMessage = error.message;
    });
  }

  handlePageChange($event: number): void {
    this.pagination.page = $event;
    this.loadInventories();
  }

  handlePageSizeChange(size: any): void {
    this.pagination.size = size;
    this.pagination.page = 1;
    this.loadInventories();
  }

  deleteInventory(id:any): void{
    if (id) {
      Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this inventory !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
              this.apiService.delete(this.apiUrls.deleteInventory + id).subscribe((res: any) => {
                  Swal.fire(
                      'Deleted!',
                      'Your Inventory has been successfully deleted',
                      'success'
                  );
                  this.loadInventories();
              });
          }
      });
  } else {
      Swal.fire('Oops...', 'Error finding Inventory data!', 'error');
  }
}
// viewJob(inventoryId:any):void{
//   // this.router.navigate(['editOperatorAccount', {id: operatorId}]);
//   // this.router.navigate(['/viewJobsByInventory',{inventoryId:inventoryId}]);
// }
}
