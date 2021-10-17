import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ApiServiceService} from '../../../../services/api-service.service';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cargo-cancellations',
    templateUrl: './cargo-cancellations.component.html',
    styleUrls: ['./cargo-cancellations.component.css']
})
export class CargoCancellationsComponent implements OnInit {

    public tab = 1;
    public pendingData: Array<any> = [];
    public cancelledData: Array<any> = [];
    public currentUser: any;
    sortOrder = 'deliveredOn';
    orderBy = 'asc';
    public filter: any = {
        page: 1,
        size: 20,
        pageSizes: [],
        sort: this.sortOrder + ',' + this.orderBy
    };
    public cancelledFilter: any = {
        page: 1,
        size: 20,
        pageSizes: [],
        sort: 'canceledOn' + ',' + 'asc'
    };
    public cancelledCargoCount: any;
    public pendingCargoCount: any;
    searchString: any;
    canceledSearchString: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.changeInvoiceTab(1);
    }

    changeInvoiceTab(tabKey: number): void {
        this.tab = tabKey ? tabKey : 1;
        switch (this.tab) {
            case 1:
                this.getAllPendingCount();
                break;
            case 2:
                this.getAllCancelledCount();
                break;
        }
    }


    public getAllPendingCount(): void {
        this.apiService.getAll(this.apiUrls.pendingShipmentsCount, this.filter).subscribe((res: any) => {
            if (res > 0) {
                this.pendingCargoCount = res;
                OnlynumberDirective.pagination(res, this.filter);
                this.getAllPendingShipments();
            }
        });
    }

    private getAllPendingShipments(): void {
        this.apiService.getAll(this.apiUrls.getAllPendingShipments, this.filter).subscribe((res: any) => {
            if (res) {
                this.pendingData = res.content;
            }
        });
    }

    public getAllCancelledCount(): void {
        this.apiService.getAll(this.apiUrls.cancelledShipmentsCount, this.cancelledFilter).subscribe((res: any) => {
            if (res > 0) {
                this.cancelledCargoCount = res;
                OnlynumberDirective.pagination(res, this.cancelledFilter);
                this.getAllCancelledShipments();
            }
        });
    }

    private getAllCancelledShipments(): void {
        this.apiService.getAll(this.apiUrls.getAllCancelledShipments, this.cancelledFilter).subscribe((res: any) => {
            if (res) {
                this.cancelledData = res;
            }
        });
    }

    saveShipmentId(id: any): void {
        Swal.fire({
            title: '<h4>' + 'Reason?' + '</h4>',
            html: 'Please provide comment:',
            input: 'text',
            inputPlaceholder: 'comment',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Approve',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            preConfirm: (data) => {
                if (!data) {
                    Swal.showValidationMessage(
                        'Enter comment'
                    );
                } else {
                    const obj = {
                        shipmentId: undefined,
                        reason: undefined
                    };
                    obj.shipmentId = id;
                    obj.reason = data;
                    this.apiService.update(this.apiUrls.approveCancellation, obj)
                        .subscribe((response: any) => {
                            if (response) {
                                this.getAllPendingCount();
                                Swal.fire('Great!',  'You have successfully approved the cancellation', 'success');
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

    handlePageChange($event: number): void {
        this.filter.page = $event;
        this.getAllPendingCount();
    }

    handlePageSizeChange(size: any): any {
        this.filter.size = size;
        this.filter.page = 1;
        this.getAllPendingCount();
    }

    cancelledHandlePageChange($event: number): void {
        this.cancelledFilter.page = $event;
        this.getAllCancelledCount();
    }

    cancelledHandlePageSizeChange(size: any): any {
        this.cancelledFilter.size = size;
        this.cancelledFilter.page = 1;
        this.getAllCancelledCount();
    }

    goToBooking(id: any): void {
        this.router.navigate(['viewCargoBooking', id]);
    }

    pendingDataExport(): void {
        this.apiService.exportExcel('pendingCancellations',
            this.currentUser.userName + '_pendingCancellations', '', '');
    }

    canceledDataExport(): void {
        this.apiService.exportExcel('cancelledCargo',
            this.currentUser.userName + '_cancelledCargo', '', '');
    }
}
