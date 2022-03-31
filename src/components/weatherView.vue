<template>
  <vue-weather
    api-key="7c2818a738ef6f68536c2bd139eaa7b0"
    units="uk"
    latitude="24.8864"
    longitude="91.8807"
  />
</template>

<script>
import VueWeather from "vue-weather-widget";
export default{
    components: {
      VueWeather,
    },
  };
</script>