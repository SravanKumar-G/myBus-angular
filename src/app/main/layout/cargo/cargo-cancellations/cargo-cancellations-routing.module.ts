import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CargoCancellationsComponent} from './cargo-cancellations.component';

const routes: Routes = [
    {
        path: '',
        data: {breadcrumb: 'Cancellations'},
        component: CargoCancellationsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CargoCancellationsRoutingModule {
}
