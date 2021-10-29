import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-escalations',
    templateUrl: './escalations.component.html',
    styleUrls: ['./escalations.component.css']
})
export class EscalationsComponent implements OnInit {

    tab = 1;
    filterObj: any = {
        page: 1,
        size: 20,
        pageSizes: [],
    };
    public escalationsCount: any;
    public listOfEscalations: Array<any> = [];
    public listOfRoutes: Array<any> = [];

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getAllRoutes();
        this.tabChange(this.tab);
    }

    tabChange(tabKey: any): void {
        this.tab = tabKey ? tabKey : 1;
        switch (this.tab) {
            case 1:
                this.loadCountOfEscalations('Escalated');
                break;
            case 2:
                this.loadCountOfEscalations('Resolved');
                break;
            default:
                this.loadCountOfEscalations('Escalated');
                break;
        }
    }

    loadCountOfEscalations(status: any): void {
        this.filterObj.status = status;
        this.apiService.getAll(this.apiUrls.countOfEscalations, this.filterObj).subscribe((count: any) => {
                console.log(count);
                this.escalationsCount = count;
                OnlynumberDirective.pagination(count, this.filterObj);
                this.getAllEscalations();
        }, error => {
            Swal.fire('Error', 'There are no Escalations', 'error');
        });
    }


    public getAllEscalations(): void {
        this.apiService.getAll(this.apiUrls.getAllEscalations, this.filterObj).subscribe((data: any) => {
            if (data) {
                this.listOfEscalations = data.content;
            }
        }, error => {
            Swal.fire('Error', error.message, 'error');
        });
    }

    public getAllRoutes(): void {
        this.apiService.get(this.apiUrls.getAllRoutes).subscribe((res: any) => {
            if (res) {
                this.listOfRoutes = res;
            }
        });
    }

    handlePageChange(event: any): void {
        this.filterObj.page = event;
        this.loadCountOfEscalations('Escalated');
    }

    handlePageSizeChange(event: any): void {
        this.filterObj.size = event;
        this.filterObj.page = 1;
        this.loadCountOfEscalations('Escalated');
    }

    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.filterObj);
        this.loadCountOfEscalations('Escalated');
    }

    addingComments(id: any, status: any): void {
        Swal.fire({
            title: '<h4>' + 'Email Message' + '</h4>',
            html: 'Type your message here:',
            input: 'text',
            inputPlaceholder: 'Enter Message',
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
                    this.apiService.update(this.apiUrls.addCommentToBooking +  id, {comments: data} )
                        .subscribe((response: any) => {
                            if (response) {
                                Swal.fire('Great!', 'Booking feedback status is successfully updated..!', 'success');
                                if (status === 'Resolved') {
                                   this.tabChange(2);
                                }else{
                                    this.tabChange(1);
                                }
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

    resolveBookingFeedback(id: any, status: any): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Resolve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.apiService.update(this.apiUrls.escalationResolve + id, {}).subscribe((res: any) => {
                    if (res) {
                        Swal.fire(
                            'Great', 'Booking feedback status is successfully updated', 'success'
                        );
                        if (status === 'Resolved') {
                            this.tabChange(2);
                        }else{
                            this.tabChange(1);
                        }
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

    sendEmail(id: any, status: any): void {
        Swal.fire({
            title: '<h4>' + 'Email Message' + '</h4>',
            html: 'Type your message here:',
            input: 'text',
            inputPlaceholder: 'Enter Message',
            showCancelButton: true,
            confirmButtonText: 'Send Email',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            preConfirm: (data) => {
                if (!data) {
                    Swal.showValidationMessage(
                        'Enter comment'
                    );
                } else {
                    this.apiService.create(this.apiUrls.sendEmail + '&message=' + data + '&bookingFeedbackId=' + id, {} )
                        .subscribe((response: any) => {
                            if (response) {
                                Swal.fire('Great!', 'Email has been sent successfully..!', 'success');
                            }
                            if (status === 'Resolved') {
                                this.tabChange(2);
                            }else{
                                this.tabChange(1);
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

    handlePageApprovedChange(event: any): void {
        this.filterObj.page = event;
        this.loadCountOfEscalations('Resolved');
    }

    handlePageApprovedSizeChange(event: any): void {
        this.filterObj.size = event;
        this.filterObj.page = 1;
        this.loadCountOfEscalations('Resolved');
    }

    clickSortingApproved(event: any): void {
        OnlynumberDirective.clickSorting(event, this.filterObj);
        this.loadCountOfEscalations('Resolved');
    }
}
