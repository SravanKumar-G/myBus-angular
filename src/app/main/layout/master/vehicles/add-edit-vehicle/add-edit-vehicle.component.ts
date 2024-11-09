import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, FormGroup} from '@angular/forms';
import {ApiServiceService} from '../../../../../services/api-service.service';
import {ApiUrls} from '../../../../../_helpers/apiUrls';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-edit-vehicle',
    templateUrl: './add-edit-vehicle.component.html',
    styleUrls: ['./add-edit-vehicle.component.css']
})
export class AddEditVehicleComponent implements OnInit {

    public vehicle: any = {
        permitExpiry: new Date(),
        insuranceExpiry: new Date(),
        fitnessExpiry: new Date(),
        pollutionExpiry: new Date(),
        authExpiry: new Date(),
        aitpExpiry: new Date(),
        taxPayments: [{state: '', paymentDate: new Date()}]
    };
    public errorMessage: any;
    public vehicleId: any;
    public headerTitle: any = 'Add a Vehicle';
    public newDate: any = new Date();
    uploadType: any = 'single';

    constructor(private apiService: ApiServiceService,
                private apiUrls: ApiUrls,
                private actRoute: ActivatedRoute,
                private fb: UntypedFormBuilder,
                private router: Router) {
        this.vehicleId = this.actRoute.snapshot.params.id || '';
    }

    ngOnInit(): void {
        if (this.vehicleId) {
            this.headerTitle = 'Update Vehicle';
            this.getVehicleDetailsById();
        }
    }

    getVehicleDetailsById(): void {
        this.apiService.get(this.apiUrls.getVehicleById + this.vehicleId).subscribe((vehicle: any) => {
            if (vehicle) {
                this.vehicle = vehicle;
                this.vehicle.authExpiry = new Date(vehicle.authExpiry);
                this.vehicle.pollutionExpiry = new Date(vehicle.pollutionExpiry);
                this.vehicle.insuranceExpiry = new Date(vehicle.insuranceExpiry);
                this.vehicle.fitnessExpiry = new Date(vehicle.fitnessExpiry);
                this.vehicle.permitExpiry = new Date(vehicle.permitExpiry);
                this.vehicle.aitpExpiry = new Date(vehicle.aitpExpiry);
                if (vehicle.taxPayments != null){
                    for (let i = 0; i < vehicle.taxPayments.length; i++){
                        this.vehicle.taxPayments[i].paymentDate = new Date(vehicle.taxPayments[i].paymentDate);
                    }
                }else{
                    this.vehicle.taxPayments = [];
                    this.vehicle.taxPayments.push({ state: undefined, paymentDate: new Date()});
                }
            }
        });
    }

    save(): void {
        if (!this.vehicle.regNo) {
            this.errorMessage = 'Please enter Registration Number';
        } else if (!this.vehicle.vehicleType) {
            this.errorMessage = 'Please enter Vehicle Type';
        } else {
            this.errorMessage = '';
            console.log(this.vehicle);
            if (this.vehicleId) {
                this.apiService.update(this.apiUrls.updateVehicle + this.vehicleId, this.vehicle)
                    .subscribe((res: any) => {
                        if (res) {
                            Swal.fire('Success', 'Your Vehicle Updated Successfully', 'success');
                            this.close();
                        }
                    }, error => {
                        this.errorMessage = error.message;
                    });
            } else {
                this.apiService.create(this.apiUrls.saveVehicle, this.vehicle)
                    .subscribe((res: any) => {
                        if (res) {
                            Swal.fire('Success', 'Your Vehicle Added Successfully', 'success');
                            this.close();
                        }
                    }, error => {
                        this.errorMessage = error.message;
                    });
            }
        }
    }

    close(): void {
        this.router.navigate(['vehicles']);
    }

    addNewState(): void {
        const length = this.vehicle.taxPayments.length;
        if (!this.vehicle.taxPayments[length - 1].state || !this.vehicle.taxPayments[length - 1].paymentDate) {
            Swal.fire('Error!', 'Please Select State And TaxExpiry Date ', 'error');
        } else {
            this.vehicle.taxPayments.push({state: undefined, paymentDate: new Date()});
        }
    }

    removeState(index: any): void {
        const length = this.vehicle.taxPayments.length - 1;
        if (length !== 0) {
            this.vehicle.taxPayments.splice(index, 1);
        }
    }

    uploadImage(event: any): void {
        this.apiService.upload(event.url + this.vehicleId, event.files).subscribe((res: any) => {
            if (res) {
                console.log(res, '===>');
                Swal.fire('Wow!', 'File uploaded Successfully', 'success');
                this.getVehicleDetailsById();
            }
        }, error => {
            Swal.fire('error', error.message, 'error');
        });
    }

    imageToEmitToUpload(event: any): void{
        this.getVehicleDetailsById();
    }
}
