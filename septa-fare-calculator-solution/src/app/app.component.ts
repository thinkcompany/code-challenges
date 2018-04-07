import {Component, OnInit} from '@angular/core';
import {FaresMetaData, SeptaFaresService} from './septa-fare-calculator/septa-fares.service';

import 'rxjs/add/operator/take';

@Component({
  selector: 'septa-root',
  template: `
    <div class="container">
      <septa-fare-calculator [fares]="faresData"></septa-fare-calculator>
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
    // this.fares.getFares()
    //   .take(1)
    //   .subscribe(data => {
    //     this.faresData = data;
    //   });
  }
}
