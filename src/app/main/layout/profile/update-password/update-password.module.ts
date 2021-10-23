import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePasswordRoutingModule } from './update-password-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '../../layout.module';
import {BrowserModule} from '@angular/platform-browser';
import {UpdatePasswordComponent} from './update-password.component';


@NgModule({
  declarations: [
      UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    UpdatePasswordRoutingModule,
    NgbModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule
  ]
})
export class UpdatePasswordModule { }
