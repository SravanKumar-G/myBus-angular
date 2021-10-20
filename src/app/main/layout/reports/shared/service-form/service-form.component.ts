import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  public formId: any;
  public serviceForm: any = {};
  public downloaded = false;

  constructor(
      private apiService: ApiServiceService,
      private apiUrls: ApiUrls,
      private actRoute: ActivatedRoute,
      private router: Router
  ) {
    this.formId = this.actRoute.snapshot.params.id || '';
  }

  ngOnInit(): void {
    if (this.formId) {
      this.getServiceFormDetails();
    }else{
      Swal.fire('error', 'Did not find any Service form Id', 'error');
    }
  }

  getServiceFormDetails(): void {
    this.apiService.get(this.apiUrls.getDetailsByFormId + this.formId).subscribe((res: any) => {
      if (res) {
        this.serviceForm = res;
        if (this.serviceForm.requiresVerification === undefined) {
          this.serviceForm.requiresVerification = false;
        }
        this.downloaded = true;
      }
    }, error => {
      Swal.fire('error', error.message, 'error');
    });
  }

}
