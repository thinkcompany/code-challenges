import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FareCalculatorComponent } from './components/fare-calculator/fare-calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    FareCalculatorComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [FareCalculatorComponent]
})
export class AppModule { }
