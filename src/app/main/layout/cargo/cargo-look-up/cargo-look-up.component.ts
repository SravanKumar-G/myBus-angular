import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-cargo-look-up',
    templateUrl: './cargo-look-up.component.html',
    styleUrls: ['./cargo-look-up.component.css']
})
export class CargoLookUpComponent implements OnInit {

    bookingId: any;
    private cargoDetails: any;
    public cargoSearchData: Array<any> = [];


    @ViewChild('showCargoDataModal') showCargoDataModal: any;

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private modalService: NgbModal,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    cargoSearchById(bookingId: any): void {
        if (bookingId) {
            this.apiService.get(this.apiUrls.cargoDetailsByLR + '?LRNumber=' + bookingId).subscribe((res: any) => {
                if (res) {
                    if (res.length === 0) {
                        Swal.fire('error', 'No Cargo Bookings found', 'error');
                    } else if (res.length === 1) {
                        this.router.navigate(['viewCargoBooking', res[0].shipmentNumber]);
                    } else {
                        this.modalService.open(this.showCargoDataModal, {size: 'lg', backdrop: 'static'});
                        this.cargoSearchData = res;
                    }
                } else {
                    Swal.fire('error', 'No Cargo Bookings found', 'error');
                }
            });
        } else {
            Swal.fire('error', 'Enter the bookingId for search', 'error');
        }
    }

    routingToView(id: any): void {
        this.router.navigate(['viewCargoBooking', id]);
        this.modalService.dismissAll();
    }
}
