import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ISeptaState } from '../../core/interfaces';
import { Zone } from '../../core/state/zone/zone.model';
import { Fare, FARE_PURCHASE, FARE_TYPE } from '../../core/state/fare/fare.model';
import { Selection } from '../../core/state/selection/selection.model';

import * as SelectionActions from '../../core/state/selection/selection.actions';

@Component({
    selector: 'septa-fare',
    styleUrls: [ './fare.scss' ],
    templateUrl: './fare.html'
})
export class FareComponent implements OnInit {
    public zones: Zone[];
    public selection: Selection;

    private store: Store<ISeptaState>;
    private zoneSubscription: Subscription;
    private selectionSubscription: Subscription;

    constructor(store: Store<ISeptaState>) {
        Object.assign(this, { store });
    }

    public ngOnInit(): void {
        this.zoneSubscription = this.store.select('zones').subscribe((zones: Zone[]) => {
            if (zones) {
                this.zones = zones;

                this.store.dispatch(new SelectionActions.Edit({ zone: this.zones[0] }));
            }
        });

        this.selectionSubscription =  this.store.select('selection').subscribe((selection: Selection) => {
            this.selection = selection;
        });
    }

    public ngOnDestroy(): void {
        this.zoneSubscription.unsubscribe();
        this.selectionSubscription.unsubscribe();
    }

    public onZoneChange(zone: Zone): void {
        this.store.dispatch(new SelectionActions.Edit(this.selection));
    }

    public onTypeChange(type: string): void {
        this.store.dispatch(new SelectionActions.Edit(this.selection));
    }

    public onPurchaseChange(purchase: string): void {
        this.store.dispatch(new SelectionActions.Edit(this.selection));
    }

    public onQuantityChange(quantity: number): void {
        this.store.dispatch(new SelectionActions.Edit(this.selection));
    }

    public isOptionDisabled(type: string): boolean {
        const match: Fare = this.selection.zone.fares.find((fare: Fare) => {
            return fare.typeLabel === type && fare.purchaseLabel === this.selection.purchase;
        });

        return match ? false : true;
    }
}
