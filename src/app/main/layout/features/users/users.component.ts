import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: Array<any> = [];
  public errorMessage: any;
  sortOrder = 'name';
  orderBy = 'asc';
  public usersQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public usersCount: any;
  public filter: any;
  public boolean: true | undefined;

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private targetElem: ElementRef) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  deleteUser(userId: any): void {
    if (userId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this User !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.delete(this.apiUrls.deleteUser + userId).subscribe((res: any) => {
            Swal.fire(
                'Deleted!',
                'User has been deleted successfully',
                'success'
            );
            this.getUsers();
          });
        }
      });
    } else {
      Swal.fire('Oops...', 'Error finding User data!', 'error');
    }
  }


  clickSorting(event: any): void {
    OnlynumberDirective.clickSorting(event, this.usersQuery);
    this.getUsersCount();
  }

  handlePageChange(event: number): void {
    this.usersQuery.page = event;
    this.getUsersCount();
  }

  handlePageSizeChange(event: any): void {
    this.usersQuery.size = event;
    this.usersQuery.page = 1;
    this.getUsersCount();
  }

  private getUsersCount(): void {
    this.apiService.get(this.apiUrls.branchOfficesCount).subscribe((res: any) => {
      if (res !== 0) {
        this.usersCount = res;
        // OnlynumberDirective.pagination(res, this.usersQuery);
        this.getUsers();
      } else {
        Swal.fire('Oops...', 'Error finding Branch Offices data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  private getUsers(): void {
    this.apiService.get(this.apiUrls.getUsers).subscribe((res: any) => {
      if (res) {
        this.users = res;
        this.usersCount = this.users.length;
      } else {
        Swal.fire('Oops...', 'Error finding Users data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  isAdmin(): boolean {
    return true;
  }
}
