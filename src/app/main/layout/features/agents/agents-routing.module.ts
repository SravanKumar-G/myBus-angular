import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgentsComponent} from './agents.component';
import {AddEditAgentComponent} from './add-edit-agent/add-edit-agent.component';

const routes: Routes = [
  {
    path: '',
    component: AgentsComponent
  },
  {
    path: 'addAgent',
    component: AddEditAgentComponent
  },
  {
    path: 'editAgent/:id',
    component: AddEditAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
