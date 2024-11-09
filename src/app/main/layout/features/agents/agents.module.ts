import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgentsRoutingModule} from './agents-routing.module';
import {AgentsComponent} from './agents.component';

import {FormsModule} from '@angular/forms';
import { AddEditAgentComponent } from './add-edit-agent/add-edit-agent.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LayoutModule } from '../../layout.module';


@NgModule({
    declarations: [
        AgentsComponent,
        AddEditAgentComponent
    ],
    imports: [
        CommonModule,
        AgentsRoutingModule,
        LayoutModule,
        FormsModule,
        NgSelectModule,
        NgbModule,
        BreadcrumbModule
    ]
})
export class AgentsModule {
}
