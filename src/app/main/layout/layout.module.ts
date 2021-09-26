import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from '../../interceptors/error.interceptor';
import {LayoutComponent} from './layout.component';
import {NumberFormatterPipe} from '../../customDirectives/number-formatter.pipe';
import {OnlynumberDirective} from '../../_helpers/onlynumber.directive';

@NgModule({
    declarations: [
        LayoutComponent,
        NumberFormatterPipe,
        OnlynumberDirective,
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

    exports: [
        OnlynumberDirective
    ]
})
export class LayoutModule {
}
