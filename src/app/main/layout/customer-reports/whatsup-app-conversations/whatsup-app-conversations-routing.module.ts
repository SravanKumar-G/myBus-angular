import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WhatsupAppConversationsComponent} from './whatsup-app-conversations.component';

const routes: Routes = [
  {
    path: '',
    component: WhatsupAppConversationsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsupAppConversationsRoutingModule { }
