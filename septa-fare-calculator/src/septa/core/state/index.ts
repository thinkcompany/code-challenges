import { Type } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { ISeptaState } from '../interfaces';
import { zoneReducer } from './zone/zone.reducer';
import { ZonesEffects } from './zone/zone.api';
import { selectionReducer } from './selection/selection.reducer';

export const SEPTA_EFFECTS: Type<Data>[] = [
    ZonesEffects
];

export const SEPTA_REDUCERS: ActionReducerMap<ISeptaState> = {
    selection: selectionReducer,
    zones: zoneReducer
};

export const SEPTA_DEFAULT_STATE: Data = {
    zones: [],
    selection: { data: {} }
};
