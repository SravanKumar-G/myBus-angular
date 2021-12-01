import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EscalationsComponent} from './escalations.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Escalations'},
    component: EscalationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscalationsRoutingModule { }
