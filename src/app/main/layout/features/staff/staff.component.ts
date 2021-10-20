import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public staff: any = [];
  public filter: any = {};
  public staffCount: any;
  public staffId: any;
  public searchQuery = {checkVaccinated: false};
  sortOrder = 's.name';
  orderBy = 'asc';
  staffQuery: any = {
    searchText: '',
    byVaccinated: false,
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    orderBy: 'asc',
    sortOrder: 's.name',
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public searchText: any;

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.count();
  }
  editStaff(staffId: any): void {
    this.router.navigate(['add-edit-staff', {id: staffId}]);
  }
  count(): void{
    this.apiService.getAll(this.apiUrls.getStaffCount, this.staffQuery).subscribe((res: any) => {
      if (res || res === 0){
        this.staffCount = res;
        OnlynumberDirective.pagination(res, this.staffQuery);
        this.getAllStaffList();
      }

    });
  }
  getAllStaffList(): void{
    this.apiService.getAll(this.apiUrls.getStaffList, this.staffQuery).subscribe((res: any) => {
      if (res){
        this.staff = res.content;
      }
    });
  }
  deleteStaff(staffId: any): void {}
  clickSorting(event: any): void {
    OnlynumberDirective.clickSorting(event, this.staffQuery);
    this.count();
  }

  handlePageChange(event: number): void {
    this.staffQuery.page = event;
    this.count();
  }

  handlePageSizeChange(event: any): void {
    this.staffQuery.size = event;
    this.staffQuery.page = 1;
    this.count();
  }
  exportExcel(): void{
    this.apiService.exportExcel('staffExcelData', 'Staff', '', '');
  }
}
