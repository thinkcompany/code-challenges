import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FaresMetaData} from './septa-fares.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'septa-fare-calculator',
  template: `
    <div>
      <h2>{{ title }}</h2>
      <section>
        Where are you going?
      </section>
      <section>
        When are you riding?
      </section>
      <section>
        Where will you purchase the fare?
      </section>
      <section>
        How many rides will you need?
      </section>
      <section>
        Your fare will cost
      </section>
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
