<template>
  <div v-if="currentTourHasStartingPoint">
    <vue-weather
      api-key="7c2818a738ef6f68536c2bd139eaa7b0"
      units="uk"
      :latitude="lat"
      :longitude="lon"
    />
  </div>
</template>

<script>
import VueWeather from "vue-weather-widget";
export default {
  components: {
    VueWeather,
  },
  computed: {
    currentTourHasStartingPoint() {
      return (
        this.$store.getters.getCurrentTour &&
        this.$store.getters.getCurrentTour.startingPoint
      );
    },
    lat() {
      return this.$store.getters.getCurrentTour.startingPoint.lat.toString();
    },
    lon() {
      return this.$store.getters.getCurrentTour.startingPoint.lon.toString();
    },
  },
};
</script>
