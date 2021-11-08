import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '../../layout.module';
import {StaffRoutingModule} from './staff-routing.module';
import {StaffComponent} from './staff.component';
import {AddEditStaffComponent} from './add-edit-staff/add-edit-staff.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
    declarations: [
        StaffComponent,
        AddEditStaffComponent,
    ],
    imports: [
        CommonModule,
        StaffRoutingModule,
        LayoutModule,
        NgSelectModule,
        NgbModule,
        FormsModule,
        BsDatepickerModule,
        BreadcrumbModule
    ]
})
export class StaffModule {
}
