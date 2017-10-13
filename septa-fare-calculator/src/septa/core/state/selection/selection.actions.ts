import { Action } from '@ngrx/store';
import { ISelectionData, Selection } from './selection.model';

export const GET_SELECTION: string = 'GET_SELECTION';
export const EDIT_SELECTION: string = 'EDIT_SELECTION';

export class Get implements Action {
    public readonly type: string = GET_SELECTION;

    constructor(public payload?: Data) {}
}

export class Edit implements Action {
    public readonly type: string = EDIT_SELECTION;

    constructor(public payload: ISelectionData) {}
}

export type All = Get | Edit;
