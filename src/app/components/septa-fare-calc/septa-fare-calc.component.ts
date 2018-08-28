import { Component, OnInit } from '@angular/core';
import { FareService } from '../../services/fare.service';
import { Fare } from '../../types/Fare';
import { Output } from '../../types/Output';

@Component({
  selector: 'app-septa-fare-calc',
  templateUrl: './septa-fare-calc.component.html',
  providers: [FareService]
})
export class SeptaFareCalcComponent implements OnInit {
  private fareService: FareService;
  public fare: Fare;
  public info: object;
  public output: Output;

  constructor(fareService: FareService) {
    this.fareService = fareService;
  }

  ngOnInit() {
    this.output = {price: '', savings: '', error: ''};
    this.fare = this.fareService.getDefaultFare();
    this.fareService.getFares().subscribe(fares => {
      this.info = fares.info;
    });
  }

  public onSubmit() {
    this.output = this.fareService.calcFarePrice(this.fare);
  }
}
