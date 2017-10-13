import { Injectable, NgModule } from '@angular/core';
import { Resolve, RouterModule, Routes } from '@angular/router';
import { LandingBase } from './base/base';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ISeptaState } from '../core/interfaces';

import { Zone } from '../core/state/zone/zone.model';
import * as ZoneActions from '../core/state/zone/zone.actions';

@Injectable()
export class ZoneResolve implements Resolve<void> {
    private store: Store<ISeptaState>;

    constructor(store: Store<ISeptaState>) {
        Object.assign(this, { store });
    }

    public resolve(): Observable<void> {
        return Observable.of(this.store.dispatch(new ZoneActions.Get()));
    }
}

const LANDING_ROUTES: Routes = [
    {
        component: LandingBase,
        path: '',
        resolve: {
            projects: ZoneResolve
        }
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(LANDING_ROUTES)
    ],
    providers: [
        ZoneResolve
    ]
})
export class LandingRoutesModule {}
