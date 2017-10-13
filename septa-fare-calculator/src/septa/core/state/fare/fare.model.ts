export enum FARE_TYPE {
    WEEKDAY = 'weekday',
    EVENING_WEEKEND = 'evening_weekend',
    ANYTIME = 'anytime'
}

export enum FARE_PURCHASE {
    ADVANCE = 'advance_purchase',
    ONBOARD = 'onboard_purchase'
}

export interface IFareFields {
    type: FARE_TYPE;
    purchase: FARE_PURCHASE;
    trips: number;
    price: number;
}

export class Fare implements IFareFields {
    public type: FARE_TYPE;
    public purchase: FARE_PURCHASE;
    public trips: number;
    public price: number;

    constructor(data: IFareFields) {
        Object.assign(this, data);
    }

    public get typeLabel(): string {
        return this.type.split(<string> '_').map((str: string) => {
            const first: string = str.charAt(0).toLocaleUpperCase();

            return `${first}${str.slice(1)}`;
        }).join(' ');
    }

    public get purchaseLabel(): string {
        if (this.purchase === FARE_PURCHASE.ADVANCE) {
            return 'Station Kiosk';
        }

        return 'Onboard';
    }
}
