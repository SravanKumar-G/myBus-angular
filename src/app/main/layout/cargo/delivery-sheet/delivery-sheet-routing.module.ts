import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeliverySheetComponent} from './delivery-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: DeliverySheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliverySheetRoutingModule { }
