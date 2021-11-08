import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnloadingSheetComponent} from './unloading-sheet.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Unloading Sheet'},
    component: UnloadingSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnloadingSheetRoutingModule { }
