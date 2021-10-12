import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {CargoDashboardComponent} from './features/cargo-dashboard/cargo-dashboard.component';
import {TransactionsModule} from './features/transactions/transactions.module';
import {PaymentsModule} from './features/payments/payments.module';

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
            },
            {
                path: 'cities',
                loadChildren: () => import('./features/cities/cities.module').
                then(m => m.CitiesModule)
            },
            {
                path: 'branchOffices',
                loadChildren: () => import('./features/branch-offices/branch-offices.module').
                then(m => m.BranchOfficesModule)
            },
            {
                path: 'roles',
                loadChildren: () => import('./features/roles/roles.module').
                then(m => m.RolesModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./features/users/users.module').
                then(m => m.UsersModule)
            },
            {
                path: 'amenities',
                loadChildren: () => import('./features/amenities/amenities.module').
                then(m => m.AmenitiesModule)
            },
            {
                path: 'vehicles',
                loadChildren: () => import('./features/vehicles/vehicles.module').
                then(m => m.VehiclesModule)
            },
            {
                path: 'transactions',
                loadChildren: () => import('./features/transactions/transactions.module').
                then(m => m.TransactionsModule)
            },
            {
                path: 'payments',
                loadChildren: () => import('./features/payments/payments.module').
                then(m => m.PaymentsModule)
            },
            {
                path: 'manageRoles',
                loadChildren: () => import('./features/manage-roles/manage-roles.module').
                then(m => m.ManageRolesModule)
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
