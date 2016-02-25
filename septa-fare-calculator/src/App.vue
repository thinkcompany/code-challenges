<template>
  <div class="app-container">

  <div class="app">
      <h1>Regional Rail Fares</h1>

      <div class="input-group">
      <label for="destination">Where are you going?</label>
      <select v-model="destination" id="destination" @change="update_zone">
      <option v-for="zone in zones" :value="zone">{{ zone.name }}</option>
      </select>
      </div>

      <div class="input-group">
      <label for="when">When are you riding?</label>
      <select v-model="when" id="when" @change="update_type">
      <option v-for="time in available_times" :value="time">{{ time }}</option>
      </select>
      </div>

      <div class="input-group">
      <label>Where will you purchase the fare?</label>
      <span v-for="location in available_locations">
      <input type="radio" :id="location" value="{{ location }}" v-model="purchase_location">
      <label for="{{ location }}">{{ location }}</label>
      </span>
      </div>

      <div class="input-group">
          <label for="num_rides">How many rides will you need?</label>
          <input type="number" id="num_rides" v-model="num_rides" :step="fare.trips">
      </div>

      <div class="fare">Your fare will cost: $ {{ cost }}</div>
  </div>

</template>

<script>
import _ from 'underscore';

export default {
  data () {
    return {
      info: undefined,
      zones: undefined,

      available_times: [],
      available_locations: [],

      destination: undefined,
      when: undefined,
      purchase_location: undefined,
      num_rides: 1,
    }
  },
  methods: {
    update_zone: function() {
      this.available_times = _.uniq(_.pluck(this.destination.fares, 'type'));
    },
    update_type: function() {
      this.available_locations = _.uniq(_.pluck(_.where(this.destination.fares, {type: this.when}), 'purchase'));
      if (!_.contains(this.available_locations, this.purchase_location)) {
          this.purchase_location = this.available_locations[0];
      }
    }
  },
  computed: {
    fare: function() {
      var fare = _.findWhere(this.destination.fares, {type: this.when, purchase: this.purchase_location});
      return fare;
    },
    cost: function() {
      if (!this.destination) return 0;
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
        this.update_zone();
        this.when = this.available_times[0];
        this.update_type();
        this.purchase_location = this.available_locations[0];
      },
      function(response) {

      }
    );
  }
}
</script>

<style lang="sass">
html, body {
  height: 100%;
}
body {
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
h1 {
  text-align: center;
}
.input-group {
  border: none;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
label {
  text-align: center;
}
select,
input[type="text"] {
  width: 100%;
  line-height: 2rem;
}
.app-container {
  display: flex;
  flex-flow: row-wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.app {
  max-width: 32rem;
  width: 100%;
  border: 1px solid #eee;
  padding: 1rem;
}
.fare {
  font-size: 2rem;
  text-align: center;
}
</style>
