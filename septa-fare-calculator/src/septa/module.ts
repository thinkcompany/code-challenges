import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BaseComponent } from './base/base';
import { CoreModule } from './core/module';
import { SeptaRouterModule } from './routes';

@NgModule({
    bootstrap: [ BaseComponent ],
    declarations: [ BaseComponent ],
    exports: [
        BaseComponent,
        SeptaRouterModule,
        CoreModule
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SeptaRouterModule
    ]
})
export class SeptaModule {}
