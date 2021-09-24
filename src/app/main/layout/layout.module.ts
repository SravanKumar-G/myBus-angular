import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {FormsModule} from '@angular/forms';
import {AppModule} from '../../app.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from '../../interceptors/error.interceptor';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {LayoutComponent} from './layout.component';
import { CargoDashboardComponent } from './features/cargo-dashboard/cargo-dashboard.component';
import {NumberFormatterPipe} from '../../customDirectives/number-formatter.pipe';

import { NewBookingComponent } from './features/new-booking/new-booking.component';
import { CargoCancellationsComponent } from './features/cargo-cancellations/cargo-cancellations.component';

@NgModule({
    declarations: [
        LayoutComponent,
        NumberFormatterPipe,
        NewBookingComponent,
        CargoCancellationsComponent
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LayoutModule {
}
