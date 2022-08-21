import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  public employeeData: any = {
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    department: '',
    skills: ''
  };
  public employeeId: any;
  public employeeTitle = '';
  constructor(private router: Router,
              public apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute) {
    this.employeeId = this.actRoute.snapshot.params.id || '';
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.employeeTitle = 'Edit Employee';
      this.getEmployee();
    } else {
      this.employeeTitle = 'Add Employee';
    }
  }

  saveEmployee(): void {
    if (this.employeeId){
      this.apiService.update(this.apiUrls.updateEmployee, this.employeeData).subscribe((res: any) => {
        if (res){
          this.router.navigate(['employee']);
        }
      });
    } else {
      this.apiService.getAll(this.apiUrls.addEmployee, this.employeeData).subscribe((res: any) => {
        if (res){
          this.router.navigate(['employee']);
        }
      });
    }
  }

  getEmployee(): void{
    this.apiService.get(this.apiUrls.getEmployee + this.employeeId).subscribe((res: any) => {
      if (res){
        this.employeeData = res;
      }
    });
  }

  cancel(): void {

  }
}
