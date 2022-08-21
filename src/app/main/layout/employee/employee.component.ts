import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../services/api-service.service';
import {ApiUrls} from '../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeesList: Array<any> = [];

  constructor(private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void{
    this.apiService.get(this.apiUrls.getEmployees).subscribe((res: any) => {
      if (res){
        this.employeesList = res;
      }
    });
  }

  deleteEmployee(id: string): void{
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Employee !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.delete(this.apiUrls.deleteEmployee + id).subscribe((res: any) => {
            Swal.fire(
                'Deleted!',
                'Your Employee has been successfully deleted',
                'success'
            );
            this.getAllEmployees();
          });
        }
      });
    }
  }
}
