import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
      RolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class RolesModule { }
