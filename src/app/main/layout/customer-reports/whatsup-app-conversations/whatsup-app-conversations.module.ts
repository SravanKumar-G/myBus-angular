import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsupAppConversationsRoutingModule } from './whatsup-app-conversations-routing.module';
import {WhatsupAppConversationsComponent} from './whatsup-app-conversations.component';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    WhatsupAppConversationsComponent,
  ],
    imports: [
        CommonModule,
        WhatsupAppConversationsRoutingModule,
        FormsModule,
        NgSelectModule
    ]
})
export class WhatsupAppConversationsModule { }

