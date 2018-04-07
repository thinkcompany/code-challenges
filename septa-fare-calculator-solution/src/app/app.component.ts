import {Component, OnInit} from '@angular/core';
import {FaresMetaData, SeptaFaresService} from './septa-fare-calculator/septa-fares.service';

import 'rxjs/add/operator/take';

@Component({
  selector: 'septa-root',
  template: `
    <div class="grid-container">
      <div class="row">
        <div class="col-4">
            <septa-fare-calculator [fares]="faresData"></septa-fare-calculator>
        </div>
        <div class="col-8 zone-map">
          <img src="assets/imgs/zone-map.jpg" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faresData: FaresMetaData;

  constructor(private fares: SeptaFaresService) {
    this.fares.getFares()
      .take(1)
      .subscribe(data => {
        console.log('data', data);
        this.faresData = data;
      });
  }

  ngOnInit() {
  }
}
