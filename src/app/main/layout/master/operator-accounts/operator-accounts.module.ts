import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorAccountsRoutingModule } from './operator-accounts-routing.module';
import {OperatorAccountsComponent} from './operator-accounts.component';
import { AddEditOperatorAccountsComponent } from './add-edit-operator-accounts/add-edit-operator-accounts.component';
import {FormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [
      OperatorAccountsComponent,
      AddEditOperatorAccountsComponent
  ],
    imports: [
        CommonModule,
        OperatorAccountsRoutingModule,
        FormsModule,
        NgbPaginationModule,
        BreadcrumbModule
    ]
})
export class OperatorAccountsModule { }
