import { ISeptaOptions } from './septa/core/interfaces';
import { CONFIG_TOKEN } from './septa/core/constants';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, NgModuleRef } from '@angular/core';
import { SeptaModule } from './septa/module';

import './styles.scss';

const windowRef: SeptaWindow = window;
const configApi: string = windowRef.septaOptions.fetchUrl;

if (process.env.ENV === 'production') {
    enableProdMode();
}

export function parseOptions(options: ISeptaOptions): Promise<NgModuleRef<SeptaModule>> {
    return platformBrowserDynamic(
        [
            {
                provide: CONFIG_TOKEN,
                useValue: options
            }
        ]
    ).bootstrapModule(SeptaModule);
}

export function parseResponse(res: Response): Promise<NgModuleRef<SeptaModule>> {
    return res.json().then(parseOptions);
}

fetch(configApi).then(parseResponse);
