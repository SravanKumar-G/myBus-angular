import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {CargoDashboardComponent} from './features/cargo-dashboard/cargo-dashboard.component';
import {CargoCancellationsComponent} from './features/cargo-cancellations/cargo-cancellations.component';

const layOutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./features/cargo-dashboard/cargo-dashboard.module').then(m => m.CargoDashboardModule)
    }, {
      path: 'cancellations',
      component: CargoCancellationsComponent,
    }
    ]
  },
  {path: '', pathMatch: 'full', component: CargoDashboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(layOutRoutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
