import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ApiUrls } from 'src/app/_helpers/apiUrls';

@Component({
  selector: 'app-viewjobsbyinventories',
  templateUrl: './viewjobsbyinventories.component.html',
  styleUrls: ['./viewjobsbyinventories.component.css']
})
export class ViewjobsbyinventoriesComponent implements OnInit {

  public inventoryJobs: Array<any> = [];
  jobsCount:any;
  public inventoryId: any;
  public errorMessage: any;
  getQuery:any = {}
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

  constructor(private router: Router,
    public apiService: ApiServiceService,
    private apiUrls: ApiUrls,
    private actRoute: ActivatedRoute) { 
    this.inventoryId = this.actRoute.snapshot.params.id || '';
  }

  ngOnInit(): void {
    this.getQuery = {inventoryId:this.inventoryId};
    this.apiService.getAll(this.apiUrls.getAllsearchJobs, this.getQuery).subscribe((response: any) => {
      this.inventoryJobs = response.content;
      this.jobsCount = this.inventoryJobs.length;
    });
  }

  handlePageChange($event: number): void {
    this.pagination.page = $event;
    this.ngOnInit();
  }

  handlePageSizeChange(size: any): void {
    this.pagination.size = size;
    this.pagination.page = 1;
    this.ngOnInit();
  }
}
