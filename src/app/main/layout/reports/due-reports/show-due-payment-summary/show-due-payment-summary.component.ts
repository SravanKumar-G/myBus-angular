import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';


@Component({
    selector: 'app-show-due-payment-summary',
    templateUrl: './show-due-payment-summary.component.html',
    styleUrls: ['./show-due-payment-summary.component.css']
})

@Injectable({
    providedIn: 'root'
})

export class ShowDuePaymentSummaryComponent implements OnInit {
    public paidSummary: Array<any> = [];
    public totalPaidAmount = 0;

    @Input() selectedBookings: any;

    constructor(public modalService: NgbModal,
                private apiService: ApiServiceService,
                private apiUrls: ApiUrls) {
    }


    ngOnInit(): void {
        console.log(this.selectedBookings);
    }

    payBookings(modal: any): void {
        if (this.selectedBookings) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to Pay selected bookings now?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, pay now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.create(this.apiUrls.payBookingDues, this.selectedBookings).subscribe((res: any) => {
                        if (res) {
                            this.paidSummary = res;
                            this.totalPaidAmount = 0;
                            for (const data of this.paidSummary) {
                                this.totalPaidAmount += data.netAmt;
                            }
                            Swal.fire('Done!', 'Payment done successfully', 'success');
                            this.modalService.open(modal, {size: 'lg', backdrop: 'static'});
                            this.apiService.getLoggedInUserData();
                        }
                    });
                }
            });
        }
    }

  closeModal(): void {
    this.modalService.dismissAll();
    location.reload();
  }
}
