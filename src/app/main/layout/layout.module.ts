import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from '../../interceptors/error.interceptor';
import {LayoutComponent} from './layout.component';
import {NumberFormatterPipe} from '../../customDirectives/pipes/number-formatter.pipe';
import {OnlynumberDirective} from '../../customDirectives/directives/onlynumber.directive';
import {FrentendSortDirective} from '../../customDirectives/directives/frentend-sort.directive';
import {SearchFilterPipe} from '../../customDirectives/pipes/search-filter.pipe';
import { CargoLookUpComponent } from './cargo/cargo-look-up/cargo-look-up.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PipeFilterPipe} from '../../customDirectives/pipes/pipe-filter.pipe';

@NgModule({
    declarations: [
        LayoutComponent,
        NumberFormatterPipe,
        OnlynumberDirective,
        FrentendSortDirective,
        SearchFilterPipe,
        CargoLookUpComponent,
        PipeFilterPipe,
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        NgbModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    exports: [
        OnlynumberDirective,
        NumberFormatterPipe,
        FrentendSortDirective,
        SearchFilterPipe,
        CargoLookUpComponent,
        PipeFilterPipe
    ]
})
export class LayoutModule {
}
