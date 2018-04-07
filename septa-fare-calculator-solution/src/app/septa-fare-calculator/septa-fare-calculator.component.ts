import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FaresMetaData} from './septa-fares.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'septa-fare-calculator',
  template: `
    <div>
      <h2>{{ title }}</h2>
      <div class="zone-selection">
        Where are you going?
      </div>
      <div class="time-selection">
        When are you riding?
      </div>
      <div class="location-selection">
        Where will you purchase the fare?
      </div>
      <div class="count-selection">
        How many rides will you need?
      </div>
      <div class="results-container">
        Your fare will cost
      </div>
    </div>
  `,
  styleUrls: ['./septa-fare-calculator.component.scss'],
})
export class SeptaFareCalculatorComponent implements OnChanges {
  private _defaultData = {} as FaresMetaData;
  private _fares: BehaviorSubject<FaresMetaData> = new BehaviorSubject<FaresMetaData>(this._defaultData);

  @Input('fares')
  set fares(val: FaresMetaData) {
    this._fares.next(val);
  }

  get fares() {
    return this._fares.getValue()
  }

  title: string = "Regional Rail Fares";

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fares']) {
      this.fares = changes['fares']['currentValue'];
    }
  }

}
