import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceStaffAllocationsComponent} from './service-staff-allocations.component';
import {
    AddEditServiceStaffAllocationsComponent
} from "./add-edit-service-staff-allocations/add-edit-service-staff-allocations.component";

const routes: Routes = [
    {
      path: '',
      component: ServiceStaffAllocationsComponent,
      data: {breadcrumb: 'ServiceStaffAllocation'},
    },
    {
        path: 'addServiceStaffAllocation',
        component: AddEditServiceStaffAllocationsComponent,
        data: {breadcrumb: 'addServiceStaffAllocation'},
    },
    {
        path: 'editServiceStaffAllocation/:id',
        component: AddEditServiceStaffAllocationsComponent,
        data: {breadcrumb: 'editServiceStaffAllocation/:id'},
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceStaffAllocationsRoutingModule { }
