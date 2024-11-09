import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
      RolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    NgbModule,
    FormsModule,
    BreadcrumbModule
  ]
})
export class RolesModule { }
