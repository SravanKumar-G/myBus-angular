import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Injectable({
    providedIn: 'root'
})

@Component({
    selector: 'app-view-cargo-booking',
    templateUrl: './view-cargo-booking.component.html',
    styleUrls: ['./view-cargo-booking.component.css']
})
export class ViewCargoBookingComponent implements OnInit {
    public cargoBookingId: any;
    public cargoDetails: any = {attrs: {}};

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private router: Router,
                private location: Location) {
        this.cargoBookingId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        if (this.cargoBookingId.length !== 24) {
            this.getCargoDetailsByBookingId();
        }else{
            this.getCargoDetailsById();
        }
    }

    getCargoDetailsByBookingId(): void {
        this.apiService.get(this.apiUrls.cargoDetailsByLR + '?LRNumber=' + this.cargoBookingId).subscribe((res: any) => {
            if (res) {
                if (res.length === 0) {
                    this.router.navigate(['newBooking']);
                    Swal.fire('error', 'No Cargo Bookings found', 'error');
                } else if (res.length === 1) {
                    this.cargoDetails = res[0];
                } else {
                    this.router.navigate(['newBooking', {data: res}]);
                }
            } else {

            }
        });
    }

    getCargoDetailsById(): void {
        this.apiService.get(this.apiUrls.getCargoDetailsById + this.cargoBookingId).subscribe((res: any) => {
            if (res) {
                this.cargoDetails = res;
            }
        });
    }

    printCargo(lrNumber: string): void {
        /*const printContent = document.getElementById('report_left_inner');
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        // @ts-ignore
        WindowPrt.document.write('<html><body onload="window.print()">' + printContent.innerHTML + '</body></html>');
        // @ts-ignore
        WindowPrt.document.close();*/
        console.log('getting PDF');
        this.apiService.getBlob(this.apiUrls.printCargoBooking + lrNumber)
            .subscribe((response: Blob) => {
                if (response){
                    console.log('got PDF');
                    const file = new Blob([response], {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    console.log('printed');
                }
            }, (error) => {
                Swal.showValidationMessage(
                    `Enter comment :` + error
                );
            });
    }

    initiateDeliverCargoBooking(bookingId: any): void {
        Swal.fire({
            title: '<h4>' + 'Deliver Comment?' + '</h4>',
            html: 'Please provide delivery comment:',
            input: 'text',
            inputPlaceholder: 'Collecting person name or identification',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Deliver',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            preConfirm: (data) => {
                if (!data) {
                    Swal.showValidationMessage(
                        'Enter comment'
                    );
                } else {
                    this.apiService.update(this.apiUrls.initiateDeliverCargoBooking
                        + bookingId, data)
                        .subscribe((response: any) => {
                            if (response) {
                                Swal.fire('Great!', response.shipmentNumber + ' has been delivered.', 'success');
                                this.router.navigate(['cargoBookings']);
                                this.apiService.getLoggedInUserData();
                            }
                        }, (error) => {
                            Swal.showValidationMessage(
                                `Enter comment :` + error
                            );
                        });
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }

    cancelCargoBooking(bookingId: any): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this booking now?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.apiService.update(this.apiUrls.cancelCargoBooking + bookingId, {}).subscribe((res: any) => {
                    if (res) {
                        Swal.fire(
                            'Cancelled!',
                            'Your booking has been Cancelled.',
                            'success'
                        );
                        // window.location.reload();
                        this.router.navigate(['cargoBookings']);
                    }
                }, error => {
                    Swal.fire(
                        'Error!',
                        error.message,
                        'error'
                    );
                });
            }
        });
    }

    sendSMS(bookingId: any): void {
        this.apiService.create(this.apiUrls.sendSMSForCargoBooking + bookingId, {}).subscribe((res: any) => {
            if (res) {
                Swal.fire(
                    'Success!',
                    'SMS sent Successfully..!.',
                    'success'
                );
            }
        }, error => {
            Swal.fire(
                'error!',
                error.message,
                'error'
            );
        });
    }

    addCommentToBooking(bookingId: any): void {
        this.apiService.get(this.apiUrls.getCargoBooking + bookingId).subscribe((cargoBooking: any) => {
            if (cargoBooking) {
                Swal.fire({
                    title: '<h4>' + 'Comment?' + '</h4>',
                    html: 'Please provide comment:',
                    input: 'text',
                    inputPlaceholder: 'Add Comment',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    inputValue: cargoBooking.reviewComment,
                    showCancelButton: true,
                    confirmButtonText: 'Add Comment',
                    confirmButtonColor: 'green',
                    showLoaderOnConfirm: true,
                    preConfirm: (data) => {
                        if (!data) {
                            Swal.showValidationMessage(
                                'Enter comment'
                            );
                        } else {
                            this.apiService.update(this.apiUrls.saveCommentCargoBooking
                                + bookingId, data)
                                .subscribe((response: any) => {
                                    if (response) {
                                        Swal.fire('Great!', 'Comment added Successfully..!', 'success');
                                        this.router.navigate(['cargoBookings']);
                                        // window.location.reload();
                                    }
                                }, (error) => {
                                    Swal.showValidationMessage(
                                        `Enter comment :` + error
                                    );
                                });
                        }
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                });
            }
        });
    }

    goToBackPage(): void {
        this.location.back();
    }

    sendWhatsApp(cargoDetails: any): void {
        this.apiService.sendWhatsApp(cargoDetails.fromContact, cargoDetails.attrs.SMS);
    }
}
