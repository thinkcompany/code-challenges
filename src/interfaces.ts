export interface Info {
    anytime: string;
    weekday: string;
    evening_weekend: string;
    advance_purchase: string;
    onboard_purchase: string;
}

export interface Fare {
    type: string;
    purchase: string;
    trips: number;
    price: number;
}

export interface Zone {
    name: string;
    zone: number;
    fares: Fare[];
}

export interface FareData {
    info: Info;
    zones: Zone[];
}
