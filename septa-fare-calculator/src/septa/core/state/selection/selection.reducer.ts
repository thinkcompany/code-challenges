import { Action } from '@ngrx/store';
import { ISelectionData, Selection } from './selection.model';
import * as SelectionActions from './selection.actions';

export function updateSelection(state: Selection, newData: ISelectionData): Selection {
    return new Selection({ ...state.data, ...newData });
}

export function selectionReducer(state: Selection, action: SelectionActions.All): Selection {
    switch (action.type) {
        case SelectionActions.GET_SELECTION:
            return state;
        case SelectionActions.EDIT_SELECTION:
            return updateSelection(state, <ISelectionData> action.payload);
        default:
            return state;
    }
}
