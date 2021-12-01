import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tyres',
  templateUrl: './tyres.component.html',
  styleUrls: ['./tyres.component.css']
})
export class TyresComponent implements OnInit {

  count = 0;
  sortOrder = 'date';
  orderBy = 'desc';
  public allVehicles: Array<any> = [];
  public Tyres: Array<any> = [];
  public currentPageOfTyres: Array<any> = [];
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
  query:any = {};
  searchQuery:any = {
    vehicleId: ''
  };
  invalidCount = 0;

  constructor(private apiService: ApiServiceService,
    private apiUrls: ApiUrls,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
      this.allVehicles = res.content;
    });
   this.getAllTyres();         
  }

  getAllTyres():void {
    let getQuery:any = {};
    getQuery.page = this.pagination.page;
    getQuery.size = this.pagination.size;
    getQuery.sort = this.pagination.sort;
    getQuery.tyreNumber = this.searchQuery.tyreNumber
    getQuery.vehicleId = this.searchQuery.vehicleId
    this.apiService.getAll(this.apiUrls.getTyreCount, this.searchQuery).subscribe((count: any) => {
     if(count || count == 0){
      this.count = count;
      this.apiService.getAll(this.apiUrls.getAllTyres, getQuery).subscribe((response: any) => {
        this.invalidCount = 0;
        if (response) {
            this.Tyres = response.content;
            this.currentPageOfTyres = this.Tyres;
        }
      }); 
     }
  });
  }

  handlePageChange($event: number): void {
    this.pagination.page = $event;
    this.getAllTyres();
  }

  handlePageSizeChange(size: any): void {
    this.pagination.size = size;
    this.pagination.page = 1;
    this.getAllTyres();
  }

  removeTyreInstallation(tyreActivityId:any):void {
    let value:any;
    Swal.fire({
      title: 'Uninstall Tyre',
      inputLabel: 'Please provide odometer reading:',
      input: 'text',
      inputPlaceholder: 'odometer reading',
      inputValue: value,
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value){
          this.apiService.get(this.apiUrls.uninstallTyre + '?activityId='+ tyreActivityId+'&odometerReading='+result.value).subscribe((response: any) => {
            // if(response){
              this.getAllTyres();
          // }
          });
        }
      }
    });
    
  }
  deleteTyreOnClick(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this tyre !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
          this.apiService.update(this.apiUrls.deletetyre + id, {}).subscribe((res: any) => {
              Swal.fire(
                  'Great!',
                  'Your Tyre has been successfully deleted',
                  'success'
              );
              this.getAllTyres();
          }, error => {
            Swal.fire("Oops...", "Error finding data!", 'error');
          });
      }
    });
  }

}



      
        // this.addTyreOnClick = function () {
        //     $state.go('addTyre');
        // };

        // this.addTyreActivityOnClick = function (tyreId) {
        //     $state.go('addTyreActivity', {tyreId: tyreId});
        // };


        // this.updateTyreActivityOnClick = function (typeActivityId) {
        //     $state.go('editTyreActivity', {typeActivityId: typeActivityId});
        // };

        

        // this.$on('reloadTyresInfo', function (e, value) {
        //     this.init();
        // });