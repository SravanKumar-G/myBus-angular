import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import {CitiesComponent} from './cities.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
      CitiesComponent
  ],
    imports: [
        CommonModule,
        CitiesRoutingModule,
        FormsModule,
        NgbModule,
        BreadcrumbModule,
    ]
})
export class CitiesModule { }
