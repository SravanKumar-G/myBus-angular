import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgentsComponent} from './agents.component';
import {AddEditAgentComponent} from './add-edit-agent/add-edit-agent.component';

const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Agents'},
    component: AgentsComponent
  },
  {
    path: 'addAgent',
    data: {breadcrumb: 'Add Agent'},
    component: AddEditAgentComponent
  },
  {
    path: 'editAgent/:id',
    data: {breadcrumb: 'Edit Agent'},
    component: AddEditAgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
