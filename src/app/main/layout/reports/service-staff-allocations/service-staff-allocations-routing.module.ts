import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceStaffAllocationsComponent} from './service-staff-allocations.component';

const routes: Routes = [
    {
      path: '',
      component: ServiceStaffAllocationsComponent,
      data: {breadcrumb: 'ServiceStaffAllocation'},
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceStaffAllocationsRoutingModule { }
