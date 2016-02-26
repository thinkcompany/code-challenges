<template>
  <div class="app-container">

  <div class="app">
      <h1 class="app-title"><img src="img/logo.png" width="50" height="50"> Regional Rail Fares</h1>

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
          <small class="info">{{ info[when] }}</small>
      </div>

      <div class="input-group">
          <label>Where will you purchase the fare?</label>
          <span v-for="location in available_locations">
              <input type="radio" :id="location" value="{{ location }}" v-model="purchase_location">
              <label for="{{ location }}">{{ location }}</label>
          </span>
          <small class="info">{{ info[purchase_location] }}</small>
      </div>

      <div class="input-group">
          <label for="num_rides">How many rides will you need?</label>
          <input type="number" id="num_rides" v-model="num_rides" :step="fare.trips" min="0">
      </div>

      <div class="fare">Your fare will cost:&nbsp;<span class="cost">${{ cost }}</span></div>
  </div>

</template>

<script>
import _ from 'underscore';

export default {
  data () {
    return {
      // This is the data fetched from the .json
      info: undefined,
      zones: undefined,

      // Calculated based on selected input
      available_times: [],
      available_locations: [],

      // These are the models selected from the input
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
      var fare = _.findWhere(this.destination.fares, {type: this.when, purchase: this.purchase_location});
      if (this.num_rides % this.fare.trips != 0) this.num_rides = this.fare.trips;
    }
  },
  computed: {
    fare: function() {
      var fare = _.findWhere(this.destination.fares, {type: this.when, purchase: this.purchase_location});
      return fare;
    },
    cost: function() {
      if (!this.destination) return 0;
      if (this.num_rides == 0) return 0;
      var fare = _.findWhere(this.destination.fares, {type: this.when, purchase: this.purchase_location});
      return fare.price * (this.num_rides / fare.trips);
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
body {
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  @media (max-width: 32rem) {
    font-size: 12px;
  }
  margin: 0;
  padding: 0;
}
h1 {
  text-align: center;
}
label {
  text-align: center;
}
select,
input[type="text"] {
  width: 100%;
  line-height: 2rem;
}
small {
  color: #555;
}
.input-group {
  border: none;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}
.info {
  text-align: center;
  margin: 0.5rem 0;
}
.app-container {
  display: flex;
  flex-flow: row-wrap;
  justify-content: center;
  margin: 1rem;
}
.app {
  max-width: 32rem;
  width: 100%;
  border: 1px solid #eee;
}
.app-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fare {
  font-size: 1.5rem;
  background: #333;
  color: #eee;
  padding: 1rem;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}
.cost {
  font-size: 2rem;
  font-weight: bold;
}
</style>
