import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const SEPTA_ROUTES: Routes = [
    {
        loadChildren: './landing/module#LandingModule',
        path: ''
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(SEPTA_ROUTES)
    ]
})
export class SeptaRouterModule {
}
