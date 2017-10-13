import { Action } from '@ngrx/store';
import { Zone } from './zone.model';

export const GET_ZONES: string = 'GET_ZONES';
export const GET_ZONES_SUCCESS: string = 'GET_ZONES_SUCCESS';

export class Get implements Action {
    public readonly type: string = GET_ZONES;

    constructor(public payload?: string) {}
}

export class GetSuccess implements Action {
    public readonly type: string = GET_ZONES_SUCCESS;
    public payload: Zone[];

    constructor(zones: Zone[]) {
        this.payload = zones;
    }
}

export type All = Get | GetSuccess;
