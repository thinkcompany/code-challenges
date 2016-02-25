<template>
  <div id="app">

    <label for="destination">Where are you going?</label>
    <select v-model="destination" id="destination">
        <option v-for="zone in zones" :value="zone">{{ zone.name }}</option>
    </select>

    <label for="when">When are you riding?</label>
    <select v-model="when" id="when">
        <option v-for="time in travel_times" :value="time">{{ time }}</option>
    </select>

    <div v-for="location in purchase_locations">
        <label for="{{ location }}">{{ location }}</label>
        <input type="radio" :id="location" value="{{ location }}" v-model="purchase_location">
    </div>

    <label for="num_rides">How many rides will you need?</label>
    <input type="number" id="num_rides" v-model="num_rides">

    <div>Your fare will cost: $ {{ cost }}</div>

    <pre>{{ info | json }}</pre>
    <br>
    <pre>{{ zones  | json}}</pre>
  </div>
</template>

<script>
import _ from 'underscore';

export default {
  data () {
    return {
      info: undefined,
      zones: undefined,
      travel_times: [
        'anytime',
        'weekday',
        'evening_weekend'
      ],
      purchase_locations: [
        'advance_purchase',
        'onboard_purchase'
      ],

      destination: undefined,
      when: undefined,
      purchase_location: undefined,
      num_rides: 1,
    }
  },
  computed: {
    fare: function() {
      var fare = _.findWhere(this.destination.fares, {type: this.when, purchase: this.purchase_location});
      return fare;
    },
    cost: function() {
      var fare = _.findWhere(this.destination.fares, {type: this.when, purchase: this.purchase_location});
      return fare.price * this.num_rides;
    }
  },
  ready: function() {
    this.$http.get('/fares.json').then(
      function(response) {
        this.info = response.data.info;
        this.zones = response.data.zones;
        this.destination = this.zones[0];
        this.when = this.travel_times[0];
        this.purchase_location = this.purchase_locations[0];
      },
      function(response) {

      }
    );
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
