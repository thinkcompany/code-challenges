import { Action } from '@ngrx/store';
import { Zone } from './zone.model';
import * as ZoneActions from './zone.actions';

export function zoneReducer(state: Zone[], action: ZoneActions.All): Zone[] {
    switch (action.type) {
        case ZoneActions.GET_ZONES:
            return state;
        case ZoneActions.GET_ZONES_SUCCESS:
            return (<ZoneActions.GetSuccess> action).payload;
        default:
            return state;
    }
}
