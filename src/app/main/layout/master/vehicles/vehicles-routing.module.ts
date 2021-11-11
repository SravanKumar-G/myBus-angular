import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VehiclesComponent} from './vehicles.component';
import {AddEditVehicleComponent} from './add-edit-vehicle/add-edit-vehicle.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Vehicles'},
    component: VehiclesComponent
  },
  {
    path: 'addVehicle',
    data: {breadcrumb: 'Add Vehicle'},
    component: AddEditVehicleComponent
  },
  {
    path: 'editVehicle/:id',
    data: {breadcrumb: 'Edit Vehicle'},
    component: AddEditVehicleComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
