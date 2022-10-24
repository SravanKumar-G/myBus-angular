import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
    selector: 'app-service-feedback-report',
    templateUrl: './service-feedback-report.component.html',
    styleUrls: ['./service-feedback-report.component.css']
})
export class ServiceFeedbackReportComponent implements OnInit {
    public serviceId: any;
    public serviceFeedback: any = {};
    public errorMessage: any;
    public index: any;
    public errorCommentMessage: any;
    public ids: any = [];
    public  bookings: any = {
        idsList: this.ids,
        selection: '',
    };

    constructor(
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private actRoute: ActivatedRoute,
        private location: Location
    ) {
        this.serviceId = this.actRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        if (this.serviceId) {
            this.getAllServiceFeedback();
        }
    }

    public getAllServiceFeedback(): void {
        this.apiService.get(this.apiUrls.serviceFeedbackReports + this.serviceId).subscribe((res: any) => {
            if (res) {
                this.serviceFeedback = res;
                res.bookingFeedbacks.forEach((data: any) => {
                  this.ids.push(data.id);
                });
                // this.pnrNumberList = res.
                if (this.serviceFeedback.status === null) {
                    this.serviceFeedback.status = '';
                }
                for (const data of this.serviceFeedback.bookingFeedbacks) {
                    if (data.status === null) {
                        data.status = '';
                    }
                }
            }
        });
    }

    updateFeedbackStatus(): void {
        this.apiService.update(this.apiUrls.serviceFeedbackStatusUpdate +
            this.serviceId, {status: this.serviceFeedback.status}).subscribe((res: any) => {
            if (res) {
                this.serviceFeedback = res;
                Swal.fire('Great', 'Service feedback status is successfully updated', 'success');
            }
        }, error => {
            Swal.fire('Error', 'Service feedback status update failed', 'error');
        });
    }

    updateBookingFeedbackStatus(feedback: any, id: any, index: any): void {
        this.index = index;
        this.errorCommentMessage = '';
        this.errorMessage = '';
        if (feedback.status === null || feedback.status === '') {
            this.errorMessage = 'Please select Status';
        } else {
            this.apiService.update(this.apiUrls.bookingFeedbackStatusUpdate + feedback.id,
                {
                    serviceFeedbackId: id,
                    status: feedback.status,
                    comment: feedback.feedback,
                    serviceReportId: feedback.serviceReportId,
                    jdate: this.serviceFeedback.jdate
                }).subscribe((res: any) => {
                Swal.fire('Great', 'Booking feedback status is successfully updated', 'success');
                if (res) {
                    this.serviceFeedback = res;
                    Swal.fire('Great', 'Booking feedback status is successfully updated', 'success');
                }
            }, error => {
                Swal.fire('Error', 'Booking feedback status update failed', 'error');
            });
        }
    }

    backToPrevious(): void {
        this.location.back();
    }

    requestFeedback(feedback: any): void {
        this.apiService.sendWhatsApp(feedback.phone, 'Hi ' + feedback.name + '(' + feedback.pnr + ')' + ' garu, thank you for travelling in Sri Krishna Travels.' +
            ' How did you like our bus service yesterday?');
    }
    sendThankYouMessage(feedback: any): void {
        this.apiService.sendWhatsApp(feedback.phone, 'Hi ' + feedback.name + '(' + feedback.pnr + ')' + ' garu, thank you for travelling in Sri Krishna Travels.' +
            ' How did you like our bus service yesterday?');
    }
    sendApologies(feedback: any): void {
        this.apiService.sendWhatsApp(feedback.phone, 'Hi ' + feedback.name + '(' + feedback.pnr + ')' + ' garu, thank you for travelling in Sri Krishna Travels. ' +
            'We apologize for the issue caused to you. Please provide us more details.');
    }
    sendCargoIntro(feedback: any): void {
        this.apiService.sendWhatsApp(feedback.phone, 'Hi ' + feedback.name + ' garu, thank you for travelling in Sri Krishna Travels. ' +
            'We also have cargo services. You can send packages to your loved ones easily through our buses. Please call on 9246460533 for further details.');
    }

 /*   sendFeedBackRequestToRedbusBookings(): void{
        this.apiService.getAll(this.apiUrls.pnrList, {bookingIds: this.ids} ).subscribe((res: any) => {
        });
    }*/

    sendMessageForBulkBookings(): void{
        this.apiService.getAll(this.apiUrls.sendBulkWhatsAppMessages, this.bookings).subscribe((res: any) => {
            console.log('hsd', res);
            if (res === true) {
                Swal.fire('Great', 'WhatsApp Messages for selected bookings successfully sent', 'success');
            }
        }, error => {
            Swal.fire('Error', 'Failed', 'error');
        });
    }
}
