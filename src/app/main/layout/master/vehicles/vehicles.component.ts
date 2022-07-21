import {Component, OnInit} from '@angular/core';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

    public vehicles: Array<any> = [];
    public errorMessage: any;
    sortOrder = 'vehicleType';
    orderBy = 'desc';
    public vehiclesQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        sort: this.sortOrder + ',' + this.orderBy,
        searchText: '',
        type: ''
    };
    public vehiclesCount: any;
    public types: any = [
        {name: 'NoRC', value: 'rcCopy'},
        {name: 'NoFitness', value: 'fcCopy'},
        {name: 'NoPermit', value: 'permitCopy'},
        {name: 'NoAuth', value: 'authCopy'},
        {name: 'NoInsurance', value: 'insuranceCopy'},
        {name: 'NoPollutionExpiry', value: 'pollutionCopy'},
    ];
    public vehicleDetails: any;

    constructor(
        private router: Router,
        public apiService: ApiServiceService,
        private apiUrls: ApiUrls,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.getVehiclesCount();
    }

    private getVehiclesCount(): void {
        this.apiService.getAll(this.apiUrls.getVehiclesCount, this.vehiclesQuery).subscribe((res: any) => {
            if (res || res === 0) {
                this.vehiclesCount = res;
                OnlynumberDirective.pagination(res, this.vehiclesQuery);
                this.getVehicles();
            } else {
                Swal.fire('Oops...', 'Error finding Vehicles data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    private getVehicles(): void {
        this.apiService.getAll(this.apiUrls.getAllVehicles, this.vehiclesQuery).subscribe((res: any) => {
            if (res) {
                this.vehicles = res.content;
            } else {
                Swal.fire('Oops...', 'Error finding Vehicles data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    searchVehicles(): void {
        this.getVehiclesCount();
    }

    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.vehiclesQuery);
        this.getVehiclesCount();
    }

    handlePageChange(event: number): void {
        this.vehiclesQuery.page = event;
        this.getVehiclesCount();
    }

    handlePageSizeChange(event: any): void {
        this.vehiclesQuery.size = event;
        this.vehiclesQuery.page = 1;
        this.getVehiclesCount();
    }

    deleteVehicle(vehicleId: any): void {
        if (vehicleId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this Vehicle !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.delete(this.apiUrls.deleteVehicle + vehicleId).subscribe((res: any) => {
                        Swal.fire(
                            'Deleted!',
                            'Vehicle has been successfully deleted',
                            'success'
                        );
                        this.getVehiclesCount();
                    });
                }
            });
        } else {
            Swal.fire('Oops...', 'Error finding Vehicle data!', 'error');
        }
    }

    viewVehicleDetails(vehicle: any, modal: any): any {
        this.vehicleDetails = vehicle;
        this.modalService.open(modal, {size: 'lg'});
    }

    closeModal(): void {
        this.modalService.dismissAll();
    }
}
