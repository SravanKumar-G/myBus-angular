import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';

const layOutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
    }, ]
  },
  {path: '', pathMatch: 'full', component: DashboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(layOutRoutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
