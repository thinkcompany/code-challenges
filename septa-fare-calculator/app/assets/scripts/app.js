  var callback = function() {

    // I lke to wrap my JavaScript in objects to keep them out of the global scope and make sure the data is safe

    const FareCalculator = {

      // My initial function to grab my elements

      init () {

        // Define my Bem Class name and the name of my module

        this.moduleName = 'FareCalculator';
        this.bemClass = 'fare-calculator';

        // I use 'data-js' for selecting elements, I like to practice a separation of concerns so I don't use CSS selectors
        // I've also written a helper function to make grabbing the element(s) easier

        this.destination = this.easyDataJS({
          name: `${this.moduleName}.Destination`,
          selectAll: false
        });

        this.when = this.easyDataJS({
          name: `${this.moduleName}.When`,
          selectAll: false
        });
        this.whenHelperText = this.easyDataJS({
          name: `${this.moduleName}.HelperText.When`,
          selectAll: false
        });

        this.purchaseLocations = this.easyDataJS({
          name: `${this.moduleName}.PurchaseLocation`,
          selectAll: true
        });
        this.purchaseHelperText = this.easyDataJS({
          name: `${this.moduleName}.HelperText.Purchase`,
          selectAll: false
        });

        this.tickets = this.easyDataJS({
          name: `${this.moduleName}.Tickets`
        });
        this.ticketsHelperText = this.easyDataJS({
          name: `${this.moduleName}.HelperText.Tickets`
        });

        this.totalFare = this.easyDataJS({
          name: `${this.moduleName}.TotalFare`
        });

        this.savingsHelperText = this.easyDataJS({
          name: `${this.moduleName}.HelperText.Savings`
        });

        // Obviously, this URL would change for the live version of this...

        this.dataURL = '//192.168.1.162:3000/fares.json';

        // Fetch my data first

        this.fetchData();
      },

      // I use ES6's fetch to grab the data from the API

      fetchData () {
        fetch(this.dataURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          // To prevent multiple calls to the data, I log the data in a variable

          this.data = data;
        })
        .then(() => {

          // Now that we have the data, I build the necessary page elements

          this.buildParams();
        })
      },

      buildParams () {

        // I like to have a "builder" function that calls the rest my functions, so that I know where things take place
        // This makes it easier to debug

        this.buildDestinationValues();
        this.logSelectedDestination();

        this.logSelectedWhen();
        this.displayWhenHelperText();

        this.logSelectedPurchaseLocation();
        this.displayPurchaseHelperText();
        this.displayTicketHelperText();

        this.listenForDestinationChange();
        this.listenForWhenChange();
        this.listenForPurchaseLocationChange();
        this.listenForTicketNumberUpdates();

        this.accessSelectedValues();
      },

      buildDestinationValues () {

        // I'm dynamically creating the zones from the data, I figure it's better to do it this way in case the data changes in the future
        // I would normally add a preloader to the page while this data loads up so there is no lag

        this.data.zones.forEach((zone) => {
          let zoneElement = this.createNewElement({
            element: 'option',
            classNames: [`${this.bemClass}__option`],
            customAttributes:
              {
                "value": zone.name,
                "data-js-zone": zone.zone
              }
          });
          zoneElement.innerHTML = zone.name;

          this.destination.appendChild(zoneElement);
        });
      },

      //
      // LOG VALUES
      // Here I'm just logging the values as the user enters them, so I can perform calculations with them later

      logSelectedDestination () {
        this.selectedDestination = this.logSelectedValue(this.destination);
        this.selectedDestination.value = this.selectedDestination.getAttribute('data-js-zone');
      },

      logSelectedWhen () {
        this.selectedWhen = this.logSelectedValue(this.when);
        this.selectedWhen.value = this.selectedWhen.getAttribute('value');
      },

      logSelectedPurchaseLocation (purchaseLocation) {

        if (!purchaseLocation) {
          this.purchaseLocations.forEach((location) => {
            if (location.checked) {
              this.selectedPurchaseLocation = location;
              this.selectedPurchaseLocation.value = location.value;
            }
          });
        } else {
              this.selectedPurchaseLocation = purchaseLocation;
              this.selectedPurchaseLocation.value = purchaseLocation.value;
        }
      },

      logNumberOfTickets () {
        this.selectedNumberOfTickets = this.tickets.value;
      },

      //
      // DISPLAY HELPER TEXT
      // Dynamically filling in helper text so that users can be aware of what's going on

      displayWhenHelperText () {
        this.filterInfoValues(this.selectedWhen.value, this.whenHelperText);
      },

      displayPurchaseHelperText () {
        this.filterInfoValues(this.selectedPurchaseLocation.value, this.purchaseHelperText);
      },

      displayTicketHelperText () {

        let ticketsNumberValue = this.convertToNumber(this.selectedNumberOfTickets);

        if (!this.selectedNumberOfTickets) {
          this.ticketsHelperText.innerHTML = `Please enter the number of tickets you need`;
        } else if ( isNaN(ticketsNumberValue) ) {
          this.ticketsHelperText.innerHTML = `Please enter a number`;
        } else {
          this.ticketsHelperText.innerHTML = ``;
        }
      },

      //
      // PASS VALUES & CALCULATE TOTAL
      // Before calculating the total, I want to collect all the inputs, then pass them into the total

      accessSelectedValues () {
        this.calculateTotal({
          time: this.selectedWhen.value,
          destZone: this.selectedDestination.value,
          purchLoc: this.selectedPurchaseLocation.value,
          tix: this.selectedNumberOfTickets
        });
      },

      //
      // CALCULATE TOTAL
      //

      calculateTotal (ops = {}) {

        // Add notice to stop user before trying to purchase anytime tickets on board a train

        this.checkTicketPurchase(ops.purchLoc, ops.time);

        // Stop this if the number of tickets is invalid

        if (!ops.tix) {
          return;
        }

        if(isNaN(ops.tix)) {
          var tixFixed = this.stripValueToNumber(ops.tix);

          if( isNaN(tixFixed) ) {
            ops.tix = 0;
          } else {
            ops.tix = tixFixed;
          }
        }

        // Find our Zone

        this.data.zones.forEach((dataZone) => {
          if (dataZone.zone == ops.destZone) {
            this.chosenZone = dataZone;
          }
        });

        // Find the right fare Purchase and Type

        this.chosenZone.fares.forEach((fare) => {
          if (fare.purchase == ops.purchLoc && fare.type == ops.time) {

            // Add a caveat if users have picked a 10-trip saver option

            if (fare.trips != ops.tix && ops.time === 'anytime') {
              this.savingsHelperText.innerHTML =
              `NOTE: The Price above represents the ${fare.trips}-Trip Saver's discount Price for this ticket.<br>
              To see an accurate price for ${ops.tix} trip(s), please select "Evenings & Weekends" or "Weekday" Riding Options`;
            } else {
              this.savingsHelperText.innerHTML = ``;
            }

            // Log the fare subtotal

            this.fareSubtotal = fare.price;

            // Set the number of tickets to 1 if the trips are greater than 1
            // A trip value greater than 1 means the user is on a discounted option, and having multiple ticket numbers would fuzzy up the data

            if (fare.trips > 1) {
              ops.tix = 1;
            }
          }
        });

        // Multiply Price by number of tickets

        this.rawPrice = this.fareSubtotal * ops.tix;
        this.showFinalPrice();
      },

      checkTicketPurchase (purchLoc, time) {
        if (purchLoc === "onboard_purchase" && time === "anytime") {
          let alertText = `NOTE: "Anytime" tickets MUST be purchased in advance.`;
          this.whenHelperText.innerHTML = alertText;
          this.purchaseHelperText.innerHTML = alertText;
        } else {
          this.displayWhenHelperText();
          this.displayPurchaseHelperText();
        }
      },

      showFinalPrice() {

        // Making the number into a value that works as currency

        this.finalPrice = this.rawPrice.toFixed(2);
        this.totalFare.innerHTML = `$${this.finalPrice}`;
      },



      //
      // LISTEN FOR CHANGES
      // These are functions that listen for changes and update the page accordingly

      listenForDestinationChange () {
        this.destination.addEventListener('change', () => {
          this.logSelectedDestination();
          this.accessSelectedValues();
        });
      },

      listenForWhenChange () {
        this.when.addEventListener('change', () => {
          this.logSelectedWhen();
          this.displayWhenHelperText();
          this.accessSelectedValues();
        });
      },

      listenForPurchaseLocationChange () {
        this.purchaseLocations.forEach((location) => {
          location.addEventListener('change', (event) => {
            this.logSelectedPurchaseLocation(event.target)
            this.displayPurchaseHelperText();
            this.accessSelectedValues();
          });
        });
      },

      listenForTicketNumberUpdates () {
        this.tickets.addEventListener('input', () => {
          this.logNumberOfTickets();
          this.displayTicketHelperText();
          this.accessSelectedValues();
        });
      },

      //
      // HELPERS
      // These are reusable functions for performing mundane tasks

      stripValueToNumber (value) {
        getNumbers = value.replace(/\D/g,'');
        finalValue = parseInt(getNumbers, 10);
        return finalValue;
      },

      filterInfoValues(selectedValue, selectedHelperText) {
        for (let prop in this.data.info) {
          if (prop === selectedValue) {
            selectedHelperText.innerHTML = this.data.info[prop];
          }
        }
      },

      logSelectedValue (element) {
        return element.options[element.selectedIndex]
      },

      easyDataJS (options = {}) {
        options.name
        options.selectAll

        if (options.context) {
          var context = options.context;
        } else {
          var context = document;
        }

        if (options.selectAll) {
          return context.querySelectorAll(`[data-js="${options.name}"]`);
        } else {
          return context.querySelector(`[data-js="${options.name}"]`);
        }
      },

      createNewElement (options = {}) {
        var newElement = document.createElement(options.element);

        if (options.classNames) {
          options.classNames.forEach((className) => newElement.classList.add(className));
        }
        if (options.dataJS) {
          newElement.setAttribute('data-js', options.dataJS);
        }

        if (options.customAttributes) {
          for(var key in options.customAttributes) {
            newElement.setAttribute(key, options.customAttributes[key]);
          }
        }
        return newElement;
      },

      convertToNumber (value) {
        return parseInt(value, 10);
      }
    }; // FARECALCULATOR

    FareCalculator.init();
  };

  // This is my "$(document).ready()" workaround for plain js

  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" &&
    !document.documentElement.doScroll)
  ) {

    callback();

  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }