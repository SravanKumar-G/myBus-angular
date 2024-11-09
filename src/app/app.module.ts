import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {LoginComponent} from './main/authentication/login/login.component';
import {CookieService} from 'ngx-cookie-service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {SpinnerService} from './spinner/spinner.service';
import {SpinnerInterceptor} from './interceptors/spinner.interceptor';
import {SpinnerComponent} from './spinner/spinner.component';
import {BsDatepickerModule,} from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        SpinnerComponent,
        
    ],
    exports: [
        SpinnerComponent
    ],
    bootstrap: [AppComponent], imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgbModalModule,
        FileUploadModule,
        BreadcrumbModule,
        // NoopAnimationsModule,
    BsDatepickerModule.forRoot(),
    ], providers: [
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        SpinnerService,
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
}
