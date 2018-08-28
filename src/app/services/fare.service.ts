import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Fare } from '../types/Fare';
import { Zone } from '../types/Zone';
import { Output } from '../types/Output';

@Injectable()
export class FareService {
  private http: HttpClient;
  private zones: Array<Zone>;

  // Can later be replaced with the backend rest endpoint uri
  private apiUri = '/assets/fares.json';

  constructor(http: HttpClient) {
    this.http = http;

    this.getFares().subscribe(fares => {
      this.zones = fares.zones;
    });
  }

  public getFares(): Observable<any> {
    return this.http.get(this.apiUri);
  }

  public getDefaultFare(): Fare {
    return {
      trips: 1,
      purchase: 'advance_purchase',
      type: 'weekday',
      zone: '1'
    };
  }

  /* Once intergrated with a backend, calcFarePrice would call a
  backend Service to make calculations.
  The length of this makes me cringe. I would separate this out into
  helper functions if I had more time */
  public calcFarePrice(fare: Fare): Output {
    let selectedZoneFares;
    let selectedFare;
    let selectedZoneAnytimeFare;
    const output = {savings: '', price: '', error: ''};

    // Special checks for anytime fares
    if (fare.type === 'anytime') {
      if (fare.purchase === 'onboard_purchase') {
        output.price = '';
        output.error = 'Anytime tickets not available for onboard purchase';
        output.savings = '';
        return output;
      }

      if (fare.trips % 10 !== 0) {
        output.price = '';
        output.error = 'Anytime tickets must be purchased in groups of 10';
        output.savings = '';
        return output;
      }
    }

    /* Finding the selected zone's fares. Using a for loop because
    I want to break out of it when I find the correct zone */
    for (let i = 0; i < this.zones.length; i++) {
      /* Since the value from the select field comes back as
      a string, I have to use parseInt */
      if (this.zones[i].zone === parseInt(fare.zone, 10)) {
        selectedZoneFares = this.zones[i].fares;
        break;
      }
    }

    /* Using a for each loop because I want to visit each
    element to find the anytime fare in addition to the
    selected fare */
    selectedZoneFares.forEach(baseFare => {
      if (baseFare.purchase === fare.purchase && baseFare.type === fare.type) {
        selectedFare = baseFare;
        let price;

        if (selectedFare.type === 'anytime') {
          price = baseFare.price / 10 * fare.trips;
        } else {
          price = baseFare.price * fare.trips;
        }

        output.price = price.toFixed(2);
      }

      // This will be used to calculate potential savings
      if (baseFare.type === 'anytime') {
        selectedZoneAnytimeFare = baseFare;
      }
    });

    // Calculating potential savings
    if (selectedFare.type !== 'anytime') {
      const savings = selectedFare.price * 10 - selectedZoneAnytimeFare.price;
      output.savings = savings > 0 ? `Save $${savings.toFixed(2)} per 10 rides with a 10-pack of anytime tickets` : '';
    }

    return output;
  }

}

