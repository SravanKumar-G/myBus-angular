import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmenitiesRoutingModule } from './amenities-routing.module';
import {AmenitiesComponent} from './amenities.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [
      AmenitiesComponent
  ],
  imports: [
    CommonModule,
    AmenitiesRoutingModule,
    NgbModule,
    FormsModule,
    BreadcrumbModule,
  ]
})
export class AmenitiesModule { }
