<template>
  <v-app>
    <v-app-bar app color="primary" dark> <h1>Trail Planner</h1> </v-app-bar>

    <v-main>
      <v-container fluid>
        <SearchFormPresenter></SearchFormPresenter>
        <weather-presenter />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { testFirebase } from "./firebaseModel";
import SearchFormPresenter from "./presenters/SearchFormPresenter.vue";
import WeatherPresenter from "./presenters/weatherPresenter.vue";

export default {
  name: "App",

  components: {
    SearchFormPresenter,
    WeatherPresenter,
  },

  data: () => ({
    //
  }),
  mounted() {
    testFirebase();
    //setCategories(this.$store);
    this.$store.dispatch("setCategories");
    this.$store.dispatch("setCurrentTour");
  },
};
</script>
