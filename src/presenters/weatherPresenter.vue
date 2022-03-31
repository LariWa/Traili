<template>
    <div v-if="this.$store.state.currentTour.startingPoint">
      <vue-weather
        api-key="7c2818a738ef6f68536c2bd139eaa7b0"
        units="uk"
        :latitude="this.$store.state.currentTour.startingPoint.lat.toString()"
        :longitude="this.$store.state.currentTour.startingPoint.lon.toString()"
      />
    </div>
</template>

<script>
import VueWeather from "vue-weather-widget";
export default{
    components: {
      VueWeather,
    },
   }
</script>