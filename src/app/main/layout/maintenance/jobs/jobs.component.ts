import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlynumberDirective } from 'src/app/customDirectives/directives/onlynumber.directive';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  query:any = {
    vehicleId: '',
    inventoryId: ''
  };
  total = 0;
  pendingCount = 0;
  completedCount = 0;
  searchcount = 0;
  public errorMessage: any;
  sortOrder = 'date';
  orderBy = 'desc';
  public tab: any = 1;
  public inventories: Array<any> = [];
  public pendingJobs: Array<any> = [];
  public completedJobs: Array<any> = [];
  public searchResults:Array<any> = [];
  public allVehicles:Array<any> = [];
  public currentUser:any;
  pendingpagination: any = {
    count: 0,
    size: 10,
    page: 1,
    pageSizes: [],
    sortOrder: 'desc',
    orderBy: 'createdAt',
    query: '',
    sort: this.sortOrder + ',' + this.orderBy,
  };
  completedpagination: any = {
    count: 0,
    size: 10,
    page: 1,
    pageSizes: [],
    sortOrder: 'desc',
    orderBy: 'createdAt',
    query: '',
    sort: this.sortOrder + ',' + this.orderBy,
  };
  searchpagination: any = {
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    this.apiService.get(this.apiUrls.getAllInventories).subscribe((response: any) => {
      this.inventories = response.content;
    });
    this.changePaymentsTab(this.tab);
  }


  changePaymentsTab(tabkey: any): void {
    this.tab = tabkey ? tabkey : 1;
    switch (this.tab){
      case 1:
        this.loadPending();
        break;
      case 2:
        this.loadCompleted();
        break;
      case 3:
        this.loadsearchJobs();
        this.getVehicles();
    }
  }

  getVehicles() {
    this.apiService.getAll(this.apiUrls.getAllVehicles, {}).subscribe((res: any) => {
        this.allVehicles = res.content;
    });
  };
  

  loadPending(): void{
    this.apiService.getAll(this.apiUrls.getCountForJobs, {"completed":false}).subscribe((count: any) => {
      if (count) {
        this.pendingCount = count;
        OnlynumberDirective.pagination(count, this.pendingpagination);
        this.apiService.get(this.apiUrls.getPendingJobs  + '?page=' + this.pendingpagination.page + '&query=' + this.pendingpagination.query + '&size=' 
        + this.pendingpagination.size + '&sort=' + this.pendingpagination.sort).subscribe((response: any) => {
          if(response){
              this.pendingJobs = response.content;
              // this.pendingCount = response.totalElements;
          }
      }, error => {
        this.errorMessage = error.message;
      });
      }
    }, error => {
      this.errorMessage = error.message;
    });
};

loadCompleted(): void{
    this.apiService.getAll(this.apiUrls.getCountForJobs, {"completed":true}).subscribe((count: any) => {
      if (count) {
        this.completedCount = count;
        OnlynumberDirective.pagination(count, this.completedpagination);
        this.apiService.get(this.apiUrls.getCompletedJobs  + '?page=' + this.completedpagination.page + '&query=' + this.completedpagination.query + '&size=' 
        + this.completedpagination.size + '&sort=' + this.completedpagination.sort).subscribe((response: any) => {
          if(response){
              this.completedJobs = response.content;
              // this.completedCount = response.totalElements;
          }
      });
      }
    });
};


pendinghandlePageChange($event: number): void {
  this.pendingpagination.page = $event;
  this.loadPending();
}

pendinghandlePageSizeChange(size: any): void {
  this.pendingpagination.size = size;
  this.pendingpagination.page = 1;
  this.loadPending();
}


completedhandlePageChange($event: number): void {
  this.pendingpagination.page = $event;
  this.loadCompleted();
}

completedhandlePageSizeChange(size: any): void {
  this.pendingpagination.size = size;
  this.pendingpagination.page = 1;
  this.loadCompleted();
}

searchhandlePageChange($event: number): void {
  this.pendingpagination.page = $event;
  this.loadsearchJobs();
}

searchhandlePageSizeChange(size: any): void {
  this.pendingpagination.size = size;
  this.pendingpagination.page = 1;
  this.loadsearchJobs();
}

deleteJob(id:any): void {
  if(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this this Job !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
          this.apiService.delete(this.apiUrls.deleteJob + id).subscribe((res: any) => {
              Swal.fire(
                  'Great!',
                  'Job successfully deleted',
                  'success'
              );
              this.loadPending();
          }, error => {
            Swal.fire("Oops...", "Error finding data!", 'error');
          });
      }
  });
  }
}


// /* For Job search */
loadsearchJobs(): void{
    this.query.page = this.searchpagination.page-1;
    this.query.sort = this.searchpagination.sort;
    this.query.size = this.searchpagination.size;

    if(this.query.startDate > this.query.endDate) {
        Swal.fire("Error", "End Date should be greater than Start date", "error");
    }else {
      if(!this.query.inventoryId && !this.query.vehicleId){
        this.query = {};
        this.query.page = this.searchpagination.page-1;
        this.query.sort = this.searchpagination.sort;
        this.query.size = this.searchpagination.size;
      }
      this.apiService.getAll(this.apiUrls.getAllsearchJobs, this.query).subscribe((response: any) => {
            this.searchResults = response.content;
            this.searchcount = response.totalElements;
            OnlynumberDirective.pagination(this.searchcount, this.searchpagination);
        });
    }
};


searchJob(){
    if(this.query.startDate) {
        var startDate = new Date(this.query.startDate);
        var startYear = startDate.getFullYear();
        var startMonth = startDate.getMonth() + 1;
        var startDay = startDate.getDate();
        this.query.startDate = startYear + '-' + startMonth + '-' + startDay;
    }
    if(this.query.endDate){
        var endDate = new Date(this.query.endDate);
        var endYear = endDate.getFullYear();
        var endMonth = endDate.getMonth() + 1;
        var endDay = endDate.getDate();
        this.query.endDate = endYear + '-' + endMonth + '-' + endDay;
    }
    this.loadsearchJobs();
};

exportToExcel(tableId:any, fileName:any) {
  this.apiService.exportExcel(tableId,
            this.currentUser.userName + fileName, '', '');
    // paginationService.exportToExcel(tableId, fileName);
}

print(eleId:any) {
  const printContent = document.getElementById('jobSearchTable1');
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        // @ts-ignore
  WindowPrt.document.write(printContent?.innerHTML);
        // @ts-ignore
  WindowPrt.document.close();
    // printManager.print(eleId);
}

}

