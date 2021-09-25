import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {CargoDashboardComponent} from './features/cargo-dashboard/cargo-dashboard.component';

const layOutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./features/cargo-dashboard/cargo-dashboard.module').
                then(m => m.CargoDashboardModule)
            },
            {
                path: 'operatorAccounts',
                loadChildren: () => import('./features/operator-accounts/operator-accounts.module').
                then(m => m.OperatorAccountsModule)
            },
            {
                path: 'newBooking',
                loadChildren: () => import('./features/new-booking/new-booking.module').
                then(m => m.NewBookingModule)
            },
            {
                path: 'cancellations',
                loadChildren: () => import('./features/cargo-cancellations/cargo-cancellations.module').
                then(m => m.CargoCancellationsModule)
            }
        ]
    },
    {path: '', pathMatch: 'full', component: CargoDashboardComponent}];

// @ts-ignore
@NgModule({
    imports: [RouterModule.forChild(layOutRoutes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
