import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import Swal from 'sweetalert2';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

    public cities: Array<any> = [];
    public states: Array<any> = [];
    public titleHeader: any = 'Add a New City';
    public city: any = {state: '', name: ''};
    public cityId: any;
    public errorMessage: any;
    sortOrder = 'name';
    orderBy = 'asc';
    public citiesQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        sort: this.sortOrder + ',' + this.orderBy,
    };
    public citiesCount: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.states = this.apiService.getAllStates();
        this.getCitiesCount();
    }

    private getCitiesCount(): void {
        this.apiService.get(this.apiUrls.getCitiesCount).subscribe((res: any) => {
            if (res !== 0) {
                this.citiesCount = res;
                OnlynumberDirective.pagination(res, this.citiesQuery);
                this.getAllCities();
            } else {
                Swal.fire('Oops...', 'Error finding City data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    public getAllCities(): void {
        this.apiService.get(this.apiUrls.getAllCities + '?page=' + this.citiesQuery.page +
            '&size=' + this.citiesQuery.size + '&sort=' + this.citiesQuery.sort).subscribe((res: any) => {
            if (res) {
                this.cities = res;
            } else {
                Swal.fire('Oops...', 'Error finding City data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    addCity(addEditCityModal: any): void {
        this.cityId = '';
        this.titleHeader = 'Add a New City';
        this.modalService.open(addEditCityModal, {backdrop: 'static'});
    }

    save(): void {
        if (!this.city.state) {
            this.errorMessage = 'Please select State';
        } else if (!this.city.name) {
            this.errorMessage = 'Please enter City Name';
        } else {
            if (this.cityId) {
                this.apiService.update(this.apiUrls.updateCity + this.cityId, this.city).subscribe((res: any) => {
                    if (res) {
                        Swal.fire('Great', 'Your City has been updated successfully', 'success');
                        this.closeModal();
                        this.getCitiesCount();
                    }
                }, error => {
                    this.errorMessage = error.message;
                });
            } else {
                this.apiService.create(this.apiUrls.createCity, this.city).subscribe((res: any) => {
                    if (res) {
                        Swal.fire('Great', 'Your City has been successfully added', 'success');
                        this.closeModal();
                        this.getCitiesCount();
                    }
                }, error => {
                    this.errorMessage = error.message;
                });
            }
        }
    }

    closeModal(): void {
        this.errorMessage = '';
        this.city = {state: '', name: ''};
        this.modalService.dismissAll();
    }

    updateCity(addEditCityModal: any, cityId: any): void {
        if (cityId) {
            this.cityId = cityId;
            this.modalService.open(addEditCityModal, {backdrop: 'static'});
            this.titleHeader = 'Update City';
            this.apiService.get(this.apiUrls.getCity + cityId).subscribe((res: any) => {
                if (res) {
                    this.city = res;
                }
            });
        } else {

        }
    }

    deleteCity(cityId: any): void {
        if (cityId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this City !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.delete(this.apiUrls.deleteCity + cityId).subscribe((res: any) => {
                        Swal.fire(
                            'Deleted!',
                            'Your City has been successfully deleted',
                            'success'
                        );
                        this.getCitiesCount();
                    });
                }
            });
        } else {
            Swal.fire('Oops...', 'Error finding City data!', 'error');
        }
    }

    handlePageChange(event: number): void {
        this.citiesQuery.page = event;
        this.getCitiesCount();
    }

    handlePageSizeChange(event: any): void {
        this.citiesQuery.size = event;
        this.citiesQuery.page = 1;
        this.getCitiesCount();
    }

    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.citiesQuery);
        this.getCitiesCount();
    }
}
