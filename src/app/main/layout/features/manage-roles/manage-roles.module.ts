import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRolesRoutingModule } from './manage-roles-routing.module';
import {ManageRolesComponent} from './manage-roles.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
      ManageRolesComponent
  ],
  imports: [
    CommonModule,
    ManageRolesRoutingModule,
    FormsModule
  ]
})
export class ManageRolesModule { }
