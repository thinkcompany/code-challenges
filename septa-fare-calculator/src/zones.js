const zoneData =  {
  zones: [
    {
        name: 'CCP/1',
        zoneNum: 1,
        fares: [{
            type: 'weekday',
            purchase: 'advance purchase',
            trips: 1,
            price: 4.75
        }, {
            type: 'weekday',
            purchase: 'onboard purchase',
            trips: 1,
            price: 6.00
        }, {
            type: 'evening weekend',
            purchase: 'advance purchase',
            trips: 1,
            price: 3.75
        }, {
            type: 'evening weekend',
            purchase: 'onboard purchase',
            trips: 1,
            price: 5.00
        }, {
            type: 'anytime',
            purchase: 'advance purchase',
            trips: 10,
            price: 38.00
        }]
    }, {
        name: 'Zone 2',
        zoneNum: 2,
        fares: [{
            type: 'weekday',
            purchase: 'advance purchase',
            trips: 1,
            price: 4.75
        }, {
            type: 'weekday',
            purchase: 'onboard purchase',
            trips: 1,
            price: 6.00
        }, {
            type: 'evening weekend',
            purchase: 'advance purchase',
            trips: 1,
            price: 3.75
        }, {
            type: 'evening weekend',
            purchase: 'onboard purchase',
            trips: 1,
            price: 5.00
        }, {
            type: 'anytime',
            purchase: 'advance purchase',
            trips: 10,
            price: 45.00
        }]
    }, {
        name: 'Zone 3',
        zoneNum: 3,
        fares: [{
            type: 'weekday',
            purchase: 'advance purchase',
            trips: 1,
            price: 5.75
        }, {
            type: 'weekday',
            purchase: 'onboard purchase',
            trips: 1,
            price: 7.00
        }, {
            type: 'evening weekend',
            purchase: 'advance purchase',
            trips: 1,
            price: 5.00
        }, {
            type: 'evening weekend',
            purchase: 'onboard purchase',
            trips: 1,
            price: 7.00
        }, {
            type: 'anytime',
            purchase: 'advance purchase',
            trips: 10,
            price: 54.50
        }]
    }, {
        name: 'Zone 4',
        zoneNum: 4,
        fares: [{
            type: 'weekday',
            purchase: 'advance purchase',
            trips: 1,
            price: 6.50
        }, {
            type: 'weekday',
            purchase: 'onboard purchase',
            trips: 1,
            price: 8.00
        }, {
            type: 'evening weekend',
            purchase: 'advance purchase',
            trips: 1,
            price: 5.00
        }, {
            type: 'evening weekend',
            purchase: 'onboard purchase',
            trips: 1,
            price: 7.00
        }, {
            type: 'anytime',
            purchase: 'advance purchase',
            trips: 10,
            price: 62.50
        }]
    }, {
        name: 'NJ',
        zoneNum: 5,
        fares: [{
            type: 'weekday',
            purchase: 'advance purchase',
            trips: 1,
            price: 9.00
        }, {
            type: 'weekday',
            purchase: 'onboard purchase',
            trips: 1,
            price: 10.00
        }, {
            type: 'evening weekend',
            purchase: 'advance purchase',
            trips: 1,
            price: 9.00
        }, {
            type: 'evening weekend',
            purchase: 'onboard purchase',
            trips: 1,
            price: 10.00
        }, {
            type: 'anytime',
            purchase: 'advance purchase',
            trips: 10,
            price: 80.00
        }]
    }
  ],
}

export default zoneData;