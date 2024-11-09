import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  public currentUser: any = {};
  public user: any = {};
  public updatePasswordForm: any = UntypedFormGroup;
  public submitted = false;
  constructor(private apiService: ApiServiceService,
              private apiUrls: ApiUrls,
              private actRoute: ActivatedRoute,
              private fb: UntypedFormBuilder,
              ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
    this.user.userName = this.currentUser.userName;
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  updatePassword(): void {
    if (this.user.currentPassword !== this.currentUser.password){
      Swal.fire('Error!', 'Wrong current password', 'error');
      return;
    }
    if (this.user.password !== this.user.confirmPassword){
      Swal.fire('Error!', 'Password and confirm password do not match', 'error');
      return;
    }
    this.apiService.update(this.apiUrls.updatePassword, this.user).subscribe((res: any) => {
      Swal.fire('success', 'Password successfully updated', 'success');
    }, error => {
      Swal.fire('Error!', 'Failed to update password', 'error');
    });
  }
}


