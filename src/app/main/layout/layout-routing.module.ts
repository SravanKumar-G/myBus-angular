import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {CargoDashboardComponent} from './cargo/cargo-dashboard/cargo-dashboard.component';

const layOutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./cargo/cargo-dashboard/cargo-dashboard.module')
                    .then(m => m.CargoDashboardModule)
            },
            {
                path: 'operatorAccounts',
                loadChildren: () => import('./master/operator-accounts/operator-accounts.module')
                    .then(m => m.OperatorAccountsModule)
            },
            {
                path: 'cancellations',
                loadChildren: () => import('./cargo/cargo-cancellations/cargo-cancellations.module')
                    .then(m => m.CargoCancellationsModule)
            },
            {
                path: 'cities',
                loadChildren: () => import('./master/cities/cities.module').then(m => m.CitiesModule)
            },
            {
                path: 'branchOffices',
                loadChildren: () => import('./master/branch-offices/branch-offices.module')
                    .then(m => m.BranchOfficesModule)
            },
            {
                path: 'roles',
                loadChildren: () => import('./master/roles/roles.module').then(m => m.RolesModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./master/users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'amenities',
                loadChildren: () => import('./master/amenities/amenities.module').then(m => m.AmenitiesModule)
            },
            {
                path: 'vehicles',
                loadChildren: () => import('./master/vehicles/vehicles.module').then(m => m.VehiclesModule)
            },
            {
                path: 'transactions',
                loadChildren: () => import('./reports/transactions/transactions.module')
                    .then(m => m.TransactionsModule)
            },
            {
                path: 'payments',
                loadChildren: () => import('./reports/payments/payments.module')
                    .then(m => m.PaymentsModule)
            },
            {
                path: 'manageRoles',
                loadChildren: () => import('./master/manage-roles/manage-roles.module')
                    .then(m => m.ManageRolesModule)
            },
            {
                path: 'newBooking',
                loadChildren: () => import('./cargo/new-booking/new-booking.module')
                    .then(m => m.NewBookingModule)
            },
            {
                path: 'suppliers',
                loadChildren: () => import('./master/suppliers/suppliers.module')
                    .then(m => m.SuppliersModule)
            },
            {
                path: 'cargoBookings',
                loadChildren: () => import('./cargo/cargo-bookings/cargo-bookings.module')
                    .then(m => m.CargoBookingsModule)
            },
            {
                path: 'viewCargoBooking/:id',
                loadChildren: () => import('./cargo/view-cargo-booking/view-cargo-booking.module')
                    .then(m => m.ViewCargoBookingModule)
            },
            {
                path: 'branchBookingSummary',
                loadChildren: () => import('./cargo/branch-booking-summary/branch-booking-summary.module')
                    .then(m => m.BranchBookingSummaryModule)
            },
            {
                path: 'loadingSheet',
                loadChildren: () => import('./cargo/loading-sheet/loading-sheet.module')
                    .then(m => m.LoadingSheetModule)
            },
            {
                path: 'unloadingSheet',
                loadChildren: () => import('./cargo/unloading-sheet/unloading-sheet.module')
                    .then(m => m.UnloadingSheetModule)
            },
            {
                path: 'deliverySheet',
                loadChildren: () => import('./cargo/delivery-sheet/delivery-sheet.module')
                    .then(m => m.DeliverySheetModule)
            },
            {
                path: 'cargoTripSheet',
                loadChildren: () => import('./cargo/trip-sheet/trip-sheet.module')
                    .then(m => m.TripSheetModule)
            },
            {
                path: 'serviceIncomeReport',
                loadChildren: () => import('./reports/service-income-report/service-income-report.module')
                    .then(m => m.ServiceIncomeReportModule)
            },
            {
                path: 'serviceReportByService/:id',
                loadChildren: () => import('./reports/service-report-by-service/service-report-by-service.module')
                    .then(m => m.ServiceReportByServiceModule)
            },
            {
                path: 'agents',
                loadChildren: () => import('./features/agents/agents.module')
                    .then(m => m.AgentsModule)
            },
            {
                path: 'staff',
                loadChildren: () => import('./features/staff/staff.module')
                    .then(m => m.StaffModule)
            },
            {
                path: 'officeExpenses',
                loadChildren: () => import('./reports/office-expenses/office-expenses.module').
                then(m => m.OfficeExpensesModule)
            },
            {
                path: 'cashbalance',
                loadChildren: () => import('./reports/cashbalance/cashbalance.module').
                then(m => m.CashbalanceModule)
            },
            {
                path: 'serviceReports/:date',
                loadChildren: () => import('./reports/service-reports/service-reports.module')
                    .then(m => m.ServiceReportsModule)
            },
            {
                path: 'dueReports',
                loadChildren: () => import('./reports/due-reports/due-reports.module')
                    .then(m => m.DueReportsModule)
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
