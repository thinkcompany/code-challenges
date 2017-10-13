import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from '../../services/api';
import { ISeptaState } from '../../interfaces';

import { IInfoFields, IZoneFields, Zone } from './zone.model';
import * as ZoneActions from './zone.actions';

export interface IZonesResponse {
    info: IInfoFields;
    zones: Zone[];
}

@Injectable()
export class ZonesEffects {

    @Effect() public get$: Observable<Action> = this.actions.ofType<ZoneActions.Get>(ZoneActions.GET_ZONES)
        .map((action: ZoneActions.Get) => action.payload)
        .mergeMap((payload: string) => {
            return this.api.getFares();
        })
        .map((response: Response) => {
            const fields: IZonesResponse = response.json();

            const zones: Zone[] = fields.zones.map((zone: IZoneFields, index: number) => {
                return new Zone(zone, fields.info);
            });

            return new ZoneActions.GetSuccess(zones);
        })
        .catch(() => {
            return Observable.of(new ZoneActions.GetSuccess([]));
        });

    constructor(private api: ApiService, private actions: Actions, private store: Store<ISeptaState>) { }
}
