import { NgModule } from '@angular/core';
import { LandingRoutesModule } from './routes';
import { SharedModule } from '../shared/module';
import { LandingBase } from './base/base';
import { NavbarComponent } from './navbar/navbar';
import { FareComponent } from './fare/fare';

@NgModule({
    declarations: [
        LandingBase,
        FareComponent,
        NavbarComponent
    ],
    imports: [
        LandingRoutesModule,
        SharedModule
    ]
})
export class LandingModule {}
