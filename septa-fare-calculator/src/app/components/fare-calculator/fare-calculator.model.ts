export interface FareResponse {
    info: FareInfo;
    zones: FareZone[];
}

export interface FareInfo {
    anytime: string;
    weekday: string;
    evening_weekend: string;
    advance_purchase: string;
    onboard_purchase: string;
}

export interface FareZone {
    name: string;
    zone: number;
    fares: Fare[];
}

export interface Fare {
    type: string;
    purchase: string;
    trips: number;
    price: number;
}

/*
{
    "info": {
        "anytime": "Valid anytime",
        "weekday": "Valid Monday through Friday, 4:00 a.m. - 7:00 p.m. On trains arriving or departing 30th Street Station, Suburban and Jefferson Station",
        "evening_weekend": "Valid weekdays after 7:00 p.m.; all day Saturday, Sunday and major holidays. On trains arriving or departing 30th Street Station, Suburban and Jefferson Station",
        "advance_purchase": "Tickets available for purchase at all SEPTA offices.",
        "onboard_purchase": "Tickets available for purchase from a train conductor aboard SEPTA regional rail trains."
    },
    "zones": [{
        "name": "CCP/1",
        "zone": 1,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 4.75
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 6.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 3.75
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 38.00
        }]
    }, {
        "name": "Zone 2",
        "zone": 2,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 4.75
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 6.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 3.75
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 45.00
        }]
    }, {
        "name": "Zone 3",
        "zone": 3,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 5.75
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 7.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 7.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 54.50
        }]
    }, {
        "name": "Zone 4",
        "zone": 4,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 6.50
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 8.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 7.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 62.50
        }]
    }, {
        "name": "NJ",
        "zone": 5,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 9.00
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 10.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 9.00
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 10.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 80.00
        }]
    }]
}

*/
