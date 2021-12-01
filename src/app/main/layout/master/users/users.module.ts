import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UsersComponent} from './users.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '../../layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      UsersComponent,
      AddEditUserComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        NgbModule,
        LayoutModule,
        FormsModule,
        ReactiveFormsModule,
        BreadcrumbModule
    ]
})
export class UsersModule { }
