import { Zone } from './state/zone/zone.model';
import { Selection } from './state/selection/selection.model';

declare global {

    interface SeptaWindow extends Window {
        septaOptions?: IOptionsFetch;
    }
}

export interface ISeptaState {
    selection: Selection;
    zones: Zone[];
}

export interface IOptionsFetch {
    fetchUrl: string;
}

export interface ISeptaOptions {
    URL_DATA: string;
}
