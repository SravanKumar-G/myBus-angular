import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CitiesComponent} from './cities.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Cities'},
    component: CitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
