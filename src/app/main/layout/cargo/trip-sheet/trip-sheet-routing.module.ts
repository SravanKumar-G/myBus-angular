import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TripSheetComponent} from './trip-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: TripSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripSheetRoutingModule { }
