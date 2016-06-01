import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery'

var SeptaWidget = React.createClass({
   getInitialState: function () {
      return {
         fares: "",
         zone: "",
         type: "",
         purchase: "",
         trips: "",
         price: "",
         info: "",
      }
   },
   componentDidMount: function() {
      var that = this;
      this.serverRequest = $.ajax({
         url: that.props.source,
         dataType: 'jsonp',
         success: function (result) {
            var defaultInfo = result;
            that.setState({
               fares: defaultInfo,
               zone: defaultInfo.zones[0].zone,
               type: defaultInfo.zones[0].fares[0].type,
               purchase: defaultInfo.zones[0].fares[0].purchase,
               trips: 1,
               price: defaultInfo.zones[0].fares[0].price,
               info: defaultInfo.info[defaultInfo.zones[0].fares[0].type]
            });
         }
      });
   },

   componentWillUnmount: function() {
      this.serverRequest.abort();
   },

   update: function (e) {
      var target = e.target;
      var name = target.name;
      var value = target.value;
      if (name === "type") {
         var info = this.state.fares.info[value];
         return this.setState({
            info: info,
            [name]: value
         })
      }

      this.setState({
         [name]: value
      });
   },

   getFarePrice: function () {
      if (this.state.fares.length === 0) {
         return;
      }
      var fares = this.state.fares,
         zoneIdx = this.state.zone - 1,
         zone = fares.zones[zoneIdx],
         type = this.state.type,
         purchase = this.state.purchase,
         trips = this.state.trips;

      var fare = zone.fares.find(function (el) {
         return el.type === type && el.purchase === purchase  
      })
      return fare.price * trips;
   },

   render: function () {
      return (
         <div className="main">
            <div className="header">
               <img className="header-img" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/SEPTA.svg" alt="Septa" width="50" height="40" />
               <h1 className="header-text">Regional Rail Fares</h1>
            </div>
            <form onChange={this.update}>
               <p className="input-container">
                  <label htmlFor="zone-selector">Where are you going?</label>
                  <select required="true" id="zone-selector" name="zone" defaultValue="1">
                     <option value="1">CCP/1</option> 
                     <option value="2">Zone 2</option>
                     <option value="3">Zone 3</option>
                     <option value="4">Zone 4</option>
                     <option value="5">New Jersey</option>
                  </select>
               </p>

               <p className="input-container">
                  <label htmlFor="type-selector">When are you riding?</label>
                  <select require="true" id="type-selector" name="type">
                     <option value="weekday">Weekdays</option> 
                     <option value="evening_weekend">Evening/Weekends</option>
                     <option value="anytime">Anytime</option>
                  </select>
                  <br/>
                  <span className="helper-text" name="info">{this.state.info}</span>
               </p>

               <fieldset className="input-container">
                  <legend>Where will you purchase the fare?</legend>
                  <p>
                     <input type="radio" name="purchase" value="advance_purchase" id="purchase-time-kiosk-radio" />
                     <label className="fieldset-label" htmlFor="purchase-time-kiosk-radio">
                        Station Kiosk
                     </label>
                  </p>
                  <br/>
                  <p>
                     <input type="radio" name="purchase" value="onboard_purchase" id="purchase-time-onboard-radio" />
                     <label className="fieldset-label" htmlFor="purchase-time-onboard-radio">
                        Onboard
                     </label>
                  </p>
               </fieldset>

               <p className="input-container">
                  <label htmlFor="trips-input">How many rides will you need?</label>
                  <input name="trips" type="number" min="0" id="trips-input" default="1" />
               </p>

            </form>
            <div className="total-fare">
               <p>Your fare will cost</p>
               <strong className="price">${this.getFarePrice()}</strong>
            </div>
         </div>
      );
   }
});

ReactDOM.render(
   <SeptaWidget source="http://localhost:3000/db" />,
   document.getElementById('root')
);