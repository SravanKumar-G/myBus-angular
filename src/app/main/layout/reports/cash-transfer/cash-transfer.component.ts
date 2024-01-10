import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-cash-transfer',
    templateUrl: './cash-transfer.component.html',
    styleUrls: ['./cash-transfer.component.css']
})
export class CashTransferComponent implements OnInit {
    public tab = 1;
    public currentPageOfPendingCashTransfers: any;
    public currentPageOfApprovedCashTransfers: any;
    public myCashTransfers: any;
    public searchExpenses: any;
    public userId: any;
    public branchOffices: Array<any> = [];
    public users: Array<any> = [];
    public userNames: Array<any> = [];
    public errorMessage: any;
    public pendingCashTransfersCount: any;
    public approvedCashTransfersCount: any;
    public myCashTransfersCount: any;
    public pendingCashTransfers: any = [];
    public approvedCashTransfers: any = [];
    public titleHeader: any;
    public addCashTransferQuery: any;
    public cashTransferId: any;
    public newDate: any = new Date();
    public cashTransfer: any = {
        date: new Date(),
    };
    public currentUser: any;
    sortOrder = 'createdAt';
    orderBy = 'desc';
    public cashTransferQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        orderBy: 'desc',
        sortOrder: 'createdAt',
        sort: this.sortOrder + ',' + this.orderBy,
    };
    public myTransferQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        orderBy: 'desc',
        sortOrder: 'createdAt',
        sort: this.sortOrder + ',' + this.orderBy,
    };

    public pendingCashTransferQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        orderBy: 'desc',
        sortOrder: 'createdAt',
        sort: this.sortOrder + ',' + this.orderBy,
    };
    filterObj: any = {
        startDate: new Date(),
        endDate: new Date()
    };
    public startDate = new Date();
    public endDate = new Date();
    public SearchError: any;
    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal) {
        // this.cashTransferId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUserDetails') as string);
        this.userId = this.currentUser.id;
        this.loadBranchOffice();
        this.getUsers();
        this.changeCashTransferTab(1);
    }

    changeCashTransferTab(tabkey: any): void {
        this.tab = tabkey ? tabkey : 1;
        switch (this.tab) {
            case 1:
                this.getCount();
                break;
            case 2:
                this.getNonPendingCount();
                this.loadBranchOffice();
                this.getUsers();
                break;
            case 3:
            // this.searchPayments();
                this.loadBranchOffice();
                this.getUsers();
                break;
            case 4:
                this.getMyTransfersCount();
                this.loadBranchOffice();
                this.getUsers();
                break;
        }
    }

    closeModal(): void {
        this.errorMessage = '';
        this.addCashTransferQuery = {};
        this.modalService.dismissAll();
        this.router.navigate(['cashTransfer']);
    }

    cancel(): void {
        this.modalService.dismissAll();
    }

    addCashTransfer(addEditCashTransferModal: any): void {
        this.getUsers();
        this.cashTransferId = '',
        this.titleHeader = 'Add';
        this.modalService.open(addEditCashTransferModal, {
            backdrop: 'static', keyboard: false, backdropClass: 'backdropClass', size: 'md'});
    }

    loadBranchOffice(): void {
        this.apiService.get(this.apiUrls.loadBranchNames).subscribe((res: any) => {
            if (res) {
                this.branchOffices = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    getUsers(): void {
        this.apiService.get(this.apiUrls.getAllUsers).subscribe((res: any) => {
            if (res) {
                this.users = res;
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    userNamesMap(): void {
        this.apiService.get(this.apiUrls.userNamesMap).subscribe((res: any) => {
            if (res) {
                this.userNames = res;
            }
        });
    }

    getCount(): void {
        this.apiService.getAll(this.apiUrls.cashTransferPendingCount, {}).subscribe((res: any) => {
            if (res || res === 0) {
                this.pendingCashTransfersCount = res;
                OnlynumberDirective.pagination(res, this.pendingCashTransferQuery);
                this.getAllPending();
            } else {
                Swal.fire('Oops...', 'error retrieving payments count!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    getAllPending(): void {
        this.apiService.get(this.apiUrls.getPendingAll + '?page=' + this.pendingCashTransferQuery.page +
            '&size=' + this.pendingCashTransferQuery.size + '&sort=' + this.pendingCashTransferQuery.sort).subscribe((res: any) => {
            if (res) {
                this.userNamesMap();
                this.currentPageOfPendingCashTransfers = res.content;
                for (const data of this.currentPageOfPendingCashTransfers) {
                    data.attrs.createdBy = this.userNames[data.createdBy];
                }
                this.pendingCashTransfersCount = res.totalElements;
            }
        });
    }

    getNonPendingCount(): void {
        this.apiService.getAll(this.apiUrls.nonPendingCount, {}).subscribe((res: any) => {
            if (res || res === 0) {
                this.approvedCashTransfersCount = res;
                OnlynumberDirective.pagination(res, this.cashTransferQuery);
                this.getNonPendingList();
            }
        });
    }

    getNonPendingList(): void {
        this.apiService.get(this.apiUrls.getAllNonPending + '?page=' + this.cashTransferQuery.page +
            '&size=' + this.cashTransferQuery.size + '&sort=' + this.cashTransferQuery.sort).subscribe((res: any) => {
            if (res) {
                this.userNamesMap();
                this.currentPageOfApprovedCashTransfers = res.content;
                for (const ap of this.currentPageOfApprovedCashTransfers) {
                    ap.attrs.createdBy = this.userNames[ap.createdBy];
                }
                this.approvedCashTransfersCount = res.totalElements;
            }
        });
    }
    getMyTransfersCount(): void {
        this.apiService.getAll(this.apiUrls.nonPendingCount, {}).subscribe((res: any) => {
            if (res || res === 0) {
                this.approvedCashTransfersCount = res;
                OnlynumberDirective.pagination(res, this.myTransferQuery);
                this.getMyTransfers();
            }
        });
    }
    getMyTransfers(): void {
        this.apiService.get(this.apiUrls.getMyTransfers + '?page=' + this.myTransferQuery.page +
            '&size=' + this.myTransferQuery.size + '&sort=' + this.myTransferQuery.sort).subscribe((res: any) => {
            if (res) {
                this.userNamesMap();
                this.myCashTransfers = res.content;
                for (const ap of this.myCashTransfers) {
                    ap.attrs.createdBy = this.userNames[ap.createdBy];
                }
                this.myCashTransfersCount = res.totalElements;
            }
        });
    }
    exportExcel(): void {
    }

    saveCashTransfer(cashTransfer: any): void {
        if (!cashTransfer.balanceType) {
            this.errorMessage = 'Please select the balance type';
        } else if (!cashTransfer.amount) {
            this.errorMessage = 'Please Enter Amount';
        }else {
            if (cashTransfer.id) {
                this.apiService.update(this.apiUrls.saveOrUpdate, cashTransfer).subscribe((res: any) => {
                    if (res) {
                        this.addCashTransferQuery = res;
                    }
                    Swal.fire('Great', 'Successfully updated', 'success');
                    this.closeModal();
                    this.getCount();
                    this.apiService.getLoggedInUserData();
                }, error => {
                    this.errorMessage = error.message;
                    Swal.fire('Error',  error.message, 'error');
                });
            } else {
                this.apiService.create(this.apiUrls.saveOrUpdate, cashTransfer).subscribe((res: any) => {
                    if (res) {
                        // this.addCashTransferQuery = res;
                        Swal.fire('Great', 'Saved successfully', 'success');
                        this.closeModal();
                        this.getCount();
                        this.apiService.getLoggedInUserData();
                    }
                }, error => {
                    Swal.fire('Error',  error.message, 'error');
                });
            }
        }
    }
    Edit(addEditCashTransferModal: any, id: any): void{
        console.log(this.addCashTransferQuery, this.cashTransfer);
        this.cashTransferId = id;
        this.modalService.open(addEditCashTransferModal, {
            backdrop: 'static', keyboard: false, size: 'md', backdropClass: 'backdropClass'});
        this.titleHeader = 'Edit';
        this.apiService.get(this.apiUrls.saveOrUpdate + this.cashTransferId).subscribe((res: any) => {
            if (res){
                this.cashTransfer = res;
                this.cashTransfer.date = new Date(res.date);
            }
        }, error => {
            this.errorMessage = error;
        });

    }
    delete(id: any): void{
        Swal.fire({
            title: 'Are you sure?',
            text: 'Deleting this Cash Transfer?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value){
                this.apiService.delete(this.apiUrls.saveOrUpdate + id).subscribe((res: any) => {
                    Swal.fire(
                        'Disable!',
                        'Cash Transfer has been deleted successfully!',
                        'success'
                    );
                    this.getCount();
                });
            }
        });
    }
    approveOrRejectCashTransfer(cashTransfer: any, status: any): void{
        this.cashTransferId = cashTransfer.id;
        if (status === 'Approve'){
            cashTransfer.status = 'Approved';
        } else {
            cashTransfer.status = 'Rejected';
        }
        this.saveCashTransfer(cashTransfer);
    }

    date(): void{
        const day = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (this.startDate) {
            const currentDate = new Date(this.startDate);
            const startYear = currentDate.getFullYear();
            let startMonth: any = currentDate.getMonth() + 1;
            let startDay: any = currentDate.getDate();
            for (let m = 0; m <= day.length; m++) {
                if (startMonth === (day[m])) {
                    startMonth = '0' + startMonth;
                }
                if (startDay === (day[m])) {
                    startDay = '0' + startDay;
                }
            }
            this.filterObj.startDate = startYear + '-' + startMonth + '-' + startDay;
        }
        if (this.endDate) {
            const CDate = new Date(this.endDate);
            const startYear = CDate.getFullYear();
            let startMonth: any = CDate.getMonth() + 1;
            let startDay: any = CDate.getDate();
            for (let m = 0; m <= day.length; m++) {
                if (startMonth === (day[m])) {
                    startMonth = '0' + startMonth;
                }
                if (startDay === (day[m])) {
                    startDay = '0' + startDay;
                }
            }
            this.filterObj.endDate = startYear + '-' + startMonth + '-' + startDay;
        }
    }
    search(): void{
        if (this.startDate > this.endDate) {
            this.SearchError = 'End Date should not be before Start Date';
        } else {
            this.SearchError = '';
        }
        this.date();
        if (!this.SearchError){
            this.apiService.getAll(this.apiUrls.cashTransferSearch, this.filterObj).subscribe((res: any) => {
                if (res){
                    this.searchExpenses = res;
                }
            });
        }
    }

    changePendingPage($event: number): void {
        this.pendingCashTransferQuery.page = $event;
        this.getCount();
    }

    handlePendingPageSizeChange(size: any): void {
        this.pendingCashTransferQuery.size = size;
        this.pendingCashTransferQuery.page = 1;
        this.getCount();
    }
    changeApprovedPage($event: number): void {
        this.cashTransferQuery.page = $event;
        this.getNonPendingCount();
    }

    changeMyTransfersPage($event: number): void {
        this.myTransferQuery.page = $event;
        this.getMyTransfersCount();
    }
    handleApprovedPageSizeChange(size: any): void {
        this.cashTransferQuery.size = size;
        this.cashTransferQuery.page = 1;
        this.getNonPendingCount();
    }
    handleMyTransferesPageSizeChange(size: any): void {
        this.myTransferQuery.size = size;
        this.myTransferQuery.page = 1;
        this.getMyTransfersCount();
    }
    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.pendingCashTransferQuery);
        this.getCount();
    }
    approvedClickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.cashTransferQuery);
        this.getNonPendingCount();
    }
}
