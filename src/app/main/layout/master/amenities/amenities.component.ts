import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiServiceService} from '../../../../services/api-service.service';
import {ApiUrls} from '../../../../_helpers/apiUrls';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OnlynumberDirective} from '../../../../customDirectives/directives/onlynumber.directive';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-amenities',
    templateUrl: './amenities.component.html',
    styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {

    public amenities: Array<any> = [];
    public titleHeader: any = 'Add New Amenity';
    public amenity: any = {};
    public amenityId: any;
    public errorMessage: any;
    sortOrder = 'name';
    orderBy = 'asc';
    public amenitiesQuery: any = {
        page: 1,
        size: 10,
        count: 0,
        pageSizes: [],
        sort: this.sortOrder + ',' + this.orderBy,
    };
    public amenitiesCount: any;

    constructor(private router: Router,
                public apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.getAmenitiesCount();
    }

    private getAmenitiesCount(): void {
        this.apiService.get(this.apiUrls.getAmenitiesCount).subscribe((res: any) => {
            if (res !== 0) {
                this.amenitiesCount = res;
                OnlynumberDirective.pagination(res, this.amenitiesQuery);
                this.getAllAmenities();
            } else {
                Swal.fire('Oops...', 'Error finding Amenities data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    public getAllAmenities(): void {
        this.apiService.get(this.apiUrls.getAllAmenities + '?page=' + this.amenitiesQuery.page +
            '&size=' + this.amenitiesQuery.size + '&sort=' + this.amenitiesQuery.sort).subscribe((res: any) => {
            if (res) {
                this.amenities = res.content;
            } else {
                Swal.fire('Oops...', 'Error finding Amenities data!', 'error');
            }
        }, error => {
            this.errorMessage = error.message;
        });
    }

    addAmenity(addEditAmenityModal: any): void {
        this.amenityId = '';
        this.titleHeader = 'Add a New Amenity';
        this.modalService.open(addEditAmenityModal, {backdrop: 'static'});
    }

    save(): void {
        if (!this.amenity.name) {
            this.errorMessage = 'Please enter Role Name';
        } else {
            if (this.amenityId) {
                this.apiService.update(this.apiUrls.saveAmenity, this.amenity).subscribe((res: any) => {
                    if (res) {
                        Swal.fire('Great', 'Your Amenity has been updated successfully', 'success');
                        this.closeModal();
                        this.getAmenitiesCount();
                    }
                }, error => {
                    this.errorMessage = error.message;
                });
            } else {
                this.apiService.create(this.apiUrls.saveAmenity, this.amenity).subscribe((res: any) => {
                    if (res) {
                        Swal.fire('Great', 'Your Amenity has been successfully added', 'success');
                        this.closeModal();
                        this.getAmenitiesCount();
                    }
                }, error => {
                    this.errorMessage = error.message;
                });
            }
        }
    }

    closeModal(): void {
        this.errorMessage = '';
        this.amenity = {};
        this.modalService.dismissAll();
    }

  updateAmenity(addEditAmenityModal: any, amenityId: any): void {
        if (amenityId) {
            this.amenityId = amenityId;
            this.modalService.open(addEditAmenityModal, {backdrop: 'static'});
            this.titleHeader = 'Update Amenity';
            this.apiService.get(this.apiUrls.getAmenityById + amenityId).subscribe((res: any) => {
                if (res) {
                    this.amenity = res;
                }
            });
        } else {
            console.log(amenityId);
        }
    }

    deleteAmenity(amenityId: any): void {
        if (amenityId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this Amenity !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.apiService.delete(this.apiUrls.deleteAmenity + amenityId).subscribe((res: any) => {
                        Swal.fire(
                            'Deleted!',
                            'Your Amenity has been successfully deleted',
                            'success'
                        );
                        this.getAmenitiesCount();
                    });
                }
            });
        } else {
            Swal.fire('Oops...', 'Error finding Amenity data!', 'error');
        }
    }

    handlePageChange(event: number): void {
        this.amenitiesQuery.page = event;
        this.getAmenitiesCount();
    }

    handlePageSizeChange(event: any): void {
        this.amenitiesQuery.size = event;
        this.amenitiesQuery.page = 1;
        this.getAmenitiesCount();
    }

    clickSorting(event: any): void {
        OnlynumberDirective.clickSorting(event, this.amenitiesQuery);
        this.getAmenitiesCount();
    }

}
