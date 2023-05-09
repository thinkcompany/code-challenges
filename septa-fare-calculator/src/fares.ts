export interface Fares {
    info:  Info;
    zones: Zone[];
}

export interface Info {
    anytime:          string;
    weekday:          string;
    evening_weekend:  string;
    advance_purchase: string;
    onboard_purchase: string;
}

export interface Zone {
    name:  string;
    zone:  number;
    fares: Fare[];
}

export interface Fare {
    type:     Type;
    purchase: Purchase;
    trips:    number;
    price:    number;
}

export enum Purchase {
    AdvancePurchase = "advance_purchase",
    OnboardPurchase = "onboard_purchase",
}

export enum Type {
    Anytime = "anytime",
    EveningWeekend = "evening_weekend",
    Weekday = "weekday",
}
