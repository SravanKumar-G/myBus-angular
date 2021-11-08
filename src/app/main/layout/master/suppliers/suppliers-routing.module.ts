import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SuppliersComponent} from './suppliers.component';

const routes: Routes = [{
  path: '',
  data: {breadcrumb: 'Suppliers'},
  component: SuppliersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
