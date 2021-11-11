import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AmenitiesComponent} from './amenities.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Amenities'},
    component: AmenitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmenitiesRoutingModule { }
