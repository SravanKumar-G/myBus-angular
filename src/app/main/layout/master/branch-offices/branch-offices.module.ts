import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchOfficesRoutingModule } from './branch-offices-routing.module';
import {BranchOfficesComponent} from './branch-offices.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddEditBranchOfficeComponent } from './add-edit-branch-office/add-edit-branch-office.component';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../../layout.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
      BranchOfficesComponent,
      AddEditBranchOfficeComponent
  ],
    imports: [CommonModule,
        BranchOfficesRoutingModule,
        NgbModule,
        FormsModule,
        LayoutModule,
        BreadcrumbModule
       
    ],
})
export class BranchOfficesModule { }



