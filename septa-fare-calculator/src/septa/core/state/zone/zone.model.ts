import { Fare, IFareFields } from '../fare/fare.model';

export interface IInfoFields {
    anytime: string;
    weekday: string;
    evening_weekend: string;
    advance_purchase: string;
    onboard_purchase: string;
}

export interface IZoneFields {
    name: string;
    zone: number;
    fares: IFareFields[];
}

export class Zone implements IZoneFields {
    public name: string;
    public zone: number;
    public fares: Fare[] = [];
    public text: IInfoFields;

    public static unique(key: string, items: Data[]): string[] {
        const categories: string[] = items.map((fare: Fare) => {
            return fare[key];
        });

        return Array.from(new Set(categories));
    }

    constructor(data: IZoneFields, text: IInfoFields) {
        Object.assign(this, {
            name: data.name,
            text,
            zone: data.zone
        });

        for (const fareData of data.fares) {
            this.fares.push(new Fare(fareData));
        }
    }

    public get zoneName(): string {
        return `Zone ${this.zone}`;
    }
}
