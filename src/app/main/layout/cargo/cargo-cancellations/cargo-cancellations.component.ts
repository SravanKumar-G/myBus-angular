import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {ApiServiceService} from '../../../../services/api-service.service';

@Component({
    selector: 'app-cargo-cancellations',
    templateUrl: './cargo-cancellations.component.html',
    styleUrls: ['./cargo-cancellations.component.css']
})
export class CargoCancellationsComponent implements OnInit {

    public tab = 1;
    public pendingData: Array<any> = [];
    public cancelledData: Array<any> = [];

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls) {
    }

    ngOnInit(): void {
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
        this.apiService.getAll(this.apiUrls.pendingShipmentsCount, {}).subscribe((res: any) => {
            if (res) {
                console.log(res);
                this.getAllPendingShipments();
            }
        });
    }

    private getAllPendingShipments(): void {
        this.apiService.getAll(this.apiUrls.getAllPendingShipments, {}).subscribe((res: any) => {
            if (res) {
                this.pendingData = res.content;
                console.log(res);
            }
        });
    }

    public getAllCancelledCount(): void {
        this.apiService.getAll(this.apiUrls.cancelledShipmentsCount, {}).subscribe((res: any) => {
            if (res) {
                console.log(res);
                this.getAllCancelledShipments();
            }
        });
    }

    private getAllCancelledShipments(): void {
        this.apiService.getAll(this.apiUrls.getAllCancelledShipments, {}).subscribe((res: any) => {
            if (res) {
                console.log(res);
                this.getAllPendingShipments();
            }
        });
    }
}
