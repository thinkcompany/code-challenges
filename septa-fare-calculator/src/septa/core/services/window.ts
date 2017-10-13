import { Injectable } from '@angular/core';

function getWindow(): SeptaWindow {
    return window;
}

@Injectable()
export class WindowReference {
    get get(): SeptaWindow {
        return getWindow();
    }
}
