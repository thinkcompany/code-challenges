import { Fare, FARE_PURCHASE, FARE_TYPE } from '../fare/fare.model';
import { Zone } from '../zone/zone.model';

export interface ISelectionData {
    zone: Zone;
    type?: string;
    purchase?: string;
    price?: number;
    quantity?: number;
}

export class Selection {
    public zone: Zone;
    public _type: string;
    public _purchase: string;
    public _price: number;
    public quantity: number = 1;

    constructor(data: ISelectionData) {
        Object.assign(this, data);
    }

    public get type(): string {
        if (this._type) {
            return this._type;
        }

        return this.zone ? this.zone.fares[0].typeLabel : '';
    }

    public set type(val: string) {
        this._type = val;
    }

    public get purchase(): string {
        if (this._purchase) {
            return this._purchase;
        }

        return this.zone ? this.zone.fares[0].purchaseLabel : '';
    }

    public set purchase(val: string) {
        this._purchase = val;
    }

    public get price(): number {
        if (this.type && this.purchase) {
            return this.fare.price;
        }

        return 0;
    }

    public set price(val: number) {
        this._price = val;
    }

    public get fareTypes(): string[] {
        return Zone.unique('typeLabel', this.zone.fares);
    }

    public get farePurchases(): string[] {
        const filtered: Fare[] = this.filter('typeLabel', this.type);

        return Zone.unique('purchaseLabel', filtered);
    }

    private filter(prop: string, value: string): Fare[] {
        return this.zone.fares.filter((fare: Fare) => {
            return fare[prop] === value;
        });
    }

    public get data(): ISelectionData {
        return {
            zone: this.zone,
            type: this.type,
            purchase: this.purchase,
            price: this.price,
            quantity: this.quantity
        };
    }

    public get total(): number {
        return this.price * this.quantity;
    }

    public get fare(): Fare {
        return this.zone.fares.find((fare: Fare) => {
            return fare.typeLabel === this.type && fare.purchaseLabel === this.purchase;
        });
    }
}
