import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OnlynumberDirective} from '../../../../_helpers/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public roles: Array<any> = [];
  public titleHeader: any = 'Add a New Role';
  public role: any = {};
  public roleId: any;
  public errorMessage: any;
  sortOrder = 'name';
  orderBy = 'asc';
  public rolesQuery: any = {
    page: 1,
    size: 10,
    count: 0,
    pageSizes: [],
    sort: this.sortOrder + ',' + this.orderBy,
  };
  public rolesCount: any;

  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getRolesCount();
  }

  private getRolesCount(): void {
    this.apiService.get(this.apiUrls.getRolesCount).subscribe((res: any) => {
      if (res !== 0) {
        this.rolesCount = res;
        OnlynumberDirective.pagination(res, this.rolesQuery);
        this.getAllRoles();
      } else {
        Swal.fire('Oops...', 'Error finding Roles data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  public getAllRoles(): void {
    this.apiService.get(this.apiUrls.getAllRoles + '?page=' + this.rolesQuery.page +
        '&size=' + this.rolesQuery.size + '&sort=' + this.rolesQuery.sort).subscribe((res: any) => {
      if (res) {
        this.roles = res.content;
      } else {
        Swal.fire('Oops...', 'Error finding City data!', 'error');
      }
    }, error => {
      this.errorMessage = error.message;
    });
  }

  addRole(addEditRoleModal: any): void {
    this.roleId = '';
    this.titleHeader = 'Add a New Role';
    this.modalService.open(addEditRoleModal, {backdrop: 'static'});
  }

  save(): void {
    if (!this.role.name) {
      this.errorMessage = 'Please enter Role Name';
    } else {
      if (this.roleId) {
        this.apiService.update(this.apiUrls.updateRole + this.roleId, this.role).subscribe((res: any) => {
          if (res) {
            Swal.fire('Great', 'Your Role has been updated successfully', 'success');
            this.closeModal();
            this.getRolesCount();
          }
        }, error => {
          this.errorMessage = error.message;
        });
      } else {
        this.apiService.create(this.apiUrls.saveRole, this.role).subscribe((res: any) => {
          if (res) {
            Swal.fire('Great', 'Your Role has been successfully added', 'success');
            this.closeModal();
            this.getRolesCount();
          }
        }, error => {
          this.errorMessage = error.message;
        });
      }
    }
  }

  closeModal(): void {
    this.errorMessage = '';
    this.role = {};
    this.modalService.dismissAll();
  }

  updateRole(addEditRoleModal: any, roleId: any): void {
    if (roleId) {
      this.roleId = roleId;
      this.modalService.open(addEditRoleModal, {backdrop: 'static'});
      this.titleHeader = 'Update Role';
      this.apiService.get(this.apiUrls.getRole + roleId).subscribe((res: any) => {
        if (res) {
          this.role = res;
        }
      });
    } else {
      console.log(roleId);
    }
  }

  deleteRole(roleId: any): void {
    if (roleId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Role !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.delete(this.apiUrls.deleteRole + roleId).subscribe((res: any) => {
            Swal.fire(
                'Deleted!',
                'Your Role has been successfully deleted',
                'success'
            );
            this.getRolesCount();
          });
        }
      });
    } else {
      Swal.fire('Oops...', 'Error finding Roles data!', 'error');
    }
  }

  handlePageChange(event: number): void {
    this.rolesQuery.page = event;
    this.getRolesCount();
  }

  handlePageSizeChange(event: any): void {
    this.rolesQuery.size = event;
    this.rolesQuery.page = 1;
    this.getRolesCount();
  }

  clickSorting(event: any): void {
    OnlynumberDirective.clickSorting(event, this.rolesQuery);
    this.getRolesCount();
  }

}
