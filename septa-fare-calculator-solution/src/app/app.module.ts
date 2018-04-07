import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SeptaFareCalculatorComponent} from './septa-fare-calculator/septa-fare-calculator.component';
import {SeptaFaresService} from './septa-fare-calculator/septa-fares.service';

@NgModule({
  declarations: [
    AppComponent,
    SeptaFareCalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SeptaFaresService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
