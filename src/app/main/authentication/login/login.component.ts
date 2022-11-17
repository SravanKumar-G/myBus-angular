import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {ApiServiceService} from '../../../services/api-service.service';
import {ApiUrls} from '../../../_helpers/apiUrls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public currentUserDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiService: ApiServiceService,
    private apiUrls: ApiUrls,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() {
    // @ts-ignore
    return this.loginForm.controls;
  }

  title: 'Login' | undefined;
  public loginForm: any = FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
  public currentUser: any;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit(): void {
    localStorage.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.logIn(this.f.userName.value, this.f.password.value)
      .pipe(first()).subscribe(data => {
      if (data.accessToken) {
        this.apiService.get(this.apiUrls.getCurrentUser).subscribe((res: any) => {
          this.currentUserDetails = res;
          // console.log('this.currentUserDetails', this.currentUserDetails);
          localStorage.setItem('currentUserDetails', JSON.stringify(this.currentUserDetails));
          this.router.navigate([this.returnUrl]);
          // window.location.reload();
        });
      }
    }, error => {
      this.error = error.message;
      this.submitted = true;
    });
  }

}
