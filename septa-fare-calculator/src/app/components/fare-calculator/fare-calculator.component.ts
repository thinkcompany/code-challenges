import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import { Fare, FareResponse, FareZone } from './fare-calculator.model';
import { Subject, Subscription } from 'rxjs';
import { FareCalculatorService } from './fare-calculator.service';
import { first, takeUntil, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'fare-calculator',
    templateUrl: './fare-calculator.component.html',
    styleUrls: ['./fare-calculator.component.scss'],
    providers: [FareCalculatorService, FormControlDirective]
})
export class FareCalculatorComponent implements OnInit, OnDestroy {

    private faresSubscription: Subscription;
    private numberRidesSubscription: Subscription;
    private onDestroy$ = new Subject<void>();

    public readonly timeframes = {
        weekday: {
            value: 1,
            key: 'weekday',
            plaintext: 'Weekday'
        },
        eveningOrWeekend: {
            value: 2,
            key: 'evening_weekend',
            plaintext: 'Evening / Weekend'
        },
        anytime: {
            value: 3,
            key: 'anytime',
            plaintext: 'Anytime'
        }
    };
    public fares: FareResponse = null;
    public errorMessage = '';
    public helperText = '';
    public faresLoading = true;
    public selectedDestination: string = '-1';
    public selectedTimeframe: string = this.timeframes.weekday.key;
    public disableSecondaryFields = true;
    public selectedLocation = 'onboard_purchase';
    public price = 0;
    public numberRides = 0;
    public ridesControl = new FormControl();



    constructor(private fareCalcService: FareCalculatorService) { }


    ngOnInit() {
        this.faresSubscription = this.fareCalcService.getFares()
                                     .pipe(takeUntil(this.onDestroy$), first())
                                     .subscribe((fareResponse) => {
                                         this.fares = fareResponse;
                                         this.faresLoading = false;
                                     }, (error) => this.errorMessage = error);
        // handle numerical input from user. debounce to prevent disorientingly quick calculations
        this.numberRidesSubscription = this.ridesControl.valueChanges
                                           .pipe(debounceTime(250))
                                           .subscribe(number => {
                                               if (!this.disableSecondaryFields) {
                                                   this.numberRides = number;
                                                   this.calcPrice();
                                               }
                                           });
    }

    ngOnDestroy() {
        // close up shop to avoid memory leakage
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    enableDisableFields() {
        this.disableSecondaryFields = +this.selectedDestination === -1;
        this.updateTimeframeHelperText();
    }

    timeframeChanged() {
        this.selectedLocation = 'advance_purchase';
        this.updateTimeframeHelperText();
        this.calcPrice();
    }

    updateTimeframeHelperText() {
        if (this.disableSecondaryFields) {
            this.helperText = '';
        } else {
            switch (this.selectedTimeframe) {
                case this.timeframes.anytime.key: {
                    this.helperText = this.fares.info.anytime;
                    break;
                }
                case this.timeframes.eveningOrWeekend.key: {
                    this.helperText = this.fares.info.evening_weekend;
                    break;
                }
                case this.timeframes.weekday.key: {
                    this.helperText = this.fares.info.weekday;
                    break;
                }
            }
        }
    }

    calcPrice() {
        // assuming zones.zone is a unique identifier here
        let selectedZone: FareZone;
        for (let zone of this.fares.zones) {
            if (zone.zone === +this.selectedDestination) {
                selectedZone = Object.assign({}, zone);
                break;
            }
        }

        let selectedFare: Fare;
        for (let fare of selectedZone.fares) {
            if (fare.type === this.selectedTimeframe &&
                fare.purchase === this.selectedLocation) {
                selectedFare = Object.assign({}, fare);
                break;
            }
        }

        this.price = selectedFare.price * Math.ceil(this.numberRides / selectedFare.trips);
    }
}
