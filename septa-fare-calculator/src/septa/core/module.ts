import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import * as Service from './services/index';
import * as State from './state/index';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [],
    imports: [
        HttpModule,
        EffectsModule.forRoot(State.SEPTA_EFFECTS),
        StoreModule.forRoot(State.SEPTA_REDUCERS, { initialState: State.SEPTA_DEFAULT_STATE })
    ],
    providers: [
        Service.ApiService,
        Service.WindowReference
    ]
})

export class CoreModule {}
