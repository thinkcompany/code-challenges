import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Fare, FaresMetaData} from './septa-fares.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'septa-fare-calculator',
  template: `
    <div class="grid-container calculator">
      <div class="calculator__title row">
        <img class="septa-logo" alt="septa-logo" src="assets/imgs/septa-logo.png"/>
        <h2 class="title">{{ title }}</h2>
      </div>
      <form [formGroup]="fareForm">
        <div class="zone__container section row">
          <fieldset>
            <legend>Where are you going?</legend>
            <label hidden for="zones"></label>
            <select formControlName="zonesForm" name="zonesForm">
              <option *ngFor="let zone of data?.zones" value="{{ zone['name'] }}">{{ zone['name'] }}</option>
            </select>
          </fieldset>
        </div>
        <div class="time__container section row">
          <fieldset>
            <legend>When are you riding?</legend>
            <select formControlName="timesForm" name="timesForm">
              <option *ngFor="let time of times" value="{{ time }}">{{ time.split("_").join(" ") }}</option>
            </select>
            <p class="time-info">{{ timeInfoText }}</p>
          </fieldset>
        </div>
        <div class="location__container section row">
          <fieldset>
            <legend>Where will you purchase the fare?</legend>
            <div class="location__selection" *ngFor="let location of locations">
              <input aria-required=”true” formControlName="locationsForm" type="radio" name="locationsForm" value="{{ location.value }}"
                     id="radio-{{ location.value }}"/>
              <label for="{{ location.text }}">{{ location.text }}</label>
            </div>
          </fieldset>
        </div>
        <div class="count__container section row">
          <fieldset>
            <legend>How many rides will you need?</legend>
            <input formControlName="countForm" min="0" step="1" type="number" name="countForm"
                   id="ticket-count-input"
                   required>
            <p class="error" *ngIf="count?.status==='INVALID'">This is a required field.</p>
          </fieldset>
        </div>
        <div class="results__container row">
          <fieldset>
            <legend>Your fare will cost</legend>
            <p class="total-cost" *ngIf="fare && totalCost">\${{ totalCost.toFixed(2) }}</p>
            <p class="error--white" *ngIf="!fare">There are no tickets available.</p>
          </fieldset>
        </div>
      </form>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./septa-fare-calculator.component.scss'],
})
export class SeptaFareCalculatorComponent implements OnInit, OnChanges {
  title: string = "Regional Rail Fares";
  totalCost: number;
  times = ["anytime", "weekday", "evening_weekend"];
  timeInfoText: string;
  locations = [
    {text: "Station Kiosk", value: "advance_purchase"},
    {text: "Onboard", value: 'onboard_purchase'}
  ];
  fareForm: FormGroup;
  fare: Fare;

  private _defaultData = {} as FaresMetaData;
  private _data: BehaviorSubject<FaresMetaData> = new BehaviorSubject<FaresMetaData>(this._defaultData);

  @Input('data')
  set data(val: FaresMetaData) {
    if (val) {
      this._data.next(val);
      this.getTimeInfo(this.time.value);
      this.fare = this.getFare(val);
      this.totalCost = this.calculateTotalCost(this.fare);
    }
  }

  get data() {
    return this._data.getValue();
  }

  constructor() {
    this.createForm();
  }

  get zone() {
    return this.fareForm.get('zonesForm');
  }

  get time() {
    return this.fareForm.get('timesForm');
  }

  get purchaseLocation() {
    return this.fareForm.get('locationsForm');
  }

  get count() {
    return this.fareForm.get('countForm');
  }

  ngOnInit() {
    this.fareForm.valueChanges.subscribe(changes => {
      this.totalCost = 0; // clear last calculated totalCost;
      this.getTimeInfo(changes['timesForm']);
      this.fare = this.getFare(this.data);
      changes['countForm'] < 0 ? this.validateCount(changes['countForm']) : null;
      this.totalCost = this.calculateTotalCost(this.fare);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.data = changes['data']['currentValue'];
      this.getTimeInfo(this.time.value);
    }
  }

  createForm() {
    this.fareForm = new FormGroup({
      'zonesForm': new FormControl("CCP/1"),
      'timesForm': new FormControl("anytime"),
      'locationsForm': new FormControl(this.locations[0].value),
      'countForm': new FormControl({value: 0, validators: Validators.required})
    });
  }

  getTimeInfo(time: string) {
    this.data.info ? this.timeInfoText = this.data.info[time] : null;
  }

  getFare(data: FaresMetaData): Fare {
    return data.zones
      .find(zone => zone['name'] === this.zone.value)
      .fares
      .find(fare => {
        return fare['type'] === this.time.value && fare['purchase'] === this.purchaseLocation.value;
      });
  }

  calculateTotalCost(fare: Fare) {
    // sometimes a single ticket is worth many trips; account for those;
    if (fare && this.count.value && fare.trips > 1) {
      if (fare.trips >= this.count.value) {
        return fare.price;
      }
      if (fare.trips < this.count.value) {
        return fare.price * Math.ceil(this.count.value / fare.trips);
      }
    }
    return fare && this.count.value ? fare.price * this.count.value : 0;
  }

  validateCount(value)  {
    value < 0 ? this.count.setValue(0) : this.count.setValue(value);
  }

}
