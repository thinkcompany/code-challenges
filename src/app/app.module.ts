import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { FareService } from './services/fare.service';

import { SeptaFareCalcComponent } from './components/septa-fare-calc/septa-fare-calc.component';

@NgModule({
  declarations: [
    AppComponent,
    SeptaFareCalcComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
