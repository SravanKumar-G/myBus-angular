import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsupAppConversationsRoutingModule } from './whatsup-app-conversations-routing.module';
import {WhatsupAppConversationsComponent} from './whatsup-app-conversations.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    WhatsupAppConversationsComponent,
  ],
  imports: [
    CommonModule,
    WhatsupAppConversationsRoutingModule,
    FormsModule
  ]
})
export class WhatsupAppConversationsModule { }

